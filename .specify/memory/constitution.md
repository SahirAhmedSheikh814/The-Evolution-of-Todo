<!--
SYNC IMPACT REPORT
===================
Version Change: 1.0.0 → 2.0.0 (MAJOR: Evolve in-memory CLI to full-stack web)

Modified Principles:
- "Clean Architecture and Readable CLI UX" → "Clean Architecture and Responsive Web UX"
- "User-Friendly and Error-Safe CLI Interaction" → "User-Friendly and Error-Safe Web Interaction"
- "Python Code Quality Standards" → "Python/TS Code Quality Standards"

Added Sections:
- Key Standards (Traceability, Citation, Sources, Plagiarism, Clarity, MCP usage)
- Updated Technical Constraints (Next.js, FastAPI, Database, Auth, Monorepo)
- Updated Success Criteria (Web UI, REST API, Persistence, Auth)

Removed Sections:
- OLD Technical Constraints (In-memory, CLI only)
- OLD Success Criteria (CLI specific)

Templates Requiring Updates:
✅ .specify/templates/plan-template.md - Needs alignment with full-stack architecture
✅ .specify/templates/spec-template.md - Needs alignment with web capability specs
✅ .specify/templates/tasks-template.md - Needs alignment with frontend/backend split
✅ .claude/commands/sp.phase1.md -> sp.phase2.md (New command needed)
✅ CLAUDE.md - Needs major update for full-stack patterns

Follow-up TODOs:
- Create specs/002-full-stack-todo/ directory structure
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
critical paths.

Rationale: Enables predictable development, reliable testing, and clear audit
trails for hackathon evaluation.

### III. Clean Architecture and Responsive Web UX

All code MUST follow clean architecture with clear separation of concerns:
models (data), services (business logic), API (backend endpoints), and UI (frontend components).
The web interface MUST be responsive, user-friendly, with clear prompts,
helpful error messages, and no confusing output.

Rationale: Ensures maintainable, understandable codebase and excellent user
experience for web-based interaction.

### IV. Minimal but Complete MVP Functionality

Focus on minimal viable product (MVP) with complete, working features.
All 5 basic todo features (Add, Delete, Update, View, Mark Complete) MUST
be fully functional as web operations. Avoid feature creep and unnecessary complexity.

Rationale: Delivers immediate value while establishing solid foundation for future
phases.

### V. User-Friendly and Error-Safe Web Interaction

Web interaction MUST be user-friendly and error-safe. All inputs MUST be
validated with clear error messages that explain the problem AND suggest corrective
action. The application MUST NOT crash on invalid input, and handle authentication securely.

Rationale: Provides professional user experience and prevents frustration from cryptic
errors or unexpected crashes.

### VI. Python/TS Code Quality Standards

All Python (backend) and TypeScript (frontend) source code MUST follow readable structure
with clear naming conventions. All classes, functions, and modules MUST include docstrings.
Complex logic MUST include inline comments for clarity. Code MUST follow PEP 8 (Python)
and ESLint/Prettier (JS/TS) style guidelines.

Rationale: Ensures maintainability, readability, and professional code quality
for hackathon evaluation.

## Key Standards

- **Traceability**: All factual claims or decisions MUST be traceable to sources or specs.
- **Citation**: Use inline comments for code decisions referencing specs or ADRs.
- **Source Types**: Minimum 50% from official docs (via MCP/Context7 for latest versions).
- **Plagiarism**: 0% tolerance; all code generated via Claude.
- **Clarity**: Code and docs at Flesch-Kincaid grade 10-12 equivalent.
- **Documentation**: Use MCP/Context7 for latest documentation on tech stack (Next.js 16+, FastAPI, SQLModel, Neon DB, Better Auth).

## Technical Constraints

Technology Stack Requirements:
- **Frontend**: Next.js 16+ (App Router, TypeScript, Tailwind CSS)
- **Backend**: Python FastAPI
- **ORM**: SQLModel
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: Better Auth with JWT tokens for user isolation
- **Structure**: Monorepo with frontend/, backend/, specs/, .spec-kit/config.yaml, docker-compose.yml

Development Constraints:
- **Code Generation**: All code MUST be generated exclusively by Claude Code via
  Spec-Kit Plus workflow - NO manual coding allowed
- **Separation of Concerns**: Clear separation required between models (data),
  services (business logic), API (endpoints), and UI (components)
- **Persistence**: Use Neon PostgreSQL for persistent storage - NO in-memory only;
  tasks owned by users via user_id
- **Authentication**: All endpoints require JWT token; user isolation enforced
  (users see/modify only their tasks)
- **Monorepo Organization**: Follow exact structure - hackathon-todo/ with specs/
  (organized by features/api/database/ui), frontend/ (CLAUDE.md with Next.js patterns),
  backend/ (CLAUDE.md with FastAPI patterns), root CLAUDE.md updated for Phase 2 overview
- **Environment**: Use .env for secrets (e.g., DATABASE_URL, BETTER_AUTH_SECRET);
  if API keys needed, ask user immediately
- **Documentation**: README.md, CLAUDE.md (root + frontend + backend), and docstrings
  MUST exist with usage and workflow notes
- **Research**: Use connected MCP/Context7 for latest docs/research - No Internet

## Success Criteria

Phase 2 - Full-Stack Web Application MUST meet ALL criteria:

**Functional Requirements**:
- All 5 basic todo features work correctly via web UI and REST API (GET/POST/PUT/DELETE/PATCH endpoints as specified)
- Operations provide confirmation messages
- Error handling is graceful and user-friendly

**Structural Requirements**:
- Monorepo structure is clean and logical
- Clear separation of concerns (frontend/backend)
- Modules properly organized under frontend/ and backend/
- Documentation complete (README.md, CLAUDE.md)

**Quality Requirements**:
- Code follows style guidelines (PEP 8, ESLint/Prettier)
- All functions/classes have appropriate docstrings
- Web UI is responsive and user-friendly
- No crashes on invalid input
- JWT auth enforces strict user isolation

**Evaluation Readiness**:
- Repository is review-ready for hackathon evaluation
- All spec documents complete (constitution, spec, plan, tasks)
- Implementation follows workflow without skipping steps
- QA validation passed
- All claims verified; zero manual code

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

**Version**: 2.0.0 | **Ratified**: 2026-01-01 | **Last Amended**: 2026-01-02
