"""TaskManager service for managing todo items."""

from typing import List, Optional

from models.todo import Task


class TaskManager:
    """Manages todo items with CRUD operations and validation."""

    def __init__(self) -> None:
        """Initialize an empty task list and ID counter."""
        self.tasks: List[Task] = []
        self.next_id: int = 1

    def add_task(self, title: str, description: str) -> Task:
        """Add a new task to the list.

        Args:
            title: Brief task name.
            description: Detailed task information.

        Returns:
            The newly created Task object.

        Raises:
            ValueError: If title or description is invalid.
        """
        self._validate_fields(title, description)

        task = Task(id=self.next_id, title=title, description=description)
        self.tasks.append(task)
        self.next_id += 1
        return task

    def get_tasks(self) -> List[Task]:
        """Get all tasks.

        Returns:
            List of all Task objects.
        """
        return self.tasks.copy()

    def find_task(self, task_id: int) -> Optional[Task]:
        """Find a task by ID.

        Args:
            task_id: The unique identifier of the task.

        Returns:
            Task object if found, None otherwise.

        Raises:
            ValueError: If task_id is not a positive integer.
        """
        self._validate_id(task_id)

        for task in self.tasks:
            if task.id == task_id:
                return task
        return None

    def update_task(
        self,
        task_id: int,
        new_title: Optional[str] = None,
        new_description: Optional[str] = None,
    ) -> Task:
        """Update task title and/or description.

        Args:
            task_id: The unique identifier of the task.
            new_title: New title (optional).
            new_description: New description (optional).

        Returns:
            The updated Task object.

        Raises:
            ValueError: If task not found or invalid fields provided.
        """
        self._validate_id(task_id)
        task = self.find_task(task_id)

        if task is None:
            raise ValueError(f"Task with ID {task_id} not found.")

        if new_title is not None:
            if not new_title.strip():
                raise ValueError("Title cannot be empty.")
            task.title = new_title.strip()

        if new_description is not None:
            if not new_description.strip():
                raise ValueError("Description cannot be empty.")
            task.description = new_description.strip()

        return task

    def delete_task(self, task_id: int) -> None:
        """Delete a task by ID.

        Args:
            task_id: The unique identifier of the task.

        Raises:
            ValueError: If task not found or invalid task_id.
        """
        self._validate_id(task_id)
        task = self.find_task(task_id)

        if task is None:
            raise ValueError(f"Task with ID {task_id} not found.")

        self.tasks.remove(task)

    def mark_complete_status(self, task_id: int) -> Task:
        """Mark task as complete.

        Args:
            task_id: The unique identifier of the task.

        Returns:
            The updated Task object.

        Raises:
            ValueError: If task not found or invalid task_id.
        """
        self._validate_id(task_id)
        task = self.find_task(task_id)

        if task is None:
            raise ValueError(f"Task with ID {task_id} not found.")

        if task.completed:
            raise ValueError(f"Task with ID {task_id} is already complete.")

        task.completed = True
        return task

    def mark_incomplete_status(self, task_id: int) -> Task:
        """Mark task as incomplete.

        Args:
            task_id: The unique identifier of the task.

        Returns:
            The updated Task object.

        Raises:
            ValueError: If task not found or invalid task_id.
        """
        self._validate_id(task_id)
        task = self.find_task(task_id)

        if task is None:
            raise ValueError(f"Task with ID {task_id} not found.")

        if not task.completed:
            raise ValueError(f"Task with ID {task_id} is already incomplete.")

        task.completed = False
        return task

    def _validate_fields(self, title: str, description: str) -> None:
        """Validate task title and description.

        Args:
            title: Brief task name.
            description: Detailed task information.

        Raises:
            ValueError: If title or description is empty or too long.
        """
        if not title or not title.strip():
            raise ValueError("Title is required.")

        if not description or not description.strip():
            raise ValueError("Description is required.")

        if len(title) > 200:
            raise ValueError("Title must be 200 characters or less.")

        if len(description) > 200:
            raise ValueError("Description must be 200 characters or less.")

    def _validate_id(self, task_id: int) -> None:
        """Validate task ID.

        Args:
            task_id: The unique identifier of the task.

        Raises:
            ValueError: If task_id is not a positive integer.
        """
        if not isinstance(task_id, int) or task_id <= 0:
            raise ValueError("Invalid ID. Please enter a positive number.")
