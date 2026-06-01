# Nexify Africa

Marketing website for **Nexify Africa** — strategy, brand systems, digital products, and experiences for Africa's most disruptive thinkers.

**Repository:** [github.com/ezyerk2130/nexifyafrica](https://github.com/ezyerk2130/nexifyafrica)  
**Production URL:** [nexifyafrica.com](https://nexifyafrica.com) (set `NEXT_PUBLIC_SITE_URL` for metadata/sitemap)

---

## Tech stack

| Layer | Technology |
|--------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) + custom CSS in `src/app/globals.css` |
| Animation | [GSAP 3](https://gsap.com) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering/) |
| Analytics | [Vercel Analytics](https://vercel.com/docs/analytics) + [Speed Insights](https://vercel.com/docs/speed-insights) |
| Fonts | Inter (Google), Polymath Display (local), Geist (bundled) |
| Deployment | [Vercel](https://vercel.com) (recommended) |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — pinned hero, services grid (6 feature cards), footer |
| `/manifesto` | Long-form manifesto with pinned hero and sectioned content |
| `/team` | Team grid with scroll animations and hover card effects |
| `/case-studies` | Case study cards (coming-soon CTAs) |
| `/careers` | Coming soon placeholder |
| `/contact` | Contact form, phone country selector, office details |
| `404` | Branded not-found page |

Navigation is defined in `src/config/navigation.ts`.

---

## Features

- **Pinned hero** — Scroll-scrubbed intro exit, white background transition, and time-based reveal copy (`PinnedHero`)
- **Global smooth scrolling** — Single Lenis instance via `SmoothScrollProvider` in the root layout
- **Scroll-triggered animations** — Feature cards, team cards, and other sections use GSAP `ScrollTrigger.batch`
- **Reduced motion** — Respects `prefers-reduced-motion` for animations and smooth scroll
- **Responsive layout** — Mobile-first; homepage feature grid: 1 → 2 (tablet) → 3 (desktop) columns
- **SEO** — Metadata, Open Graph, Twitter cards, `robots.txt`, and `sitemap.xml`

---

## Project structure

```
nexifyafrica/
├── fonts/                    # Polymath Display OTF files
├── public/
│   ├── images/               # Manifesto, team, contact assets
│   └── nexify-africa-logo.png
├── src/
│   ├── app/                  # App Router pages & global styles
│   │   ├── layout.tsx        # Root layout, fonts, analytics, smooth scroll
│   │   ├── page.tsx          # Homepage
│   │   ├── globals.css       # Design tokens, components, page styles
│   │   └── [route]/page.tsx  # Route pages
│   ├── components/           # UI components (Hero, Footer, PinnedHero, etc.)
│   ├── config/               # Navigation & site config
│   ├── data/                 # Static content (manifesto, team, features, contact)
│   ├── hooks/                # useSmoothScroll, usePrefersReducedMotion
│   └── lib/                  # GSAP registration
├── next.config.ts
├── package.json
└── tsconfig.json
```

### Key components

| Component | Role |
|-----------|------|
| `PinnedHero` | Shared pinned scroll hero (home, manifesto, team, contact, case studies, careers) |
| `HeroSection` | Homepage hero copy + CTA |
| `NextSection` | Homepage 6-card services grid with scroll reveal |
| `SmoothScrollProvider` | Lenis + ScrollTrigger refresh on route change |
| `SiteNav` / `Footer` | Global navigation and footer |

### Content data

Edit copy in `src/data/`:

- `homeFeatures.ts` — Homepage service cards
- `manifesto.ts` — Manifesto sections and hero
- `team.ts` — Team members
- `contact.ts` — Address, email, phone
- `phoneCountries.ts` — Contact form country codes

---

## Design system

| Token | Value | Usage |
|-------|--------|--------|
| Brand blue | `#003B8C` | Hero, footer, buttons, accents |
| Body background | `#F4F6F8` | Content sections |
| Text (dark) | `#0C1018` | Headings and body on light sections |
| Border | `#E5E7EB` | Feature cards |
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

Create `.env.local` (optional):

```env
NEXT_PUBLIC_SITE_URL=https://nexifyafrica.com
```

Used for metadata base URL, `sitemap.xml`, and `robots.txt`. Defaults to `https://nexifyafrica.com` if unset.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To test on a device on your local network:

```bash
npm run dev:lan
```

### Production build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Deployment

The site is configured for **Vercel**:

1. Connect the GitHub repository to Vercel
2. Set `NEXT_PUBLIC_SITE_URL` to your production domain
3. Deploy — Next.js builds run automatically on push to `main`

Analytics and Speed Insights are included in `src/app/layout.tsx` and work on Vercel without extra setup.

---

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses CSS subgrid for homepage feature card alignment (Safari 16+, Chrome 117+, Firefox 71+).

---

## License

Private project. All rights reserved.
