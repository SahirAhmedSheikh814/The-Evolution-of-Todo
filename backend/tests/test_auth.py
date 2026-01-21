import pytest
from fastapi.testclient import TestClient
from sqlmodel.ext.asyncio.session import AsyncSession
from backend.src.main import app
from backend.src.core.db import get_session
from backend.src.models.user import User
from backend.src.core.security import get_password_hash
from httpx import AsyncClient, ASGITransport
import asyncio

# Use an in-memory database for tests or mock appropriately
DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost:5432/todo_db" # This should be overridden in CI

@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture
async def client():
    # We need a real DB connection for this or use SQLite for testing
    # For now, we assume the app is setup to run against the test DB
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac

@pytest.mark.asyncio
async def test_register_success(client):
    response = await client.post("/api/v1/auth/register", json={
        "email": "test@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data
    # Clean up
    # await delete_user(data["id"])

@pytest.mark.asyncio
async def test_register_duplicate_email(client):
    await client.post("/api/v1/auth/register", json={
        "email": "duplicate@example.com",
        "password": "password123"
    })
    response = await client.post("/api/v1/auth/register", json={
        "email": "duplicate@example.com",
        "password": "password123"
    })
    assert response.status_code == 400
    assert "duplicate" in response.json()["detail"].lower()

@pytest.mark.asyncio
async def test_login_success(client):
    await client.post("/api/v1/auth/register", json={
        "email": "login@example.com",
        "password": "password123"
    })
    response = await client.post("/api/v1/auth/login", json={
        "email": "login@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json() # Or cookies set

@pytest.mark.asyncio
async def test_login_invalid_credentials(client):
    response = await client.post("/api/v1/auth/login", json={
        "email": "login@example.com",
        "password": "wrongpassword"
    })
    assert response.status_code == 401
