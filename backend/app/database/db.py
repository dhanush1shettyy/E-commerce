import os
from sqlmodel import create_engine, SQLModel, Session
from typing import Generator

# Use DATABASE_URL from env or default to a local mysql connection for docker
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:rootpassword@localhost:3306/ecommerce_auth")

engine = create_engine(DATABASE_URL, echo=True)

def init_db():
    SQLModel.metadata.create_all(engine)

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session
