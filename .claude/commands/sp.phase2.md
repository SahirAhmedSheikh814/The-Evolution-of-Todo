---
description: Execute the complete Phase 2 workflow for full-stack web application development
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

Phase 2 skill orchestrates the complete development workflow for a full-stack web application. It transitions from In-Memory CLI (Phase 1) to a robust Next.js + FastAPI solution with persistence.

### Phase 2 Goal

Build a production-quality Full-Stack Todo application with:
1. **Frontend**: Next.js 16+ (App Router, TS, Tailwind)
2. **Backend**: FastAPI (Python 3.13+)
3. **Database**: PostgreSQL (Neon Serverless)
4. **Auth**: JWT Authentication (Better Auth)
5. **features**: 5 basic todo features + Persistence

### Workflow Stages

Phase 2 executes stages in strict sequence:
```
Constitution → Specify → Clarify → Plan → Tasks → Implement → QA → Complete
```

---

## Stage 1: Constitution Validation

**Objective**: Ensure Phase 2 principles and constraints are established.

**Actions**:
1. Check if `.specify/memory/constitution.md` exists and is Version 2.0.0+
2. If missing or outdated:
   ```
   ✗ Constitution invalid
   Phase 2 requires updated project principles (v2.0.0+).
   Run `/sp.constitution` to update constitution.md first.
   ```
   STOP execution.

3. Validate content:
   - [ ] Full terms "Next.js", "FastAPI", "PostgreSQL" present
   - [ ] Principle "Clean Architecture and Responsive Web UX"
   - [ ] Success criteria includes "Web UI" and "REST API"

**Output on Success**:
```
✓ Constitution validated (v2.0.0)
  Stack: Next.js + FastAPI + Postgres
  Principles: Updated for Web
```

---

## Stage 2: Capability Specification Validation

**Objective**: Define functionality for the web context.

**Actions**:
1. Check `specs/002-full-stack-todo/spec.md`
2. Validate:
   - [ ] API Requirements section present
   - [ ] UI Requirements section present
   - [ ] Auth requirements specified
   - [ ] 5 Basic features adapted for web (e.g., "Add Todo" implies POST request + UI form)

**Output on Success**:
```
✓ Web Specification validated
  Location: specs/002-full-stack-todo/spec.md
  Context: Full-Stack Web
```

---

## Stage 3: Clarifications Resolution

**Objective**: Resolve web-specific ambiguities (CORS, Auth flow, Error states).

**Actions**:
1. Analyze spec for:
   - Authentication flow details
   - Error handling (UI states vs API codes)
   - Loading states
2. If ambiguous -> Recommend `/sp.clarify`

---

## Stage 4: Architecture Design (Full-Stack)

**Objective**: Design frontend/backend separation and contracts.

**Actions**:
1. Check `specs/002-full-stack-todo/plan.md`
2. Validate:
   - [ ] Frontend/Backend separation clear
   - [ ] API Contract defined (Endpoints, Types)
   - [ ] Database Schema defined (SQLModel)
   - [ ] Component hierarchy designed

**Output on Success**:
```
✓ Architecture design validated
  Backend: FastAPI/SQLModel
  Frontend: Next.js App Router
  Database: PostgreSQL Schema defined
```

---

## Stage 5: Task Breakdown

**Objective**: Generate tasks for both stacks.

**Actions**:
1. Check `specs/002-full-stack-todo/tasks.md`
2. Validate:
   - [ ] Tasks categorized (Frontend/Backend/Shared)
   - [ ] DB Migrations included
   - [ ] Auth setup included
   - [ ] Integration tasks included

---

## Stage 6: Pre-Implementation QA

**Objective**: Validate design before coding.

**Actions**:
1. Run `/sp.qa --phase=pre-implementation`
2. Ensure no blockers.

---

## Stage 7: Implementation (Full-Stack)

**Objective**: Implement the solution in layers.

**Actions**:
1. Prompt user to proceed.
2. If yes:
   - **Backend Core**: Models, DB, Auth
   - **Backend API**: Endpoints, Services
   - **Frontend Core**: Layout, Auth Context, API Client
   - **Frontend UI**: Components, Pages
   - **Integration**: Wiring it together

**Quality Checks**:
- [ ] Backend tests passing (pytest)
- [ ] Frontend builds (npm run build)
- [ ] Linting passing (ruff/eslint)

---

## Stage 8: Post-Implementation QA

**Objective**: Validation of full stack.

**Actions**:
1. Run `/sp.qa`
2. Verify:
   - API endpoints functional (curl/test)
   - UI responsive and interactive
   - Data persists across reloads
   - Auth protects routes

---

## Stage 9: Phase Completion

**Objective**: Final report.

**Actions**:
1. Validate all deliverables (Code, Docs, Tests)
2. Generate Phase 2 Completion Report.

---

## Stage 10: PHR Creation

**Objective**: Record execution.

**Actions**:
1. Create PHR "Phase 2 Workflow Execution - phase-2"
