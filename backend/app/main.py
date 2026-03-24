from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.auth_routes import router as auth_router
from .api.shop_routes import router as shop_router
from .database.db import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    from .models.user_model import User
    init_db()
    yield

app = FastAPI(title="E-commerce Auth API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(shop_router, prefix="/api/shop", tags=["shop"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
