---
name: sp.qa
description: Comprehensive project-wide quality assurance validation ensuring capability specifications, OOP design, automated code checks, CLI/UX quality, and professional coding standards are met
version: 1.0.0
---

# Quality Assurance Skill (sp.qa)

## Overview

The **sp.qa** skill provides comprehensive, automated quality assurance validation across all critical dimensions of software quality. It captures and enforces the quality standards established during successful development sessions, ensuring consistency, completeness, and professional excellence across the entire project lifecycle.

## When to Use

### Automatic Triggers

This skill should be invoked automatically in the following scenarios:

1. **Before Implementation Phase**
   - As a quality gate before executing `/sp.implement`
   - Validates that specifications and plans meet quality standards
   - Ensures all prerequisites are complete and conflict-free

2. **After Implementation Phase**
   - As a validation checkpoint after code completion
   - Before creating pull requests via `/sp.git.commit_pr`
   - Ensures implementation meets acceptance criteria and quality standards

3. **During Code Review**
   - As part of the PR review checklist
   - Before merging code into main branches
   - Validates that changes maintain quality standards

4. **At Phase Boundaries**
   - When transitioning between project phases (Phase I → Phase II, etc.)
   - Before releasing features to production
   - At scheduled quality checkpoints

### Manual Triggers

Developers can invoke the skill manually:

```bash
# Run QA on current feature context
/sp.qa

# Run QA on specific feature
/sp.qa <feature-name>

# Run QA with specific focus area
/sp.qa --focus=oop-design
/sp.qa --focus=cli-quality
/sp.qa --focus=specs
```

### When NOT to Use

- During initial brainstorming or exploratory sessions
- Before constitution and specifications are created
- When explicitly performing experimental/spike work
- During `/sp.constitution` or `/sp.specify` execution (these are prerequisites)

## Procedure

### Step 1: Context Loading and Prerequisites

**Actions:**
1. Run `.specify/scripts/bash/check-prerequisites.sh --json --include-tasks` from repository root
2. Parse JSON output to extract:
   - `FEATURE_DIR` (absolute path to current feature)
   - `AVAILABLE_DOCS` (list of available documentation)
   - Current phase/stage
3. Load required documents:
   - `constitution.md` (project principles - REQUIRED)
   - `spec.md` (capability specifications - REQUIRED)
   - `plan.md` (architectural decisions - IF EXISTS)
   - `tasks.md` (implementation tasks - IF EXISTS)
   - `data-model.md` (entity definitions - IF EXISTS)

**Output:**
```
✓ Context loaded
  Feature: phase-1
  Phase: implementation
  Documents: constitution.md, spec.md, plan.md, tasks.md
```

### Step 2: Capability Specification Validation

**Actions:**
1. **Naming Consistency Check:**
   - Verify feature names follow naming convention (kebab-case/camelCase/PascalCase)
   - Check API endpoints follow REST conventions (if applicable)
   - Validate class/module names follow language conventions
   - Ensure variable/function names are descriptive and consistent
   - Detect naming conflicts between capabilities

2. **Requirements Completeness Check:**
   - Verify each capability has explicit acceptance criteria
   - Validate input/output specifications are documented
   - Ensure error handling scenarios are specified
   - Confirm edge cases are identified
   - Check dependencies between capabilities are documented

3. **Specification Conflict Detection:**
   - Identify overlapping or duplicate capabilities
   - Check API contract consistency across features
   - Validate data models don't conflict
   - Ensure technical constraints are not contradictory

**Output:**
```
## Capability Specification Validation

### Naming Consistency: ✓ PASS
Issues found: 0

### Requirements Completeness: ✗ FAIL
Missing requirements: 2
- spec.md:45 - Delete todo feature missing error handling specification
- spec.md:67 - List todos missing pagination requirements

### Specification Conflicts: ✓ PASS
Conflicts detected: 0
```

### Step 3: Object-Oriented Design Validation

**Actions:**
1. **Class Structure Analysis:**
   - Scan source files in `/src` or equivalent directory
   - Check classes have single, clear responsibilities (SRP)
   - Verify proper encapsulation (private/public access modifiers)
   - Validate inheritance hierarchies (max 3 levels deep)
   - Ensure interfaces/abstractions are well-defined
   - Detect God objects (classes doing too much)

2. **SOLID Principles Enforcement:**
   - **S**ingle Responsibility: Each class has one reason to change
   - **O**pen/Closed: Classes open for extension, closed for modification
   - **L**iskov Substitution: Derived classes substitutable for base classes
   - **I**nterface Segregation: No client forced to depend on unused interfaces
   - **D**ependency Inversion: Depend on abstractions, not concretions

3. **Design Pattern Validation:**
   - Identify design patterns used (Factory, Strategy, Observer, etc.)
   - Verify patterns are not over-engineered or misapplied
   - Check separation of concerns (models, views, controllers/services)

4. **Code Smell Detection:**
   - Long methods (>50 lines)
   - Long parameter lists (>4 parameters)
   - Duplicate code
   - Complex conditionals (nested if/else >3 levels)
   - Magic numbers or hardcoded values

**Output:**
```
## OOP Design Validation

### Class Structure: ✓ PASS
Issues: 0

### SOLID Principles: ⚠ WARNINGS
Violations: 1
- src/todo_app/manager.py:45 - TodoManager class has multiple responsibilities (SRP violation): managing todos AND handling UI logic

### Design Patterns: ✓ PASS
Concerns: 0

### Code Smells: ⚠ WARNINGS
Detected: 2
- src/todo_app/main.py:78 - Long method `run_application` (65 lines) - consider extracting menu handling
- src/todo_app/models.py:12 - Magic number 100 - define as MAX_TODO_LENGTH constant
```

### Step 4: Automated Code QA Checks

**Actions:**
1. **Linting Configuration & Execution:**
   - Detect project language and linter (eslint, pylint, rubocop, etc.)
   - Verify configuration file exists (.eslintrc, .pylintrc, etc.)
   - Run linter: `[detected-linter-command]`
   - Check linting rules align with constitution coding standards
   - Verify pre-commit hooks configured (if applicable)

2. **Unit Test Coverage Analysis:**
   - Detect test framework (pytest, jest, rspec, etc.)
   - Verify unit tests exist for core business logic
   - Run tests: `[detected-test-command]`
   - Check coverage: `[coverage-command]`
   - Validate coverage meets threshold (from constitution or default 80%)
   - Ensure tests follow AAA pattern (Arrange, Act, Assert)
   - Verify mock/stub usage is appropriate
   - Confirm edge cases are tested

3. **Code Review Readiness:**
   - Check code is properly documented (docstrings, comments)
   - Verify commit messages are clear and descriptive
   - Scan for commented-out code blocks
   - Detect debug statements (console.log, print, etc.) in production code
   - Ensure README.md has setup and testing instructions

4. **Static Analysis (if tooling available):**
   - Run type checking (TypeScript, mypy, etc.)
   - Execute security scanning for critical vulnerabilities
   - Run dependency audit (npm audit, pip-audit, etc.)
   - Check code complexity metrics (cyclomatic complexity <10)

**Output:**
```
## Automated Code QA

### Linting: ✓ PASS
Linter: pylint
Errors: 0
Warnings: 3
- src/todo_app/utils.py:23 - Line too long (92/88)

### Unit Tests: ⚠ WARNINGS
Framework: pytest
Tests run: 15
Tests passed: 15
Tests failed: 0
Coverage: 75%
⚠ Coverage below threshold (80%)
Missing coverage:
- src/todo_app/ui.py:45-67 - error handling paths not tested

### Code Review Readiness: ✓ PASS
Issues: 0

### Static Analysis: ✓ PASS
Tool: mypy
Critical issues: 0
```

### Step 5: Console/CLI Interface Quality

**Actions:**
1. **User Experience Validation:**
   - Check for clear welcome/help message on startup
   - Verify menu options are numbered and understandable
   - Ensure input prompts are descriptive (not just ">")
   - Validate success messages confirm actions taken
   - Confirm application exits cleanly (no crashes)

2. **Error Handling Assessment:**
   - Test invalid input shows helpful error messages
   - Verify error messages explain what went wrong
   - Confirm error messages suggest corrective action
   - Validate application recovers gracefully from errors
   - Check edge cases are handled (empty input, out-of-range, invalid types)

3. **Input Validation Enforcement:**
   - Verify input types are validated (number vs string)
   - Check input ranges are validated (1-5 for menu, etc.)
   - Ensure required fields are enforced
   - Validate confirmation prompts for destructive actions (delete, etc.)

4. **Output Quality Assessment:**
   - Check output is formatted and readable (not raw data dumps)
   - Verify lists and tables are aligned
   - Validate colors/formatting used appropriately
   - Check progress indicators for long operations (if applicable)

**Testing Approach:**
- Run the application if executable is available
- Test each menu option with valid input
- Test with invalid inputs (wrong type, out of range, empty)
- Test edge cases (empty lists, boundary values)
- Test error recovery (can continue after errors)

**Output:**
```
## CLI/Console Interface Quality

### User Experience: ✓ PASS
Issues: 0

### Error Handling: ⚠ WARNINGS
Issues: 1
- Invalid menu choice (e.g., "7") shows error but message could be more helpful: "Invalid choice. Please enter a number between 1 and 5."

### Input Validation: ✓ PASS
Missing validations: 0

### Output Quality: ✓ PASS
Issues: 0
```

### Step 6: Professional Coding Standards

**Actions:**
1. **Documentation Completeness:**
   - Verify README.md exists with:
     - Project description
     - Setup instructions
     - Usage examples
     - Testing instructions
     - Contributing guidelines (if open source)
   - Check CLAUDE.md exists with development guidelines
   - Validate API documentation (if applicable)
   - Verify inline comments for complex logic
   - Ensure function/method docstrings

2. **Versioning Validation:**
   - Check version number defined (package.json, setup.py, VERSION file)
   - Verify version follows semantic versioning (MAJOR.MINOR.PATCH)
   - Check CHANGELOG.md exists (if multiple versions)
   - Validate Git tags for releases (if applicable)

3. **Clean Architecture Assessment:**
   - Verify clear folder structure matching language conventions
   - Check separation of concerns (models, views, controllers/services)
   - Ensure configuration externalized (not hardcoded)
   - Validate environment variables for secrets (.env with .env.example)
   - Verify dependencies properly declared (package.json, requirements.txt)

4. **Code Organization Review:**
   - Check files have clear, descriptive names
   - Verify related code grouped in modules/packages
   - Detect circular dependencies
   - Ensure consistent file structure across features
   - Validate utility/helper code properly separated

5. **Best Practices Enforcement:**
   - Scan for committed secrets (API keys, passwords)
   - Verify ignore files configured (.gitignore, .dockerignore, etc.)
   - Check license file present (if applicable)
   - Validate CI/CD configuration (if applicable)
   - Ensure security best practices followed (input sanitization, etc.)

**Output:**
```
## Professional Coding Standards

### Documentation: ⚠ WARNINGS
Missing: 2
- README.md:Testing section incomplete - missing test execution commands
- Missing docstrings: src/todo_app/manager.py:TodoManager.delete_todo()

### Versioning: ✓ PASS
Issues: 0

### Clean Architecture: ✓ PASS
Violations: 0

### Code Organization: ✓ PASS
Issues: 0

### Best Practices: ✓ PASS
Violations: 0
```

### Step 7: Constitution Compliance

**Actions:**
1. Cross-reference all findings with project constitution principles
2. Validate against each principle defined in `constitution.md`
3. Check for principle violations in code/specs
4. Verify quality gates are met
5. Confirm architectural constraints are followed

**Output:**
```
## Constitution Compliance

| Principle | Status | Notes |
|-----------|--------|-------|
| Test-First Development | ✓ PASS | All features have corresponding tests |
| Library-First Architecture | ✓ PASS | Clean separation maintained |
| CLI Interface Standards | ⚠ WARNINGS | Error messages could be more helpful (see CLI Quality section) |
| Observability | ✓ PASS | Structured output format compliant |
| Code Quality Standards | ⚠ WARNINGS | Coverage below 80% threshold |
```

### Step 8: Generate Overall QA Summary

**Actions:**
1. Aggregate all validation results
2. Calculate pass/fail/warning counts
3. Identify critical issues requiring immediate attention
4. Generate prioritized recommendations
5. Suggest next steps

**Output:**
```
# Quality Assurance Report
Generated: 2026-01-01 18:52:34 UTC
Feature: phase-1
Phase: implementation

## Executive Summary
Overall Status: ⚠ WARNINGS
Total Checks: 56
Passed: 48
Warnings: 8
Failed: 0

## Section Scores
1. Capability Specification: ✓ PASS (12/12)
2. OOP Design: ⚠ WARNINGS (16/18)
3. Automated QA: ⚠ WARNINGS (6/8)
4. CLI Quality: ⚠ WARNINGS (5/6)
5. Professional Standards: ⚠ WARNINGS (9/11)
6. Constitution Compliance: ⚠ WARNINGS (4/5)

## Critical Issues
None - All critical checks passed.

## Warnings Requiring Attention
1. Test coverage at 75% (target: 80%) - Add tests for error handling paths
2. SRP violation in TodoManager - Separate UI logic from business logic
3. Long method in main.py:78 - Extract menu handling logic
4. CLI error messages could be more descriptive
5. Missing docstring for TodoManager.delete_todo()
6. README.md testing section incomplete

## Recommendations (Priority Order)
1. **HIGH**: Increase test coverage to 80%+ by adding error path tests
2. **MEDIUM**: Refactor TodoManager to separate concerns (fix SRP violation)
3. **MEDIUM**: Extract menu handling from run_application() method
4. **LOW**: Enhance CLI error messages with specific guidance
5. **LOW**: Add missing docstrings
6. **LOW**: Complete README.md testing section

## Next Steps
1. Address HIGH priority items before proceeding to Phase II
2. Consider creating ADR for architecture refactoring (SRP fix)
3. Run `/sp.qa` again after fixes to validate improvements
4. Proceed with `/sp.git.commit_pr` once all warnings resolved
```

### Step 9: User Interaction

**Actions:**
Based on overall status, present appropriate prompt:

**✓ PASS Status:**
```
✓ Quality Assurance: PASSED

All quality checks passed! Your code meets professional standards.
Summary: 56/56 checks passed

Ready to proceed with next steps.
```

**⚠ WARNINGS Status:**
```
⚠ Quality Assurance: WARNINGS

Quality checks completed with 8 warnings (no failures).
Review recommended improvements above.

Options:
1. Review detailed report
2. Fix warnings now
3. Proceed anyway (warnings acceptable)
4. Exit

Your choice: _
```

**✗ FAIL Status:**
```
✗ Quality Assurance: FAILED

Critical issues found that must be addressed before proceeding.
Failed checks: 3/56

Options:
1. Review detailed report
2. Fix issues now (recommended)
3. Proceed anyway (NOT recommended - may cause downstream problems)
4. Exit

Your choice: _
```

### Step 10: PHR Creation

**Actions:**
1. Determine PHR stage based on context:
   - If run before implementation: `tasks`
   - If run after implementation: `green` or `refactor`
   - If run standalone: `misc`

2. Create PHR with:
   - **Title**: "Quality Assurance Validation for [feature-name]"
   - **Stage**: [determined stage]
   - **Routing**: `history/prompts/<feature-name>/` or `history/prompts/general/`
   - **PROMPT_TEXT**: User's `/sp.qa` command with arguments (verbatim)
   - **RESPONSE_TEXT**: QA report executive summary + critical issues/warnings
   - **FILES_YAML**: List of files validated
   - **TESTS_YAML**: List of tests executed (linter, test framework)

3. Validate PHR:
   - No unresolved placeholders
   - Path matches routing rules
   - All required fields populated

4. Report PHR creation:
```
✓ PHR created: 042-quality-assurance-validation-phase-1.misc.prompt.md
  Location: history/prompts/phase-1/
  Stage: misc
```

## Output Format

### Primary Output: QA Report

The skill generates a comprehensive, structured quality assurance report with the following sections:

1. **Executive Summary**: Overall status, total checks, pass/fail/warning counts
2. **Section Scores**: Detailed breakdown by quality dimension
3. **Critical Issues**: Blockers requiring immediate attention
4. **Warnings**: Issues requiring attention but not blocking
5. **Recommendations**: Prioritized list of improvements
6. **Next Steps**: Suggested actions based on findings

### Secondary Outputs

1. **Console Display**: Color-coded summary (if terminal supports)
2. **PHR**: Prompt History Record documenting the QA session
3. **Checklist Updates**: If checklists exist, update completion status
4. **Exit Code**: 0 (pass), 1 (warnings), 2 (fail) for automation integration

### Report Formats

**Terminal Display** (default):
```
# Quality Assurance Report
Generated: 2026-01-01 18:52:34 UTC

Executive Summary: ⚠ WARNINGS
Checks: 48/56 passed (8 warnings, 0 failures)

[Detailed sections as shown in Step 8]
```

**JSON Format** (for automation):
```bash
/sp.qa --format=json
```

```json
{
  "timestamp": "2026-01-01T18:52:34Z",
  "feature": "phase-1",
  "phase": "implementation",
  "overall_status": "warnings",
  "summary": {
    "total_checks": 56,
    "passed": 48,
    "warnings": 8,
    "failed": 0
  },
  "sections": {
    "capability_specification": {"passed": 12, "total": 12, "status": "pass"},
    "oop_design": {"passed": 16, "total": 18, "status": "warnings"},
    ...
  },
  "critical_issues": [],
  "warnings": [
    {
      "section": "oop_design",
      "severity": "medium",
      "message": "SRP violation in TodoManager",
      "file": "src/todo_app/manager.py",
      "line": 45,
      "recommendation": "Separate UI logic from business logic"
    },
    ...
  ],
  "recommendations": [...],
  "next_steps": [...]
}
```

## Example Usage

### Example 1: Pre-Implementation Quality Gate

**Input:**
```bash
# User is about to run /sp.implement but invokes QA first
/sp.qa phase-1
```

**Output:**
```
✓ Loading context for phase-1...
✓ Constitution: .specify/memory/constitution.md
✓ Specification: specs/phase-1/spec.md
✓ Plan: specs/phase-1/plan.md
✓ Tasks: specs/phase-1/tasks.md

Running Quality Assurance Validation...

[1/6] Capability Specification... ✗ FAIL
[2/6] OOP Design... (skipped - no code yet)
[3/6] Automated QA... (skipped - no code yet)
[4/6] CLI Quality... (skipped - no code yet)
[5/6] Professional Standards... ⚠ WARNINGS
[6/6] Constitution Compliance... ✓ PASS

# Quality Assurance Report
Generated: 2026-01-01 19:00:00 UTC

## Executive Summary
Overall Status: ✗ FAIL
Total Checks: 18 (pre-implementation)
Passed: 14
Warnings: 2
Failed: 2

## Critical Issues
1. spec.md:45 - Delete todo feature missing error handling specification
2. spec.md:67 - List todos missing pagination requirements

## Recommendations
1. **CRITICAL**: Update spec.md with complete error handling scenarios
2. **CRITICAL**: Define pagination requirements for list todos
3. **MEDIUM**: Add setup instructions to README.md
4. **LOW**: Create .env.example file

## Next Steps
Fix critical specification issues before running /sp.implement.
Run `/sp.clarify` to resolve underspecified areas.

✗ Quality gate: FAILED
Cannot proceed with implementation until critical issues are resolved.
```

### Example 2: Post-Implementation Validation

**Input:**
```bash
# User has completed implementation and wants to validate before PR
/sp.qa
```

**Output:**
```
✓ Loading context for phase-1...
✓ Detected Python 3.13 project with pytest

Running Quality Assurance Validation...

[1/6] Capability Specification... ✓ PASS
[2/6] OOP Design... ⚠ WARNINGS (2 issues)
[3/6] Automated QA... ⚠ WARNINGS (2 issues)
[4/6] CLI Quality... ✓ PASS
[5/6] Professional Standards... ⚠ WARNINGS (2 issues)
[6/6] Constitution Compliance... ⚠ WARNINGS (1 issue)

# Quality Assurance Report
Generated: 2026-01-01 19:15:00 UTC
Feature: phase-1
Phase: implementation

## Executive Summary
Overall Status: ⚠ WARNINGS
Total Checks: 56
Passed: 48
Warnings: 8
Failed: 0

## Section Scores
1. Capability Specification: ✓ PASS (12/12)
2. OOP Design: ⚠ WARNINGS (16/18)
3. Automated QA: ⚠ WARNINGS (6/8)
4. CLI Quality: ✓ PASS (6/6)
5. Professional Standards: ⚠ WARNINGS (9/11)
6. Constitution Compliance: ⚠ WARNINGS (4/5)

## Critical Issues
None

## Warnings Requiring Attention
1. Test coverage at 75% (target: 80%)
2. SRP violation in TodoManager class
3. Long method in main.py:78 (65 lines)
4. CLI error messages could be more descriptive
5. Missing docstring: TodoManager.delete_todo()
6. README.md testing section incomplete
7. Magic number 100 in models.py:12
8. Pylint warning: Line too long in utils.py:23

## Recommendations (Priority Order)
1. **HIGH**: Increase test coverage to 80%+ (currently 75%)
   - Add tests for error handling in ui.py:45-67
   - Add edge case tests for empty todo lists

2. **MEDIUM**: Refactor TodoManager to fix SRP violation
   - Extract UI concerns to ui.py
   - Keep business logic in manager.py
   - Consider creating ADR: `/sp.adr todo-manager-refactoring`

3. **MEDIUM**: Extract menu handling from run_application()
   - Create separate handle_menu_choice() method
   - Reduces method from 65 lines to ~20 lines

4. **LOW**: Improve CLI error messages
   - Add specific guidance (e.g., "Please enter 1-5")
   - Include examples in error messages

5. **LOW**: Add missing docstrings (1 found)
6. **LOW**: Complete README.md testing section
7. **LOW**: Replace magic number with named constant
8. **LOW**: Fix line length in utils.py:23

## Next Steps
1. Address HIGH priority items (test coverage)
2. Consider addressing MEDIUM items before PR
3. LOW items can be addressed in follow-up PR
4. Run `/sp.qa` again after fixes
5. Ready for `/sp.git.commit_pr` once satisfied with quality

⚠ Quality validation: PASSED WITH WARNINGS

Your code is functional and meets minimum standards, but improvements
recommended before merging.

Options:
1. Review detailed report above
2. Fix warnings now
3. Proceed to PR (warnings acceptable)
4. Exit

Your choice: _
```

### Example 3: Focused QA Check

**Input:**
```bash
# User wants to validate only OOP design after refactoring
/sp.qa --focus=oop-design
```

**Output:**
```
✓ Loading context for phase-1...
✓ Running focused QA check: OOP Design

[1/1] OOP Design Validation...

## OOP Design Validation

### Class Structure: ✓ PASS
Issues: 0

All classes have single, clear responsibilities.
Proper encapsulation with private/public methods.
Inheritance hierarchy: 2 levels (within limit).
Interfaces well-defined.

### SOLID Principles: ✓ PASS
Violations: 0

✓ Single Responsibility: Each class has one clear purpose
✓ Open/Closed: Classes extensible without modification
✓ Liskov Substitution: Derived classes properly substitutable
✓ Interface Segregation: No forced dependencies on unused interfaces
✓ Dependency Inversion: Depends on abstractions (TodoInterface)

### Design Patterns: ✓ PASS
Concerns: 0

Identified patterns:
- Factory pattern for Todo creation (appropriate)
- Strategy pattern for display formatting (appropriate)
- Clear MVC separation (models, ui, manager)

### Code Smells: ✓ PASS
Detected: 0

No long methods, duplicate code, or magic numbers found.

## Summary
OOP Design: ✓ PASS (18/18 checks passed)

Excellent object-oriented design! Code follows SOLID principles
and industry best practices.

✓ Refactoring successful - OOP quality improved.
```

## Integration Points

### Workflow Commands
- **Before `/sp.implement`**: Quality gate for specifications and plans
- **After implementation**: Validation before commits/PRs
- **With `/sp.git.commit_pr`**: Automatic QA check before PR creation
- **With `/sp.analyze`**: Cross-artifact consistency validation

### Agent Coordination
- **project-architect**: QA results inform workflow gate decisions
- **phase1-builder**: QA validates Phase I deliverables
- **Future phase agents**: QA ensures phase transition readiness

### Automation Integration
- **CI/CD Pipelines**: JSON output format for automated checks
- **Pre-commit Hooks**: Run focused QA checks before commits
- **PR Templates**: Include QA report in PR descriptions
- **Quality Dashboards**: Export metrics for tracking over time

## Notes

- **Non-destructive**: Read-only operation, never modifies code
- **Language-agnostic**: Adapts to detected technology stack
- **Constitution-aware**: Validates against project-specific principles
- **Extensible**: Can add custom quality checks per project
- **Performance**: Caches results to avoid redundant checks
- **Graceful degradation**: Works even if some tools unavailable

---

**Version**: 1.0.0
**Created**: 2026-01-01
**Last Updated**: 2026-01-01
**Maintainer**: Claude Code + Spec-Kit Plus
