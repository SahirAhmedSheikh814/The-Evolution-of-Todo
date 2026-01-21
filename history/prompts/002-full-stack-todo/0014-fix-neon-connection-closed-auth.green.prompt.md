---
id: 0014
title: Fix Neon connection closed auth
stage: green
date: 2026-01-14
surface: agent
model: claude-sonnet-4-5-20250929
feature: 002-full-stack-todo
branch: 002-full-stack-todo
user: unknown
command: agent
labels: ["backend","fastapi","auth","neon","postgres","asyncpg"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/core/db.py
tests:
 - curl http://localhost:8000/health
 - curl -X POST http://localhost:8000/api/v1/auth/register
 - curl -X POST http://localhost:8000/api/v1/auth/login
 - curl http://localhost:8000/api/v1/auth/me
 - curl -X POST http://localhost:8000/api/v1/todos
 - curl http://localhost:8000/api/v1/todos
---

## Prompt

<system-reminder>
Called the Read tool with the following input: {"file_path":"/mnt/e/TODO-APP/backend/src/api/auth.py"}
</system-reminder>

<system-reminder>
Result of calling the Read tool: "     1→from fastapi import APIRouter, Depends, HTTPException, status, Response\n     2→from sqlmodel.ext.asyncio.session import AsyncSession\n     3→from sqlmodel import select\n     4→from pydantic import BaseModel, EmailStr\n     5→from sqlalchemy.exc import IntegrityError, DBAPIError\n     6→from src.core.db import get_session\n     7→from src.models.user import User\n     8→from src.core.security import get_password_hash, verify_password, create_access_token\n     9→from src.api.deps import get_current_user\n    10→from datetime import timedelta\n    11→\n    12→router = APIRouter(prefix=\"/auth\", tags=[\"auth\"])\n    13→\n    14→class UserCreate(BaseModel):\n    15→    email: EmailStr\n    16→    password: str\n    17→\n    18→class UserResponse(BaseModel):\n    19→    id: str\n    20→    email: EmailStr\n    21→    created_at: str\n    22→\n    23→    @classmethod\n    24→    def from_user(cls, user: User) -> \"UserResponse\":\n    25→        return cls(\n    26→            id=str(user.id),\n    27→            email=user.email,\n    28→            created_at=user.created_at.isoformat(),\n    29→        )\n    30→\n    31→\n    32→class LoginRequest(BaseModel):\n    33→    email: EmailStr\n    34→    password: str\n    35→\n    36→@router.post(\"/register\", response_model=UserResponse, status_code=status.HTTP_201_CREATED)\n    37→async def register(user_in: UserCreate, session: AsyncSession = Depends(get_session)):\n    38→    # Check if user exists\n    39→    stmt = select(User).where(User.email == user_in.email)\n    40→    result = await session.execute(stmt)\n    41→    existing = result.scalar_one_or_none()\n    42→    if existing:\n    43→        raise HTTPException(status_code=400, detail=\"Email already registered\")\n    44→\n    45→    hashed_pw = get_password_hash(user_in.password)\n    46→    user = User(email=user_in.email, hashed_password=hashed_pw)\n    47→\n    48→    session.add(user)\n    49→    try:\n    50→        await session.commit()\n    51→    except IntegrityError:\n    52→        await session.rollback()\n    53→        # Handles race conditions where two requests try to register same email.\n    54→        raise HTTPException(status_code=400, detail=\"Email already registered\")\n    55→    except DBAPIError:\n    56→        await session.rollback()\n    57→        raise\n    58→\n    59→    await session.refresh(user)\n    60→    return UserResponse.from_user(user)\n    61→\n    62→@router.post(\"/login\")\n    63→async def login(response: Response, login_data: LoginRequest, session: AsyncSession = Depends(get_session)):\n    64→    stmt = select(User).where(User.email == login_data.email)\n    65→    result = await session.execute(stmt)\n    66→    user = result.scalar_one_or_none()\n    67→\n    68→    if not user or not verify_password(login_data.password, user.hashed_password):\n    69→        raise HTTPException(status_code=401, detail=\"Invalid credentials\")\n    70→\n    71→    access_token = create_access_token(data={\"sub\": str(user.id)})\n    72→    response.set_cookie(key=\"access_token\", value=access_token, httponly=True, samesite=\"lax\")\n    73→    return {\"message\": \"Login successful\"}\n    74→\n    75→@router.post(\"/logout\")\n    76→async def logout(response: Response):\n    77→    response.delete_cookie(key=\"access_token\")\n    78→    return {\"message\": \"Logged out\"}\n    79→\n    80→@router.get(\"/me\", response_model=UserResponse)\n    81→async def me(current_user: User = Depends(get_current_user)):\n    82→    return UserResponse.from_user(current_user)\n    83→\n"
</system-reminder>

<system-reminder>
Called the Read tool with the following input: {"file_path":"/mnt/e/TODO-APP/backend/src/core/db.py"}
</system-reminder>

<system-reminder>
Result of calling the Read tool: "     1→from sqlmodel import SQLModel\n     2→from sqlmodel.ext.asyncio.session import AsyncSession\n     3→from sqlalchemy.ext.asyncio import create_async_engine\n     4→from sqlalchemy.orm import sessionmaker\n     5→import os\n     6→import ssl\n     7→from typing import AsyncGenerator\n     8→from dotenv import load_dotenv\n     9→\n    10→# Load environment variables from .env file\n    11→load_dotenv()\n    12→\n    13→# Use asyncpg for async connection\n    14→raw_database_url = os.getenv(\n    15→    \"DATABASE_URL\", \"postgresql+asyncpg://postgres:postgres@localhost:5432/todo_db\"\n    16→)\n    17→\n    18→# asyncpg doesn't understand libpq-style query params like sslmode/channel_binding.\n    19→# We strip them from the URL and enforce SSL via connect_args when needed.\n    20→DATABASE_URL = raw_database_url.split(\"?\")[0]\n    21→\n    22→connect_args: dict = {}\n    23→if \"sslmode=require\" in raw_database_url or \"neon.tech\" in raw_database_url:\n    24→    connect_args = {\"ssl\": ssl.create_default_context()}\n    25→\n    26→engine = create_async_engine(\n    27→    DATABASE_URL,\n    28→    echo=True,\n    29→    future=True,\n    30→    pool_pre_ping=True,\n    31→    pool_recycle=300,\n    32→    connect_args=connect_args,\n    33→)  # pre_ping helps recover from Neon pooler closing idle connections\n    34→\n    35→\n    36→async def init_db():\n    37→    async with engine.begin() as conn:\n    38→        # await conn.run_sync(SQLModel.metadata.drop_all)\n    39→        await conn.run_sync(SQLModel.metadata.create_all)\n    40→\n    41→async def get_session() -> AsyncGenerator[AsyncSession, None]:\n    42→    async_session = sessionmaker(\n    43→        engine, class_=AsyncSession, expire_on_commit=False\n    44→    )\n    45→    async with async_session() as session:\n    46→        yield session\n"
</system-reminder>

## Response snapshot

- Reproduced the failing registration from the CLI and captured an HTTP 500.
- Confirmed the backend error was `sqlalchemy.exc.InterfaceError` / `asyncpg InterfaceError: connection is closed` during the initial SELECT in `/api/v1/auth/register`.
- Restarted the FastAPI server so updated SQLAlchemy engine settings in `backend/src/core/db.py` (pool pre-ping + recycle + SSL connect args for Neon, and stripping URL query params for asyncpg) took effect.
- Verified end-to-end after restart:
  - `POST /api/v1/auth/register` returns 201 with a serialized user payload.
  - `POST /api/v1/auth/login` returns 200 and sets an HttpOnly `access_token` cookie.
  - `GET /api/v1/auth/me` returns the current user.
  - `POST /api/v1/todos` and `GET /api/v1/todos` work and return user-scoped todos.

## Outcome

- ✅ Impact: Fixed intermittent Neon pooler disconnects causing auth registration 500s; auth + todo flows work reliably again.
- 🧪 Tests: curl registration/login/me/todos checks passed with cookie auth.
- 📁 Files: Updated `backend/src/core/db.py` to improve asyncpg/Neon connection resilience.
- 🔁 Next prompts: Validate the same flow from the browser UI; optionally add structured error responses for the frontend.
- 🧠 Reflection: The user-visible “registration failed” was caused by DB connection churn (pooler closed idle connection), not auth business logic.

## Evaluation notes (flywheel)

- Failure modes observed: Idle DB connections were reused without validation, producing `connection is closed` on first query; frontend error UI masked 500 root causes.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Reduce SQLAlchemy logging noise and add a health endpoint that validates DB connectivity (a lightweight SELECT 1) for ops visibility.
