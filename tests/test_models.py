"""Unit tests for Task model."""

from models.todo import Task


def test_task_creation() -> None:
    """Test Task object creation with all fields."""
    task = Task(id=1, title="Test Task", description="Test Description", completed=False)

    assert task.id == 1
    assert task.title == "Test Task"
    assert task.description == "Test Description"
    assert task.completed is False


def test_task_creation_with_defaults() -> None:
    """Test Task object creation with default completed value."""
    task = Task(id=1, title="Test Task", description="Test Description")

    assert task.completed is False


def test_task_str_representation_complete() -> None:
    """Test string representation for completed task."""
    task = Task(id=1, title="Test Task", description="Test Description", completed=True)

    result = str(task)
    assert result == "1: [X] Test Task"


def test_task_str_representation_incomplete() -> None:
    """Test string representation for incomplete task."""
    task = Task(id=1, title="Test Task", description="Test Description", completed=False)

    result = str(task)
    assert result == "1: [ ] Test Task"


def test_task_str_representation_various_ids() -> None:
    """Test string representation for various task IDs."""
    task1 = Task(id=42, title="Test", description="Desc")
    assert str(task1) == "42: [ ] Test"

    task2 = Task(id=100, title="Another", description="Desc", completed=True)
    assert str(task2) == "100: [X] Another"
