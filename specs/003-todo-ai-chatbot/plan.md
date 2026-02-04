# Implementation Plan: Todo AI Chatbot

**Branch**: `003-todo-ai-chatbot` | **Date**: 2026-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-todo-ai-chatbot/spec.md`

## Summary

Integrate an AI-powered chatbot into the Phase II full-stack Todo application, enabling users to manage tasks via natural language in English, Urdu, and Roman Urdu. The chatbot uses OpenRouter API (free tier) with OpenAI SDK compatibility for tool calling. Architecture extends existing monorepo with new chat endpoints, AI agent service, and floating chat UI widget.

## Technical Context

**Language/Version**: Python 3.13+ (Backend), TypeScript 5+ (Frontend)
**Primary Dependencies**:
- Backend: FastAPI, SQLModel, openai (for OpenRouter), Pydantic
- Frontend: Next.js 16+, React 19, Tailwind CSS, Shadcn UI, Framer Motion
**Storage**: Neon Serverless PostgreSQL (existing + new tables: Conversation, Message)
**AI Service**: OpenRouter API via OpenAI SDK (`base_url="https://openrouter.ai/api/v1"`)
**Default Model**: `meta-llama/llama-3.1-8b-instruct:free` (configurable via env)
**Testing**: pytest (Backend), manual E2E for chat flow
**Target Platform**: Linux container (Backend), Vercel/Node (Frontend)
**Project Type**: Full-stack web application with AI integration
**Performance Goals**: <5s AI response time, <200ms API latency (non-AI), <1s chat widget open
**Constraints**: Stateless API, JWT Auth, DB persistence for conversations, language mirroring

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Spec-Driven Development Only | ✅ PASS | Following Constitution → Specify → Clarify → Plan → Tasks workflow |
| II. Deterministic and Reproducible Output | ✅ PASS | Conversation state persisted in DB only; no in-memory state |
| III. Clean Architecture with AI Integration | ✅ PASS | Separate layers: models, services, api, tools, UI components |
| IV. Minimal but Complete MVP with AI | ✅ PASS | 5 operations via NL; no feature creep |
| V. User-Friendly, Error-Safe, Multilingual | ✅ PASS | Language mirroring via prompt; graceful errors; confirmation for delete |
| VI. Python/TS Code Quality Standards | ✅ PASS | Docstrings, type hints, PEP8/ESLint planned |

**Key Standards Compliance**:
- ✅ Traceability: Tool calls logged with message references
- ✅ MCP Tools: Stateless, exact params/returns as spec
- ✅ Source Types: OpenRouter docs referenced in research.md

## Project Structure

### Documentation (this feature)

```text
specs/003-todo-ai-chatbot/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file
├── research.md          # Technology decisions (completed)
├── data-model.md        # Entity schemas (completed)
├── quickstart.md        # Setup guide (completed)
├── contracts/           # API contracts (completed)
│   ├── chat-api.yaml    # OpenAPI spec
│   └── tools-schema.json # Tool definitions
└── tasks.md             # Implementation tasks (next: /sp.tasks)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── api/
│   │   ├── auth.py          # Existing
│   │   ├── deps.py          # Existing
│   │   ├── todos.py         # Existing
│   │   └── chat.py          # NEW: Chat endpoints
│   ├── core/
│   │   ├── db.py            # Existing
│   │   └── security.py      # Existing
│   ├── models/
│   │   ├── __init__.py      # Update: export new models
│   │   ├── task.py          # Existing
│   │   ├── user.py          # Existing
│   │   ├── conversation.py  # NEW: Conversation model
│   │   └── message.py       # NEW: Message model
│   ├── services/
│   │   ├── chat_service.py  # NEW: Chat orchestration
│   │   └── ai_agent.py      # NEW: OpenRouter agent
│   ├── tools/
│   │   └── todo_tools.py    # NEW: Tool implementations
│   └── main.py              # Update: register chat router
└── tests/
    └── test_chat.py         # NEW: Chat endpoint tests

frontend/
├── src/
│   ├── app/
│   │   └── layout.tsx       # Update: add ChatWidget
│   ├── components/
│   │   ├── chat/            # NEW: Chat UI components
│   │   │   ├── ChatWidget.tsx
│   │   │   ├── ChatButton.tsx
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── ChatMessages.tsx
│   │   │   ├── ChatBubble.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── TypingIndicator.tsx
│   │   │   └── LoginGate.tsx
│   │   └── ui/              # Existing Shadcn components
│   └── lib/
│       ├── api.ts           # Existing
│       └── chat-api.ts      # NEW: Chat API client
└── tests/
```

**Structure Decision**: Extend existing monorepo; add `tools/` directory for AI tool functions.

## Architecture Decisions

### ADR-001: AI Client Choice

**Decision**: Use OpenAI Python SDK with OpenRouter `base_url`

**Context**: Need to integrate AI for natural language processing with tool calling support.

**Options Considered**:
1. OpenAI SDK + OpenRouter base_url ✅
2. Native OpenRouter SDK
3. Direct HTTP requests

**Rationale**: OpenRouter provides full OpenAI API compatibility. Using the familiar OpenAI SDK patterns minimizes learning curve and leverages existing documentation. The `base_url` configuration is a one-line change.

### ADR-002: Multilingual Approach

**Decision**: Single agent with multilingual system prompt (prompt engineering)

**Context**: Support English, Urdu, and Roman Urdu without separate agents.

**Options Considered**:
1. Prompt engineering with language mirroring ✅
2. Separate agents per language
3. Language detection + translation layer

**Rationale**: Modern LLMs handle multilingual well. Single prompt with examples is simpler to maintain. Language mirroring ("respond in same language") is achieved via system prompt instruction.

### ADR-003: State Management

**Decision**: Stateless server with DB persistence

**Context**: Constitution mandates DB-only state; need session resumption.

**Options Considered**:
1. DB persistence only ✅
2. In-memory sessions
3. Redis cache

**Rationale**: Constitutional compliance; enables horizontal scaling; messages table provides full history.

## Component Design

### Backend Components

#### 1. Chat Router (`api/chat.py`)
- `POST /api/v1/chat` - Send message, get AI response
- `GET /api/v1/chat/history` - Retrieve conversation history
- Dependencies: `get_current_user`, `get_session`

#### 2. Chat Service (`services/chat_service.py`)
- Orchestrates conversation flow
- Manages message persistence
- Delegates to AI agent for responses

#### 3. AI Agent (`services/ai_agent.py`)
- Configures OpenAI client with OpenRouter base_url
- Manages system prompt (multilingual instructions)
- Handles tool calling loop
- Returns formatted responses

#### 4. Todo Tools (`tools/todo_tools.py`)
- `add_task(title, description?)` → Creates task via existing CRUD
- `list_tasks(filter?)` → Retrieves tasks with position numbers
- `complete_task(identifier)` → Marks task complete
- `delete_task(identifier, confirmed)` → Deletes with confirmation
- `update_task(identifier, new_title?, new_description?)` → Updates task

### Frontend Components

#### 1. ChatWidget (container)
- Manages open/closed state
- Conditionally renders LoginGate or ChatWindow
- Fixed position bottom-right

#### 2. ChatButton
- Floating action button
- Chat icon with hover animation
- Click to toggle ChatWindow

#### 3. ChatWindow
- Card container with header
- Contains ChatMessages + ChatInput
- Slide-up animation on open

#### 4. ChatMessages
- ScrollArea with message list
- Auto-scroll on new messages
- Renders ChatBubble for each message

#### 5. ChatBubble
- User vs assistant styling
- Timestamp display
- Fade-in animation

#### 6. ChatInput
- Text input + send button
- Enter to submit
- Disabled during loading

#### 7. TypingIndicator
- Three animated dots
- Shows when awaiting AI response

#### 8. LoginGate
- Friendly message for unauthenticated users
- Links to /login and /register

## Testing Strategy

### Unit Tests (Backend)
- Tool functions with mocked DB session
- Chat service with mocked AI agent
- Message/Conversation model validation

### Integration Tests (Backend)
- Chat endpoint with test user
- Verify message persistence
- Verify user isolation

### E2E Tests (Manual)
- Chat widget visibility
- Login gate for unauthenticated
- Full conversation flow
- Multilingual commands
- Error handling

### Acceptance Criteria Validation
| SC | Test Method |
|----|-------------|
| SC-001: <10s operations | Manual timing |
| SC-002: 90%+ accuracy | Test common phrases |
| SC-003: <1s widget open | Manual timing |
| SC-004: 100% persistence | Refresh verification |
| SC-005: 100% login gate | Logged-out testing |
| SC-006: 100% error guidance | Edge case testing |
| SC-007: <5s response | Manual timing |
| SC-008: 3 languages | Multilingual testing |

## Implementation Phases

### Phase 1: Backend Foundation
1. Create Conversation and Message models
2. Generate Alembic migration
3. Implement chat router (endpoints)
4. Implement chat service (orchestration)

### Phase 2: AI Integration
5. Implement AI agent with OpenRouter
6. Create system prompt with multilingual examples
7. Implement tool functions (5 todo operations)
8. Wire up tool calling loop

### Phase 3: Frontend Chat UI
9. Create ChatWidget container
10. Implement ChatButton with animation
11. Implement ChatWindow with header
12. Implement ChatMessages and ChatBubble
13. Implement ChatInput
14. Implement TypingIndicator
15. Implement LoginGate

### Phase 4: Integration & Polish
16. Add ChatWidget to layout.tsx
17. Wire up API calls
18. Add error handling
19. Test multilingual support
20. Final QA validation

## Checkpoint: Human Review

**After Phase 2 (AI Integration)**: Request human review before proceeding to frontend.

Review checklist:
- [ ] Tool functions work correctly
- [ ] AI responds appropriately to test prompts
- [ ] Multilingual responses work
- [ ] Messages persist to database
- [ ] Error handling is graceful

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Free model rate limits | Medium | Document limits; add retry with backoff |
| Tool calling failures | Medium | Graceful fallback to clarification |
| Multilingual accuracy | Low | Test common phrases; fallback to English |
| Context window overflow | Low | Limit to 10 messages per spec |

## Complexity Tracking

> No constitution violations identified. Design follows minimal viable approach.

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| Single conversation per user | Simplest model | No need for multiple threads in MVP |
| Tools as functions | Direct approach | No complex MCP server needed |
| Prompt-based multilingual | No translation service | LLM handles multilingual natively |

## Next Steps

Run `/sp.tasks` to generate implementation tasks based on this plan.
