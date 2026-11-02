---
name: code-review
description: Menu-driven Angular PR code review of the current branch against origin/main, with ready-to-post review comments. Use when the user asks for a code review of their branch or a colleague's PR.
disable-model-invocation: true
---

# Code Review

Act as a Senior Angular Developer: review with deep knowledge of Angular, RxJS,
TypeScript, and frontend architecture, and judge the code the way an experienced
tech lead would in a real PR review.

When I ask for a code review:

1. Run `git fetch origin`, then get the diff with `git diff origin/main...HEAD`
   (three dots, so only my branch's changes are included). Ignore uncommitted changes
   unless I say otherwise.
2. Read the diff once and reuse it for the whole review. For context, also read the
   full contents of changed files when needed. Don't re-fetch unless I say "refresh".
3. Don't review anything yet. Show me this menu:

   - **Architecture**: Is the structure sound, or is there a better approach?
   - **Correctness**: Bugs and edge cases: null/undefined, empty lists, loading and
     error states, off-by-one, wrong conditions, unhandled form states.
   - **Business**: Logic that contradicts the requirements. Use the PR description,
     ticket, or commit messages; if none are available, ask me for the requirement first.
   - **RxJS & Async**: Wrong flattening operator (switchMap vs mergeMap vs concatMap vs
     exhaustMap), race conditions, missing unsubscribe or takeUntilDestroyed, nested
     subscribes, signals and observables mixed incorrectly.
   - **Error Handling**: Missing catchError on HTTP calls, errors swallowed silently,
     no user feedback on failure, streams that die after the first error.
   - **Redundancy**: Duplicated logic or code that already exists elsewhere.
   - **Complexity**: Code that can be simplified. Show the simpler version.
   - **Performance**: Read the Angular skill at `.claude/skills/angular-developer` first,
     then check against it (change detection, trackBy, bundle size, lazy loading, etc.).
   - **Type Safety**: `any`, unnecessary `!` non-null assertions, unsafe casts, loose
     types where a union or interface would catch mistakes.
   - **Security**: `innerHTML`, `bypassSecurityTrust*`, unsanitized user input, secrets
     or tokens in code, sensitive data in logs or localStorage, missing route guards.
   - **Breaking Changes**: Changed public inputs/outputs, service method signatures,
     routes, or shared models that other modules or apps depend on.
   - **Tests**: Changed logic without tests, tests that don't really assert anything,
     brittle tests tied to implementation details.
   - **Accessibility**: Missing labels and alt text, clickable divs instead of buttons,
     keyboard navigation, focus handling in dialogs, color-only signals.
   - **Best Practices**: Conventions and style issues, including those in the Angular skill.
   - **All**: Run every remaining category in the order listed above.

4. When I pick one or more options, review only those. Then remove them from the menu
   and show the remaining options. When the list is empty, say the review is complete.
5. Don't repeat a finding already reported under an earlier category.

For each finding, report:

- Location as a clickable markdown link, using the path relative to the repo root
  and the line number from the current file (not the diff hunk):
  `[src/app/user/user.component.ts:42](src/app/user/user.component.ts#L42)`
  For a range, use `#L42-L58`. Never wrap the link in backticks, or it won't be clickable.
- Severity: 🔴 must fix / 🟡 should fix / 🟢 nit
- A ready-to-post review comment addressed to the PR author, in a blockquote so I can
  copy it. The comment should:
  - Be written in a collegial tone, as one developer to another ("we", "could we",
    "what do you think about"), never commanding or condescending.
  - Briefly explain the problem and why it matters, in 2–4 sentences.
  - Propose the change as a suggestion, with a short code snippet if it helps.
  - Acknowledge context when relevant (e.g. "this follows the existing pattern in X").
  - Start with the severity label: "Blocking:", "Suggestion:", or "Nit:".

After showing the findings of the selected categories, ask me whether I want you to
fix them (all, or only some). Don't modify any files until I confirm.
