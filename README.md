# Nexify Africa

Marketing website for **Nexify Africa** — strategy, brand systems, digital products, and experiences for Africa's most disruptive thinkers. Built on Next.js with all content managed through an embedded Sanity Studio.

**Repository:** [github.com/ezyerk2130/nexifyafrica](https://github.com/ezyerk2130/nexifyafrica)
**Production URL:** [nexifyafrica.com](https://nexifyafrica.com) (set `NEXT_PUBLIC_SITE_URL` for metadata/sitemap)

---

## Tech stack

| Layer | Technology |
|--------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| CMS | [Sanity v5](https://www.sanity.io) (embedded Studio at `/studio`, GROQ + ISR) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) + custom CSS in `src/app/globals.css` |
| Animation | [GSAP 3](https://gsap.com) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering/) |
| Rich text | [Portable Text](https://github.com/portabletext/react) (manifesto body) |
| Testing | [Vitest](https://vitest.dev) (unit) + [Playwright](https://playwright.dev) (e2e smoke) |
| CI | GitHub Actions (`lint → typecheck → unit → build → e2e`) |
| Analytics | [Vercel Analytics](https://vercel.com/docs/analytics) + [Speed Insights](https://vercel.com/docs/speed-insights) |
| Fonts | Inter (Google), Polymath Display (local), Geist (bundled) |
| Deployment | [Vercel](https://vercel.com) (recommended) |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — pinned hero, principles marquee, services grid, FAQ |
| `/manifesto` | Long-form manifesto rendered from Portable Text (blog-style, inline images) |
| `/team` | Team grid with per-member portraits and scroll animations |
| `/case-studies` | Case study cards |
| `/case-studies/[slug]` | Individual case study detail page (SSG from Sanity + local fallback) |
| `/careers` | Coming soon placeholder |
| `/contact` | Contact form, phone country selector, office details |
| `/studio` | Embedded Sanity Studio (content editing) |
| `404` | Branded not-found page |

Navigation is defined in `src/config/navigation.ts`.

---

## Content management (Sanity)

All site copy is managed in Sanity and fetched at build/request time, with the static files in `src/data/` acting as fallbacks if Sanity is unreachable.

**Studio:** visit `/studio` (e.g. [localhost:3000/studio](http://localhost:3000/studio)) to edit content.

**Schemas** (`src/sanity/schemaTypes/`):

| Type | Kind | Content |
|------|------|---------|
| `caseStudy` | document | Case study cards + full detail pages |
| `service` | document | Homepage service cards |
| `faqItem` | document | Homepage FAQ entries |
| `principle` | document | Homepage principles marquee |
| `teamMember` | document | Team members (name, role, portrait) |
| `homePage` | singleton | Hero copy, CTA, section headings |
| `manifestoPage` | singleton | Portable Text body with inline images |
| `teamPage` | singleton | Team hero + default portrait |
| `contactPage` | singleton | Hero, visual, contact details |

**Data flow:** `src/sanity/lib/queries.ts` (GROQ + types) → page server components → presentational components. Images resolve through `src/sanity/lib/image.ts` (`urlFor` / `imageUrl`, both null-safe).

**Revalidation:** the `/api/revalidate` route handles Sanity webhooks (ISR). It authenticates via an `Authorization: Bearer` secret (and optional HMAC signature) and revalidates only the affected content tag.

**Seeding:** the one-time migration script populates Sanity from `src/data/`:

```bash
npx tsx --env-file=.env.local scripts/seed-sanity.ts
```

---

## Features

- **Pinned hero** — Scroll-scrubbed intro exit, white background transition, and time-based reveal copy (`PinnedHero`)
- **Global smooth scrolling** — Single Lenis instance via `SmoothScrollProvider` (disabled on `/studio`)
- **Scroll-triggered animations** — Services, team, FAQ, and case-study cards use GSAP `ScrollTrigger.batch`, each with reduced-motion + cleanup fallbacks
- **Accessibility** — Skip-to-content link, focus-trapped mobile menu, `inert` collapsed FAQ panels, semantic headings
- **Security** — Security headers (`next.config.ts`), CMS URL sanitization (`isSafeHref`), dev-only Sanity Vision, `/studio` disallowed in `robots.txt`
- **SEO** — Metadata, Open Graph, Twitter cards, `robots.txt`, and a `sitemap.xml` that includes case study slugs

---

## Project structure

```
nexifyafrica/
├── .github/workflows/ci.yml   # Lint, typecheck, test, build, e2e
├── e2e/                        # Playwright smoke tests
├── fonts/                      # Polymath Display OTF files
├── public/
│   ├── images/                 # Manifesto, team, contact assets
│   └── nexify-africa-logo.png
├── scripts/
│   └── seed-sanity.ts          # One-time data migration to Sanity
├── src/
│   ├── app/                    # App Router pages & global styles
│   │   ├── layout.tsx          # Root layout, fonts, analytics, skip link
│   │   ├── page.tsx            # Homepage (fetches Sanity)
│   │   ├── globals.css         # Design tokens, components, page styles
│   │   ├── api/revalidate/     # Sanity webhook → ISR
│   │   ├── studio/[[...tool]]/ # Embedded Sanity Studio
│   │   └── [route]/page.tsx    # Route pages
│   ├── components/             # UI components (Hero, Footer, PinnedHero, etc.)
│   ├── config/                 # Navigation & site config
│   ├── data/                   # Static fallback content
│   ├── hooks/                  # useSmoothScroll, usePrefersReducedMotion
│   ├── lib/                    # GSAP registration, URL safety helpers
│   └── sanity/                 # Client, queries, image builder, schemas
├── sanity.config.ts            # Studio config (schemas, structure, plugins)
├── sanity.cli.ts
├── playwright.config.ts
├── vitest.config.ts
├── next.config.ts
└── package.json
```

### Key components

| Component | Role |
|-----------|------|
| `PinnedHero` | Shared pinned scroll hero (home, manifesto, team, contact, case studies, careers) |
| `HeroSection` | Homepage hero copy + CTA |
| `HomeServicesSection` | Homepage services grid with scroll reveal |
| `NextSection` | Homepage principles marquee |
| `HomeFaqSection` | Homepage FAQ accordion |
| `ManifestoPage` | Renders Portable Text body with inline full-width images |
| `SmoothScrollProvider` | Lenis + ScrollTrigger refresh on route change |
| `SiteNav` / `Footer` | Global navigation (focus-trapped mobile menu) and footer |

---

## Design system

| Token | Value | Usage |
|-------|--------|--------|
| Brand blue | `#003B8C` | Hero, footer, buttons, accents |
| Body background | `#F4F6F8` | Content sections |
| Text (dark) | `#0C1018` | Headings and body on light sections |
| Border | `#E5E7EB` | Cards |
| Display font | Polymath Display | Headlines, hero copy |
| Body font | Inter | Paragraphs, UI, forms |

Buttons use the `.site-button` utility (white outline on blue backgrounds; `.site-button--blue` on light sections).

---

## Getting started

### Prerequisites

- **Node.js** 20+
- **npm** (or pnpm / yarn)

### Install

```bash
git clone https://github.com/ezyerk2130/nexifyafrica.git
cd nexifyafrica
npm install
```

### Environment variables

Create `.env.local`:

```env
# Public site URL — used for metadata, sitemap.xml, robots.txt
NEXT_PUBLIC_SITE_URL=https://nexifyafrica.com

# Sanity (public)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Write token — only for the one-time seed script (Editor role)
SANITY_API_WRITE_TOKEN=your_write_token

# Webhook secret — mirror this value in the Sanity dashboard webhook settings
SANITY_WEBHOOK_SECRET=your_random_secret
# Optional: enable HMAC verification of Sanity webhooks
# SANITY_WEBHOOK_SIGNING_SECRET=your_signing_secret
```

> The app falls back to bundled static content if Sanity is unreachable, so it still renders without valid credentials (with warnings logged).

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit content at [http://localhost:3000/studio](http://localhost:3000/studio).

To test on a device on your local network:

```bash
npm run dev:lan
```

### Production build

```bash
npm run build
npm start
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the dev server |
| `npm run dev:lan` | Dev server bound to `0.0.0.0` for LAN access |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint over the project |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest unit tests |
| `npm run test:e2e` | Playwright smoke tests (builds + serves on port 3100) |

---

## Testing

- **Unit** — Vitest, e.g. `src/lib/url.test.ts` covers the `isSafeHref` URL sanitizer.
- **End-to-end** — Playwright smoke suite (`e2e/smoke.spec.ts`) verifies every route renders, the skip link exists, and the contact form is present. The Playwright web server uses a placeholder Sanity project so pages fall back to static content.

Run the full check locally:

```bash
npm run lint && npm run typecheck && npm run test && npm run test:e2e
```

---

## Deployment

The site is configured for **Vercel**:

1. Connect the GitHub repository to Vercel
2. Set environment variables (`NEXT_PUBLIC_SITE_URL`, the `NEXT_PUBLIC_SANITY_*` values, and `SANITY_WEBHOOK_SECRET`)
3. Add your production domain to the Sanity project's **CORS origins**
4. Create a Sanity webhook pointing to `https://<domain>/api/revalidate` with the `Authorization: Bearer <SANITY_WEBHOOK_SECRET>` header for content revalidation (ISR)
5. Deploy — Next.js builds run automatically on push to `main`

Analytics and Speed Insights are included in `src/app/layout.tsx` and work on Vercel without extra setup.

---

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses CSS subgrid for homepage card alignment (Safari 16+, Chrome 117+, Firefox 71+).

---

## License

Private project. All rights reserved.
