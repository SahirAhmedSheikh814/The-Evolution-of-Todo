"""Todo operation tools for AI agent.

Implements the 5 todo operations (add, list, complete, delete, update) as tool
functions that the AI agent can call. Each function works with the database
session and user_id for proper user isolation.
"""

import uuid
from datetime import datetime
from typing import Any

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from src.models.task import Task


# Tool definitions in OpenAI format for the AI agent
TOOL_DEFINITIONS = [
    {
        "type": "function",
        "function": {
            "name": "add_task",
            "description": "Add a new task to the user's todo list. REQUIRED for any request to create/add/make a task in any language (e.g., 'add task', 'ek task banao', 'task shamil karein').",
            "parameters": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "The title/name of the task to add"
                    },
                    "description": {
                        "type": "string",
                        "description": "Optional description or details for the task"
                    }
                },
                "required": ["title"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "list_tasks",
            "description": "List the user's tasks. Can filter by completion status. Use for requests like 'show tasks', 'mujhe tasks dikhao', 'tasks ki list'.",
            "parameters": {
                "type": "object",
                "properties": {
                    "filter": {
                        "type": "string",
                        "enum": ["all", "pending", "completed"],
                        "description": "Filter tasks by status. 'all' returns everything, 'pending' returns incomplete, 'completed' returns done tasks.",
                        "default": "all"
                    }
                },
                "required": []
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "complete_task",
            "description": "Mark a task as complete/done. Use for 'complete task', 'task mukammal', 'khatam karo'. Identify task by position number or title.",
            "parameters": {
                "type": "object",
                "properties": {
                    "task_identifier": {
                        "type": "string",
                        "description": "Task position number (e.g., '1', '2') or partial title match"
                    }
                },
                "required": ["task_identifier"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "delete_task",
            "description": "Delete/remove a task from the list. Requires confirmation. Identify by position or title.",
            "parameters": {
                "type": "object",
                "properties": {
                    "task_identifier": {
                        "type": "string",
                        "description": "Task position number (e.g., '1', '2') or partial title match"
                    },
                    "confirmed": {
                        "type": "boolean",
                        "description": "Whether user has confirmed deletion. If false, ask for confirmation first.",
                        "default": False
                    }
                },
                "required": ["task_identifier"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "update_task",
            "description": "Update an existing task's title or description.",
            "parameters": {
                "type": "object",
                "properties": {
                    "task_identifier": {
                        "type": "string",
                        "description": "Task position number (e.g., '1', '2') or partial title match"
                    },
                    "new_title": {
                        "type": "string",
                        "description": "New title for the task (optional)"
                    },
                    "new_description": {
                        "type": "string",
                        "description": "New description for the task (optional)"
                    }
                },
                "required": ["task_identifier"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "mark_task_incomplete",
            "description": "Mark a task as incomplete/not done. Use for 'uncheck', 'incomplete karo', 'wapas pending karo'. Identify task by position number or title.",
            "parameters": {
                "type": "object",
                "properties": {
                    "task_identifier": {
                        "type": "string",
                        "description": "Task position number (e.g., '1', '2') or partial title match"
                    }
                },
                "required": ["task_identifier"]
            }
        }
    }
]


async def find_task_by_identifier(
    identifier: str,
    user_id: uuid.UUID,
    session: AsyncSession
) -> tuple[Task | None, list[Task]]:
    """Find a task by position number or title substring.

    Args:
        identifier: Position number (1-indexed) or partial title match
        user_id: UUID of the user
        session: Database session

    Returns:
        Tuple of (found_task or None, all_user_tasks for reference)
    """
    # Get all user's tasks ordered by creation date for consistent positioning
    stmt = select(Task).where(Task.user_id == user_id).order_by(Task.created_at)
    result = await session.execute(stmt)
    tasks = list(result.scalars().all())

    if not tasks:
        return None, tasks

    # Try position number first (1-indexed)
    if identifier.isdigit():
        position = int(identifier)
        if 1 <= position <= len(tasks):
            return tasks[position - 1], tasks
        return None, tasks

    # Try partial title match (case-insensitive)
    identifier_lower = identifier.lower()
    for task in tasks:
        if identifier_lower in task.title.lower():
            return task, tasks

    return None, tasks


def format_task_list(tasks: list[Task], filter_type: str = "all") -> str:
    """Format tasks as a numbered list for display.

    Args:
        tasks: List of Task objects
        filter_type: 'all', 'pending', or 'completed'

    Returns:
        Formatted string with numbered tasks
    """
    if not tasks:
        return "No tasks found."

    filtered_tasks: list[tuple[int, Task]] = []
    for i, task in enumerate(tasks, 1):
        if filter_type == "all":
            filtered_tasks.append((i, task))
        elif filter_type == "pending" and not task.is_completed:
            filtered_tasks.append((i, task))
        elif filter_type == "completed" and task.is_completed:
            filtered_tasks.append((i, task))

    if not filtered_tasks:
        return f"No {filter_type} tasks found."

    lines = []
    for position, task in filtered_tasks:
        status = "[X]" if task.is_completed else "[ ]"
        line = f"{position}. {status} {task.title}"
        if task.description:
            line += f"\n   {task.description}"
        lines.append(line)

    return "\n".join(lines)


async def add_task(
    session: AsyncSession,
    user_id: uuid.UUID,
    title: str,
    description: str | None = None
) -> dict[str, Any]:
    """Add a new task for the user.

    Args:
        session: Database session
        user_id: UUID of the user
        title: Task title
        description: Optional task description

    Returns:
        Dict with success status and task details
    """
    task = Task(
        title=title,
        description=description,
        user_id=user_id
    )
    session.add(task)
    await session.commit()
    await session.refresh(task)

    return {
        "success": True,
        "message": f"Task '{title}' added successfully.",
        "task_id": str(task.id),
        "title": task.title,
        "description": task.description
    }


async def list_tasks(
    session: AsyncSession,
    user_id: uuid.UUID,
    filter: str = "all"  # noqa: A002 - named to match tool schema
) -> dict[str, Any]:
    """List user's tasks with optional filtering.

    Args:
        session: Database session
        user_id: UUID of the user
        filter: 'all', 'pending', or 'completed'

    Returns:
        Dict with task list and count
    """
    stmt = select(Task).where(Task.user_id == user_id).order_by(Task.created_at)
    result = await session.execute(stmt)
    tasks = list(result.scalars().all())

    formatted = format_task_list(tasks, filter)

    # Count based on filter
    if filter == "all":
        count = len(tasks)
    elif filter == "pending":
        count = sum(1 for t in tasks if not t.is_completed)
    else:  # completed
        count = sum(1 for t in tasks if t.is_completed)

    return {
        "success": True,
        "tasks": formatted,
        "count": count,
        "filter": filter
    }


async def complete_task(
    session: AsyncSession,
    user_id: uuid.UUID,
    task_identifier: str
) -> dict[str, Any]:
    """Mark a task as complete.

    Args:
        session: Database session
        user_id: UUID of the user
        task_identifier: Position number or title substring

    Returns:
        Dict with success status and result message
    """
    task, all_tasks = await find_task_by_identifier(task_identifier, user_id, session)

    if task is None:
        if not all_tasks:
            return {
                "success": False,
                "message": "You don't have any tasks yet. Add some tasks first!"
            }
        return {
            "success": False,
            "message": f"Could not find task '{task_identifier}'. Here are your tasks:\n{format_task_list(all_tasks)}"
        }

    if task.is_completed:
        return {
            "success": True,
            "message": f"Task '{task.title}' is already complete."
        }

    task.is_completed = True
    task.updated_at = datetime.utcnow()
    await session.commit()

    return {
        "success": True,
        "message": f"Task '{task.title}' marked as complete!"
    }


async def delete_task(
    session: AsyncSession,
    user_id: uuid.UUID,
    task_identifier: str,
    confirmed: bool = False
) -> dict[str, Any]:
    """Delete a task with confirmation.

    Args:
        session: Database session
        user_id: UUID of the user
        task_identifier: Position number or title substring
        confirmed: Whether deletion is confirmed

    Returns:
        Dict with success status, confirmation request if needed
    """
    task, all_tasks = await find_task_by_identifier(task_identifier, user_id, session)

    if task is None:
        if not all_tasks:
            return {
                "success": False,
                "message": "You don't have any tasks yet."
            }
        return {
            "success": False,
            "message": f"Could not find task '{task_identifier}'. Here are your tasks:\n{format_task_list(all_tasks)}"
        }

    if not confirmed:
        return {
            "success": False,
            "needs_confirmation": True,
            "message": f"Are you sure you want to delete task '{task.title}'? Please confirm."
        }

    title = task.title
    await session.delete(task)
    await session.commit()

    return {
        "success": True,
        "message": f"Task '{title}' has been deleted."
    }


async def update_task(
    session: AsyncSession,
    user_id: uuid.UUID,
    task_identifier: str,
    new_title: str | None = None,
    new_description: str | None = None
) -> dict[str, Any]:
    """Update a task's title or description.

    Args:
        session: Database session
        user_id: UUID of the user
        task_identifier: Position number or title substring
        new_title: New title (optional)
        new_description: New description (optional)

    Returns:
        Dict with success status and result
    """
    if not new_title and not new_description:
        return {
            "success": False,
            "message": "Please specify what to update (title or description)."
        }

    task, all_tasks = await find_task_by_identifier(task_identifier, user_id, session)

    if task is None:
        if not all_tasks:
            return {
                "success": False,
                "message": "You don't have any tasks yet. Add some tasks first!"
            }
        return {
            "success": False,
            "message": f"Could not find task '{task_identifier}'. Here are your tasks:\n{format_task_list(all_tasks)}"
        }

    changes = []
    if new_title:
        task.title = new_title
        changes.append(f"title to '{new_title}'")
    if new_description:
        task.description = new_description
        changes.append(f"description to '{new_description}'")

    task.updated_at = datetime.utcnow()
    await session.commit()

    return {
        "success": True,
        "message": f"Task updated: {', '.join(changes)}."
    }


async def mark_task_incomplete(
    session: AsyncSession,
    user_id: uuid.UUID,
    task_identifier: str
) -> dict[str, Any]:
    """Mark a task as incomplete.

    Args:
        session: Database session
        user_id: UUID of the user
        task_identifier: Position number or title substring

    Returns:
        Dict with success status and result message
    """
    task, all_tasks = await find_task_by_identifier(task_identifier, user_id, session)

    if task is None:
        if not all_tasks:
            return {
                "success": False,
                "message": "You don't have any tasks yet. Add some tasks first!"
            }
        return {
            "success": False,
            "message": f"Could not find task '{task_identifier}'. Here are your tasks:\n{format_task_list(all_tasks)}"
        }

    if not task.is_completed:
        return {
            "success": True,
            "message": f"Task '{task.title}' is already incomplete."
        }

    # Mark task as incomplete
    task.is_completed = False
    task.updated_at = datetime.utcnow()
    await session.commit()

    return {
        "success": True,
        "message": f"Task '{task.title}' marked as incomplete!"
    }


# Tool executor mapping
TOOL_EXECUTORS = {
    "add_task": add_task,
    "list_tasks": list_tasks,
    "complete_task": complete_task,
    "delete_task": delete_task,
    "update_task": update_task,
    "mark_task_incomplete": mark_task_incomplete
}
