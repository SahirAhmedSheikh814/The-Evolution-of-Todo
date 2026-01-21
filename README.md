# The Evolution of Todo – Mastering Spec-Driven Development & Cloud Native AI

**Hackathon Project:** This repository chronicles the journey of building a production-grade application using **Spec-Driven Development (SDD)** principles, evolving from a simple in-memory Python console app (Phase 1) to a scalable, cloudy-native full-stack solution (Phase 2).

---

# Phase 1: Python Console Application

A robust, in-memory command-line interface (CLI) Todo application designed to demonstrate clean architecture, strict typing, and comprehensive testing in Python.

## Technology Stack

- **Language**: Python 3.13+
- **Dependency Manager**: UV
- **Testing**: pytest (High coverage required)
- **Quality**: pylint, mypy (Strict mode)

## Architecture

- **Models**: Pure data classes (`src/models`)
- **Services**: Business logic and state management (`src/services`)
- **CLI**: User interface and command handling (`src/cli`)

## Getting Started

1. **Setup Environment**:
   ```bash
   uv venv
   source .venv/bin/activate , On Windows: .venv\Scripts\activate
   uv pip install pytest pytest-cov pylint mypy .
   ```

2. **Run Application**:
   ```bash
   Option 1: Run from project directory (recommended)
   cd /mnt/e/TODO-APP
   uv run todo

   Option 2: Run as module
   uv run -m todo

   Option 3: Run with virtual environment
   uv venv
   source .venv/bin/activate , On Windows: .venv\Scripts\activate
   uv run todo
   ```

3. **Run Tests**:
   ```bash
   pytest tests/ --cov=src
   ```

## Key Features

- Add, List, Complete, and Delete tasks.
- Input validation and error handling.
- persistent in-memory storage during session.

---

# Phase 2: Full-Stack Cloud Native Application

A modern, scalable web application leveraging Next.js (Frontend) and FastAPI (Backend) with a serverless PostgreSQL database.

## Technology Stack

### Frontend
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn UI compatible
- **State**: React Context + Hooks
- **Validation**: Zod

### Backend
- **Framework**: FastAPI (Async)
- **Language**: Python 3.13+
- **Database**: Neon Serverless PostgreSQL
- **ORM**: SQLModel (SQLAlchemy + Pydantic)
- **Migrations**: Alembic
- **Auth**: JWT (HttpOnly Cookies)

## Architecture

```
TODO-APP/
├── frontend/              # Next.js SPA
│   ├── src/app/          # App Router Pages
│   ├── src/components/   # Reusable UI Components
│   └── src/lib/          # API Clients & Utils
├── backend/               # FastAPI REST API
│   ├── src/api/          # Route Handlers
│   ├── src/core/         # Config & DB Setup
│   └── src/models/       # Database Schemas
└── specs/                 # Spec-Driven Development Artifacts
```

## Quick Start

### 1. Backend Setup

```bash
cd backend
uv venv
source .venv/bin/activate
uv pip install -e .

# Configure .env
cp .env.example .env
# Set DATABASE_URL=postgresql+asyncpg://...

# Run Migrations
alembic upgrade head

# Start Server
uvicorn src.main:app --reload
```

### 2. Frontend Setup

```bash
cd frontend
npm install

# Configure .env
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:8000

# Start Dev Server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Feature Highlights

- **Secure Authentication**: HttpOnly cookies with dynamic `Secure` flag handling (Local vs Prod).
- **Responsive UI**: Mobile-first design with Tailwind CSS.
- **Robust Error Handling**: User-friendly alerts without console pollution.
- **Spec-Driven**: All features designed and specified before implementation.

## Version History

- **Phase 2 (v2.0.0)**: Full-stack implementation (Current)
- **Phase 1 (v0.1.0)**: In-memory console implementation (Legacy)

---

## License

MIT License
