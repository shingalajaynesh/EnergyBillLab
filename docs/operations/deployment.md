# Deployment Overview

This document describes the deployment architecture and environment configuration for Energy Bill Lab.

---

## Web Application (Vercel)

The public web application deploys to Vercel from the monorepo root using the tracked root `vercel.json`:

- **Framework**: Next.js (App Router)
- **Build Command**: `pnpm build:web`
- **Output Directory**: `apps/web/.next`
- **Canonical Host**: `https://energybilllab.com` (apex domain; `www` permanently redirects to apex)

---

## API Application (Render)

The NestJS API service deploys to Render using the tracked root `render.yaml` blueprint:

- **Build Command**: `pnpm install --frozen-lockfile && pnpm db:migrate && pnpm build:api`
- **Pre-Deploy Command**: `pnpm db:migrate` (executes database migrations before new API builds go live)
- **Start Command**: `node apps/api/dist/src/main.js`

_Note: EIA data updates are executed manually from the owner's terminal via `pnpm --filter=@energy-bill-lab/api eia:sync-latest`. GitHub Actions cron schedules and remote sync triggers are not used._

---

## Database Migrations (Neon PostgreSQL)

1. **Render (API)** executes `preDeployCommand: pnpm db:migrate` automatically before building the API.
2. **Vercel (Web)** executes `pnpm build:web` to pre-render static SSG pages using validated PostgreSQL snapshot data.

---

## Environment Secrets

Deployment secrets must be configured in Render and Vercel dashboard environment settings and never committed to Git:

- `DATABASE_URL`: PostgreSQL connection string (Neon DB).
- `DATABASE_READ_URL`: Read-replica connection string (optional).
- `EIA_API_KEY`: Official U.S. EIA API Key.
- `ENERGY_DATA_REVALIDATION_SECRET`: Secret token for Vercel cache revalidation endpoint.
