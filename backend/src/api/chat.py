"""Chat API endpoints for AI-powered todo management.

Provides REST endpoints for sending chat messages and retrieving
conversation history. All endpoints require JWT authentication.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field
from sqlmodel.ext.asyncio.session import AsyncSession

from src.core.db import get_session
from src.models.user import User
from src.api.deps import get_current_user
from src.services.chat_service import process_chat_message, get_chat_history


router = APIRouter(prefix="/chat", tags=["chat"])


# Request/Response Models per contracts/chat-api.yaml

class ChatRequest(BaseModel):
    """Request body for POST /chat."""
    message: str = Field(
        ...,
        min_length=1,
        max_length=500,
        description="User's chat message"
    )


class ChatResponse(BaseModel):
    """Response body for POST /chat."""
    message: str = Field(..., description="AI assistant's response")
    conversation_id: str = Field(..., description="Conversation identifier")
    created_at: str = Field(..., description="Response timestamp (ISO format)")


class MessageItem(BaseModel):
    """Individual message in chat history."""
    id: str
    role: str
    content: str
    created_at: str


class ChatHistoryResponse(BaseModel):
    """Response body for GET /chat/history."""
    messages: list[MessageItem]
    total: int = Field(..., description="Total messages in conversation")
    has_more: bool = Field(..., description="Whether more messages exist")


@router.post("", response_model=ChatResponse)
async def send_chat_message(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    """Send a chat message and receive AI response.

    The AI can perform todo operations (add, list, complete, delete, update)
    based on natural language commands.
    """
    try:
        ai_response, conversation_id, created_at = await process_chat_message(
            user_message=request.message,
            user_id=current_user.id,
            session=session
        )

        return ChatResponse(
            message=ai_response,
            conversation_id=str(conversation_id),
            created_at=created_at.isoformat() + "Z"
        )

    except Exception as e:
        # Log error for debugging
        print(f"Chat error: {e}")
        raise HTTPException(
            status_code=503,
            detail="I'm having trouble connecting. Please try again in a moment."
        )


@router.get("/history", response_model=ChatHistoryResponse)
async def get_history(
    limit: int = Query(default=50, ge=1, le=100, description="Max messages to return"),
    offset: int = Query(default=0, ge=0, description="Messages to skip"),
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    """Get chat history for the current user.

    Returns messages in chronological order with pagination support.
    """
    messages, total, has_more = await get_chat_history(
        user_id=current_user.id,
        session=session,
        limit=limit,
        offset=offset
    )

    return ChatHistoryResponse(
        messages=[
            MessageItem(
                id=str(msg.id),
                role=msg.role.value,
                content=msg.content,
                created_at=msg.created_at.isoformat() + "Z"
            )
            for msg in messages
        ],
        total=total,
        has_more=has_more
    )
