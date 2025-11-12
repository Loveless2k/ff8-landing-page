#

# Task: Dynamic Task Executor (v2.1 with Metrics)

# Argument: $ARGUMENT$ (e.g., Issue number or task ID)

#

# This command executes a task based on CLAUDE.md and logs metrics.

#

## Metrics Block (START)

# This entire command's execution MUST be tracked.

# 1. Set START_TIME = current_timestamp

# 2. Set TASK_ID = $ARGUMENT$

# 3. Set TASK_STATUS = "fail" (Default state)

# 4. Set AGENTS_USED_LIST = []

# 5. Set HUMAN_FEEDBACK_LOOPS = 0

# 6. Set ERROR_MSG = "null"

# --- BEGIN TASK EXECUTION (TRY...) ---

## Phase 1: Constitution & Setup

1.  **Read the Constitution:** Read and parse `CLAUDE.md` to extract:
    - `[methodology].workflow` (e.g., "TDD", "RAD")
    - `[methodology].vcs_provider` (e.g., "GitHub", "GitLab")
    - `## Testing Requirements`
2.  **Set Variables:**
    - `WORKFLOW = [methodology].workflow`
    - `VCS_CLI = "gh"` (if GitHub) or `"glab"` (if GitLab)

## Phase 2: Worktree & Analysis

1.  **Create Worktree:**
    - `git worktree add ./.trees/feature-issue-$ARGUMENT$ -b feature-issue-$ARGUMENT$`
    - `cd ./.trees/feature-issue-$ARGUMENT$`
2.  **Analyze Task:**
    - Read the task/issue details using `$VCS_CLI issue view $ARGUMENT$ --comments`.
    - Read all relevant plans from `/.claude/doc/{feature_name}/`.

## Phase 3: Dynamic Implementation Cycle

# This phase executes the loop defined by [methodology].workflow.

# CASE 1: TDD (Test-Driven Development)

if `WORKFLOW == "TDD"`:
print("Executing TDD Workflow...") 1. Invoke `@implementation-test-engineer` to write failing tests. 2. Update `AGENTS_USED_LIST` with "@implementation-test-engineer". 3. Run tests (confirm fail). 4. Invoke implementation agents (e.g., `@domain-logic-architect`, `@presentation-layer-architect`) to write code. 5. Update `AGENTS_USED_LIST` with invoked agents. 6. Run tests (confirm pass). 7. Repeat until all `test_cases.md` are implemented.

# CASE 2: RAD (Rapid Application Development / Prototype-First)

else if `WORKFLOW == "RAD"`:
print("Executing RAD Workflow...") 1. Implement prototype. 2. Invoke `@experience-analyzer`. 3. Update `AGENTS_USED_LIST` with "@experience-analyzer". 4. Iterate on feedback. 5. Invoke `@implementation-test-engineer` to write tests _after_ approval. 6. Update `AGENTS_USED_LIST` with "@implementation-test-engineer".

# CASE 3: Default (Standard Workflow)

else:
print("Executing Standard Workflow (Implementation-First)...") 1. Implement feature. 2. Invoke `@implementation-test-engineer` to write tests. 3. Update `AGENTS_USED_LIST` with "@implementation-test-engineer". 4. Run tests until all pass.

## Phase 4: CI/CD and Validation Loop

1.  **Run Local Checks:** Run local builds and the full test suite.
2.  **Create/Update PR:** Use `$VCS_CLI` to create or update the Pull/Merge Request.
3.  **Report Status:** Output the results (summary, tests passed, PR URL).
4.  **Monitor CI/CD:** Enter a loop monitoring the PR's CI/CD pipeline (`$VCS_CLI pr view ...`).
5.  **Fix CI Failures:** If CI fails, read logs, implement fixes, push, and loop.
6.  **Trigger QA Validation:** Once CI is green, invoke `dynamic-qa-validator`.
7.  **Wait for QA:** Monitor the PR for comments from `@acceptance-validator` and `@security-architect`.
8.  **Implement Feedback:**
    - If feedback comments are found:
      - Increment `HUMAN_FEEDBACK_LOOPS` (or auto-feedback loop).
      - Invoke the `implement-feedback.md` command.
      - Go back to step 4 (monitor CI/CD).
9.  **Finish:**
    - Once CI is green and QA is approved:
    - **Set TASK_STATUS = "success"**

# --- END TASK EXECUTION (CATCH...) ---

## On Error

# (If any command from Phase 1-4 fails unexpectedly)

# 1. Set TASK_STATUS = "fail"

# 2. Set ERROR_MSG = "The specific error message from the failed command."

# --- (FINALLY...) ---

## Metrics Block (END)

# This block MUST run at the very end, regardless of success or failure.

# 1. Set END_TIME = current_timestamp

# 2. Calculate DURATION = END_TIME - START_TIME

# 3. Construct METRICS_JSON string:

# (Example: {"timestamp": "...", "task_id": "$TASK_ID", "command": "dynamic-task-executor", "status": "$TASK_STATUS", "duration_ms": $DURATION, "agents_used": $AGENTS_USED_LIST, "human_feedback_loops": $HUMAN_FEEDBACK_LOOPS, "error_message": "$ERROR_MSG"})

# 4. Call @metrics-logger with the JSON payload, SILENTLY.

# (claude @metrics-logger "$METRICS_JSON" > /dev/null 2>&1)
