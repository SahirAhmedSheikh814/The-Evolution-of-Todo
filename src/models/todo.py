"""Task data model for the Todo CLI application."""

from dataclasses import dataclass


@dataclass
class Task:
    """Represents a todo item with completion status."""

    id: int
    title: str
    description: str
    completed: bool = False

    def __str__(self) -> str:
        """String representation for display.

        Returns:
            Formatted string showing ID, completion status, and title.
        """
        status = "[X]" if self.completed else "[ ]"
        return f"{self.id}: {status} {self.title}"
