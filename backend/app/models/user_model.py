from sqlmodel import SQLModel, Field
from pydantic import EmailStr
from datetime import date, datetime
from typing import Optional

class UserBase(SQLModel):
    name: str = Field(min_length=2)
    email: EmailStr = Field(unique=True, index=True)
    date_of_birth: date

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
