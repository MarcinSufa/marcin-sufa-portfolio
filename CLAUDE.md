# Marcin Sufa — Portfolio

Personal/professional one-page portfolio for Marcin Sufa (AI-native frontend engineer, Warsaw).

## Stack
- **Next.js 15** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-variable theme tokens, dark + light)
- **three.js** for the hero particle field; raw canvas for the ribbon streams
- **pnpm** package manager · **Vitest** (unit) · **Playwright** (e2e)
- Deploys to **Vercel**

## Project shape
- `app/` — `layout.tsx` (fonts, metadata, no-flash theme), `page.tsx` (section assembly), `globals.css` (theme tokens + keyframes)
- `components/` — `site-nav`, `site-footer`, `theme-provider`, `ui/` primitives (`reveal`, `scroll-progress`), `sections/` (one file per page section), `hero/` (particle field, constellation, terminal, stats)
- `lib/content.ts` — **single source of truth for ALL copy/data**. Components never hardcode visible text; they read from here (DRY).
- `design/` — provenance only: the approved Claude Design export (`*.dc.html` + assets). Git-ignored, never hand-edited. Production code lives in `app/` + `components/`.
- `public/assets/` — portrait, hero render, CV.

## Theming
Tokens live as CSS variables in `app/globals.css` (`:root` = dark, `.theme-light` = light) and are mapped into Tailwind via `@theme inline`. Use token utilities (`bg-surface`, `text-text2`, `border-border`, `text-accent`, …), never raw hex. Accent-tinted backgrounds: `rgba(var(--accent-rgb), <a>)`. The theme is toggled by `components/theme-provider.tsx` (swaps `.theme-light` on `<html>`, persisted to `localStorage` as `ms-theme`); a no-flash inline script in `layout.tsx` applies it before paint.

## Engineering conventions (from the ExoVault workflow)
- DRY · explicit > clever · engineered enough · validate at boundaries.
- TypeScript: no `any` unless unavoidable; proper generics.
- Respect `prefers-reduced-motion` — heavy animations (field, ribbons, count-ups, reveals) degrade gracefully.

## Verification (MANDATORY before commit — see `/verify`, `/ship`)
Run sequentially, fix failures before committing:
```
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```
Use `pnpm`, never `npx`. Only the human merges to `main`.

## Guardrails
`.claude/never-do.json` (consumed by the global PreToolUse hook): `design/**` is ask-before-edit (regenerate in Claude Design instead); `.next/**` + `out/**` are deny (build output).
