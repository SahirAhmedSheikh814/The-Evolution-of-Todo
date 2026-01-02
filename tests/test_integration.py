"""Integration tests for Todo CLI application."""

import pytest
from io import StringIO
from unittest.mock import patch

from services.task_manager import TaskManager
from cli.display import format_task_list
from cli.commands import handle_add, handle_list, handle_update, handle_delete, handle_toggle_complete


def test_full_workflow_add_and_list() -> None:
    """Test complete workflow: add task and view list."""
    manager = TaskManager()

    # Add task
    task = manager.add_task("Review PR", "Check code quality and test coverage")
    assert task.id == 1
    assert task.completed is False

    # View tasks
    tasks = manager.get_tasks()
    output = format_task_list(tasks)

    assert "Review PR" in output
    assert "[ ]" in output
    assert "Check code quality and test coverage" in output


def test_multiple_tasks_list() -> None:
    """Test listing multiple tasks with different states."""
    manager = TaskManager()

    task1 = manager.add_task("Task 1", "Description 1")
    task2 = manager.add_task("Task 2", "Description 2")
    task3 = manager.add_task("Task 3", "Description 3")

    # Mark one as complete
    manager.mark_complete(task2.id)

    tasks = manager.get_tasks()
    output = format_task_list(tasks)

    assert "Task 1" in output
    assert "Task 2" in output
    assert "Task 3" in output
    assert "[ ]" in output  # Incomplete
    assert "[X]" in output  # Complete


def test_empty_list_display() -> None:
    """Test displaying empty task list."""
    manager = TaskManager()

    tasks = manager.get_tasks()
    output = format_task_list(tasks)

    assert output == "No tasks yet! Add one to get started."


def test_toggle_complete_workflow() -> None:
    """Test toggle complete workflow."""
    manager = TaskManager()

    # Add task
    task = manager.add_task("Task", "Description")
    assert task.completed is False

    # Mark complete
    task = manager.mark_complete(task.id)
    assert task.completed is True

    # Toggle back
    task = manager.mark_complete(task.id)
    assert task.completed is False


def test_update_task_workflow() -> None:
    """Test update task workflow."""
    manager = TaskManager()

    # Add task
    task = manager.add_task("Old Title", "Old Description")
    assert task.title == "Old Title"

    # Update title only
    task = manager.update_task(task.id, new_title="New Title")
    assert task.title == "New Title"
    assert task.description == "Old Description"

    # Update description only
    task = manager.update_task(task.id, new_description="New Description")
    assert task.title == "New Title"
    assert task.description == "New Description"

    # Update both
    task = manager.update_task(task.id, new_title="Final Title", new_description="Final Description")
    assert task.title == "Final Title"
    assert task.description == "Final Description"


def test_delete_task_workflow() -> None:
    """Test delete task workflow."""
    manager = TaskManager()

    # Add multiple tasks
    task1 = manager.add_task("Task 1", "Description 1")
    task2 = manager.add_task("Task 2", "Description 2")
    task3 = manager.add_task("Task 3", "Description 3")

    assert len(manager.tasks) == 3

    # Delete middle task
    manager.delete_task(task2.id)

    assert len(manager.tasks) == 2
    assert manager.tasks[0].id == 1
    assert manager.tasks[1].id == 3

    # Delete all
    manager.delete_task(task1.id)
    manager.delete_task(task3.id)

    assert len(manager.tasks) == 0


def test_sequential_id_generation_after_deletion() -> None:
    """Test that IDs continue incrementing after deletion."""
    manager = TaskManager()

    task1 = manager.add_task("Task 1", "Description 1")
    task2 = manager.add_task("Task 2", "Description 2")
    task3 = manager.add_task("Task 3", "Description 3")

    # Delete task 2
    manager.delete_task(task2.id)

    # Next task should have ID 4, not reusing 2
    task4 = manager.add_task("Task 4", "Description 4")
    assert task4.id == 4


def test_error_handling_nonexistent_task() -> None:
    """Test error handling for operations on non-existent tasks."""
    manager = TaskManager()

    # Try to find non-existent task
    task = manager.find_task(999)
    assert task is None

    # Try to update non-existent task
    with pytest.raises(ValueError, match="not found"):
        manager.update_task(999, new_title="New Title")

    # Try to delete non-existent task
    with pytest.raises(ValueError, match="not found"):
        manager.delete_task(999)

    # Try to mark non-existent task complete
    with pytest.raises(ValueError, match="not found"):
        manager.mark_complete(999)


def test_error_handling_invalid_inputs() -> None:
    """Test error handling for invalid inputs."""
    manager = TaskManager()

    # Empty title
    with pytest.raises(ValueError, match="Title is required"):
        manager.add_task("", "Description")

    # Empty description
    with pytest.raises(ValueError, match="Description is required"):
        manager.add_task("Title", "")

    # Whitespace only
    with pytest.raises(ValueError, match="Title is required"):
        manager.add_task("   ", "Description")

    # Too long
    with pytest.raises(ValueError, match="Title must be 200 characters or less"):
        manager.add_task("a" * 201, "Description")


def test_special_characters_in_task_fields() -> None:
    """Test handling special characters in task fields."""
    manager = TaskManager()

    task = manager.add_task(
        "Task with émojis 🎉 & spëcial çhars",
        "Description with <html> tags, 'quotes', and \"double quotes\""
    )

    assert task.title == "Task with émojis 🎉 & spëcial çhars"
    assert task.description == 'Description with <html> tags, \'quotes\', and "double quotes"'


@patch('builtins.input')
def test_cli_add_command_success(mock_input) -> None:
    """Test CLI add command with user input."""
    mock_input.side_effect = ["Test Task", "Test Description"]

    manager = TaskManager()
    with patch('sys.stdout', new_callable=StringIO):
        handle_add(manager)

    assert len(manager.tasks) == 1
    assert manager.tasks[0].title == "Test Task"
    assert manager.tasks[0].description == "Test Description"


@patch('builtins.input')
def test_cli_add_command_empty_input(mock_input) -> None:
    """Test CLI add command with empty input."""
    mock_input.side_effect = ["", "Description"]

    manager = TaskManager()
    with patch('sys.stdout', new_callable=StringIO) as mock_out:
        handle_add(manager)

    output = mock_out.getvalue()
    assert "Error" in output
    assert len(manager.tasks) == 0
