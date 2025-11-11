<context_session_file>
#$ARGUMENTS
</context_session_file>

# Task: Create New VCS Task for Feature
# This command is now agnostic and reads CLAUDE.md

## Input
Feature Plan: $ARGUMENTS (Path to context_session.md)

## Phase 1: Constitution & Setup (NEW)
1.  **Read the Constitution:** Read and parse `CLAUDE.md` to extract:
    * `[methodology].vcs_provider` (e.g., "GitHub", "GitLab")
2.  **VCS Tool Setup:**
    * Set `VCS_CLI` variable based on the provider.
    * `if [vcs_provider] == "GitHub"`: `VCS_CLI="gh"`
    * `else if [vcs_provider] == "GitLab"`: `VCS_CLI="glab"`
    * `else`: `VCS_CLI="gh"` (Default to GitHub CLI if unspecified, but log a warning)

## Phase 2: Analysis
- Analyze the feature/bug/chore plan from the `$ARGUMENTS` file.
- Look at relevant plans (`backend.md`, `frontend.md`, `security_plan.md`) to synthesize the full scope.

## Phase 3: Draft Task
Create an issue/task body with this structure:

### Problem Statement
What problem does this solve? What are current limitations?

### User Value
What specific benefits will users get? Give concrete examples.

### Definition of Done
- Implementation complete with edge cases handled
- Unit tests added (per `## Testing Requirements` policy)
- Integration tests for main flows
- Security plan from `@security-architect` addressed
- QA validation from `@acceptance-validator` passed
- CI/CD passes
- Manual testing complete

### Manual Testing Checklist
- Basic flow: [specific steps]
- Edge case testing: [specific scenarios]
- Error handling: [error scenarios to test]
- Security: [check for OWASP Top 10 items from security_plan.md]

## Phase 4: Review
Show me (Daniel) the complete task draft (title and body) and ask: "Is this ready to create? Any changes needed?"

Wait for my approval.

## Phase 5: Create Task (REFACTORED)
After approval, run the dynamic command using the `$VCS_CLI` variable:

```bash
# (Assume TITLE and BODY variables are set from the draft in Phase 3)
$VCS_CLI issue create --title "$TITLE" --body "$BODY"

Tell me the new issue number and URL when done.

Phase 6: Reminders
Remember to triage and use the correct term in the issue title: [Feature], [Bug], or [Chore].

Make testing steps concrete and actionable.