from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field


class AuthEvent(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[int] = Field(default=None, index=True)
    email: str = Field(index=True)
    event_type: str = Field(index=True)
    success: bool = Field(default=False)
    failure_code: Optional[str] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow, index=True)
