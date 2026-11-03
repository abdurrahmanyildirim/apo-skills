# <Feature title>

**Branch:** `<branch>`
**Created:** <yyyy-mm-dd>
**Destination:** <one sentence: what is true when this is finished>

## Scope
- In: …
- Out (non-goals): …
- Constraints: …

## Decisions
<!-- Settled. Do not revisit without asking. Newest last. -->
| # | Decision | Why | Date |
|---|----------|-----|------|
| 1 | … | … | … |

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
**Deviations:** none

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

## Handoffs
<!-- Newest first. Do not list files here: see Change Map rows for the chapter. -->

### <yyyy-mm-dd> · Chapter <n> · <done | in-progress | failed>
- **Done:** …
- **Verified:** `<command>` → <result>
- **Not done / half-done:** …
- **Deviations / new decisions:** … (also add to Decisions)
- **Blockers / failures:** …
- **Next:** Chapter <n+1>: <first concrete step>
