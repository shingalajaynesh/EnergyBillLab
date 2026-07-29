# Active Task

## Current Task

- Phase: Focused Analytics-Driven SEO, Usability, & Internal Linking Sprint
- Date: July 28–29, 2026
- Status:
  - PASS — corrections completed locally
  - PENDING — production deployment, browser review, Clarity validation, live analytics verification, and production smoke testing
- Analytics Baseline Integration (Reporting Periods Kept Distinct):
  - Search Console (July 21–27, 2026): 4 clicks, 1,297 impressions, overall CTR ~0.31%. Desktop: 4 clicks, 1,094 impressions (0.37% CTR, pos 54.14). Mobile: 0 clicks, 201 impressions (0% CTR, pos 20.10). US: 1 click, 1,118 impressions. India: 3 clicks, 44 impressions.
  - GA4 (July 1–28, 2026): 95 active users, 95 new users, average engagement 64.7s, 1,515 events.
  - Clarity (July 27–29, 2026): 43 sessions, 25 unique users, 6.12 pages/session, 52.76% avg scroll depth, 7 dead-click sessions (16.28%), 19 quick-back sessions (44.19%), LCP 2.558s, INP 104ms, CLS 0.
- Corrections & Verification Completed:
  1. **Canonical Host & Redirect Reporting:** `www permanently redirects to the equivalent apex URL`.
  2. **Dynamic Reporting Period:** North Carolina EIA section derives reporting period (`{pageData.latestSourceMonthFormatted}`) dynamically from shared common-period data model without hardcoded month strings.
  3. **Homepage Task Selection:** Homepage task cards (`/src/components/homepage-task-selection.tsx`) map to distinct destinations (`Understand why my bill increased` -> `/guides/why-is-my-electric-bill-so-high`; `Analyze my electricity bill` -> `/electricity-bill-analyzer`).
  4. **Analytics Interaction Tracking:** Task cards invoke `trackEvent('homepage_task_click', { destination_page, source_page, task_name })` with sanitized parameters excluding PII or bill inputs.
  5. **Internal Link Relevance:** Removed contextually forced state links from refrigerator, dryer, and AC pages. Replaced with relevant calculator, appliance hub, state rate hub (`/electricity-rates`), and national report links.
  6. **Regulatory Sourced Claims:** Official NCUC source (`https://www.ncuc.gov/`) and PUCO source (`https://puco.ohio.gov/`) included in state configuration sources.
  7. **Dead-Click Reporting:** A likely dead-click source was corrected by converting non-interactive cards into real links. Post-deployment Clarity validation remains pending.
  8. **Mobile Reporting:** Mobile source-level checks: Passed. Real mobile browser review: Skipped.
  9. **Performance Reporting:** Local build passed; post-deployment performance impact remains unverified.
  10. **Protected Files Unchanged:** `db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, and `render.yaml` have 0 diff.
  11. **Strict Git Rules:** Zero Git write commands executed; all changes remain unstaged in working tree.
- Suggested Commit: `feat(seo): improve priority pages using search and behavior data`

