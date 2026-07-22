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

## 4. Tag Assistant and Realtime Testing

- **GTM Tag Assistant:** Open [tagassistant.google.com](https://tagassistant.google.com/) and enter `https://energybilllab.com` to debug GTM trigger events.
- **GA4 Realtime:** Inspect GA4 Realtime dashboard to verify pageview tracking via GTM.
- **Clarity Dashboard:** Verify session recording activity in Microsoft Clarity project settings.
