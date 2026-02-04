"""Chat service for conversation orchestration.

Manages conversation persistence, message history, and coordinates
between the AI agent and the database.
"""

import uuid
from datetime import datetime

from sqlmodel import select, func
from sqlmodel.ext.asyncio.session import AsyncSession

from src.models.conversation import Conversation
from src.models.message import Message, MessageRole
from src.services.ai_agent import process_message


async def get_or_create_conversation(
    user_id: uuid.UUID,
    session: AsyncSession
) -> Conversation:
    """Get the user's conversation or create one if it doesn't exist.

    Each user has a single conversation (get-or-create pattern).

    Args:
        user_id: UUID of the user
        session: Database session

    Returns:
        The user's Conversation object
    """
    stmt = select(Conversation).where(Conversation.user_id == user_id)
    result = await session.execute(stmt)
    conversation = result.scalar_one_or_none()

    if conversation is None:
        conversation = Conversation(user_id=user_id)
        session.add(conversation)
        await session.commit()
        await session.refresh(conversation)

    return conversation


async def get_recent_messages(
    conversation_id: uuid.UUID,
    session: AsyncSession,
    limit: int = 10
) -> list[dict[str, str]]:
    """Get recent messages for a conversation in API format.

    Returns messages in chronological order (oldest first) for
    context building with the AI agent.

    Args:
        conversation_id: UUID of the conversation
        session: Database session
        limit: Maximum number of messages to return

    Returns:
        List of message dicts [{role, content}, ...]
    """
    stmt = (
        select(Message)
        .where(Message.conversation_id == conversation_id)
        .order_by(Message.created_at.desc())
        .limit(limit)
    )
    result = await session.execute(stmt)
    messages = list(result.scalars().all())

    # Reverse to get chronological order (oldest first)
    messages.reverse()

    return [
        {"role": msg.role.value, "content": msg.content}
        for msg in messages
    ]


async def add_message(
    conversation_id: uuid.UUID,
    role: MessageRole,
    content: str,
    session: AsyncSession
) -> Message:
    """Add a message to a conversation.

    Args:
        conversation_id: UUID of the conversation
        role: Message role (user or assistant)
        content: Message text content
        session: Database session

    Returns:
        The created Message object
    """
    message = Message(
        conversation_id=conversation_id,
        role=role,
        content=content
    )
    session.add(message)
    await session.commit()
    await session.refresh(message)

    # Update conversation timestamp
    stmt = select(Conversation).where(Conversation.id == conversation_id)
    result = await session.execute(stmt)
    conversation = result.scalar_one_or_none()
    if conversation:
        conversation.updated_at = datetime.utcnow()
        await session.commit()

    return message


async def process_chat_message(
    user_message: str,
    user_id: uuid.UUID,
    session: AsyncSession
) -> tuple[str, uuid.UUID, datetime]:
    """Process a chat message end-to-end.

    Orchestrates the full flow:
    1. Get or create user's conversation
    2. Persist user message
    3. Get conversation history for context
    4. Process with AI agent
    5. Persist AI response
    6. Return response data

    Args:
        user_message: The user's message text
        user_id: UUID of the user
        session: Database session

    Returns:
        Tuple of (ai_response, conversation_id, created_at)
    """
    # Get or create conversation
    conversation = await get_or_create_conversation(user_id, session)

    # Save user message
    await add_message(
        conversation_id=conversation.id,
        role=MessageRole.USER,
        content=user_message,
        session=session
    )

    # Get recent history for context (excluding the message we just added)
    # We fetch limit+1 to account for the message we just added, then exclude it
    history = await get_recent_messages(
        conversation_id=conversation.id,
        session=session,
        limit=11  # Get one extra to exclude the current message
    )
    # Remove the last message (the one we just added) from history for the AI
    if history and history[-1]["content"] == user_message:
        history = history[:-1]

    # Process with AI agent
    ai_response = await process_message(
        user_message=user_message,
        conversation_history=history,
        session=session,
        user_id=user_id
    )

    # Save AI response
    assistant_message = await add_message(
        conversation_id=conversation.id,
        role=MessageRole.ASSISTANT,
        content=ai_response,
        session=session
    )

    return ai_response, conversation.id, assistant_message.created_at


async def get_chat_history(
    user_id: uuid.UUID,
    session: AsyncSession,
    limit: int = 50,
    offset: int = 0
) -> tuple[list[Message], int, bool]:
    """Get paginated chat history for a user.

    Args:
        user_id: UUID of the user
        session: Database session
        limit: Maximum messages to return
        offset: Number of messages to skip

    Returns:
        Tuple of (messages, total_count, has_more)
    """
    # Get user's conversation
    conversation = await get_or_create_conversation(user_id, session)

    # Count total messages
    count_stmt = (
        select(func.count())
        .select_from(Message)
        .where(Message.conversation_id == conversation.id)
    )
    count_result = await session.execute(count_stmt)
    total = count_result.scalar() or 0

    # Get paginated messages (chronological order)
    stmt = (
        select(Message)
        .where(Message.conversation_id == conversation.id)
        .order_by(Message.created_at)
        .offset(offset)
        .limit(limit)
    )
    result = await session.execute(stmt)
    messages = list(result.scalars().all())

    has_more = offset + len(messages) < total

    return messages, total, has_more
