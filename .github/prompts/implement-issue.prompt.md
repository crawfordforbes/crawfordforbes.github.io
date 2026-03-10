---
agent: agent
description: Fetch a GitHub issue, plan the implementation, get approval, then branch, patch, and commit
---

Ask the user: **"What is the GitHub issue number?"**

Then follow these steps in order. Do not skip ahead.

---

## Step 1 — Fetch the issue

Run:
```gh issue view <number> --json number,title,body,labels```


If the `gh` CLI is not authenticated or the command fails, ask the user to paste the issue body directly.

---

## Step 2 — Read the affected files

Before planning anything, read every file listed in the issue's **Affected Files** section. Understand the current implementation fully. Do not propose changes based on the issue description alone.

---

## Step 3 — Plan the implementation

Think through the changes required to satisfy every acceptance criterion. Note:
- What will be deleted, rewritten, or added
- Any side effects on other files not listed in the issue (imports, re-exports, consumers)
- Whether the changes can be done in a single commit or need to be sequenced

If anything in the issue is ambiguous or contradicts what you see in the code, ask a clarifying question now — before proposing anything. Do not proceed until ambiguities are resolved.

---

## Step 4 — Propose branch name and plan

Present the following to the user for approval:

**Branch name**: follow the pattern `cleanup/issue-<number>-<short-slug>` (e.g. `cleanup/issue-4-remove-logo-stub`). Use `fix/` prefix for correctness issues, `cleanup/` for debt removal, `docs/` for documentation-only.

**Summary of changes**: a concise bullet list of every file change you intend to make, specific enough that the user can mentally diff it.

Ask: **"Does this look right? Should I proceed?"**

Do not make any changes until the user confirms.

---

## Step 5 — Implement

Once the user approves:

1. Check out the new branch:
```git checkout -b <branch-name>```


2. Apply every change described in your plan. After patching, re-read each modified file to verify the result is correct.

3. Run the build to confirm nothing is broken:
```npm run build```

If the build fails, fix the errors before continuing.

---

## Step 6 — Commit

Stage all changed files and write a commit message using the format in [.github/TEMPLATES/COMMIT_TEMPLATE.md](../TEMPLATES/COMMIT_TEMPLATE.md):
```
# <type>(<scope>): <short imperative summary, 50 chars max>
#
# Types: fix | refactor | chore | docs | style | feat
# Scope: the primary file or feature area
#   e.g. analytics, hex, vite-config, routing, tsconfig
#
# Examples:
#   refactor(analytics): replace AnalyticsManager with minimal GA4 module
#   chore(vite-config): enable hidden source maps for production debugging
#   fix(routing): render NotFound component on unmatched routes
#   docs(hex): add file-level comment to hex-SVG-coords-converter

<body — what changed and why, not how. Wrap lines at 72 chars.
Leave this section blank for trivial changes.>

Closes #<issue-number>```

Present it to the user. Do not run any git commands beyond the branch checkout.