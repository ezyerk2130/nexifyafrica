@AGENTS.md

# Nexify Africa — agent guide

Marketing site on **Next.js 16 (App Router) + React 19 + TypeScript**, with all content in **Sanity** (embedded Studio at `/studio`) and **GSAP/Lenis** animations.

> Heed `AGENTS.md`: this Next.js version has breaking changes. Check `node_modules/next/dist/docs/` before writing framework code.

## Commands

- `npm run dev` — dev server (`dev:lan` binds to `0.0.0.0`)
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`
- `npm run test` — Vitest unit tests
- `npm run test:e2e` — Playwright smoke tests (builds + serves on port 3100)

Always run `npm run lint` and `npm run typecheck` before declaring work done; run `npm run test` when touching shared logic.

This is a Windows/PowerShell environment — chain commands with `;`, not `&&`.

## Architecture

- **Content**: Sanity is the source of truth. `src/data/*` are static fallbacks used when Sanity is unreachable.
- **Data flow**: `src/sanity/lib/queries.ts` (GROQ + types) → page server components (`src/app/**/page.tsx`) → presentational components (`src/components/*`). Pages pass Sanity data as optional props; components fall back to local data when props are absent.
- **Images**: resolve via `src/sanity/lib/image.ts` — use `imageUrl(source, width?)` (returns `string | null`) or `urlFor` (returns a builder or `null`). Both are null-safe; never assume a source exists.
- **Schemas**: `src/sanity/schemaTypes/`. Documents: `caseStudy`, `service`, `faqItem`, `principle`, `teamMember`. Singletons: `homePage`, `manifestoPage`, `teamPage`, `contactPage`.
- **Revalidation**: `src/app/api/revalidate/route.ts` validates a bearer secret (+ optional HMAC) and revalidates a single content tag.

## Conventions

- **Fetching**: list queries use `sanityFetchList` (returns `[]`, never throws); object queries use `sanityFetch` (logs + rethrows, caught with `.catch(() => null)` in pages). Keep this pattern.
- **CMS-controlled URLs**: pass through `isSafeHref`/`safeHref` from `src/lib/url.ts` before rendering. Never render a raw CMS href.
- **GSAP**: register via `src/lib/gsap.ts`. Wrap animations in `gsap.context`, hoist `ctx` so the `catch` branch can `ctx?.revert()`, respect `usePrefersReducedMotion`, and always provide a no-motion fallback that sets the final visible state.
- **Styling**: Tailwind 4 + custom classes/tokens in `src/app/globals.css`. Brand blue `#003B8C`, body bg `#F4F6F8`. Reuse existing utilities (`.site-button`) and section spacing tokens.
- **Accessibility**: maintain the skip link, focus-trapped mobile menu (`SiteNav`), single section `h2`, and `inert` on collapsed FAQ panels.
- **Comments**: only for non-obvious intent. Do not narrate code.

## Don't

- Don't commit secrets — `.env.local` holds real Sanity tokens (gitignored). Document env vars with placeholders only.
- Don't bypass the static fallbacks or remove the `.catch` guards on Sanity fetches.
- Don't expose Sanity Vision in production or allow `/studio` in `robots.txt`.
