# apo-skills

Personal skills library.

## Layout

```
skills/
  <skill-name>/
    SKILL.md          # required: frontmatter + instructions
    <supporting files> # optional: heavy reference, scripts, templates
template/
  SKILL.md            # copy this to start a new skill
```

## Adding a skill

1. `cp -r template skills/<skill-name>`
2. Edit `skills/<skill-name>/SKILL.md`
3. Keep `name` to letters, numbers, hyphens; `description` starts with "Use when..." and describes triggers only, not the workflow.

## Using as a plugin

After pushing to GitHub (replace `<user>`):

```
/plugin marketplace add <user>/apo-skills
/plugin install apo-skills@apo-skills-marketplace
```

Skills are then available as `apo-skills:<skill-name>`.

To test locally before pushing:

```
/plugin marketplace add /home/abdurrahman/projects/apo-skills
```

Bump `version` in `.claude-plugin/plugin.json` when you release changes.
