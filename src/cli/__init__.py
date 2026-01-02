"""Todo CLI interface."""

from cli.commands import (
    handle_add,
    handle_delete,
    handle_exit,
    handle_list,
    handle_toggle_complete,
    handle_update,
)
from cli.display import format_task_list
from services.task_manager import TaskManager

__all__ = [
    "handle_add",
    "handle_delete",
    "handle_exit",
    "handle_list",
    "handle_toggle_complete",
    "handle_update",
    "format_task_list",
    "TaskManager",
]
