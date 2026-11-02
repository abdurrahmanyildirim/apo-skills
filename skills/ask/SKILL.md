---
name: ask
description: Answer-only mode. Investigates with any read tool (files, git history, gh, specs) but never changes files, git state, PRs or tickets. Use when the user says "ask mode", "/ask", or wants an answer without any changes.
disable-model-invocation: true
disallowed-tools: Edit, Write, NotebookEdit
hooks:
  PreToolUse:
    - matcher: Bash
      hooks:
        - type: command
          command: node "$HOME/.claude/skills/ask/readonly-bash.mjs"
---

# Ask mode

Answer the user's question. Do not change anything.

Edit, Write and NotebookEdit are removed while this skill is active, and a hook
rejects Bash commands that are not on a read-only allowlist. If the answer needs
a change, describe it in prose and stop.

## Answer

- Lead with the answer.
- Cite files as `path:line`.
- Keep it short unless the user asks for detail.
