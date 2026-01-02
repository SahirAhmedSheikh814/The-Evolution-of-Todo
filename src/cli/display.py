"""Display formatting utilities for the Todo CLI application."""

from typing import List

from models.todo import Task


def format_task_list(tasks: List[Task]) -> str:
    """Format task list for console display.

    Args:
        tasks: List of Task objects to format.

    Returns:
        Formatted string showing all tasks with descriptions.
    """
    if not tasks:
        return "No tasks yet! Add one to get started."

    lines: List[str] = []

    for task in tasks:
        lines.append(str(task))
        lines.append(f"  {task.description}")
        lines.append("")  # Empty line for separation

    return "\n".join(lines).strip()
