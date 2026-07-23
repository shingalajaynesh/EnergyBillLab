# Google AdSense Final Pre-Submission Checklist

**Target Domain:** energybilllab.com  
**Audit Completed:** July 23, 2026

Use this interactive checklist before submitting or requesting review in the Google AdSense console.

---

## 1. Technical & Verification Setup

- [x] **AdSense Script:** Verified script present in production `<head>` (`ca-pub-6303291083449043`).
- [x] **ads.txt File:** Verified plain text at `https://energybilllab.com/ads.txt` returning HTTP 200 with seller string `google.com, pub-6303291083449043, DIRECT, f08c47fec0942fa0`.
- [x] **Robots.txt Access:** Verified `/robots.txt` does not block `Mediapartners-Google` or `Googlebot`.
- [x] **Sitemap:** Verified `/sitemap.xml` returns valid XML containing only indexable canonical URLs.
- [x] **Canonical Domain:** Verified all pages use canonical `https://energybilllab.com`.
- [x] **No SSL Errors:** Site uses valid HTTPS across all public routes.

---

## 2. Policy & Quality Compliance

- [x] **No Placeholder Text:** Checked for and eliminated "Lorem ipsum", "Coming soon", "Planned", "will be published", and "no published entries yet".
- [x] **No Screens Without Content:** Centralized ad control via `isAdEligibleRoute()`. Zero ads allowed on dead-end legal, contact, or policy screens.
- [x] **No Deceptive UI:** No fake download buttons, false countdown timers, fake ratings, or deceptive controls.
- [x] **Original Utility Value:** Core interactive tool `/electricity-bill-analyzer` provides daily normalization, all-in rate breakdown, and state benchmark comparisons.

---

## 3. Trust & Transparency Pages

- [x] **About Page (`/about`):** Accurately describes Energy Bill Lab purpose, principles, and non-utility status.
- [x] **Contact Page (`/contact`):** Provides explicit monitored contact channel (`support@energybilllab.com`).
- [x] **Methodology Page (`/methodology`):** Documents transparent formulas, units, and estimation boundaries.
- [x] **Data Sources Page (`/data-sources`):** Documents official U.S. EIA Form EIA-861M data sources.
- [x] **Editorial Policy (`/editorial-policy`):** Documents source validation, human review standards, and corrections policy.
- [x] **Privacy Policy (`/privacy`):** Discloses cookies, GA4, GTM, Clarity, Vercel, AdSense, and CMP / EU User Consent compliance.
- [x] **Cookie Policy (`/cookies`):** Explains local storage, tracking categories, and user choices.
- [x] **Terms & Disclaimer (`/terms`, `/disclaimer`):** States informational boundaries and limits on estimates.

---

## 4. Submission Instructions

1. Verify domain resolution for `https://energybilllab.com`.
2. Confirm `support@energybilllab.com` is active.
3. Submit `https://energybilllab.com/sitemap.xml` in Google Search Console.
4. Go to Google AdSense Console -> Sites -> Select `energybilllab.com` -> Click **Request Review**.
5. Leave the site live and verification script intact while review is underway.
