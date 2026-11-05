# apo-skills

Personal skills library.

## Skills

| Skill | Command | What it does |
|-------|---------|--------------|
| ask | `/apo:ask` | Answer-only mode. Reads files, git history and `gh`, but never changes files, git state, PRs or tickets. |
| brickwork | `/apo:brickwork` | Branch-based, chapter-by-chapter development workflow with plans, approvals, verification and session handoffs. |
| bug-fix | `/apo:bug-fix` | Finds the root cause, offers fix options with effort estimates and a recommendation, and waits for your pick before changing anything. |
| code-review | `/apo:code-review` | Menu-driven Angular PR review of the current branch against `origin/main`, with ready-to-post review comments. |
| prepare-to-review | `/apo:prepare-to-review` | Final pass before opening or updating a PR. Auto-fixes leftovers in the diff against `origin/main` (debug code, dead code, casts and weak tests), runs lint, build and the sibling specs of changed files, then lists warnings for you to decide. Never commits or pushes. |

All skills are user-invoked only (`disable-model-invocation: true`).

## Hooks

| Hook | Event | What it does |
|------|-------|--------------|
| concise | `SessionStart` | Injects `hooks/concise.txt` so replies are extremely concise: fragments OK, no filler or recap. |

## Adding a skill

1. `cp -r template skills/<skill-name>`
2. Edit `skills/<skill-name>/SKILL.md`
3. Keep `name` to letters, numbers, hyphens; `description` starts with "Use when..." and describes triggers only, not the workflow.

## Using as a plugin

Install from GitHub:

```
/plugin marketplace add abdurrahmanyildirim/apo-skills
/plugin install apo@apo-skills-marketplace
```

Skills are then available as `apo:<skill-name>` (e.g. `/apo:brickwork`).

To test a local checkout instead:

```
/plugin marketplace add /home/abdurrahman/projects/apo-skills
```

Bump `version` in `.claude-plugin/plugin.json` when you release changes.
