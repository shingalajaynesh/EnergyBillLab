# Web Application

`apps/web` is the public Next.js App Router application for Energy Bill Lab.

## Responsibilities

- Public routes and layouts
- Trust, legal, and methodology pages
- Metadata, sitemap, robots, and structured data helpers
- Ant Design SSR registry and theme provider
- Future calculator UI

## Important Paths

- Routes: `src/app/`
- Reusable components: `src/components/`
- Structured static content: `src/content/`
- Route and SEO helpers: `src/lib/`
- Tests: `tests/`

## Commands

Run from the repository root unless debugging the app directly:

```bash
pnpm build:web
pnpm --filter @energy-bill-lab/web typecheck
pnpm --filter @energy-bill-lab/web lint
pnpm --filter @energy-bill-lab/web test
```

Do not add calculator logic, database access, authentication, ads, or analytics without an active task.
