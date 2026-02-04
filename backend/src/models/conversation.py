"""Conversation model for chat sessions.

Represents a chat session belonging to a user. One user has one active
conversation following the get-or-create pattern.
"""

from sqlmodel import SQLModel, Field
from datetime import datetime
import uuid


class Conversation(SQLModel, table=True):
    """A chat conversation session belonging to a user."""

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="user.id", index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
