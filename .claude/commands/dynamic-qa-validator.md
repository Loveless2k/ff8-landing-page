#

# Task: Dynamic QA Validator (v2.1 with Metrics)

# Argument: $ARGUMENT$ (e.g., Issue number or PR number)

#

# This command orchestrates validation and logs metrics.

#

## Metrics Block (START)

# This entire command's execution MUST be tracked.

# 1. Set START_TIME = current_timestamp

# 2. Set TASK_ID = $ARGUMENT$

# 3. Set TASK_STATUS = "fail" (Default state)

# 4. Set AGENTS_USED_LIST = []

# 5. Set ERROR_MSG = "null"

# --- BEGIN TASK EXECUTION (TRY...) ---

## Phase 1: Constitution & Setup

1.  **Read the Constitution:** Read and parse `CLAUDE.md` to extract:
    - `[methodology].vcs_provider` (e.g., "GitHub")
2.  **VCS Tool Setup:**
    - Set `VCS_CLI` (e.g., "gh").
3.  **Get Task Details:**
    - Fetch issue/PR details using `$VCS_CLI pr view $ARGUMENT$ --comments`.
    - Get the preview URL for validation.

## Phase 2: Orchestrate Validation (Parallel)

# This command invokes the abstract "Gatekeepers"

1.  **Invoke Acceptance Validator:**
    - Run `@acceptance-validator` on the task/PR.
    - Add "@acceptance-validator" to `AGENTS_USED_LIST`.
2.  **Invoke Security Validator:**
    - Run `@security-architect` (in Validation Mode) on the task/PR.
    - Add "@security-architect" to `AGENTS_USED_LIST`.

## Phase 3: Review & Decision

1.  **Wait & Read Reports:** Wait for both agents to complete.
2.  **Analyze Feedback:** Read all new comments on the PR using `$VCS_CLI pr view $ARGUMENT$ --comments`.
3.  **Make Decision:**
    - Set `FINAL_STATUS = "READY"`
    - If comments from `@acceptance-validator` contain "[FAIL]" or "[NEEDS WORK]":
      - Set `FINAL_STATUS = "NEEDS_WORK"`
    - If comments from `@security-architect` contain "[FAIL]" or "[NEEDS WORK]":
      - Set `FINAL_STATUS = "NEEDS_WORK"`

## Phase 4: Action

# Based on the decision, either close the loop or trigger a fix.

# CASE 1: All Validations Passed

if `FINAL_STATUS == "READY"`:
print("All validations passed.") 1. Post "ISSUE READY TO MERGE" on the issue/PR. 2. Notify Daniel: "...ready for final review." 3. **Set TASK_STATUS = "success"**

# CASE 2: Validation Failed

else if `FINAL_STATUS == "NEEDS_WORK"`:
print("Validation failed. Triggering feedback loop.") 1. Post "Validation failed, implementation requires feedback." 2. Invoke the `implement-feedback.md` command. 3. **Set ERROR_MSG = "Validation failed by @acceptance-validator or @security-architect."** # TASK_STATUS remains "fail"

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

# (Example: {"timestamp": "...", "task_id": "$TASK_ID", "command": "dynamic-qa-validator", "status": "$TASK_STATUS", "duration_ms": $DURATION, "agents_used": $AGENTS_USED_LIST, "human_feedback_loops": 0, "error_message": "$ERROR_MSG"})

# 4. Call @metrics-logger with the JSON payload, SILENTLY.

# (claude @metrics-logger "$METRICS_JSON" > /dev/null 2>&1)
