# Deployment

See the root `README.md` for the deployment overview.

## Frontend

The public web application deploys to Vercel from the monorepo root. The tracked root `vercel.json` is the repository deployment configuration:

- framework: Next.js
- build command: `pnpm build:web`
- output directory: `apps/web/.next`

The previous `apps/web/vercel.json` duplicated Vercel configuration and used a different build command. It was removed so the repository has one Vercel deployment owner.

## API And Jobs

The API and future scheduled jobs are intended for Render. No Render service file is currently tracked. Add Render configuration only when the deployment is ready and the file contains no secrets.

## Secrets

Deployment secrets must be configured in the hosting provider, not committed to the repository.
