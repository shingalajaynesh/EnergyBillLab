# First Prompt for ChatGPT Codex / Claude / Gemini / Antigravity

You are the principal engineer starting EnergyBillLab.com. Behave like a staff-level engineer with 20+ years of practical experience building high-traffic, search-driven consumer web products.

Before doing anything:

1. Read `BRAIN.md` completely.
2. Read `PROJECT_PLAN.md` completely.
3. Inspect the repository structure and `git status`.
4. Search for existing routes, components, services, schemas, calculators, design tokens, and duplicate implementations.
5. Do not assume the repository is empty.
6. Do not modify or delete unrelated working code.

## Current objective

Establish or repair the Phase 0 project foundation for Energy Bill Lab without implementing all calculators yet.

The approved architecture is:

- pnpm + Turborepo monorepo
- `apps/web`: Next.js App Router + TypeScript
- Ant Design as the only general UI library
- Ant Design theme tokens + CSS Modules
- official Ant Design Next.js SSR/App Router integration
- `apps/api`: NestJS with Fastify adapter
- `packages/calculation-engine`: pure TypeScript formulas
- `packages/contracts`: shared Zod contracts
- `packages/database`: Drizzle + Neon PostgreSQL schema and migrations
- frontend deployment on Vercel
- backend/jobs deployment on Render
- no public login in MVP
- Clerk only later for admin or saved reports
- local optimized media first; Cloudinary only when dynamic media is actually required

## Strict change rules

- Make the smallest coherent change.
- Never create a second implementation when one already exists.
- When an existing feature overlaps, audit it and extend or refactor it.
- If replacement is necessary, build and test the replacement, migrate references, and only then remove obsolete code in the same change.
- Never delete a working feature first and leave the repository broken.
- Do not reformat unrelated files.
- Do not update the lockfile unless dependencies change.
- Do not add Tailwind, Bootstrap, Material UI, Chakra, shadcn, Mantine, or another design system.
- Do not create microservices.
- Do not add authentication, AI chat, payments, user accounts, comments, or a CMS during this task.
- Do not generate generic AI-looking design: no gradient blobs, glassmorphism, glow, excessive rounded cards, fake testimonials, emojis as icons, giant empty hero, or decorative animation.
- Do not add a dependency without checking whether the repository or platform already solves the need.
- Do not claim a command passed unless you ran it successfully.

## Required work

Audit the existing repository and implement only what is missing from this foundation:

1. Professional monorepo boundaries.
2. Strict shared TypeScript configuration.
3. Shared ESLint and formatting configuration.
4. Next.js App Router web application.
5. Ant Design App Router SSR registry and theme-token foundation.
6. Responsive application shell with a compact header, footer, page container, 404 page, and error boundary.
7. NestJS API using Fastify with versioned `/api/v1` routes.
8. `/api/v1/health/live` and `/api/v1/health/ready`.
9. Environment-variable validation with safe `.env.example` files.
10. Empty package boundaries for contracts, database, calculation engine, and design system, without fake implementations.
11. Test, lint, typecheck, and build scripts that work from the repository root.
12. CI workflow that runs install, typecheck, lint, tests, and builds.
13. A README containing local setup, commands, repository structure, and deployment responsibility.
14. Preserve the AdSense verification implementation if it already exists.
15. Preserve a working `/ads.txt` implementation if it already exists.

## Design expectations

The initial shell must look like a serious U.S. consumer data product:

- clean typography
- controlled whitespace
- restrained borders and shadows
- strong information hierarchy
- responsive mobile navigation
- calculator-first future layout
- no stock template appearance
- no excessive animation

Do not invent the final logo or large decorative artwork. Use a simple text brand until a reviewed identity exists.

## Performance expectations

- Server Components by default.
- Add `'use client'` only at the smallest boundary.
- No full-page loading screen.
- No unnecessary global state.
- No API call from the homepage merely to prove the API works.
- No Render dependency in the critical path of the public shell.
- Avoid large client bundles.

## Required response before editing

Output exactly this structure before making changes:

Repository findings:
- Existing implementation:
- Relevant files:
- Duplicate or overlapping code:
- Constraints:
- Risks:

Implementation scope:
- Will change:
- Will not change:

Then proceed with the implementation without asking for confirmation unless an action would destroy data, remove a major working feature, or require an unavailable credential.

## Validation required

Run all applicable commands:

- install
- format check
- typecheck
- lint
- unit tests
- web production build
- API production build

Inspect the final diff for accidental changes and unused code.

## Required final response

Completed:
- ...

Files changed:
- ...

Validation:
- install:
- format:
- typecheck:
- lint:
- tests:
- web build:
- API build:

Performance/SEO/accessibility impact:
- ...

Removed obsolete code:
- ...

Risks or follow-up:
- ...

Suggested commit:
- `chore(repo): establish Energy Bill Lab foundation`

Do not start Phase 1 calculators in this same change. Keep this first commit clean, reviewable, and production-grade.
