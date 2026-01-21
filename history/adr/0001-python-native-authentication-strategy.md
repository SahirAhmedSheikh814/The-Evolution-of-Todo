# ADR-0001: Python-Native Authentication Strategy

## Status
Accepted

## Context
The user requested "Better Auth" (a TypeScript library) for authentication. However, the project architecture uses a Python (FastAPI) backend. Introducing a Node.js-based auth service or bridging "Better Auth" to Python would introduce significant complexity and split the backend stack.

The application requires a secure, production-ready authentication mechanism that:
1. Supports email/password registration and login.
2. Secures API endpoints.
3. Protected against XSS (Cross-Site Scripting).
4. Protected against CSRF (Cross-Site Request Forgery).

## Decision
We will implement a **Python-Native Authentication** strategy using **FastAPI**, **python-jose**, and **passlib**.

Specifically:
*   **Protocol**: Standard OAuth2 Password Flow.
*   **Token**: Stateless JWT (JSON Web Token).
*   **Storage**: **HttpOnly Secure Cookies** (not localStorage).
*   **CSRF Protection**: SameSite=Lax cookie attribute + potential CSRF token if needed for mutations.
*   **Libraries**:
    *   `python-jose`: For JWT encoding/decoding.
    *   `passlib[bcrypt]`: For password hashing.
    *   `fastapi.security`: For `OAuth2PasswordBearer` (customized for cookie extraction).

## Consequences
### Positive
*   **Unified Stack**: Keeps the backend 100% Python, reducing operational complexity.
*   **Performance**: No cross-service network hops for auth checks.
*   **Security**: HttpOnly cookies prevent XSS token theft (unlike localStorage).
*   **Simplicity**: Uses well-tested, standard Python libraries.

### Negative
*   **CSRF Risk**: Cookie-based auth introduces CSRF vectors that must be mitigated (unlike Authorization headers).
*   **No "Better Auth" Features**: We lose out regarding the out-of-the-box features "Better Auth" might provide (like plugins, social providers pre-configured), requiring we implement them manually if needed later.

## Alternatives
1.  **"Better Auth" with Node.js Proxy**: Run a separate Node service just for Auth. *Rejected: Too complex for MVP.*
2.  **Auth0 / Firebase**: External provider. *Rejected: User requested "in-code" solution Phase 1/2 evolution, and external dependencies add cost/lock-in concern for this stage.*
3.  **Session implementation**: Server-side sessions (e.g. Redis). *Rejected: Stateless JWT favored for simpler scaling and reduced infrastructure (no Redis required for MVP).*

## References
*   [specs/002-full-stack-todo/plan.md](../specs/002-full-stack-todo/plan.md)
