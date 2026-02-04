---
id: 0005
title: Implement Dashboard Refresh on Chat Action
stage: implement
date: 2026-02-02
surface: agent
model: claude-sonnet-4-5-20250929
feature: 003-todo-ai-chatbot
branch: 003-todo-ai-chatbot
user: user
command: implement
labels: [frontend, dashboard, chat, event-bus, ux]
links:
  spec: specs/003-todo-ai-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/src/components/chat/ChatWidget.tsx
  - frontend/src/components/todos/TodoList.tsx
  - frontend/src/app/dashboard/page.tsx
tests:
  - null
---

## Prompt

Investigate and implement a mechanism to force the frontend dashboard to update immediately after the AI Chatbot performs an action. Constraint: Do NOT modify backend logic. Focus on Frontend interaction.

## Response snapshot

Implemented a client-side event bus using `window.dispatchEvent` to synchronize the Chat component with the Todo Grid.

**Changes**:
1.  **ChatWidget.tsx**: Dispatches `todo-updated` custom event after receiving a successful response from the agent.
2.  **TodoList.tsx**: Listens for `todo-updated` event and triggers `fetchTasks()` to refresh data without page reload.
3.  **Dashboard/page.tsx**: Updated `CreateTodo` callback to dispatch `todo-updated` instead of using `window.location.reload()`, improving UX.

## Outcome

- ✅ Impact: Dashboard now updates immediately when AI modifies tasks or when manual tasks are created, without full page reload.
- 🧪 Tests: Verified code paths (not automated).
- 📁 Files: Modified frontend/src/components/chat/ChatWidget.tsx, frontend/src/components/todos/TodoList.tsx, frontend/src/app/dashboard/page.tsx
