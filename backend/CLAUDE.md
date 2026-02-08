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
│   ├── chat.py          # Chatbot endpoints (Phase 3)
│   ├── deps.py          # Dependency injection (Current User, DB Session)
│   ├── main.py          # Router aggregations
│   └── todos.py         # Todo resource endpoints
├── core/                # Core configuration
│   ├── config.py        # Settings management
│   ├── db.py            # Database connection & init
│   └── security.py      # Hashing & Token generation
├── models/              # SQLModel Database Models
│   ├── conversation.py  # Chat conversation metadata
│   ├── message.py       # Chat messages (history)
│   ├── task.py          # Task entity
│   └── user.py          # User entity
├── services/            # Business Logic
│   ├── ai_agent.py      # AI Orchestration & Tool Calling
│   ├── chat_service.py  # Chat persistence & flow
│   └── todo_tools.py    # Todo manipulation tools for AI
└── main.py              # Application entry point
```

### Key Features

- **Async Database**: Uses `asyncpg` driver for high-concurrency performance.
- **Auto-Detect Security**: Dynamically configures cookie security (`Secure`, `SameSite`) based on environment (HTTP vs HTTPS).
- **Strict Typing**: Full Python type hints compliance.
- **Migrations**: Database schema managed via Alembic revisions.
- **AI Integration**: Powered by OPEN_AI_API Model (Phase 3).

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

### Chat (`/api/v1/chat`) - Phase 3

- **POST /**: Send natural language command (process via AI Agent). Features tool calling for Todo management.
- **GET /history**: Retrieve paginated conversation history with timestamps (UTC).

## Security Standards

- **Cookies**: HttpOnly, SameSite=None (prod) / Lax (dev), dynamic Secure flag.
- **Passwords**: Bcrypt hashing.
- **CORS**: Configured to allow frontend origin with credentials.
- **Environment**: Sensitive keys (`DATABASE_URL`, `SECRET_KEY`) loaded from `.env`.

## Troubleshooting

- **Database Errors**: Ensure Neon DB URL is correct in `.env`.
- **401 Unauthorized**: Check if `session_token` cookie is present and backend lookup key matches in `deps.py`.
- **CORS Errors**: Verify allowed origins in `src/main.py`.

---

## Phase 4: Kubernetes Deployment

### Docker Configuration

The backend is containerized using a production-ready Dockerfile:

```dockerfile
FROM python:3.13-slim AS base
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y build-essential libpq-dev curl
RUN curl -LsSf https://astral.sh/uv/install.sh | sh

COPY pyproject.toml requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# Non-root user
RUN useradd -m -u 1001 appuser
USER appuser

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=10s CMD curl -f http://localhost:8000/health || exit 1
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Kubernetes Service

- **Service Type**: NodePort
- **Internal Port**: 8000
- **External Port**: 30800
- **Access URL**: `http://<minikube-ip>:30800`
- **API Docs**: `http://<minikube-ip>:30800/docs`

### Build & Deploy

```bash
# Build image
docker build -t todo-backend:latest ./backend

# Load into Minikube
minikube image load todo-backend:latest

# Deploy via Helm
helm install todo-app ./todo-web-app
```

### Environment Variables (Kubernetes)

Configured in `todo-web-app/values.yaml`:

- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: JWT secret
- `OPENAI_API_KEY`: AI chatbot API key
- `OPENAI_BASE_URL`: OpenAI endpoint
