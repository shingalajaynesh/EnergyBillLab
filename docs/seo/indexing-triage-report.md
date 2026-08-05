# Energy Bill Lab — Indexing Triage & URL Audit Report

**Date:** August 5, 2026  
**Scope:** Investigation of 81 "Discovered – currently not indexed" and 6 "Crawled – currently not indexed" URLs from Search Console coverage export.

---

## 1. Classification Overview

| Category                   | Description                                                                                                   | Count | Action Taken                                                                                          |
| :------------------------- | :------------------------------------------------------------------------------------------------------------ | :---- | :---------------------------------------------------------------------------------------------------- |
| **HIGH_PRIORITY_INDEX**    | High-value search intent pages (e.g. Electric Kettle Guide, Billing Cycle Guide, High-performing State Pages) | 10    | Content & internal link enhancements applied; prioritized for manual Search Console URL Inspection.   |
| **VALID_BUT_LOW_PRIORITY** | Deep state sub-pages or niche guides with lower immediate search volume                                       | 45    | Preserved in sitemap; internal links strengthened from relevant parent hubs.                          |
| **DUPLICATE_OR_REDIRECT**  | Historical `www` URLs or trailing slash variations                                                            | 3     | Permanent 301 redirect to apex canonical (`https://energybilllab.com/*`); zero `www` URLs in sitemap. |
| **THIN_OR_OVERLAPPING**    | Empty category archives before reaching 3-article publication threshold                                       | 5     | Kept `noindex` until category publication threshold is met.                                           |
| **INTENTIONALLY_NOINDEX**  | Admin routes (`/admin/*`), API endpoints (`/api/*`), staging previews                                         | 20    | Kept excluded from sitemap and `noindex`.                                                             |
| **REMOVED_OR_OBSOLETE**    | Historical demo paths or deleted draft routes                                                                 | 4     | Verified 404/410 status; excluded from sitemap.                                                       |

---

## 2. Priority List for Manual Search Console URL Inspection (Top 10)

1. `https://energybilllab.com/guides/how-much-electricity-does-an-electric-kettle-use`
2. `https://energybilllab.com/guides/how-billing-cycle-length-affects-electricity-bills`
3. `https://energybilllab.com/guides/estimated-vs-actual-meter-reading`
4. `https://energybilllab.com/guides/how-much-electricity-does-an-electric-furnace-use`
5. `https://energybilllab.com/guides/what-is-vampire-power-and-how-much-does-it-cost`
6. `https://energybilllab.com/guides/fuel-adjustment-charges-and-utility-riders-explained`
7. `https://energybilllab.com/electricity-rates/wyoming`
8. `https://energybilllab.com/electricity-rates/montana`
9. `https://energybilllab.com/electricity-rates/north-carolina`
10. `https://energybilllab.com/insights/may-2026-residential-electricity-price-bill-impact`
