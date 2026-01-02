---
description: Execute the complete Phase 1 workflow including capability specification validation, architecture design with OOP principles, prototype implementation with unit tests, and console/CLI UI quality checks
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

Phase 1 skill orchestrates the complete initial development workflow from concept to validated implementation. It ensures a solid foundation by coordinating specification, design, implementation, and quality assurance.

### Phase 1 Goal

Build a production-quality, in-memory Python console Todo application with 5 basic features:
1. Add new todos
2. List all todos
3. Mark todos as complete
4. Delete todos
5. Exit application

**Technical Constraints**: Python 3.13+, UV package manager, in-memory storage, CLI interface, clean OOP architecture

### Workflow Stages

Phase 1 executes stages in strict sequence:
```
Constitution → Specify → Clarify → Plan → Tasks → Implement → QA → Complete
```

---

## Stage 1: Constitution Validation

**Objective**: Ensure project principles and constraints are established.

**Actions**:
1. Check if `.specify/memory/constitution.md` exists
2. If missing:
   ```
   ✗ Constitution not found

   Phase 1 requires established project principles.
   Run `/sp.constitution` to create constitution.md first.

   Phase 1 workflow cannot proceed without constitution.
   ```
   STOP execution.

3. If exists, validate it contains:
   - [ ] At least 3 core principles (measurable and specific)
   - [ ] Technical constraints (Python 3.13+, UV, in-memory, CLI)
   - [ ] Quality standards (code style, testing, documentation)
   - [ ] Success criteria (clear and testable)

**Output on Success**:
```
✓ Constitution validated
  Location: .specify/memory/constitution.md
  Principles: [count] defined
  Constraints: Python 3.13+, UV, in-memory, CLI
```

**Proceed to Stage 2.**

---

## Stage 2: Capability Specification Validation

**Objective**: Define and validate complete requirements with clear acceptance criteria, ensuring completeness, consistency, and feasibility.

**Actions**:
1. Check if `specs/001-basic-todo/spec.md` exists
2. If missing:
   ```
   ✗ Specification not found

   Run `/sp.specify phase-1` to define requirements.

   Phase 1 workflow stopped until specification created.
   ```
   STOP execution.

3. If exists, validate specification:

   **a) Scope Definition**:
   - [ ] In-scope features explicitly listed (5 todo features)
   - [ ] Out-of-scope features documented
   - [ ] Technical boundaries clear

   **b) Feature Specifications** (all 5 features):
   For each feature (Add, List, Mark Complete, Delete, Exit):
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
   - [ ] Class/module names follow Python conventions
   - [ ] No naming conflicts

   **e) Requirements Completeness**:
   - [ ] All inputs/outputs specified
   - [ ] Error handling requirements complete
   - [ ] Edge cases covered
   - [ ] Dependencies and assumptions documented

   **f) Feasibility Check**:
   - [ ] Achievable with Python 3.13+ and in-memory storage
   - [ ] No database/persistence required
   - [ ] CLI-based interface sufficient

**Output on Success**:
```
✓ Capability Specification validated
  Location: specs/phase-1/spec.md
  Features: 5/5 fully specified
  Acceptance Criteria: Complete
  Naming: Consistent
  Feasibility: ✓ Achievable
  Conflicts: None detected
```

**Output on Failure**:
```
✗ Capability Specification validation failed

Issues detected:
[List specific issues with file:line references]

Action Required:
1. Update spec.md to address issues
2. Run `/sp.clarify` to resolve ambiguities
3. Re-run `/sp.phase1` after fixes

Phase 1 workflow stopped.
```

**Proceed to Stage 3.**

---

## Stage 3: Clarifications Resolution

**Objective**: Resolve ambiguous or underspecified areas.

**Actions**:
1. Analyze spec.md for ambiguities:
   - Vague requirements ("user-friendly" without specifics)
   - Missing error handling specifications
   - Unclear input/output formats
   - Undefined edge case behavior
   - Ambiguous acceptance criteria

2. Check:
   - [ ] All error messages defined or template specified
   - [ ] Input validation rules explicit
   - [ ] Edge case behavior specified
   - [ ] Output formatting clear
   - [ ] User interaction flow unambiguous

3. If ambiguities found:
   ```
   ⚠ Ambiguities detected in specification

   Ambiguities requiring clarification:
   [List specific ambiguities with file:line references]

   Recommendation: Run `/sp.clarify` to resolve these ambiguities

   Options:
   1. Run clarification now (recommended)
   2. Proceed with documented assumptions
   3. Stop and manually update spec.md

   Your choice: _
   ```

   - If choice 1: Run `/sp.clarify`, wait for responses, update spec.md, continue
   - If choice 2: Document assumptions, continue with noted risks
   - If choice 3: STOP execution

4. If no critical ambiguities:
   ```
   ✓ Clarifications check: No critical ambiguities detected
   ```

**Proceed to Stage 4.**

---

## Stage 4: Architecture Design with OOP Principles

**Objective**: Design software architecture with object-oriented principles, classes, modules, and design patterns.

**Actions**:
1. Check if `specs/001-basic-todo/plan.md` exists
2. If missing:
   ```
   ✗ Architecture plan not found

   Run `/sp.plan` to design the solution.

   Phase 1 workflow stopped until plan created.
   ```
   STOP execution.

3. If exists, validate architectural design:

   **a) Object-Oriented Design**:
   - [ ] Class structure clearly defined (models, managers, UI)
   - [ ] Single Responsibility Principle applied
   - [ ] Class relationships documented
   - [ ] Interfaces/abstractions identified
   - [ ] Separation of concerns (data, logic, presentation)

   Expected classes:
   - Todo (models.py): Data model
   - TodoManager (manager.py): Business logic
   - TodoUI (ui.py): Presentation layer

   **b) SOLID Principles**:
   - [ ] Single Responsibility: Each class has one purpose
   - [ ] Open/Closed: Classes extensible without modification
   - [ ] Liskov Substitution: Derived classes substitutable
   - [ ] Interface Segregation: No forced unused dependencies
   - [ ] Dependency Inversion: Depend on abstractions

   **c) Module Structure**:
   - [ ] File/module organization follows Python conventions
   - [ ] Module dependencies mapped
   - [ ] No circular dependencies
   - [ ] Clear entry point (main.py)

   Expected structure:
   ```
   /src/todo_app/
     __init__.py
     models.py
     manager.py
     ui.py
     main.py
   ```

   **d) Design Patterns**:
   - [ ] Appropriate patterns identified
   - [ ] Pattern usage justified
   - [ ] Not over-engineered

   **e) Technical Stack**:
   - [ ] Python 3.13+ specified
   - [ ] UV package manager documented
   - [ ] Dependencies listed

   **f) Data Model**:
   - [ ] Todo entity structure defined
   - [ ] In-memory storage strategy specified
   - [ ] Data validation rules documented

   **g) CLI Interface Design**:
   - [ ] Menu structure designed
   - [ ] Input prompts specified
   - [ ] Output formatting planned
   - [ ] Error message templates defined

**Output on Success**:
```
✓ Architecture design validated
  Location: specs/phase-1/plan.md
  Classes: Todo, TodoManager, TodoUI
  SOLID Principles: All addressed
  Module Structure: Clean separation
  Design Patterns: Appropriate (Factory, Strategy)
```

**Output on Failure**:
```
✗ Architecture design validation failed

Issues detected:
[List specific issues]

Action Required:
Run `/sp.plan` to redesign architecture.

Phase 1 workflow stopped.
```

**ADR Check**:
If architecturally significant decision detected:
```
📋 Architectural decision detected: [brief description]

This decision impacts: [impact areas]

Document reasoning and tradeoffs? Run `/sp.adr [decision-title]`

Create ADR now? (yes/no): _
```

**Proceed to Stage 5.**

---

## Stage 5: Task Breakdown Validation

**Objective**: Create testable, dependency-ordered tasks with explicit acceptance criteria.

**Actions**:
1. Check if `specs/phase-1/tasks.md` exists
2. If missing:
   ```
   ✗ Task breakdown not found

   Run `/sp.tasks` to generate implementation tasks.

   Phase 1 workflow stopped until tasks created.
   ```
   STOP execution.

3. If exists, validate task breakdown:

   **a) Task Organization**:
   - [ ] Tasks organized by phase (Setup, Tests, Core, Integration, Polish)
   - [ ] Each task has unique ID
   - [ ] Task descriptions clear and actionable
   - [ ] File paths specified
   - [ ] Dependencies documented

   **b) Acceptance Criteria**:
   - [ ] Each task has explicit acceptance criteria
   - [ ] Criteria testable and measurable
   - [ ] Success conditions clear
   - [ ] Validation methods specified

   **c) Task Granularity**:
   - [ ] Tasks atomic (single responsibility)
   - [ ] No tasks too large (<2 hours work)
   - [ ] Proper feature breakdown

   **d) Test-Driven Development**:
   - [ ] Test tasks before implementation tasks
   - [ ] Test coverage targets specified (80%+)
   - [ ] Test scenarios match acceptance criteria

   **e) Feature Coverage**:
   - [ ] All 5 features have corresponding tasks
   - [ ] Setup tasks included
   - [ ] Testing tasks included
   - [ ] Documentation tasks included
   - [ ] QA tasks included

**Output on Success**:
```
✓ Task breakdown validated
  Location: specs/phase-1/tasks.md
  Total Tasks: [count]
  Phases: Setup, Tests, Core, Integration, Polish
  Coverage: All 5 features covered
  Acceptance Criteria: Complete
```

**Output on Failure**:
```
✗ Task breakdown validation failed

Issues detected:
[List specific issues]

Action Required:
Run `/sp.tasks` to regenerate task breakdown.

Phase 1 workflow stopped.
```

**Proceed to Stage 6.**

---

## Stage 6: Pre-Implementation Quality Assurance

**Objective**: Validate all design artifacts before writing code.

**Actions**:
1. Run `/sp.qa --phase=pre-implementation` (or analyze artifacts if QA skill unavailable)

2. Validate:
   - Capability specification completeness
   - Architecture design quality
   - Task breakdown adequacy
   - Constitution compliance
   - No conflicts or contradictions

3. Review QA results:
   - Specification Validation
   - Architecture Validation
   - Task Validation
   - Constitution Compliance

**Output on Pass**:
```
✓ Pre-Implementation QA: PASSED

Overall Status: ✓ PASS
Total Checks: [count]
All design artifacts validated. Ready to begin implementation.
```

**Output on Warnings**:
```
⚠ Pre-Implementation QA: PASSED WITH WARNINGS

Warnings:
[List warnings]

These warnings are non-blocking. Proceed? (yes/no): _
```
- If "no": STOP execution, allow user to fix
- If "yes": Continue with noted warnings

**Output on Failure**:
```
✗ Pre-Implementation QA: FAILED

Critical issues:
[List issues with file:line references]

Action Required:
Fix critical issues and re-run `/sp.phase1`

Phase 1 workflow stopped.
```

**Proceed to Stage 7.**

---

## Stage 7: Prototype Implementation with Unit Tests

**Objective**: Implement prototype code following OOP design, with unit tests and coding standards.

**Actions**:
1. Prompt user:
   ```
   Ready to begin implementation.
   This will execute all tasks in specs/phase-1/tasks.md.
   Proceed? (yes/no): _
   ```

2. If "no": STOP execution
3. If "yes": Launch phase1-builder agent

4. Invoke phase1-builder agent via Task tool:
   ```
   I'm going to use the Task tool to launch the phase1-builder agent to execute Phase 1 implementation.
   ```

5. Phase1Builder will:
   - Execute tasks in dependency order from tasks.md
   - Follow TDD approach (tests before implementation)
   - Implement OOP design from plan.md
   - Enforce coding standards from constitution
   - Create PHRs for each implementation session
   - Update task status ([X]) as completed
   - Report progress after each task

6. Implementation includes:
   - **Setup Phase**: Project structure, UV config, pytest setup
   - **Tests Phase (TDD Red)**: Write all tests first (failing)
   - **Core Phase (TDD Green)**: Implement features (tests pass)
   - **Integration Phase**: CLI testing, edge cases
   - **Polish Phase**: Docstrings, README, final validation

**Quality Checks During Implementation**:
For each task:
- [ ] Code follows OOP principles
- [ ] Type hints used consistently
- [ ] Docstrings added
- [ ] Unit tests written and passing
- [ ] Acceptance criteria met
- [ ] No linting errors
- [ ] PHR created

**Output (Progressive)**:
```
Starting Phase 1 Implementation...

Launching phase1-builder agent...

[1/18] Setup: Create project structure... ✓ DONE
[2/18] Setup: Configure UV and dependencies... ✓ DONE
[3/18] Tests: Write Todo model tests... ✓ DONE
...
[18/18] Polish: Final validation... ✓ DONE

Implementation complete: 18/18 tasks completed
```

**On Blocker**:
```
[X/18] [Task name]... ✗ BLOCKED

Blocker: [description]

Resolution needed:
[Steps to resolve]

Phase 1 implementation paused. Resolve blocker and resume.
```

**Proceed to Stage 8.**

---

## Stage 8: Post-Implementation Quality Assurance

**Objective**: Comprehensive QA including console/CLI UI checks (clear instructions, no confusing output).

**Actions**:
1. Run `/sp.qa` (full validation)

2. Validate:
   - **Capability Specification Compliance**: All 5 features implemented
   - **OOP Design Quality**: SOLID principles, clean architecture, no code smells
   - **Automated Code QA**: Linting, type checking, tests passing, coverage ≥80%
   - **Console/CLI UI Quality** (CRITICAL):
     - [ ] Clear instructions (welcome message explains usage)
     - [ ] User-friendly menu (numbered options 1-5)
     - [ ] Descriptive prompts ("Enter todo description:" not ">")
     - [ ] Formatted output (todos with [X] for completed)
     - [ ] Helpful error messages (explain problem + suggest action)
     - [ ] No confusing output (no stack traces, debug prints)
     - [ ] Graceful error handling (app recovers, doesn't crash)
     - [ ] Edge cases handled (empty list shows friendly message)
     - [ ] Clean exit (goodbye message)
   - **Professional Standards**: README, CLAUDE.md, docstrings, versioning
   - **Constitution Compliance**: All principles followed

3. Manual CLI testing:
   ```
   Run: python src/todo_app/main.py
   Test: Add todo, list todos, mark complete, delete, invalid input, exit
   Verify: Clear prompts, readable output, helpful errors
   ```

**Output on Pass**:
```
✓ Post-Implementation QA: PASSED

Overall Status: ✓ PASS
Total Checks: [count]
Passed: [count]

CLI UI Validation:
✓ Clear instructions
✓ User-friendly menu
✓ Descriptive prompts
✓ Formatted output
✓ Helpful error messages
✓ No confusing output
✓ Graceful error handling
✓ Clean exit

All acceptance criteria met. Phase 1 is production-ready!
```

**Output on Warnings**:
```
⚠ Post-Implementation QA: PASSED WITH WARNINGS

Warnings: [count]
[List warnings]

Recommendations:
[List prioritized improvements]

Proceed to completion despite warnings? (yes/no): _
```
- If "no": Allow fixes, re-run QA
- If "yes": Continue with documented warnings

**Output on Failure**:
```
✗ Post-Implementation QA: FAILED

Critical issues:
[List issues with file:line references]

Action Required:
Fix issues and re-run `/sp.phase1 --validate`

Phase 1 workflow stopped.
```

**Proceed to Stage 9.**

---

## Stage 9: Phase Completion Validation

**Objective**: Validate all Phase 1 deliverables before marking complete.

**Actions**:
1. Check project structure:
   ```
   ✓ /src/todo_app/ (5 modules)
   ✓ /tests/ (4 test files)
   ✓ /specs/phase-1/ (spec.md, plan.md, tasks.md)
   ✓ /history/ (PHRs, ADRs)
   ✓ README.md
   ✓ CLAUDE.md
   ✓ pyproject.toml
   ✓ .gitignore
   ```

2. Validate deliverables:
   - [ ] All 5 features implemented and working
   - [ ] OOP architecture with proper separation
   - [ ] In-memory storage (no database/files)
   - [ ] CLI interface user-friendly with clear instructions
   - [ ] Unit tests passing with ≥80% coverage
   - [ ] Documentation complete
   - [ ] Code follows Python 3.13+ and UV constraints
   - [ ] All PHRs created
   - [ ] QA validation passed
   - [ ] Constitution principles followed

3. Run final validation:
   ```bash
   pytest tests/ --cov=src/todo_app --cov-report=term-missing
   pylint src/todo_app/
   mypy src/todo_app/
   python src/todo_app/main.py  # Interactive test
   ```

4. Generate Phase 1 completion report

**Output**:
```
═══════════════════════════════════════════════════════════════
  PHASE 1 COMPLETION REPORT
═══════════════════════════════════════════════════════════════

Phase: Phase 1 - In-Memory Python Console Todo App
Status: ✓ COMPLETE
Date: [timestamp]

┌─────────────────────────────────────────────────────────────┐
│ DELIVERABLES VALIDATION                                     │
└─────────────────────────────────────────────────────────────┘

Project Structure: ✓ COMPLETE
Features Implemented: ✓ 5/5
Technical Requirements: ✓ MET
Code Quality: ✓ EXCELLENT
Testing: ✓ COMPREHENSIVE
Automation: ✓ PASSING
CLI/UI Quality: ✓ USER-FRIENDLY
Documentation: ✓ COMPLETE
Process Compliance: ✓ FOLLOWED

┌─────────────────────────────────────────────────────────────┐
│ PHASE 1 METRICS                                             │
└─────────────────────────────────────────────────────────────┘

Lines of Code: [src] + [tests]
Test Coverage: [percentage]% (target: 80%)
Linting Score: [score]/10
Type Coverage: [percentage]%
Tasks Completed: [count]/[total]
PHRs Created: [count]
ADRs Created: [count]

┌─────────────────────────────────────────────────────────────┐
│ READY FOR NEXT PHASE                                        │
└─────────────────────────────────────────────────────────────┘

✓ Phase 1 foundation is solid and production-ready
✓ All quality gates passed
✓ Ready to proceed to Phase 2 (if planned)

Phase 1 is COMPLETE. Excellent work! 🎉
═══════════════════════════════════════════════════════════════
```

**On Failure**:
```
✗ Phase Completion Validation: FAILED

Missing deliverables or failed validations:
[List issues]

Action Required:
Fix issues and re-run `/sp.phase1 --validate`

Phase 1 not complete.
```

**Proceed to Stage 10.**

---

## Stage 10: PHR Creation

**Objective**: Document entire Phase 1 workflow for learning and traceability.

**Actions**:
1. Create comprehensive PHR:
   - **Stage**: `misc` (workflow execution)
   - **Title**: "Phase 1 Complete Workflow Execution"
   - **Route**: `history/prompts/001-basic-todo/`
   - **PROMPT_TEXT**: User's `/sp.phase1` command (verbatim)
   - **RESPONSE_TEXT**: Phase 1 completion report from Stage 9
   - **FILES_YAML**: All files created (src, tests, specs, docs)
   - **TESTS_YAML**: All tests run (pytest, pylint, mypy)
   - **LINKS**:
     - SPEC: `specs/001-basic-todo/spec.md`
     - PLAN: `specs/001-basic-todo/plan.md`
     - TASKS: `specs/001-basic-todo/tasks.md`
     - ADR: Links to any ADRs created

2. Validate PHR completeness:
   - No unresolved placeholders
   - All sections filled
   - File paths correct

**Output**:
```
✓ PHR created: [ID]-phase-1-complete-workflow-execution.misc.prompt.md
  Location: history/prompts/phase-1/
  Stage: misc
  Content: Complete Phase 1 execution report

Phase 1 workflow complete!
```

---

## Summary Output

At the end of Phase 1 execution, display:

```
═══════════════════════════════════════════════════════════════
  PHASE 1 WORKFLOW COMPLETE
═══════════════════════════════════════════════════════════════

Stages Completed: 10/10
Duration: [time]

✓ Constitution validated
✓ Capability specification validated
✓ Clarifications resolved
✓ Architecture designed (OOP with SOLID)
✓ Tasks broken down
✓ Pre-implementation QA passed
✓ Implementation completed (18/18 tasks)
✓ Post-implementation QA passed
✓ Phase completion validated
✓ PHR created

Phase 1 deliverables:
- 5 features implemented
- [X] tests passing ([Y]% coverage)
- Clean OOP architecture
- User-friendly CLI
- Complete documentation

Next steps:
- Review completion report above
- Run `/sp.git.commit_pr` to commit work
- Begin Phase 2 (if applicable): `/sp.phase2`

Phase 1 is production-ready! 🎉
═══════════════════════════════════════════════════════════════
```

---

## Error Handling

**Missing Prerequisites**:
- Stop at first missing stage
- Provide clear command to resolve
- Do not proceed until prerequisite met

**QA Failures**:
- Display specific issues with file:line references
- Stop workflow
- User must fix issues
- Re-run `/sp.phase1` after fixes

**Implementation Blockers**:
- Stop implementation immediately
- Surface blocker with context
- User resolves blocker
- Resume with `/sp.phase1 --resume`

**User Abort**:
- User can stop at any yes/no prompt
- Save current state
- Resume later with `/sp.phase1 --resume`

---

## Command Flags

Support optional flags:

```bash
# Standard execution
/sp.phase1

# Resume from where it left off
/sp.phase1 --resume

# Validate completion status only (skip to Stage 9)
/sp.phase1 --validate

# Run specific stage
/sp.phase1 --stage=implementation

# Output JSON format
/sp.phase1 --format=json
```

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent-native tools when possible.

1) Determine Stage: `misc` or `explainer`
2) Generate Title: "Phase 1 Workflow Execution - phase-1"
3) Route: `history/prompts/001-basic-todo/` or `history/prompts/general/`
4) Create and Fill PHR with complete execution report
5) Validate and report PHR creation
