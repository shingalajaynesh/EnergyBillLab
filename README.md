# Energy Bill Lab

Energy Bill Lab is a public-first U.S. home-energy utility website. The foundation is a pnpm and Turborepo TypeScript monorepo with a Next.js public web app, a NestJS Fastify API, and shared package boundaries for contracts, database, design tokens, and future calculation formulas.

## Local Setup

```bash
pnpm install
pnpm dev
```

Copy `.env.example` into app-specific `.env.local` or `.env` files as needed. Keep real credentials out of source control.

## Commands

```bash
pnpm format:check
pnpm typecheck
pnpm lint
pnpm test
pnpm build:web
pnpm build:api
pnpm build
```

## Repository Structure

```text
apps/
  web/      Next.js App Router public website
  api/      NestJS Fastify API and scheduled-job host
packages/
  calculation-engine/  Pure calculation formulas, added in a later phase
  contracts/           Shared Zod contracts and API types
  database/            Drizzle schema, migrations, and database adapters
  design-system/       Ant Design theme tokens and product design constants
  eslint-config/       Shared ESLint flat config
  testing/             Shared test setup helpers
  typescript-config/   Shared strict TypeScript configs
docs/
  architecture/
  decisions/
  data-sources/
  product/
  runbooks/
```

## Deployment Responsibility

- Frontend: Vercel, serving public pages without relying on live Render API calls for critical shell rendering.
- API and scheduled jobs: Render, exposing versioned `/api/v1` routes.
- Database: Neon PostgreSQL through Drizzle migrations.
- Media: repository assets first; Cloudinary only when dynamic media is required.

## Phase Notes

This foundation intentionally does not implement calculators, public login, payments, CMS functionality, advertising placement, or AI chat. Those belong to later approved phases in `PROJECT_PLAN.md`.
