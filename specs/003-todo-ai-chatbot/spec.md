# Feature Specification: Todo AI Chatbot

**Feature Branch**: `003-todo-ai-chatbot`
**Created**: 2026-01-27
**Status**: Draft
**Input**: Phase III Todo AI Chatbot - AI-powered natural language interface for todo management integrated into Phase II full-stack web app

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add Task via Natural Language (Priority: P1)

A logged-in user wants to quickly add a new task by typing a natural language command in the chat widget instead of using the traditional form. They type something like "Add task buy groceries" or "mujhe ek task add karna hai: meeting at 3pm" and the AI creates the task.

**Why this priority**: This is the most fundamental chatbot capability - creating tasks via conversation. Without this, the chatbot has no core value.

**Independent Test**: Can be fully tested by sending a chat message requesting task creation and verifying the task appears in the user's todo list.

**Acceptance Scenarios**:

1. **Given** user is logged in and chat widget is open, **When** user types "Add task buy groceries", **Then** system creates a task titled "buy groceries" and confirms "Task 'buy groceries' has been added."
2. **Given** user is logged in, **When** user types "mujhe task add karna hai meeting with boss", **Then** system creates the task and responds in the same language context.
3. **Given** user is logged in, **When** user types "Add task" without a title, **Then** system asks "What would you like to name this task?"
4. **Given** user is logged in, **When** user types "Add task with description: Buy milk and eggs from store", **Then** system creates task with title and optional description extracted.

---

### User Story 2 - List Tasks via Conversation (Priority: P1)

A user wants to see their tasks by asking the chatbot. They can say "Show my tasks", "List pending tasks", "meri tasks dikhao", or "What do I need to do today?" and receive a formatted list.

**Why this priority**: Viewing tasks is equally essential as adding them - users need to know what they have before managing it.

**Independent Test**: Can be tested by having existing tasks and sending a list request, then verifying the response contains the correct tasks.

**Acceptance Scenarios**:

1. **Given** user has 3 tasks (2 incomplete, 1 complete), **When** user types "Show my tasks", **Then** system displays all tasks with their status indicators.
2. **Given** user has tasks, **When** user types "Show pending tasks", **Then** system displays only incomplete tasks.
3. **Given** user has no tasks, **When** user types "List tasks", **Then** system responds "You have no tasks yet. Would you like to add one?"
4. **Given** user is logged in, **When** user types "meri tasks dikhao", **Then** system responds with task list in appropriate language context.

---

### User Story 3 - Complete Task via Chat (Priority: P2)

A user wants to mark a task as complete by telling the chatbot. They can say "Mark task 1 done", "Complete buy groceries", or "task 2 ho gaya" to update task status.

**Why this priority**: Completing tasks is a core operation but slightly less frequent than adding/viewing.

**Independent Test**: Can be tested by having an incomplete task and sending a completion command, then verifying task status changed.

**Acceptance Scenarios**:

1. **Given** user has incomplete task "buy groceries", **When** user types "Complete buy groceries", **Then** system marks task complete and confirms "Task 'buy groceries' marked as complete!"
2. **Given** user has multiple tasks, **When** user types "Mark task 2 done", **Then** system completes the task at position 2 and confirms.
3. **Given** user types "Complete nonexistent task", **When** no matching task found, **Then** system responds "I couldn't find that task. Here are your current tasks:" and lists them.
4. **Given** task is already complete, **When** user tries to complete it again, **Then** system responds "Task 'X' is already complete."

---

### User Story 4 - Delete Task via Chat (Priority: P2)

A user wants to remove a task by chatting. They say "Delete task buy groceries", "Remove task 3", or "ye task hata do".

**Why this priority**: Delete is important but less frequent than add/list/complete operations.

**Independent Test**: Can be tested by having a task, sending delete command, and verifying task is removed from list.

**Acceptance Scenarios**:

1. **Given** user has task "buy groceries", **When** user types "Delete buy groceries", **Then** system asks "Are you sure you want to delete 'buy groceries'?"
2. **Given** confirmation prompt shown, **When** user confirms "Yes", **Then** system deletes task and confirms "Task 'buy groceries' has been deleted."
3. **Given** confirmation prompt shown, **When** user types "No" or "Cancel", **Then** system cancels deletion and confirms "Deletion cancelled."
4. **Given** user tries to delete nonexistent task, **When** no match found, **Then** system responds with helpful error and shows available tasks.

---

### User Story 5 - Update Task via Chat (Priority: P3)

A user wants to modify an existing task's title or description through conversation. They say "Update task 1 to buy organic groceries" or "Change description of task 2 to urgent meeting".

**Why this priority**: Updates are less common than other operations in typical todo workflows.

**Independent Test**: Can be tested by having a task, sending update command, and verifying the task details changed.

**Acceptance Scenarios**:

1. **Given** user has task "buy groceries", **When** user types "Update buy groceries to buy organic groceries", **Then** system updates title and confirms the change.
2. **Given** user has task at position 1, **When** user types "Change task 1 description to Remember to check prices", **Then** system updates description and confirms.
3. **Given** ambiguous update request, **When** multiple tasks match, **Then** system asks for clarification by showing matching tasks.

---

### User Story 6 - Chat Widget Access Control (Priority: P1)

An unauthenticated user sees the chat widget but cannot use it. They see a friendly message prompting them to log in or create an account.

**Why this priority**: Security and user isolation are critical - prevents unauthorized access to user data.

**Independent Test**: Can be tested by visiting the app while logged out and verifying the login gate message appears.

**Acceptance Scenarios**:

1. **Given** user is not logged in, **When** they click the chat widget, **Then** they see "Please login to use AI Chatbot. If you don't have an account, create one." with links to login/register.
2. **Given** user is logged in, **When** they open chat widget, **Then** they can send messages and see their conversation history.
3. **Given** user logs out while chat is open, **When** session expires, **Then** chat shows login prompt immediately.

---

### User Story 7 - Conversation Persistence (Priority: P2)

A user's chat history persists across sessions. When they return to the app, they can see their previous conversations with the AI assistant.

**Why this priority**: Persistence improves UX but core functionality works without it.

**Independent Test**: Can be tested by having a conversation, logging out/in, and verifying messages are preserved.

**Acceptance Scenarios**:

1. **Given** user had previous conversation, **When** they open chat widget, **Then** previous messages are loaded and displayed.
2. **Given** user sends new message, **When** message is sent, **Then** it is persisted to database immediately.
3. **Given** user has long conversation history, **When** opening chat, **Then** system loads recent messages with option to load more.

---

### Edge Cases

- What happens when the AI cannot understand the user's intent? → Ask for clarification with suggested commands.
- What happens when the AI service (OpenRouter) is unavailable? → Display friendly error "I'm having trouble connecting. Please try again in a moment."
- What happens when user sends empty message? → Ignore or prompt "Please type a message."
- What happens with very long messages? → Accept up to 500 characters, truncate with warning if exceeded.
- What happens when user sends rapid messages? → Process sequentially, show typing indicator.
- What happens when task title contains special characters? → Accept and sanitize appropriately.
- How are tasks identified by number? → Use display order position (1-indexed). When listing tasks, show position numbers explicitly (e.g., "1. Buy groceries"). User saying "task 2" refers to the second item in the displayed list.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a chat widget accessible from any page of the application.
- **FR-002**: System MUST display a login-required message to unauthenticated users attempting to use the chat.
- **FR-003**: System MUST interpret natural language commands in English, Urdu, and Roman Urdu, and MUST respond in the same language the user used (language mirroring).
- **FR-004**: System MUST support all 5 todo operations via chat: add, list, complete, delete, update.
- **FR-005**: System MUST confirm each action before execution for destructive operations (delete).
- **FR-006**: System MUST provide clear error messages with suggestions when commands cannot be understood.
- **FR-007**: System MUST maintain conversation context within a session for follow-up queries by sending the last 10 messages as context to the AI.
- **FR-008**: System MUST persist all conversations and messages to the database.
- **FR-009**: System MUST enforce user isolation - users can only access their own tasks via chat.
- **FR-010**: System MUST display a typing indicator while AI is processing.
- **FR-011**: System MUST show timestamps on messages.
- **FR-012**: System MUST provide concise responses (not verbose explanations).
- **FR-013**: System MUST gracefully handle AI service failures with user-friendly error messages.

### Key Entities

- **Conversation**: Represents a chat session belonging to a user.
  - Fields: `id` (UUID, PK), `user_id` (UUID, FK to User), `created_at` (timestamp), `updated_at` (timestamp)
- **Message**: A single message in a conversation.
  - Fields: `id` (UUID, PK), `conversation_id` (UUID, FK to Conversation), `role` (enum: 'user' | 'assistant'), `content` (text), `created_at` (timestamp)
- **Task** (existing): No schema changes required. Tasks created via chat are standard tasks with no special linkage.

### API Requirements

- **Endpoints**:
  - `POST /api/v1/chat` - Send a message and receive AI response
  - `GET /api/v1/chat/history` - Retrieve conversation history for current user
- **Authentication**: All chat endpoints require valid JWT session (existing auth system)
- **Request/Response**: JSON format with message content and metadata

### UI Requirements

- **Components**:
  - Floating chat button (bottom-right corner)
  - Chat window with header, message list, input field
  - Login gate component for unauthenticated users
  - Typing indicator (animated dots)
  - Message bubbles with timestamps
- **State**: Real-time message updates, loading states, error states
- **Responsive**: Full-width on mobile, floating panel on desktop
- **Animations**: Fade-in for new messages, smooth open/close transitions

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete any of the 5 todo operations via chat in under 10 seconds.
- **SC-002**: System correctly interprets natural language commands with 90%+ accuracy for common phrasings.
- **SC-003**: Chat widget opens and is ready for input within 1 second of clicking.
- **SC-004**: 100% of chat interactions are persisted and recoverable after page refresh.
- **SC-005**: Unauthenticated users see login prompt 100% of the time when attempting to use chat.
- **SC-006**: Error messages provide actionable guidance in 100% of failure cases.
- **SC-007**: System responds to user messages within 5 seconds under normal conditions.
- **SC-008**: Chat functions correctly in all 3 supported languages (English, Urdu, Roman Urdu).

## Assumptions

- OpenRouter API is available and configured via `OPENROUTER_API_KEY` environment variable.
- AI model is configurable via `OPENROUTER_MODEL` environment variable (default: free tier model such as `meta-llama/llama-3.1-8b-instruct:free` or similar available free model).
- Existing authentication system (Better Auth with JWT) is used without modification.
- Existing Task model and CRUD operations are reused via MCP tools.
- Users have modern browsers with JavaScript enabled.
- Chat history loads last 50 messages by default with pagination for older messages.
- Confirmation is required only for delete operations (not for add/update/complete).

## Out of Scope

- Voice input/output capabilities
- Multi-agent systems or agent orchestration
- External integrations beyond the existing todo system
- New authentication mechanisms
- Mobile native applications
- Offline functionality
- File attachments in chat
- Rich media responses (images, cards)

## Dependencies

- Phase II full-stack application (frontend and backend must be functional)
- OpenRouter API access for AI capabilities
- Neon PostgreSQL database for conversation/message persistence
- Existing user authentication and task management systems

## Clarifications

### Session 2026-01-27

- Q: How should the AI respond when the user sends messages in Urdu or Roman Urdu? → A: Mirror user's language (respond in same language as input)
- Q: What fields should the Conversation and Message database tables include? → A: Minimal schema - Conversation(id, user_id, created_at, updated_at); Message(id, conversation_id, role, content, created_at)
- Q: How should the system handle long conversation history when sending context to the AI? → A: Send last 10 messages as context (balanced context and cost)
- Q: Which OpenRouter model should be used for the AI chatbot? → A: Use free OpenRouter model, configurable via OPENROUTER_MODEL env var
- Q: When user references task by number, how to identify which task? → A: Display order position (1-indexed, matches UI list order)
