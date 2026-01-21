---
description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Backend**: `backend/src/`, `backend/tests/`
- **Frontend**: `frontend/src/`, `frontend/tests/`
- **Specs**: `specs/`

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /sp.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize [backend language] project with [framework] dependencies
- [ ] T003 Initialize [frontend language] project with [framework] dependencies
- [ ] T004 [P] Configure linting and formatting tools

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T005 Setup database schema and migrations framework
- [ ] T006 [P] Implement authentication/authorization framework
- [ ] T007 [P] Setup API routing and middleware structure
- [ ] T008 [P] Setup frontend routing and layout
- [ ] T009 Create base models/entities that all stories depend on
- [ ] T010 Configure error handling and logging infrastructure
- [ ] T011 Setup environment configuration management

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T012 [P] [US1] Contract test for [endpoint] in backend/tests/test_[name].py
- [ ] T013 [P] [US1] Frontend component test in frontend/tests/test_[name].tsx

### Implementation for User Story 1

- [ ] T014 [P] [US1] Create [Entity1] model in backend/src/models/[entity1].py
- [ ] T015 [US1] Implement [Service] in backend/src/services/[service].py
- [ ] T016 [US1] Implement [endpoint/feature] in backend/src/api/[file].py
- [ ] T017 [US1] Create frontend API client method in frontend/src/lib/api.ts
- [ ] T018 [US1] Create frontend component in frontend/src/components/[Component].tsx
- [ ] T019 [US1] Add validation and error handling
- [ ] T020 [US1] Integrate backend and frontend

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T021 [P] [US2] Contract test for [endpoint] in backend/tests/test_[name].py
- [ ] T022 [P] [US2] Frontend test in frontend/tests/test_[name].tsx

### Implementation for User Story 2

- [ ] T023 [P] [US2] Create [Entity] model in backend/src/models/[entity].py
- [ ] T024 [US2] Implement [Service] in backend/src/services/[service].py
- [ ] T025 [US2] Implement [endpoint/feature] in backend/src/api/[file].py
- [ ] T026 [US2] Create frontend component in frontend/src/components/[Component].tsx
- [ ] T027 [US2] Integrate with User Story 1 components (if needed)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Additional unit tests (if requested)
- [ ] TXXX Security hardening
- [ ] TXXX Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Can start after Foundational (Phase 2)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2)

### Within Each User Story

1. Backend Models & Migrations
2. Backend Services & Logic
3. Backend API Endpoints
4. Frontend API Client
5. Frontend Components
6. Integration

### Parallel Opportunities

- Backend and Frontend Setup can run in parallel
- Once Foundational is done, User Stories can run in parallel
- Within a story, Frontend UI (mocked) and Backend API can proceed in parallel once contract is defined
