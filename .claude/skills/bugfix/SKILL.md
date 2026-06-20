# /bugfix — Diagnose, Fix, and Prove It

Structured bug-fix workflow with mandatory verification. Adapted for this repo (Next.js + pnpm).

## Workflow

1. **Reproduce** — Read the relevant code, understand the root cause. Don't guess — trace the actual execution path.

2. **Write a regression test** — Before fixing anything, write a test (Vitest unit, or Playwright e2e) that captures the bug (it should fail right now).

3. **Implement the minimal fix** — Fix the root cause, not symptoms. Avoid changing unrelated code.

4. **Run the test suite** — Verify the regression test passes and nothing else broke:
   ```
   pnpm test
   ```

5. **Build + typecheck** — Catch type errors or broken imports:
   ```
   pnpm typecheck
   pnpm build
   ```

6. **If e2e verification is needed but unavailable** (no browser, etc.), explicitly say so:
   > "Fix implemented and unit tests pass, but I cannot verify e2e due to [reason]. Manual testing recommended."

7. **Report** — Show: root cause, what was fixed, regression test added, full test output.

## Rules
- Never claim a bug is "fixed" without a passing regression test.
- Never deliver an unverified fix as "ready" — disclose verification gaps.
- Use `pnpm` for package operations, never `npx`.
