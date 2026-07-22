# Analytics, Design, and AdSense Technical Readiness Audit

**Site:** EnergyBillLab.com  
**Audit Date:** 2026-07-22  
**Status:** Audit Complete — Pre-Implementation Phase

---

## 1. Current Working-Tree Classification

- **Git status:** Working tree is clean. Recent commits (including `e048e21`, `26b9d72`, `46386ed`, `563001d`, `d73d22c`) contain prior scaffold, design tokens, route registry, GTM, Vercel Analytics, Speed Insights, and AdSense integrations.
- **Classification of files:**
  - `apps/web/src/app/layout.tsx`: Root layout with GTM, AdSense script, Vercel Analytics, Speed Insights, structured data, Ant Design registry & theme provider. (Task-related tracking / layout core).
  - `apps/web/public/ads.txt`: AdSense publisher record. (Existing intentional AdSense configuration).
  - `apps/web/src/lib/metadata.ts` & `site.ts`: SEO metadata helpers. (Task-related metadata core).
  - `apps/web/src/app/robots.ts` & `sitemap.ts`: Search engine crawl instructions and sitemap. (Task-related SEO core).
  - `apps/web/src/content/pages.ts`: Static content for trust/legal pages. (Task-related content repository).
  - `packages/design-system/src/theme.ts`: Ant Design theme tokens. (Task-related design system token source).

---

## 2. Existing Tracking Architecture

- The root layout loads:
  1. Google Tag Manager via `@next/third-parties/google` (`<GoogleTagManager gtmId="GTM-****RMMT" />`).
  2. AdSense loader script via `next/script` (`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-****4043`).
  3. `@vercel/analytics` (`<Analytics />`).
  4. `@vercel/speed-insights` (`<SpeedInsights />`).

---

## 3. Duplicate Scripts or Tags Audit

- **GA4:** No direct `gtag.js` script is injected in application code. GA4 is configured to fire through Google Tag Manager. No duplicate GA4 pageviews.
- **Microsoft Clarity:** No direct Clarity script present in application code. Clarity is managed via GTM.
- **GTM:** Initialized once in `apps/web/src/app/layout.tsx`.
- **AdSense Loader:** Loaded once via `next/script` in `apps/web/src/app/layout.tsx`.
- **Vercel Analytics & Speed Insights:** Initialized once in root layout.

---

## 4. Existing AdSense Verification Method

- **Method:** AdSense script snippet (`ca-pub-****4043`) in root layout + `ads.txt` at root domain.
- **Publisher ID:** `pub-****4043` / `ca-pub-****4043`.
- **Verification Status:** Script present in `<head>` / body via Next.js Script component (`strategy="afterInteractive"`).

---

## 5. Existing `ads.txt` Implementation

- **File location:** `apps/web/public/ads.txt`.
- **URL:** `https://energybilllab.com/ads.txt`.
- **Content:** `google.com, pub-****4043, DIRECT, f08c47fec0942fa0`.
- **Format:** Plain text, HTTP status 200, valid formatting, no HTML shell.

---

## 6. Existing Search Console Verification

- Currently relies on DNS / HTML meta options.
- **Enhancement:** Support `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Next.js root metadata verification config so verification meta tag renders seamlessly when configured in environment.

---

## 7. Existing Bing Verification

- Currently relies on DNS / meta options.
- **Enhancement:** Support `NEXT_PUBLIC_BING_SITE_VERIFICATION` in Next.js root metadata verification (`msvalidate.01`) so verification meta tag renders seamlessly when configured in environment.

---

## 8. Existing Sitemap and Robots Behavior

- **`robots.ts`:**
  - Allows all crawlers (`userAgent: '*'`, `allow: '/'`).
  - Disallows `/api/` and `/admin/`.
  - References canonical sitemap: `https://energybilllab.com/sitemap.xml`.
- **`sitemap.ts`:**
  - Includes all public routes marked `sitemap: true` in `apps/web/src/lib/routes.ts`.
  - Uses fixed last-modified ISO timestamp to prevent churn on rebuilds.
  - Priority and changeFrequency defined per route type.

---

## 9. Existing Clarity Implementation

- Managed via GTM container (`GTM-****RMMT`). No direct script in code to avoid duplication.

---

## 10. Existing GA4 Implementation

- Managed via GTM container (`GTM-****RMMT`). No direct `gtag` script in application code.

---

## 11. Existing GTM Implementation

- Loaded via official `@next/third-parties/google` `GoogleTagManager` component.
- Environment variable `NEXT_PUBLIC_GTM_ID` fallback preserves `GTM-****RMMT`.

---

## 12. Existing Vercel Analytics and Speed Insights Implementation

- Imported from `@vercel/analytics/next` and `@vercel/speed-insights/next`.
- Rendered safely inside root layout body without blocking SSR or static generation.

---

## 13. Policy-Page Gaps

- Privacy Policy covers general third-party logging, but needs explicit detailing of active tools (GTM, GA4, Clarity, Vercel Analytics, Vercel Speed Insights, AdSense cookies, personalized/non-personalized advertising, user choices, EEA/UK/US state consent rights).
- Cookie Policy page (`/cookies`) is currently missing from routes and needs to be created, added to route registry, sitemap, footer, and privacy cross-references.

---

## 14. Current Visual-Design Problems

- Homepage hero is overly basic and text-heavy without strong visual energy branding.
- Layout lacks high-end consumer-utility aesthetics (needs deep energy green palette, refined borders, clear visual grouping, subtle elevated surfaces).
- Component styling is minimal; requires Ant Design token centralization and CSS Modules polish.

---

## 15. Accessibility Problems

- Contrast on some text-muted colors needs verification against WCAG 2.2 AA (4.5:1 ratio).
- Focus states on custom interactive elements must be explicitly visible.
- Touch target sizes on header links and mobile drawer buttons must be at least 44×44px.
- Skip-to-content link exists, but focus outline needs highlighting.

---

## 16. Performance Risks

- Ant Design style injection could flash or cause hydration warnings if SSR registry is misplaced (verified `AntdRegistry` is properly wrapping theme provider).
- Next.js dynamic script loading must use proper strategies (`afterInteractive`) to prevent blocking main thread.

---

## 17. Proposed Changes

1. Add `/cookies` route and Cookie Policy page.
2. Update Privacy Policy with detailed active analytics & advertising disclosures.
3. Enhance `createRootMetadata` with `verification` support for Google (`google-site-verification`) and Bing (`msvalidate.01`).
4. Centralize & refine design system tokens in `packages/design-system/src/theme.ts`.
5. Redesign Header, Footer, Homepage, Hub pages (`/tools`, `/electricity-rates`, `/appliances`, `/guides`, `/comparisons`), and Legal/Content pages using pure Ant Design + CSS Modules.
6. Create comprehensive documentation for analytics, consent, AdSense readiness, environment variables, and deployment.
7. Add route registry and metadata tests.

---

## 18. Files That Must Remain Untouched

- `packages/calculation-engine/*` (no fake calculator logic).
- `apps/api/*` (no API changes).
- Neon / Drizzle database files.
- Credentials or real production environment files.

---

## 19. Manual External-Account Actions

- Google Tag Manager container configuration & container publish.
- Google Analytics 4 Realtime stream verification.
- Microsoft Clarity project verification.
- Google Search Console sitemap submission.
- Bing Webmaster Tools sitemap submission.
- Google AdSense Privacy & Messaging (CMP) setup for EEA/UK GDPR compliance.

---

## 20. AdSense Content-Readiness Risk

- **Status:** **Ready with manual actions** (Technical verification, crawlability, `ads.txt`, policy pages are ready; original calculator tools are under active development and must be completed in the next phase for full original content value).
- Note: Google AdSense approval is determined solely by Google.
