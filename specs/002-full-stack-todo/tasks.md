---
description: "Task list for Phase 2: Full-Stack Todo Web Application"
---

# Tasks: Full-Stack Todo Web Application

**Input**: Design documents from `specs/002-full-stack-todo/`
**Prerequisites**: plan.md, spec.md
**Organization**: Tasks are grouped by logical phase and user story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel
- **[Story]**: Related User Story (US1: Auth, US2: Tasks, US3: Persistence)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, environment setup, and tooling.

- [x] T001 Create monorepo structure (`backend/`, `frontend/`) and gitignore. (Criterion: Folders exist)
- [x] T002 Initialize Backend (`backend/`) with Python 3.13+, UV, and dependencies (`fastapi`, `uvicorn`, `sqlmodel`, `alembic`, `asyncpg`, `python-jose[cryptography]`, `passlib[bcrypt]`). (Criterion: `backend/pyproject.toml` exists)
- [x] T003 Initialize Frontend (`frontend/`) with Next.js 16 (App Router), TypeScript, and Tailwind CSS. (Criterion: `frontend/package.json` exists, dev server runs)
- [x] T004 Create `docker-compose.yml` for PostgreSQL 15+. (Criterion: `docker compose up` starts DB)
- [x] T005 [P] Create template `.env.example` files for backend/frontend and prompt user to create `.env` with secure keys. (Criterion: `.env.example` files exist)
- [x] T006 [P] Configure linters: `ruff`/`mypy` for backend, `eslint`/`prettier` for frontend. (Criterion: Lint commands run successfully)

---

## Phase 2: Backend Core (Foundational)

**Purpose**: Core infrastructure required before features can be built.

**⚠️ CRITICAL**: Must complete before Phase 3.

- [x] T007 Setup `backend/src/core/db.py` with SQLModel `AsyncEngine` and session dependency. (Criterion: Can connect to Docker DB)
- [x] T008 Initialize Alembic and configure `env.py` to read SQLModel metadata. (Criterion: `alembic revision --autogenerate` works)
- [x] T009 Define `User` SQLModel with email (index, unique) and hashed_password. (Criterion: Model exists in `backend/src/models/user.py`)
- [x] T010 Define `Task` SQLModel with FK to User. (Criterion: Model exists in `backend/src/models/task.py`)
- [x] T011 Create Auth Utils in `backend/src/core/security.py`: Password hashing (bcrypt) and JWT encode/decode functions. (Criterion: Unit tests for hash/verify pass)
- [x] T012 Setup main API application with CORS (allow frontend origin) and Exception Handlers. (Criterion: `GET /health` returns 200)

---

## Phase 3: Backend Features (User Stories)

**Purpose**: Implementation of API endpoints using TDD.

### User Story 1: Authentication (US1) & Persistence (US3)

- [x] T013 [US1] Create unit tests for Register and Login flows in `backend/tests/test_auth.py` (Expect failures). (Criterion: Tests created)
- [x] T014 [US1] Implement `POST /api/v1/auth/register` to create new users. (Criterion: Test passes, user in DB)
- [x] T015 [US1] Implement `POST /api/v1/auth/login` to validate credentials and set `access_token` HttpOnly Cookie. (Criterion: Test passes, cookie set in response)
- [x] T016 [US1] Implement `get_current_user` dependency that reads token from Cookie. (Criterion: Validates token, returns User object)
- [x] T017 [US1] Implement `POST /api/v1/auth/logout` (clear cookie) and `GET /api/v1/auth/me` (verify session). (Criterion: Logout clears cookie)

### User Story 2: Task Management (US2)

- [x] T018 [US2] Create unit tests for Todo CRUD operations in `backend/tests/test_todos.py` (Expect failures). (Criterion: Tests created)
- [x] T019 [US2] Implement `POST /api/v1/todos` endpoint (Protected by `get_current_user`). (Criterion: Test passes, task created for logged-in user)
- [x] T020 [US2] Implement `GET /api/v1/todos` (List) and `GET /api/v1/todos/{id}`. Ensure isolation (User A cannot see User B's tasks). (Criterion: Test passes)
- [x] T021 [US2] Implement `PATCH /api/v1/todos/{id}` (Update) and `DELETE /api/v1/todos/{id}`. (Criterion: status update works, delete works)

---

## Phase 4: Frontend Core (Foundational)

**Purpose**: Frontend architecture and state management.

- [x] T022 Setup `frontend/src/lib/api.ts` axios/fetch instance with `credentials: 'include'` to handle HttpOnly cookies automatically. (Criterion: API calls send cookies)
- [x] T023 Implement global `AuthContext` provider and `useAuth` hook. Should check `/auth/me` on mount. (Criterion: Context holds user state)
- [x] T024 Create generic Layout component with Navbar (showing user email/logout button) and protected route logic. (Criterion: Redirects to /login if unauthenticated)
- [x] T025 Setup Zod schemas for form validation in `frontend/src/lib/validations.ts`. (Criterion: Schemas exist for Login/Register/Todo)

---

## Phase 5: Frontend Features

**Purpose**: User Interface implementation.

### User Story 1: Authentication UI (US1)

- [x] T026 [US1] Create `LoginForm` component with error handling. (Criterion: Submits to login API, updates AuthContext)
- [x] T027 [US1] Create `RegisterForm` component. (Criterion: Submits to register API, redirects to login)
- [x] T028 [US1] Create `/login` and `/register` pages using the forms. (Criterion: Pages render correctly)

### User Story 2: Dashboard UI (US2)

- [x] T029 [US2] Create `TodoItem` component (Card/Row) with Edit/Delete/Toggle Complete actions. (Criterion: Renders task props)
- [x] T030 [US2] Create `CreateTodo` form/modal component. (Criterion: Validates input, calls API)
- [x] T031 [US2] Create `TodoList` component that fetches tasks on mount and handles loading/empty states. (Criterion: Lists tasks from API)
- [x] T032 [US2] Assemble `/dashboard` page using `Layout` + `TodoList`. (Criterion: Full dashboard renders)

---

## Phase 6: Integration & QA

**Purpose**: Final verification and polish.

- [ ] T033 [US1/US3] Verify full Auth Lifecycle: Register -> Login -> Refresh Page (Session persists) -> Logout. (Criterion: Manual verification passed)
- [ ] T034 [US2] Verify Data Isolation: Create two accounts, ensure data does not leak between them. (Criterion: Manual verification passed)
- [ ] T035 [US2] detailed Verification of Todo CRUD: Create, Edit, Toggle, Delete. Ensure UI updates optimistically or re-fetches. (Criterion: All operations work without error)
- [ ] T036 Run full E2E smoke test (manual or automated if time permits) and fix any styling/responsive issues. (Criterion: App looks good on mobile and desktop)
- [ ] T037 Update README.md with run instructions for the full stack app. (Criterion: Documentation current)
