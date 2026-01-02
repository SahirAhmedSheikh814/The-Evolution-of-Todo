# Implementation Plan: Phase I – Basic Todo Functionality

**Branch**: `001-basic-todo` | **Date**: 2026-01-01 | **Spec**: [specs/001-basic-todo/spec.md](../specs/001-basic-todo/spec.md)
**Input**: Feature specification from `/specs/001-basic-todo/spec.md`

## Summary

Build an in-memory Python console Todo application with 5 basic features (Add, View, Update, Delete, Mark Complete) using clean OOP architecture with clear separation of concerns (models, services, CLI). Application must be user-friendly with helpful error messages and deterministic, reproducible behavior.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: None (standard library only)
**Storage**: In-memory list or dict (no database, no file persistence)
**Testing**: pytest (standard library) or NEEDS CLARIFICATION
**Target Platform**: Linux/macOS/Windows (CLI application)
**Project Type**: single (console application)
**Performance Goals**: <100ms response time for all operations, <10s to add 5 tasks (target: <10s per task)
**Constraints**: <50MB memory usage, offline-capable (no external APIs)
**Scale/Scope**: Single user, unlimited tasks (in-memory only), CLI session

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

✅ **Principle I: Spec-Driven Development Only**
- No manual coding allowed
- Code generation via Spec-Kit Plus workflow

✅ **Principle II: Deterministic and Reproducible Output**
- No randomness in task ID generation (sequential 1, 2, 3...)
- Consistent behavior across runs

✅ **Principle III: Clean Architecture and Readable CLI UX**
- Clear separation: models, services, CLI
- User-friendly CLI with clear prompts and helpful error messages

✅ **Principle IV: Minimal but Complete MVP Functionality**
- 5 basic features only (Add, View, Update, Delete, Mark Complete)
- No feature creep

✅ **Principle V: User-Friendly and Error-Safe CLI Interaction**
- All inputs validated
- Graceful error handling (no crashes)
- Helpful error messages with corrective suggestions

✅ **Principle VI: Python Code Quality Standards**
- PEP 8 style
- Docstrings for all classes and public methods
- Readable structure with clear naming

**Status**: ✅ PASSED - All principles satisfied

## Project Structure

### Documentation (this feature)

```text
specs/001-basic-todo/
├── plan.md              # This file (/sp.plan command output)
├── spec.md              # Feature specification
└── tasks.md             # Implementation tasks (/sp.tasks command)
```

### Source Code (repository root)

```text
src/
├── __init__.py
├── models/              # Data models (Task class)
│   ├── __init__.py
│   └── todo.py
├── services/            # Business logic (TaskManager)
│   ├── __init__.py
│   └── task_manager.py
├── cli/                 # User interface layer
│   ├── __init__.py
│   ├── commands.py       # Command handlers
│   └── display.py        # Output formatting
└── main.py              # Application entry point

tests/
├── __init__.py
├── test_models.py       # Task model tests
├── test_services.py     # TaskManager tests
├── test_cli.py          # CLI interface tests
└── test_integration.py   # End-to-end CLI tests

docs/                    # Optional: Additional documentation
    └── ARCHITECTURE.md   # Architecture decisions
```

**Structure Decision**: Single project structure with clear separation of concerns. CLI application targets developers/evaluators running from terminal.

## Architecture Design

### Component Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CLI Layer (cli/)                       │
│  ┌──────────────────────────────────────────────────┐      │
│  │  main.py (entry point)                      │      │
│  │  └→ Command Dispatcher → Feature Handlers   │      │
│  └──────────────────────────────────────────────────┘      │
│                        ↓                                  │
│  ┌──────────────────────────────────────────────────┐      │
│  │  Services Layer (services/)                │      │
│  │  ┌────────────────────────────────────┐    │      │
│  │  │  TaskManager (business logic) │    │      │
│  │  │  - add_task()                 │    │      │
│  │  │  - get_tasks()                 │    │      │
│  │  │  - update_task()               │    │      │
│  │  │  - delete_task()               │    │      │
│  │  │  - mark_complete()            │    │      │
│  │  │  - validate_id()              │    │      │
│  │  │  - validate_fields()           │    │      │
│  │  └────────────────────────────────────┘    │      │
│  │           ↓                                      │      │
│  │  ┌────────────────────────────────────┐    │      │
│  │  │  Models Layer (models/)       │    │      │
│  │  │  ┌────────────────────────┐    │    │      │
│  │  │  │  Task (data class)  │    │      │
│  │  │  │  - id (int)          │    │      │
│  │  │  │  - title (str)        │    │      │
│  │  │  │  - description (str)   │    │      │
│  │  │  │  - completed (bool)   │    │      │
│  │  │  └────────────────────────┘    │      │
│  │  └────────────────────────────────────┘    │      │
│  └──────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────┘
```

### Layer Responsibilities

**Models Layer (models/)**:
- Pure data structures
- No business logic
- Type-safe with dataclasses or Pydantic
- Immutable where appropriate (task fields mutable)

**Services Layer (services/)**:
- Business logic encapsulation
- CRUD operations (Create, Read, Update, Delete)
- Input validation
- State management (in-memory task list)
- No UI/presentation logic

**CLI Layer (cli/)**:
- User interaction (input/output)
- Command parsing and routing
- Display formatting
- Error message presentation
- No business logic

**Entry Point (main.py)**:
- Application lifecycle management
- Command dispatcher
- Error handling at top level
- Welcome message and cleanup

### Design Patterns

**Singleton Pattern**: TaskManager as singleton for consistent state
**Strategy Pattern**: Display formatters (list vs single view)
**Factory Pattern**: Task creation with validation
**Command Pattern**: CLI commands as callable objects
**Repository Pattern (In-Memory)**: TaskRepository abstracts storage for future persistence

### State Management

**Storage Strategy**: In-memory Python list
```python
tasks: List[Task] = []
next_id: int = 1
```

**Rationale**:
- Simple and fast for Phase 1
- No persistence complexity (aligns with scope)
- Easy to test and debug
- Prepared for Phase 2 persistent upgrades

**Task ID Generation**:
```python
next_id += 1  # Sequential 1, 2, 3...
```

**Constraint**: IDs never reused after deletion (continue incrementing)

## Data Model

### Task Entity

```python
@dataclass
class Task:
    """Represents a todo item with completion status."""

    id: int                      # Unique sequential identifier
    title: str                    # Brief task name (required, non-empty)
    description: str              # Detailed task info (required, non-empty)
    completed: bool              # Task completion status (False by default)

    def __str__(self) -> str:
        """String representation for display."""
        status = "[X]" if self.completed else "[ ]"
        return f"{self.id}: {status} {self.title}"
```

**Validation Rules** (from spec):
- `id`: Must be positive integer (>0)
- `title`: Must be non-empty, max 200 chars, strip whitespace
- `description`: Must be non-empty, max 200 chars, strip whitespace
- `completed`: Boolean, default False

**State Transitions**:
- New task: `completed=False`
- Mark complete: `completed=True`
- Mark incomplete: `completed=False`
- Delete: Removed from list (ID never reused)

## Implementation Details

### Phase 0: Infrastructure

**Not Required** - No Phase 0 research needed. All technology choices are clear from specification and constitution.

### Phase 1: Implementation Tasks

**Implementation Order**:
1. Project setup (UV, pyproject.toml)
2. Models layer (Task dataclass)
3. Services layer (TaskManager with CRUD)
4. CLI layer (commands, display, input handling)
5. Entry point (main.py with command loop)
6. Tests (unit tests for each layer)
7. Documentation (README.md, CLAUDE.md)
8. Quality assurance (linting, manual CLI testing)

**Key Decisions**:
- **TaskManager as class with instance**: Not module-level singleton (simpler for testing)
- **CLI loop in main()**: `while True:` with explicit exit condition
- **Input validation in TaskManager**: Centralized validation logic
- **Error messages in display module**: Consistent error message templates

**Quality Standards**:
- **Type hints**: All functions use `typing` module
- **Docstrings**: All classes and public methods have docstrings
- **PEP 8**: 88-character line limit, 4-space indentation, spaces around operators
- **No magic numbers**: Constants for any configurable values
- **Error handling**: Try-except only at I/O boundaries, logic errors use explicit checks

## Testing Strategy

### Test Structure

```text
tests/
├── test_models.py       # Task dataclass tests
├── test_services.py     # TaskManager CRUD and validation tests
├── test_cli.py          # Display formatting and error message tests
└── test_integration.py   # End-to-end CLI workflow tests
```

### Test Coverage Goals

- **Unit Tests**:
  - Task model: creation, string representation
  - TaskManager: add, get, update, delete, mark_complete
  - Input validation: empty fields, non-numeric IDs, out of range
  - Error conditions: task not found, invalid ID format

- **Integration Tests**:
  - Add task → View task list → Verify task appears
  - Mark complete → View task list → Verify [X] marker
  - Update task → View task list → Verify changes
  - Delete task → View task list → Verify removal
  - Empty list handling → View tasks → Verify "No tasks yet!" message
  - Invalid input handling → All error paths

**Target Coverage**: 80%+ (measured by pytest --cov)
**Acceptance Criteria from Spec**:
- SC-001: Add 5 tasks in <1 minute (manual validation)
- SC-002: Display 50+ tasks in <100ms (automatic test)
- SC-003: 100% error handling without crashes (manual validation)
- SC-004: All 5 user stories functional (manual validation)
- SC-005: Python 3.13+ and PEP 8 (pylint validation)
- SC-006: Clean architecture (code review)
- SC-007: All operations confirm (manual validation)

### Manual Testing Checklist

Before declaring complete:
- [ ] Add task with valid input - verify ID generation
- [ ] Add task with empty title/description - verify error message
- [ ] View empty list - verify "No tasks yet!" message
- [ ] View list with 10+ tasks - verify formatting
- [ ] Update task (title only) - verify update
- [ ] Update task (description only) - verify update
- [ ] Update task (both fields) - verify update
- [ ] Update task with invalid ID - verify error message
- [ ] Update task with empty fields - verify error message
- [ ] Delete task - verify removal and confirmation
- [ ] Delete non-existent task - verify error message
- [ ] Mark complete - verify [X] marker
- [ ] Mark incomplete - verify [ ] marker
- [ ] Toggle non-existent task - verify error message
- [ ] Enter non-numeric ID - verify error message
- [ ] Enter negative/zero ID - verify error message
- [ ] Ctrl+C - verify graceful return to menu
- [ ] Exit command - verify goodbye message
- [ ] Long description (>200 chars) - verify handling
- [ ] Special characters - verify display
- [ ] Whitespace-only input - verify error message

## Success Metrics

**Performance Metrics**:
- Task list display time: <100ms (target)
- Add task operation: <10s including input (target)
- Memory usage: <50MB for 1000+ tasks

**Quality Metrics**:
- Linting: pylint score ≥9.5/10
- Type checking: mypy strict mode passing
- Test coverage: ≥80% lines covered
- PEP 8 compliance: 0 errors, <5 warnings

**User Experience Metrics**:
- First-time use: Complete add+view in <30s
- Error message clarity: Qualitative assessment during evaluation
- CLI intuition: Numbered options (1-5) are self-explanatory

## Risk Mitigation

### Identified Risks (from spec)

**Risk 1: Users may expect persistence between sessions**
- **Mitigation**: Document in-memory nature in README.md and startup message
- **Implementation**: Add startup message: "Note: Tasks are stored in memory only. All data is lost when the application exits."

**Risk 2: Terminal width variations may affect output formatting**
- **Mitigation**: Use text wrapping with `textwrap` module
- **Implementation**: Test on various terminal widths (80, 120, 240 characters)
- **Note**: Document wrapping behavior in README.md

**Risk 3: Large task lists may become unwieldy in CLI**
- **Mitigation**: For Phase 2 - add pagination or filtering
- **Phase 1 approach**: Accept current limitation, document in success criteria
- **Note**: This is out of scope for Phase 1 MVP

## Open Questions

None - all architecture decisions are specified and ready for implementation.

## Next Steps

1. ✅ **Generate task breakdown**: Run `/sp.tasks` to create implementation tasks
2. ✅ **Execute implementation**: Run `/sp.implement` or `/sp.phase1` to build the application
3. ✅ **Quality assurance**: Run `/sp.qa` to validate against success criteria
4. ✅ **Documentation**: Ensure README.md and CLAUDE.md are complete
5. ✅ **Review readiness**: Verify project is hackathon-ready

## Complexity Tracking

**Complexity Level**: LOW (MVP with in-memory storage, no external dependencies)

**Simplification Decisions**:
- No database layer (out of scope)
- No authentication/authorization (out of scope)
- No external dependencies (standard library only)
- Single session (no persistence)

**Rationale**: Complexity is appropriate for Phase 1 foundation. Future phases will add complexity (persistence, multi-user, etc.).
