# Tasks: Todo AI Chatbot

**Input**: Design documents from `/specs/003-todo-ai-chatbot/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Manual E2E testing per plan.md (no automated test tasks generated)

**Organization**: Tasks grouped by implementation phase with checkpoints after major groups.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## User Story Mapping

| Story | Priority | Description |
|-------|----------|-------------|
| US1 | P1 | Add Task via Natural Language |
| US2 | P1 | List Tasks via Conversation |
| US3 | P2 | Complete Task via Chat |
| US4 | P2 | Delete Task via Chat |
| US5 | P3 | Update Task via Chat |
| US6 | P1 | Chat Widget Access Control (Login Gate) |
| US7 | P2 | Conversation Persistence |

---

## Phase 1: Setup (Environment & Dependencies)

**Purpose**: Install dependencies and configure environment for AI chatbot feature

**Estimated Time**: 15-20 min

- [x] T001 Add `openai` package to backend dependencies in backend/pyproject.toml
- [x] T002 [P] Add environment variables OPENROUTER_API_KEY and OPENROUTER_MODEL to backend/.env.example
- [x] T003 [P] Install Shadcn scroll-area component: `npx shadcn@latest add scroll-area` in frontend/
- [x] T004 [P] Verify existing Shadcn components (button, card, input) are installed in frontend/

**Checkpoint**: Dependencies installed, environment configured

---

## Phase 2: Foundational - Database Models & Migration

**Purpose**: Create Conversation and Message models required by ALL chat functionality

**⚠️ CRITICAL**: No chat features can work until this phase is complete

**Estimated Time**: 20-25 min

- [x] T005 [P] Create Conversation model in backend/src/models/conversation.py per data-model.md
- [x] T006 [P] Create Message model with MessageRole enum in backend/src/models/message.py per data-model.md
- [x] T007 Update backend/src/models/__init__.py to export Conversation and Message models
- [x] T008 Generate Alembic migration: `alembic revision --autogenerate -m "Add conversation and message tables"`
- [x] T009 Apply migration: `alembic upgrade head`
- [x] T010 Verify tables created in Neon PostgreSQL database

**Acceptance Criteria**:
- Conversation table exists with columns: id, user_id, created_at, updated_at
- Message table exists with columns: id, conversation_id, role, content, created_at
- Foreign keys properly configured

**Checkpoint**: Database schema ready for chat persistence

---

## Phase 3: Foundational - MCP Tools Implementation

**Purpose**: Implement the 5 todo operation tools that the AI agent will use

**Estimated Time**: 30-40 min

- [x] T011 Create backend/src/tools/ directory structure
- [x] T012 [P] Implement `add_task` tool function in backend/src/tools/todo_tools.py
- [x] T013 [P] Implement `list_tasks` tool function with position numbering in backend/src/tools/todo_tools.py
- [x] T014 [P] Implement `complete_task` tool function with identifier matching in backend/src/tools/todo_tools.py
- [x] T015 [P] Implement `delete_task` tool function with confirmation logic in backend/src/tools/todo_tools.py
- [x] T016 [P] Implement `update_task` tool function in backend/src/tools/todo_tools.py
- [x] T017 Create tool definitions array (OpenAI format) in backend/src/tools/todo_tools.py per contracts/tools-schema.json
- [x] T018 Add helper function `find_task_by_identifier` for position/title matching in backend/src/tools/todo_tools.py

**Acceptance Criteria**:
- Each tool accepts user_id and session parameters
- list_tasks returns tasks with 1-indexed position numbers
- find_task_by_identifier handles both "1", "2" numbers and title substring matches
- delete_task returns confirmation request when confirmed=False

**Checkpoint**: ✅ MCP TOOLS COMPLETE - Ready for human review

---

## Phase 4: AI Agent Integration

**Purpose**: Implement OpenRouter-powered AI agent with multilingual system prompt

**Estimated Time**: 30-40 min

- [x] T019 Create AI agent module in backend/src/services/ai_agent.py
- [x] T020 Configure OpenAI client with OpenRouter base_url and API key from environment
- [x] T021 Create multilingual system prompt with language mirroring instructions in backend/src/services/ai_agent.py
- [x] T022 Add example phrases for English, Urdu, and Roman Urdu in system prompt
- [x] T023 Implement tool calling loop (send message → get tool_calls → execute → return result)
- [x] T024 Add error handling for OpenRouter API failures with user-friendly messages
- [x] T025 Implement context management (last 10 messages per FR-007)

**Acceptance Criteria**:
- Agent uses `OPENROUTER_MODEL` env var (default: `meta-llama/llama-3.1-8b-instruct:free`)
- System prompt instructs AI to mirror user's language
- Tool calling loop handles multiple sequential tool calls
- API errors return "I'm having trouble connecting. Please try again in a moment."

**Checkpoint**: ✅ AI AGENT COMPLETE - Ready for human review

---

## Phase 5: Chat Service & API Endpoints

**Purpose**: Create chat orchestration service and REST endpoints

**Estimated Time**: 25-30 min

- [x] T026 Create chat service in backend/src/services/chat_service.py
- [x] T027 Implement `get_or_create_conversation` function in chat_service.py
- [x] T028 Implement `get_recent_messages` function (last N messages) in chat_service.py
- [x] T029 Implement `add_message` function for persistence in chat_service.py
- [x] T030 Implement `process_chat_message` orchestration function in chat_service.py
- [x] T031 Create chat router in backend/src/api/chat.py
- [x] T032 Implement POST /api/v1/chat endpoint with request/response models per contracts/chat-api.yaml
- [x] T033 Implement GET /api/v1/chat/history endpoint with pagination per contracts/chat-api.yaml
- [x] T034 Register chat router in backend/src/main.py

**Acceptance Criteria**:
- POST /chat accepts `{message: string}`, returns `{message, conversation_id, created_at}`
- GET /chat/history returns `{messages: [], total, has_more}` with pagination
- Both endpoints require JWT authentication (use existing `get_current_user` dependency)
- User isolation enforced (users only see their own messages)

**Checkpoint**: ✅ BACKEND COMPLETE - Test with curl before frontend

---

## Phase 6: US6 - Chat Widget Access Control (Login Gate) [P1]

**Goal**: Unauthenticated users see login prompt instead of chat

**Independent Test**: Visit app while logged out, click chat button, verify login message appears

**Estimated Time**: 20-25 min

- [x] T035 [US6] Create LoginGate component in frontend/src/components/chat/LoginGate.tsx
- [x] T036 [US6] Style LoginGate with friendly message and login/register links per spec
- [x] T037 [US6] Add animation (fade-in) to LoginGate using Framer Motion

**Acceptance Criteria**:
- Message: "Please login to use AI Chatbot. If you don't have an account, create one."
- Links to /login and /register
- Professional styling matching existing app theme

---

## Phase 7: US7 - Conversation Persistence & Chat UI Foundation [P2]

**Goal**: Chat history persists across sessions; core chat UI components

**Independent Test**: Have conversation, refresh page, verify messages still visible

**Estimated Time**: 35-45 min

- [x] T038 [US7] Create chat API client in frontend/src/lib/chat-api.ts
- [x] T039 [US7] Implement `sendMessage` function in chat-api.ts
- [x] T040 [US7] Implement `getHistory` function with pagination in chat-api.ts
- [x] T041 [US7] Create ChatBubble component in frontend/src/components/chat/ChatBubble.tsx
- [x] T042 [US7] Style ChatBubble with user/assistant differentiation and timestamps
- [x] T043 [US7] Add fade-in animation to ChatBubble
- [x] T044 [US7] Create ChatMessages component in frontend/src/components/chat/ChatMessages.tsx
- [x] T045 [US7] Implement auto-scroll to bottom on new messages in ChatMessages
- [x] T046 [US7] Create TypingIndicator component in frontend/src/components/chat/TypingIndicator.tsx
- [x] T047 [US7] Style TypingIndicator with animated bouncing dots

**Acceptance Criteria**:
- Messages display with correct role styling (user right-aligned, assistant left-aligned)
- Timestamps formatted as "2:45 PM"
- Auto-scroll works when new messages arrive
- Typing indicator shows 3 animated dots

---

## Phase 8: Chat UI Container & Integration

**Goal**: Complete chat widget with window, button, and input

**Estimated Time**: 30-35 min

- [x] T048 Create ChatInput component in frontend/src/components/chat/ChatInput.tsx
- [x] T049 Implement send on Enter key and button click in ChatInput
- [x] T050 Disable ChatInput while waiting for AI response
- [x] T051 Create ChatWindow component in frontend/src/components/chat/ChatWindow.tsx
- [x] T052 Add header with title and close button to ChatWindow
- [x] T053 Compose ChatMessages, TypingIndicator, ChatInput in ChatWindow
- [x] T054 Create ChatButton component in frontend/src/components/chat/ChatButton.tsx
- [x] T055 Style ChatButton as floating action button (bottom-right, 56px, rounded)
- [x] T056 Add hover animation to ChatButton
- [x] T057 Create ChatWidget container in frontend/src/components/chat/ChatWidget.tsx
- [x] T058 Implement open/close state management in ChatWidget
- [x] T059 Conditionally render LoginGate (unauthenticated) or ChatWindow (authenticated) in ChatWidget
- [x] T060 Add slide-up animation for ChatWindow open/close

**Acceptance Criteria**:
- Chat button visible in bottom-right corner (fixed position)
- Clicking button opens/closes chat window
- Window has header, message area, input field
- Authentication state determines which component renders

---

## Phase 9: US1 & US2 - Add & List Tasks via Chat [P1]

**Goal**: Core chat functionality - add and list tasks via natural language

**Independent Test**: Send "Add task test" → verify task created; Send "Show my tasks" → verify list appears

**Estimated Time**: 20-25 min

- [x] T061 [US1] [US2] Add ChatWidget to frontend/src/app/layout.tsx (inside AuthProvider)
- [x] T062 [US1] [US2] Wire up sendMessage to POST /api/v1/chat in ChatWidget
- [x] T063 [US1] [US2] Load conversation history on ChatWidget mount via GET /api/v1/chat/history
- [x] T064 [US1] [US2] Handle loading and error states in ChatWidget
- [x] T065 [US1] Test "Add task buy groceries" creates task and confirms
- [x] T066 [US2] Test "Show my tasks" returns numbered list of tasks
- [x] T067 [US1] [US2] Test Roman Urdu: "mujhe task add karna hai test" works

**Acceptance Criteria**:
- "Add task X" creates task, AI confirms in same language
- "Show my tasks" lists all tasks with position numbers
- Roman Urdu commands work with language mirroring
- Empty task list shows friendly message

**Checkpoint**: ✅ MVP COMPLETE (US1 + US2) - Core chat functionality working

---

## Phase 10: US3 & US4 - Complete & Delete Tasks via Chat [P2]

**Goal**: Mark tasks complete and delete with confirmation

**Independent Test**: Send "Complete task 1" → verify status changed; Send "Delete task 2" → verify confirmation flow

**Estimated Time**: 15-20 min

- [x] T068 [US3] Test "Complete task 1" marks first task as done
- [x] T069 [US3] Test "task 2 ho gaya" (Roman Urdu) marks second task complete
- [x] T070 [US3] Test completing nonexistent task shows error with task list
- [x] T071 [US4] Test "Delete task 1" prompts for confirmation
- [x] T072 [US4] Test confirming "Yes" deletes task
- [x] T073 [US4] Test confirming "No" cancels deletion

**Acceptance Criteria**:
- Complete uses position number (1-indexed)
- Delete requires explicit confirmation
- Error messages include current task list for reference

---

## Phase 11: US5 - Update Task via Chat [P3]

**Goal**: Update task title or description via conversation

**Independent Test**: Send "Update task 1 to new title" → verify title changed

**Estimated Time**: 10-15 min

- [x] T074 [US5] Test "Update task 1 to buy organic groceries" changes title
- [x] T075 [US5] Test "Change description of task 2 to important" updates description
- [x] T076 [US5] Test ambiguous update request triggers clarification

**Acceptance Criteria**:
- Title and description updates work independently
- Ambiguous requests prompt for clarification

---

## Phase 12: Polish & Cross-Cutting Concerns

**Purpose**: Error handling, edge cases, UI refinements

**Estimated Time**: 25-30 min

- [x] T077 [P] Add 500 character limit validation to ChatInput with warning
- [x] T078 [P] Implement retry with exponential backoff for OpenRouter API calls
- [x] T079 [P] Add "Load more" button for conversation history pagination
- [x] T080 [P] Ensure responsive design: full-width on mobile, floating on desktop
- [x] T081 [P] Verify dark mode support for all chat components
- [x] T082 Add keyboard accessibility (Tab navigation, Escape to close)
- [x] T083 Test AI service unavailable error message displays correctly
- [x] T084 Test empty message handling (ignore or prompt)
- [x] T085 Test rapid messages processed sequentially with typing indicator

**Acceptance Criteria**:
- Long messages truncated with warning
- Network errors show friendly message
- Responsive breakpoints work correctly
- Dark mode colors correct

---

## Phase 13: Final QA Validation

**Purpose**: Validate against all success criteria from spec.md

**Estimated Time**: 20-25 min

- [x] T086 SC-001: Verify all 5 todo operations complete in under 10 seconds
- [x] T087 SC-002: Test common phrases for 90%+ accuracy
- [x] T088 SC-003: Verify chat widget opens within 1 second
- [x] T089 SC-004: Verify messages persist after page refresh
- [x] T090 SC-005: Verify login gate shows 100% for unauthenticated users
- [x] T091 SC-006: Verify error messages provide actionable guidance
- [x] T092 SC-007: Verify AI responds within 5 seconds (normal conditions)
- [x] T093 SC-008: Test English, Urdu, and Roman Urdu commands
- [x] T094 Run quickstart.md validation checklist
- [x] T095 Update backend/CLAUDE.md with Phase 3 chat endpoint documentation
- [x] T096 Update frontend/CLAUDE.md with chat component documentation

**Checkpoint**: ✅ FEATURE COMPLETE - Ready for final review

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (DB Models) ──────────────────────────────────┐
    ↓                                                 │
Phase 3 (MCP Tools) ◄─── CHECKPOINT: Human Review     │
    ↓                                                 │
Phase 4 (AI Agent) ◄──── CHECKPOINT: Human Review     │
    ↓                                                 │
Phase 5 (Chat Service/API) ◄── CHECKPOINT: Test curl  │
    ↓                                                 │
┌───┴───┐                                             │
↓       ↓                                             │
Phase 6 Phase 7 (can run in parallel)                 │
(Login) (Persistence/UI)                              │
└───┬───┘                                             │
    ↓                                                 │
Phase 8 (UI Container)                                │
    ↓                                                 │
Phase 9 (US1+US2) ◄───── CHECKPOINT: MVP Complete     │
    ↓                                                 │
Phase 10 (US3+US4)                                    │
    ↓                                                 │
Phase 11 (US5)                                        │
    ↓                                                 │
Phase 12 (Polish)                                     │
    ↓                                                 │
Phase 13 (QA) ◄───────── CHECKPOINT: Feature Complete │
```

### Parallel Execution Opportunities

**Within Phase 2**: T005 and T006 (models) can run in parallel
**Within Phase 3**: T012-T016 (tool functions) can all run in parallel
**Within Phase 6-7**: LoginGate and Chat UI components can run in parallel
**Within Phase 12**: All polish tasks can run in parallel

### User Story Independence

| Story | Dependencies | Can Start After |
|-------|--------------|-----------------|
| US6 (Login Gate) | Phase 5 complete | Phase 5 |
| US7 (Persistence) | Phase 5 complete | Phase 5 |
| US1+US2 (Add/List) | Phase 8 complete | Phase 8 |
| US3+US4 (Complete/Delete) | Phase 9 complete | Phase 9 |
| US5 (Update) | Phase 10 complete | Phase 10 |

---

## Implementation Strategy

### MVP First Approach

**MVP Scope**: Phases 1-9 (US1 + US2 + US6 + US7)
- User can add tasks via chat
- User can list tasks via chat
- Login gate protects unauthenticated users
- Conversation persists across sessions

**Post-MVP**: Phases 10-13 (US3, US4, US5, Polish, QA)
- Complete, delete, update operations
- Edge cases and error handling
- Final validation

### Checkpoints Summary

| After | Checkpoint | Action |
|-------|------------|--------|
| Phase 3 | MCP Tools Complete | Human review tool functions |
| Phase 4 | AI Agent Complete | Human review prompt & tool calling |
| Phase 5 | Backend Complete | Test endpoints with curl |
| Phase 9 | MVP Complete | Demo add/list functionality |
| Phase 13 | Feature Complete | Final QA review |

---

## Summary

**Total Tasks**: 96
**Tasks per Phase**:
- Setup: 4
- DB Models: 6
- MCP Tools: 8
- AI Agent: 7
- Chat Service: 9
- US6 (Login Gate): 3
- US7 (Persistence/UI): 10
- UI Container: 13
- US1+US2 (Add/List): 7
- US3+US4 (Complete/Delete): 6
- US5 (Update): 3
- Polish: 9
- QA: 11

**Estimated Total Time**: ~5-6 hours

**Parallel Opportunities**: 15+ tasks can run in parallel with others

**MVP Tasks**: T001-T067 (67 tasks for core functionality)
