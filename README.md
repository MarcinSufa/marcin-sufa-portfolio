# Marcin Sufa — Portfolio

Personal portfolio of **Marcin Sufa** — senior frontend engineer & indie builder (Warsaw).
A single-page site with a dark/light theme, an animated WebGL hero, a tabbed work
showcase, and a workflow story.

### → Live: **[marcinsufa.com](https://marcinsufa.com)**

Lighthouse: **99 desktop · 95 mobile**, with **100 SEO**, **100 Best Practices**,
and AA accessibility.

## Highlights

- **Performance-first** — fully static export, WebP/responsive images, three.js
  deferred off the critical path, a static (zero-JS) hero on mobile. LCP < 1s.
- **Accessible** — semantic landmarks, visible focus, AA contrast, ARIA tabs,
  `prefers-reduced-motion` fallbacks, skip link.
- **Themed** — dark/light via CSS-variable design tokens + a no-flash theme script.
- **Typed & tested** — strict TypeScript, Vitest unit tests, Playwright e2e.
- **DRY content layer** — every word lives in `lib/content.ts`; components never
  hardcode copy.

## Tech

- [Next.js 15](https://nextjs.org) (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS v4 (CSS-variable theme tokens)
- three.js (hero particle field) + Canvas 2D (ribbon streams)
- Vitest · Playwright · pnpm

## Develop

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

Verify before committing:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

End-to-end (browsers once via `pnpm exec playwright install`):

```bash
pnpm test:e2e
```

## Structure

| Path | What |
| --- | --- |
| `app/` | layout, page assembly, global tokens, metadata, SEO routes |
| `components/sections/` | one component per page section |
| `components/hero/` | particle field, constellation, terminal, stats |
| `components/ui/` | reveal-on-scroll, scroll progress |
| `lib/content.ts` | single source of truth for all copy/data |
| `public/assets/` | portrait, hero render, CV |

## Deploy

Static export hosted on **GitHub Pages** at the custom domain. Every push to
`main` rebuilds and deploys automatically via GitHub Actions
(`.github/workflows/deploy.yml`).

---

© 2026 Marcin Sufa · Warsaw, PL
