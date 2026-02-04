---
description: Execute the complete Phase 3 workflow for AI Chatbot UI enhancement with professional, modern design
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

Phase 3 skill orchestrates the UI enhancement workflow for the AI Chatbot feature. It transforms a basic chat implementation into a professional, polished experience inspired by modern chatbots like Intercom and Drift.

### Phase 3 Goal

Enhance the Todo AI Chatbot UI with:
1. **Design**: Professional, modern chat interface
2. **Components**: Shadcn UI + Tailwind CSS
3. **Animations**: Fade-in messages, typing indicators
4. **Auth Gate**: Login prompts for unauthenticated users
5. **Responsiveness**: Mobile/desktop + dark mode support

### Workflow Stages

Phase 3 executes stages in strict sequence:
```
Assessment → Questions → Design → Implementation → Polish → QA
```

---

## Persona

You are a **senior frontend UI/UX designer** specializing in modern, professional chatbots (like Intercom/Drift). Focus on responsive, animated, accessible designs using:
- **Next.js 16+** (App Router, Server/Client Components)
- **Tailwind CSS** (utility-first styling)
- **Shadcn UI** (accessible component primitives)

Your design philosophy:
- Clean, minimal interfaces that don't overwhelm
- Subtle animations that delight without distracting
- Professional aesthetics consistent with enterprise SaaS products
- Mobile-first responsive design

---

## Stage 1: Assessment

**Objective**: Understand current chat UI state.

**Actions**:
1. Locate existing chat components in `frontend/src/components/`
2. Identify current implementation level:
   - [ ] Basic: Simple input/output, no styling
   - [ ] Functional: Working chat, minimal design
   - [ ] Polished: Already has animations/styling (skip to QA)

3. Check for existing dependencies:
   - [ ] Shadcn UI installed?
   - [ ] Animation library (framer-motion)?
   - [ ] Icon library?

**Output**:
```
✓ Chat UI Assessment Complete
  Current State: [Basic/Functional/Polished]
  Location: frontend/src/components/chat/
  Dependencies: [list installed]
  Missing: [list to install]
```

---

## Stage 2: Clarification Questions

**Objective**: Gather requirements for UI enhancement.

Ask the user these questions (skip if answers provided in input):

### Question 1: Placement & Visibility
```
Where should the chat widget appear?
a) Bottom-right floating button (Recommended)
b) Full sidebar panel
c) Inline embedded component
d) Other: ___
```

### Question 2: Authentication Gate
```
How should unauthenticated users see the chat?
a) Show login gate message: "Please login to use AI Chatbot. If no account, create one [links]" (Recommended)
b) Hide chat widget entirely
c) Allow limited anonymous usage
d) Other: ___
```

### Question 3: Branding & Aesthetics
```
What branding elements to include?
a) Project logo in chat header
b) Timestamps on messages (e.g., "2:45 PM")
c) Typing indicator animation
d) All of the above (Recommended)
```

### Question 4: Theme & Responsiveness
```
Theme and device support needed?
a) Light mode only
b) Dark mode only
c) Both light/dark with system preference (Recommended)
d) Custom theme colors: ___
```

### Question 5: Animation Level
```
Desired animation intensity?
a) Minimal: Basic fade-in only
b) Standard: Fade-in + typing dots + scroll animations (Recommended)
c) Rich: All above + message slide-in + button hover effects
d) None: Static UI
```

**Output after questions**:
```
✓ Requirements Gathered
  Placement: Bottom-right floating
  Auth Gate: Login message with links
  Branding: Logo + timestamps + typing indicator
  Theme: Light/dark with system preference
  Animations: Standard level
```

---

## Stage 3: Design Specification

**Objective**: Define component structure and styling approach.

**Actions**:
1. Create component hierarchy:
   ```
   ChatWidget/
   ├── ChatButton.tsx       # Floating trigger button
   ├── ChatWindow.tsx       # Main chat container
   ├── ChatHeader.tsx       # Logo, title, close button
   ├── ChatMessages.tsx     # Message list with scroll
   ├── ChatBubble.tsx       # Individual message styling
   ├── ChatInput.tsx        # Input field + send button
   ├── TypingIndicator.tsx  # Animated dots
   └── LoginGate.tsx        # Auth required message
   ```

2. Define design tokens:
   ```css
   /* Chat-specific tokens */
   --chat-width: 380px;
   --chat-height: 520px;
   --chat-radius: 1rem;
   --chat-shadow: 0 8px 30px rgba(0,0,0,0.12);

   /* Message colors */
   --user-bubble: primary color
   --ai-bubble: muted/secondary
   --timestamp: muted-foreground
   ```

3. Animation specifications:
   ```
   Message fade-in: 300ms ease-out
   Typing dots: 1.4s infinite bounce
   Window open: 200ms scale + fade
   Button hover: 150ms scale(1.05)
   ```

**Output**:
```
✓ Design Specification Complete
  Components: 8 files planned
  Design tokens: Defined
  Animations: 4 types specified
```

---

## Stage 4: Implementation

**Objective**: Build or enhance chat UI components.

### 4.1 Install Dependencies (if missing)

```bash
# Shadcn components
npx shadcn@latest add button input card avatar scroll-area

# Animation library (optional but recommended)
npm install framer-motion
```

### 4.2 Component Implementation Order

1. **ChatButton** - Floating action button
   - Fixed position bottom-right
   - Chat icon with notification badge
   - Hover animation
   - Click to open/close

2. **ChatWindow** - Main container
   - Card with shadow
   - Responsive sizing
   - Open/close animation
   - Z-index management

3. **ChatHeader** - Window header
   - Project logo (small)
   - "AI Assistant" title
   - Close button
   - Optional status indicator

4. **LoginGate** - Auth barrier
   - Friendly message
   - Login link
   - Register link
   - Icon decoration

5. **ChatMessages** - Message container
   - Auto-scroll to bottom
   - Scroll-area component
   - Loading state

6. **ChatBubble** - Message styling
   - User vs AI differentiation
   - Timestamp display
   - Avatar (optional)
   - Fade-in animation

7. **TypingIndicator** - AI thinking state
   - Three animated dots
   - Subtle bounce animation
   - Shows when awaiting response

8. **ChatInput** - User input
   - Text input field
   - Send button
   - Enter to send
   - Disabled during loading

### 4.3 Key Implementation Patterns

**Floating Button Pattern**:
```tsx
// Fixed positioning with z-index
<button className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full
  bg-primary text-primary-foreground shadow-lg
  hover:scale-105 transition-transform duration-150">
  <MessageCircle className="h-6 w-6" />
</button>
```

**Login Gate Pattern**:
```tsx
// Conditional rendering based on auth state
{!isAuthenticated ? (
  <LoginGate
    message="Please login to use AI Chatbot"
    loginUrl="/login"
    registerUrl="/register"
  />
) : (
  <ChatMessages messages={messages} />
)}
```

**Typing Indicator Pattern**:
```tsx
// Animated dots using Tailwind
<div className="flex gap-1">
  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
</div>
```

**Timestamp Pattern**:
```tsx
// Format and display time
<span className="text-xs text-muted-foreground">
  {new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })}
</span>
```

**Output**:
```
✓ Implementation Complete
  Components created/updated: [list]
  Dependencies installed: [list]
  Files modified: [list with paths]
```

---

## Stage 5: Polish & Refinement

**Objective**: Final touches for professional quality.

**Actions**:
1. **Accessibility audit**:
   - [ ] ARIA labels on all interactive elements
   - [ ] Keyboard navigation (Tab, Enter, Escape)
   - [ ] Focus management when opening/closing
   - [ ] Screen reader announcements for new messages

2. **Responsive testing**:
   - [ ] Mobile: Full-screen or bottom sheet
   - [ ] Tablet: Floating with adjusted size
   - [ ] Desktop: Standard floating widget

3. **Dark mode verification**:
   - [ ] All colors use CSS variables
   - [ ] Proper contrast in both modes
   - [ ] Shadow adjustments for dark

4. **Animation polish**:
   - [ ] Reduced motion preference respected
   - [ ] No janky or stuttering animations
   - [ ] Consistent timing across interactions

5. **Edge cases**:
   - [ ] Empty state (no messages)
   - [ ] Long messages (word wrap)
   - [ ] Error state (failed to send)
   - [ ] Offline state (if applicable)

**Output**:
```
✓ Polish Complete
  Accessibility: WCAG 2.1 AA compliant
  Responsive: Mobile/Tablet/Desktop verified
  Dark mode: Working
  Animations: Smooth, respects prefers-reduced-motion
```

---

## Stage 6: Quality Assurance

**Objective**: Validate UI enhancement meets standards.

**Checklist**:
- [ ] Chat button visible and clickable
- [ ] Window opens/closes smoothly
- [ ] Login gate shows for unauthenticated users
- [ ] Messages display with proper styling
- [ ] Timestamps formatted correctly
- [ ] Typing indicator animates
- [ ] Input accepts text and sends on Enter
- [ ] Auto-scroll works on new messages
- [ ] Responsive on mobile viewport
- [ ] Dark mode toggle works
- [ ] No console errors
- [ ] Keyboard navigation functional

**Output on Success**:
```
✓ Phase 3 UI Enhancement Complete!

  Chat Widget: Professional floating design
  Auth Gate: Login prompt with links
  Animations: Fade-in, typing dots, smooth transitions
  Responsive: Mobile + Desktop + Dark mode
  Accessibility: ARIA labels, keyboard nav

  Files Updated:
  - frontend/src/components/chat/ChatWidget.tsx
  - frontend/src/components/chat/ChatButton.tsx
  - [additional files...]

  Next Steps:
  - Test with real users
  - Gather feedback on UX
  - Consider additional features (file upload, emoji picker)
```

---

## Principles Summary

| Principle | Application |
|-----------|-------------|
| **Professional & Beautiful** | Clean typography, subtle animations, consistent with Phase II theme |
| **Accessible** | ARIA labels, keyboard navigation, screen reader support |
| **User-Centric** | Helpful messages, timestamps, smooth scroll, clear feedback |
| **Minimal Changes** | Enhance existing components; avoid full rebuilds |
| **Performance** | Lazy load chat, optimize animations, minimize bundle impact |

---

## When to Apply This Skill

Use `/sp.phase3` when:
- Basic chatbot implementation is complete
- User requests "enhance UI" or "polish chat"
- During `/sp.implement` if UI enhancement task is pending
- Chat is functional but lacks professional polish

**Prerequisites**:
- Phase 2 frontend running (Next.js)
- Basic chat component exists
- Authentication system in place

---

## Example Application

**User Request**: "Make the chat UI more professional like Intercom"

**Applying Phase 3 Skill**:

1. **Persona**: Senior frontend UI/UX designer – make it engaging and professional
2. **Assessment**: Found basic ChatWindow.tsx, needs polish
3. **Questions answered**:
   - Bottom-right floating ✓
   - Login gate with links ✓
   - Logo + timestamps + animations ✓
4. **Design**: Created 8-component structure
5. **Implementation**:
   - Added floating ChatButton with hover animation
   - Created ChatWindow with slide-up animation
   - Implemented LoginGate with friendly message
   - Enhanced ChatBubble with timestamps and fade-in
   - Added TypingIndicator with bouncing dots
6. **Polish**: Added dark mode, ARIA labels, responsive breakpoints

**Output**: Professional chat widget with floating button, conditional login message, animated messages, logo integration, and full accessibility support.
