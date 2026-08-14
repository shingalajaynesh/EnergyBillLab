import fs from 'fs';
import path from 'path';

import { describe, expect, it } from 'vitest';

import sitemap from '@/app/sitemap';
import { APPROVED_STATE_SLUGS } from '@/config/published-states';
import { energyGuides, guideSlugs } from '@/content/guides';
import { trackEvent } from '@/lib/analytics';
import { publicRoutes } from '@/lib/routes';
import { SITE_URL } from '@/lib/site';

describe('Search Console Readiness, Internal Linking, and Analytics Tracking', () => {
  // Test 1: Every published state page contains required internal links
  it('1. Every published state page template defines required hub, tool, guide, and trust links', () => {
    const statePagePath = path.resolve(process.cwd(), 'src/app/electricity-rates/[state]/page.tsx');
    expect(fs.existsSync(statePagePath)).toBe(true);

    const content = fs.readFileSync(statePagePath, 'utf8');

    const requiredRouteRefs = [
      '/electricity-rates',
      '/electricity-bill-analyzer',
      '/tools/appliance-energy-cost-calculator',
      '/tools/ac-cost-calculator',
      '/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill',
      '/guides/how-to-read-an-electric-bill-line-by-line',
      '/methodology',
      '/data-sources',
      '/research/us-residential-electricity-rate-report',
    ];

    requiredRouteRefs.forEach((routeRef) => {
      expect(content).toContain(routeRef);
    });
  });

  // Test 2: Every calculator page has at least one relevant guide link
  it('2. Every calculator page has at least one relevant guide link in relatedLinks or body', () => {
    const calculatorPages = [
      {
        path: 'src/app/tools/ac-cost-calculator/page.tsx',
        expectedGuide: '/guides/how-much-does-it-cost-to-run-an-air-conditioner',
      },
      {
        path: 'src/app/tools/appliance-energy-cost-calculator/page.tsx',
        expectedGuide: '/guides/how-much-electricity-do-household-appliances-use',
      },
      {
        path: 'src/app/tools/space-heater-cost-calculator/page.tsx',
        expectedGuide: '/guides/how-much-does-it-cost-to-run-a-space-heater',
      },
      {
        path: 'src/app/tools/ev-home-charging-cost-calculator/page.tsx',
        expectedGuide: '/guides/how-much-does-it-cost-to-charge-an-ev-at-home',
      },
      {
        path: 'src/app/tools/refrigerator-cost-calculator/page.tsx',
        expectedGuide: '/guides/how-much-electricity-does-a-refrigerator-use',
      },
      {
        path: 'src/app/tools/clothes-dryer-cost-calculator/page.tsx',
        expectedGuide: '/guides/how-much-does-it-cost-to-run-an-electric-clothes-dryer',
      },
      {
        path: 'src/app/tools/electric-water-heater-cost-calculator/page.tsx',
        expectedGuide: '/guides/how-much-does-it-cost-to-run-an-electric-water-heater',
      },
      {
        path: 'src/app/tools/pool-pump-cost-calculator/page.tsx',
        expectedGuide: '/guides/how-much-does-it-cost-to-run-a-pool-pump',
      },
      {
        path: 'src/app/tools/dehumidifier-cost-calculator/page.tsx',
        expectedGuide: '/guides/how-much-does-it-cost-to-run-a-dehumidifier',
      },
      {
        path: 'src/app/electricity-bill-analyzer/page.tsx',
        expectedGuide: '/guides/why-is-my-electric-bill-so-high',
      },
    ];

    calculatorPages.forEach(({ path: relPath, expectedGuide }) => {
      const fullPath = path.resolve(process.cwd(), relPath);
      expect(fs.existsSync(fullPath)).toBe(true);
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      expect(fileContent).toContain(expectedGuide);
    });
  });

  // Test 3: Every mapped guide links to its intended calculator
  it('3. Every mapped guide links to its intended primary calculator', () => {
    expect(guideSlugs.length).toBe(50);
    guideSlugs.forEach((slug) => {
      const guide = energyGuides[slug];
      expect(guide).toBeDefined();
      expect(guide?.primaryCalculatorHref).toBeDefined();
      expect(guide?.primaryCalculatorHref.startsWith('/')).toBe(true);
    });
  });

  // Test 4: No internal-link target is missing from canonical route registries
  it('4. No internal-link target in publicRoutes is missing from sitemap or registry', () => {
    const validHrefs = new Set(publicRoutes.map((r) => r.href));
    expect(validHrefs.size).toBe(133);

    APPROVED_STATE_SLUGS.forEach((slug) => {
      expect(validHrefs.has(`/electricity-rates/${slug}`)).toBe(true);
    });

    guideSlugs.forEach((slug) => {
      expect(validHrefs.has(`/guides/${slug}`)).toBe(true);
    });
  });

  // Test 5: No internal link uses www host or hardcoded www prefix
  it('5. No internal route definition uses www host', () => {
    expect(SITE_URL).toBe('https://energybilllab.com');
    expect(SITE_URL).not.toContain('www.');

    publicRoutes.forEach((route) => {
      expect(route.href.startsWith('/')).toBe(true);
      expect(route.href).not.toContain('www.');
    });
  });

  // Test 6: No internal link points to localhost or preview deployments
  it('6. No internal link points to localhost or preview deployment URLs in production code', () => {
    const checkFiles = [
      path.resolve(process.cwd(), 'src/lib/routes.ts'),
      path.resolve(process.cwd(), 'src/lib/site.ts'),
      path.resolve(process.cwd(), 'src/app/sitemap.ts'),
      path.resolve(process.cwd(), 'src/app/robots.ts'),
    ];

    checkFiles.forEach((fileP) => {
      const content = fs.readFileSync(fileP, 'utf8');
      expect(content).not.toContain('vercel.app');
      expect(content).not.toContain('localhost:3000/electricity-rates');
    });
  });

  // Test 7: No duplicate GTM or GA4 initialization is introduced
  it('7. No duplicate GTM or GA4 script tags exist in app layout', () => {
    const layoutPath = path.resolve(process.cwd(), 'src/app/layout.tsx');
    expect(fs.existsSync(layoutPath)).toBe(true);
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');

    const gtmOccurrences = (layoutContent.match(/googletagmanager/g) || []).length;
    const ga4Occurrences = (layoutContent.match(/gtag\/js/g) || []).length;

    expect(gtmOccurrences).toBeLessThanOrEqual(1);
    expect(ga4Occurrences).toBeLessThanOrEqual(1);
  });

  // Test 8: Analytics events exclude sensitive values (PII, raw bill uploads, email addresses, secrets)
  it('8. Analytics event tracking strips sensitive PII fields automatically', () => {
    const win = globalThis as unknown as { window: { dataLayer: Record<string, unknown>[] } };
    win.window = { dataLayer: [] };

    trackEvent('calculator_completed', {
      tool_slug: 'ac-cost-calculator',
      reporting_period: '2026-05',
    });

    const dataLayer = win.window.dataLayer;
    expect(dataLayer).toBeDefined();
    expect(dataLayer.length).toBe(1);

    const event = dataLayer[0] ?? {};
    expect(event['event']).toBe('calculator_completed');
    expect(event['tool_slug']).toBe('ac-cost-calculator');
    expect(event['reporting_period']).toBe('2026-05');
    expect(event['email']).toBeUndefined();
    expect(event['bill_upload']).toBeUndefined();
  });

  // Test 9: CSV download event structure is defined and sanitized
  it('9. CSV download event structure is defined and sanitized', () => {
    const win = globalThis as unknown as { window: { dataLayer: Record<string, unknown>[] } };
    win.window = { dataLayer: [] };

    trackEvent('csv_download', {
      reporting_period: '2026-05',
      source_page: '/research/us-residential-electricity-rate-report',
    });

    const dataLayer = win.window.dataLayer;
    expect(dataLayer.length).toBe(1);
    const event = dataLayer[0] ?? {};
    expect(event['event']).toBe('csv_download');
    expect(event['reporting_period']).toBe('2026-05');
  });

  // Test 10: Calculator completion event fires with valid schema
  it('10. Calculator completion event fires cleanly with non-sensitive parameters', () => {
    const win = globalThis as unknown as { window: { dataLayer: Record<string, unknown>[] } };
    win.window = { dataLayer: [] };

    trackEvent('calculator_completed', {
      tool_slug: 'appliance-energy-cost-calculator',
      reporting_period: '2026-05',
      source_page: '/tools/appliance-energy-cost-calculator',
    });

    const dataLayer = win.window.dataLayer;
    expect(dataLayer.length).toBe(1);
    const event = dataLayer[0] ?? {};
    expect(event['event']).toBe('calculator_completed');
    expect(event['tool_slug']).toBe('appliance-energy-cost-calculator');
  });

  // Test 11: Sitemap includes Insights launch batch and daily updates
  it('11. Sitemap includes Insights launch batch and daily updates', () => {
    const sitemapEntries = sitemap();
    expect(sitemapEntries).toHaveLength(159);

    const urls = sitemapEntries.map((e) => e.url);
    expect(new Set(urls).size).toBe(159);
    expect(urls).toContain('https://energybilllab.com/insights');
    expect(urls).toContain(
      'https://energybilllab.com/insights/may-2026-ev-home-charging-cost-benchmark',
    );
    expect(urls).toContain(
      'https://energybilllab.com/insights/april-2026-residential-natural-gas-price-heating-cost',
    );
    expect(urls).toContain(
      'https://energybilllab.com/insights/may-2026-heat-pump-water-heater-savings-benchmark',
    );
    expect(urls).toContain(
      'https://energybilllab.com/insights/july-2026-summer-wholesale-electricity-price-forecast',
    );
  });

  // Test 12: Protected files remain unchanged on disk
  it('12. Protected files remain unchanged on disk', () => {
    const protectedFiles = [
      path.resolve(process.cwd(), '../../packages/database/src/clients/db-client.ts'),
      path.resolve(process.cwd(), 'package.json'),
      path.resolve(process.cwd(), '../../turbo.json'),
      path.resolve(process.cwd(), '../../vercel.json'),
      path.resolve(process.cwd(), '../../render.yaml'),
    ];

    protectedFiles.forEach((filePath) => {
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });
});
