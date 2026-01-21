# from datetime import datetime, timedelta
# from jose import jwt, JWTError
# from passlib.context import CryptContext
# import os

# SECRET_KEY = os.getenv("SECRET_KEY", "change_this_to_a_secure_random_string")
# ALGORITHM = os.getenv("ALGORITHM", "HS256")
# ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return pwd_context.verify(plain_password, hashed_password)

# def get_password_hash(password: str) -> str:
#     return pwd_context.hash(password)

# def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt


from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
import os
import hashlib  # ✅ NEW (Just this new import)

SECRET_KEY = os.getenv("SECRET_KEY", "change_this_to_a_secure_random_string")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ✅ NEW: pre-hash function (bcrypt 72-byte issue proper fix)
def _pre_hash(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

# 🔁 UPDATED (logic same, just secure layer is added)
def verify_password(plain_password: str, hashed_password: str) -> bool:
    pre_hashed = _pre_hash(plain_password)
    return pwd_context.verify(pre_hashed, hashed_password)

# 🔁 UPDATED (logic same, just secure layer is added)
def get_password_hash(password: str) -> str:
    pre_hashed = _pre_hash(password)
    return pwd_context.hash(pre_hashed)

# ❌ NO CHANGE AT ALL
def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
