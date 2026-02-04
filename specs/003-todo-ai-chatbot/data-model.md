# Data Model: Todo AI Chatbot

**Date**: 2026-01-27
**Feature**: 003-todo-ai-chatbot

## Entity Relationship Diagram

```
┌─────────────┐       ┌──────────────────┐       ┌─────────────┐
│    User     │       │   Conversation   │       │   Message   │
├─────────────┤       ├──────────────────┤       ├─────────────┤
│ id (PK)     │──1:N──│ id (PK)          │──1:N──│ id (PK)     │
│ email       │       │ user_id (FK)     │       │ conv_id(FK) │
│ hashed_pwd  │       │ created_at       │       │ role        │
│ created_at  │       │ updated_at       │       │ content     │
└─────────────┘       └──────────────────┘       │ created_at  │
       │                                         └─────────────┘
       │              ┌─────────────┐
       └──────1:N─────│    Task     │
                      ├─────────────┤
                      │ id (PK)     │
                      │ user_id(FK) │
                      │ title       │
                      │ description │
                      │ is_completed│
                      │ created_at  │
                      │ updated_at  │
                      └─────────────┘
```

## New Entities

### Conversation

Represents a chat session belonging to a user. One user has one active conversation (simplest model).

```python
# backend/src/models/conversation.py
from sqlmodel import SQLModel, Field
from datetime import datetime
import uuid

class Conversation(SQLModel, table=True):
    """A chat conversation session belonging to a user."""
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="user.id", index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, auto-generated | Unique conversation identifier |
| user_id | UUID | FK to User, indexed | Owner of the conversation |
| created_at | timestamp | auto-set | When conversation started |
| updated_at | timestamp | auto-update | Last activity timestamp |

**Relationships**:
- `user_id` → `User.id` (many-to-one)
- One user has one conversation (get-or-create pattern)

### Message

A single message in a conversation.

```python
# backend/src/models/message.py
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
```

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, auto-generated | Unique message identifier |
| conversation_id | UUID | FK to Conversation, indexed | Parent conversation |
| role | enum | 'user' or 'assistant' | Who sent the message |
| content | text | not null | Message text content |
| created_at | timestamp | auto-set | When message was sent |

**Relationships**:
- `conversation_id` → `Conversation.id` (many-to-one)

## Existing Entities (No Changes)

### User (unchanged)
```python
class User(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

### Task (unchanged)
```python
class Task(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str
    description: str | None = None
    is_completed: bool = Field(default=False)
    user_id: uuid.UUID = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

## Indexes

| Table | Index | Columns | Purpose |
|-------|-------|---------|---------|
| conversation | idx_conversation_user | user_id | Fast lookup by user |
| message | idx_message_conversation | conversation_id | Fast message retrieval |
| message | idx_message_created | conversation_id, created_at | Ordered message history |

## Migration Strategy

1. Create new tables via Alembic migration
2. No data migration needed (new tables)
3. Existing User and Task tables unchanged

```bash
# Generate migration
alembic revision --autogenerate -m "Add conversation and message tables"

# Apply migration
alembic upgrade head
```

## Query Patterns

### Get or Create User's Conversation
```python
async def get_or_create_conversation(user_id: uuid.UUID, session: AsyncSession) -> Conversation:
    stmt = select(Conversation).where(Conversation.user_id == user_id)
    result = await session.execute(stmt)
    conv = result.scalar_one_or_none()
    if not conv:
        conv = Conversation(user_id=user_id)
        session.add(conv)
        await session.commit()
        await session.refresh(conv)
    return conv
```

### Get Last N Messages
```python
async def get_recent_messages(conv_id: uuid.UUID, limit: int, session: AsyncSession) -> list[Message]:
    stmt = (
        select(Message)
        .where(Message.conversation_id == conv_id)
        .order_by(Message.created_at.desc())
        .limit(limit)
    )
    result = await session.execute(stmt)
    messages = list(reversed(result.scalars().all()))  # Chronological order
    return messages
```

### Add Message
```python
async def add_message(conv_id: uuid.UUID, role: MessageRole, content: str, session: AsyncSession) -> Message:
    msg = Message(conversation_id=conv_id, role=role, content=content)
    session.add(msg)
    await session.commit()
    await session.refresh(msg)
    return msg
```

## Validation Rules

| Entity | Field | Rule |
|--------|-------|------|
| Message | content | Max 500 characters (per spec edge case) |
| Message | role | Must be 'user' or 'assistant' |
| Conversation | user_id | Must reference existing User |
