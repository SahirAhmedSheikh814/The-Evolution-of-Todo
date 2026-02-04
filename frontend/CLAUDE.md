# Todo Full-Stack - Frontend Development

## Project Overview

The frontend is a modern, responsive Single Page Application (SPA) built with Next.js 16+ (App Router), enabling users to manage tasks with authentication and persistent state.

## Technology Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript (Strict)
- **Styling**: Tailwind CSS, Shadcn UI compatible structure
- **State Management**: React Context (`AuthContext`)
- **API Client**: Axios with interceptors
- **Validation**: Zod (schema validation)
- **Forms**: React Hook Form
- **Routing**: Next.js File-system based routing

## Architecture

### Directory Structure

```
frontend/src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing page
│   ├── login/           # Login page
│   ├── register/        # Registration page
│   └── dashboard/       # Protected dashboard (Todo list)
├── components/          # Reusable UI components
│   ├── auth/            # Auth forms (LoginForm, RegisterForm)
│   ├── chat/            # Chatbot Widget System (Phase 3)
│   │   ├── ChatWidget.tsx    # Main floating widget logic
│   │   ├── ChatWindow.tsx    # Styled chat interface container
│   │   ├── ChatMessages.tsx  # Scrollable message list
│   │   ├── ChatBubble.tsx    # Individual message branding
│   │   └── ChatInput.tsx     # Message composition
│   ├── todos/           # Task components (TodoList, CreateTodo, TodoItem)
│   └── ui/              # Primitive UI elements (Button, Input, Card)
├── context/             # React Context Providers
│   └── AuthContext.tsx  # Authentication state & logic
├── lib/                 # Utilities and libraries
│   ├── api.ts           # Axios instance configuration
│   ├── utils.ts         # Helper functions
│   └── validations.ts   # Zod validation schemas
└── types/               # Global TypeScript definitions
```

### Key Features

- **Authentication**: JWT-based auth via secure HTTP-only cookies (set by backend).
- **Protected Routes**: `ProtectedRoute` HOC component for access control.
- **Client-Side Validation**: Zod schemas ensure data integrity before submission.
- **Responsive Design**: Tailwind CSS utility classes for mobile-first layout.
- **AI Chatbot**: Real-time natural language task management via floating widget (Phase 3).

## Development Workflow

### Setup

```bash
cd frontend
npm install
```

### Running Locally

```bash
npm run dev
# App runs at http://localhost:3000
```

### Build

```bash
npm run build
npm start
```

## API Integration

### `src/lib/api.ts`

- Configures global Axios instance.
- Base URL set via `NEXT_PUBLIC_API_URL`.
- `withCredentials: true` ensures cookies are sent/received in cross-origin requests.

### Authentication Flow

1. **Register**: POST `/auth/register` (creates user) -> Auto-login.
2. **Login**: POST `/auth/login` (sets `session_token` cookie).
3. **Session Check**: GET `/auth/me` on app load (validates cookie).
4. **Logout**: POST `/auth/logout` (clears cookie) -> Update local state.

### AI Integration (Phase 3)

- **Widget**: `ChatWidget` handles minimal/expanded state options via `framer-motion`.
- **Event Bus**: Dispatches `todo-updated` window event upon successful AI actions to trigger Todo list refresh without page reload.
- **Components**:
  - `ChatWindow`: TaskFlow branded container with glassmorphism header.
  - `LoginGate`: Prompts unauthenticated users to login directly in-chat.
  - `ChatBubble`: Semantic styling (User=Gradient, AI=Muted) with timezone management.

## Coding Standards

- **Components**: Functional components with strict typing.
- **Hooks**: Custom hooks for logic encapsulation (e.g., `useAuth`).
- **Styling**: Utility-first CSS (Tailwind). Avoid inline styles files.
- **Errors**: Propagate backend errors to UI forms via `AuthContext` result objects (no console errors).

## Troubleshooting

- **CORS Issues**: Check `NEXT_PUBLIC_API_URL` matches backend.
- **Auth Errors**: Verify cookies are being set (HttpOnly).
- **Console Errors**: Check `AuthContext` logic; ensure errors are handled via return values, not unchecked throws.
