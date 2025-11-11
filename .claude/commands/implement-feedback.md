# 
# Task: Implement Feedback Loop
# Argument: $ARGUMENT$ (e.g., Issue or PR number)
#
# This command is invoked by `dynamic-qa-validator` when a validation fails.
# It reads the feedback, fixes the code, and pushes the fix.
#

## Phase 1: Constitution & Setup (NEW)
1.  **Read the Constitution:** Read and parse `CLAUDE.md` to extract:
    * `[methodology].workflow` (e.g., "TDD", "RAD")
    * `[methodology].vcs_provider` (e.g., "GitHub")
    * `## Testing Requirements`
2.  **Set Variables:**
    * `WORKFLOW = [methodology].workflow`
    * `VCS_CLI = "gh"` (if GitHub) or `"glab"` (if GitLab)
3.  **Fetch Latest:** `git fetch origin`
4.  **Ensure Worktree:** (Assume we are already in the correct git worktree, as this is part of an ongoing process).

## Phase 2: Analysis Phase
1.  **Get Feedback:** Read the full PR/Issue content and ALL comments using:
    * `$VCS_CLI pr view $ARGUMENT$ --comments`
2.  **Identify Failures:**
    * Analyze the feedback from `@acceptance-validator` and `@security-architect`.
    * Create a specific, actionable plan to address *only* the reported failures.

## Phase 3: Implementation Cycle (REFACTORED)
# Execute the plan based on the project's defined workflow.
# The goal is to fix the bug and add a test to prevent regression.

# CASE 1: TDD (Test-Driven Development)
if `WORKFLOW == "TDD"`:
    print("Executing TDD fix cycle...")
    1.  **Write Failing Test:** Invoke `@implementation-test-engineer` to write a new failing test that *specifically reproduces the reported bug*.
    2.  **Run Tests (Expect Fail):** Confirm the new test fails.
    3.  **Write Fix:** Implement the *minimum* code required to fix the bug.
    4.  **Run Tests (Expect Pass):** Run the full test suite until all tests pass.

# CASE 2: Other Workflows (RAD, Standard)
else:
    print("Executing Standard fix cycle...")
    1.  **Write Fix:** Implement the code to fix the bug.
    2.  **Write Regression Test:** Invoke `@implementation-test-engineer` to write a new test that *proves* the bug is fixed and prevents regression.
    3.  **Run Tests (Expect Pass):** Run the full test suite.

## Phase 4: Finalize & Handoff (REFACTORED)
1.  **Run Local Checks:** Run local builds and the full test suite.
2.  **Commit & Push:**
    * `git add .`
    * `git commit -m "fix: Address QA/Security feedback"`
    * `git push`
3.  **Handoff to CI/CD:**
    * Post a comment to the PR using `$VCS_CLI`:
    * `"$VCS_CLI pr comment $ARGUMENT$ --body "Daniel, I have implemented the feedback and pushed the fixes. Handing off to the CI/CD pipeline for re-validation."`

## Rules
* You MUST address me as "Daniel".
* You MUST obey the "NO EXCEPTIONS" policy from `## Testing Requirements` (a new test for the bug is required).
* Your job ends when the fix is pushed. You do not wait for the CI/CD loop.