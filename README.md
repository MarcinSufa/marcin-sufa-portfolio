# Marcin Sufa — Portfolio

Personal/professional site for **Marcin Sufa** — AI-native frontend engineer & indie builder (Warsaw).
A single-page portfolio with a dark/light theme, an animated three.js hero, a tabbed work
showcase, and an "agent fleet" workflow story.

Built from an approved [Claude Design](https://claude.ai/design) export.

## Tech

- [Next.js 15](https://nextjs.org) (App Router) · React 19 · TypeScript
- Tailwind CSS v4 (CSS-variable theme tokens)
- three.js (hero particle field) + canvas (ribbon streams)
- Vitest (unit) · Playwright (e2e) · pnpm

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Verify (run before every commit)

```bash
pnpm typecheck
pnpm lint
pnpm test         # vitest
pnpm build
```

End-to-end (needs browsers once via `pnpm exec playwright install`):

```bash
pnpm test:e2e
```

## Structure

| Path | What |
| --- | --- |
| `app/` | layout, page assembly, global tokens |
| `components/sections/` | one component per page section |
| `components/hero/` | particle field, constellation, terminal, stats |
| `components/ui/` | reveal-on-scroll, scroll progress |
| `lib/content.ts` | **single source of truth** for all copy/data |
| `public/assets/` | portrait, hero render, CV |
| `design/` | Claude Design export (provenance, git-ignored) |

All visible copy lives in `lib/content.ts` — edit content there, not in markup.

## Deploy

Optimised for [Vercel](https://vercel.com): push the repo, import the project, ship.

---

© 2026 Marcin Sufa · built with too many agents ✦
