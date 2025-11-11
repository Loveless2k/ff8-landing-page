# 
# Task: Propose Constitutional Amendment (v2.1)
# Argument: $ARGUMENT$ (A string describing the change, e.g., "Change [stack].framework from React 18 to React 19")
#
# This is a high-privilege command for the @project-coordinator.
# It safely manages the evolution of the CLAUDE.md file.
#

## Metrics Block (START)
# 1. Set START_TIME = current_timestamp
# 2. Set TASK_ID = "constitutional-amendment"
# 3. Set TASK_STATUS = "fail"
# 4. Set AGENTS_USED_LIST = []
# 5. Set ERROR_MSG = "null"

# --- BEGIN TASK EXECUTION (TRY...) ---

## Phase 1: Setup & Isolation
1.  **Parse Change Request:** Read the `$ARGUMENT$` string. (e.g., "Change [stack].framework from React 18 to React 19").
2.  **Create Branch:** Create a new, isolated branch for this change.
    * `BRANCH_NAME = "feature/amendment-$(date +%s)"`
    * `git checkout -b $BRANCH_NAME`
3.  **Read Constitution:** Read the current `CLAUDE.md`.

## Phase 2: Propose Amendment
1.  **Modify Constitution:** Apply the change from `$ARGUMENT$` to the `CLAUDE.md` file in the local branch.
2.  **Commit Change:**
    * `git add CLAUDE.md`
    * `git commit -m "feat: Propose constitutional amendment - $ARGUMENT$"`

## Phase 3: Run Compatibility Test
# This is the core logic. We must test the amendment's impact
# on the Core Team before merging.

1.  **Read New Constitution:** Read the *modified* `CLAUDE.md` from the current branch.
2.  **Get Core Team:** Parse the `[core_team]` list.
3.  **Initialize Report:** `IMPACT_REPORT = "## 🛡️ Constitutional Amendment Impact Report\n\n"`
4.  **Loop Through Core Team:**
    * `for agent in [core_team]:`
        * `Add agent to AGENTS_USED_LIST`
        * **Invoke Agent in "Review Mode":**
            * `claude @$agent --task "review-new-constitution" --constitution-file "CLAUDE.md"`
            * (This requires agents to have a "review" mode, or we simulate it by asking them a question)
        * **Simulated Invocation (Alternative):**
            * `COMPATIBILITY_CHECK = claude @$agent "I am proposing an amendment to CLAUDE.md. Here is the new file. Please review the [stack] and [methodology] sections. Are you compatible? Respond with [COMPATIBLE] or [ADVERTENCIA] and a brief explanation." --file CLAUDE.md`
        * **Append to Report:**
            * `IMPACT_REPORT += "- @$agent: $COMPATIBILITY_CHECK\n"`

## Phase 4: Present Impact Report
1.  **Show Report:** Present the full `IMPACT_REPORT` to me (Daniel).
    * (Example Report)
    * `## 🛡️ Constitutional Amendment Impact Report`
    * `- @domain-logic-architect: [COMPATIBLE] My logic is abstract.`
    * `- @presentation-layer-architect: [ADVERTENCIA] The stack changed to React 19. My logic for hooks may need updating.`
    * `- @implementation-test-engineer: [ADVERTENCIA] React 19 may require new testing library versions.`
    * `- @security-architect: [COMPATIBLE] No security impact.`
2.  **Ask for Approval:**
    * "Daniel, the impact report is above. The branch `$BRANCH_NAME` is ready."
    * "Do I have your approval to merge this amendment into the main branch?"
3.  **Wait for Go/No-Go:** Wait for my explicit approval.

## Phase 5: Action
1.  **On Approval (Go):**
    * `git checkout main`
    * `git merge $BRANCH_NAME`
    * `git push origin main`
    * `git branch -d $BRANCH_NAME`
    * `Set TASK_STATUS = "success"`
2.  **On Rejection (No-Go):**
    * `git checkout main`
    * `git branch -d $BRANCH_NAME`
    * `Set TASK_STATUS = "fail"`
    * `Set ERROR_MSG = "Amendment rejected by @project-coordinator."`
    * "Understood. Reverting changes and deleting branch."

# --- END TASK EXECUTION (CATCH...) ---
## On Error
# (If any command from Phase 1-5 fails unexpectedly)
# 1. Set TASK_STATUS = "fail"
# 2. Set ERROR_MSG = "The specific error message from the failed command."

# --- (FINALLY...) ---
## Metrics Block (END)
# This block MUST run at the very end, regardless of success or failure.
# 1. Set END_TIME = current_timestamp
# 2. Calculate DURATION = END_TIME - START_TIME
# 3. Construct METRICS_JSON string:
#    (Example: {"timestamp": "...", "task_id": "$TASK_ID", "command": "propose-constitutional-amendment", "status": "$TASK_STATUS", "duration_ms": $DURATION, "agents_used": $AGENTS_USED_LIST, "human_feedback_loops": 1, "error_message": "$ERROR_MSG"})
# 4. Call @metrics-logger with the JSON payload, SILENTLY.
#    (claude @metrics-logger "$METRICS_JSON" > /dev/null 2>&1)