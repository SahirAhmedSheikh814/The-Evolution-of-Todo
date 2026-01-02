---
name: sp.phase1
description: Execute the complete Phase 1 workflow including capability specification validation, architecture design with OOP principles, prototype implementation with unit tests, and console/CLI UI quality checks
version: 1.0.0
---

# Phase 1 Development Skill (sp.phase1)

## Overview

The **sp.phase1** skill orchestrates the complete initial development workflow for Phase 1 of any project. It ensures a solid foundation by systematically coordinating specification, design, implementation, and quality assurance activities. This skill encapsulates proven practices from successful Phase 1 executions and makes them reusable across projects.

**Phase 1 Goal**: Build a production-quality, in-memory Python console Todo application with clean OOP architecture, comprehensive testing, and professional user experience.

## When to Use

### Primary Use Cases

1. **Starting Phase 1 Development**
   - User is ready to begin Phase 1 of the hackathon project
   - Constitution is established and ready for implementation
   - Team wants to follow structured workflow from concept to validated code

2. **During Initial Coding Requests**
   - User says "Let's start building Phase 1"
   - User requests "Implement the basic todo app"
   - User asks "Can we begin Phase 1 development?"

3. **After Constitution/Planning**
   - Constitution principles are defined
   - High-level project structure is understood
   - Ready to move from planning to execution

4. **Validating Phase 1 Completeness**
   - User wants to verify Phase 1 is complete before moving to Phase 2
   - Need comprehensive validation of all deliverables
   - Ensuring quality gates are met

### Command Invocation

```bash
# Start Phase 1 workflow from beginning
/sp.phase1

# Resume Phase 1 from where it left off (if interrupted)
/sp.phase1 --resume

# Validate Phase 1 completion status
/sp.phase1 --validate

# Run specific stage of Phase 1
/sp.phase1 --stage=implementation
```

### When NOT to Use

- **Before Constitution**: Run `/sp.constitution` first to establish principles
- **For Phase 2+**: Use phase-specific skills (sp.phase2, sp.phase3, etc.)
- **For Single Features**: Use standard workflow (`/sp.specify`, `/sp.plan`, `/sp.implement`)
- **For Exploration**: Use exploration or prototyping skills, not full Phase 1

### Trigger Patterns

Invoke this skill when user says:
- "Let's start Phase 1"
- "Begin Phase 1 development"
- "I'm ready to implement Phase 1"
- "Execute the Phase 1 workflow"
- "Validate Phase 1 is complete"

## Procedure

Phase 1 executes the following stages in strict sequence. Each stage has specific deliverables and quality gates that must pass before proceeding.

### Workflow Stages Overview

```
Constitution → Specify → Clarify → Plan → Tasks → Implement → QA → Complete
     ↓            ↓         ↓        ↓       ↓        ↓        ↓       ↓
   Validate    Define   Resolve   Design  Break   Build    Test   Verify
  Principles   Scope     Gaps    System   Down    Code   Quality  Ready
```

---

### Stage 1: Constitution Validation

**Objective**: Ensure project principles and constraints are established.

**Actions**:
1. Check if `.specify/memory/constitution.md` exists
2. If missing: Stop and instruct user to run `/sp.constitution`
3. If exists: Validate it contains core principles, constraints, quality standards

**Validations**:
- [ ] Constitution file exists at `.specify/memory/constitution.md`
- [ ] At least 3 core principles defined and measurable
- [ ] Technical constraints explicit (Python 3.13+, UV, in-memory, CLI)
- [ ] Quality standards defined (code style, testing, documentation)
- [ ] Success criteria clear and testable

**Output**:
```
✓ Constitution validated
  Location: .specify/memory/constitution.md
  Principles: 5 defined
  Constraints: Python 3.13+, UV, in-memory, CLI
  Quality Standards: Code style, testing (80% coverage), documentation
```

**On Failure**: Stop workflow and output:
```
✗ Constitution not found

Phase 1 requires established project principles.
Run `/sp.constitution` to create constitution.md first.

Phase 1 workflow cannot proceed without constitution.
```

---

### Stage 2: Capability Specification Definition and Validation

**Objective**: Define complete requirements with clear acceptance criteria, ensuring completeness, consistency, and feasibility.

**Actions**:
1. Check if `specs/phase-1/spec.md` exists
2. If missing: Stop and instruct user to run `/sp.specify phase-1`
3. If exists: Validate specification completeness and quality

**Validation Checks**:

**a) Scope Definition**:
- [ ] In-scope features explicitly listed (5 todo features)
- [ ] Out-of-scope features documented (persistence, multi-user, etc.)
- [ ] Technical boundaries clear (in-memory, single-session)

**b) Feature Specifications (all 5 features)**:
- [ ] Add new todos: Complete specification
- [ ] List all todos: Complete specification
- [ ] Mark todos as complete: Complete specification
- [ ] Delete todos: Complete specification
- [ ] Exit application: Complete specification

For each feature:
- [ ] Detailed description provided
- [ ] Input requirements specified
- [ ] Output format defined
- [ ] Error scenarios documented
- [ ] Edge cases identified

**c) Acceptance Criteria**:
- [ ] Each feature has testable acceptance criteria
- [ ] CLI behavior explicitly defined
- [ ] User interaction flow documented
- [ ] Success/failure conditions clear

**d) Naming Consistency**:
- [ ] Feature names follow consistent convention
- [ ] Class/module names follow Python conventions (PascalCase for classes)
- [ ] Function/variable names descriptive and consistent (snake_case)
- [ ] No naming conflicts between features

**e) Requirements Completeness**:
- [ ] All inputs/outputs specified
- [ ] Error handling requirements complete
- [ ] Edge cases covered (empty input, invalid types, boundary values)
- [ ] Dependencies and assumptions documented

**f) Feasibility Check**:
- [ ] Requirements achievable with Python 3.13+ and in-memory storage
- [ ] No database/persistence required (in-memory constraint met)
- [ ] CLI-based interface sufficient for all features
- [ ] Technical constraints aligned with constitution

**Output**:
```
✓ Capability Specification validated
  Location: specs/phase-1/spec.md
  Features: 5/5 fully specified
    ✓ Add new todos
    ✓ List all todos
    ✓ Mark todos as complete
    ✓ Delete todos
    ✓ Exit application
  Acceptance Criteria: Complete (5/5 features)
  Naming: Consistent (snake_case functions, PascalCase classes)
  Completeness: All requirements explicit
  Feasibility: ✓ Achievable with constraints
  Conflicts: None detected
```

**On Failure**:
```
✗ Capability Specification validation failed

Issues detected:
1. spec.md:45 - Delete todo feature missing error handling specification
2. spec.md:67 - List todos missing pagination requirements (or explicit "no pagination")
3. Naming inconsistency: "addTodo" vs "delete_todo" (camelCase vs snake_case)

Action Required:
1. Update spec.md to address issues above
2. Run `/sp.clarify` to resolve ambiguities
3. Re-run `/sp.phase1` after fixes

Phase 1 workflow stopped until specification issues resolved.
```

---

### Stage 3: Clarifications Resolution

**Objective**: Resolve any ambiguous or underspecified areas.

**Actions**:
1. Analyze spec.md for ambiguities:
   - Vague requirements ("user-friendly" without specifics)
   - Missing error handling specifications
   - Unclear input/output formats
   - Undefined edge case behavior
   - Ambiguous acceptance criteria

2. If ambiguities found: Suggest running `/sp.clarify`
3. Allow user to proceed with documented assumptions if they choose

**Ambiguity Detection**:
- [ ] All error messages defined (or template specified)
- [ ] Input validation rules explicit (types, ranges, formats)
- [ ] Edge case behavior specified (empty lists, invalid input)
- [ ] Output formatting clear (list format, completion indicators)
- [ ] User interaction flow unambiguous

**Output (No Ambiguities)**:
```
✓ Clarifications check: No critical ambiguities detected
  Specification is clear and unambiguous
  All edge cases defined
  Error handling specified
```

**Output (Ambiguities Found)**:
```
⚠ Ambiguities detected in specification

Ambiguities requiring clarification:
1. spec.md:23 - Error message content not specified for invalid menu choice
2. spec.md:45 - Delete confirmation prompt not specified (yes/no or just execute?)
3. spec.md:78 - Empty todo list message not specified

Recommendation: Run `/sp.clarify` to resolve these ambiguities

Options:
1. Run clarification now (recommended)
2. Proceed with documented assumptions (will document assumptions in plan.md)
3. Stop and manually update spec.md

Your choice: _
```

**On User Choice**:
- **Choice 1**: Run `/sp.clarify`, wait for responses, update spec.md, continue
- **Choice 2**: Document assumptions, continue with noted risks
- **Choice 3**: Stop workflow, user updates spec.md manually

---

### Stage 4: Architecture Design with OOP Principles

**Objective**: Design software architecture with object-oriented principles, classes, modules, and design patterns.

**Actions**:
1. Check if `specs/phase-1/plan.md` exists
2. If missing: Stop and instruct user to run `/sp.plan`
3. If exists: Validate architectural design quality

**Validation Checks**:

**a) Object-Oriented Design**:
- [ ] Class structure clearly defined (models, managers, UI)
- [ ] Single Responsibility Principle applied to each class
- [ ] Class relationships documented (composition, inheritance)
- [ ] Interfaces/abstractions identified where appropriate
- [ ] Separation of concerns (data, business logic, presentation)

**Example Expected Classes**:
```python
Todo (models.py):
  - Represents a single todo item
  - Attributes: id, description, completed
  - Methods: __init__, __str__, mark_complete

TodoManager (manager.py):
  - Business logic for todo operations
  - Methods: add_todo, get_todos, complete_todo, delete_todo
  - Maintains in-memory list of todos

TodoUI (ui.py):
  - User interface layer for CLI
  - Methods: display_menu, get_user_choice, show_todos, show_message
  - Handles all console I/O
```

**b) SOLID Principles**:
- [ ] **S**ingle Responsibility: Each class has one clear purpose
- [ ] **O**pen/Closed: Classes extensible without modification
- [ ] **L**iskov Substitution: Derived classes properly substitutable
- [ ] **I**nterface Segregation: No forced unused dependencies
- [ ] **D**ependency Inversion: Depend on abstractions where appropriate

**c) Module Structure**:
- [ ] File/module organization follows Python conventions
- [ ] Module dependencies clearly mapped
- [ ] No circular dependencies
- [ ] Clear entry point (main.py)

**Expected Structure**:
```
/src/todo_app/
  __init__.py          # Package initialization
  models.py            # Todo data model
  manager.py           # TodoManager business logic
  ui.py                # TodoUI presentation layer
  main.py              # Application entry point
```

**d) Design Patterns**:
- [ ] Appropriate patterns identified (Factory, Strategy, etc.)
- [ ] Pattern usage justified and not over-engineered
- [ ] MVC/MVT separation maintained

**e) Technical Stack**:
- [ ] Python 3.13+ specified
- [ ] UV package manager documented
- [ ] Dependencies listed (if any beyond standard library)
- [ ] Project structure defined

**f) Data Model**:
- [ ] Todo entity structure defined (attributes, types)
- [ ] In-memory storage strategy specified (list, dict, etc.)
- [ ] Data validation rules documented

**g) CLI Interface Design**:
- [ ] Menu structure designed (numbered options 1-5)
- [ ] Input prompts specified ("Enter todo description:")
- [ ] Output formatting planned (list with [X] for completed)
- [ ] Error message templates defined

**Output**:
```
✓ Architecture design validated
  Location: specs/phase-1/plan.md

  Classes:
    ✓ Todo (models.py) - Single responsibility: data model
    ✓ TodoManager (manager.py) - Single responsibility: business logic
    ✓ TodoUI (ui.py) - Single responsibility: presentation

  SOLID Principles:
    ✓ Single Responsibility: Each class has one purpose
    ✓ Open/Closed: Extensible design
    ✓ Liskov Substitution: N/A (no inheritance)
    ✓ Interface Segregation: Clean interfaces
    ✓ Dependency Inversion: TodoManager → Todo abstraction

  Module Structure:
    ✓ Clear separation: models / manager / ui / main
    ✓ No circular dependencies
    ✓ Follows Python package conventions

  Design Patterns:
    ✓ Factory pattern for Todo creation (appropriate)
    ✓ Strategy pattern for display formatting (appropriate)
    ✓ Not over-engineered

  Technical Stack:
    ✓ Python 3.13+
    ✓ UV package manager
    ✓ Standard library only (no external dependencies)

  ADRs Created:
    ✓ 001-in-memory-storage-strategy.md (justifies list vs dict choice)
```

**On Failure**:
```
✗ Architecture design validation failed

Issues detected:
1. Missing class: TodoUI not defined (UI logic mixed in main.py)
2. SRP violation: TodoManager handles both business logic AND console I/O
3. No separation between data model and business logic
4. Design pattern: No clear pattern for todo creation

Action Required:
1. Run `/sp.plan` to redesign architecture
2. Separate concerns: Todo (model), TodoManager (logic), TodoUI (presentation)
3. Apply SOLID principles to class design

Phase 1 workflow stopped until architecture issues resolved.
```

**ADR Suggestion**:
If architecturally significant decision detected:
```
📋 Architectural decision detected: In-memory storage using list vs dict

This decision impacts:
- Performance of todo lookup operations
- Memory usage patterns
- Code complexity

Document reasoning and tradeoffs? Run `/sp.adr in-memory-storage-strategy`

Create ADR now? (yes/no): _
```

---

### Stage 5: Task Breakdown

**Objective**: Create testable, dependency-ordered tasks with explicit acceptance criteria.

**Actions**:
1. Check if `specs/phase-1/tasks.md` exists
2. If missing: Stop and instruct user to run `/sp.tasks`
3. If exists: Validate task breakdown quality

**Validation Checks**:

**a) Task Organization**:
- [ ] Tasks organized by phase (Setup, Tests, Core, Integration, Polish)
- [ ] Each task has unique ID
- [ ] Task descriptions clear and actionable
- [ ] File paths specified for each task
- [ ] Dependencies between tasks documented

**b) Acceptance Criteria**:
- [ ] Each task has explicit acceptance criteria
- [ ] Criteria are testable and measurable
- [ ] Success conditions clearly defined
- [ ] Validation methods specified (manual test, unit test, etc.)

**c) Task Granularity**:
- [ ] Tasks are atomic (single responsibility)
- [ ] No tasks too large (estimate: <2 hours work)
- [ ] No tasks too trivial (grouped appropriately)
- [ ] Proper feature breakdown into subtasks

**d) Test-Driven Development**:
- [ ] Test tasks before implementation tasks
- [ ] Test coverage targets specified (80%+)
- [ ] Test scenarios match acceptance criteria

**e) Feature Coverage**:
- [ ] All 5 features have corresponding tasks
- [ ] Setup tasks (project structure, dependencies)
- [ ] Testing tasks (unit tests)
- [ ] Documentation tasks (README, docstrings)
- [ ] QA tasks (linting, validation)

**Output**:
```
✓ Task breakdown validated
  Location: specs/phase-1/tasks.md

  Total Tasks: 18
  Phases:
    - Setup: 3 tasks
    - Tests: 4 tasks (TDD: tests before implementation)
    - Core: 8 tasks (5 features + 3 supporting)
    - Integration: 2 tasks
    - Polish: 1 task

  Coverage:
    ✓ Add new todos (2 tasks: test + implementation)
    ✓ List all todos (2 tasks: test + implementation)
    ✓ Mark complete (2 tasks: test + implementation)
    ✓ Delete todos (2 tasks: test + implementation)
    ✓ Exit application (1 task: implementation)

  Acceptance Criteria: Complete (18/18 tasks)
  Dependencies: Clearly mapped (sequential + parallel)
  Granularity: Appropriate (avg 1 hour per task)
```

**On Failure**:
```
✗ Task breakdown validation failed

Issues detected:
1. Missing test tasks for "delete todos" feature
2. Task 12 too large: "Implement all UI methods" (should be broken down)
3. Acceptance criteria missing for task 15
4. No documentation tasks (README, docstrings)

Action Required:
Run `/sp.tasks` to regenerate task breakdown with proper granularity.

Phase 1 workflow stopped until task breakdown issues resolved.
```

---

### Stage 6: Pre-Implementation Quality Assurance

**Objective**: Validate all design artifacts before writing code.

**Actions**:
1. Run `/sp.qa --phase=pre-implementation`
2. Validate specifications, architecture, and tasks
3. Check constitution compliance
4. Ensure no conflicts or contradictions

**QA Sections**:

**a) Specification Validation**:
- Naming consistency
- Requirements completeness
- Specification conflicts
- Feasibility check

**b) Architecture Validation**:
- OOP design quality
- SOLID principles applied
- Design patterns appropriate
- Module structure clean

**c) Task Validation**:
- Complete feature coverage
- Acceptance criteria explicit
- Proper granularity
- Test-driven approach

**d) Constitution Compliance**:
- All principles followed in design
- Constraints respected
- Quality standards defined

**Output (Pass)**:
```
✓ Pre-Implementation QA: PASSED

## Quality Assurance Report (Pre-Implementation)
Overall Status: ✓ PASS
Total Checks: 24
Passed: 24
Warnings: 0
Failed: 0

Section Scores:
1. Capability Specification: ✓ PASS (12/12)
2. Architecture Design: ✓ PASS (8/8)
3. Task Breakdown: ✓ PASS (4/4)
4. Constitution Compliance: ✓ PASS (5/5)

All design artifacts validated. Ready to begin implementation.
```

**Output (Warnings)**:
```
⚠ Pre-Implementation QA: PASSED WITH WARNINGS

## Quality Assurance Report (Pre-Implementation)
Overall Status: ⚠ WARNINGS
Total Checks: 24
Passed: 22
Warnings: 2
Failed: 0

Section Scores:
1. Capability Specification: ✓ PASS (12/12)
2. Architecture Design: ⚠ WARNINGS (6/8)
3. Task Breakdown: ✓ PASS (4/4)
4. Constitution Compliance: ✓ PASS (5/5)

Warnings:
1. Architecture: Consider adding type hints for all public methods (not specified in plan.md)
2. Architecture: README.md could include troubleshooting section (optional)

These warnings are non-blocking. Proceed? (yes/no): _
```

**On Failure**:
```
✗ Pre-Implementation QA: FAILED

Critical issues must be resolved before implementation:
1. spec.md:45 - Delete feature missing error handling specification
2. plan.md:67 - TodoManager class violates SRP (mixing UI and logic)
3. tasks.md:12 - Missing acceptance criteria for task 12

Action Required:
Fix critical issues and re-run `/sp.phase1`

Phase 1 workflow stopped until QA passes.
```

---

### Stage 7: Prototype Implementation with Unit Tests

**Objective**: Implement prototype code following OOP design, with unit tests and coding standards.

**Actions**:
1. Prompt user for implementation confirmation
2. Invoke phase1-builder agent to execute tasks
3. Monitor implementation progress
4. Validate each task against acceptance criteria
5. Create PHRs for implementation sessions

**Implementation Flow**:

**Phase 1: Setup (3 tasks)**
- Create project structure (`/src/todo_app/` with modules)
- Configure UV and dependencies (pyproject.toml)
- Setup testing infrastructure (pytest configuration)

**Phase 2: Tests (4 tasks) - TDD Red Phase**
- Write Todo model tests (test_models.py)
- Write TodoManager tests (test_manager.py)
- Write TodoUI tests (test_ui.py)
- Write integration tests (test_main.py)

**Phase 3: Core Implementation (8 tasks) - TDD Green Phase**
- Implement Todo model class (models.py)
- Implement TodoManager (add, list, complete, delete) (manager.py)
- Implement TodoUI (menu, prompts, display) (ui.py)
- Implement main application loop (main.py)
- All tests passing after each implementation

**Phase 4: Integration (2 tasks)**
- CLI integration testing (manual validation)
- Edge case testing (empty lists, invalid input)

**Phase 5: Polish (1 task)**
- Add docstrings and documentation
- Final linting and type checking
- README.md completion

**Quality Checks During Implementation**:
For each task:
- [ ] Code follows OOP principles (SRP, encapsulation)
- [ ] Type hints used consistently
- [ ] Docstrings for classes and public methods
- [ ] Unit tests written and passing
- [ ] Acceptance criteria verified
- [ ] No linting errors (pylint/flake8)
- [ ] PHR created for session

**Output (Progressive)**:
```
Starting Phase 1 Implementation...

Ready to begin implementation.
This will execute 18 tasks from specs/phase-1/tasks.md.
Proceed? (yes/no): yes

Launching phase1-builder agent...

─────────────────────────────────────────────────────────────
SETUP PHASE (3 tasks)
─────────────────────────────────────────────────────────────

[1/18] Setup: Create project structure... ✓ DONE (12s)
  Created: /src/todo_app/__init__.py
  Created: /src/todo_app/models.py
  Created: /src/todo_app/manager.py
  Created: /src/todo_app/ui.py
  Created: /src/todo_app/main.py
  Acceptance: ✓ All files exist with proper package structure

[2/18] Setup: Configure UV and dependencies... ✓ DONE (8s)
  Created: pyproject.toml
  Config: Python 3.13+, no external dependencies
  Acceptance: ✓ UV can resolve project (uv sync successful)

[3/18] Setup: Configure pytest... ✓ DONE (5s)
  Created: pytest.ini
  Created: /tests/__init__.py
  Acceptance: ✓ pytest discovers tests directory

─────────────────────────────────────────────────────────────
TESTS PHASE - TDD RED (4 tasks)
─────────────────────────────────────────────────────────────

[4/18] Tests: Write Todo model tests... ✓ DONE (15s)
  Created: /tests/test_models.py with 5 test cases
  Tests: ✗ 5 failed (expected - TDD red phase)
  Acceptance: ✓ Tests fail before implementation (correct TDD)

[5/18] Tests: Write TodoManager tests... ✓ DONE (20s)
  Created: /tests/test_manager.py with 8 test cases
  Tests: ✗ 8 failed (expected - TDD red phase)
  Acceptance: ✓ Tests fail before implementation (correct TDD)

[6/18] Tests: Write TodoUI tests... ✓ DONE (18s)
  Created: /tests/test_ui.py with 6 test cases
  Tests: ✗ 6 failed (expected - TDD red phase)
  Acceptance: ✓ Tests fail before implementation (correct TDD)

[7/18] Tests: Write integration tests... ✓ DONE (12s)
  Created: /tests/test_main.py with 3 test cases
  Tests: ✗ 3 failed (expected - TDD red phase)
  Acceptance: ✓ Tests fail before implementation (correct TDD)

─────────────────────────────────────────────────────────────
CORE IMPLEMENTATION - TDD GREEN (8 tasks)
─────────────────────────────────────────────────────────────

[8/18] Implement: Todo model class... ✓ DONE (22s)
  Implemented: Todo class with id, description, completed
  Code: Type hints, docstrings, proper encapsulation
  Tests: ✓ 5/5 passing (TDD green!)
  Coverage: 100% for models.py
  Linting: ✓ No errors (pylint 10.0/10)
  Acceptance: ✓ All model tests pass, OOP principles followed

[9/18] Implement: TodoManager.add_todo... ✓ DONE (18s)
  Implemented: add_todo(description) method
  Tests: ✓ 2/8 passing (add_todo tests green)
  Coverage: 45% for manager.py
  Acceptance: ✓ Can add todos to in-memory list

[10/18] Implement: TodoManager.get_todos... ✓ DONE (15s)
  Implemented: get_todos() method
  Tests: ✓ 4/8 passing (get_todos tests green)
  Coverage: 65% for manager.py
  Acceptance: ✓ Returns list of all todos

[11/18] Implement: TodoManager.complete_todo... ✓ DONE (20s)
  Implemented: complete_todo(todo_id) method
  Tests: ✓ 6/8 passing (complete tests green)
  Coverage: 80% for manager.py
  Acceptance: ✓ Marks todo as completed

[12/18] Implement: TodoManager.delete_todo... ✓ DONE (18s)
  Implemented: delete_todo(todo_id) method
  Tests: ✓ 8/8 passing (all manager tests green!)
  Coverage: 100% for manager.py
  Acceptance: ✓ Deletes todo from list

[13/18] Implement: TodoUI (menu, prompts, display)... ✓ DONE (35s)
  Implemented: display_menu, get_choice, show_todos, show_message
  Tests: ✓ 6/6 passing (all UI tests green!)
  Coverage: 100% for ui.py
  Acceptance: ✓ Clear prompts, formatted output, error handling

[14/18] Implement: Main application loop... ✓ DONE (25s)
  Implemented: main() with menu loop and feature routing
  Tests: ✓ 3/3 passing (integration tests green!)
  Coverage: 95% for main.py
  Acceptance: ✓ Application runs, handles all 5 features

[15/18] Implement: Error handling and edge cases... ✓ DONE (20s)
  Enhanced: Input validation, error messages, edge cases
  Tests: ✓ All 22 tests passing
  Coverage: 98% overall
  Acceptance: ✓ Graceful handling of invalid input, empty lists

─────────────────────────────────────────────────────────────
INTEGRATION & POLISH (3 tasks)
─────────────────────────────────────────────────────────────

[16/18] Integration: Manual CLI testing... ✓ DONE (10m)
  Tested: All 5 features with valid and invalid inputs
  Validation: ✓ Menu clear, prompts descriptive, errors helpful
  Acceptance: ✓ All features work end-to-end

[17/18] Polish: Add docstrings and documentation... ✓ DONE (15s)
  Updated: Docstrings for all classes and public methods
  Updated: README.md with setup, usage, testing instructions
  Acceptance: ✓ All code documented

[18/18] Polish: Final validation... ✓ DONE (30s)
  Ran: pylint (10.0/10), mypy (all checks pass), pytest (22/22)
  Coverage: 98% (target: 80%)
  Acceptance: ✓ All quality gates passed

─────────────────────────────────────────────────────────────
IMPLEMENTATION COMPLETE
─────────────────────────────────────────────────────────────

Tasks completed: 18/18
Duration: ~45 minutes
Tests: 22/22 passing
Coverage: 98%
Linting: 10.0/10

Ready for post-implementation QA.
```

**On Blocker**:
```
[12/18] Implement: TodoManager.delete_todo... ✗ BLOCKED

Blocker: pytest not configured in pyproject.toml
Error: ModuleNotFoundError: No module named 'pytest'

Resolution needed:
1. Add pytest to pyproject.toml dependencies
2. Run `uv add --dev pytest`
3. Resume with `/sp.phase1 --resume`

Phase 1 implementation paused. Resolve blocker and resume.
```

---

### Stage 8: Post-Implementation Quality Assurance

**Objective**: Comprehensive QA including console/CLI UI checks (clear instructions, no confusing output).

**Actions**:
1. Run `/sp.qa` (full validation)
2. Validate code quality, OOP design, testing, CLI UX
3. Manual CLI testing for user experience
4. Verify all acceptance criteria met

**QA Sections**:

**a) Capability Specification Compliance**:
- All 5 features implemented as specified
- Acceptance criteria met
- No scope creep (unspecified features)

**b) OOP Design Quality**:
- Class structure matches plan.md
- SOLID principles followed in code
- Proper encapsulation (private/public)
- Design patterns correctly implemented
- No code smells (long methods, magic numbers, duplication)

**c) Automated Code QA**:
- Linting passes (pylint/flake8 score 9+/10)
- Type checking passes (mypy strict mode)
- Unit tests all passing (22/22)
- Test coverage ≥80% (target met)
- No debug statements (print, console.log removed)

**d) Console/CLI UI Quality** (Critical for Phase 1):
- [ ] **Clear Instructions**: Welcome message explains how to use app
- [ ] **User-Friendly Menu**: Options numbered (1-5) and descriptive
- [ ] **Descriptive Prompts**: Input prompts clear ("Enter todo description:" not just ">")
- [ ] **Formatted Output**: Todos displayed in readable format with [X] for completed
- [ ] **Helpful Error Messages**: Errors explain problem AND suggest action
  - Example: "Invalid choice. Please enter a number between 1 and 5."
- [ ] **No Confusing Output**: No cryptic messages, stack traces, or debug output
- [ ] **Graceful Error Handling**: App recovers from errors, doesn't crash
- [ ] **Edge Cases Handled**: Empty todo list shows friendly message ("No todos yet!")
- [ ] **Clean Exit**: Application exits with goodbye message

**e) Professional Standards**:
- README.md complete (setup, usage, testing)
- CLAUDE.md present with dev guidelines
- Docstrings for all classes and methods
- Code follows Python conventions (PEP 8)
- Version in pyproject.toml
- .gitignore configured
- No secrets committed

**f) Constitution Compliance**:
- All principles followed
- Constraints met (Python 3.13+, UV, in-memory, CLI)
- Quality standards achieved

**Manual CLI Testing Procedure**:
```
1. Run: python src/todo_app/main.py
2. Test add todo: Enter valid description, verify confirmation
3. Test list todos: Verify readable format with completion status
4. Test mark complete: Select todo, verify [X] appears
5. Test delete: Delete todo, verify removal confirmation
6. Test invalid input: Enter "abc" for menu choice, check error message
7. Test empty list: Delete all todos, verify "No todos yet!" message
8. Test exit: Choose exit option, verify clean goodbye message
```

**Output (Pass)**:
```
✓ Post-Implementation QA: PASSED

## Quality Assurance Report
Generated: 2026-01-01 19:30:00 UTC
Feature: phase-1
Phase: implementation

Overall Status: ✓ PASS
Total Checks: 56
Passed: 56
Warnings: 0
Failed: 0

Section Scores:
1. Capability Specification: ✓ PASS (12/12)
2. OOP Design: ✓ PASS (18/18)
3. Automated QA: ✓ PASS (8/8)
4. CLI Quality: ✓ PASS (6/6)
5. Professional Standards: ✓ PASS (11/11)
6. Constitution Compliance: ✓ PASS (5/5)

───────────────────────────────────────────────────────────────
CLI UI VALIDATION (Manual Testing)
───────────────────────────────────────────────────────────────

✓ Clear Instructions:
  Welcome message: "Todo App - Manage your tasks"
  Instructions: "Select an option from the menu below"

✓ User-Friendly Menu:
  Options clearly numbered:
    1. Add a new todo
    2. List all todos
    3. Mark todo as complete
    4. Delete a todo
    5. Exit

✓ Descriptive Prompts:
  Add todo: "Enter todo description: "
  Mark complete: "Enter todo ID to mark complete: "
  Delete: "Enter todo ID to delete: "

✓ Formatted Output:
  List format:
    ID: 1 [ ] Buy groceries
    ID: 2 [X] Finish homework
  Clear completion indicator [X]

✓ Helpful Error Messages:
  Invalid menu: "Invalid choice. Please enter a number between 1 and 5."
  Invalid ID: "Todo with ID 99 not found. Use 'List todos' to see valid IDs."
  Empty input: "Description cannot be empty. Please try again."

✓ No Confusing Output:
  No stack traces in user-facing errors
  No debug print statements
  No cryptic error codes

✓ Graceful Error Handling:
  Invalid input: App displays error, returns to menu (doesn't crash)
  Empty list: Shows "No todos yet! Add one to get started."
  Out of range: Explains valid range, prompts again

✓ Clean Exit:
  Exit message: "Thank you for using Todo App. Goodbye!"
  Process exits cleanly (exit code 0)

───────────────────────────────────────────────────────────────
MANUAL FEATURE TESTING RESULTS
───────────────────────────────────────────────────────────────

✓ Add todo: Works correctly
  - Accepts description
  - Confirms addition: "Todo added successfully! (ID: 1)"
  - Returns to menu

✓ List todos: Shows all todos
  - Empty list: "No todos yet! Add one to get started."
  - With todos: Formatted list with IDs and completion status
  - Clear, readable output

✓ Mark complete: Updates status
  - Prompts for ID
  - Updates todo to completed [X]
  - Confirms: "Todo marked as complete!"
  - Handles invalid ID gracefully

✓ Delete todo: Removes todo
  - Prompts for ID
  - Removes from list
  - Confirms: "Todo deleted successfully!"
  - Handles invalid ID gracefully

✓ Exit: Clean exit
  - Displays goodbye message
  - Exits without errors

All acceptance criteria met. Phase 1 is production-ready!
```

**Output (Warnings)**:
```
⚠ Post-Implementation QA: PASSED WITH WARNINGS

Overall Status: ⚠ WARNINGS (48/56 passed, 8 warnings)

Warnings requiring attention:
1. Test coverage 75% (target: 80%) - Add error path tests
2. CLI error message could be more specific: "Invalid input" → "Invalid choice. Please enter 1-5."
3. Long method: main.py:run_application (65 lines) - Consider extracting menu handling
4. Missing docstring: TodoManager.delete_todo()

Recommendations:
- Address test coverage before Phase 2
- Enhance error messages for better UX
- Refactor long method (optional)
- Add missing docstring (quick fix)

Proceed to completion despite warnings? (yes/no): _
```

**On Failure**:
```
✗ Post-Implementation QA: FAILED

Critical issues detected:
1. CLI UI: Error messages confusing - "Error: None" shown to user
2. OOP Design: SRP violation - TodoManager mixing UI and logic
3. Automated QA: Test coverage 45% (target: 80%)
4. CLI UI: Application crashes on invalid input (IndexError not caught)

These issues must be fixed before Phase 1 can be marked complete.

Action Required:
1. Fix error handling to show helpful messages
2. Refactor TodoManager to separate concerns
3. Add unit tests to achieve 80% coverage
4. Add try-except for invalid input handling

Phase 1 workflow stopped. Fix issues and re-run `/sp.phase1 --validate`
```

---

### Stage 9: Phase Completion Validation

**Objective**: Validate all Phase 1 deliverables before marking complete.

**Actions**:
1. Verify project structure matches specification
2. Validate all deliverables present
3. Run final integration tests
4. Generate Phase 1 completion report

**Deliverables Checklist**:

**Project Structure**:
```
✓ /src/todo_app/
  ✓ __init__.py
  ✓ models.py        (Todo class)
  ✓ manager.py       (TodoManager class)
  ✓ ui.py            (TodoUI class)
  ✓ main.py          (Entry point)
✓ /tests/
  ✓ test_models.py
  ✓ test_manager.py
  ✓ test_ui.py
  ✓ test_main.py
✓ /specs/phase-1/
  ✓ spec.md          (Requirements)
  ✓ plan.md          (Architecture)
  ✓ tasks.md         (Implementation tasks)
✓ /history/
  ✓ /prompts/phase-1/  (8 PHRs)
  ✓ /adr/              (1 ADR)
✓ README.md          (Complete with setup, usage, testing)
✓ CLAUDE.md          (Development guidelines)
✓ pyproject.toml     (Python 3.13+, UV config)
✓ .gitignore         (Configured for Python)
```

**Feature Validation (End-to-End)**:
- [ ] Add new todos: Works correctly
- [ ] List all todos: Shows formatted list with completion status
- [ ] Mark todos as complete: Updates status correctly
- [ ] Delete todos: Removes from list correctly
- [ ] Exit application: Clean exit with goodbye message

**Quality Metrics**:
- [ ] Lines of code: ~300-400 (src), ~200-300 (tests)
- [ ] Test coverage: ≥80%
- [ ] Linting score: ≥9.0/10
- [ ] Type coverage: 100% (all type hints present)
- [ ] Documentation: Complete (README, CLAUDE, docstrings)
- [ ] PHRs: All implementation sessions documented
- [ ] ADRs: Architectural decisions documented

**Final Validation Commands**:
```bash
# Run full test suite
pytest tests/ --cov=src/todo_app --cov-report=term-missing

# Run linter
pylint src/todo_app/

# Run type checker
mypy src/todo_app/

# Test CLI interactively
python src/todo_app/main.py
```

**Output**:
```
═══════════════════════════════════════════════════════════════
  PHASE 1 COMPLETION REPORT
═══════════════════════════════════════════════════════════════

Phase: Phase 1 - In-Memory Python Console Todo App
Status: ✓ COMPLETE
Date: 2026-01-01
Duration: ~2 hours

┌─────────────────────────────────────────────────────────────┐
│ DELIVERABLES VALIDATION                                     │
└─────────────────────────────────────────────────────────────┘

Project Structure: ✓ COMPLETE
  ✓ /src folder with clean OOP architecture
  ✓ /tests folder with comprehensive unit tests
  ✓ /specs/phase-1 with spec, plan, tasks
  ✓ /history with PHRs and ADRs
  ✓ README.md, CLAUDE.md, pyproject.toml

Features Implemented: ✓ 5/5
  ✓ Add new todos
  ✓ List all todos
  ✓ Mark todos as complete
  ✓ Delete todos
  ✓ Exit application

Technical Requirements: ✓ MET
  ✓ Python 3.13+
  ✓ UV package manager
  ✓ In-memory storage (no persistence)
  ✓ CLI-based interface

Code Quality: ✓ EXCELLENT
  ✓ OOP principles applied (SOLID)
  ✓ Clean architecture (models, manager, UI separated)
  ✓ Type hints throughout (100% coverage)
  ✓ Docstrings for all classes/methods
  ✓ No code smells detected

Testing: ✓ COMPREHENSIVE
  ✓ Unit tests: 22 tests, 22 passed
  ✓ Coverage: 98% (target: 80%) ⭐
  ✓ All edge cases tested
  ✓ Error handling validated
  ✓ TDD approach followed (red-green-refactor)

Automation: ✓ PASSING
  ✓ Linting: PASSED (pylint 10.0/10) ⭐
  ✓ Type checking: PASSED (mypy strict mode)
  ✓ Tests: PASSED (22/22)

CLI/UI Quality: ✓ USER-FRIENDLY
  ✓ Clear welcome message and instructions
  ✓ User-friendly menu (numbered 1-5)
  ✓ Descriptive prompts ("Enter todo description:")
  ✓ Formatted output (todos with [X] for completed)
  ✓ Helpful error messages (explain + suggest action)
  ✓ Graceful error handling (no crashes)
  ✓ Clean exit behavior ("Goodbye!")
  ✓ No confusing output (no stack traces or debug prints)

Documentation: ✓ COMPLETE
  ✓ README.md with setup, usage, testing instructions
  ✓ CLAUDE.md with development guidelines
  ✓ Inline docstrings for all classes and methods
  ✓ Code comments for complex logic

Process Compliance: ✓ FOLLOWED
  ✓ All workflow stages completed sequentially
  ✓ Constitution principles followed
  ✓ PHRs created for all sessions (8 PHRs)
  ✓ ADR created for storage strategy decision
  ✓ Pre/post-implementation QA passed

┌─────────────────────────────────────────────────────────────┐
│ PHASE 1 METRICS                                             │
└─────────────────────────────────────────────────────────────┘

Lines of Code:
  Source: 325 lines (src/todo_app/)
  Tests: 267 lines (tests/)
  Total: 592 lines

Quality Scores:
  Test Coverage: 98% ⭐ (target: 80%)
  Linting Score: 10.0/10 ⭐ (pylint)
  Type Coverage: 100% (all functions/methods typed)
  Documentation: Complete (README, docstrings, comments)

Tasks:
  Completed: 18/18
  Duration: ~2 hours (avg 6 min/task)

Traceability:
  PHRs Created: 8 (all implementation sessions documented)
  ADRs Created: 1 (in-memory-storage-strategy)

┌─────────────────────────────────────────────────────────────┐
│ READY FOR NEXT PHASE                                        │
└─────────────────────────────────────────────────────────────┘

✓ Phase 1 foundation is solid and production-ready
✓ All quality gates passed with excellent scores
✓ Clean OOP architecture ready for extension in Phase 2
✓ Comprehensive tests provide safety net for future changes
✓ User-friendly CLI sets UX standard for future phases

Phase 1 is COMPLETE. Excellent work! 🎉

Next Steps (if continuing to Phase 2):
1. Review Phase 1 deliverables and metrics
2. Define Phase 2 requirements (e.g., file persistence)
3. Run `/sp.phase2` to begin next phase

═══════════════════════════════════════════════════════════════
```

---

### Stage 10: PHR Creation

**Objective**: Document entire Phase 1 workflow for learning and traceability.

**Actions**:
1. Create comprehensive PHR documenting Phase 1 execution
2. Include completion report, metrics, and artifacts
3. Link to all related documents (spec, plan, tasks, ADRs)

**PHR Details**:
- **Stage**: `misc` (workflow execution)
- **Title**: "Phase 1 Complete Workflow Execution"
- **Route**: `history/prompts/phase-1/`
- **PROMPT_TEXT**: User's `/sp.phase1` command (verbatim)
- **RESPONSE_TEXT**: Phase 1 completion report from Stage 9
- **FILES_YAML**: All files created (src, tests, specs, docs)
- **TESTS_YAML**: All tests run (pytest, pylint, mypy)
- **LINKS**:
  - SPEC: `specs/phase-1/spec.md`
  - PLAN: `specs/phase-1/plan.md`
  - TASKS: `specs/phase-1/tasks.md`
  - ADR: `history/adr/001-in-memory-storage-strategy.md`

**Output**:
```
✓ PHR created: 043-phase-1-complete-workflow-execution.misc.prompt.md
  Location: history/prompts/phase-1/
  Stage: misc
  Content: Complete Phase 1 execution report with metrics

  PHR includes:
  - Full workflow execution summary
  - Completion report with deliverables
  - Quality metrics and scores
  - Links to all artifacts (spec, plan, tasks, ADRs)
  - Lessons learned and best practices
```

---

## Output Format

### Primary Output: Phase 1 Completion Report

The skill generates a comprehensive Phase 1 completion report with the following sections:

1. **Deliverables Validation**: Checklist of all required artifacts
2. **Features Implemented**: List of 5 todo features with status
3. **Technical Requirements**: Validation of Python 3.13+, UV, in-memory, CLI
4. **Code Quality**: OOP principles, SOLID, clean architecture
5. **Testing**: Unit tests, coverage, edge cases
6. **Automation**: Linting, type checking, test results
7. **CLI/UI Quality**: User experience validation (critical for Phase 1)
8. **Documentation**: README, CLAUDE, docstrings
9. **Process Compliance**: Workflow stages, PHRs, ADRs
10. **Metrics**: LOC, coverage, linting score, tasks completed
11. **Ready for Next Phase**: Summary and next steps

### Secondary Outputs

1. **Updated Specification Document**: `specs/phase-1/spec.md` (with clarifications)
2. **Architecture Plan**: `specs/phase-1/plan.md` (with OOP design)
3. **Task Breakdown**: `specs/phase-1/tasks.md` (with completion status [X])
4. **Prototype Code**: `/src/todo_app/` (5 Python modules)
5. **Unit Tests**: `/tests/` (comprehensive test suite)
6. **Documentation**: `README.md` and `CLAUDE.md`
7. **PHRs**: `history/prompts/phase-1/` (8+ PHRs documenting sessions)
8. **ADRs**: `history/adr/` (architectural decisions)
9. **QA Reports**: Pre and post-implementation validation results

### Report Formats

**Terminal Display** (default):
```
═══════════════════════════════════════════════════════════════
  PHASE 1 COMPLETION REPORT
═══════════════════════════════════════════════════════════════

[Detailed report as shown in Stage 9]
```

**Progress Updates** (during execution):
```
[Stage 2/10] Capability Specification... ✓ PASSED
[Stage 7/10] Implementation...
  [12/18] Implement: TodoManager.delete_todo... ✓ DONE
  Tests: ✓ 8/8 passing
  Coverage: 100% for manager.py
```

**JSON Format** (for automation):
```bash
/sp.phase1 --format=json
```

```json
{
  "phase": "phase-1",
  "status": "complete",
  "completion_date": "2026-01-01T19:30:00Z",
  "duration_minutes": 120,
  "stages_completed": 10,
  "deliverables": {
    "features": 5,
    "tests": 22,
    "coverage_percent": 98,
    "linting_score": 10.0,
    "phrs_created": 8,
    "adrs_created": 1
  },
  "quality_scores": {
    "specification": "pass",
    "architecture": "pass",
    "implementation": "pass",
    "cli_quality": "pass",
    "documentation": "pass"
  },
  "ready_for_next_phase": true
}
```

## Integration Points

### Prerequisite Skills
- `/sp.constitution` - Establishes project principles (required before Phase 1)

### Invoked Skills (During Workflow)
- `/sp.specify` - If specification missing, prompt user to create
- `/sp.clarify` - If ambiguities detected, offer to resolve
- `/sp.plan` - If architecture missing, prompt user to design
- `/sp.tasks` - If task breakdown missing, prompt user to create
- `/sp.qa` - Runs pre and post-implementation validation
- `/sp.adr` - Suggests ADR creation for significant decisions

### Agent Coordination
- **project-architect**: Validates workflow prerequisites and gates
- **phase1-builder**: Executes implementation tasks from tasks.md

### Follow-up Skills
- `/sp.git.commit_pr` - Commit Phase 1 work and create PR
- `/sp.phase2` - Begin Phase 2 after Phase 1 completion (if applicable)

### Workflow Integration
```
User: "Let's start Phase 1"
  ↓
/sp.phase1 skill invoked
  ↓
Validates prerequisites (constitution, specs, plans)
  ↓
Runs pre-implementation QA
  ↓
Launches phase1-builder agent for implementation
  ↓
Runs post-implementation QA (including CLI UX checks)
  ↓
Generates completion report
  ↓
Creates PHR for traceability
  ↓
Ready for /sp.git.commit_pr or /sp.phase2
```

## Example: Complete Phase 1 Execution

**User Command**:
```bash
/sp.phase1
```

**Console Output** (abbreviated):
```
Starting Phase 1 Workflow...

[Stage 1/10] Constitution Validation... ✓ PASSED
[Stage 2/10] Capability Specification... ✓ PASSED
[Stage 3/10] Clarifications... ✓ COMPLETE
[Stage 4/10] Architecture Design... ✓ PASSED
[Stage 5/10] Task Breakdown... ✓ PASSED
[Stage 6/10] Pre-Implementation QA... ✓ PASSED

Ready to begin implementation (18 tasks).
Proceed? (yes/no): yes

[Stage 7/10] Implementation...
  [1/18] Setup: Create project structure... ✓ DONE
  ...
  [18/18] Polish: Final validation... ✓ DONE

  Implementation complete: 18/18 tasks

[Stage 8/10] Post-Implementation QA... ✓ PASSED
  Overall: ✓ PASS (56/56 checks)
  CLI Quality: ✓ PASS (6/6) - User-friendly, clear, no confusing output

[Stage 9/10] Phase Completion Validation... ✓ COMPLETE

═══════════════════════════════════════════════════════════════
  PHASE 1 COMPLETE
═══════════════════════════════════════════════════════════════

Features: 5/5 implemented
Tests: 22/22 passing (98% coverage)
CLI: User-friendly with clear instructions
Quality: All gates passed

Phase 1 foundation is solid and production-ready! 🎉

[Stage 10/10] PHR Creation... ✓ DONE

Phase 1 workflow complete.
```

## Notes

- **Duration**: Phase 1 typically 2-4 hours (specification through validated implementation)
- **Checkpoints**: Can pause/resume at any stage boundary
- **Quality Focus**: Emphasizes CLI UX quality - clear instructions, helpful errors, no confusion
- **Thoroughness**: Every stage validated before proceeding (fail-fast approach)
- **Traceability**: All work documented in PHRs for learning and auditing
- **Reusability**: Workflow pattern applicable to all project phases
- **Foundation**: Phase 1 establishes patterns and standards for future phases

---

**Version**: 1.0.0
**Created**: 2026-01-01
**Last Updated**: 2026-01-01
**Maintainer**: Claude Code + Spec-Kit Plus
