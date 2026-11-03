# Scenario: pricing page

Repo: Angular app. Branch: `feature/pricing-page`. No existing plan.

## Step 1: Plan

**User:** `/apo:brickwork`, then: "I need a pricing page with three plan cards (name, price, features list, CTA button). Prices come from an API later; mock for now. Monthly/yearly toggle."

**Expected agent behavior:**
- Reads `angular-developer` skill, runs `git rev-parse --show-toplevel`, `git branch --show-current`, finds no `plans/brickwork/plan.md`.
- Asks batched questions (completion criteria, non-goals, yearly discount rule, API shape, routing).
- Inspects existing code/docs before proposing bricks.
- Presents full plan, decisions, assumptions, open questions. **Waits.**
- Writes no file yet.

**User:** answers questions; "approved".

**Expected:** creates `plans/brickwork/plan.md` (see [expected/01-after-planning/](expected/01-after-planning/)). No `chapter-<n>.md` yet. Stops. No implementation.

## Step 2: Resume + approve chapter 1

**User (new session):** `/apo:brickwork`

**Expected agent behavior:**
- Finds `plans/brickwork/plan.md` and checks its `**Branch:**` header against the current branch.
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

**Expected:** chapter 1 `done`; Change Map updated in `plan.md`, handoff written to `chapter-1.md` (see [expected/02-after-chapter-1/](expected/02-after-chapter-1/)). Does not start chapter 2. Does not commit.

## Step 4: Commit, then fail chapter 2

**User:** commits chapter 1 (hash `a1b2c3d` in the example). New session `/apo:brickwork`, approve chapter 2. Make the yearly test fail (floating-point rounding) and stop the session there.

**Expected agent behavior:**
- On resume, backfills chapter 1's commit hash from `git log`.
- Verifies the Change Map against `git show --stat <hash>` for chapter 1.
- Sets chapter 2 `in-progress`, writes tests first, implements, runs verification.
- Test fails: keeps `in-progress`, writes a `failed` handoff (what passed, what failed, open decision, next step). Does not mark `done`.

Result: [expected/03-interrupted-chapter-2/](expected/03-interrupted-chapter-2/).

## Step 5: Resume after the failure

**User (new session):** `/apo:brickwork`

**Expected agent behavior:**
- Reports chapter 2 as `in-progress` with the failure recorded in `chapter-2.md`.
- Inspects `git status`/`git diff` and compares with the handoff and Change Map.
- Raises the open rounding decision, asks before continuing.

Hard kill (no handoff in `chapter-2.md`): resume then relies only on `git status`, `git diff` and the Change Map. The agent should say the handoff is missing and treat the chapter state as unknown.

## Variant: fog gate

Same repo and branch, no existing plan. Use this to test the fog gate (SKILL.md section A step 5 and section B, `planning` status).

### Step F1: Plan stops at the gate

**User:** `/apo:brickwork`, then: "Pricing page with plan cards and a monthly/yearly toggle. I don't know the yearly discount rule yet, and I'm not sure what the billing API returns."

**Expected agent behavior:**
- Asks batched questions, inspects code and `docs/`.
- Does **not** design chapters. Presents the open decisions with type, blockers, and which are takable now (1 and 2 are takable, 3 is blocked by both).
- Waits for approval. Writes no file before it.

**User:** "approved".

**Expected:** creates `plans/brickwork/plan.md` with `Status: planning`, an Open decisions table, and no chapters. Stops. No implementation.

### Step F2: Work a decision

**User (new session):** `/apo:brickwork`, then picks decision 2.

**Expected agent behavior:**
- Finds the plan, branch header matches, status is `planning`.
- Reports the frontier (1 and 2 takable, 3 blocked), works only decision 2.
- Writes `finding-billing-api.md`, moves the result to Decisions with the finding as Source, marks decision 2 `resolved → D1`.
- Stops. Does not set `ready` while decision 1 and 3 are open.

Result: [expected/04-fog-gate/](expected/04-fog-gate/).

### Step F3: Gate clears

After decisions 1 and 3 are resolved (not in the expected files), `/apo:brickwork` sets status `ready`, designs chapters, asks planning approval, then continues as in Step 1 of the main scenario.

### Override

If the user says "plan chapters anyway", the agent records the open decisions as assumptions and proceeds to chapter design without the gate.
