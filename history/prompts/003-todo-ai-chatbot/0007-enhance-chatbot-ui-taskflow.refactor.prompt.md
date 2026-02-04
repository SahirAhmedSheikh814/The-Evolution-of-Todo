---
id: 0007
title: enhance-chatbot-ui-taskflow
stage: refactor
date: 2026-02-03
surface: agent
model: claude-sonnet-4.5
feature: 003-todo-ai-chatbot
branch: 003-todo-ai-chatbot
user: user
command: Enhance the Chatbot UI to be professional, animated, and branded as 'TaskFlow'.
labels: ["ui", "chat", "frontend", "tailwindcss", "framer-motion"]
links:
  spec: specs/003-todo-ai-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - frontend/src/components/chat/ChatWindow.tsx
 - frontend/src/components/chat/ChatBubble.tsx
 - frontend/src/components/chat/ChatInput.tsx
 - frontend/src/components/chat/ChatButton.tsx
tests:
 - none
---

## Prompt

Enhance the Chatbot UI to be professional, animated, and branded as 'TaskFlow'.

Instructions:
1.  **Header (`ChatWindow.tsx`):**
    -   Change title to "TaskFlow AI".
    -   Add a subtitle "Your personal productivity assistant".
    -   Use a professional layout with a logo icon (e.g., `Bot` or `Sparkles` from lucide-react).
    -   Apply a sleek background (e.g., gradient or solid primary color) with glassmorphism effects if suitable.

2.  **Messages (`ChatBubble.tsx` & `ChatMessages.tsx`):**
    -   Improve bubble styling: better rounding, subtle shadows, refined typography.
    -   User messages: distinctive primary color (brand color).
    -   AI messages: clean, professional neutral background.
    -   Add avatars/icons next to messages for a polished chat look.
    -   Ensure proper timestamp placement (e.g., tiny footer inside bubble or on hover).

3.  **Input (`ChatInput.tsx`):**
    -   Redesign input area to look like a modern messaging app.
    -   Add a nice send button with hover effects.
    -   Make the input field comfortable to type in (padding, focus states).

4.  **Widget Trigger (`ChatButton.tsx` / `ChatWidget.tsx`):**
    -   Ensure the floating button is prominent and inviting.
    -   Add a tooltip or label if appropriate.

5.  **General:**
    -   Use `framer-motion` for smooth entrance animations.
    -   Strictly frontend changes only.
    -   Match the 'TaskFlow' brand (likely existing primary colors in `globals.css`).

Files to modify:
- `frontend/src/components/chat/ChatWindow.tsx`
- `frontend/src/components/chat/ChatBubble.tsx`
- `frontend/src/components/chat/ChatInput.tsx`
- `frontend/src/components/chat/ChatButton.tsx` (if exists)

Do NOT touch backend or `ai_agent.py`.
Verify the changes by ensuring the code compiles/looks correct (no syntax errors).

## Response snapshot

Enhanced the UI components `ChatWindow`, `ChatBubble`, `ChatInput`, and `ChatButton` to match the "TaskFlow" brand identity with professional styling, glassmorphism effects, and animations.

- **ChatWindow**: Increased size to 360x550px, added glassmorphism header with "TaskFlow AI" branding and Bot+Sparkles icons. Added shadow-2xl and rounded-xl for a floating card effect.
- **ChatBubble**: Implemented distinct user/AI bubble styles with avatars on the side. User bubbles are primary-colored with sharp top-right corner; AI bubbles are neutral with sharp top-left corner. Timestamps are now integrated into the bubble footer.
- **ChatInput**: Redesigned as a floating capsule input with blur background. Enhanced send button active states.
- **ChatButton**: Updated to a large gradient floating action button with shine animation and spring-based icon rotation.

## Outcome

- ✅ Impact: Significantly improved UI polish and branding fit for a professional productivity tool.
- 🧪 Tests: Visual verification of code structure and imports.
- 📁 Files: Modified 4 frontend components.
- 🔁 Next prompts: None immediate.
- 🧠 Reflection: The use of `framer-motion` and `lucide-react` icons (Sparkles) adds a very modern "AI" feel.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
