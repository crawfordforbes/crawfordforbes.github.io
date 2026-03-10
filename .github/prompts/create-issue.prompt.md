---
agent: agent
description: Generate a docs/tickets/issues-phase-N.md file from a roadmap phase
---

Ask the user: **"Which phase do you want to generate issues for? (1–6)"**

Once you have the phase number:

1. Read [docs/ROADMAP.md](../../docs/ROADMAP.md) and extract every work item in the requested phase. A work item is either:
   - A top-level bullet point, or
   - A named sub-section (H3 heading) with associated bullets — treat each H3 as its own issue.

2. For each work item, produce one issue block using the structure from [.github/TEMPLATES/ISSUE_TEMPLATE.md](../TEMPLATES/ISSUE_TEMPLATE.md). Fill every field from what the roadmap says:
   - **Phase** — the phase heading, e.g. `Phase 2 — Analytics Simplification`
   - **Summary** — what is wrong and what should replace it, in one or two sentences drawn from the roadmap text
   - **Affected Files** — list every source file mentioned in that item; if the roadmap doesn't name a file explicitly, infer it from context (e.g. "rewrite `scrollToTarget`" → `src/utils/site.ts`)
   - **Acceptance Criteria** — convert the roadmap bullets into concrete, independently verifiable checkboxes (e.g. "Remove X", "File Y no longer exports Z", "Build passes with no TS errors")
   - **Context** — link to the relevant section in `docs/ROADMAP.md` using a relative anchor link

3. Separate each issue with `---`.

4. Write the result to `docs/tickets/issues-phase-[N].md`, creating the `docs/tickets/` directory if it does not exist. Do not overwrite an existing file — if it already exists, ask the user whether to overwrite or append.

Do not add any issues that are not in the roadmap. Do not invent acceptance criteria that go beyond what the roadmap describes.