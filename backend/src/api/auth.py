from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from pydantic import BaseModel, EmailStr
from sqlalchemy.exc import IntegrityError, DBAPIError
from src.core.db import get_session
from src.models.user import User
from src.core.security import get_password_hash, verify_password, create_access_token
from src.api.deps import get_current_user
from datetime import timedelta
import os

router = APIRouter(prefix="/auth", tags=["auth"])

def get_cookie_config(request: Request) -> tuple[bool, str]:
    """Determine cookie configuration based on request security."""
    # Check if request is secure (HTTPS)
    # Check X-Forwarded-Proto header first (common behind reverse proxies)
    forwarded_proto = request.headers.get("X-Forwarded-Proto", "")
    url_scheme = request.url.scheme
    is_secure = forwarded_proto == "https" or url_scheme == "https"

    # If secure, use Secure=True and SameSite=none (required for cross-site)
    # If not secure, use Secure=False and SameSite=lax (for localhost)
    secure_flag = is_secure
    same_site = "none" if is_secure else "lax"
    return secure_flag, same_site

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    created_at: str

    @classmethod
    def from_user(cls, user: User) -> "UserResponse":
        return cls(
            id=str(user.id),
            email=user.email,
            created_at=user.created_at.isoformat(),
        )


class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate, session: AsyncSession = Depends(get_session)):
    # Check if user exists
    stmt = select(User).where(User.email == user_in.email)
    result = await session.execute(stmt)
    existing = result.scalar_one_or_none()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = get_password_hash(user_in.password)
    user = User(email=user_in.email, hashed_password=hashed_pw)

    session.add(user)
    try:
        await session.commit()
    except IntegrityError:
        await session.rollback()
        # Handles race conditions where two requests try to register same email.
        raise HTTPException(status_code=400, detail="Email already registered")
    except DBAPIError:
        await session.rollback()
        raise

    await session.refresh(user)
    return UserResponse.from_user(user)

@router.post("/login")
async def login(request: Request, response: Response, login_data: LoginRequest, session: AsyncSession = Depends(get_session)):
    stmt = select(User).where(User.email == login_data.email)
    result = await session.execute(stmt)
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=401, detail="Please create your account first.")
    if not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect password.")

    access_token = create_access_token(data={"sub": str(user.id)})
    secure, same_site = get_cookie_config(request)
    response.set_cookie(
        key="session_token",
        value=access_token,
        httponly=True,
        secure=secure,
        samesite=same_site,
    )
    return {"message": "Login successful"}

@router.post("/logout")
async def logout(request: Request, response: Response):
    secure, same_site = get_cookie_config(request)
    # Delete current session token
    response.delete_cookie(
        key="session_token",
        httponly=True,
        secure=secure,
        samesite=same_site,
    )
    # Cleanup persistent legacy cookies (with all possible configurations)
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=secure,
        samesite=same_site,
    )
    # Also attempt to delete with lax/default settings in case of old cookies
    response.delete_cookie(
        key="access_token",
        httponly=True,
        samesite="lax",
    )
    return {"message": "Logged out"}

@router.get("/me", response_model=UserResponse)
async def me(response: Response, current_user: User = Depends(get_current_user)):
    # Prevent caching of the user data
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return UserResponse.from_user(current_user)
