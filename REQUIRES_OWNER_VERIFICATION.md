# Owner Verification & Account Action Items

**Domain:** energybilllab.com  
**Audit Date:** July 28, 2026 (Documentation Synchronization)

This document outlines unresolved manual site owner actions and post-deployment verification items for Energy Bill Lab.

---

## Required Owner Actions & Verification Checklist

### 1. Production Deployment & Live Branding Assets

- [ ] **Deploy Latest Web Build:** Trigger production deployment on Vercel for current branding, metadata, and authorship updates.
- [ ] **Verify Live Branding HTTP Status:** Confirm live HTTP 200 response for canonical assets:
  - `https://energybilllab.com/favicon.ico`
  - `https://energybilllab.com/icon.png`
  - `https://energybilllab.com/apple-icon.png`
  - `https://energybilllab.com/opengraph-image.png`
  - `https://energybilllab.com/twitter-image.png`

### 2. Search Console & Indexing Verification

- [ ] **Google Search Console Indexing Request:** Inspect `https://energybilllab.com/` in Google Search Console and click "Request Indexing" once to notify Google of homepage updates.
- [ ] **Sitemap Submission:** Submit or verify `https://energybilllab.com/sitemap.xml` status in Search Console.
- [ ] **Google Favicon Crawl:** Note that Google Search favicon updating is asynchronous and may take days or weeks after indexing request.

### 3. Social Media Link Preview Refresh

- [ ] **LinkedIn Post Inspector:** Paste `https://energybilllab.com/` into LinkedIn Post Inspector to purge stale open graph caches.
- [ ] **Facebook Sharing Debugger:** Paste `https://energybilllab.com/` into Facebook Debugger and click "Fetch new scrape information".

### 4. Publisher Contact & Privacy Verification

- [ ] **Contact Email Monitoring:** Confirm `shingala.jaynesh@gmail.com` is actively monitored for user inquiries, data corrections, and accessibility feedback.
- [ ] **Live Author Byline Verification:** Confirm live guides and research report display `By Jaynesh Shingala`.

### 5. Manual EIA Ingestion Workflow

- [ ] **Terminal EIA Import:** When a new monthly EIA dataset is released, execute `pnpm --filter=@energy-bill-lab/api eia:sync-latest` from the terminal.
- [ ] **Vercel Cache Revalidation:** Trigger `/api/internal/revalidate-energy-data` using `x-revalidation-secret` or redeploy Vercel to update static SSG pages.
- [ ] **Maintain Data Update History:** Log new imported reporting periods in `apps/web/src/content/pages.ts` under `/data-sources`.
