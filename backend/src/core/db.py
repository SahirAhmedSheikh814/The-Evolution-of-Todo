from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
import os
import ssl
from typing import AsyncGenerator
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Use asyncpg for async connection
raw_database_url = os.getenv(
    "DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost:5432/todo_db"
)

# asyncpg doesn't understand libpq-style query params like sslmode/channel_binding.
# We strip them from the URL and enforce SSL via connect_args when needed.
DATABASE_URL = raw_database_url.split("?")[0]

connect_args: dict = {}
if "sslmode=require" in raw_database_url or "neon.tech" in raw_database_url:
    connect_args = {"ssl": ssl.create_default_context()}

engine = create_async_engine(
    DATABASE_URL,
    echo=True,
    future=True,
    pool_pre_ping=True,
    pool_recycle=300,
    connect_args=connect_args,
)  # pre_ping helps recover from Neon pooler closing idle connections


async def init_db():
    async with engine.begin() as conn:
        # await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    async with async_session() as session:
        yield session
