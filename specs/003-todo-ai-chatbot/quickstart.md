# Quickstart: Todo AI Chatbot

## Prerequisites

- Phase II application running (frontend + backend)
- OpenRouter API key (get free at https://openrouter.ai)
- Python 3.13+ with UV package manager
- Node.js 18+ for frontend

## Setup Steps

### 1. Backend Configuration

Add to `backend/.env`:
```bash
# Existing vars...
OPENROUTER_API_KEY=sk-or-v1-your-key-here
OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct:free
```

Install new dependency:
```bash
cd backend
uv add openai
```

### 2. Database Migration

Generate and apply migration for new tables:
```bash
cd backend
alembic revision --autogenerate -m "Add conversation and message tables"
alembic upgrade head
```

### 3. Frontend Setup

Shadcn components (if not already installed):
```bash
cd frontend
npx shadcn@latest add scroll-area avatar
```

### 4. Verify Installation

Start backend:
```bash
cd backend
uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
```

Start frontend:
```bash
cd frontend
npm run dev
```

Test chat endpoint:
```bash
curl -X POST http://localhost:8000/api/v1/chat \
  -H "Content-Type: application/json" \
  -H "Cookie: session_token=YOUR_JWT_TOKEN" \
  -d '{"message": "Add task test chatbot"}'
```

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐ │
│  │ ChatWidget  │  │ ChatWindow  │  │ LoginGate            │ │
│  │ (floating)  │→ │ (messages)  │→ │ (unauthenticated)    │ │
│  └─────────────┘  └─────────────┘  └──────────────────────┘ │
│         │                                                    │
│         │ POST /api/v1/chat                                 │
│         ▼                                                    │
├─────────────────────────────────────────────────────────────┤
│                        Backend                               │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐ │
│  │ ChatRouter  │→ │ ChatService │→ │ AIAgent              │ │
│  │ (endpoint)  │  │ (orchestr.) │  │ (OpenRouter)         │ │
│  └─────────────┘  └─────────────┘  └──────────────────────┘ │
│                          │                  │                │
│                          │                  │ tool calls     │
│                          │                  ▼                │
│                          │         ┌──────────────────────┐ │
│                          │         │ Tool Functions       │ │
│                          │         │ - add_task           │ │
│                          │         │ - list_tasks         │ │
│                          │         │ - complete_task      │ │
│                          │         │ - delete_task        │ │
│                          │         │ - update_task        │ │
│                          │         └──────────────────────┘ │
│                          │                  │                │
│                          ▼                  ▼                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    Neon PostgreSQL                       ││
│  │  User │ Task │ Conversation │ Message                   ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## File Structure (New Files)

```
backend/src/
├── api/
│   └── chat.py              # NEW: Chat endpoints
├── models/
│   ├── conversation.py      # NEW: Conversation model
│   └── message.py           # NEW: Message model
├── services/
│   ├── chat_service.py      # NEW: Chat orchestration
│   └── ai_agent.py          # NEW: OpenRouter agent
└── tools/
    └── todo_tools.py        # NEW: Tool implementations

frontend/src/
├── components/
│   └── chat/
│       ├── ChatWidget.tsx   # NEW: Main chat component
│       ├── ChatButton.tsx   # NEW: Floating button
│       ├── ChatWindow.tsx   # NEW: Chat panel
│       ├── ChatMessages.tsx # NEW: Message list
│       ├── ChatBubble.tsx   # NEW: Message bubble
│       ├── ChatInput.tsx    # NEW: Input field
│       ├── TypingIndicator.tsx # NEW: Loading dots
│       └── LoginGate.tsx    # NEW: Auth prompt
└── lib/
    └── chat-api.ts          # NEW: Chat API client
```

## Testing Checklist

- [ ] Chat widget appears on dashboard (bottom-right)
- [ ] Unauthenticated users see login gate message
- [ ] "Add task test" creates a new task
- [ ] "Show my tasks" lists all tasks with numbers
- [ ] "Complete task 1" marks first task done
- [ ] "Delete task 2" asks for confirmation
- [ ] Roman Urdu "meri tasks dikhao" works
- [ ] Messages persist after page refresh
- [ ] Typing indicator shows during AI processing

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| OPENROUTER_API_KEY | Yes | - | OpenRouter API key |
| OPENROUTER_MODEL | No | meta-llama/llama-3.1-8b-instruct:free | Model identifier |
| DATABASE_URL | Yes | - | Neon PostgreSQL connection |
| SECRET_KEY | Yes | - | JWT signing key |
