# Privacy and Consent Management Overview

**Site:** EnergyBillLab.com  
**Document:** `docs/operations/consent-management.md`  
**Last Updated:** 2026-07-22

---

## 1. Regulatory Overview

Energy Bill Lab is committed to user privacy and transparent consent management across applicable jurisdictions:

- **EEA & UK (GDPR / ePrivacy Directive):** Requires explicit user consent before storing or accessing non-essential cookies and personal identifiers for personalized advertising.
- **US State Privacy Laws (CCPA/CPRA, CPA, VCDPA, etc.):** Requires clear disclosure of data collection, opt-out choices for targeted advertising, and confirmation that personal data is not sold.

---

## 2. Google Privacy & Messaging (CMP) Integration

To ensure compliance with Google's EU User Consent Policy and AdSense requirements:

1. **Google-Certified CMP:** The site utilizes Google Privacy & Messaging (configured via the Google AdSense admin console) or an equivalent certified Consent Management Platform.
2. **Consent Signals:** AdSense and GTM tags respond to consent signals before serving personalized advertisements in applicable regions.
3. **No Forced Consent:** Users in consent-required regions must be provided clear options to Accept, Reject, or Manage cookie choices.

---

## 3. Application Code Responsibilities

- **Anonymous Public Calculators:** Core calculators run locally without forcing account creation or collecting personally identifiable information.
- **Data Minimization:** No utility account numbers, full addresses, or SSNs are collected or logged.
- **Policy Cross-Referencing:** The site maintains dedicated `/privacy` and `/cookies` routes linked in the footer across all pages.
