# /verify — Run Full Verification Pipeline

Quick command to run the complete typecheck + build + lint + test pipeline and report results. Adapted for this repo (Next.js + pnpm, no mcp-server).

## Workflow

Run all checks sequentially and report a clean summary. Do NOT stop at the first failure — run them all so the full picture is visible.

1. **Typecheck**: `pnpm typecheck`
2. **Lint**: `pnpm lint`
3. **Unit tests**: `pnpm test`
4. **Production build**: `pnpm build`

## Output Format

```
Verification Results:
- [PASS/FAIL] Typecheck
- [PASS/FAIL] Lint
- [PASS/FAIL] Tests: X passed, Y failed
- [PASS/FAIL] Build
```

If anything fails, show the first error and suggest a fix.

## Notes
- Use `pnpm` for package operations, never `npx`.
- `pnpm test:e2e` (Playwright) is run separately — it needs a built app + installed browsers.
