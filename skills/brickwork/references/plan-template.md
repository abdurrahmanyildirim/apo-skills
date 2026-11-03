# plan.md template

Create as `plans/brickwork/plan.md`. Chapter result files use the second template at the bottom.

---

# <Feature title>

**Branch:** `<branch>`
**Created:** <yyyy-mm-dd>
**Status:** `planning` · `ready`   <!-- planning = open decisions remain, no chapters yet -->
**Destination:** <one sentence: what is true when this is finished>

## Scope
- In: …
- Out (non-goals): …
- Constraints: …

## Open decisions
<!-- Only when Status is `planning`. Remove the section when empty. -->
| # | Decision | Type | Blocked by | State |
|---|----------|------|------------|-------|
| 1 | … | research · prototype · grilling · task | – | open · resolved → D<n> |

## Decisions
<!-- Settled. Do not revisit without asking. Newest last. Source = finding-<topic>.md, Wayfinder ticket, or – -->
| # | Decision | Why | Source | Date |
|---|----------|-----|--------|------|
| D1 | … | … | … | … |

## Assumptions / Open questions
- [ ] …

## Brick contracts
<!-- Public interface of each brick: inputs, outputs, file path. -->
- `<BrickName>` (`path/to/file.ts`): inputs …, outputs …

## Chapters

<!-- Single source of chapter status and commit. Do not repeat them elsewhere. -->
| # | Title | Status | Depends on | Commit |
|---|-------|--------|------------|--------|
| 1 | … | todo | – | – |

Status: `todo` · `in-progress` · `done` · `blocked`
Commit: `–` (not done) · `uncommitted` (done, not committed) · short hash

### Chapter 1: <title>
**Goal:** …
**Tasks:**
- [ ] …
**Acceptance criteria:**
- …
**Verification:** `<commands that prove EACH acceptance criterion>`
**How to test in UI:** <route, steps, expected result>   (UI chapters only)
**Depends on:** –
**Brick contracts:** …

## Change Map
<!-- Cumulative. Updated at the end of each chapter. Reflects the CURRENT state, not history. -->

### Overview
<2-4 lines: what exists now, how the bricks fit together, where the entry point is.>

### Brick graph
<!-- leaf → root. Arrows = "used by". Mark placeholders and temporary scaffolding. -->
```
LeafBrick ─┐
           ├─> ParentBrick ─> PageComponent ─> route /<path>
OtherBrick ┘
[mock] feature.mock.ts  (temporary, remove in Ch. <n>)
```

### Files
| File | Brick | Status | Chapter | Purpose |
|------|-------|--------|---------|---------|
| `path/to/file.ts` | <BrickName> | new | 1 | … |

Status: `new` · `changed` · `done` · `temporary` · `removed`

---

# chapter-<n>.md template

Create as `plans/brickwork/chapter-<n>.md` when chapter n starts. No status or commit here: those live in the `plan.md` Chapters table.

```
# Chapter <n>: <title>

## Deviations
<!-- Approved departures from the plan. "none" if none. -->
none

## Handoffs
<!-- Newest first. Do not list files: see Change Map rows for this chapter. -->

### <yyyy-mm-dd> · <done | in-progress | failed>
- **Done:** …
- **Verified:** `<command>` → <result>
- **Not done / half-done:** …
- **New decisions:** … (also add to plan.md Decisions)
- **Blockers / failures:** …
- **Next:** Chapter <n+1>: <first concrete step>
```
