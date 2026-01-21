---
id: 0017
title: Make TaskFlow default theme
stage: green
date: 2026-01-14
surface: agent
model: claude-sonnet-4-5-20250929
feature: 002-full-stack-todo
branch: 002-full-stack-todo
user: unknown
command: agent
labels: ["frontend","nextjs","theme","tailwind","dashboard"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/src/components/Layout.tsx
 - frontend/src/components/ProtectedRoute.tsx
tests:
 - rm -rf frontend/.next
 - npm run dev (root script)
 - curl http://localhost:3000/dashboard
---

## Prompt

Please Resume and make my theme as a default theme. Check my landing page this is my accurate theme i want my whole website to convert on this theme without any issue, background color and everything Thanks. If I will create any page in future so that page will be in my default theme. and please check TodoList.tsx component as well convert this page as well on my theme please.

## Response snapshot

- Confirmed the project already defines a global dark theme baseline in `frontend/src/app/globals.css` (background/foreground CSS variables and `html` uses `className="dark"` in `frontend/src/app/layout.tsx`).
- Updated the legacy wrapper component `frontend/src/components/Layout.tsx` to match TaskFlow styling (removed `bg-gray-100` / white navbar / TodoApp branding and replaced with the same dark/glass layout patterns used across login/register/dashboard).
- Updated `frontend/src/components/ProtectedRoute.tsx` loading UI to use TaskFlow loading card instead of plain `Loading...`, ensuring protected pages don’t briefly show unstyled content.
- Restarted the Next.js dev server after deleting `.next` to avoid stale SSR/Turbopack output.

## Outcome

- ✅ Impact: Future pages that accidentally use the legacy `Layout` component will now inherit TaskFlow styling instead of the old light theme.
- ✅ Protected routes now show a themed loading state.
- 🧪 Tests: Verified dev server boot + `curl http://localhost:3000/dashboard` returns 200.

## Notes / follow-ups

- The global Header currently renders landing-page section links (`#features`, etc.) everywhere because it is included in `frontend/src/app/layout.tsx`. If you want a dedicated “app/dashboard” header (with Dashboard / Logout) while keeping the marketing header only on `/`, we should add a `src/app/(marketing)/layout.tsx` and `src/app/(app)/layout.tsx` route group split.

## Evaluation notes (flywheel)

- Failure modes observed: Theme mismatches were mainly caused by stale Next build output and the presence of a leftover legacy Layout component.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Route groups for marketing vs app chrome to avoid showing landing nav links on dashboard.
