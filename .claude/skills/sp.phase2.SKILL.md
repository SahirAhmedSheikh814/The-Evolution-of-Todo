---
name: sp.phase2
description: Execute the complete Phase 2 workflow including capability specification validation, full-stack architecture with monorepo/OOP principles, implementation with unit tests, web UI quality checks, and professional standards.
version: 1.0.0
---

# Phase 2 Development Skill (sp.phase2)

## Overview

The **sp.phase2** skill orchestrates the complete development workflow for Phase 2 of the hackathon project: **Full-Stack Web Application**. It systematically coordinates specification, architecture design, implementation, and quality assurance for a Next.js (frontend) + FastAPI (backend) + PostgreSQL solution.

**Phase 2 Goal**: Transform the Phase 1 CLI tool into a modern, multi-user web application with persistent storage, JWT authentication, and responsive UI.

## When to Use

### Primary Use Cases

1.  **Starting Phase 2 Development**
    - You are ready to transition from Phase 1 to Phase 2.
    - Constitution is updated for full-stack principles (v2.0.0+).
    - You want to follow the Spec-Kit Plus workflow for web development.

2.  **Implementing Web Features**
    - "Implement the full stack app"
    - "Build the frontend and backend"
    - "Add persistence and auth"

3.  **Validating Phase 2 Completeness**
    - Verify Phase 2 meets all success criteria (Auth, Persistence, 5 Features).
    - Ensure code quality and test coverage before deployment.

### Command Invocation

```bash
# Start Phase 2 workflow
/sp.phase2

# Resume Phase 2
/sp.phase2 --resume

# Validate Phase 2 status
/sp.phase2 --validate
```

### Trigger Patterns

Invoke this skill when user says:
- "Start Phase 2"
- "Begin web app implementation"
- "Execute the Phase 2 workflow"
- "Move to full stack"

## Procedure

Phase 2 executes the following stages in strict sequence:

```
Constitution → Specify → Clarify → Plan → Tasks → Implement → QA → Complete
```

---

### Stage 1: Constitution Validation

**Objective**: Ensure project principles and constraints are established for full-stack development.

**Actions**:
1. Check that `.specify/memory/constitution.md` exists.
2. Verify Version is 2.0.0+ (Full-Stack Update).
3. Validate technical constraints: Next.js 16+, FastAPI, PostgreSQL (Neon), Better Auth (or Native JWT).
4. Validate success criteria includes Web UI and REST API.

**Output**:
```
✓ Constitution validated (v2.0.0)
  Stack: Next.js + FastAPI + Postgres
  Principles: Updated for Web
```

**On Failure**: instruct user to run `/sp.constitution`.

---

### Stage 2: Web Capability Specification Validation

**Objective**: Define functionality for the web context.

**Actions**:
1. Check `specs/002-full-stack-todo/spec.md`.
2. Validate completeness:
   - **API Requirements**: Endpoints defined (GET, POST, PUT, DELETE).
   - **UI Requirements**: Components and interactions specified.
   - **Data Requirements**: Entities and persistence defined.
   - **Auth Requirements**: Protected routes identified.
   - **Functional**: All 5 basic features adapted for web operations.

**Output**:
```
✓ Web Specification validated
  Location: specs/002-full-stack-todo/spec.md
  Context: Full-Stack Web
```

---

### Stage 3: Clarifications Resolution

**Objective**: Resolve web-specific ambiguities.

**Actions**:
1. Analyze spec for:
   - Auth flow (Cookies vs LocalStorage).
   - API Error formats.
   - Responsive breakpoints.
   - Loading/Error states.
2. If ambiguous -> Recommend `/sp.clarify`.

---

### Stage 4: Full-Stack Architecture Design

**Objective**: Design frontend and backend architecture and contracts.

**Actions**:
1. Check `specs/002-full-stack-todo/plan.md`.
2. Validate:
   - **Monorepo Structure**: Frontend/Backend separate.
   - **API Contract**: Endpoints and Types defined.
   - **Database Schema**: SQLModel entities defined.
   - **Auth Strategy**: JWT via HttpOnly cookies (ADR check).

**Output**:
```
✓ Architecture design validated
  Backend: FastAPI/SQLModel
  Frontend: Next.js App Router
  Database: PostgreSQL Schema defined
```

---

### Stage 5: Task Breakdown

**Objective**: Generate atomic tasks for parallel execution.

**Actions**:
1. Check `specs/002-full-stack-todo/tasks.md`.
2. Validate:
   - **Phasing**: Setup, Backend Core, Backend Features, Frontend Core, Frontend Features, Integration.
   - **Granularity**: Atomic tasks (~30 mins).
   - **Verification**: Verifiable outcome for each task.

**Output**:
```
✓ Task breakdown validated
  Phases: Foundational, Features (Split FE/BE), Integration
```

---

### Stage 6: Pre-Implementation QA

**Objective**: Validate design before coding.

**Actions**:
1. Run `/sp.qa --phase=pre-implementation`.
2. Ensure consistency between Plan, Spec, and Constitution.

---

### Stage 7: Implementation (Full-Stack)

**Objective**: Implement the solution using the `phase2-engineer` agent.

**Actions**:
1. Prompt user to proceed.
2. **Launch Agent**: `phase2-engineer` (via Task tool).
3. **Execution Plan**:
   - **Infrastructure**: DB logic, Environment Setup (ask for keys).
   - **Backend**: Models, Migrations, API Endpoints (TDD).
   - **Frontend**: API Client, Auth Context, Components.
   - **Integration**: Connect FE to BE.

**Quality Constraints during Implementation**:
- Test Driven Development (Backend).
- Linting (Ruff/ESLint).
- No manual coding.

**Output**:
```
[Stage 7/10] Implementation...
  [1/37] Setup: Monorepo... ✓ DONE
  ...
  [37/37] QA: E2E Check... ✓ DONE
```

---

### Stage 8: Post-Implementation QA (Web)

**Objective**: Validation of full stack quality.

**Actions**:
1. Run `/sp.qa`.
2. **Web Specific Checks**:
   - **Responsiveness**: Mobile/Desktop layouts.
   - **Auth**: Secure cookie handling, redirect on 401.
   - **Persistence**: Data survives server restart.
   - **UX**: No "confusing output" (console errors), clear error messages.
   - **Code**: Coverage > 80% (Backend).

---

### Stage 9: Phase Completion Validation

**Objective**: Final review of deliverables.

**Actions**:
1. Verify deliverables:
   - Working Web App.
   - All tests passing.
   - Documentation updated (Root CLAUDE.md + sub-READMEs).
2. Generate **Phase 2 Completion Report**.

---

### Stage 10: PHR Creation

**Objective**: Record execution.

**Actions**:
1. Create PHR "Phase 2 Workflow Execution".
2. Link to spec, plan, tasks, and code.

---

## Output Format

### Completion Report

```
═══════════════════════════════════════════════════════════════
  PHASE 2 WORKFLOW COMPLETE
═══════════════════════════════════════════════════════════════

Stages Completed: 10/10

✓ Constitution validated (Full-Stack)
✓ Web Specification validated
✓ Architecture validated (Next.js + FastAPI)
✓ Implementation completed (37 Tasks)
✓ Web QA passed

Phase 2 deliverables:
- Full-stack Web App (Next.js/FastAPI)
- PostgreSQL Persistence
- Secure JWT Auth (HttpOnly)
- Modern Responsive UI

Next steps:
- Run `/sp.git.commit_pr` to commit work.
- Prepare for Phase 3.

Phase 2 is production-ready! 🎉
═══════════════════════════════════════════════════════════════
```

## Integration

- **Prerequisites**: `/sp.constitution`, `/sp.specify`, `/sp.plan`, `/sp.tasks`
- **Agents**: `phase2-engineer` (implementation), `project-architect` (governance).
- **Tools**: `Task`, `Write`, `Read`, `AskUserQuestion` (for env keys).
