# AdSense Technical & Policy Readiness Audit

**Site:** EnergyBillLab.com  
**Document:** `docs/seo-adsense/adsense-readiness.md`

**Status:** AdSense review rejected for Low value content on 2026-11-17

**Last Updated:** 2026-11-17

---

## Executive Summary

This document records the technical readiness, policy compliance, crawlability, and manual external configuration required for Google AdSense verification at EnergyBillLab.com.

> [!IMPORTANT]
> **AdSense Approval Disclaimer**: AdSense approval is an external Google decision. No tool, agent, or document can guarantee approval. The technical checks below are historical. On November 17, 2026, AdSense showed ads.txt as Authorized and flagged Low value content.

---

## 1. Technical Verification Status

| Check                     | Expected                                             | Actual Status                                                          |
| ------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------- |
| AdSense Verification Code | Script tag in `<head>`/layout                        | **Pass** — Injected in `apps/web/src/app/layout.tsx` via `next/script` |
| Publisher Client ID       | `ca-pub-****4043`                                    | **Pass** — Configured with safe fallback in `site.ts`                  |
| `ads.txt` Location        | `https://energybilllab.com/ads.txt`                  | **Pass** — `apps/web/public/ads.txt` returns HTTP 200 plain text       |
| `ads.txt` Line Syntax     | `google.com, pub-****4043, DIRECT, f08c47fec0942fa0` | **Pass** — Exact publisher line from user                              |
| Page Crawlability         | Public pages unblocked                               | **Pass** — `robots.ts` allows indexation; canonical host HTTPS         |

---

## 2. Policy-Page Completeness

The website maintains clear, readable, and accurate policy and trust pages matching active site integrations:

- **About (`/about`):** Details Energy Bill Lab's mission as an independent home energy data project.
- **Contact (`/contact`):** Provides verified contact guidelines without inventing fake phone numbers or addresses.
- **Methodology (`/methodology`):** Explains formula transparency, calculation limits, and estimation principles.
- **Data Sources (`/data-sources`):** Documents reliance on official U.S. EIA data and public state records.
- **Editorial Policy (`/editorial-policy`):** Governs human editorial review and prohibits AI slop.
- **Privacy Policy (`/privacy`):** Discloses GTM, GA4, Clarity, Vercel Analytics, Speed Insights, and AdSense cookies.
- **Cookie Policy (`/cookies`):** Details essential, performance, analytics, and advertising cookie categories and user choices.
- **Terms (`/terms`) & Disclaimer (`/disclaimer`):** Clarifies that calculations are informational estimates.
- **Accessibility (`/accessibility`):** Targets WCAG 2.2 AA standards with feedback paths.

---

## 3. Mandatory Ad Placement Rules (Post-Approval)

When ad units are implemented following account approval:

1. **No Ad Unit Clutter During Review:** No ad units, Auto Ads placeholders, or empty ad blocks are injected during active review.
2. **Visual Separation:** Ad units must be visually distinct from calculator inputs, controls, tabs, and action buttons.
3. **No Deceptive Layouts:** Ads must never resemble calculator output cards, download buttons, or navigation links.
4. **Layout Shift Prevention:** Fixed height containers must reserve space for ad units to maintain CLS performance (CLS &le; 0.1).
5. **Content Dominance:** Editorial and tool content must remain the primary visual element on every page.

---

## 4. Manual External-Account Actions Required

The repository owner must complete these steps in the Google AdSense and webmaster dashboards:

1. **AdSense Site Status Check:** Log in to [Google AdSense](https://www.google.com/adsense/) and verify site status for `energybilllab.com`.
2. **Privacy & Messaging CMP Setup:** Enable Google Privacy & Messaging (or an approved Google-certified CMP) in AdSense for European Economic Area (EEA) and UK GDPR consent compliance.
3. **`ads.txt` Verification:** Confirm that the AdSense crawler has detected `https://energybilllab.com/ads.txt`.
4. **Google Search Console:** Submit `https://energybilllab.com/sitemap.xml` and verify canonical indexation.

---

## 5. Readiness Status Matrix

```text
Technical verification: Ready
Ads.txt: Ready
Crawlability: Ready
Policy pages: Ready
Consent: Technical preparation complete; external CMP configuration and verification required
Original content: AdSense review flagged Low value content on November 17, 2026
Overall readiness: Content remediation in progress
```

## November 17 content review

The homepage featured three modeled comparisons without enough context about how to apply the numbers. The whole-house fan Insight now compares actual compressor runtime displaced. The EV comparison distinguishes battery consumption from the electricity measured at the wall. The water-heater summary separates modeled running costs from installation quotes. The Electricity Bill Analyzer now explains a two-statement example, including how a longer period appears in the residual.

## Follow-up on overlapping articles

The existing permanent redirects already consolidate the standby-power and refrigerator Insights into their guides. Both archived Insight URLs are excluded from the sitemap. The standby-power guide now shows readers how to measure a device at the wall and estimate savings from a measured change. The example and chart share the same assumptions and no longer claim a universal household load or smart-strip savings.

The time-of-use guide explains how to read an entire plan, while the published load-shifting Insight models individual appliance cycles. These answer different questions. The remaining guide and state inventories still need claim and overlap checks.
