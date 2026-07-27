import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { metadata } from '../src/app/comparisons/page';
import type { PublicRouteHref } from '../src/lib/routes';
import { publicRoutes } from '../src/lib/routes';
import { getSiteUrl } from '../src/lib/site';

describe('/comparisons page & routing integrity', () => {
  it('is registered as a valid public route in the canonical route registry', () => {
    const route = publicRoutes.find((r) => r.href === '/comparisons');
    expect(route).toBeDefined();
    expect(route?.group).toBe('research');
    expect(route?.sitemap).toBe(true);
  });

  it('verifies exactly one h1 heading tag exists in the page component source', () => {
    const pageFilePath = path.resolve(__dirname, '../src/app/comparisons/page.tsx');
    const source = fs.readFileSync(pageFilePath, 'utf-8');

    const h1Matches = source.match(/<h1[\s>]/g) || [];
    expect(h1Matches).toHaveLength(1);
    expect(source).toContain('Compare Energy Costs Before You Choose');
  });

  it('exports correct metadata title, description, and canonical URL', () => {
    expect(metadata.title).toBe('Home Energy Cost Comparisons & Calculators');
    expect(metadata.description).toBe(
      'Compare household appliances, heating systems, cooling equipment, EV charging, and electricity-rate plans using transparent energy-use and cost formulas.',
    );
    expect(metadata.alternates?.canonical).toBe('/comparisons');
    expect(getSiteUrl(metadata.alternates?.canonical as string)).toBe(
      'https://energybilllab.com/comparisons',
    );
  });

  it('contains valid links to /methodology, /data-sources, /electricity-bill-analyzer, /electricity-rates, /disclaimer, and /editorial-policy', () => {
    const validHrefs = new Set<string>(publicRoutes.map((r) => r.href));

    const requiredHrefs: PublicRouteHref[] = [
      '/electricity-bill-analyzer',
      '/electricity-rates',
      '/methodology',
      '/data-sources',
      '/disclaimer',
      '/editorial-policy',
      '/tools',
      '/guides',
      '/appliances',
    ];

    requiredHrefs.forEach((href) => {
      expect(validHrefs.has(href)).toBe(true);
    });
  });

  it('verifies Quick Comparison launcher options point only to valid public routes', () => {
    const launcherFilePath = path.resolve(
      __dirname,
      '../src/app/comparisons/quick-comparison-launcher.tsx',
    );
    const source = fs.readFileSync(launcherFilePath, 'utf-8');
    const validHrefs = new Set<string>(publicRoutes.map((r) => r.href));

    const routeMatches = source.match(/route:\s*'([^']+)'/g) || [];
    expect(routeMatches.length).toBeGreaterThan(0);

    routeMatches.forEach((match) => {
      const route = match.replace(/route:\s*'([^']+)'/, '$1');
      expect(validHrefs.has(route)).toBe(true);
    });
  });

  it('verifies featured comparison cards have 10 unique titles, exactly 6 initially visible, and 10 when expanded', () => {
    const cardsFilePath = path.resolve(
      __dirname,
      '../src/app/comparisons/popular-comparisons-grid.tsx',
    );
    const source = fs.readFileSync(cardsFilePath, 'utf-8');
    const validHrefs = new Set<string>(publicRoutes.map((r) => r.href));

    const hrefMatches = source.match(/href:\s*'([^']+)'/g) || [];
    expect(hrefMatches).toHaveLength(10);

    hrefMatches.forEach((match) => {
      const route = match.replace(/href:\s*'([^']+)'/, '$1');
      expect(validHrefs.has(route)).toBe(true);
    });

    const titleMatches = source.match(/title:\s*'([^']+)'/g) || [];
    expect(titleMatches).toHaveLength(10);

    const uniqueTitles = new Set(titleMatches.map((m) => m.replace(/title:\s*'([^']+)'/, '$1')));
    expect(uniqueTitles.size).toBe(10);

    expect(source).toContain('slice(0, 6)');
    expect(source).toContain('ALL_FEATURED_CARDS.length - 6');
  });

  it('verifies all category navigation guide links resolve to valid public routes', () => {
    const categoryFilePath = path.resolve(
      __dirname,
      '../src/app/comparisons/category-nav-section.tsx',
    );
    const source = fs.readFileSync(categoryFilePath, 'utf-8');
    const validHrefs = new Set<string>(publicRoutes.map((r) => r.href));

    const routeMatches = source.match(/route:\s*'([^']+)'/g) || [];
    expect(routeMatches.length).toBeGreaterThan(0);

    routeMatches.forEach((match) => {
      const route = match.replace(/route:\s*'([^']+)'/, '$1');
      expect(validHrefs.has(route)).toBe(true);
    });
  });

  it('ensures technical notes do not describe EER or SEER2 as dimensionless percentages', () => {
    const pageFilePath = path.resolve(__dirname, '../src/app/comparisons/page.tsx');
    const source = fs.readFileSync(pageFilePath, 'utf-8');

    expect(source).toContain(
      'EER and SEER2 are imperial cooling-capacity ratios measured in BTU/Wh.',
    );
    expect(source).not.toContain('EER / SEER2 / Efficiency %');
  });

  it('ensures no broken or placeholder comparison routes exist', () => {
    const validHrefs = new Set<string>(publicRoutes.map((r) => r.href));

    const checkRoutes = [
      '/guides/heat-pump-vs-electric-resistance-heating-cost',
      '/guides/how-much-electricity-does-a-heat-pump-use',
      '/guides/how-much-electricity-does-an-electric-furnace-use',
      '/guides/how-much-electricity-does-electric-baseboard-heating-use',
      '/tools/space-heater-cost-calculator',
      '/guides/how-much-electricity-does-central-air-conditioning-use',
      '/guides/how-much-electricity-does-a-window-air-conditioner-use',
      '/guides/how-much-electricity-does-a-portable-air-conditioner-use',
      '/guides/how-much-electricity-does-a-ductless-mini-split-use',
      '/tools/ac-cost-calculator',
      '/guides/how-much-electricity-does-an-air-fryer-use',
      '/guides/how-much-does-it-cost-to-run-an-electric-oven',
      '/guides/how-much-electricity-does-a-microwave-use',
      '/guides/how-much-electricity-does-a-dishwasher-use',
      '/guides/how-much-electricity-does-a-laptop-use',
      '/guides/how-much-electricity-does-a-gaming-pc-use',
      '/tools/appliance-energy-cost-calculator',
      '/guides/how-much-does-it-cost-to-charge-an-ev-at-home',
      '/tools/ev-home-charging-cost-calculator',
      '/guides/what-is-a-time-of-use-electricity-rate',
      '/guides/peak-vs-off-peak-electricity-hours-explained',
      '/guides/fixed-vs-variable-electricity-rates',
      '/guides/electricity-supply-charge-vs-delivery-charge',
      '/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill',
      '/guides/what-is-a-demand-charge-on-an-electric-bill',
      '/guides/how-budget-billing-works',
    ];

    checkRoutes.forEach((href) => {
      expect(validHrefs.has(href)).toBe(true);
      expect(href).not.toContain('placeholder');
      expect(href).not.toContain('undefined');
    });
  });
});
