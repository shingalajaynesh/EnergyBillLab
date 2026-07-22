# Energy Bill Lab

Energy Bill Lab is a public-first U.S. home-energy utility website. It will help residents understand high electricity bills, estimate appliance operating costs, compare state electricity rates, and review transparent methodology and source notes.

## Current Status

The repository contains the monorepo foundation, Next.js public web shell, NestJS API foundation, shared package boundaries, design-system tokens, trust/legal pages, route registry, metadata helpers, sitemap, and robots configuration.

Calculator functionality is not implemented yet.

## Monorepo Overview

This is a pnpm and Turborepo TypeScript monorepo.

```text
apps/
  web/      Next.js App Router public website
  api/      NestJS Fastify API
packages/
  calculation-engine/  Future pure calculation formulas
  contracts/           Future shared Zod contracts and API types
  database/            Future Drizzle and Neon database code
  design-system/       Ant Design theme tokens and product constants
  eslint-config/       Shared ESLint flat config
  testing/             Future shared test helpers
  typescript-config/   Shared strict TypeScript configs
docs/                  Human-facing project documentation
.ai/                   Agent instructions, active task context, ADRs, and prompts
```

## Technology Stack

- Package management: pnpm
- Task orchestration: Turborepo
- Language: TypeScript
- Web: Next.js App Router, React, Ant Design, CSS Modules
- API: NestJS with Fastify
- Validation: Zod where shared contracts require it
- Database plan: Neon PostgreSQL with Drizzle ORM
- Frontend hosting: Vercel
- API/jobs hosting: Render

## Prerequisites

- Node.js 22 or newer
- pnpm compatible with the root `packageManager`

## Installation

```bash
pnpm install
```

## Environment Setup

Use tracked examples only as placeholders:

- `.env.example`
- `apps/web/.env.example`
- `apps/api/.env.example`

Copy the relevant values into local ignored environment files. Never commit real credentials.

## Development Commands

```bash
pnpm dev
pnpm build
pnpm build:web
pnpm build:api
```

## Validation Commands

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm typecheck
pnpm lint
pnpm test
pnpm build:web
pnpm build:api
```

## Application Locations

- Web app: `apps/web`
- API app: `apps/api`
- Shared packages: `packages`

See `apps/web/README.md` and `apps/api/README.md` for application-specific notes.

## Documentation Links

- Documentation index: `docs/README.md`
- Local setup: `docs/development/local-setup.md`
- Repository structure: `docs/development/repository-structure.md`
- Testing and validation: `docs/development/testing.md`
- Deployment: `docs/operations/deployment.md`
- Environment variables: `docs/operations/environment-variables.md`
- SEO and AdSense notes: `docs/seo-adsense/seo-and-adsense.md`

## AI-Agent Instructions

All agents must start with `AGENTS.md`, then read `.ai/BRAIN.md`, `.ai/PROJECT_PLAN.md`, and `.ai/ACTIVE_TASK.md`.

Completed prompts in `.ai/prompts/completed/` are historical records. Do not execute them again.

## Deployment Overview

- Vercel builds the public web app from the monorepo root using `vercel.json`.
- Render is the intended host for the API and future scheduled jobs.
- Neon PostgreSQL is the planned database platform for later database phases.

Deployment secrets belong in provider configuration, not in source control.

## Security Warning

Never commit real `.env` files, credentials, tokens, screenshots with secrets, or secret-bearing URLs. Values beginning with `NEXT_PUBLIC_` are exposed to browser code.

The repository owner should rotate any credential that was visible to an AI coding environment.

## Contribution Workflow

1. Read `CONTRIBUTING.md`.
2. Audit existing implementation before editing.
3. Search for existing functionality before creating new files.
4. Keep the change scoped to one coherent purpose.
5. Update tests and documentation when behavior or architecture changes.
6. Run required validation.
7. Commit with `type(scope): concise description`.
