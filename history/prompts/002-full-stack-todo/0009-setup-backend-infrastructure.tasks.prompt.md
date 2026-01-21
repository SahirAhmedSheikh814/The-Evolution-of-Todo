---
id: "0009"
title: "setup-backend-infrastructure"
date: "2026-01-09"
time: "12:00:00"
stage: "tasks"
model: "claude-sonnet-4-5-20250929"
surface: "agent"
user: "user"
feature: "full-stack-todo"
branch: "main"
command: "/sp.implement"
labels:
  - "backend"
  - "infrastructure"
  - "uv"
  - "fastapi"
links:
  spec: "specs/002-full-stack-todo/spec.md"
  task: "specs/002-full-stack-todo/tasks.md"
file_changes:
  - "backend/pyproject.toml"
test_results: []
---

# Prompt

Execute Task T002 and Part of T006 (Backend):

1.  **Initialize Backend**:
    *   Create `backend/pyproject.toml` with:
        *   name: "backend"
        *   version: "0.1.0"
        *   description: "FastAPI Backend for Todo App"
        *   requires-python: ">=3.13"
        *   dependencies:
            *   fastapi
            *   uvicorn[standard]
            *   sqlmodel
            *   alembic
            *   asyncpg
            *   python-jose[cryptography]
            *   passlib[bcrypt]
            *   python-multipart
    *   Setup `uv` virtualenv: Run `uv venv` in `backend/` (if uv is available, otherwise assume environment will be set up).
    *   Install dependencies: `uv sync` or `uv pip install -r requirements.txt` (generate requirements first if needed, but `uv sync` with pyproject.toml is best).

2.  **Configure Backend Linting**:
    *   Add `[tool.ruff]` section to `pyproject.toml`.
    *   Add `[tool.mypy]` section to `pyproject.toml`.

3.  **Validate**:
    *   Run `uv --version` to check tool availability.
    *   Run `uv sync` in `backend/`.

**Output**:
- Write `backend/pyproject.toml`.
- Run installation commands.
- Report success criteria.

# Response

Successfully initialized the backend infrastructure.

1.  **Created `backend/pyproject.toml`** with:
    *   FastAPI, Uvicorn, SQLModel, Alembic, AsyncPG, Python-Jose, Passlib, Python-Multipart dependencies.
    *   `[tool.ruff]` configuration for linting (line-length 88, py313 target).
    *   `[tool.mypy]` configuration for strict type checking.

2.  **Setup Environment**:
    *   Created virtual environment with `uv venv`.
    *   Installed all dependencies using `uv sync`.

3.  **Verification**:
    *   `uv` version verified.
    *   Dependencies installed successfully (37 packages).

The backend environment is now ready for development.
