# Deployment & AdSense Review Checklist

**Site:** EnergyBillLab.com  
**Document:** `docs/operations/deployment-checklist.md`  
**Status:** Active Deployment Guide  
**Last Updated:** July 24, 2026

---

## 1. Pre-Deployment Verification

Before triggering a production build or git push, confirm:

- [x] **Git Tree Status:** `git status --short` is clean or changes are intended and reviewed.
- [x] **Protected Files Unchanged:** `packages/database/src/clients/db-client.ts`, `apps/web/package.json`, and `turbo.json` have 0 diff.
- [x] **Typecheck:** `pnpm typecheck` passes with zero TypeScript errors.
- [x] **Linter:** `pnpm lint` passes cleanly across all monorepo packages.
- [x] **Code Format:** `pnpm format:check` confirms all files use Prettier style.
- [x] **Unit Tests:** `pnpm test` passes 100% of test suites (65/65 tests).
- [x] **Local Build:** `pnpm build:web` and `pnpm build:api` complete cleanly.
- [x] **Secrets & Env:** Environment secrets (`DATABASE_URL`, `EIA_API_KEY`) are set in Vercel/Render dashboards, not committed.

---

## 2. Post-Deployment Verification

Immediately following production deployment, inspect:

- [ ] **Apex & WWW Resolution:** `https://energybilllab.com` and `https://www.energybilllab.com` resolve consistently.
- [ ] **Homepage:** Returns HTTP 200 and renders hero calculator link.
- [ ] **Calculators (5):** Verify `/electricity-bill-analyzer`, `/tools/appliance-energy-cost-calculator`, `/tools/ac-cost-calculator`, `/tools/space-heater-cost-calculator`, and `/tools/ev-home-charging-cost-calculator` compute results cleanly.
- [ ] **State Rate Pages (10):** Verify `/electricity-rates/california` and `/texas` display live EIA rates.
- [ ] **Guides Hub & Articles (5):** Verify `/guides` loads and all 5 guide articles render table captions and sources.
- [ ] **Robots & Sitemap:** `https://energybilllab.com/robots.txt` and `https://energybilllab.com/sitemap.xml` resolve.
- [ ] **Ads.txt:** `https://energybilllab.com/ads.txt` returns HTTP 200 `text/plain` with publisher ID.
- [ ] **Health Endpoint:** `https://api.energybilllab.com/api/health` returns status `ok`.

---

## 3. AdSense Review Period Safety Rules

During active Google AdSense site review:

1. **Keep Site Stable:** Avoid pushing major layout redesigns or untested code.
2. **Do Not Delete/Re-add:** Do not remove the site from AdSense or reset site review requests.
3. **Keep Script Tag Injected:** Ensure `NEXT_PUBLIC_ADSENSE_CLIENT_ID` script tag remains active in root layout `<head>`.
4. **Keep `ads.txt` Live:** Do not modify or remove `apps/web/public/ads.txt`.
5. **No Ad Placeholder Clutter:** Do not add empty ad containers or dummy banners alongside form controls.
