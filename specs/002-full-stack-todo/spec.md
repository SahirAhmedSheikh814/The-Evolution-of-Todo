# Feature Specification: Full-Stack Todo Web Application

**Feature Branch**: `002-full-stack-todo`
**Created**: 2026-01-09
**Status**: Draft
**Input**: User description: "Full-Stack Todo Web Application (Phase 2 of Hackathon II: Evolving Phase 1 CLI to multi-user web app with persistent storage)..."

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE.
-->

### User Story 1 - User Authentication & Isolation (Priority: P1)

As a user, I want to securely sign up and log in so that my tasks are private and saved permanently.

**Why this priority**: Without authentication and isolation, a multi-user web app is not viable. This establishes the security context for all other features.

**Independent Test**: Can be tested by creating two different accounts and verifying they cannot see each other's data.

**Acceptance Scenarios**:

1. **Given** a new user, **When** they provide valid credentials (email/password), **Then** a new account is created and they are logged in.
2. **Given** an existing user, **When** they log in, **Then** they are redirected to their dashboard.
3. **Given** User A and User B, **When** User A adds a task, **Then** User B CANNOT see that task in their list.
4. **Given** a logged-out user, **When** they try to access protected routes, **Then** they are redirected to the login page.

---

### User Story 2 - Basic Task Management (Priority: P1)

As a user, I want to manage my daily tasks (Add, View, Update, Delete, Mark Complete) through a web interface so I can stay organized.

**Why this priority**: These are the core value-add features of the application (the "Todo" part).

**Independent Test**: Can be tested by performing the full CRUD lifecycle on tasks within a single user session.

**Acceptance Scenarios**:

1. **Given** a logged-in user, **When** they enter a title and description and click "Add", **Then** the new task appears in their list immediately.
2. **Given** a list of tasks, **When** the user clicks "Mark Complete" on an active task, **Then** the task status updates visually to completed.
3. **Given** an existing task, **When** the user edits the title or description, **Then** the changes are saved and reflected.
4. **Given** a task, **When** the user clicks "Delete" and confirms, **Then** the task takes is removed from the list permanently.

---

### User Story 3 - Data Persistence & Session Continuity (Priority: P1)

As a user, I want my tasks and login session to persist across page reloads and browser restarts so I don't lose my work.

**Why this priority**: Essential for a web application to be useful; marks the transition from Phase 1 (in-memory) to Phase 2 (persistent).

**Independent Test**: Can be tested by modifying data, closing the browser/tab, and reopening it to verify state.

**Acceptance Scenarios**:

1. **Given** a logged-in user with tasks, **When** they refresh the page, **Then** they remain logged in and see the same tasks.
2. **Given** a logged-in user with tasks, **When** the backend server restarts, **Then** the data is preserved (PostgreSQL persistence).
3. **Given** a user session, **When** the JWT token expires, **Then** the user is prompted to re-login carefully without crashing the UI.

---

### User Story 4 - UX Polish & Responsiveness (Priority: P2)

As a user, I want a smooth, responsive interface with consistent loading states so I perceive the app as fast and professional.

**Why this priority**: Enhances perceived performance and usability across devices.

**Acceptance Scenarios**:

1. **Given** the app is loading (initial load or navigation), **Then** Skeleton loaders (shadcn/ui) are shown instead of blank space or layout shifts.
   - Header buttons (Dashboard/Login) show skeletons of exact size.
   - Login/Register pages show skeletons for title and form.
2. **Given** a viewport width <= 1000px (Tablet/Mobile), **Then** the Header displays the Hamburger menu (Logo Left, Menu Right). Desktop nav appears only > 1000px.
3. **Given** the Header desktop view, **Then** navigation links are strictly centered.
4. **Given** the Dashboard, **Then** the "Your tasks" section header is always visible, even if the list is empty.

---

### Edge Cases


- **Network Failure**: User attempts to add a task while offline -> UI shows "Connection Error" toast.
- **Invalid Input**: User submits empty task title -> Input field highlights red with "Title required" message.
- **Concurrent Updates**: User A updates a task on two devices -> Last write wins (standard MVP approach).
- **Session Expiry**: User creates task after token expires -> Redirect to login, ideally preserving draft (or at least secure error details).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to register and login using email/password.
- **FR-002**: System MUST enforce strict data isolation; users can strictly access only their own records.
- **FR-003**: Users MUST be able to Create, Read, Update, and Delete (CRUD) tasks.
- **FR-004**: Users MUST be able to toggle the completion status of a task.
- **FR-005**: System MUST persist all user and task data in a PostgreSQL database.
- **FR-006**: System MUST authenticate API requests via JWT tokens stored in HttpOnly cookies.
- **FR-007**: Web UI MUST be responsive using standard Tailwind breakpoints (sm: 640px, md: 768px, lg: 1024px).

### Key Entities

- **User**: Represents a registered account (ID, email, hashed_password, created_at).
- **Task**: Represents a todo item (ID, user_id, title, description, is_completed, created_at, updated_at).

### API Requirements *(for web/backend)*

- **Endpoints**:
  - `POST /auth/register` - Create account
  - `POST /auth/login` - Get JWT (Set-Cookie)
  - `GET /todos` - List user's tasks
  - `POST /todos` - Create task
  - `GET /todos/{id}` - Get single task
  - `PATCH /todos/{id}` - Update task fields (title, description, is_completed)
  - `DELETE /todos/{id}` - Remove task
- **Authentication**: Bearer Token (JWT) required for all `/todos` endpoints (extracted from Cookie).
- **Error Format**: All errors MUST return standard JSON: `{ "error": "description", "code": "ERR_CODE" }`.

### UI Requirements *(for frontend)*

- **Components**:
  - `LoginForm` / `RegisterForm`
  - `DashboardLayout` (Navbar with Logout)
  - `TodoList` (Grid/List view)
  - `TodoItem` (Card/Row with actions)
  - `CreateTodoModal` or Form
- **State**: Client-side state for immediate feedback (optimistic UI recommended but not required for MVP).
- **Responsive**: Layout adapts to screen size (e.g., stacked on mobile, grid on desktop).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete the signup flow and create their first task in under 2 minutes.
- **SC-002**: All 5 basic todo operations (Add, List, Update, Delete, Toggle) function correctly without console errors 100% of the time in happy path.
- **SC-003**: Data persists correctly across server restarts (verified by stop/start cycles).
- **SC-004**: Unauthorized access attempts (accessing another user's task ID) return 403 Forbidden or 404 Not Found 100% of the time.
