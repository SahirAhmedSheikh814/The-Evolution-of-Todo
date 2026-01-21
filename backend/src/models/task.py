from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
import uuid

class Task(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str
    description: str | None = None
    is_completed: bool = Field(default=False)
    user_id: uuid.UUID = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
