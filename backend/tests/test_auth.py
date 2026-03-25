import pytest
from httpx import AsyncClient
from sqlmodel import Session, select
from app.models.auth_event_model import AuthEvent

# Async pytest requires pytest-asyncio if we run it, but we can just use anyio
pytestmark = pytest.mark.anyio

@pytest.fixture
def anyio_backend():
    return 'asyncio'

async def test_signup_success(client: AsyncClient):
    response = await client.post(
        "/api/auth/signup",
        json={
            "name": "Jane Doe",
            "email": "jane@example.com",
            "password": "Password123!",
            "date_of_birth": "2000-01-01"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

async def test_signup_duplicate_email(client: AsyncClient):
    # First signup
    await client.post(
        "/api/auth/signup",
        json={
            "name": "John Doe",
            "email": "john@example.com",
            "password": "Password123!",
            "date_of_birth": "2000-01-01"
        }
    )
    # Second signup with same email
    response = await client.post(
        "/api/auth/signup",
        json={
            "name": "Another User",
            "email": "john@example.com",
            "password": "Password123!",
            "date_of_birth": "2000-01-01"
        }
    )
    assert response.status_code == 400
    data = response.json()
    assert data["detail"]["code"] == "EMAIL_EXISTS"

async def test_signup_invalid_email(client: AsyncClient):
    response = await client.post(
        "/api/auth/signup",
        json={
            "name": "John Doe",
            "email": "not-an-email",
            "password": "Password123!",
            "date_of_birth": "2000-01-01"
        }
    )
    assert response.status_code == 422 # FastAPI validation error

async def test_signup_weak_password(client: AsyncClient):
    response = await client.post(
        "/api/auth/signup",
        json={
            "name": "John Doe",
            "email": "john2@example.com",
            "password": "weak",
            "date_of_birth": "2000-01-01"
        }
    )
    assert response.status_code == 422

async def test_signin_success(client: AsyncClient):
    # Create user
    await client.post(
        "/api/auth/signup",
        json={
            "name": "Jane Doe",
            "email": "login@example.com",
            "password": "Password123!",
            "date_of_birth": "2000-01-01"
        }
    )
    # Login user
    response = await client.post(
        "/api/auth/signin",
        json={
            "email": "login@example.com",
            "password": "Password123!"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    
async def test_signin_wrong_password(client: AsyncClient):
    await client.post(
        "/api/auth/signup",
        json={
            "name": "Jane Doe",
            "email": "wrongpass@example.com",
            "password": "Password123!",
            "date_of_birth": "2000-01-01"
        }
    )
    response = await client.post(
        "/api/auth/signin",
        json={
            "email": "wrongpass@example.com",
            "password": "WrongPassword123!"
        }
    )
    assert response.status_code == 401
    data = response.json()
    assert data["detail"]["code"] == "INCORRECT_PASSWORD"

async def test_signin_nonexistent_user(client: AsyncClient):
    response = await client.post(
        "/api/auth/signin",
        json={
            "email": "nobody@example.com",
            "password": "Password123!"
        }
    )
    assert response.status_code == 401
    data = response.json()
    assert data["detail"]["code"] == "USER_NOT_FOUND"


async def test_signup_creates_auth_event(client: AsyncClient, session: Session):
    response = await client.post(
        "/api/auth/signup",
        json={
            "name": "Event User",
            "email": "event-signup@example.com",
            "password": "Password123!",
            "date_of_birth": "2000-01-01"
        }
    )
    assert response.status_code == 201

    event = session.exec(
        select(AuthEvent)
        .where(AuthEvent.email == "event-signup@example.com")
        .where(AuthEvent.event_type == "signup")
    ).first()

    assert event is not None
    assert event.success is True
    assert event.failure_code is None


async def test_signin_failure_creates_auth_event(client: AsyncClient, session: Session):
    response = await client.post(
        "/api/auth/signin",
        json={
            "email": "missing@example.com",
            "password": "Password123!"
        }
    )
    assert response.status_code == 401

    event = session.exec(
        select(AuthEvent)
        .where(AuthEvent.email == "missing@example.com")
        .where(AuthEvent.event_type == "signin")
    ).first()

    assert event is not None
    assert event.success is False
    assert event.failure_code == "USER_NOT_FOUND"
