# Local Setup

See the root `README.md` for the quick start.

## Prerequisites

- Node.js 22 or newer
- pnpm compatible with the root `packageManager`

## Install

```bash
pnpm install
```

## Environment

Copy the relevant example file before running an application locally:

- Root examples: `.env.example`
- Web examples: `apps/web/.env.example`
- API examples: `apps/api/.env.example`

Real environment files must remain ignored and must never be committed.

## Run Locally

```bash
pnpm dev
```

The web app runs from `apps/web`. The API runs from `apps/api`.
