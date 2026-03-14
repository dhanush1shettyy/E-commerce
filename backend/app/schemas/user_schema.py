from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import date
from typing import Optional
import re

class UserCreate(BaseModel):
    name: str = Field(min_length=2, description="Only alphabets")
    email: EmailStr
    password: str = Field(min_length=8)
    date_of_birth: date

    @field_validator('name')
    @classmethod
    def validate_name(cls, v: str) -> str:
        if not re.match(r"^[a-zA-Z\s]+$", v):
            raise ValueError("Name must contain only alphabets")
        return v

    @field_validator('password')
    @classmethod
    def validate_password(cls, v: str) -> str:
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password requires at least one uppercase letter")
        if not re.search(r"[a-z]", v):
            raise ValueError("Password requires at least one lowercase letter")
        if not re.search(r"\d", v):
            raise ValueError("Password requires at least one number")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", v):
            raise ValueError("Password requires at least one special character")
        return v

    @field_validator('date_of_birth')
    @classmethod
    def validate_age(cls, v: date) -> date:
        today = date.today()
        age = today.year - v.year - ((today.month, today.day) < (v.month, v.day))
        if age < 13:
            raise ValueError("User must be at least 13 years old")
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user_name: Optional[str] = None
    
class ErrorDetail(BaseModel):
    code: str
    message: str

class ErrorResponse(BaseModel):
    success: bool = False
    error: ErrorDetail

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    date_of_birth: date
