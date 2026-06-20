# /ship — Implement, Verify, and Commit

Complete feature lifecycle: implement with TDD, verify everything passes, commit and push. Adapted for this repo (Next.js + pnpm).

## Workflow

1. **Understand the request** — If the task touches 3+ files or has multiple valid approaches, outline your plan in 3-5 bullet points and wait for approval before coding. Skip for simple/obvious changes.

2. **Write tests first (TDD)** — Write failing tests (Vitest, or Playwright for flows) that define the expected behaviour before implementing.

3. **Implement** — Write the minimal code to make tests pass. Follow existing patterns and the design tokens in `app/globals.css`.

4. **Verify all checks pass** — Run sequentially, fix any failures before proceeding:
   ```
   pnpm typecheck
   pnpm lint
   pnpm test
   pnpm build
   ```

5. **Stage and commit** — Stage only the relevant files (not `git add -A`). Write a concise conventional commit message summarising the "why". Include the Co-Authored-By trailer.

6. **Push** — Push to the current branch. NEVER push to `main`/`master` directly — the human stays the final gate (rule 06).

7. **Report** — Summarise what shipped: files changed, tests added, verification results.

## Rules
- Never commit if any verification step fails — fix first.
- Never skip verification steps to save time.
- Only the human merges to main.
- Use `pnpm` for package operations, never `npx`.
