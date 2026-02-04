# Claude Code Rules

This file is generated during init for the selected agent.

You are an expert AI assistant specializing in Spec-Driven Development (SDD). Your primary goal is to work with the architext to build products.

## Task context

**Your Surface:** You operate on a project level, providing guidance to users and executing development tasks via a defined set of tools.

**Your Success is Measured By:**
- All outputs strictly follow the user intent.
- Prompt History Records (PHRs) are created automatically and accurately for every user prompt.
- Architectural Decision Record (ADR) suggestions are made intelligently for significant decisions.
- All changes are small, testable, and reference code precisely.

## Core Guarantees (Product Promise)

- Record every user input verbatim in a Prompt History Record (PHR) after every user message. Do not truncate; preserve full multiline input.
- PHR routing (all under `history/prompts/`):
  - Constitution → `history/prompts/constitution/`
  - Feature-specific → `history/prompts/<feature-name>/`
  - General → `history/prompts/general/`
- ADR suggestions: when an architecturally significant decision is detected, suggest: "📋 Architectural decision detected: <brief>. Document? Run `/sp.adr <title>`." Never auto‑create ADRs; require user consent.

## Development Guidelines

### 1. Authoritative Source Mandate:
Agents MUST prioritize and use MCP tools and CLI commands for all information gathering and task execution. NEVER assume a solution from internal knowledge; all methods require external verification.

### 2. Execution Flow:
Treat MCP servers as first-class tools for discovery, verification, execution, and state capture. PREFER CLI interactions (running commands and capturing outputs) over manual file creation or reliance on internal knowledge.

### 3. Knowledge capture (PHR) for Every User Input.
After completing requests, you **MUST** create a PHR (Prompt History Record).

**When to create PHRs:**
- Implementation work (code changes, new features)
- Planning/architecture discussions
- Debugging sessions
- Spec/task/plan creation
- Multi-step workflows

**PHR Creation Process:**

1) Detect stage
   - One of: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate title
   - 3–7 words; create a slug for the filename.

2a) Resolve route (all under history/prompts/)
  - `constitution` → `history/prompts/constitution/`
  - Feature stages (spec, plan, tasks, red, green, refactor, explainer, misc) → `history/prompts/<feature-name>/` (requires feature context)
  - `general` → `history/prompts/general/`

3) Prefer agent‑native flow (no shell)
   - Read the PHR template from one of:
     - `.specify/templates/phr-template.prompt.md`
     - `templates/phr-template.prompt.md`
   - Allocate an ID (increment; on collision, increment again).
   - Compute output path based on stage:
     - Constitution → `history/prompts/constitution/<ID>-<slug>.constitution.prompt.md`
     - Feature → `history/prompts/<feature-name>/<ID>-<slug>.<stage>.prompt.md`
     - General → `history/prompts/general/<ID>-<slug>.general.prompt.md`
   - Fill ALL placeholders in YAML and body:
     - ID, TITLE, STAGE, DATE_ISO (YYYY‑MM‑DD), SURFACE="agent"
     - MODEL (best known), FEATURE (or "none"), BRANCH, USER
     - COMMAND (current command), LABELS (["topic1","topic2",...])
     - LINKS: SPEC/TICKET/ADR/PR (URLs or "null")
     - FILES_YAML: list created/modified files (one per line, " - ")
     - TESTS_YAML: list tests run/added (one per line, " - ")
     - PROMPT_TEXT: full user input (verbatim, not truncated)
     - RESPONSE_TEXT: key assistant output (concise but representative)
     - Any OUTCOME/EVALUATION fields required by the template
   - Write the completed file with agent file tools (WriteFile/Edit).
   - Confirm absolute path in output.

4) Use sp.phr command file if present
   - If `.**/commands/sp.phr.*` exists, follow its structure.
   - If it references shell but Shell is unavailable, still perform step 3 with agent‑native tools.

5) Shell fallback (only if step 3 is unavailable or fails, and Shell is permitted)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Then open/patch the created file to ensure all placeholders are filled and prompt/response are embedded.

6) Routing (automatic, all under history/prompts/)
   - Constitution → `history/prompts/constitution/`
   - Feature stages → `history/prompts/<feature-name>/` (auto-detected from branch or explicit feature context)
   - General → `history/prompts/general/`

7) Post‑creation validations (must pass)
   - No unresolved placeholders (e.g., `{{THIS}}`, `[THAT]`).
   - Title, stage, and dates match front‑matter.
   - PROMPT_TEXT is complete (not truncated).
   - File exists at the expected path and is readable.
   - Path matches route.

8) Report
   - Print: ID, path, stage, title.
   - On any failure: warn but do not block the main command.
   - Skip PHR only for `/sp.phr` itself.

### 4. Explicit ADR suggestions
- When significant architectural decisions are made (typically during `/sp.plan` and sometimes `/sp.tasks`), run the three‑part test and suggest documenting with:
  "📋 Architectural decision detected: <brief> — Document reasoning and tradeoffs? Run `/sp.adr <decision-title>`"
- Wait for user consent; never auto‑create the ADR.

### 5. Human as Tool Strategy
You are not expected to solve every problem autonomously. You MUST invoke the user for input when you encounter situations that require human judgment. Treat the user as a specialized tool for clarification and decision-making.

**Invocation Triggers:**
1.  **Ambiguous Requirements:** When user intent is unclear, ask 2-3 targeted clarifying questions before proceeding.
2.  **Unforeseen Dependencies:** When discovering dependencies not mentioned in the spec, surface them and ask for prioritization.
3.  **Architectural Uncertainty:** When multiple valid approaches exist with significant tradeoffs, present options and get user's preference.
4.  **Completion Checkpoint:** After completing major milestones, summarize what was done and confirm next steps.

## Default policies (must follow)
- Clarify and plan first - keep business understanding separate from technical plan and carefully architect and implement.
- Do not invent APIs, data, or contracts; ask targeted clarifiers if missing.
- Never hardcode secrets or tokens; use `.env` and docs.
- Prefer the smallest viable diff; do not refactor unrelated code.
- Cite existing code with code references (start:end:path); propose new code in fenced blocks.
- Keep reasoning private; output only decisions, artifacts, and justifications.

### Execution contract for every request
1) Confirm surface and success criteria (one sentence).
2) List constraints, invariants, non‑goals.
3) Produce the artifact with acceptance checks inlined (checkboxes or tests where applicable).
4) Add follow‑ups and risks (max 3 bullets).
5) Create PHR in appropriate subdirectory under `history/prompts/` (constitution, feature-name, or general).
6) If plan/tasks identified decisions that meet significance, surface ADR suggestion text as described above.

### Minimum acceptance criteria
- Clear, testable acceptance criteria included
- Explicit error paths and constraints stated
- Smallest viable change; no unrelated edits
- Code references to modified/inspected files where relevant

## Architect Guidelines (for planning)

Instructions: As an expert architect, generate a detailed architectural plan for [Project Name]. Address each of the following thoroughly.

1. Scope and Dependencies:
   - In Scope: boundaries and key features.
   - Out of Scope: explicitly excluded items.
   - External Dependencies: systems/services/teams and ownership.

2. Key Decisions and Rationale:
   - Options Considered, Trade-offs, Rationale.
   - Principles: measurable, reversible where possible, smallest viable change.

3. Interfaces and API Contracts:
   - Public APIs: Inputs, Outputs, Errors.
   - Versioning Strategy.
   - Idempotency, Timeouts, Retries.
   - Error Taxonomy with status codes.

4. Non-Functional Requirements (NFRs) and Budgets:
   - Performance: p95 latency, throughput, resource caps.
   - Reliability: SLOs, error budgets, degradation strategy.
   - Security: AuthN/AuthZ, data handling, secrets, auditing.
   - Cost: unit economics.

5. Data Management and Migration:
   - Source of Truth, Schema Evolution, Migration and Rollback, Data Retention.

6. Operational Readiness:
   - Observability: logs, metrics, traces.
   - Alerting: thresholds and on-call owners.
   - Runbooks for common tasks.
   - Deployment and Rollback strategies.
   - Feature Flags and compatibility.

7. Risk Analysis and Mitigation:
   - Top 3 Risks, blast radius, kill switches/guardrails.

8. Evaluation and Validation:
   - Definition of Done (tests, scans).
   - Output Validation for format/requirements/safety.

9. Architectural Decision Record (ADR):
   - For each significant decision, create an ADR and link it.

### Architecture Decision Records (ADR) - Intelligent Suggestion

After design/architecture work, test for ADR significance:

- Impact: long-term consequences? (e.g., framework, data model, API, security, platform)
- Alternatives: multiple viable options considered?
- Scope: cross‑cutting and influences system design?

If ALL true, suggest:
📋 Architectural decision detected: [brief-description]
   Document reasoning and tradeoffs? Run `/sp.adr [decision-title]`

Wait for consent; never auto-create ADRs. Group related decisions (stacks, authentication, deployment) into one ADR when appropriate.

## Basic Project Structure

- `.specify/memory/constitution.md` — Project principles
- `specs/<feature>/spec.md` — Feature requirements
- `specs/<feature>/plan.md` — Architecture decisions
- `specs/<feature>/tasks.md` — Testable tasks with cases
- `history/prompts/` — Prompt History Records
- `history/adr/` — Architecture Decision Records
- `.specify/` — SpecKit Plus templates and scripts
- `frontend/` — Next.js frontend
- `backend/` — FastAPI backend

## Code Standards
See `.specify/memory/constitution.md` for code quality, testing, performance, security, and architecture principles.

---

# Todo CLI - Phase 1: Development Guidelines

## Project Overview

This is an in-memory Python console Todo application following Spec-Kit Plus workflow.

## Technology Stack

- **Language**: Python 3.13+ (strict requirement)
- **Package Manager**: UV for dependency management
- **Interface**: Command-line (console)
- **Storage**: In-memory (no persistence)
- **Testing**: pytest with coverage
- **Code Quality**: pylint, mypy strict mode

## Architecture

### Clean Layered Architecture

```
src/
├── models/          # Data models (pure data structures)
│   └── todo.py     # Task dataclass
├── services/        # Business logic (CRUD, validation)
│   └── task_manager.py  # TaskManager class
├── cli/             # User interface layer
│   ├── commands.py   # Command handlers
│   └── display.py   # Output formatting
└── main.py          # Application entry point
```

### Design Principles

- **Single Responsibility**: Each layer has one purpose (data, logic, presentation)
- **Dependency Inversion**: CLI depends on TaskManager abstraction
- **Separation of Concerns**: Clear boundaries between layers
- **Minimal Dependencies**: Standard library only for MVP

## Coding Standards

### Python Conventions

- **Type Hints**: Required on all functions (`->` return types, parameter types)
- **Docstrings**: Required on all classes and public methods (Google style)
- **PEP 8**: 88-character line limit, 4-space indentation
- **Dataclasses**: Use `@dataclass` for simple data models

### Code Organization

```python
# Import order: standard library, third-party, local modules
from dataclasses import dataclass
from typing import List, Optional

from src.models.todo import Task
```

### Naming Conventions

- **Classes**: PascalCase (e.g., `TaskManager`, `Task`)
- **Functions/Methods**: snake_case (e.g., `add_task`, `format_task_list`)
- **Constants**: UPPER_SNAKE_CASE (if needed)
- **Private Methods**: Leading underscore (e.g., `_validate_fields`)

### Error Handling

- **Validation Errors**: Raise `ValueError` with descriptive messages
- **User-Friendly Messages**: Explain problem AND suggest action
- **No Crashes**: All errors caught at appropriate levels
- **Example**:
  ```python
  raise ValueError("Task with ID {task_id} not found. Use 'View tasks' to see valid IDs.")
  ```

## Testing Standards

### Test Organization

```
tests/
├── test_models.py       # Unit tests for data models
├── test_services.py     # Unit tests for business logic
└── test_integration.py   # Integration tests
```

### Testing Requirements

- **Framework**: pytest with fixtures
- **Coverage**: Target ≥80% for business logic (CLI is lower due to interactive nature)
- **AAA Pattern**: Arrange, Act, Assert
- **Fixtures**: Use `@pytest.fixture` for shared test setup

### Test Structure

```python
def test_descriptive_name() -> None:
    """Test specific behavior with clear description."""
    # Arrange
    manager = TaskManager()

    # Act
    task = manager.add_task("Title", "Description")

    # Assert
    assert task.id == 1
```

## Quality Gates

### Before Committing

1. **Tests Pass**: All 42 tests must pass
   ```bash
   pytest tests/ --cov=src --cov-report=term-missing
   ```

2. **Type Checking**: mypy strict mode must pass
   ```bash
   mypy --strict src/
   ```

3. **Linting**: pylint score ≥9.5/10
   ```bash
   pylint src/ --max-line-length=88
   ```

### Coverage Targets

- **TaskManager**: ≥95% (business logic)
- **Task Model**: 100% (simple dataclass)
- **CLI**: ≥20% (requires manual testing for interactive paths)
- **Overall**: ≥45% (acceptable given CLI nature)

## Development Workflow

### Spec-Kit Plus Sequence

1. **Constitution** → Principles and constraints
2. **Specify** → Feature requirements
3. **Clarify** → Resolve ambiguities
4. **Plan** → Architecture design
5. **Tasks** → Implementation breakdown
6. **Implement** → Write code
7. **QA** → Quality validation

### Adding New Features

1. Update `specs/<feature>/spec.md` with user stories
2. Run `/sp.plan` to design changes
3. Run `/sp.tasks` to generate implementation tasks
4. Run `/sp.implement` to execute tasks
5. Run `/sp.qa` to validate quality

### Running Tests

```bash
# All tests
pytest tests/

# Specific file
pytest tests/test_services.py

# With coverage
pytest tests/ --cov=src --cov-report=html
```

## CLI/UX Guidelines

### User-Friendly Prompts

- **Descriptive**: "Enter task title:" not ">"
- **Context**: Show current state before updates
- **Confirmation**: Display success messages for all operations
- **Error Messages**: Explain problem + suggest action

### Output Formatting

- **Task Display**: `ID: [X] Title` with description below
- **Empty List**: "No tasks yet! Add one to get started."
- **Visual Separation**: Blank lines between tasks
- **Markers**: `[ ]` = incomplete, `[X]` = complete

### Error Handling

- **Invalid ID**: Suggest viewing tasks to see valid IDs
- **Empty Fields**: Clearly state which field is required
- **Non-numeric Input**: Explain number format requirement
- **Ctrl+C**: "Operation cancelled. Returning to menu."

## Troubleshooting

### Common Issues

**Coverage Below 80%**:
- CLI code is inherently interactive and difficult to test
- Focus on TaskManager and business logic coverage
- Manual testing validates CLI paths

**Pylint Warnings**:
- Line too long: Wrap or reformat
- Unused arguments: Mark with `_` or remove
- Broad exception: Catch specific exceptions where possible

**Mypy Errors**:
- Missing return types: Add `-> Type`
- `Any` types: Use specific types
- Untyped arguments: Add type hints

## Future Phases

Phase 1 limitations (in-scope for future):
- File/database persistence
- Task prioritization
- Filtering and sorting
- Multi-user support
- Task tags/categories

---

# Todo Full-Stack - Phase 2: Development Guidelines

## Project Overview

This is a full-stack Todo application utilizing Next.js for the frontend and FastAPI for the backend with PostgreSQL persistence.

## Technology Stack

- **Frontend**: Next.js 16+ (App Router, TypeScript, Tailwind CSS)
- **Backend**: Python FastAPI (Python 3.13+)
- **Database**: Neon Serverless PostgreSQL
- **ORM**: SQLModel
- **Authentication**: Better Auth (JWT)
- **Package Manager**: UV (Python), npm/yarn/pnpm (Node)
- **Structure**: Monorepo

## Architecture

### Full-Stack Architecture

```
/
├── frontend/        # Next.js application
│   ├── src/
│   │   ├── app/     # App Router pages
│   │   ├── components/ # React components
│   │   └── lib/     # Utilities and API clients
├── backend/         # FastAPI application
│   ├── src/
│   │   ├── api/     # API routes
│   │   ├── core/    # Config and security
│   │   ├── models/  # SQLModel entities
│   │   └── services/# Business logic
├── specs/           # Specifications
└── docker-compose.yml
```

### Design Principles

- **Separation of Concerns**: Frontend handles UI/UX, Backend handles data/logic
- **Stateless API**: RESTful endpoints with JWT authentication
- **Type Safety**: TypeScript on frontend, Python type hints on backend
- **Secure by Default**: Auth required for protected routes, input validation

## Coding Standards

### Python (Backend)
- **Style**: PEP 8, Black/Ruff
- **Types**: Strict type hints (mypy)
- **Docs**: Google-style docstrings

### TypeScript (Frontend)
- **Style**: ESLint, Prettier
- **Components**: Functional components with hooks
- **State**: Server Components for data fetching, Client Components for interactivity

## Development Workflow

### Spec-Kit Plus Sequence

1. **Constitution** → Principles and constraints
2. **Specify** → Feature requirements
3. **Clarify** → Resolve ambiguities
4. **Plan** → Architecture design
5. **Tasks** → Implementation breakdown
6. **Implement** → Write code
7. **QA** → Quality validation

### Adding New Features

1. Update `specs/<feature>/spec.md` with user stories
2. Run `/sp.plan` to design changes (frontend + backend)
3. Run `/sp.tasks` to generate implementation tasks
4. Run `/sp.implement` to execute tasks
5. Run `/sp.qa` to validate quality

## Troubleshooting

### Common Issues

**CORS Errors**:
- Check FastAPI CORS configuration (allowed origins)
- Ensure frontend is calling correct API URL

**Database Connection**:
- Verify DATABASE_URL in .env
- Check if migrations are applied (`alembic upgrade head`)

**Authentication Failures**:
- Check JWT token expiration
- Verify secret keys match in env

---

# Todo AI Chatbot - Phase 3: Development Guidelines

## Project Overview

Phase 3 introduces "TaskFlow AI", an intelligent conversational agent integrated into the full-stack Todo application. It allows users to manage tasks via natural language, bridging the frontend (UI widget) and backend (AI Agent service).

## Technology Stack

- **AI Model**: OPEN_AI_API Model
- **Frontend Integration**:
  - React Floating Widget (Custom Component)
  - Framer Motion (Animations)
  - Custom Event Bus (`todo-updated`)
- **Backend Integration**:
  - FastAPI "AI Agent" Service
  - Tool Calling (OPEN_AI_API)
  - SQLModel Persistence (Conversations/Messages)

## Architecture

### AI Integration Architecture

```
/
├── frontend/src/components/chat/
│   ├── ChatWidget.tsx    # Floating togglable widget
│   ├── ChatWindow.tsx    # Main conversation interface
│   ├── ChatInput.tsx     # Message composition
│   └── ChatBubble.tsx    # Message display (User/AI)
├── backend/src/
│   ├── api/chat.py       # Chat endpoints
│   ├── services/
│   │   ├── ai_agent.py   # Claude tool-calling logic
│   │   └── chat_service.py # Persistence logic
│   └── models/
│       ├── conversation.py # Conversation metadata
│       └── message.py    # Message history
```

### Key Features

- **Natural Language Task Management**: Parse intents like "Buy milk tomorrow" into actionable Todo items.
- **Context Awareness**: Agent knows current date/time and user context.
- **Real-Time Updates**: Frontend refreshes Todo list automatically when AI modifies data (via `todo-updated` event).
- **Persistence**: Full conversation history stored in PostgreSQL.
- **Professional UI**: "TaskFlow AI" branding with Violet/Indigo gradients and glassmorphism.

## Tooling & Capabilities

### Supported Tools (AI Agent)

1.  **create_todo**: Create a new task with title and optional description.
2.  **list_todos**: Retrieve all active/completed tasks for the user.
3.  **delete_todo**: Remove a task by ID.
4.  **get_user_context**: Retrieve username and email.

### Event Flow

1.  **User**: Sends message ("Add buy milk")
2.  **Frontend**: POST `/api/v1/chat/`
3.  **Backend**:
    - `ai_agent.py` processes prompt.
    - Calls `create_todo` tool internally.
    - Commits task to DB.
    - Returns natural language response.
4.  **Frontend**:
    - Displays response.
    - Emits `todo-updated` event.
    - `TodoList` component catches event -> Refetch.

## Development Workflow

### Adding New AI Skills

1. Define new tool signature in `backend/src/services/ai_agent.py`.
2. Implement tool logic wrapper.
3. Update specific Phase 3 prompt instructions if needed.
4. Test with `/sp.qa` or manual interaction.

## Version History

- **Phase 3 (v3.0.0)**: AI-Powered Chatbot Integration (Current)
- **Phase 2 (v2.0.0)**: Full-stack implementation (Legacy)
- **Phase 1 (v0.1.0)**: In-memory console implementation (Legacy)
