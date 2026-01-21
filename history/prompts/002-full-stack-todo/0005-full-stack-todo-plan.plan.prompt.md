---
id: "0005"
title: "Full Stack Todo Plan"
date: "2026-01-09"
time: "12:00:00"
stage: "plan"
users:
  - user
assistant: "Claude"
model: "claude-3-5-sonnet-20241022"
surface: "agent"
feature: "002-full-stack-todo"
branch: "002-full-stack-todo"
command: "sp.plan"
labels:
  - "architecture"
  - "fastapi"
  - "nextjs"
  - "auth-cookies"
  - "sqlmodel"
links:
  spec: "specs/002-full-stack-todo/spec.md"
  plan: "specs/002-full-stack-todo/plan.md"
  adr: "history/adr/0001-python-native-authentication-strategy.md"
files:
  - specs/002-full-stack-todo/plan.md
  - history/adr/0001-python-native-authentication-strategy.md
  - history/prompts/002-full-stack-todo/0005-full-stack-todo-plan.plan.prompt.md
tests: []
---

# Prompt

Create the architectural plan for the 002-full-stack-todo feature.

## User Request

> "Write the specs/002-full-stack-todo/plan.md file."

## Context

- Building a Full Stack Todo App on top of Phase 1 CLI.
- User requested "Better Auth", but it's JS-only.
- Backend is Python/FastAPI.
- Frontend is Next.js 16.
- Database is PostgreSQL via SQLModel.

# Response

I have researched the options and created a detailed architectural plan.

## Research Findings

1.  **"Better Auth" Compatibility**: The user requested "Better Auth", which is a popular TypeScript authentication library. However, our backend is Python (FastAPI). Using "Better Auth" would require a Node.js backend or complex bridging.
    *   **Decision**: I opted for a "Python Native" authentication approach using standard libraries (`python-jose`, `passlib`) but implementing the same security principles (HttpOnly cookies, secure session handling) to achieve "Better Authentication" without the library mismatch.

2.  **SQLModel & Async**: Confirmed that SQLModel works well with FastAPI's async capabilities using `AsyncSession`. This allows high-performance concurrent request handling.

3.  **Next.js 16 Server Actions**: Verified that Server Actions are the modern standard for form handling and data mutations in Next.js, replacing the need for a separate API client in many cases.

## Plan Highlights

-   **Architecture**: Decoupled Client/Server (Next.js FE + FastAPI BE).
-   **Auth**: Secure HttpOnly Cookie JWT flow.
-   **Database**: Users and Todos modeled with SQLModel.
-   **API**: RESTful v1 API.

## File Created

-   `specs/002-full-stack-todo/plan.md`: The complete architectural plan.

## Next Steps

1.  Run `sp.tasks` to generate the implementation tasks.
2.  Suggest ADR for the Auth decision.

