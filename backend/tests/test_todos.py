import pytest
from fastapi.testclient import TestClient
from backend.src.main import app
from backend.src.models.user import User
from backend.src.models.task import Task
from backend.src.core.security import get_password_hash, create_access_token
from httpx import AsyncClient, ASGITransport
import uuid

@pytest.fixture
async def test_user(client):
    # Create a test user
    # ...

@pytest.fixture
async def auth_client(client, test_user):
    # Login and return client with cookie
    pass

@pytest.mark.asyncio
async def test_create_todo(auth_client):
    response = await auth_client.post("/api/v1/todos", json={"title": "Test Todo"})
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Todo"
    assert "id" in data

@pytest.mark.asyncio
async def test_list_todos(auth_client):
    response = await auth_client.get("/api/v1/todos")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

@pytest.mark.asyncio
async def test_user_isolation(auth_client, other_client):
    # User A creates a todo
    # User B tries to list it (should be empty)
    pass
