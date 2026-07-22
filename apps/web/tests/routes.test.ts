import { describe, expect, it } from 'vitest';

import sitemap from '../src/app/sitemap';
import { primaryNavigation, publicRoutes } from '../src/lib/routes';

describe('public route registry', () => {
  it('uses unique lowercase kebab-case paths', () => {
    const paths = publicRoutes.map((route) => route.href);

    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toEqual(paths.map((path) => path.toLowerCase()));
    expect(paths.every((path) => !path.includes('_'))).toBe(true);
  });

  it('does not expose unpublished detail routes in primary navigation', () => {
    const navPaths = primaryNavigation.map((route) => route.href);

    expect(navPaths).toContain('/tools');
    expect(navPaths).not.toContain('/tools/electricity-bill-analyzer');
    expect(navPaths.every((path) => publicRoutes.some((route) => route.href === path))).toBe(true);
  });

  it('includes /cookies in public routes and legal footer group', () => {
    const paths = publicRoutes.map((route) => route.href);
    expect(paths).toContain('/cookies');

    const sitemapUrls = sitemap().map((entry) => entry.url);
    expect(sitemapUrls.some((url) => url.endsWith('/cookies'))).toBe(true);
  });
});
