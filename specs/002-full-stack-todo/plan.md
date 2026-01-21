# Architectural Plan: Full-Stack Todo Web Application

## 1. Scope and Dependencies

### In Scope
- **Frontend**: Single Page Application (SPA) using Next.js 16 (App Router).
- **Backend**: API Server using FastAPI (Python 3.13+).
- **Database**: PostgreSQL for persistent storage.
- **Authentication**: JWT-based auth stored in HttpOnly cookies (FastAPI Native).
- **Core Features**:
  - User Registration & Login
  - Task Management (CRUD)
  - Task Completion Toggle
  - Secure Logout

### Out of Scope
- Email verification / Password reset.
- Social Login (OAuth with Google/GitHub) - differed to Phase 3.
- Real-time updates (WebSockets) - differed to Phase 3.
- Advanced Task features (Categories, Tags, Due Dates).

### External Dependencies
- **PostgreSQL**: System or containerized database.
- **Python Packages**: `fastapi`, `uvicorn`, `sqlmodel`, `pydantic`, `python-jose`, `passlib`, `alembic`, `asyncpg`.
- **Node Packages**: `next`, `react`, `react-dom`, `lucide-react` (icons), `zod` (validation).

## 2. Key Decisions and Rationale

| Decision | Option Selected | Trade-offs | Rationale |
| :--- | :--- | :--- | :--- |
| **Backend Framework** | **FastAPI** | (+) High performance, async, auto-docs. (-) Smaller ecosystem than Django. | Matches Phase 1 language (Python), strict typing support, modern async capabilities suitable for scaling. |
| **Frontend Framework** | **Next.js 16** | (+) Server components, latest React features. (-) Higher learning curve. | Industry standard, robust routing, server actions simplify API interaction. |
| **Database ORM** | **SQLModel** | (+) Combines Pydantic & SQLAlchemy. (-) Newer/less mature than pure SQLAlchemy. | Perfect synergy with FastAPI, reduces boilerplate by unifying Pydantic schemas and SQLAlchemy models. |
| **Auth Method** | **JWT via HttpOnly Cookie** | (+) XSS secure, stateless scaling. (-) CSRF mitigation needed. | Secure default for SPAs. Avoids storing tokens in localStorage (XSS risk). Replaces JS-only "Better Auth". |
| **Styling** | **Tailwind CSS** | (+) Rapid dev, utility-first. (-) Cluttered HTML. | Faster iteration for MVP, integrated with Next.js defaults. |

## 3. Interfaces and API Contracts

### API Principles
- **Style**: RESTful JSON API.
- **Versioning**: Prefix `/api/v1`.
- **Auth**: `Authorization: Bearer <token>` (optional header) OR `access_token` cookie. Plan uses **Cookie** primarily for browser security.

### Core Endpoints

#### Authentication
- `POST /api/v1/auth/register`
  - Input: `{ email, password }`
  - Output: `201 Created`
- `POST /api/v1/auth/login`
  - Input: `{ username (email), password }` (OAuth2 Password Request Form form-data compatible or JSON)
  - Output: `200 OK` (Sets `access_token` HttpOnly cookie)
- `POST /api/v1/auth/logout`
  - Output: `200 OK` (Clears cookie)
- `GET /api/v1/auth/me`
  - Output: `UserResponse`

#### Tasks
- `GET /api/v1/todos`
  - Query: `?skip=0&limit=100`
  - Output: `List[TaskResponse]`
- `POST /api/v1/todos`
  - Input: `{ title, description }`
  - Output: `TaskResponse`
- `GET /api/v1/todos/{id}`
  - Output: `TaskResponse`
- `PATCH /api/v1/todos/{id}`
  - Input: `{ title?, description?, is_completed? }`
  - Output: `TaskResponse`
- `DELETE /api/v1/todos/{id}`
  - Output: `204 No Content`

### Standard Error Response
```json
{
  "detail": "Error description",
  "code": "ERROR_CODE"
}
```

## 4. Non-Functional Requirements (NFRs)

- **Performance**: API response < 200ms for p95.
- **Security**:
  - Passwords hashed with `bcrypt`.
  - Cookies: `HttpOnly`, `Secure` (prod), `SameSite=Lax`.
  - CORS configured for frontend origin only.
- **Reliability**:
  - Database connection pooling.
  - Graceful error handling (no 500s exposed to user).

## 5. Data Management

### Database Schema (SQLModel)

#### `User`
| Field | Type | Attributes |
| :--- | :--- | :--- |
| `id` | UUID | PK, Defaults to uuid4 |
| `email` | String | Unique, Index, Required |
| `hashed_password` | String | Required |
| `created_at` | DateTime | Default `now()` |

#### `Task`
| Field | Type | Attributes |
| :--- | :--- | :--- |
| `id` | UUID | PK, Defaults to uuid4 |
| `title` | String | Required |
| `description` | String | Optional |
| `is_completed` | Boolean | Default `False` |
| `user_id` | UUID | FK -> `User.id` |
| `created_at` | DateTime | Default `now()` |
| `updated_at` | DateTime | OnUpdate `now()` |

## 6. Operational Readiness

- **Runbooks**:
  - *Start Dev*: `uv run uvicorn src.main:app --reload` (Backend) + `npm run dev` (Frontend).
  - *Migrations*: `alembic revision --autogenerate` / `alembic upgrade head`.
- **Logs**:
  - Structured logging (JSON format preferred in prod).
  - Capture all API exceptions.

## 7. Risk Analysis

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| **CORS / CSRF Attacks** | Unauth actions | Strict CORS policy + SameSite=Lax cookies. |
| **Migration Failure** | Data inconsistency | Alembic migrations checked into git. Backup before upgrades. |
| **Auth Complexity** | Login bugs | Use proven libraries (`python-jose`, `passlib`). Integration tests for auth flow. |

## 8. Evaluation and Validation

### Definition of Done
1. **Migrations**: Database schema applied strictly via migrations.
2. **Tests**:
   - Backend: > 80% coverage (Pytest).
   - Integration: Auth flow + CRUD verified.
3. **Frontend**:
   - Compiles without lint errors.
   - Connects to backend successfully.
4. **UX**:
   - Responsive design works on Mobile/Desktop.
   - Loading states visible.

### Automated Checks
- `pytest` for backend unit/integration tests.
- `mypy` strict mode.
- `eslint` for Next.js.
