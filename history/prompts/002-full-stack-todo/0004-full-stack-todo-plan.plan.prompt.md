---
id: 0004
title: Full Stack Todo Plan
stage: plan
date: 2026-01-09
surface: agent
model: claude-sonnet-4-5-20250929
feature: 002-full-stack-todo
branch: main
user: Sahirs Ahmed Sheikh
command: /sp.phr
labels: ["nextjs", "fastapi", "sqlmodel", "authentication", "architecture"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/002-full-stack-todo/plan.md
tests:
 - none
---

## Prompt

Research the following technologies to create a detailed implementation plan for a Full-Stack Todo App:
    1. **Next.js 16+ App Router**: Search for "Next.js App Router project structure", "Server Actions vs API Routes", "Next.js 16 authentication patterns".
    2. **FastAPI**: Search for "FastAPI project structure best practices", "FastAPI SQLModel integration", "FastAPI JWT authentication HttpOnly cookie".
    3. **SQLModel**: Search for "SQLModel relationship examples", "SQLModel async CRUD".
    4. **Better Auth**: Search for "Better Auth Python integration", "Better Auth JWT example". (Note: If "Better Auth" is a specific library, check its docs. If it refers to the concept of "better authentication", focus on secure implementation using standard libraries like `python-jose` or `PyJWT` and `passlib`). *Self-correction*: The prompt mentions "Better Auth" as a specific capitalized term. I'll check if it's a library. If not found, I'll fallback to a robust custom implementation using `python-jose`. [UPDATE: Better Auth is likely 'Better Auth' the library or 'Auth.js' (NextAuth) or similar. I'll search for "Better Auth" specifically. If it's the TypeScript library 'better-auth', I need to see if it supports Python backend. If it's node-only, I'll stick to FastAPI standard auth patterns (OAuth2PasswordBearer) as "Better Auth" might be a misnomer or user confusion for "Best Practice Auth". I will clarify this lookup.]
    5. **Neon DB**: Search for "Neon serverless postgres connection string python".

    After research, create the `specs/002-full-stack-todo/plan.md` file using the template.

    The plan must include:
    - **Architecture Diagram** (text-based).
    - **API Interface**: schemas, endpoints, error codes.
    - **Data Model**: SQLModel classes (User, Task).
    - **Component Hierarchy**: React components.
    - **Authentication Flow**: HttpOnly cookie strategy details.
    - **Dependencies**: List of packages (fastapi, uvicorn, sqlmodel, asyncpg, python-jose, passlib, bcrypt, pydantic-settings, next, react, react-dom, tailwindcss, etc.).

    **Important**: Since the user specified "Better Auth" and "JWT", verify if "Better Auth" matches a Python-compatible library or if I should implement "Better Authentication" using standard FastAPI security tools. Given the constraints, I will prioritize standard, robust FastAPI auth if "Better Auth" is JS-only. *Wait*, "Better Auth" often refers to the new `better-auth` library (TypeScript). If so, it might be for the frontend, but the backend is Python. This creates a mismatch if 'better-auth' is full-stack TS. I will research "Better Auth with Python backend". If incompatible, I will document this decision in the plan (ADR) and plan for **FastAPI OAuth2 with HttpOnly Cookies** instead, as it's the pythonic standard.

    **Output**: Write the content to `specs/002-full-stack-todo/plan.md`.

## Response snapshot

Created a detailed implementation plan for a Full-Stack Todo App using Next.js 16+ App Router, FastAPI, SQLModel, and Neon DB. The plan prioritizes standard FastAPI JWT with HttpOnly cookies over 'Better Auth' as the latter lacks native Python support, ensuring a robust and secure authentication flow.

## Outcome

- ✅ Impact: Drafted a comprehensive architecture plan for the full-stack app.
- 🧪 Tests: none
- 📁 Files: Created `specs/002-full-stack-todo/plan.md`
- 🔁 Next prompts: sp.tasks
- 🧠 Reflection: Proactive research clarified the incompatibility of "Better Auth" with the Python backend stack, allowing for a swift pivot to a standard, secure alternative without blocking progress.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): rigid-template
- Next experiment (smallest change to try): None
