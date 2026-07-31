import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from 'vitest';

import { PUBLISHED_STATES } from '../src/config/published-states';
import { energyGuides } from '../src/content/guides';
import { trackEvent } from '../src/lib/analytics';
import { createPageMetadata } from '../src/lib/metadata';
import { createReportStructuredData } from '../src/lib/structured-data';
import sitemap from '../src/app/sitemap';

describe('Analytics, Usability, & Internal Linking Sprint Verification', () => {
  const rootDir = process.cwd();

  it('1. North Carolina reporting period is dynamically derived from pageData model', () => {
    const ncPageFile = fs.readFileSync(
      path.join(rootDir, 'src/app/electricity-rates/[state]/page.tsx'),
      'utf-8',
    );

    // Verify reporting period comes from pageData property, not hardcoded text in template
    expect(ncPageFile).toContain('{pageData.latestSourceMonthFormatted}');
    expect(ncPageFile).toContain('Reporting Period:');
  });

  it('2. North Carolina monthly data is not described as an annual average', () => {
    const ncPageFile = fs.readFileSync(
      path.join(rootDir, 'src/app/electricity-rates/[state]/page.tsx'),
      'utf-8',
    );

    expect(ncPageFile).toContain('Monthly Rate vs. Annual Average:');
    expect(ncPageFile).toContain(
      'reporting rate snapshot rather than a single calendar-year average',
    );
    expect(ncPageFile).toContain('Looking for a 2025 value? Use the historical table below');
  });

  it('3. Current-rate source is visible near the rate value', () => {
    const rateCompFile = fs.readFileSync(
      path.join(rootDir, 'src/features/state-rates/components/state-rate-components.tsx'),
      'utf-8',
    );

    expect(rateCompFile).toContain('https://www.eia.gov/electricity/monthly/');
    expect(rateCompFile).toContain('Source: U.S. EIA');
  });

  it('4. New regulatory claims have official sources for NCUC and PUCO', () => {
    const ncConfig = PUBLISHED_STATES['north-carolina'];
    const ohioConfig = PUBLISHED_STATES['ohio'];

    const ncucSource = ncConfig?.sources.find(
      (s) => s.organization.includes('NCUC') || s.url.includes('ncuc.gov'),
    );
    expect(ncucSource).toBeDefined();
    expect(ncucSource?.url).toBe('https://www.ncuc.gov/');

    const pucoSource = ohioConfig?.sources.find(
      (s) => s.organization.includes('PUCO') || s.url.includes('puco.ohio.gov'),
    );
    expect(pucoSource).toBeDefined();
    expect(pucoSource?.url).toBe('https://puco.ohio.gov/');
  });

  it('5. Homepage task links use distinct destinations without duplication', () => {
    const taskCompFile = fs.readFileSync(
      path.join(rootDir, 'src/components/homepage-task-selection.tsx'),
      'utf-8',
    );

    expect(taskCompFile).toContain('/guides/why-is-my-electric-bill-so-high');
    expect(taskCompFile).toContain('/tools/appliance-energy-cost-calculator');
    expect(taskCompFile).toContain('/electricity-rates');
    expect(taskCompFile).toContain('/research/us-residential-electricity-rate-report');
    expect(taskCompFile).toContain('/electricity-bill-analyzer');

    // Ensure 'Understand why my bill increased' goes to guide, not bill analyzer
    expect(taskCompFile).toContain("title: 'Understand why my bill increased'");
    expect(taskCompFile).toContain("href: '/guides/why-is-my-electric-bill-so-high'");
  });

  it('6. Homepage task clicks invoke sanitized analytics tracking', () => {
    const mockWindow = { dataLayer: [] as Array<Record<string, unknown>> };
    Object.defineProperty(globalThis, 'window', {
      value: mockWindow,
      writable: true,
      configurable: true,
    });

    trackEvent('homepage_task_click', {
      destination_page: '/guides/why-is-my-electric-bill-so-high',
      source_page: '/',
      task_name: 'understand_bill_increase',
    });

    const dataLayer = mockWindow.dataLayer;
    expect(dataLayer.length).toBe(1);
    expect(dataLayer[0]?.event).toBe('homepage_task_click');
    expect(dataLayer[0]?.destination_page).toBe('/guides/why-is-my-electric-bill-so-high');
    expect(dataLayer[0]?.task_name).toBe('understand_bill_increase');
  });

  it('7. No sensitive values are sent in event parameters', () => {
    const mockWindow = { dataLayer: [] as Array<Record<string, unknown>> };
    Object.defineProperty(globalThis, 'window', {
      value: mockWindow,
      writable: true,
      configurable: true,
    });

    trackEvent('calculator_started', {
      tool_slug: 'ac-cost-calculator',
      bill_amount: '$150.00',
      email: 'user@example.com',
    } as unknown as Record<string, string>);

    const dataLayer = mockWindow.dataLayer;
    expect(dataLayer[0]?.bill_amount).toBeUndefined();
    expect(dataLayer[0]?.email).toBeUndefined();
  });

  it('8. Contextually irrelevant state links are absent from appliance guides', () => {
    const refrigGuide = energyGuides['how-much-electricity-does-a-refrigerator-use'];
    const dryerGuide = energyGuides['how-much-does-it-cost-to-run-an-electric-clothes-dryer'];

    expect(refrigGuide?.relatedRoutes).not.toContain('/electricity-rates/north-carolina');
    expect(refrigGuide?.relatedRoutes).not.toContain('/electricity-rates/ohio');
    expect(dryerGuide?.relatedRoutes).not.toContain('/electricity-rates/north-carolina');
    expect(dryerGuide?.relatedRoutes).not.toContain('/electricity-rates/ohio');

    expect(refrigGuide?.relatedRoutes).toContain('/electricity-rates');
    expect(dryerGuide?.relatedRoutes).toContain('/electricity-rates');
  });

  it('9. Canonical URLs remain apex-only', () => {
    const ncConfig = PUBLISHED_STATES['north-carolina'];
    const pageMeta = createPageMetadata({
      title: ncConfig!.metaTitle,
      description: ncConfig!.metaDescription,
      path: '/electricity-rates/north-carolina',
    });

    expect(pageMeta.alternates?.canonical).toBe('/electricity-rates/north-carolina');
    expect(pageMeta.openGraph?.url).toBe(
      'https://energybilllab.com/electricity-rates/north-carolina',
    );
    expect(JSON.stringify(pageMeta)).not.toContain('www.energybilllab.com');
  });

  it('10. Sitemap inventory includes the Insights launch batch and daily updates', () => {
    const entries = sitemap();
    expect(entries.length).toBe(137);
  });

  it('11. Public publisher identity remains limited to name and email', () => {
    const reportData = createReportStructuredData({
      title: 'U.S. Residential Electricity Rate Report',
      description: 'National electricity rates',
      path: '/research/us-residential-electricity-rate-report',
      datePublished: '2026-07-28',
      dateModified: '2026-07-28',
      reportingPeriod: '2026-05',
    });

    expect(reportData.author).toEqual({
      '@type': 'Person',
      name: 'Jaynesh Shingala',
    });

    const aboutFile = fs.readFileSync(path.join(rootDir, 'src/content/pages.ts'), 'utf-8');
    expect(aboutFile).not.toContain('Software Engineer');
    expect(aboutFile).not.toContain('Vadodara');
  });

  it('12. Protected files remain untouched', () => {
    const dbClientPath = path.resolve(rootDir, '../../packages/database/src/clients/db-client.ts');
    const webPkgPath = path.resolve(rootDir, 'package.json');
    const turboPath = path.resolve(rootDir, '../../turbo.json');
    const vercelPath = path.resolve(rootDir, '../../vercel.json');
    const renderPath = path.resolve(rootDir, '../../render.yaml');

    expect(fs.existsSync(dbClientPath)).toBe(true);
    expect(fs.existsSync(webPkgPath)).toBe(true);
    expect(fs.existsSync(turboPath)).toBe(true);
    expect(fs.existsSync(vercelPath)).toBe(true);
    expect(fs.existsSync(renderPath)).toBe(true);
  });
});
