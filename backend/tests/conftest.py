import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.database.db import engine, get_session
from sqlmodel import SQLModel, Session, create_engine
from typing import AsyncGenerator, Generator
from datetime import date
from sqlmodel.pool import StaticPool

# Use SQLite for testing
sqlite_file_name = "test_database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

test_engine = create_engine(
    sqlite_url, connect_args={"check_same_thread": False}, poolclass=StaticPool
)

def get_test_session() -> Generator[Session, None, None]:
    with Session(test_engine) as session:
        yield session

@pytest.fixture(name="session")
def session_fixture() -> Generator[Session, None, None]:
    SQLModel.metadata.create_all(test_engine)
    yield Session(test_engine)
    SQLModel.metadata.drop_all(test_engine)

@pytest.fixture(name="client")
async def client_fixture(session: Session) -> AsyncGenerator[AsyncClient, None]:
    def get_session_override():
        return session
    
    app.dependency_overrides[get_session] = get_session_override
    
    # httpx AsyncClient handles ASGI app locally
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        yield client
    
    app.dependency_overrides.clear()
