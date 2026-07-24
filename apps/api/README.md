# API Application

`apps/api` is the NestJS with Fastify backend service for Energy Bill Lab.

## Responsibilities

- Versioned `/api/v1` API routes
- System health and database connectivity endpoints
- Automated monthly U.S. EIA retail electricity sales data ingestion service
- PostgreSQL (Neon) database schema sync and data validation

## Important Paths

- Entry point: `src/main.ts`
- Environment validation: `src/config/env.ts`
- EIA importer service: `src/infrastructure/eia/`
- API controllers & services: `src/modules/`

## Commands

Run from the repository root unless debugging the app directly:

```bash
pnpm build:api
pnpm --filter @energy-bill-lab/api typecheck
pnpm --filter @energy-bill-lab/api lint
pnpm --filter @energy-bill-lab/api test
```
