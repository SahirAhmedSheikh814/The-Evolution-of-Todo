---
description: Execute comprehensive project-wide quality assurance validation to ensure capability specifications, OOP design, automated code checks, CLI/UX quality, and professional coding standards are met
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

### 1. Context Loading

Run `.specify/scripts/bash/check-prerequisites.sh --json --include-tasks` from repo root and parse:
- FEATURE_DIR (absolute path)
- AVAILABLE_DOCS list
- Current phase/stage

Load and analyze:
- **REQUIRED**: constitution.md for project principles
- **REQUIRED**: spec.md for capability specifications
- **IF EXISTS**: plan.md for architectural decisions
- **IF EXISTS**: tasks.md for implementation tasks
- **IF EXISTS**: data-model.md for entity definitions

### 2. Capability Specification Validation

**Objective**: Ensure all capability specifications are thoroughly validated with consistent naming, complete requirements, and no conflicts.

**Validation Checks**:

a) **Naming Consistency**:
   - [ ] Feature names follow consistent naming convention (kebab-case, camelCase, or PascalCase as defined in constitution)
   - [ ] API endpoints follow REST conventions (if applicable)
   - [ ] Class/module names follow language conventions
   - [ ] Variable/function names are descriptive and consistent
   - [ ] No naming conflicts between capabilities

b) **Requirements Completeness**:
   - [ ] Each capability has clear acceptance criteria
   - [ ] Input/output specifications are explicit
   - [ ] Error handling scenarios are documented
   - [ ] Edge cases are identified and addressed
   - [ ] Dependencies between capabilities are documented

c) **Specification Conflicts**:
   - [ ] No overlapping or duplicate capabilities
   - [ ] API contracts are consistent across features
   - [ ] Data models don't conflict between specifications
   - [ ] Technical constraints are not contradictory

**Report Format**:
```
## Capability Specification Validation

### Naming Consistency: [✓ PASS | ✗ FAIL]
Issues found: [count]
- [List specific naming issues]

### Requirements Completeness: [✓ PASS | ✗ FAIL]
Missing requirements: [count]
- [List incomplete specifications]

### Specification Conflicts: [✓ PASS | ✗ FAIL]
Conflicts detected: [count]
- [List conflicts with resolution suggestions]
```

### 3. Object-Oriented Design Validation

**Objective**: Ensure code follows OOP design principles and industry standards with clear classes, SOLID principles, and proper encapsulation.

**Validation Checks**:

a) **Class Structure** (examine source files in /src or equivalent):
   - [ ] Classes have single, clear responsibilities (SRP)
   - [ ] Proper encapsulation (private/public access modifiers)
   - [ ] Inheritance hierarchies are logical and not too deep (max 3 levels)
   - [ ] Interfaces/abstractions are well-defined
   - [ ] No God objects (classes doing too much)

b) **SOLID Principles**:
   - [ ] **S**ingle Responsibility: Each class has one reason to change
   - [ ] **O**pen/Closed: Classes open for extension, closed for modification
   - [ ] **L**iskov Substitution: Derived classes substitutable for base classes
   - [ ] **I**nterface Segregation: No client forced to depend on unused interfaces
   - [ ] **D**ependency Inversion: Depend on abstractions, not concretions

c) **Design Patterns**:
   - [ ] Appropriate patterns used (Factory, Strategy, Observer, etc.)
   - [ ] Patterns not over-engineered or misapplied
   - [ ] Clear separation of concerns (models, views, controllers/services)

d) **Code Smell Detection**:
   - [ ] No long methods (>50 lines)
   - [ ] No long parameter lists (>4 parameters)
   - [ ] No duplicate code
   - [ ] No complex conditionals (nested if/else >3 levels)
   - [ ] No magic numbers or hardcoded values

**Report Format**:
```
## OOP Design Validation

### Class Structure: [✓ PASS | ✗ FAIL]
Issues: [count]
- [List problematic classes with file:line references]

### SOLID Principles: [✓ PASS | ✗ FAIL]
Violations: [count]
- [List SOLID violations with specific examples]

### Design Patterns: [✓ PASS | ✗ FAIL]
Concerns: [count]
- [List pattern misuse or missing patterns]

### Code Smells: [✓ PASS | ✗ FAIL]
Detected: [count]
- [List code smells with refactoring suggestions]
```

### 4. Automated Code QA Checks

**Objective**: Ensure automated code quality checks are in place including linting, unit tests, and code reviews.

**Validation Checks**:

a) **Linting Configuration**:
   - [ ] Linter configured for the project language (eslint, pylint, rubocop, etc.)
   - [ ] Configuration file present (.eslintrc, .pylintrc, etc.)
   - [ ] No linting errors in source code
   - [ ] Linting rules align with constitution coding standards
   - [ ] Pre-commit hooks configured (if applicable)

b) **Unit Test Coverage**:
   - [ ] Test framework configured (pytest, jest, rspec, etc.)
   - [ ] Unit tests exist for core business logic
   - [ ] Test coverage meets threshold (check constitution or default to 80%)
   - [ ] Tests follow AAA pattern (Arrange, Act, Assert)
   - [ ] Mock/stub usage is appropriate
   - [ ] Edge cases are tested

c) **Code Review Readiness**:
   - [ ] Code is properly documented (docstrings, comments where needed)
   - [ ] Commit messages are clear and descriptive
   - [ ] No commented-out code blocks
   - [ ] No debug statements (console.log, print, etc.) in production code
   - [ ] README.md has setup and testing instructions

d) **Static Analysis** (if tooling available):
   - [ ] Type checking passes (TypeScript, mypy, etc.)
   - [ ] Security scanning shows no critical vulnerabilities
   - [ ] Dependency audit passes (npm audit, pip-audit, etc.)
   - [ ] Code complexity metrics are reasonable (cyclomatic complexity <10)

**Execution Steps**:
1. Detect project language and technology from plan.md or file structure
2. Check for linter configuration files
3. Run linter: `[detected-linter-command]` (e.g., `npm run lint`, `pylint src/`, etc.)
4. Check for test framework files (package.json scripts, pytest.ini, etc.)
5. Run tests: `[detected-test-command]` (e.g., `npm test`, `pytest`, etc.)
6. Check test coverage: `[coverage-command]` (e.g., `npm run coverage`, `pytest --cov`, etc.)
7. Scan for code review issues using grep/glob

**Report Format**:
```
## Automated Code QA

### Linting: [✓ PASS | ✗ FAIL]
Linter: [detected-linter]
Errors: [count]
Warnings: [count]
- [List critical linting issues]

### Unit Tests: [✓ PASS | ✗ FAIL]
Framework: [detected-framework]
Tests run: [count]
Tests passed: [count]
Tests failed: [count]
Coverage: [percentage]%
- [List failed tests]

### Code Review Readiness: [✓ PASS | ✗ FAIL]
Issues: [count]
- [List documentation/cleanliness issues]

### Static Analysis: [✓ PASS | ✗ FAIL]
Tool: [tool-name]
Critical issues: [count]
- [List critical findings]
```

### 5. Console/CLI Interface Quality

**Objective**: Ensure the console/CLI interface is user-friendly and error-resistant with clear prompts and helpful error messages.

**Validation Checks**:

a) **User Experience**:
   - [ ] Clear welcome/help message on startup
   - [ ] Menu options are numbered and easy to understand
   - [ ] Input prompts are descriptive (not just ">")
   - [ ] Success messages confirm actions taken
   - [ ] Application exits cleanly (not crashes)

b) **Error Handling**:
   - [ ] Invalid input shows helpful error message
   - [ ] Error messages explain what went wrong
   - [ ] Error messages suggest corrective action
   - [ ] Application recovers gracefully from errors (doesn't crash)
   - [ ] Edge cases handled (empty input, out-of-range, invalid types)

c) **Input Validation**:
   - [ ] Input types are validated (number vs string)
   - [ ] Input ranges are validated (1-5 for menu, etc.)
   - [ ] Required fields are enforced
   - [ ] Confirmation prompts for destructive actions (delete, etc.)

d) **Output Quality**:
   - [ ] Output is formatted and readable (not raw data dumps)
   - [ ] Lists and tables are aligned
   - [ ] Colors/formatting used appropriately (if terminal supports)
   - [ ] Progress indicators for long operations (if applicable)

**Testing Approach**:
1. Run the application if executable is available
2. Test each menu option with valid input
3. Test with invalid inputs (wrong type, out of range, empty)
4. Test edge cases (empty lists, boundary values)
5. Test error recovery (can continue after errors)

**Report Format**:
```
## CLI/Console Interface Quality

### User Experience: [✓ PASS | ✗ FAIL]
Issues: [count]
- [List UX problems with examples]

### Error Handling: [✓ PASS | ✗ FAIL]
Issues: [count]
- [List error handling gaps]

### Input Validation: [✓ PASS | ✗ FAIL]
Missing validations: [count]
- [List unvalidated inputs]

### Output Quality: [✓ PASS | ✗ FAIL]
Issues: [count]
- [List formatting/readability issues]
```

### 6. Professional Coding Standards

**Objective**: Ensure adherence to professional coding practices including documentation, versioning, and clean architecture.

**Validation Checks**:

a) **Documentation**:
   - [ ] README.md exists with:
     - [ ] Project description
     - [ ] Setup instructions
     - [ ] Usage examples
     - [ ] Testing instructions
     - [ ] Contributing guidelines (if open source)
   - [ ] CLAUDE.md exists with development guidelines
   - [ ] API documentation (if applicable)
   - [ ] Inline comments for complex logic
   - [ ] Function/method docstrings

b) **Versioning**:
   - [ ] Version number defined (package.json, setup.py, VERSION file, etc.)
   - [ ] Version follows semantic versioning (MAJOR.MINOR.PATCH)
   - [ ] CHANGELOG.md exists (if multiple versions)
   - [ ] Git tags for releases (if applicable)

c) **Clean Architecture**:
   - [ ] Clear folder structure matching language conventions
   - [ ] Separation of concerns (models, views, controllers/services)
   - [ ] Configuration externalized (not hardcoded)
   - [ ] Environment variables for secrets (.env file with .env.example)
   - [ ] Dependencies properly declared (package.json, requirements.txt, etc.)

d) **Code Organization**:
   - [ ] Files have clear, descriptive names
   - [ ] Related code grouped in modules/packages
   - [ ] No circular dependencies
   - [ ] Consistent file structure across features
   - [ ] Utility/helper code properly separated

e) **Best Practices**:
   - [ ] No secrets committed (scan for API keys, passwords)
   - [ ] Ignore files configured (.gitignore, .dockerignore, etc.)
   - [ ] License file present (if applicable)
   - [ ] CI/CD configuration (if applicable)
   - [ ] Security best practices followed (input sanitization, etc.)

**Report Format**:
```
## Professional Coding Standards

### Documentation: [✓ PASS | ✗ FAIL]
Missing: [count]
- [List missing or incomplete documentation]

### Versioning: [✓ PASS | ✗ FAIL]
Issues: [count]
- [List versioning problems]

### Clean Architecture: [✓ PASS | ✗ FAIL]
Violations: [count]
- [List architectural issues]

### Code Organization: [✓ PASS | ✗ FAIL]
Issues: [count]
- [List organizational problems]

### Best Practices: [✓ PASS | ✗ FAIL]
Violations: [count]
- [List security/quality issues]
```

### 7. Constitution Compliance

Cross-reference all findings with project constitution principles:
- [ ] Validate against each principle defined in constitution.md
- [ ] Check for principle violations in code/specs
- [ ] Verify quality gates are met
- [ ] Confirm architectural constraints are followed

**Report Format**:
```
## Constitution Compliance

| Principle | Status | Notes |
|-----------|--------|-------|
| [Principle 1] | [✓ PASS / ✗ FAIL] | [Violations or "Compliant"] |
| [Principle 2] | [✓ PASS / ✗ FAIL] | [Violations or "Compliant"] |
...
```

### 8. Overall QA Summary

Generate final report:

```
# Quality Assurance Report
Generated: [timestamp]
Feature: [feature-name]
Phase: [current-phase]

## Executive Summary
Overall Status: [✓ PASS | ⚠ WARNINGS | ✗ FAIL]
Total Checks: [count]
Passed: [count]
Failed: [count]

## Section Scores
1. Capability Specification: [✓/✗] ([passed]/[total])
2. OOP Design: [✓/✗] ([passed]/[total])
3. Automated QA: [✓/✗] ([passed]/[total])
4. CLI Quality: [✓/✗] ([passed]/[total])
5. Professional Standards: [✓/✗] ([passed]/[total])
6. Constitution Compliance: [✓/✗] ([passed]/[total])

## Critical Issues
[List all FAIL items that must be addressed]

## Recommendations
[Prioritized list of improvements]

## Next Steps
[Suggested actions to resolve issues]
```

### 9. User Interaction

Based on overall status:

- **✓ PASS**: Display summary and congratulate on quality standards
- **⚠ WARNINGS**: Display warnings and ask if user wants to proceed or fix issues
- **✗ FAIL**: Display critical issues and recommend fixing before proceeding

Ask:
```
QA validation complete. [X] critical issues found.

Options:
1. Review detailed report
2. Fix issues now
3. Proceed anyway (not recommended)
4. Exit

Your choice:
```

### 10. Integration with Workflow

This skill can be invoked:
- **Manually**: `/sp.qa` or `/sp.qa [feature-name]`
- **Before implementation**: As a quality gate before `/sp.implement`
- **After implementation**: As a validation step before `/sp.git.commit_pr`
- **During code review**: As part of PR checklist

### 11. PHR Creation

After completing QA validation, create a PHR:

1) **Stage**: Determine based on context:
   - If run before implementation: `tasks`
   - If run after implementation: `green` or `refactor`
   - If run standalone: `misc`

2) **Title**: "Quality Assurance Validation for [feature-name]"

3) **Routing**: `history/prompts/<feature-name>/` or `history/prompts/general/`

4) **Content**:
   - PROMPT_TEXT: User's `/sp.qa` command with arguments
   - RESPONSE_TEXT: QA report summary (executive summary + critical issues)
   - FILES_YAML: List of files validated
   - TESTS_YAML: List of tests run (linter, test framework)

5) **Validation**: Ensure no unresolved placeholders, path matches route

6) **Report**: Print PHR ID, path, stage, title

---

## Notes

- This skill is **non-destructive** - it only reads and reports, never modifies code
- Can be run at any stage of development
- Designed to complement, not replace, other workflow commands
- Results are advisory - user decides next steps
- Integrates with constitution principles for project-specific standards
- Language-agnostic - adapts to detected technology stack

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) as described in step 11.
