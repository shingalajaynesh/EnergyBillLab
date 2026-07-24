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

  it('includes /electricity-bill-analyzer in public routes and sitemap', () => {
    const paths = publicRoutes.map((route) => route.href);
    expect(paths).toContain('/electricity-bill-analyzer');

    const sitemapUrls = sitemap().map((entry) => entry.url);
    expect(sitemapUrls.some((url) => url.endsWith('/electricity-bill-analyzer'))).toBe(true);
  });

  it('maintains expected 10 calculators (5 launch + 5 appliance expansion), 10 state rate pages, and 5 energy guides', () => {
    const paths = publicRoutes.map((route) => route.href);

    const calculators = paths.filter(
      (path) => path === '/electricity-bill-analyzer' || path.startsWith('/tools/'),
    );
    expect(calculators).toHaveLength(10);

    const statePages = paths.filter((path) => path.startsWith('/electricity-rates/'));
    expect(statePages).toHaveLength(30);

    const guides = paths.filter((path) => path.startsWith('/guides/') && path !== '/guides');
    expect(guides).toHaveLength(10);
  });

  it('includes trust and privacy routes in public route registry', () => {
    const paths = publicRoutes.map((route) => route.href);

    expect(paths).toContain('/privacy');
    expect(paths).toContain('/cookies');
    expect(paths).toContain('/terms');
    expect(paths).toContain('/disclaimer');
    expect(paths).toContain('/about');
    expect(paths).toContain('/contact');
    expect(paths).toContain('/methodology');
    expect(paths).toContain('/data-sources');
    expect(paths).toContain('/editorial-policy');
    expect(paths).toContain('/accessibility');
  });
});
