# AdSense Technical & Policy Readiness Audit

**Site:** EnergyBillLab.com  
**Document:** `docs/seo-adsense/adsense-readiness.md`  
**Status:** Ready with manual actions (Technical & Policy Verification)  
**Last Updated:** 2026-07-22

---

## Executive Summary

This document records the technical readiness, policy compliance, crawlability, and manual external configuration required for Google AdSense verification at EnergyBillLab.com.

> [!IMPORTANT]
> **AdSense Approval Disclaimer**: AdSense approval is an external Google decision. No tool, agent, or document can guarantee approval. Energy Bill Lab maintains full code-level, policy-level, and architectural readiness to support active review.

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
Original content: Ready (Production Electricity Bill Analyzer implemented)
Overall readiness: Technical preparation complete; external CMP configuration and verification required
```
