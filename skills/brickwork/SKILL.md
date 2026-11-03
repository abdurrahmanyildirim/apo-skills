---
name: brickwork
description: Branch-based, chapter-by-chapter development workflow. Build software brick by brick, with plans, approvals, verification, and session handoffs. Invoke only with /apo:brickwork.
disable-model-invocation: true
---

# Brickwork

Act as a senior Angular developer. Prefer the simplest maintainable solution. No speculative abstractions.

One chapter per invocation. **Never implement without explicit approval.** Planning and implementation need separate approvals.

## Skills

Invoke installed skills using the Skill tool when useful. Their output feeds this workflow; all state lives in `plans/brickwork/`.

| Phase | Skill | Purpose |
|-------|-------|---------|
| Plan | `superpowers:brainstorming` | Clarify requirements and explore alternatives |
| Plan | `mattpocock-skills:wayfinder` | Optional. Use the user's existing map as input; its resolved decisions feed `## Decisions` |
| Plan | `superpowers:writing-plans` | Create small, executable chapters |
| Plan | `mattpocock-skills:research`, `mattpocock-skills:prototype` | Resolve open decisions discussion cannot answer; output goes in a `finding-*.md` file |
| Implement | `superpowers:executing-plans` | Controlled execution of approved work |
| Implement | `superpowers:test-driven-development` | Test-first for logic and behavior where appropriate |
| Implement | `superpowers:verification-before-completion` | Verify before claiming success |

Use brainstorming and writing-plans for substantial planning. Use other planning skills when they add value. If a listed skill is unavailable, say so briefly and continue without it.

## Files

One brickwork directory per branch, committed on that branch. Delete it when the work is done (section E).

```
plans/brickwork/
  plan.md            # main file: destination, scope, decisions, open decisions, chapters (spec + status), Change Map
  chapter-<n>.md     # result record of chapter n: deviations and handoffs. Created when the chapter starts.
  finding-<topic>.md # research or prototype output. Optional. Linked from Decisions.
```

Templates: `references/plan-template.md` (plan.md and chapter-<n>.md). Chapter status and commit live **only** in the `plan.md` Chapters table.

## 1. Initialize

Every session:

1. Read the `angular-developer` skill first.
2. Run `git rev-parse --show-toplevel` and `git branch --show-current`.
3. Look for `plans/brickwork/plan.md`.
   - Missing → section A.
   - Present → its `**Branch:**` header must equal the current branch exactly. If not (for example, the directory was inherited from a parent branch), stop and ask. Never work from another branch's plan.
4. Read `plan.md`, especially Decisions and Open decisions, then the latest `chapter-<n>.md` handoff.
5. Run `git status --short`. If dirty, list the files and ask whether they belong to this chapter. Continue read-only until clarified.

## 2. Workflow

### A. No plan → Plan

1. If the user supplied a Wayfinder map (link or ref), read it and its resolved decision tickets first. Treat them as settled input; do not re-ask.
2. Batch questions about destination, completion criteria, scope, non-goals, constraints, and acceptance criteria.
3. Inspect existing code, `docs/`, `AGENTS.md`, and helpers such as `pnpm utils:find` before proposing new bricks.
4. Use relevant planning skills. Clarify requirements before decomposing work.
5. **Fog gate.** List decisions that affect scope, architecture, or interfaces and are still open. Settle what you can now; record minor assumptions rather than blocking progress. If any decision cannot be settled in this session (needs research, a prototype, an external answer, or another decision first), the plan is too foggy to order chapters. The gate is for real fog only, not ordinary uncertainty:
   - Present the open decisions: type (`research` · `prototype` · `grilling` · `task`), what blocks each, and which are takable now.
   - After approval, create `plan.md` with status `planning`, the `## Open decisions` table, and no chapters. Stop.
   - The user works the open decisions (section B), then re-invokes `/apo:brickwork`.
   - The user may override the gate and ask to plan chapters anyway. Record the unresolved decisions as assumptions.
6. Design small chapters, each achievable and verifiable in one session:
   - **UI feature:** chapter 1 is a minimal skeleton: route, page shell, meaningful labelled placeholders, and mock data. It must be reachable in the running app.
   - **Build bricks next:** leaf → root. Each UI brick replaces its corresponding placeholder and becomes testable in the browser. Logic bricks (services, pipes, utilities) are verified independently.
   - **Integrate afterward:** integration chapters connect the completed bricks. The final chapter removes temporary mocks and demo scaffolding.
   - Every chapter defines its goal, tasks, acceptance criteria, verification, dependencies, and brick contracts.
   - UI chapters include `How to test in UI`.
   - Skip the skeleton for features without UI.
7. Present the complete plan, decisions, assumptions, and open questions. Wait for explicit planning approval.
8. Only after approval, create `plans/brickwork/plan.md` with status `ready` and all chapters `todo`. Load `references/plan-template.md`. Copy each resolved decision into `## Decisions`, linking its `finding-*.md` or Wayfinder ticket as the source.
9. Stop. Do not implement.

### B. Existing plan → Resume

If `plan.md` status is `planning`: report the Open decisions table and the frontier (takable now, blocked, in fog). Work only decisions the user picks, using research, prototype or grilling. Write outputs to `finding-<topic>.md`, move each resolved decision into `## Decisions`, and mark it resolved. When none remain open, set status to `ready` and continue from A step 6 (chapter design, then planning approval). Stop after each session.

Otherwise:

1. Summarize the destination and chapter statuses.
2. Backfill commits: for each `done` chapter with `uncommitted` in the Chapters table, check `git log` and fill in the hash if the work was committed.
3. Verify the latest handoff and the Change Map against reality. Report discrepancies.
   - Uncommitted work: `git status --short` and `git diff` must match the files the map and handoff claim.
   - Committed chapters: every file in the map must exist, and `git show --stat <hash>` for the recorded commit must include the chapter's files.
   - Check brick contracts against the actual code.
4. Select the first unfinished chapter whose dependencies are satisfied. Never start a blocked chapter.
5. If it is `in-progress`, report the recorded failure or interruption from its `chapter-<n>.md` and inspect the actual state before proceeding.
6. Present its goal, tasks, acceptance criteria, verification, UI test steps, and relevant open decisions.
7. Ask for explicit implementation approval. Stop.

If all chapters are `done`, go to section E.

### C. Approved chapter → Implement

Enter only after explicit approval of that chapter.

1. Set the chapter's status to `in-progress` in the Chapters table (the single source of status). Create `chapter-<n>.md` from the template if it does not exist. Save both files.
2. Implement only the approved chapter's tasks. Do not touch other chapters' scope.
   - Logic: `superpowers:test-driven-development` where appropriate.
   - UI: replace the matching placeholder; it must work in the running app.
3. If the plan is wrong or incomplete, **stop and report**. Do not silently deviate. Record any approved deviation in `chapter-<n>.md` under `## Deviations`, and in `plan.md` Decisions if it outlives the chapter.
4. Verify every acceptance criterion with `superpowers:verification-before-completion`. Run the commands. Record command + result.
5. For UI chapters, give the user the `How to test in UI` steps and wait for confirmation.
6. Only after verification passes (and UI confirmation, if any), set the status to `done` and Commit to `uncommitted`.
7. Update `## Change Map` (see below), then write the handoff (section D). Stop. Do not start the next chapter.

If verification fails: keep `in-progress`, record the failure in the handoff, stop.

**Change Map rules:**
- Add or update a row for every file touched. Take the list from `git status --short` and `git diff --stat`, not from memory. Do not list `plans/brickwork/` files.
- Redraw the brick graph if bricks were added, connected, or removed.
- Mark temporary files (mocks, demo scaffolding) as `temporary`. The final chapter must clear every `temporary` row.
- The map reflects the current state, not history. History lives in chapter files and git.
- Do not duplicate state: chapter status and commit live only in the Chapters table.

### D. Handoff (mandatory)

Write at chapter end, on failure, or when interrupted. Add to the chapter's `chapter-<n>.md` under `## Handoffs`, **newest first**, using the template in `references/plan-template.md`.

- Facts only: commands run and results. No "should work". Do not list files; point to the Change Map rows for the chapter.
- Put anything that outlives this chapter into `plan.md` `## Decisions` (choices + why, gotchas) and `## Brick contracts`, not only in the handoff.
- Do not commit unless the user asks.
- Interrupted mid-chapter: status stays `in-progress`; the handoff states what is done, half-done, and untouched.

### E. Done → Clean up

When all chapters are `done`:

1. Verify the Change Map has no `temporary` rows and every `done` chapter has a commit hash (backfill from `git log`).
2. Report completion. Ask for explicit approval to delete `plans/brickwork/`. Do not delete without it.
3. After approval, delete the directory (`git rm -r` if tracked, otherwise `rm -r`). Do not commit unless the user asks. History stays in git.
