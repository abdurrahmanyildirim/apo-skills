# Brickwork examples (for maintainers)

Not loaded by the skill at runtime. Use to re-test the skill after editing `SKILL.md` or `references/plan-template.md`.

## How to re-trigger

1. In a scratch Angular repo: `git checkout -b feature/pricing-page`
2. Run `/apo:brickwork` and play the steps in [scenario.md](scenario.md).
3. Compare the plan file in `plans/` with [expected/](expected/).

## Compare, don't diff exactly

Wording differs between runs. Check structure:

| Check | After planning | After ch. 1 | Interrupted ch. 2 |
|-------|:-:|:-:|:-:|
| Filename `plans/<date>-feature-pricing-page.md` | ✔ | ✔ | ✔ |
| `**Branch:**` header matches branch exactly | ✔ | ✔ | ✔ |
| All chapters `todo`, commit `–` | ✔ | | |
| Chapter 1 is a skeleton (route, shell, mock) | ✔ | ✔ | ✔ |
| Leaf → root brick order | ✔ | | |
| Final chapter removes mocks | ✔ | | |
| Verification proves every acceptance criterion | ✔ | ✔ | ✔ |
| Status and commit only in Chapters table (no chapter log, no per-chapter status line) | ✔ | ✔ | ✔ |
| Ch. 1 `done`, commit `uncommitted` | | ✔ | |
| Ch. 1 commit backfilled with hash | | | ✔ |
| Change Map files match `git status`, mock marked `temporary` | | ✔ | ✔ |
| Handoff lists commands + results, no file list | | ✔ | ✔ |
| Newest handoff first | | ✔ | ✔ |
| Agent stopped, did not start next chapter | | ✔ | |
| Ch. 2 `in-progress`, failure and open decision recorded | | | ✔ |

## Files

- [scenario.md](scenario.md): user inputs and expected agent behavior per step
- [expected/01-after-planning.md](expected/01-after-planning.md): plan right after planning approval
- [expected/02-after-chapter-1.md](expected/02-after-chapter-1.md): full plan after chapter 1 is implemented
- [expected/03-interrupted-chapter-2.md](expected/03-interrupted-chapter-2.md): full plan after chapter 1 was committed and chapter 2 failed mid-way
