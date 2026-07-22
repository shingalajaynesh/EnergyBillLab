# SEO And AdSense Notes

Energy Bill Lab must remain useful, public, and crawlable before calculator development begins.

## Current SEO Foundation

- Public routes are listed in `apps/web/src/lib/routes.ts`.
- Metadata helpers live in `apps/web/src/lib/metadata.ts`.
- Structured data helpers live in `apps/web/src/lib/structured-data.ts`.
- Sitemap generation lives in `apps/web/src/app/sitemap.ts`.
- Robots configuration lives in `apps/web/src/app/robots.ts`.

## AdSense Constraints

Do not invent an AdSense publisher ID or verification method. Preserve any verified `ads.txt` or AdSense verification implementation if one is added later.

No ad placements are implemented in the current product.
