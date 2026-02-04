"""AI Agent service using OpenAI API with GPT-3.5-turbo.

Implements the AI chatbot agent that processes natural language commands
and executes todo operations via prompt-based action extraction.
Supports multilingual interaction (English, Urdu, Roman Urdu) with language mirroring.

Uses a ReAct-style approach where the AI outputs structured JSON actions
that we parse and execute.
"""

import json
import os
import re
import uuid
from typing import Any

from openai import AsyncOpenAI
from sqlmodel.ext.asyncio.session import AsyncSession

from src.tools.todo_tools import (
    TOOL_DEFINITIONS,
    TOOL_EXECUTORS,
    add_task,
    list_tasks,
    complete_task,
    delete_task,
    update_task,
    mark_task_incomplete
)


# OpenAI configuration using GPT-3.5-turbo with your paid API key
OPENAI_BASE_URL = "https://api.openai.com/v1"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")  # Using your paid OpenAI API key
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")

# Maximum messages to include in context (per FR-007)
MAX_CONTEXT_MESSAGES = 10

# System prompt with function calling instructions
SYSTEM_PROMPT = """You are a helpful AI assistant for a Todo application. You help users manage their tasks through natural language conversation.

## Your Capabilities
You can help users:
- Add new tasks to their todo list
- View/list their tasks (all, pending, or completed)
- Mark tasks as complete
- Delete tasks (with confirmation)
- Update task titles or descriptions
- Mark tasks as incomplete

## CRITICAL INSTRUCTIONS
1. **USE TOOLS**: When a user asks to perform an action (add, list, update, delete, complete), you MUST call the corresponding tool. Do NOT just say you did it without calling the tool.
2. **LANGUAGE MIRRORING**: You MUST respond in the SAME language the user writes in (English, Urdu, Roman Urdu, etc.).
3. **MULTILINGUAL UNDERSTANDING**: You must understand commands in various languages and map them to the correct tool and reply them in the same language that the user uses to communicate with you.
   - "task banao", "add karo", "create task" -> call `add_task` tool
   - "dikhao", "list", "kya hai" -> call `list_tasks` tool
   - "complete karo", "mukammal", "done" -> call `complete_task` tool
   - "delete karo", "hatao", "remove" -> call `delete_task` tool
   - "mark as incomplete", "incomplete karo" -> call `mark_task_incomplete` tool


## TOOL USAGE IS MANDATORY
If the user says "Ek task banao 'YouTube'", you must NOT reply "Mein ne bana diya" until you have actually called the `add_task` function. The system will run the function and give you the result. ONLY THEN should you reply to the user.

## Response Guidelines
1. Be concise and friendly.
2. Confirm actions clearly after the tool has executed.
3. If a task is not found, suggest listing tasks first.
4. For delete operations, ask for confirmation first if the tool requires it.
5. When listing tasks, the system will provide a formatted list; verify it before showing it to the user.
"""


def create_openai_client() -> AsyncOpenAI:
    """Create and configure the OpenAI client for OpenAI with GPT-3.5-turbo.

    Returns:
        Configured AsyncOpenAI client pointing to OpenAI API
    """
    return AsyncOpenAI(
        base_url=OPENAI_BASE_URL,
        api_key=OPENAI_API_KEY,
    )




async def process_message(
    user_message: str,
    conversation_history: list[dict[str, str]],
    session: AsyncSession,
    user_id: uuid.UUID
) -> str:
    """Process a user message and return the AI response.

    Uses OpenAI's function calling capability to execute todo operations:
    1. Send message to AI with tool definitions
    2. AI decides which tools to call based on user request
    3. Execute requested tools and return results
    4. Get final response from AI incorporating tool results

    Args:
        user_message: The user's message text
        conversation_history: List of previous messages [{role, content}, ...]
        session: Database session for action execution
        user_id: UUID of the user for action execution

    Returns:
        AI response text
    """
    client = create_openai_client()

    # Build messages array with system prompt and history
    messages: list[dict[str, Any]] = [
        {"role": "system", "content": SYSTEM_PROMPT}
    ]

    # Add conversation history (limited to MAX_CONTEXT_MESSAGES)
    recent_history = conversation_history[-MAX_CONTEXT_MESSAGES:]
    messages.extend(recent_history)

    # Add current user message
    messages.append({"role": "user", "content": user_message})

    try:
        # Initial API call with tools
        response = await client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=messages,
            tools=TOOL_DEFINITIONS,
            tool_choice="auto",  # Let the AI decide when to use tools
            temperature=0.7,
            max_tokens=1024,
        )

        response_message = response.choices[0].message
        tool_calls = response_message.tool_calls

        # If the AI wants to call tools, process them
        if tool_calls:
            # Add the assistant's message with tool calls to the conversation
            messages.append(response_message)

            # Execute each tool call and collect results
            for tool_call in tool_calls:
                function_name = tool_call.function.name
                function_args = json.loads(tool_call.function.arguments)

                # Call the appropriate tool function
                result = await execute_tool_function(function_name, session, user_id, **function_args)

                # Add the result of the tool call to the conversation
                messages.append({
                    "role": "tool",
                    "content": json.dumps(result),
                    "tool_call_id": tool_call.id
                })

            # Get the AI's final response after processing tool results
            final_response = await client.chat.completions.create(
                model=OPENAI_MODEL,
                messages=messages,
                temperature=0.7,
                max_tokens=512,
            )

            return final_response.choices[0].message.content or ""

        # No tools needed, return the AI's direct response
        return response_message.content or "I'm here to help! You can ask me to add tasks, show your tasks, complete them, or delete them."

    except Exception as e:
        # Log the error for debugging
        print(f"AI Agent error: {e}")

        # Return user-friendly error message
        return "I'm having trouble connecting right now. Please try again in a moment."


async def execute_tool_function(tool_name: str, session: AsyncSession, user_id: uuid.UUID, **kwargs) -> dict[str, Any]:
    """Execute a tool function with the given arguments.

    Args:
        tool_name: Name of the tool to execute
        session: Database session
        user_id: User ID for the operation
        **kwargs: Arguments to pass to the tool function

    Returns:
        Result of the tool execution
    """
    # Map tool names to actual functions
    tool_functions = {
        "add_task": add_task,
        "list_tasks": list_tasks,
        "complete_task": complete_task,
        "delete_task": delete_task,
        "update_task": update_task,
        "mark_task_incomplete": mark_task_incomplete
    }

    if tool_name not in tool_functions:
        return {"success": False, "message": f"Unknown tool: {tool_name}"}

    tool_func = tool_functions[tool_name]

    try:
        result = await tool_func(session=session, user_id=user_id, **kwargs)
        return result
    except Exception as e:
        return {"success": False, "message": str(e)}
