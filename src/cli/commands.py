"""CLI command handlers for Todo CLI application."""

from cli.display import format_task_list
from services.task_manager import TaskManager


def handle_add(manager: TaskManager) -> bool:
    """Handle add task command.

    Args:
        manager: TaskManager instance.

    Returns:
        True to continue the CLI loop.
    """
    print("\n--- Add New Task ---")

    try:
        title = input("Enter task title: ").strip()
        description = input("Enter task description: ").strip()

        task = manager.add_task(title, description)
        print(f"\nTask {task.id} added successfully!")

    except ValueError as e:
        print(f"\nError: {e}")

    return True


def handle_list(manager: TaskManager) -> bool:
    """Handle list/view tasks command.

    Args:
        manager: TaskManager instance.

    Returns:
        True to continue the CLI loop.
    """
    print("\n--- View Tasks ---")

    tasks = manager.get_tasks()
    output = format_task_list(tasks)
    print(f"\n{output}")

    return True


def handle_update(manager: TaskManager) -> bool:
    """Handle update task command.

    Args:
        manager: TaskManager instance.

    Returns:
        True to continue the CLI loop, False on error.
    """
    print("\n--- Update Task ---")

    try:
        task_id_input = input("Enter task ID to update: ").strip()

        try:
            task_id = int(task_id_input)
        except ValueError:
            print("\nError: Invalid ID format. Please enter a number.")
            return True

        task = manager.find_task(task_id)

        if task is None:
            print(f"\nError: Task with ID {task_id} not found. Use 'View tasks' to see valid IDs.")
            return True

        print(f"\nCurrent task:")
        print(f"  Title: {task.title}")
        print(f"  Description: {task.description}")
        print()

        new_title = input("Enter new title (press Enter to keep current): ").strip()
        new_description = input("Enter new description (press Enter to keep current): ").strip()

        # At least one field must be provided
        if not new_title and not new_description:
            print("\nError: Please provide at least one field to update.")
            return True

        manager.update_task(task_id, new_title if new_title else None, new_description if new_description else None)
        print(f"\nTask {task_id} updated successfully!")

    except ValueError as e:
        print(f"\nError: {e}")

    return True


def handle_delete(manager: TaskManager) -> bool:
    """Handle delete task command.

    Args:
        manager: TaskManager instance.

    Returns:
        True to continue the CLI loop, False on error.
    """
    print("\n--- Delete Task ---")

    try:
        task_id_input = input("Enter task ID to delete: ").strip()

        try:
            task_id = int(task_id_input)
        except ValueError:
            print("\nError: Invalid ID format. Please enter a number.")
            return True

        task = manager.find_task(task_id)

        if task is None:
            print(f"\nError: Task with ID {task_id} not found. Use 'View tasks' to see valid IDs.")
            return True

        manager.delete_task(task_id)
        print(f"\nTask {task_id} deleted successfully!")

    except ValueError as e:
        print(f"\nError: {e}")

    return True


def handle_toggle_complete(manager: TaskManager) -> bool:
    """Handle toggle task completion command.

    Args:
        manager: TaskManager instance.

    Returns:
        True to continue the CLI loop, False on error.
    """
    print("\n--- Mark Task Complete/Incomplete ---")

    try:
        task_id_input = input("Enter task ID: ").strip()

        try:
            task_id = int(task_id_input)
        except ValueError:
            print("\nError: Invalid ID format. Please enter a number.")
            return True

        task = manager.find_task(task_id)

        if task is None:
            print(f"\nError: Task with ID {task_id} not found. Use 'View tasks' to see valid IDs.")
            return True

        # Show submenu for complete/incomplete choice
        print(f"\nCurrent status: {'Complete' if task.completed else 'Incomplete'}")
        print("1. Mark as Complete")
        print("2. Mark as Incomplete")

        choice_input = input("\nYour choice (1-2): ").strip()

        try:
            choice = int(choice_input)
            if choice == 1:
                manager.mark_complete_status(task_id)
                print(f"\nTask {task_id} marked as complete!")
            elif choice == 2:
                manager.mark_incomplete_status(task_id)
                print(f"\nTask {task_id} marked as incomplete!")
            else:
                print("\nError: Please choose either 1 (Complete) or 2 (Incomplete).")
        except ValueError:
            print("\nError: Invalid input. Task is already marked as Incomplete Please enter 1 to mark as Complete.")

    except ValueError as e:
        print(f"\nError: {e}")

    return True


def handle_exit(manager: TaskManager) -> bool:  # noqa: ARG001
    """Handle exit command.

    Args:
        manager: TaskManager instance (unused).

    Returns:
        False to exit the CLI loop.
    """
    print("\nGoodbye! Thank you for using Todo CLI.")
    return False
