# Analytics and Webmaster Verification Architecture

**Site:** EnergyBillLab.com  
**Document:** `docs/operations/analytics-and-verification.md`  
**Last Updated:** 2026-07-22

---

## 1. Single Source of Truth Architecture

Energy Bill Lab uses **Google Tag Manager (GTM)** as the primary container for frontend analytics and third-party measurement tags.

```text
                               +-----------------------------+
                               |     Next.js Root Layout     |
                               +--------------+--------------+
                                              |
                     +------------------------+------------------------+
                     |                        |                        |
         +-----------v-----------+  +---------v----------+  +----------v----------+
         |  Google Tag Manager   |  |  Vercel Analytics  |  | Vercel Speed        |
         |   (GTM-****RMMT)      |  |  (@vercel/analytics|  | Insights            |
         +-----------+-----------+  +--------------------+  +---------------------+
                     |
         +-----------+-----------+
         |                       |
+--------v--------+    +---------v---------+
| Google Analytics |    | Microsoft Clarity |
| 4 (GA4)         |    | (Clarity)         |
+-----------------+    +-------------------+
```

### Key Prevention Rules

- **No Direct `gtag.js` In Code:** GA4 is loaded exclusively via GTM tags to prevent duplicate pageview counts.
- **No Direct Clarity In Code:** Microsoft Clarity is configured inside GTM to maintain unified container management.
- **Vercel Analytics & Speed Insights:** Retained directly in Next.js layout for edge performance and Core Web Vitals diagnostics.

---

## 2. Environment Configuration

Tracking and webmaster verification tokens use environment variables with safe defaults:

| Variable                               | Scope  | Purpose                          | Default / Fallback |
| -------------------------------------- | ------ | -------------------------------- | ------------------ |
| `NEXT_PUBLIC_GTM_ID`                   | Public | Google Tag Manager Container ID  | `GTM-****RMMT`     |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID`        | Public | Google AdSense Publisher ID      | `ca-pub-****4043`  |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Public | Search Console Meta Verification | Optional           |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`   | Public | Bing Webmaster Meta Verification | Optional           |

---

## 3. Webmaster Verification Guide

### Google Search Console

1. **HTML Meta Tag:** Rendered in root `<head>` metadata when `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is set.
2. **Sitemap Submission:** Confirm `https://energybilllab.com/sitemap.xml` in Search Console.
3. **Robots Check:** Ensure `https://energybilllab.com/robots.txt` is accessible and points to the canonical sitemap.

### Bing Webmaster Tools

1. **Meta Verification:** Rendered as `msvalidate.01` meta tag when `NEXT_PUBLIC_BING_SITE_VERIFICATION` is set.
2. **Sitemap Submission:** Submit `https://energybilllab.com/sitemap.xml` in Bing Webmaster portal.

---

## 5. July 2026 Analytics Baseline Snapshot

This document records the working baseline metrics established from Google Search Console, GA4, and Microsoft Clarity exports for July 2026:

### Google Search Console (July 21–27, 2026)

- **Totals:** 4 clicks, 1,297 impressions, ~0.31% CTR.
- **Desktop:** 4 clicks, 1,094 impressions, 0.37% CTR, average position 54.14.
- **Mobile:** 0 clicks, 201 impressions, 0% CTR, average position 20.10.
- **Country Distribution:** United States (1 click, 1,118 impressions, 0.09% CTR), India (3 clicks, 44 impressions, 6.82% CTR).
- **Top Queries & High-Impression Pages:** `eia north carolina average residential electricity price 2025` (click recorded at pos 6.2), North Carolina rate page (`/electricity-rates/north-carolina`), Ohio rate page (`/electricity-rates/ohio`), Oklahoma state page, Florida state page, AC cost calculator, refrigerator guide, dryer guide.

### Google Analytics 4 (July 1–28, 2026)

- **Active Users:** 95
- **New Users:** 95
- **Average Engagement Time:** 64.7 seconds
- **Total Events:** 1,515

### Microsoft Clarity (July 27–29, 2026)

- **Sessions:** 43
- **Unique Users:** 25
- **Pages per Session:** 6.12
- **Average Scroll Depth:** 52.76%
- **Dead-Click Sessions:** 7 (16.28%)
- **Quick-Back Sessions:** 19 (44.19%)
- **Performance:** LCP ~2.558s, INP ~104ms, CLS 0
