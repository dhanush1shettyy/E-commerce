import pytest
from httpx import AsyncClient
from sqlmodel import Session
from app.database.db import seed_perfumes

pytestmark = pytest.mark.anyio


@pytest.fixture
def anyio_backend():
    return "asyncio"


async def test_get_perfumes_returns_all_when_no_search(client: AsyncClient):
    response = await client.get("/api/shop/perfumes")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 12
    assert {item["gender"] for item in data}.issubset({"male", "female"})


@pytest.fixture(autouse=True)
def seed_data(session: Session):
    seed_perfumes(session)


async def test_get_perfumes_search_matches_brand_name(client: AsyncClient):
    response = await client.get("/api/shop/perfumes", params={"search": "dior"})
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["brand_name"] == "Dior"


async def test_get_perfumes_search_matches_model_name(client: AsyncClient):
    response = await client.get("/api/shop/perfumes", params={"search": "sauv"})
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["model_name"] == "Sauvage"


async def test_get_perfumes_search_is_case_insensitive(client: AsyncClient):
    response = await client.get("/api/shop/perfumes", params={"search": "AVEN"})
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["brand_name"] == "Creed"
    assert data[0]["model_name"] == "Aventus"


async def test_get_perfumes_search_returns_empty_when_no_match(client: AsyncClient):
    response = await client.get("/api/shop/perfumes", params={"search": "xyz123"})
    assert response.status_code == 200
    data = response.json()
    assert data == []


async def test_get_perfumes_search_whitespace_returns_all(client: AsyncClient):
    response = await client.get("/api/shop/perfumes", params={"search": "   "})
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 12


async def test_get_perfumes_filter_by_gender_male(client: AsyncClient):
    response = await client.get("/api/shop/perfumes", params={"gender": "male"})
    assert response.status_code == 200
    data = response.json()
    assert len(data) <= 12
    assert all(item["gender"] == "male" for item in data)


async def test_get_perfumes_filter_by_gender_female(client: AsyncClient):
    response = await client.get("/api/shop/perfumes", params={"gender": "female"})
    assert response.status_code == 200
    data = response.json()
    assert len(data) <= 12
    assert all(item["gender"] == "female" for item in data)


async def test_get_perfumes_filter_by_gender_and_search(client: AsyncClient):
    response = await client.get(
        "/api/shop/perfumes",
        params={"gender": "male", "search": "dior"},
    )
    assert response.status_code == 200
    data = response.json()
    assert all(item["gender"] == "male" for item in data)
    assert all("dior" in item["brand_name"].lower() or "dior" in item["model_name"].lower() for item in data)
