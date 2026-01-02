"""Unit tests for TaskManager service."""

import pytest

from models.todo import Task
from services.task_manager import TaskManager


def test_mark_complete_to_complete(manager: TaskManager) -> None:
    """Test marking task as complete."""
    manager.add_task("Task", "Description")
    task = manager.mark_complete_status(manager.get_tasks()[0].id)
    assert task.completed is True


def test_mark_incomplete_to_incomplete(manager: TaskManager) -> None:
    """Test marking task as incomplete."""
    manager.add_task("Task", "Description")
    manager.mark_complete_status(manager.get_tasks()[0].id)  # Mark as complete first
    task = manager.mark_incomplete_status(manager.get_tasks()[0].id)
    assert task.completed is False


@pytest.fixture
def manager() -> TaskManager:
    """Create a fresh TaskManager instance for each test."""
    return TaskManager()


def test_manager_initialization(manager: TaskManager) -> None:
    """Test TaskManager initializes with empty task list."""
    assert manager.tasks == []
    assert manager.next_id == 1


def test_add_task_success(manager: TaskManager) -> None:
    """Test adding a task successfully."""
    task = manager.add_task("Test Task", "Test Description")

    assert task.id == 1
    assert task.title == "Test Task"
    assert task.description == "Test Description"
    assert task.completed is False
    assert len(manager.tasks) == 1


def test_add_task_sequential_ids(manager: TaskManager) -> None:
    """Test that tasks get sequential IDs."""
    task1 = manager.add_task("Task 1", "Description 1")
    task2 = manager.add_task("Task 2", "Description 2")
    task3 = manager.add_task("Task 3", "Description 3")

    assert task1.id == 1
    assert task2.id == 2
    assert task3.id == 3
    assert manager.next_id == 4


def test_add_task_empty_title(manager: TaskManager) -> None:
    """Test adding task with empty title raises error."""
    with pytest.raises(ValueError, match="Title is required"):
        manager.add_task("", "Description")


def test_add_task_whitespace_only_title(manager: TaskManager) -> None:
    """Test adding task with whitespace-only title raises error."""
    with pytest.raises(ValueError, match="Title is required"):
        manager.add_task("   ", "Description")


def test_add_task_empty_description(manager: TaskManager) -> None:
    """Test adding task with empty description raises error."""
    with pytest.raises(ValueError, match="Description is required"):
        manager.add_task("Title", "")


def test_add_task_title_too_long(manager: TaskManager) -> None:
    """Test adding task with title longer than 200 characters raises error."""
    long_title = "a" * 201
    with pytest.raises(ValueError, match="Title must be 200 characters or less"):
        manager.add_task(long_title, "Description")


def test_add_task_description_too_long(manager: TaskManager) -> None:
    """Test adding task with description longer than 200 characters raises error."""
    long_description = "b" * 201
    with pytest.raises(ValueError, match="Description must be 200 characters or less"):
        manager.add_task("Title", long_description)


def test_get_tasks_empty(manager: TaskManager) -> None:
    """Test getting tasks when none exist."""
    tasks = manager.get_tasks()
    assert tasks == []


def test_get_tasks_returns_copy(manager: TaskManager) -> None:
    """Test that get_tasks returns a copy, not the actual list."""
    manager.add_task("Task 1", "Description 1")
    tasks = manager.get_tasks()

    # Modifying returned list should not affect manager's list
    tasks.clear()
    assert len(manager.tasks) == 1


def test_find_task_exists(manager: TaskManager) -> None:
    """Test finding an existing task."""
    manager.add_task("Task 1", "Description 1")
    task = manager.find_task(1)

    assert task is not None
    assert task.id == 1
    assert task.title == "Task 1"


def test_find_task_not_found(manager: TaskManager) -> None:
    """Test finding a non-existent task."""
    task = manager.find_task(999)
    assert task is None


def test_update_task_title(manager: TaskManager) -> None:
    """Test updating task title."""
    manager.add_task("Old Title", "Description")
    updated = manager.update_task(1, new_title="New Title")

    assert updated.title == "New Title"
    assert updated.description == "Description"


def test_update_task_description(manager: TaskManager) -> None:
    """Test updating task description."""
    manager.add_task("Title", "Old Description")
    updated = manager.update_task(1, new_description="New Description")

    assert updated.title == "Title"
    assert updated.description == "New Description"


def test_update_task_both_fields(manager: TaskManager) -> None:
    """Test updating both title and description."""
    manager.add_task("Old Title", "Old Description")
    updated = manager.update_task(1, new_title="New Title", new_description="New Description")

    assert updated.title == "New Title"
    assert updated.description == "New Description"


def test_update_task_not_found(manager: TaskManager) -> None:
    """Test updating non-existent task raises error."""
    with pytest.raises(ValueError, match="Task with ID 999 not found"):
        manager.update_task(999, new_title="New Title")


def test_update_task_invalid_id(manager: TaskManager) -> None:
    """Test updating task with invalid ID raises error."""
    with pytest.raises(ValueError, match="Invalid ID"):
        manager.update_task(0, new_title="Title")


def test_delete_task_success(manager: TaskManager) -> None:
    """Test deleting a task successfully."""
    manager.add_task("Task 1", "Description 1")
    manager.add_task("Task 2", "Description 2")

    assert len(manager.tasks) == 2
    manager.delete_task(1)
    assert len(manager.tasks) == 1
    assert manager.tasks[0].id == 2


def test_delete_task_not_found(manager: TaskManager) -> None:
    """Test deleting non-existent task raises error."""
    with pytest.raises(ValueError, match="Task with ID 999 not found"):
        manager.delete_task(999)


def test_mark_complete_to_complete(manager: TaskManager) -> None:
    """Test marking task as complete."""
    manager.add_task("Task", "Description")
    task = manager.mark_complete(1)

    assert task.completed is True


def test_mark_complete_to_incomplete(manager: TaskManager) -> None:
    """Test marking completed task as incomplete."""
    manager.add_task("Task", "Description")
    manager.mark_complete(1)  # Mark complete
    task = manager.mark_complete(1)  # Toggle back

    assert task.completed is False


def test_mark_complete_not_found(manager: TaskManager) -> None:
    """Test marking non-existent task raises error."""
    with pytest.raises(ValueError, match="Task with ID 999 not found"):
        manager.mark_complete(999)


def test_validate_id_positive_integer(manager: TaskManager) -> None:
    """Test that positive integers pass ID validation."""
    # This should not raise an exception
    manager.find_task(1)
    manager.find_task(999)


def test_validate_id_zero(manager: TaskManager) -> None:
    """Test that ID of 0 raises error."""
    with pytest.raises(ValueError, match="Invalid ID"):
        manager.find_task(0)


def test_validate_id_negative(manager: TaskManager) -> None:
    """Test that negative ID raises error."""
    with pytest.raises(ValueError, match="Invalid ID"):
        manager.find_task(-1)
