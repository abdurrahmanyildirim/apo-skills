---
name: bug-fix
description: Finds the root cause of a bug, offers fix options with effort estimates and a recommendation, and waits for the user to pick one before changing anything.
disable-model-invocation: true
---

# Bug Fix

Work in two phases, then implement. Do not edit files or change git state, PRs or tickets until the user has picked a solution.

## Phase 1: Find the cause

1. Start from the failing path and read only what it touches: the code, recent changes (`git log`, `git blame`), and related issues or specs (`gh`) when they help. Stop once you can state the cause with evidence; do not survey the codebase.
2. Reproduce the bug or trace a concrete failing input before naming a cause. Run existing tests only if they do not write files, snapshots or fixtures.
3. Find the root cause, not only the symptom.
4. Report, quoting at most a few lines of code and linking the rest:
   - **Root cause:** one or two sentences.
   - **Why it happens:** the chain from the trigger to the failure.
   - **Where:** every file involved, as a link to the exact line, e.g. [src/auth/session.ts:42](src/auth/session.ts#L42).
   - **Confidence:** one line: what you confirmed, what you inferred, and what would settle the rest.
5. If the cause lies outside the code the user pointed at, say so in one line and fix only the reported bug.

## Phase 2: Offer solutions

If only one fix is sensible, give that one option and say so. Otherwise give three that really differ:

1. **Quick fix.** The smallest change that stops the bug. A hack is acceptable here; name the shortcut and what it leaves behind.
2. **Appropriate fix.** The correct fix at the right layer, scoped to this bug.
3. **Architectural fix.** Removes the whole class of bug, for example a shared abstraction, a new boundary, or a rule enforced in one place.

For each option, give:

- **What changes:** files as links, with the change in one or two sentences.
- **Effort:** S (one function), M (one module) or L (several modules or teams).
- **Trade-off:** the risk, and any debt it leaves.

Close with one line stating which option you recommend and why, then ask which to implement. Stop there.

## Phase 3: Implement the chosen option

Implement only the option the user picked and touch nothing outside it.

1. If the project has tests, write a failing regression test first.
2. Make the change.
3. Re-run the reproduction and the project's existing tests. Report the results, including any failures.
