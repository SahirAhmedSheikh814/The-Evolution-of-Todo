---
id: 0019
title: Fix post-signup dashboard redirect and header
stage: green
date: 2026-01-14
surface: agent
model: claude-sonnet-4-5-20250929
feature: 002-full-stack-todo
branch: 002-full-stack-todo
user: unknown
command: agent
labels: ["frontend","auth","signup","redirect","header","nextjs"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/src/context/AuthContext.tsx
 - frontend/src/components/auth/RegisterForm.tsx
 - frontend/src/components/Header.tsx
tests:
 - curl http://localhost:3000/register
 - curl http://localhost:3000/dashboard
 - curl -X POST http://localhost:8000/api/v1/auth/register
 - curl -X POST http://localhost:8000/api/v1/auth/login
 - curl http://localhost:8000/api/v1/auth/me
---

## Prompt

You introduced a glitch. When a user clicks Get Started, creates an account, the dashboard does not open directly; instead, the login page opens.

Currently, everything is set up, but there is one issue: whenever I click Get Started and register with a new email, the login page opens. The login page should not open if a new email has just been registered. If a user signs up, the dashboard should open directly, not the login page. At the moment, the flow is: the user signs up, then is taken to the login page, enters email and password again, and logs in. This wastes a lot of the user’s time.

If a user does not already have an account and wants to use the todo app, they should click Get Started, create an account, and then directly start using the todo web app without any issues. Please ensure that after clicking the Create Account button, the dashboard opens instead of the login page.

There is one more issue: when a user logs in or signs up, the Login and Get Started buttons should disappear from the header. In place of these two buttons, a Dashboard button should appear. This way, once a user is logged in, they see the Dashboard button in the header instead of Login or Sign Up. Please review and fix this as well.

Everything else is correct and working fine; there are no other issues.

## Response snapshot

- Fixed post-signup flow so users do NOT need to log in again:
  - `frontend/src/context/AuthContext.tsx`: `register()` now registers, then logs in (sets HttpOnly cookie), then calls `/auth/me` and sets `user`.
  - `frontend/src/components/auth/RegisterForm.tsx`: redirect changed from `/login` to `/dashboard`.

- Updated header actions to be auth-aware:
  - `frontend/src/components/Header.tsx`: uses `useAuth()` and shows:
    - Guest: Login + Get Started
    - Authenticated: Dashboard
  - Added gating with `loading` so the header doesn’t briefly show guest buttons while auth state is still loading.

- Addressed race condition where navigation to `/dashboard` could happen before `user` state is set:
  - `frontend/src/context/AuthContext.tsx`: `login()` and `register()` now manage `loading` and include a microtask tick after `setUser()`.

## Outcome

- ✅ New signup now goes directly to `/dashboard` without an extra login step.
- ✅ Header switches from Login/Get Started to Dashboard when authenticated.
- 🔁 Notes: Dashboard SSR HTML (curl) will still look unauthenticated because auth is cookie + client-side; browser behavior is the true validation.

## Evaluation notes (flywheel)

- Failure modes observed:
  - Register previously redirected to `/login`.
  - Header initially showed guest actions because auth state loads async on mount.
  - ProtectedRoute could redirect if state wasn’t set before navigation.
- Fixes:
  - Register auto-login + redirect to dashboard.
  - Header gated by `loading`.
  - AuthContext manages `loading` around auth transitions.
