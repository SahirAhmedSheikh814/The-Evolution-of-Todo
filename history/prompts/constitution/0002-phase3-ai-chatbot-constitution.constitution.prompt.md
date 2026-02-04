---
id: 0002
title: Phase 3 AI Chatbot Constitution
stage: constitution
date: 2026-01-27
surface: agent
model: claude-sonnet-4-5-20250929
feature: phase3-todo-ai-chatbot
branch: main
user: sahirahmed814
command: /sp.constitution
labels: [constitution, phase3, ai-chatbot, multilingual, mcp-tools]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - null
---

## Prompt

Project: Phase III - Todo AI Chatbot (Natural Language Todo Management)
Core Principles:
### I. Spec-Driven Development Only
All code MUST be generated exclusively through Spec-Kit Plus workflow. Manual coding prohibited. Follow: Constitution → Specify → Clarify → Plan → Tasks → Implement → QA.
### II. Deterministic and Reproducible Output
All outputs deterministic; agent runs consistent with same inputs. Conversation state persisted in DB only.
### III. Clean Architecture and Responsive Web UX with AI Integration
Extend Phase II clean architecture: integrate AI agent in backend, MCP tools for task ops, responsive chat UI in frontend. UI professional, animated, bottom-right floating.
### IV. Minimal but Complete MVP Functionality with AI
All 5 todo features via natural language (English, Urdu, Roman Urdu). No feature creep.
### V. User-Friendly, Error-Safe, Multilingual AI Interaction
Validate inputs, confirm actions, graceful errors with suggestions. Support multilingual via agent prompt engineering.
### VI. Python/TS Code Quality Standards
Extend Phase II: docstrings, type hints, PEP8/ESLint. Agent code modular, tool calls traceable.
Key Standards:
- Traceability: All tool calls/decisions referenced to spec.
- Citation: Inline comments for AI decisions.
- Source Types: Use official OpenAI Agents SDK, MCP SDK, OpenRouter docs via Context7 if available.
- Plagiarism: 0% tolerance; all via Claude Code.
- Clarity: Code/docs at Flesch-Kincaid 10-12.
- MCP Tools: Exact params/returns as spec; stateless.
Technical Constraints:
- Frontend: Next.js 16+ (App Router, TypeScript, Tailwind CSS, Shadcn UI). Integrate chat UI (floating bottom-right, login-gated).
- Backend: FastAPI, OpenAI Agents SDK (compatible with OpenRouter), MCP SDK, SQLModel, Neon PostgreSQL.
- Authentication: Better Auth (JWT); enforce user isolation, login required for chat.
- Environment: Use .env OPENROUTER_API_KEY; no hardcoding.
- Structure: Monorepo; extend existing frontend/backend. Add chat endpoint /api/{user_id}/chat.
- Code Generation: Claude Code only via Spec-Kit Plus.
- Persistence: DB for tasks/conversations/messages; stateless server.
- Multilingual: Agent prompt handles English/Urdu/Roman Urdu.
Success Criteria:
- Functional: All 5 operations via NL (add/list/complete/delete/update); confirmations, errors graceful, context maintained.
- Structural: MCP tools correct, agent uses tools accurately, UI responsive/animated/professional.
- Quality: No crashes, multilingual support, login gate ("Please login to use chatbot...").
- Evaluation: Repo review-ready; full workflow compliance; zero manual code.
Governance:
This supersedes prior. Amendments via semantic versioning. Compliance required.
Version: 3.0.0 | Ratified: 2026-01-27 | Last Amended: 2026-01-27

## Response snapshot

Updated constitution from v2.0.0 to v3.0.0 (MAJOR version bump) for Phase III - Todo AI Chatbot. Key changes:
- Modified 3 principles to include AI integration and multilingual support
- Added Chat UI requirements (floating bottom-right, login-gated, animated)
- Added AI integration requirements (OpenAI Agents SDK, MCP tools, OpenRouter)
- Added multilingual support (English, Urdu, Roman Urdu)
- Added conversation/message persistence requirements
- Updated success criteria for AI chatbot functionality

## Outcome

- ✅ Impact: Constitution updated to v3.0.0 with AI chatbot requirements
- 🧪 Tests: N/A (constitution document)
- 📁 Files: .specify/memory/constitution.md
- 🔁 Next prompts: /sp.specify to create Phase 3 feature specification
- 🧠 Reflection: Clean evolution from Phase II; all 6 principles preserved and extended for AI

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS - All placeholders filled, version incremented correctly
- Prompt variant (if applicable): Standard constitution update
- Next experiment (smallest change to try): None needed
