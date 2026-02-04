---
id: 0003
title: Phase 3 AI Chatbot Architecture Plan
stage: plan
date: 2026-01-27
surface: agent
model: claude-sonnet-4-5-20250929
feature: 003-todo-ai-chatbot
branch: 003-todo-ai-chatbot
user: sahirahmed814
command: /sp.plan
labels: [plan, phase3, ai-chatbot, architecture, openrouter, tool-calling]
links:
  spec: specs/003-todo-ai-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/003-todo-ai-chatbot/plan.md
  - specs/003-todo-ai-chatbot/research.md
  - specs/003-todo-ai-chatbot/data-model.md
  - specs/003-todo-ai-chatbot/quickstart.md
  - specs/003-todo-ai-chatbot/contracts/chat-api.yaml
  - specs/003-todo-ai-chatbot/contracts/tools-schema.json
tests:
  - null
---

## Prompt

Create architecture sketch (extend Phase II monorepo: backend chat endpoint + agent + MCP tools; frontend chat component with Shadcn UI/Tailwind), section structure (DB models update, MCP tools def, agent config, endpoint impl, frontend integration), research approach (use official docs for OpenAI Agents SDK, MCP SDK, OpenRouter compatibility).
Decisions to document: multilingual prompt engineering vs separate agents (tradeoff: prompt engineering simpler), stateless vs session (DB persistence), UI placement (bottom-right floating).
Testing strategy: unit tests for tools, e2e for chat flow, validate against acceptance criteria.
Technical details:
- Read existing frontend/backend folders first
- Use OpenRouter via base_url in OpenAI client
- Agent prompt: include multilingual examples
- Checkpoint: human review after core integration

## Response snapshot

Created comprehensive architecture plan with 6 artifacts:

1. **research.md**: Technology decisions for OpenRouter integration, tool calling, multilingual support, state management
2. **data-model.md**: Conversation and Message entity schemas with query patterns
3. **contracts/chat-api.yaml**: OpenAPI spec for POST /chat and GET /chat/history endpoints
4. **contracts/tools-schema.json**: 5 tool definitions (add_task, list_tasks, complete_task, delete_task, update_task)
5. **quickstart.md**: Setup guide with environment variables and architecture diagram
6. **plan.md**: Full implementation plan with 4 phases, 20 tasks, testing strategy

Key architecture decisions:
- ADR-001: OpenAI SDK + OpenRouter base_url (compatibility)
- ADR-002: Single agent with multilingual prompt (simplicity)
- ADR-003: DB persistence, stateless server (constitution compliance)

Constitution check: All 6 principles PASS.

## Outcome

- ✅ Impact: Complete Phase 1 planning artifacts ready for task generation
- 🧪 Tests: Testing strategy defined (unit for tools, manual E2E for chat)
- 📁 Files: 6 artifacts in specs/003-todo-ai-chatbot/
- 🔁 Next prompts: /sp.tasks to generate implementation tasks
- 🧠 Reflection: User-specified checkpoint after Phase 2 (AI integration) for human review before frontend work

## Evaluation notes (flywheel)

- Failure modes observed: Context7 OAuth expired; used WebFetch for OpenRouter docs
- Graders run and results (PASS/FAIL): PASS - All plan sections filled, constitution check passed
- Prompt variant (if applicable): User-guided architecture with specific decisions to document
- Next experiment (smallest change to try): None needed
