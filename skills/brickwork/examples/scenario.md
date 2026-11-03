# Scenario: pricing page

Repo: Angular app. Branch: `feature/pricing-page`. No existing plan.

## Step 1: Plan

**User:** `/apo:brickwork`, then: "I need a pricing page with three plan cards (name, price, features list, CTA button). Prices come from an API later; mock for now. Monthly/yearly toggle."

**Expected agent behavior:**
- Reads `angular-developer` skill, runs `git rev-parse --show-toplevel`, `git branch --show-current`, finds no matching plan.
- Asks batched questions (completion criteria, non-goals, yearly discount rule, API shape, routing).
- Inspects existing code/docs before proposing bricks.
- Presents full plan, decisions, assumptions, open questions. **Waits.**
- Writes no file yet.

**User:** answers questions; "approved".

**Expected:** creates `plans/<date>-feature-pricing-page.md` (see [expected/01-after-planning.md](expected/01-after-planning.md)). Stops. No implementation.

## Step 2: Resume + approve chapter 1

**User (new session):** `/apo:brickwork`

**Expected agent behavior:**
- Finds plan by exact branch header.
- Summarizes destination and chapter statuses.
- Checks Change Map and handoff against files/git (nothing yet, so nothing to report).
- Selects chapter 1, presents goal, tasks, acceptance, verification, UI test steps.
- Asks for implementation approval. **Waits.**

**User:** "approved".

## Step 3: Implement chapter 1

**Expected agent behavior:**
- Sets chapter 1 `in-progress`.
- Implements skeleton only: route `/pricing`, page shell, three labelled placeholders, mock data.
- Verifies each acceptance criterion: page spec (route + placeholders), build, lint; console errors checked manually by the user.
- Gives UI test steps, asks user to confirm.

**User:** "works".

**Expected:** chapter 1 `done`; Change Map and handoff written (see [expected/02-after-chapter-1.md](expected/02-after-chapter-1.md)). Does not start chapter 2. Does not commit.

## Step 4: Commit, then fail chapter 2

**User:** commits chapter 1 (hash `a1b2c3d` in the example). New session `/apo:brickwork`, approve chapter 2. Make the yearly test fail (floating-point rounding) and stop the session there.

**Expected agent behavior:**
- On resume, backfills chapter 1's commit hash from `git log`.
- Verifies the Change Map against `git show --stat <hash>` for chapter 1.
- Sets chapter 2 `in-progress`, writes tests first, implements, runs verification.
- Test fails: keeps `in-progress`, writes a `failed` handoff (what passed, what failed, open decision, next step). Does not mark `done`.

Result: [expected/03-interrupted-chapter-2.md](expected/03-interrupted-chapter-2.md).

## Step 5: Resume after the failure

**User (new session):** `/apo:brickwork`

**Expected agent behavior:**
- Reports chapter 2 as `in-progress` with the recorded failure.
- Inspects `git status`/`git diff` and compares with the handoff and Change Map.
- Raises the open rounding decision, asks before continuing.

Hard kill (no handoff written): resume then relies only on `git status`, `git diff` and the Change Map. The agent should say the handoff is missing and treat the chapter state as unknown.
