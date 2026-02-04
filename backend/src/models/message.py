"""Message model for chat messages.

Represents a single message in a conversation with role-based sender
identification (user or assistant).
"""

from sqlmodel import SQLModel, Field
from datetime import datetime
from enum import Enum
import uuid


class MessageRole(str, Enum):
    """Message sender role."""

    USER = "user"
    ASSISTANT = "assistant"


class Message(SQLModel, table=True):
    """A single message in a conversation."""

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    conversation_id: uuid.UUID = Field(foreign_key="conversation.id", index=True)
    role: MessageRole = Field(sa_column_kwargs={"nullable": False})
    content: str = Field(sa_column_kwargs={"nullable": False})
    created_at: datetime = Field(default_factory=datetime.utcnow)
