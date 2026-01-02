<!--
SYNC IMPACT REPORT
===================
Version Change: [INITIAL] → 1.0.0

Modified Principles: None (new constitution)

Added Sections:
- Core Principles (6 principles defined)
- Technical Constraints
- Success Criteria

Removed Sections: None

Templates Requiring Updates:
✅ .specify/templates/plan-template.md - Aligned with Spec-Kit Plus workflow
✅ .specify/templates/spec-template.md - Aligned with in-memory constraints
✅ .specify/templates/tasks-template.md - Aligned with TDD requirements
✅ .claude/commands/sp.phase1.md - Aligned with 6 core principles
✅ .claude/commands/sp.qa.md - Aligned with CLI UX quality checks

Follow-up TODOs: None
-->

# The Evolution of Todo Constitution

## Core Principles

### I. Spec-Driven Development Only

All code MUST be generated exclusively through the Spec-Kit Plus workflow. Manual
coding is strictly prohibited. Development MUST follow the complete sequential
workflow: Constitution → Specify → Clarify → Plan → Tasks → Implement → QA.

Rationale: Ensures deterministic, reproducible output and maintains traceability
across all development activities.

### II. Deterministic and Reproducible Output

All development activities MUST produce deterministic and reproducible results. Code
generation, test execution, and documentation MUST be consistent across multiple
runs with identical inputs. No randomness or non-deterministic behavior in
critical paths.

Rationale: Enables predictable development, reliable testing, and clear audit
trails for hackathon evaluation.

### III. Clean Architecture and Readable CLI UX

All code MUST follow clean architecture with clear separation of concerns:
models (data), services (business logic), and CLI (user interface).
The CLI interface MUST be user-friendly, with clear prompts, helpful error
messages, and no confusing output.

Rationale: Ensures maintainable, understandable codebase and excellent user
experience for console-based interaction.

### IV. Minimal but Complete MVP Functionality

Focus on minimal viable product (MVP) with complete, working features.
All 5 basic todo features (Add, Delete, Update, View, Mark Complete) MUST
be fully functional. Avoid feature creep and unnecessary complexity.

Rationale: Delivers immediate value while establishing solid foundation for future
phases.

### V. User-Friendly and Error-Safe CLI Interaction

CLI interaction MUST be user-friendly and error-safe. All inputs MUST be
validated with clear error messages that explain the problem AND suggest corrective
action. The application MUST NOT crash on invalid input.

Rationale: Provides professional user experience and prevents frustration from cryptic
errors or unexpected crashes.

### VI. Python Code Quality Standards

All Python source code MUST follow readable structure with clear naming conventions.
All classes, functions, and modules MUST include docstrings. Complex logic MUST
include inline comments for clarity. Code MUST follow PEP 8 style guidelines.

Rationale: Ensures maintainability, readability, and professional code quality
for hackathon evaluation.

## Technical Constraints

Technology Stack Requirements:
- **Language**: Python 3.13+ ONLY
- **Package Manager**: UV (exclusively for dependency management)
- **Interface**: Command-line (console) - NO web frameworks
- **Storage**: In-memory ONLY - NO external databases or file persistence
- **Documentation**: README.md and CLAUDE.md MUST exist with usage and workflow
  notes

Development Constraints:
- **Code Generation**: Python code MUST be generated exclusively by Claude Code via
  Spec-Kit Plus workflow - NO manual coding allowed
- **Separation of Concerns**: Clear separation required between models (data),
  services (business logic), and CLI (user interface)
- **Persistence**: All logic runs in memory - NO database, NO file persistence,
  NO external storage of any kind

## Success Criteria

Phase I - In-Memory Python Console Todo Application MUST meet ALL criteria:

**Functional Requirements**:
- Five basic todo features work correctly via console commands:
  - Add: Create new todos with user-provided description
  - View: List all todos with completion status
  - Mark Complete: Toggle todo completion status
  - Update: Modify existing todo descriptions
  - Delete: Remove todos from the list
- All operations provide confirmation output to user
- Error handling is graceful with helpful error messages

**Structural Requirements**:
- Project structure is clean and logical following Python conventions
- Clear separation of concerns (models, services, CLI)
- All modules properly organized under `/src` directory
- Documentation present (README.md, CLAUDE.md, docstrings)

**Quality Requirements**:
- Code follows PEP 8 style guidelines
- All functions/classes have appropriate docstrings
- CLI interaction is user-friendly with clear prompts
- No confusing output or cryptic error messages
- Application is error-safe (doesn't crash on invalid input)

**Evaluation Readiness**:
- Repository is review-ready for hackathon evaluation
- All spec documents complete (constitution, spec, plan, tasks)
- Implementation follows Spec-Kit Plus workflow without skipping steps
- Quality assurance validation passed

## Governance

**Constitution Authority**:
This constitution supersedes all other development practices and guidelines. All
development activities MUST comply with stated principles, constraints, and success
criteria.

**Amendment Procedure**:
- Amendments require documentation of rationale and impact analysis
- Version MUST be updated according to semantic versioning:
  - MAJOR: Backward incompatible changes, principle removal, or redefinition
  - MINOR: New principle/section added or material guidance expansion
  - PATCH: Clarifications, wording fixes, non-semantic refinements
- Amendment date MUST be updated as ISO format (YYYY-MM-DD)
- Dependent templates and documentation MUST be reviewed for consistency

**Compliance Review**:
- All pull requests and reviews MUST verify constitution compliance
- Complexity MUST be justified if it contradicts "Minimal but Complete"
principle
- Any deviation from Spec-Kit Plus workflow requires documented approval

**Runtime Development Guidance**:
For runtime development guidance, refer to:
- CLAUDE.md in repository root for project-specific instructions
- Spec-Kit Plus workflow commands (.claude/commands/sp.*)
- Phase-specific agents (.claude/agents/*)
- Skills documentation (.claude/skills/*.SKILL.md)

**Version**: 1.0.0 | **Ratified**: 2026-01-01 | **Last Amended**: 2026-01-01
