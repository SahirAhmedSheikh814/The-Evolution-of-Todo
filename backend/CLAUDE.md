# Todo Full-Stack - Backend Development

## Project Overview

The backend is a high-performance, asynchronous REST API built with FastAPI and Python 3.13+, providing secure authentication and persistent data management via PostgreSQL.

## Technology Stack

- **Framework**: FastAPI (Async)
- **Language**: Python 3.13+
- **Database**: Neon Serverless PostgreSQL
- **ORM**: SQLModel (SQLAlchemy + Pydantic)
- **Migrations**: Alembic
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Passlib (Bcrypt), Python-Jose
- **Package Manager**: UV

## Architecture

### Directory Structure

```
backend/src/
├── api/                 # API Route handlers
│   ├── auth.py          # Authentication endpoints
│   ├── deps.py          # Dependency injection (Current User, DB Session)
│   ├── main.py          # Router aggregations
│   └── todos.py         # Todo resource endpoints
├── core/                # Core configuration
│   ├── config.py        # Settings management
│   ├── db.py            # Database connection & init
│   └── security.py      # Hashing & Token generation
├── models/              # SQLModel Database Models
│   ├── task.py          # Task entity
│   └── user.py          # User entity
└── main.py              # Application entry point
```

### Key Features

- **Async Database**: Uses `asyncpg` driver for high-concurrency performance.
- **Auto-Detect Security**: Dynamically configures cookie security (`Secure`, `SameSite`) based on environment (HTTP vs HTTPS).
- **Strict Typing**: Full Python type hints compliance.
- **Migrations**: Database schema managed via Alembic revisions.

## Development Workflow

### Setup

```bash
cd backend
# Create/activate virtual env
source .venv/bin/activate
```

### Running Locally

```bash
uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
# API runs at http://localhost:8000
# Docs at http://localhost:8000/docs
```

### Database Management

```bash
# Generate migration
alembic revision --autogenerate -m "message"

# Apply migration
alembic upgrade head
```

## API Specifications

### Authentication (`/api/v1/auth`)

- **POST /register**: Create new user.
- **POST /login**: Authenticate & set HttpOnly cookie (`session_token`).
- **POST /logout**: Clear authentication cookies (robust multi-attribute deletion).
- **GET /me**: Retrieve current user info (No-Cache).

### Todos (`/api/v1/todos`)

- **GET /**: List user's tasks.
- **POST /**: Create task.
- **GET /{id}**: Get task details.
- **PATCH /{id}**: Update task.
- **DELETE /{id}**: Delete task.

## Security Standards

- **Cookies**: HttpOnly, SameSite=None (prod) / Lax (dev), dynamic Secure flag.
- **Passwords**: Bcrypt hashing.
- **CORS**: Configured to allow frontend origin with credentials.
- **Environment**: Sensitive keys (`DATABASE_URL`, `SECRET_KEY`) loaded from `.env`.

## Troubleshooting

- **Database Errors**: Ensure Neon DB URL is correct in `.env`.
- **401 Unauthorized**: Check if `session_token` cookie is present and backend lookup key matches in `deps.py`.
- **CORS Errors**: Verify allowed origins in `src/main.py`.
