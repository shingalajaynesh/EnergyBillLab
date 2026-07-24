# Energy Bill Lab

Energy Bill Lab is a public-first U.S. home-energy utility website. It helps U.S. residents understand high electricity bills, estimate appliance operating costs, compare state electricity rates, and review transparent methodology and source notes.

## Current Status

Energy Bill Lab is a production-ready monorepo featuring:

- **Launch Calculators (5)**: Electricity Bill Analyzer, Appliance Energy Cost Calculator, Air Conditioner Cost Calculator, Space Heater Cost Calculator, EV Home Charging Cost Calculator.
- **Expansion Appliance Calculators (5)**: Refrigerator Cost Calculator, Clothes Dryer Cost Calculator, Electric Water Heater Cost Calculator, Pool Pump Cost Calculator, Dehumidifier Cost Calculator.
- **State Electricity Rate Pages (10)**: California, Texas, Florida, New York, Pennsylvania, Illinois, Ohio, Georgia, North Carolina, Michigan (backed by official Neon PostgreSQL U.S. EIA monthly data).
- **Problem-Solving Energy Guides (5)**: High bill diagnostics, appliance usage benchmarks, AC cooling costs, space heater costs, and EV home charging costs.
- **Trust & Policy System**: About, Contact, Methodology, Data Sources, Editorial Policy, Accessibility, Privacy Policy, Terms of Service, Disclaimer, Cookies.
- **Backend API & Scheduled Sync**: NestJS API with Fastify adapter, PostgreSQL Drizzle ORM, and automated EIA monthly data importer.

## Monorepo Overview

This is a pnpm and Turborepo TypeScript monorepo.

```text
apps/
  web/      Next.js App Router public website (46 prerendered static pages)
  api/      NestJS Fastify API service and EIA ingestion sync job
packages/
  calculation-engine/  Pure calculation formulas package (100% unit tested)
  contracts/           Shared Zod schemas and API types
  database/            Neon PostgreSQL schema, Drizzle client, migrations
  design-system/       Ant Design theme tokens and product constants
  eslint-config/       Shared ESLint flat config
  testing/             Shared test helpers
  typescript-config/   Shared strict TypeScript configs
docs/                  Human-facing project documentation
.ai/                   Agent instructions, active task context, ADRs, and prompts
```

## Technology Stack

- Package management: pnpm
- Task orchestration: Turborepo
- Language: TypeScript
- Web: Next.js App Router, React, Ant Design, CSS Modules, `@next/third-parties`
- API: NestJS with Fastify
- Validation: Zod shared contracts
- Database: Neon PostgreSQL with Drizzle ORM
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

Copy the relevant values into local ignored environment files (`.env.local`). Never commit real credentials.

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
- Product documentation: `docs/product/`
- Appliance expansion calculators: `docs/product/appliance-expansion-calculators.md`
- Production readiness report: `docs/operations/production-readiness.md`
- Local setup: `docs/development/local-setup.md`
- Repository structure: `docs/development/repository-structure.md`
- Testing and validation: `docs/development/testing.md`
- Deployment: `docs/operations/deployment.md`
- Environment variables: `docs/operations/environment-variables.md`
- SEO and AdSense notes: `docs/seo-adsense/seo-and-adsense.md`

## AI-Agent Instructions

All agents must start with `AGENTS.md`, then read `.ai/BRAIN.md`, `.ai/PROJECT_PLAN.md`, and `.ai/ACTIVE_TASK.md`.

Completed prompts in `.ai/prompts/completed/` are historical records. Do not execute them again.

## Security & Privacy

- PostgreSQL driver SSL connection mode warnings are accepted, non-fatal library warnings. `packages/database/src/clients/db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, and `render.yaml` are protected files.
- Zero user financial metrics, bill amounts, kWh values, rates, or geographic state names are transmitted in analytics events.

## Contribution Workflow

1. Read `CONTRIBUTING.md`.
2. Audit existing implementation before editing.
3. Search for existing functionality before creating new files.
4. Keep the change scoped to one coherent purpose.
5. Update tests and documentation when behavior or architecture changes.
6. Run required validation (`pnpm format:check ; pnpm typecheck ; pnpm lint ; pnpm test ; pnpm build:web ; pnpm build:api`).
7. Commit with `type(scope): concise description`.
