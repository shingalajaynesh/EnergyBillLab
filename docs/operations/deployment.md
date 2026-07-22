# Deployment

See the root `README.md` for the deployment overview.

## Frontend

The public web application deploys to Vercel from the monorepo root. The tracked root `vercel.json` is the repository deployment configuration:

- framework: Next.js
- build command: `pnpm build:web`
- output directory: `apps/web/.next`

The previous `apps/web/vercel.json` duplicated Vercel configuration and used a different build command. It was removed so the repository has one Vercel deployment owner.

## API And Jobs

The NestJS API and scheduled monthly EIA sync job deploy to Render using the root `render.yaml` blueprint:

- **Build Command**: `pnpm install --frozen-lockfile && pnpm db:migrate && pnpm build:api`
- **Pre-Deploy Command**: `pnpm db:migrate` (runs automatically on every git commit push before new code goes live)
- **Start Command**: `node apps/api/dist/src/main.js`
- **Cron Job**: Scheduled monthly rate sync running `pnpm data:eia:sync` on the 5th of every month.

## Automated Database Migrations

When you push code to GitHub:

1. **Render (API)** executes `preDeployCommand: pnpm db:migrate` automatically before building and starting the API. Tables are auto-created in Neon.
2. **Vercel (Web)** build command can be set to `pnpm db:migrate && pnpm build:web` in Vercel project settings to ensure Neon tables exist before Next.js pre-renders SSG pages.

## Secrets

Deployment secrets (`DATABASE_URL`, `DATABASE_READ_URL`, `EIA_API_KEY`) must be configured in Render and Vercel dashboard environment settings, not committed to git.
