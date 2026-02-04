<!--
SYNC IMPACT REPORT
===================
Version Change: 2.0.0 → 3.0.0 (MAJOR: Evolve full-stack web to AI Chatbot with NL interface)

Modified Principles:
- "Clean Architecture and Responsive Web UX" → "Clean Architecture and Responsive Web UX with AI Integration"
- "Minimal but Complete MVP Functionality" → "Minimal but Complete MVP Functionality with AI"
- "User-Friendly and Error-Safe Web Interaction" → "User-Friendly, Error-Safe, Multilingual AI Interaction"

Added Sections:
- AI Integration requirements (OpenAI Agents SDK, MCP tools, OpenRouter)
- Multilingual support (English, Urdu, Roman Urdu)
- Chat UI specifications (floating bottom-right, login-gated)
- Conversation/message persistence in DB
- MCP Tools standards (exact params/returns, stateless)

Removed Sections:
- None (extends Phase II)

Templates Requiring Updates:
✅ .specify/templates/plan-template.md - Already supports full-stack; AI context can be added per-feature
✅ .specify/templates/spec-template.md - Already supports full-stack; AI user stories can be added per-feature
✅ .specify/templates/tasks-template.md - Already supports full-stack; AI tasks can be added per-feature
✅ .claude/commands/sp.phase3.SKILL.md - Created for Phase 3 UI enhancement
✅ .claude/agents/phase3-ai-agent.md - Created for Phase 3 AI development
⚠ CLAUDE.md - Needs update for Phase 3 patterns (manual follow-up)

Follow-up TODOs:
- Create specs/003-todo-ai-chatbot/ directory structure
- Update CLAUDE.md with Phase 3 development guidelines
-->

# The Evolution of Todo Constitution

## Core Principles

### I. Spec-Driven Development Only

All code MUST be generated exclusively through the Spec-Kit Plus workflow. Manual
coding is strictly prohibited. Development MUST follow the complete sequential
workflow: Constitution → Specify → Clarify → Plan → Tasks → Implement → QA.

Rationale: Ensures deterministic, reproducible output and maintains traceability
across all development activities.

### II. Deterministic and Reproducible Output

All development activities MUST produce deterministic and reproducible results. Code
generation, test execution, and documentation MUST be consistent across multiple
runs with identical inputs. No randomness or non-deterministic behavior in
critical paths. Conversation state MUST be persisted in the database only.

Rationale: Enables predictable development, reliable testing, and clear audit
trails for hackathon evaluation. Agent runs MUST be consistent with same inputs.

### III. Clean Architecture and Responsive Web UX with AI Integration

All code MUST follow clean architecture with clear separation of concerns:
models (data), services (business logic), API (backend endpoints), UI (frontend
components), and agent (AI integration). The web interface MUST be responsive and
user-friendly. The AI agent MUST be integrated in the backend with MCP tools for
task operations. The chat UI MUST be professional, animated, and positioned as a
floating bottom-right widget.

Rationale: Ensures maintainable, understandable codebase and excellent user
experience for both web-based and AI-powered interaction.

### IV. Minimal but Complete MVP Functionality with AI

Focus on minimal viable product (MVP) with complete, working features.
All 5 basic todo features (Add, Delete, Update, View, Mark Complete) MUST
be fully functional via natural language in English, Urdu, and Roman Urdu.
Avoid feature creep and unnecessary complexity.

Rationale: Delivers immediate value while establishing solid foundation for
natural language todo management.

### V. User-Friendly, Error-Safe, Multilingual AI Interaction

AI interaction MUST be user-friendly and error-safe. All inputs MUST be
validated with clear error messages that explain the problem AND suggest corrective
action. The application MUST NOT crash on invalid input. Actions MUST be confirmed
before execution. Graceful errors MUST include suggestions for resolution.
Multilingual support MUST be achieved via agent prompt engineering.

Rationale: Provides professional user experience and prevents frustration from cryptic
errors or unexpected crashes in natural language interactions.

### VI. Python/TS Code Quality Standards

All Python (backend) and TypeScript (frontend) source code MUST follow readable structure
with clear naming conventions. All classes, functions, and modules MUST include docstrings.
Complex logic MUST include inline comments for clarity. Code MUST follow PEP 8 (Python)
and ESLint/Prettier (JS/TS) style guidelines. Agent code MUST be modular with traceable
tool calls.

Rationale: Ensures maintainability, readability, and professional code quality
for hackathon evaluation.

## Key Standards

- **Traceability**: All tool calls and decisions MUST be referenced to spec.
- **Citation**: Use inline comments for AI decisions referencing specs or ADRs.
- **Source Types**: Use official OpenAI Agents SDK, MCP SDK, OpenRouter docs via Context7 if available.
- **Plagiarism**: 0% tolerance; all code generated via Claude Code.
- **Clarity**: Code and docs at Flesch-Kincaid grade 10-12 equivalent.
- **MCP Tools**: Exact params/returns as spec; stateless operations only.

## Technical Constraints

Technology Stack Requirements:
- **Frontend**: Next.js 16+ (App Router, TypeScript, Tailwind CSS, Shadcn UI)
- **Backend**: Python FastAPI, OpenAI Agents SDK (compatible with OpenRouter), MCP SDK
- **ORM**: SQLModel
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: Better Auth with JWT tokens for user isolation
- **Structure**: Monorepo with frontend/, backend/, specs/

Chat UI Requirements:
- **Position**: Floating bottom-right widget
- **Access**: Login-gated (show "Please login to use AI Chatbot. If no account, create one [links]")
- **Design**: Professional, animated, responsive (mobile/desktop), dark mode support
- **Components**: Timestamps, typing indicator, message fade-in animations

Development Constraints:
- **Code Generation**: All code MUST be generated exclusively by Claude Code via
  Spec-Kit Plus workflow - NO manual coding allowed
- **Separation of Concerns**: Clear separation required between models (data),
  services (business logic), API (endpoints), UI (components), and agent (AI)
- **Persistence**: Use Neon PostgreSQL for persistent storage; tasks, conversations,
  and messages owned by users via user_id
- **Authentication**: All endpoints require JWT token; user isolation enforced
  (users see/modify only their tasks); login required for chat
- **Chat Endpoint**: Add `/api/{user_id}/chat` endpoint for AI interactions
- **Environment**: Use .env for secrets (OPENROUTER_API_KEY, DATABASE_URL, etc.);
  NO hardcoding of secrets
- **Multilingual**: Agent prompt MUST handle English, Urdu, and Roman Urdu
- **Stateless Server**: All conversation state persisted in DB only
- **Documentation**: README.md, CLAUDE.md (root + frontend + backend), and docstrings
  MUST exist with usage and workflow notes
- **Research**: Use connected MCP/Context7 for latest docs/research

## Success Criteria

Phase 3 - Todo AI Chatbot MUST meet ALL criteria:

**Functional Requirements**:
- All 5 basic todo operations work via natural language (add, list, complete, delete, update)
- Operations provide confirmation messages before execution
- Error handling is graceful with helpful suggestions
- Conversation context maintained within sessions

**Structural Requirements**:
- MCP tools implemented with correct params/returns as spec
- Agent uses tools accurately for task operations
- Chat UI is responsive, animated, and professional
- Monorepo structure extended cleanly with AI components

**Quality Requirements**:
- Code follows style guidelines (PEP 8, ESLint/Prettier)
- All functions/classes have appropriate docstrings
- No crashes on invalid input or malformed NL queries
- Multilingual support for English, Urdu, and Roman Urdu
- Login gate displays proper message for unauthenticated users

**Evaluation Readiness**:
- Repository is review-ready for hackathon evaluation
- All spec documents complete (constitution, spec, plan, tasks)
- Implementation follows workflow without skipping steps
- QA validation passed
- Full workflow compliance; zero manual code

## Governance

**Constitution Authority**:
This constitution supersedes all other development practices and guidelines. All
development activities MUST comply with stated principles, constraints, and success
criteria.

**Amendment Procedure**:
- Amendments require documentation of rationale and impact analysis
- Version MUST be updated according to semantic versioning:
  - MAJOR: Backward incompatible changes, principle removal, or redefinition
  - MINOR: New principle/section added or material guidance expansion
  - PATCH: Clarifications, wording fixes, non-semantic refinements
- Amendment date MUST be updated as ISO format (YYYY-MM-DD)
- Dependent templates and documentation MUST be reviewed for consistency

**Compliance Review**:
- All pull requests and reviews MUST verify constitution compliance
- Complexity MUST be justified if it contradicts "Minimal but Complete"
  principle
- Any deviation from Spec-Kit Plus workflow requires documented approval

**Runtime Development Guidance**:
For runtime development guidance, refer to:
- CLAUDE.md in repository root for project-specific instructions
- Spec-Kit Plus workflow commands (.claude/commands/sp.*)
- Phase-specific agents (.claude/agents/*)
- Skills documentation (.claude/skills/*.SKILL.md)

**Version**: 3.0.0 | **Ratified**: 2026-01-01 | **Last Amended**: 2026-01-27
