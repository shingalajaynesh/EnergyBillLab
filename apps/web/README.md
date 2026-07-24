# Web Application

`apps/web` is the public Next.js App Router application for Energy Bill Lab.

## Responsibilities

- Public routes and static layout shell (46 prerendered static pages)
- 10 interactive energy cost calculators (5 launch + 5 expansion tools)
- 10 U.S. state electricity rate pages backed by PostgreSQL EIA monthly snapshots
- 5 deeply researched problem-solving energy guides
- Trust, legal, accessibility, and methodology pages
- Privacy-hardened analytics event tracking (`window.dataLayer`)
- Metadata, sitemap, robots, and structured data (JSON-LD) helpers
- Ant Design SSR registry and custom CSS Modules design system

## Important Paths

- Routes: `src/app/`
- Reusable UI components: `src/components/`
- Feature modules: `src/features/`
- Structured static content & benchmarks: `src/content/`
- Route, SEO, metadata, and site helpers: `src/lib/`
- Monorepo integration tests: `tests/`

## Commands

Run from the repository root unless debugging the app directly:

```bash
pnpm build:web
pnpm --filter @energy-bill-lab/web typecheck
pnpm --filter @energy-bill-lab/web lint
pnpm --filter @energy-bill-lab/web test
```
