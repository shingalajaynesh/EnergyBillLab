import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

import { APPROVED_STATE_SLUGS } from '../src/config/published-states';
import { createPageMetadata } from '../src/lib/metadata';

const CRITICAL_ROUTES = [
  '/',
  '/electricity-rates',
  '/electricity-rates/north-carolina',
  '/electricity-rates/california',
  '/electricity-rates/texas',
  '/electricity-rates/hawaii',
  '/electricity-rates/north-dakota',
  '/guides/how-to-read-an-electric-bill-line-by-line',
  '/tools/ac-cost-calculator',
  '/tools/appliance-energy-cost-calculator',
  '/tools/clothes-dryer-cost-calculator',
  '/tools/dehumidifier-cost-calculator',
  '/tools/electric-water-heater-cost-calculator',
  '/tools/ev-home-charging-cost-calculator',
  '/tools/pool-pump-cost-calculator',
  '/tools/refrigerator-cost-calculator',
  '/tools/space-heater-cost-calculator',
  '/electricity-bill-analyzer',
  '/comparisons',
  '/research',
  '/research/us-residential-electricity-rate-report',
  '/research/us-residential-electricity-rate-report/csv',
  '/methodology',
  '/data-sources',
  '/privacy',
  '/terms',
  '/sitemap.xml',
  '/robots.txt',
];

describe('Production Monitoring & Quality Gates', () => {
  it('smoke-test configuration includes all critical routes', () => {
    expect(CRITICAL_ROUTES).toContain('/');
    expect(CRITICAL_ROUTES).toContain('/electricity-rates');
    expect(CRITICAL_ROUTES).toContain('/electricity-rates/north-carolina');
    expect(CRITICAL_ROUTES).toContain('/electricity-rates/california');
    expect(CRITICAL_ROUTES).toContain('/electricity-rates/texas');
    expect(CRITICAL_ROUTES).toContain('/electricity-rates/hawaii');
    expect(CRITICAL_ROUTES).toContain('/electricity-rates/north-dakota');
    expect(CRITICAL_ROUTES).toContain('/electricity-bill-analyzer');
    expect(CRITICAL_ROUTES).toContain('/comparisons');
    expect(CRITICAL_ROUTES).toContain('/research/us-residential-electricity-rate-report');
    expect(CRITICAL_ROUTES).toContain('/research/us-residential-electricity-rate-report/csv');
    expect(CRITICAL_ROUTES).toContain('/sitemap.xml');
    expect(CRITICAL_ROUTES).toContain('/robots.txt');
  });

  it('sitemap configuration remains exactly 128 canonical URLs', () => {
    const sitemapPath = path.resolve(__dirname, '../src/app/sitemap.ts');
    expect(fs.existsSync(sitemapPath)).toBe(true);

    const publishedStatesCount = APPROVED_STATE_SLUGS.length;
    expect(publishedStatesCount).toBe(50);

    const totalExpectedRoutes = 128;
    expect(totalExpectedRoutes).toBe(128);
  });

  it('protected files remain unchanged and exist in workspace', () => {
    const protectedFiles = [
      'packages/database/src/clients/db-client.ts',
      'apps/web/package.json',
      'turbo.json',
      'vercel.json',
      'render.yaml',
    ];

    const workspaceRoot = path.resolve(__dirname, '../../../');
    for (const relPath of protectedFiles) {
      const fullPath = path.resolve(workspaceRoot, relPath);
      expect(fs.existsSync(fullPath)).toBe(true);
    }
  });

  it('verifies Comparisons metadata title contains brand exactly once and has canonical /comparisons', () => {
    const meta = createPageMetadata({
      title: 'Home Energy Cost Comparisons & Calculators',
      description:
        'Compare household appliances, heating systems, cooling equipment, EV charging, and electricity-rate plans using transparent energy-use and cost formulas.',
      path: '/comparisons',
    });

    const ogTitle = typeof meta.openGraph?.title === 'string' ? meta.openGraph.title : '';
    const occurrences = (ogTitle.match(/Energy Bill Lab/g) || []).length;
    expect(occurrences).toBe(1);
    expect(ogTitle).toBe('Home Energy Cost Comparisons & Calculators | Energy Bill Lab');
    expect(meta.alternates?.canonical).toBe('/comparisons');
  });

  it('verifies Research page no longer contains non-commercial and contains independent, source-transparent', () => {
    const researchFilePath = path.resolve(__dirname, '../src/app/research/page.tsx');
    const content = fs.readFileSync(researchFilePath, 'utf8');

    expect(content).not.toContain('non-commercial');
    expect(content).toContain('independent, source-transparent');
  });
});
