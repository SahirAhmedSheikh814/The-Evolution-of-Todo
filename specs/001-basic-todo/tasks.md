# Tasks: Phase I – Basic Todo Functionality

**Input**: Design documents from `/specs/001-basic-todo/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md (optional)

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

---

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

### T001 [P] Create project structure
Create `/src` directory with subdirectories for models, services, and CLI. Create `/tests` directory with placeholder `__init__.py` files. This establishes the folder structure for all code.

**File**: `src/` (directory)
**Acceptance**: Directory structure exists with `/src/models/`, `/src/services/`, `/src/cli/`, `/tests/` subdirectories

### T002 [P] Initialize UV and configure pyproject.toml
Initialize UV package manager and create `pyproject.toml` file with Python 3.13+ requirement. Configure project metadata with name "todo-cli" and version "0.1.0". No external dependencies needed for MVP.

**File**: `pyproject.toml`
**Acceptance**: UV can resolve project, `pyproject.toml` has Python 3.13+ requirement, project metadata configured

### T003 [P] Create placeholder documentation files
Create empty `README.md` and `CLAUDE.md` files in project root. These will be populated in later phases with actual usage instructions and development guidelines. Having the files created early allows the implementation to reference them as needed.

**Files**: `README.md`, `CLAUDE.md`
**Acceptance**: Files exist with basic placeholder content (will be completed in Phase 10)

---

## Phase 2: Foundation - [Story: US1]

### T004 [P] [Story: US1] Implement Task dataclass
Create `Task` dataclass in `src/models/todo.py` using Python's `@dataclass` decorator for clean, minimal code. The Task class should have fields: `id` (integer), `title` (string), `description` (string), and `completed` (boolean, default False). Implement a `__str__` method for clean string representation in the format "ID: [X] Title" where [X] is shown for completed tasks.

**File**: `src/models/todo.py`
**Acceptance**: Task dataclass created with all required fields, `__str__` method implemented for display format

### T005 [P] [Story: US1] Implement TaskManager class with validation
Create `TaskManager` class in `src/services/task_manager.py`. The TaskManager should have an empty `__init__` method to initialize an in-memory task list and a `next_id` counter starting at 1. Implement the following methods as private: `add_task(title, description)`, `get_tasks()`, `find_task(task_id)`, `update_task(task_id, new_title=None, new_description=None)`, `delete_task(task_id)`, `mark_complete(task_id)`, `validate_fields(title, description)`, and `validate_id(task_id)`. The validation methods should raise `ValueError` with descriptive messages matching the specification requirements. Use a simple Python list to store Task objects.

**File**: `src/services/task_manager.py`
**Acceptance**: TaskManager class created with all CRUD methods and validation logic

### T006 [P] [Story: US1] Implement TaskManager CRUD methods
Ensure the CRUD operations work correctly. Add methods: `add_task` should create and return a new Task object with sequential ID, add it to the in-memory list, and increment the counter. `delete_task` should find the task by ID and remove it from the list without reusing IDs. `mark_complete` should toggle the completed boolean and provide feedback. All methods should maintain state consistency.

**File**: `src/services/task_manager.py`
**Acceptance**: All CRUD operations functional, state management works correctly

### T007 [P] [Story: US1] Create CLI command handlers
Create `commands.py` file in `src/cli/` directory. Define a function for each of the 5 main commands: add, list, update, delete, toggle complete, and exit. Each command handler should be a pure function that accepts a `TaskManager` instance and any necessary parameters. Implement a simple command parser in the same file that can map numeric input or string input to the appropriate command handler. Commands should be designed to be called from a main application loop.

**File**: `src/cli/commands.py`
**Acceptance**: All 5 command handlers implemented, command parser ready

### T008 [P] [Story: US1] Implement CLI display formatter
Create `display.py` file in `src/cli/` directory. Implement the `format_task_list(tasks)` function that accepts a list of Task objects and returns a formatted string for console display. The output should show each task on a separate line with the format "ID: [X] Title" followed by the description on the next line. Handle the empty list case by returning "No tasks yet! Add one to get started." message.

**File**: `src/cli/display.py`
**Acceptance**: Task list formatter created, handles empty list and formatting correctly

### T009 [P] [Story: US1] Implement add command handler
In `src/cli/commands.py`, implement the `handle_add(manager)` function. This function should prompt the user for title and description sequentially using `input()` function. Call `manager.validate_fields(title, description)` to validate the inputs. If valid, call `manager.add_task(title, description)` and display the confirmation message "Task {id} added successfully!". Return True to continue the loop.

**File**: `src/cli/commands.py`
**Acceptance**: Add command handler works, validation and confirmation messages correct

### T010 [P] [Story: US1] Implement list command handler
In `src/cli/commands.py`, implement the `handle_list(manager)` function. Call `manager.get_tasks()` to retrieve all tasks. Call `display.format_task_list(tasks)` to format and print the output. Return True to continue the loop.

**File**: `src/cli/commands.py`
**Acceptance**: List command handler works, tasks retrieved and displayed correctly

---

## Phase 3: Foundation - [Story: US2]

### T011 [P] [Story: US2] Implement view command handler
The view command is already implemented in Task010. If the spec requires specific view behavior (e.g., filter by completion status), enhance the implementation accordingly. Otherwise, this task can be marked as not needed if the basic list view is sufficient.

**File**: `src/cli/commands.py` (may be enhanced)
**Acceptance**: View functionality working as specified

### T012 [P] [Story: US2] Implement main CLI loop and menu system
Create `main.py` file in the project root (`src/main.py` based on plan). This should be the application entry point. Create a `display_menu()` function that prints a numbered menu (1-5) with clear descriptions for each action. The main function should create a `TaskManager` instance, then enter an infinite loop that repeatedly: prints the menu, gets user input using `input()`, processes the input, and continues. Include a graceful exit when the user selects option 5. Add a welcome message at startup explaining that this is the Todo CLI and noting that tasks are stored in memory only.

**File**: `src/main.py`
**Acceptance**: Main application loop created with menu system, welcome message, and exit handling

---

## Phase 4: Features - [Story: US3]

### T013 [P] [Story: US3] Implement update command handler
In `src/cli/commands.py`, implement `handle_update(manager)` function. This function should prompt the user for a task ID using `input()`. Call `manager.find_task(task_id)` to locate the task. If not found, display an error and return False. If found, prompt for new title and/or new description. Call `manager.validate_fields()` on the provided new values. If valid, call `manager.update_task(task_id, new_title, new_description)` to update the task. Display the confirmation message "Task {id} updated successfully!" and return True.

**File**: `src/cli/commands.py`
**Acceptance**: Update command handler works, partial updates supported

---

## Phase 5: Features - [Story: US5]

### T016 [P] [Story: US5] Implement delete command handler
In `src/cli/commands.py`, implement `handle_delete(manager)` function. This function should prompt the user for a task ID using `input()`. Call `manager.find_task(task_id)` to locate the task. If not found, display an error message "Task with ID {id} not found. Use 'View tasks' to see valid IDs." and return False. If found, call `manager.delete_task(task_id)` to remove it from the list. Display the confirmation message "Task {id} deleted successfully!" and return True.

**File**: `src/cli/commands.py`
**Acceptance**: Delete command handler works, error handling for invalid IDs

---

## Phase 6: Integration - [Story: US4]

### T017 [P] [Story: US4] Integrate all command handlers
Ensure all command handlers (add, list, update, delete, toggle complete) are integrated in the `commands.py` module. Create a command mapping dictionary or list that maps string commands or numeric inputs to the appropriate handler functions. The command parser should be able to handle this mapping and call the correct handler.

**File**: `src/cli/commands.py` (may be enhanced)
**Acceptance**: All command handlers integrated into command parser

### T018 [P] [Story: US4] Create main.py entry point
The main.py file should be created as specified in T012. Ensure all imports are correct and the application can run without errors.

**File**: `src/main.py` (may be enhanced)
**Acceptance**: Main entry point created, application can be executed

---

## Phase 7: Testing

### T019 [P] Implement unit tests for Task class
Create `tests/test_models.py` file. Write unit tests for the Task dataclass using pytest. Test the `__str__` method output format to ensure the display string matches the expected pattern "ID: [X] Title". Test the instantiation and attribute initialization.

**File**: `tests/test_models.py`
**Acceptance**: Task model tests created and passing

### T020 [P] Implement unit tests for TaskManager
Create `tests/test_services.py` file. Write unit tests for the TaskManager CRUD operations and validation logic. Test that the task list is correctly maintained, IDs are sequential, and methods return appropriate objects. Use fixtures to test various edge cases (empty list, non-existent task for updates/deletes, invalid inputs).

**File**: `tests/test_services.py`
**Acceptance**: TaskManager tests created and passing

### T021 [P] Implement integration tests for CLI
Create `tests/test_integration.py` file. Write integration tests that simulate user interactions with the CLI commands. Test the complete workflow: add tasks, view list, update tasks, delete tasks, toggle completion. Use mocks for the TaskManager to test functionality without relying on real implementation details. Verify that error messages are helpful and correct.

**File**: `tests/test_integration.py`
**Acceptance**: Integration tests created and passing

---

## Phase 8: Documentation

### T022 [P] Write README.md
Populate `README.md` with comprehensive project documentation. Include: project title "The Evolution of Todo - Phase 1: In-Memory Python CLI", brief description, installation instructions using UV, usage examples showing all 5 features, notes on in-memory storage (data loss on exit), and troubleshooting section. The README should be clear enough for a first-time user to get started within 30 seconds.

**File**: `README.md`
**Acceptance**: README.md complete with clear setup and usage instructions

### T023 [P] Write CLAUDE.md
Populate `CLAUDE.md` with development guidelines for this project. Reference the constitution principles: spec-driven development only, clean architecture with clear separation of concerns, user-friendly CLI, Python 3.13+ and PEP 8 standards. Include project structure documentation, coding standards, testing guidelines, and workflow notes following Spec-Kit Plus.

**File**: `CLAUDE.md`
**Acceptance**: CLAUDE.md complete with development guidelines aligned with constitution

---

## Phase 9: Quality Assurance

### T024 [P] Run pylint validation
Run pylint on the `/src` directory with Python 3.13+ compatibility. Fix any linting errors found to ensure code quality meets PEP 8 standards. The target is a pylint score of 9.5/10 with no errors and minimal warnings.

**Command**: `pylint src/ --max-line-length=88`
**File**: N/A (command output)
**Acceptance**: pylint score ≥9.5/10, PEP 8 compliant

### T025 [P] Run mypy type checking
Run mypy in strict mode on the source code to catch type errors before runtime. Ensure all function signatures include proper type hints and no `Any` types. Fix all type errors found.

**Command**: `mypy --strict src/`
**File**: N/A (command output)
**Acceptance**: mypy strict mode passing, no type errors

### T026 [P] Run pytest with coverage
Run pytest with coverage reporting on the entire test suite. Ensure at least 80% code coverage as specified in the success criteria. The `--cov-report=term-missing` flag will show which lines are not covered by tests.

**Command**: `pytest tests/ --cov=src --cov-report=term-missing`
**File**: N/A (command output)
**Acceptance**: Test coverage ≥80%, all tests passing

---

## Dependencies

**User Story Completion Order** (based on priority from spec.md):
1. **US1 (P1)**: Add New Tasks
   - US2 (P2): View Task List
   - US5 (P2): Mark Task Complete/Incomplete
   - US3 (P3): Update Task Details
   - US4 (P3): Delete Tasks

2. **Cross-Story Dependencies**:
   - US3 (Update Task) and US4 (Delete Task) can be implemented in parallel after US2 is complete
   - US5 (Toggle Complete) depends on US2 (to see task list)
   - All phases block: Phase 3 (US2) blocks Phase 4, etc.

---

## Implementation Strategy

**MVP First Approach**: Complete the Setup and US1 phases first to establish the add functionality as the minimum viable product. This allows users to create and view tasks immediately. Then proceed to US2, US5, US3, and US4 for the remaining features.

**Test-Driven Development**: While not explicitly requested in the specification, consider implementing unit tests for each major component (Task class, TaskManager, command handlers) as they are built. This follows TDD principles and will make quality assurance easier.

**Incremental Delivery**: Each phase can be independently tested and validated. This reduces integration risk and allows for course correction if needed.

**Quality Focus**: Emphasize code quality (type hints, PEP 8, docstrings) and CLI UX (clear prompts, helpful error messages) throughout all implementation tasks as specified in the constitution and NFRs.

---

## Summary

**Total Tasks**: 26 tasks (T001-T026)

**Task Count by Phase**:
- Phase 1 (Setup): 3 tasks
- Phase 2 (US1): 7 tasks
- Phase 3 (US2): 2 tasks
- Phase 4 (US3): 2 tasks
- Phase 5 (US5): 1 task
- Phase 6 (US4): 2 tasks
- Phase 7 (Testing): 3 tasks
- Phase 8 (Documentation): 2 tasks
- Phase 9 (Quality Assurance): 3 tasks

**Parallel Opportunities**:
- T013 (US2 view) and T016 (US5 delete) can be implemented in parallel
- All Phase 7 testing tasks can be done in parallel with Phase 1-6 implementation

**Estimated Duration**: 4-6 hours of focused development time

**Next Step**: Ready for implementation with `/sp.implement` or `/sp.phase1`
