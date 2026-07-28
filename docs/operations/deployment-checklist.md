# Deployment & Search Engine Verification Checklist

**Site:** EnergyBillLab.com  
**Document:** `docs/operations/deployment-checklist.md`  
**Status:** Active Deployment & Search Indexing Guide
**Last Updated:** July 28, 2026 (Documentation Synchronization)

---

## 1. Pre-Deployment Verification

Before triggering a production build or git push, confirm:

- [x] **Git Tree Status:** `git status --short` is clean or changes are intended and reviewed.
- [x] **Protected Files Unchanged:** `packages/database/src/clients/db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, and `render.yaml` have 0 diff.
- [x] **Typecheck:** `pnpm typecheck` passes with zero TypeScript errors.
- [x] **Linter:** `pnpm lint` passes cleanly across all monorepo packages.
- [x] **Code Format:** `pnpm format:check` confirms all files use Prettier style.
- [x] **Unit Tests:** `pnpm test` passes 100% of test suites across all packages.
- [x] **Local Production Build:** `pnpm build:web` (137 static routes) and `pnpm build:api` complete cleanly.
- [x] **Secrets & Env:** Environment secrets (`DATABASE_URL`, `EIA_API_KEY`) are set in Vercel/Render dashboards, not committed.

---

## 2. Post-Deployment Verification

Immediately following production deployment, inspect:

- [ ] **Apex & WWW Resolution:** `https://energybilllab.com` (apex is canonical) and `https://www.energybilllab.com` (permanently redirects 301 to apex) resolve consistently.
- [ ] **Favicon & Branding Assets:**
  - `https://energybilllab.com/favicon.ico`
  - `https://energybilllab.com/icon.png`
  - `https://energybilllab.com/apple-icon.png`
  - `https://energybilllab.com/opengraph-image.png`
  - `https://energybilllab.com/twitter-image.png`
- [ ] **Homepage:** Returns HTTP 200 and renders hero calculator link.
- [ ] **Calculators (10):** Verify `/electricity-bill-analyzer` and all 9 `/tools/[calculator]` pages compute results cleanly.
- [ ] **State Rate Pages (50 of 50):** Verify representative state pages (`/electricity-rates/maine`, `/connecticut`, `/nebraska`, `/hawaii`, `/alaska`, `/california`, `/texas`) render live EIA rates.
- [ ] **Guides Hub & Articles (10):** Verify `/guides` loads and all 10 guide articles render table captions, inline citations, and sources.
- [ ] **Author Bylines:** Verify `By Jaynesh Shingala` byline renders cleanly on all guides and research reports.
- [ ] **Research Hub & Report:** Verify `/research` and `/research/us-residential-electricity-rate-report` render correctly, resolve all 50 state links, and display 0 "Rate Data Only" badges.
- [ ] **CSV Export:** Verify `/research/us-residential-electricity-rate-report/csv` downloads 50-state CSV cleanly with HTTP 200.
- [ ] **Robots & Sitemap:** `https://energybilllab.com/robots.txt` (includes OpenAI crawler rules) and `https://energybilllab.com/sitemap.xml` resolve.
- [ ] **Data Update History:** Verify `/data-sources` renders May 2026 EIA data update history.
- [ ] **Ads.txt:** `https://energybilllab.com/ads.txt` returns HTTP 200 `text/plain` with publisher ID.
- [ ] **Health Endpoint:** `https://api.energybilllab.com/api/health` returns status `ok`.

---

## 3. Vercel Manual Owner Actions

Perform these manual monitoring actions in the Vercel Dashboard:

- [ ] **Confirm Production Deployment:** Confirm latest deployment is marked Production and successful.
- [ ] **Review Functions Logs:** Check Vercel Functions logs for runtime exceptions or unhandled rejections.
- [ ] **Review 404 & 500 Errors:** Audit Vercel Analytics / Access Logs for any unexpected 404 broken routes or 500 server errors.
- [ ] **Check Failed Database Requests:** Inspect function execution logs for database connection timeouts or query errors.
- [ ] **Check Build Duration:** Ensure static generation of 137 static routes completes within allocated build time.
- [ ] **Check Web Vitals:** Verify Real Experience Score (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1) under Vercel Speed Insights.

---

## 4. Neon PostgreSQL Manual Owner Actions

Perform these manual monitoring actions in the Neon Console:

- [ ] **Review Connection Failures:** Check database connection pool metrics for dropped connections or auth failures.
- [ ] **Review Query Latency:** Monitor p95 query latency for rate snapshot queries.
- [ ] **Confirm Report Records:** Confirm May 2026 report records (`2026-05`) remain active and accessible.
- [ ] **Confirm 50 Canonical States:** Verify 50 state geographies and retail sales rows are intact.
- [ ] **Security Rule:** Do not expose connection credentials or database project IDs in public logs or documentation.

---

## 5. Google Search Console Manual Owner Actions

Perform these manual owner actions in Google Search Console after deployment:

- [ ] **Submit or Resubmit Sitemap:** Submit or resubmit `sitemap.xml` in Sitemaps tool.
- [ ] **Inspect Representative URLs:** Inspect key state routes (`/electricity-rates/hawaii`, `/electricity-rates/north-dakota`, `/electricity-rates/california`, `/electricity-rates/texas`).
- [ ] **Request Indexing:** Request indexing for a small, representative set of URLs only (do not blast mass requests).
- [ ] **Monitor Crawled — Currently Not Indexed:** Track the "Crawled - currently not indexed" report weekly.
- [ ] **Monitor Duplicate Without Canonical:** Verify no "Duplicate without user-selected canonical" warnings exist.
- [ ] **Monitor Server Errors:** Check 5xx server error trends in Coverage/Pages report.
- [ ] **Monitor Impressions & Queries:** Track impressions, clicks, average position, and top queries under Performance.

---

## 6. Bing Webmaster Tools Manual Owner Actions

Perform these manual owner actions in Bing Webmaster Tools after deployment:

- [ ] **Verify Sitemap:** Open Sitemaps tool and verify status of `https://energybilllab.com/sitemap.xml`.
- [ ] **Submit Sitemap:** Submit or resubmit `https://energybilllab.com/sitemap.xml` if needed.
- [ ] **Submit Representative URLs:** Submit a small set of representative URLs via URL Submission tool.
- [ ] **Monitor Crawl & Indexing Errors:** Review Index Explorer, Crawl Details, and SEO Reports for any crawl errors.

---

## 7. AdSense Review Period Safety Rules

During active Google AdSense site review:

1. **Keep Site Stable:** Avoid pushing major layout redesigns or untested code.
2. **Do Not Delete/Re-add:** Do not remove the site from AdSense or reset site review requests.
3. **Keep Script Tag Injected:** Ensure `NEXT_PUBLIC_ADSENSE_CLIENT_ID` script tag remains active in root layout `<head>`.
4. **Keep `ads.txt` Live:** Do not modify or remove `apps/web/public/ads.txt`.
5. **No Ad Placeholder Clutter:** Do not add empty ad containers or dummy banners alongside form controls.
