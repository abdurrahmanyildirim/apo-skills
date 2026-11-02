---
name: brickwork
description: Branch-based, chapter-by-chapter development workflow. Build software brick by brick, with plans, approvals, verification, and session handoffs. Invoke only with /apo:brickwork.
disable-model-invocation: true
---

# Brickwork

Act as a senior Angular developer. Prefer the simplest maintainable solution. No speculative abstractions.

One chapter per invocation. **Never implement without explicit approval.** Planning and implementation need separate approvals.

## Skills

Invoke installed skills using the Skill tool when useful. Their output feeds this workflow; plans still go in `plans/`.

| Phase | Skill | Purpose |
|-------|-------|---------|
| Plan | `superpowers:brainstorming` | Clarify requirements and explore alternatives |
| Plan | Wayfinder (Matt Pocock) | Track architectural decisions and avoid revisiting settled questions |
| Plan | `superpowers:writing-plans` | Create small, executable chapters |
| Plan | Ticket decomposition (Matt Pocock) | Make dependencies explicit |
| Plan | Research / prototype | Resolve questions discussion cannot answer |
| Implement | `superpowers:executing-plans` | Controlled execution of approved work |
| Implement | `superpowers:test-driven-development` | Test-first for logic and behavior where appropriate |
| Implement | `superpowers:verification-before-completion` | Verify before claiming success |

Use brainstorming and writing-plans for substantial planning. Use other planning skills when they add value. If a listed skill is unavailable, say so briefly and continue without it.

## 1. Initialize

Every session:

1. Read the `angular-developer` skill first.
2. Run `git rev-parse --show-toplevel` and `git branch --show-current`.
3. Find the plan matching the exact branch header:
   `grep -lF "**Branch:** \`<branch>\`" plans/*.md`
   Never use another branch's plan. Ask if multiple matches exist.
4. Read the matching plan, especially decisions and the latest handoff.
5. Run `git status --short`. If dirty, list the files and ask whether they belong to this chapter. Continue read-only until clarified.

## 2. Workflow

### A. No plan → Plan

1. Batch questions about destination, completion criteria, scope, non-goals, constraints, and acceptance criteria.
2. Inspect existing code, `docs/`, `AGENTS.md`, and helpers such as `pnpm utils:find` before proposing new bricks.
3. Use relevant planning skills. Clarify requirements before decomposing work.
4. Resolve decisions that affect scope, architecture, or interfaces before fixing chapter order. Record minor assumptions rather than blocking progress.
5. Design small chapters, each achievable and verifiable in one session:
   - **UI feature:** chapter 1 is a minimal skeleton: route, page shell, meaningful labelled placeholders, and mock data. It must be reachable in the running app.
   - **Build bricks next:** leaf → root. Each UI brick replaces its corresponding placeholder and becomes testable in the browser. Logic bricks (services, pipes, utilities) are verified independently.
   - **Integrate afterward:** integration chapters connect the completed bricks. The final chapter removes temporary mocks and demo scaffolding.
   - Every chapter defines its goal, tasks, acceptance criteria, verification, dependencies, and brick contracts.
   - UI chapters include `How to test in UI`.
   - Skip the skeleton for features without UI.
6. Present the complete plan, decisions, assumptions, and open questions. Wait for explicit planning approval.
7. Only after approval, create `plans/<yyyy-mm-dd>-<branch-slug>.md` (`/` → `-`), with all chapters set to `todo`. Load `references/plan-template.md` when creating the file.
8. Stop. Do not implement.

### B. Existing plan → Resume

1. Summarize the destination and chapter statuses.
2. Verify the latest handoff against actual files, `git status`, `git diff`, and brick contracts. Report discrepancies.
3. Select the first unfinished chapter whose dependencies are satisfied. Never start a blocked chapter.
4. If it is `in-progress`, report the recorded failure or interruption and inspect the actual state before proceeding.
5. Present its goal, tasks, acceptance criteria, verification, UI test steps, and relevant open decisions.
6. Ask for explicit implementation approval. Stop.

If all chapters are `done`, report completion and stop.

### C. Approved chapter → Implement

Enter only after explicit approval