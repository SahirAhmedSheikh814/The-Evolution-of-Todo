"""Main entry point for Todo CLI application."""

from cli.commands import (
    handle_add,
    handle_delete,
    handle_exit,
    handle_list,
    handle_toggle_complete,
    handle_update,
)
from services.task_manager import TaskManager


def display_menu() -> None:
    """Display the main menu options."""
    print("\n" + "=" * 50)
    print("Todo CLI Application")
    print("=" * 50)
    print("1. Add Task")
    print("2. View Tasks")
    print("3. Update Task")
    print("4. Delete Task")
    print("5. Mark Complete/Incomplete")
    print("0. Exit")
    print("=" * 50)


def get_user_choice() -> int:
    """Get and validate user's menu choice.

    Returns:
        Validated menu choice as integer.
    """
    while True:
        try:
            choice = input("\nEnter your choice (0-5): ").strip()
            choice_int = int(choice)

            if 0 <= choice_int <= 5:
                return choice_int
            else:
                print("\nError: Please enter a number between 0 and 5.")
        except ValueError:
            print("\nError: Invalid input. Please enter a number.")


def main() -> None:
    """Main application loop."""
    print("\nWelcome to Todo CLI!")
    print("Note: Tasks are stored in memory only. All data is lost when the application exits.")
    print("Press Ctrl+C at any time to return to the menu.")

    manager = TaskManager()

    while True:
        try:
            display_menu()
            choice = get_user_choice()

            if choice == 1:
                handle_add(manager)
            elif choice == 2:
                handle_list(manager)
            elif choice == 3:
                handle_update(manager)
            elif choice == 4:
                handle_delete(manager)
            elif choice == 5:
                handle_toggle_complete(manager)
            elif choice == 0:
                if not handle_exit(manager):
                    break

        except KeyboardInterrupt:
            print("\n\nOperation cancelled. Returning to menu.")
            continue
        except Exception as e:  # noqa: BLE001 - Catch all unexpected errors
            print(f"\nUnexpected error: {e}")
            print("Returning to menu...")


if __name__ == "__main__":
    main()
