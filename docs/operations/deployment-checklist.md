# Deployment & Search Engine Verification Checklist

**Site:** EnergyBillLab.com  
**Document:** `docs/operations/deployment-checklist.md`  
**Status:** Active Deployment & Search Indexing Guide
**Last Updated:** July 24, 2026 (50-State Full Production Audit)

---

## 1. Pre-Deployment Verification

Before triggering a production build or git push, confirm:

- [x] **Git Tree Status:** `git status --short` is clean or changes are intended and reviewed.
- [x] **Protected Files Unchanged:** `packages/database/src/clients/db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, and `render.yaml` have 0 diff.
- [x] **Typecheck:** `pnpm typecheck` passes with zero TypeScript errors.
- [x] **Linter:** `pnpm lint` passes cleanly across all monorepo packages.
- [x] **Code Format:** `pnpm format:check` confirms all files use Prettier style.
- [x] **Unit Tests:** `pnpm test` passes 100% of test suites across all packages.
- [x] **Local Production Build:** `pnpm build:web` (50 static state routes) and `pnpm build:api` complete cleanly.
- [x] **Secrets & Env:** Environment secrets (`DATABASE_URL`, `EIA_API_KEY`) are set in Vercel/Render dashboards, not committed.

---

## 2. Post-Deployment Verification

Immediately following production deployment, inspect:

- [ ] **Apex & WWW Resolution:** `https://energybilllab.com` and `https://www.energybilllab.com` resolve consistently.
- [ ] **Homepage:** Returns HTTP 200 and renders hero calculator link.
- [ ] **Calculators (10):** Verify `/electricity-bill-analyzer` and all 9 `/tools/[calculator]` pages compute results cleanly.
- [ ] **State Rate Pages (50 of 50):** Verify representative state pages (`/electricity-rates/maine`, `/connecticut`, `/nebraska`, `/hawaii`, `/alaska`, `/california`, `/texas`) render live EIA rates.
- [ ] **Guides Hub & Articles (10):** Verify `/guides` loads and all 10 guide articles render table captions and sources.
- [ ] **Research Hub & Report:** Verify `/research` and `/research/us-residential-electricity-rate-report` render correctly, resolve all 50 state links, and display 0 "Rate Data Only" badges.
- [ ] **CSV Export:** Verify `/research/us-residential-electricity-rate-report/csv` downloads 50-state CSV cleanly with HTTP 200.
- [ ] **Robots & Sitemap:** `https://energybilllab.com/robots.txt` and `https://energybilllab.com/sitemap.xml` resolve.
- [ ] **Ads.txt:** `https://energybilllab.com/ads.txt` returns HTTP 200 `text/plain` with publisher ID.
- [ ] **Health Endpoint:** `https://api.energybilllab.com/api/health` returns status `ok`.

---

## 3. Google Search Console Manual Checklist

Perform these manual owner actions in Google Search Console after deployment:

1. **Deploy Production Changes:** Verify production deployment finishes cleanly on Vercel.
2. **URL Inspection:** Open URL Inspection for representative state pages (`/electricity-rates/maine`, `/electricity-rates/hawaii`, `/electricity-rates/alaska`, `/electricity-rates/nebraska`).
3. **Test Live URL:** Run "Test Live URL" for each inspected page to verify rendering, mobile usability, and canonical tags.
4. **Request Indexing:** Click "Request Indexing" for the representative set of newly published state pages.
5. **Open Sitemaps:** Navigate to Indexing > Sitemaps in Google Search Console.
6. **Submit Sitemap:** Enter `sitemap.xml` and click Submit (resubmit if already present).
7. **Monitor Indexing Reports:** Review "Pages" reports weekly for "Crawled - currently not indexed", "Duplicate without user-selected canonical", and "Server error (5xx)" entries.
8. **Monitor Search Performance:** Track state-page impressions, clicks, CTR, and search queries under Performance.

---

## 4. Bing Webmaster Tools Manual Checklist

Perform these manual owner actions in Bing Webmaster Tools after deployment:

1. **Verify Sitemap:** Open Sitemaps tool and verify status of `https://energybilllab.com/sitemap.xml`.
2. **Submit Sitemap:** Resubmit `https://energybilllab.com/sitemap.xml` if needed.
3. **URL Submission:** Use URL Submission tool to submit a representative batch of state pages for fast crawling.
4. **Monitor Index Explorer:** Review Index Explorer, Crawl Details, and SEO Reports for any discovered crawl issues.

---

## 5. AdSense Review Period Safety Rules

During active Google AdSense site review:

1. **Keep Site Stable:** Avoid pushing major layout redesigns or untested code.
2. **Do Not Delete/Re-add:** Do not remove the site from AdSense or reset site review requests.
3. **Keep Script Tag Injected:** Ensure `NEXT_PUBLIC_ADSENSE_CLIENT_ID` script tag remains active in root layout `<head>`.
4. **Keep `ads.txt` Live:** Do not modify or remove `apps/web/public/ads.txt`.
5. **No Ad Placeholder Clutter:** Do not add empty ad containers or dummy banners alongside form controls.
