import { describe, expect, it } from 'vitest';

import sitemap from '../src/app/sitemap';
import { primaryNavigation, publicRoutes, sitemapRoutes } from '../src/lib/routes';

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

  it('keeps sitemap to public pages only', () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(sitemapRoutes).toHaveLength(urls.length);
    expect(urls.some((url) => url.includes('/admin'))).toBe(false);
    expect(urls.some((url) => url.includes('/api/'))).toBe(false);
  });
});
