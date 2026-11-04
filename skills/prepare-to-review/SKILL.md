---
name: prepare-to-review
description: Final pre-review pass on the current branch. Finds and auto-fixes leftovers in the diff against origin/main (debug code, dead code, casts and weak tests in specs/stories), then verifies. Invoke only with /apo:prepare-to-review.
disable-model-invocation: true
---

# Prepare to Review

Last check before opening or updating a PR. Fix leftovers automatically. Do not ask for approval on fixes. Do not commit or push.

## Scope

1. `git fetch origin main`, then collect the change set: `git diff origin/main...HEAD` plus uncommitted changes.
2. Only touch lines and symbols this PR added or changed. Report pre-existing problems instead of fixing them.

## Checks

Fix each finding directly.

1. **Debug leftovers** in added lines: logging, `debugger`, commented-out code, PR-added TODOs, focused/skipped tests, temporary files, hardcoded test values.
2. **Dead code** made unused by this PR, or added but never used: imports, variables, methods, inputs/outputs, components, styles, translation keys, files. Search the whole repo (templates, specs, stories, string references) before each deletion. If unsure, keep it and report.
3. **Specs and stories** that the PR changed or added:
   - Remove casts (`as`, `any`, `!`) by fixing the types or mocks. Keep one only when no sound alternative exists, with a one-line comment why.
   - Fix tests that cannot fail, lack assertions, or assert implementation instead of behavior.
   - Missing coverage: write a test only for new or changed behavior with no coverage at all (new branch, error/empty state, new input/output, a story for each new component state). List weaker gaps in the report, do not write them.

## Verify

Run lint, type-check/build, and affected tests (scripts in `package.json`). Fix failures caused by this PR or your edits. Never weaken or skip a test to pass.

## Warnings (warn only)

Last step. Do not fix anything here. The developer decides.

1. Find the project's Angular skills: `.agents/skills/*angular*/SKILL.md`, `.claude/skills/*angular*/SKILL.md`. Read only the references matching what the diff touches (components, inputs/outputs, signals, effects, forms, DI, routing, HTTP, styling, testing, naming). Other project skills (stories, widgets) count when the diff touches that area. If none exist, skip the guideline part and say so.
2. Read the diff as a reviewer. For each changed behavior, hunt for forgotten cases and guideline deviations:
   - Inputs: null/undefined, empty, single item, very large, duplicates, unexpected order, invalid or partial data.
   - Async and state: loading, error, retry, race or out-of-order responses, rapid repeated actions, stale state, cleanup on destroy.
   - UI: empty and overflow states, disabled/readonly, long text, i18n, keyboard and a11y basics.
   - Callers: other usages of changed signatures, inputs, or shared services that the PR may break.
   - Guidelines: legacy APIs where signal-based ones are expected, effects used for derived state, naming conventions, testing approach.
3. Only warn about code added or changed by this PR, and only about cases that plausibly happen. Each warning: `file:line`, the case or guideline (with reference file name), likely failure or one-line suggestion.

## Report

Short. Per check: what was fixed (`file:line`). Then: left unfixed and why, test gaps not written, pre-existing issues, actual verification results. Say if verification was not run. End with the warnings as one list, marked "not fixed, your call".
