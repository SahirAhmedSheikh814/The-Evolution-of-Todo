# Research: Todo AI Chatbot

**Date**: 2026-01-27
**Feature**: 003-todo-ai-chatbot

## Research Questions

### 1. OpenRouter + OpenAI SDK Compatibility

**Decision**: Use OpenAI Python SDK with OpenRouter's base_url

**Rationale**: OpenRouter provides full OpenAI API compatibility via `base_url="https://openrouter.ai/api/v1"`. This allows using the familiar OpenAI SDK patterns while accessing OpenRouter's model catalog including free tier models.

**Configuration**:
```python
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)
```

**Alternatives Considered**:
- Native OpenRouter SDK: More features but additional dependency
- Direct HTTP requests: More control but reinventing the wheel

### 2. Tool Calling Architecture

**Decision**: Use OpenAI-style function calling (tools parameter)

**Rationale**: OpenRouter supports OpenAI's tool calling format across multiple models. Define tools as JSON schemas, receive tool_calls in responses, execute locally, and return results.

**Pattern**:
```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "add_task",
            "description": "Add a new task to the user's todo list",
            "parameters": {
                "type": "object",
                "properties": {
                    "title": {"type": "string", "description": "Task title"},
                    "description": {"type": "string", "description": "Optional description"}
                },
                "required": ["title"]
            }
        }
    }
]
```

**Alternatives Considered**:
- MCP SDK native tools: Constitution mentions MCP but OpenAI tool format is simpler and well-supported
- Custom parsing: Error-prone, no standardization

### 3. Free Model Selection

**Decision**: Default to `meta-llama/llama-3.1-8b-instruct:free` (configurable via env)

**Rationale**:
- Free tier availability (no cost during development/hackathon)
- Good instruction following for todo operations
- Supports tool calling
- Configurable via `OPENROUTER_MODEL` env var for flexibility

**Alternatives Considered**:
- `google/gemma-2-9b-it:free`: Good alternative, similar capabilities
- `mistralai/mistral-7b-instruct:free`: Another option
- Paid models: Better quality but cost during development

### 4. Multilingual Support Approach

**Decision**: Single agent with multilingual system prompt (prompt engineering)

**Rationale**:
- Simpler architecture (one agent, one prompt)
- Modern LLMs handle multilingual well
- Language mirroring via prompt instruction
- No need for separate agents per language

**System Prompt Pattern**:
```
You are a helpful todo assistant. You can add, list, complete, delete, and update tasks.

IMPORTANT: Always respond in the SAME language the user used. If they write in:
- English: respond in English
- Urdu (اردو): respond in Urdu script
- Roman Urdu (like "mujhe task add karna hai"): respond in Roman Urdu

Examples:
- User: "Add task buy groceries" → "Task 'buy groceries' has been added."
- User: "meri tasks dikhao" → "Yeh hain aap ki tasks: ..."
- User: "task 2 ho gaya" → "Task 'xyz' complete ho gaya!"
```

**Alternatives Considered**:
- Separate agents per language: Complex, maintenance overhead
- Language detection + translation: Added latency, potential errors

### 5. State Management

**Decision**: Stateless server with DB persistence

**Rationale**:
- Constitution mandates: "Conversation state MUST be persisted in the database only"
- Enables session resumption across server restarts
- Supports horizontal scaling
- Messages table stores full conversation history

**Pattern**:
- Each request: Load last 10 messages from DB → Send to AI → Store response → Return
- No in-memory conversation state

**Alternatives Considered**:
- In-memory sessions: Violates constitution, lost on restart
- Redis cache: Adds complexity, not needed for MVP

### 6. Chat UI Placement

**Decision**: Bottom-right floating widget (always visible)

**Rationale**:
- Constitution specifies: "floating bottom-right widget"
- Standard chat widget placement (Intercom, Drift patterns)
- Non-intrusive, accessible from any page
- Login gate shows when unauthenticated

**Alternatives Considered**:
- Sidebar panel: Takes more space, less conventional
- Dedicated page: Breaks flow, loses context

## Technical Decisions Summary

| Decision | Choice | Confidence |
|----------|--------|------------|
| AI Client | OpenAI SDK + OpenRouter base_url | High |
| Tool Calling | OpenAI function calling format | High |
| Default Model | meta-llama/llama-3.1-8b-instruct:free | Medium |
| Multilingual | Prompt engineering | High |
| State | DB persistence, stateless server | High |
| UI Placement | Bottom-right floating | High |

## Dependencies Identified

1. **openai** Python package (for OpenRouter compatibility)
2. **Shadcn UI components**: Button, Card, Input, ScrollArea
3. **Framer Motion** (existing in frontend for animations)
4. **New DB tables**: Conversation, Message

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Free model may have rate limits | Document limits, add retry logic with exponential backoff |
| Tool calling may fail on edge cases | Graceful fallback to clarification request |
| Multilingual accuracy varies | Test with common phrases, provide fallback English |
| Long conversations exceed context | Limit to last 10 messages (per clarification) |
