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

## Live Links
Vercel Deployment link: [https://taskflow-seven-smoky.vercel.app/](https://taskflow-seven-smoky.vercel.app/)
Backend API URL: [https://huggingface.co/spaces/sahirahmed814/Full_Stack_TODO_App](https://huggingface.co/spaces/sahirahmed814/Full_Stack_TODO_App)

## Feature Highlights

- **Secure Authentication**: HttpOnly cookies with dynamic `Secure` flag handling (Local vs Prod).
- **Responsive UI**: Mobile-first design with Tailwind CSS.
- **Robust Error Handling**: User-friendly alerts without console pollution.
- **Spec-Driven**: All features designed and specified before implementation.

---

# Phase 3: AI-Powered Chatbot Integration

An intelligent conversational agent "TaskFlow AI" integrated into the full-stack Todo application, enabling natural language task management via a professional, responsive UI widget.

## Technology Stack

- **AI Model**: OPEN_AI_API Model
- **Frontend Integration**: React Floating Widget, Framer Motion
- **Backend Service**: FastAPI AI Agent with Tool Calling
- **Persistence**: PostgreSQL (Conversations & Messages)

## Architecture

- **Frontend**: Custom Chat Widget (`src/components/chat`)
- **Backend**: AI Service (`src/services/ai_agent.py`) & Chat API (`src/api/chat.py`)
- **Event Bus**: Real-time Todo updates via `todo-updated` event

## Quick Start

1. **Add API Key**:
   Add `OPEN_AI_API=sk-...` to `backend/.env`.

2. **Restart Backend**:
   ```bash
   uvicorn src.main:app --reload
   ```

3. **Interact**:
   Open the application and click the floating chat icon to start managing tasks with natural language.

## Feature Highlights

- **Natural Language Processing**: Create, list, and delete tasks using conversational English.
- **Context Awareness**: "Buy milk tomorrow" correctly infers dates.
- **Real-Time Sync**: UI updates immediately when AI modifies tasks.
- **Persistent History**: Chat conversations are saved and retrievable.

---

# Phase 4: Local Kubernetes Deployment

A production-like local deployment of the full-stack Todo application using Docker containers, Minikube, and Helm Charts for Kubernetes orchestration.

## Technology Stack

- **Container Runtime**: Docker Desktop
- **Kubernetes**: Minikube (Local Cluster)
- **Package Manager**: Helm 3.x
- **Orchestration**: kubectl, kubectl-ai

## Architecture

```
┌─────────────────────────────────────────┐
│          Kubernetes Cluster             │
│  ┌───────────────────────────────────┐  │
│  │  Frontend (NodePort :30080)       │  │
│  │  - Next.js 16                     │  │
│  │  - Port: 3000                     │  │
│  └───────────┬───────────────────────┘  │
│              │                          │
│              │ HTTP Requests            │
│              ▼                          │
│  ┌───────────────────────────────────┐  │
│  │  Backend (NodePort :30800)        │  │
│  │  - FastAPI                        │  │
│  │  - Port: 8000                     │  │
│  │  - Connected to Neon PostgreSQL   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Quick Start

### 1. Start Minikube

```bash
minikube start --driver=docker --memory=4096 --cpus=2
```

### 2. Build Docker Images

```bash
# Build backend
docker build -t todo-backend:latest ./backend

# Build frontend (with API URL)
docker build -t todo-frontend:latest ./frontend \
  --build-arg NEXT_PUBLIC_API_URL=http://$(minikube ip):30800
```

### 3. Load Images into Minikube

```bash
minikube image load todo-backend:latest
minikube image load todo-frontend:latest
```

### 4. Deploy with Helm

```bash
helm install todo-app ./todo-web-app --namespace default
```

### 5. Access Application

```bash
# Get Minikube IP
minikube ip

# Frontend: http://<minikube-ip>:30080
# Backend API: http://<minikube-ip>:30800
# API Docs: http://<minikube-ip>:30800/docs
```

## Feature Highlights

- **Containerized Services**: Multi-stage Docker builds for optimized images.
- **Helm Charts**: Templated, version-controlled Kubernetes manifests.
- **Health Checks**: Liveness and readiness probes for reliability.
- **Resource Management**: CPU/Memory limits for predictable performance.
- **Security**: Non-root containers with dedicated service accounts.

## Version History

- **Phase 4 (v4.0.0)**: Local Kubernetes Deployment (Current)
- **Phase 3 (v3.0.0)**: AI-Powered Chatbot Integration (Legacy)
- **Phase 2 (v2.0.0)**: Full-stack implementation (Legacy)
- **Phase 1 (v0.1.0)**: In-memory console implementation (Legacy)

---

## License

MIT License
