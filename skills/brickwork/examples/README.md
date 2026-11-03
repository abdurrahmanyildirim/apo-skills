# Brickwork examples (for maintainers)

Not loaded by the skill at runtime. Use to re-test the skill after editing `SKILL.md` or `references/plan-template.md`.

## How to re-trigger

1. In a scratch Angular repo: `git checkout -b feature/pricing-page`
2. Run `/apo:brickwork` and play the steps in [scenario.md](scenario.md).
3. Compare `plans/brickwork/` with the matching folder in [expected/](expected/).

## Compare, don't diff exactly

Wording differs between runs. Check structure:

| Check | After planning | After ch. 1 | Interrupted ch. 2 |
|-------|:-:|:-:|:-:|
| Files live in `plans/brickwork/` (`plan.md`, `chapter-<n>.md`) | ✔ | ✔ | ✔ |
| `**Branch:**` header matches branch exactly | ✔ | ✔ | ✔ |
| All chapters `todo`, commit `–` | ✔ | | |
| Chapter 1 is a skeleton (route, shell, mock) | ✔ | ✔ | ✔ |
| Leaf → root brick order | ✔ | | |
| Final chapter removes mocks | ✔ | | |
| Verification proves every acceptance criterion | ✔ | ✔ | ✔ |
| Status and commit only in `plan.md` Chapters table (not in `chapter-<n>.md`) | ✔ | ✔ | ✔ |
| No `chapter-<n>.md` before the chapter starts | ✔ | | |
| Handoffs in `chapter-<n>.md`, not in `plan.md` | | ✔ | ✔ |
| Ch. 1 `done`, commit `uncommitted` | | ✔ | |
| Ch. 1 commit backfilled with hash | | | ✔ |
| Change Map files match `git status`, mock marked `temporary` | | ✔ | ✔ |
| Handoff lists commands + results, no file list | | ✔ | ✔ |
| Newest handoff first within the chapter file | | ✔ | ✔ |
| Agent stopped, did not start next chapter | | ✔ | |
| Ch. 2 `in-progress`, failure and open decision recorded | | | ✔ |

## Fog-gate checks (variant in scenario.md)

- `Status: planning`, Open decisions table present, no chapters, no `chapter-<n>.md`
- Each open decision has a type and blockers; blocked ones are not worked
- Resolved decision: moved to Decisions with the `finding-*.md` as Source, row marked `resolved → D<n>`
- Status stays `planning` until no decision is open
- Agent stopped after one session

## Files

- [scenario.md](scenario.md): user inputs and expected agent behavior per step
- [expected/01-after-planning/](expected/01-after-planning/): `plan.md` right after planning approval
- [expected/02-after-chapter-1/](expected/02-after-chapter-1/): `plan.md` + `chapter-1.md` after chapter 1 is implemented
- [expected/03-interrupted-chapter-2/](expected/03-interrupted-chapter-2/): `plan.md` + `chapter-1.md` + `chapter-2.md` after chapter 1 was committed and chapter 2 failed mid-way
- [expected/04-fog-gate/](expected/04-fog-gate/): `plan.md` (`Status: planning`, Open decisions) + `finding-billing-api.md` after the fog-gate variant, decision 2 resolved
- Not covered yet: cleanup (section E). Add a scenario if you change it.
