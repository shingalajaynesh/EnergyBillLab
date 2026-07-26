import fs from 'fs';
import path from 'path';

import {
  calculateAcCost,
  calculateApplianceCost,
  calculateDryerCost,
  calculateEvChargingCost,
  calculatePoolPumpCost,
  calculateRefrigeratorAnnualKwhCost,
  calculateSpaceHeaterCost,
  calculateWaterHeaterCost,
} from '@energy-bill-lab/calculation-engine';
import { describe, expect, it } from 'vitest';

import { GUIDE_ROUTES, energyGuides, guideSlugs } from '@/content/guides';
import { isAdEligibleRoute } from '@/lib/ad-eligibility';
import { createPageMetadata } from '@/lib/metadata';
import { getFooterGroups, publicRoutes, sitemapRoutes } from '@/lib/routes';

const BATCH_5_SLUGS = [
  'how-to-read-an-electric-bill-line-by-line',
  'what-is-a-time-of-use-electricity-rate',
  'peak-vs-off-peak-electricity-hours-explained',
  'fixed-vs-variable-electricity-rates',
  'what-is-a-demand-charge-on-an-electric-bill',
  'estimated-vs-actual-meter-reading',
  'how-budget-billing-works',
  'why-electricity-rates-change',
  'fuel-adjustment-charges-and-utility-riders-explained',
  'how-net-metering-affects-your-electric-bill',
];

describe('Fifty Energy Guides Architecture & Integrity', () => {
  it('defines aggregate 50 guide definitions (10 Batch 1 + 10 Batch 2 + 10 Batch 3 + 10 Batch 4 + 10 Batch 5) with 0 duplicate slugs', () => {
    expect(guideSlugs).toHaveLength(50);
    expect(new Set(guideSlugs).size).toBe(50);
    expect(GUIDE_ROUTES).toHaveLength(50);

    BATCH_5_SLUGS.forEach((slug) => {
      expect(guideSlugs).toContain(slug);
    });
  });

  it('registers all fifty guide routes in publicRoutes and sitemapRoutes', () => {
    const publicHrefs = publicRoutes.map((r) => r.href);
    const sitemapHrefs = sitemapRoutes.map((r) => r.href);

    expect(guideSlugs).toHaveLength(50);
    expect(new Set(guideSlugs).size).toBe(50);

    guideSlugs.forEach((slug) => {
      const guideHref = `/guides/${slug}` as const;
      expect(publicHrefs).toContain(guideHref);

      // Verify each guide appears in sitemap exactly once
      const sitemapMatches = sitemapHrefs.filter((href) => href === guideHref);
      expect(sitemapMatches).toHaveLength(1);
    });
  });

  it('marks all fifty guide routes as ad-eligible and rejects unknown guide routes', () => {
    guideSlugs.forEach((slug) => {
      const guideHref = `/guides/${slug}`;
      expect(isAdEligibleRoute(guideHref)).toBe(true);
    });

    // Verify unknown guide routes default to false
    expect(isAdEligibleRoute('/guides/unknown-fake-guide-slug')).toBe(false);
    expect(isAdEligibleRoute('/guides/invalid-test-route')).toBe(false);
  });

  it('verifies related-guide routes resolve to valid public routes in the route registry', () => {
    const validPublicHrefs = new Set(publicRoutes.map((r) => r.href));

    guideSlugs.forEach((slug) => {
      const guide = energyGuides[slug]!;
      expect(guide.relatedRoutes.length).toBeGreaterThan(0);
      guide.relatedRoutes.forEach((relatedHref) => {
        expect(validPublicHrefs.has(relatedHref)).toBe(true);
      });
    });
  });

  it('links every guide to a valid primary calculator', () => {
    const validCalculators = [
      '/electricity-bill-analyzer',
      '/tools/appliance-energy-cost-calculator',
      '/tools/ac-cost-calculator',
      '/tools/space-heater-cost-calculator',
      '/tools/ev-home-charging-cost-calculator',
      '/tools/refrigerator-cost-calculator',
      '/tools/clothes-dryer-cost-calculator',
      '/tools/electric-water-heater-cost-calculator',
      '/tools/pool-pump-cost-calculator',
      '/tools/dehumidifier-cost-calculator',
    ];

    guideSlugs.forEach((slug) => {
      const guide = energyGuides[slug]!;
      expect(validCalculators).toContain(guide.primaryCalculatorHref);
      expect(guide.sources.length).toBeGreaterThan(0);
      expect(guide.summaryTakeaways.length).toBeGreaterThan(0);
      expect(guide.breadcrumbLabel).toBeDefined();
      expect(guide.actionLabel).toBeDefined();
      expect(guide.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(guide.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it('generates unique page metadata titles without double site-name suffixing', () => {
    guideSlugs.forEach((slug) => {
      const guide = energyGuides[slug]!;
      const meta = createPageMetadata({
        title: guide.title,
        description: guide.description,
        path: guide.href,
      });

      expect(meta.title).toBeDefined();
      expect(meta.title).toBe(guide.title);
      expect(meta.description).toBe(guide.description);
    });
  });

  it('verifies footer information architecture does not list individual states or guide titles', () => {
    const footerGroups = getFooterGroups();
    expect(footerGroups).toHaveLength(4);

    const learnGroup = footerGroups.find((g) => g.title === 'Learn');
    expect(learnGroup).toBeDefined();
    const learnHrefs = learnGroup?.links.map((l) => l.href);
    expect(learnHrefs).toContain('/guides');
    expect(learnHrefs).toContain('/electricity-rates');
    expect(learnHrefs).not.toContain('/electricity-rates/texas');
    expect(learnHrefs).not.toContain('/guides/why-is-my-electric-bill-so-high');

    const toolsGroup = footerGroups.find((g) => g.title === 'Tools');
    expect(toolsGroup).toBeDefined();
    const toolHrefs = toolsGroup?.links.map((l) => l.href);
    expect(toolHrefs).toContain('/electricity-bill-analyzer');
    expect(toolHrefs).toContain('/tools/appliance-energy-cost-calculator');
  });

  it('verifies valid table markup in all guide page files without raw aria-label text nodes', () => {
    const guidePageFiles = [
      'src/app/guides/why-is-my-electric-bill-so-high/page.tsx',
      'src/app/guides/how-much-electricity-do-household-appliances-use/page.tsx',
      'src/app/guides/how-much-does-it-cost-to-run-an-air-conditioner/page.tsx',
      'src/app/guides/how-much-does-it-cost-to-run-a-space-heater/page.tsx',
      'src/app/guides/how-much-does-it-cost-to-charge-an-ev-at-home/page.tsx',
      'src/app/guides/how-much-electricity-does-a-refrigerator-use/page.tsx',
      'src/app/guides/how-much-does-it-cost-to-run-an-electric-clothes-dryer/page.tsx',
      'src/app/guides/how-much-does-it-cost-to-run-an-electric-water-heater/page.tsx',
      'src/app/guides/how-much-does-it-cost-to-run-a-pool-pump/page.tsx',
      'src/app/guides/how-much-does-it-cost-to-run-a-dehumidifier/page.tsx',
      'src/app/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill/page.tsx',
      'src/app/guides/why-is-my-electric-bill-high-when-usage-is-low/page.tsx',
      'src/app/guides/electricity-supply-charge-vs-delivery-charge/page.tsx',
      'src/app/guides/kw-vs-kwh-explained/page.tsx',
      'src/app/guides/how-billing-cycle-length-affects-electricity-bills/page.tsx',
      'src/app/guides/how-much-electricity-does-a-dishwasher-use/page.tsx',
      'src/app/guides/how-much-electricity-does-a-washing-machine-use/page.tsx',
      'src/app/guides/how-much-does-it-cost-to-run-an-electric-oven/page.tsx',
      'src/app/guides/how-much-electricity-does-a-ceiling-fan-use/page.tsx',
      'src/app/guides/how-much-electricity-does-a-gaming-pc-use/page.tsx',
    ];

    const webPackageRoot = process.cwd();

    guidePageFiles.forEach((relPath) => {
      const fullPath = path.join(webPackageRoot, relPath);
      const content = fs.readFileSync(fullPath, 'utf-8');

      // Table must use attribute <table aria-label=...
      expect(content).toMatch(/<table\s+aria-label=/);

      // Must not contain isolated text node aria-label inside table child body
      const tableInner = content.match(/<table[\s\S]*?>([\s\S]*?)<\/table>/)?.[1] || '';
      expect(tableInner).not.toContain('aria-label=');
      expect(tableInner).toContain('<caption>');
      expect(tableInner).toContain('<th scope="col">');
    });
  });

  it('executes shared calculation-engine functions correctly for worked examples', () => {
    // Appliance calculation worked example check
    const appliance = calculateApplianceCost({
      wattage: 1500,
      hoursPerDay: 8,
      days: 30,
      rateCentsPerKwh: 16.5,
      dutyCyclePercent: 100,
    });
    expect(appliance.periodKwh).toBe(360);
    expect(appliance.periodCostUsd).toBe(59.4);

    // AC worked example check
    const ac = calculateAcCost({
      mode: 'capacity_eer',
      coolingCapacityBtu: 12000,
      eer: 10,
      hoursPerDay: 8,
      days: 30,
      rateCentsPerKwh: 16.5,
      dutyCyclePercent: 65,
    });
    expect(ac.monthlyKwh).toBe(187.2);
    expect(ac.monthlyCostUsd).toBe(30.89);

    // Space heater worked example check
    const heater = calculateSpaceHeaterCost({
      heaterWatts: 1500,
      quantity: 1,
      hoursPerDay: 8,
      days: 30,
      rateCentsPerKwh: 16.5,
      dutyCyclePercent: 75,
    });
    expect(heater.periodKwh).toBe(270);
    expect(heater.periodCostUsd).toBe(44.55);

    // EV charging worked example check
    const ev = calculateEvChargingCost({
      batteryCapacityKwh: 75,
      startingChargePercent: 20,
      targetChargePercent: 80,
      chargingEfficiencyPercent: 88,
      rateCentsPerKwh: 16.5,
    });
    expect(ev.gridEnergyRequiredKwh).toBe(51.14);
    expect(ev.chargeCostUsd).toBe(8.44);

    // Refrigerator worked example check
    const refAnnual = calculateRefrigeratorAnnualKwhCost({
      annualKwh: 400,
      days: 30,
      rateCentsPerKwh: 16.5,
    });
    expect(refAnnual.dailyKwh).toBeCloseTo(1.0958, 3);
    expect(refAnnual.periodCostUsd).toBe(5.42);

    // Dryer worked example check
    const dryer = calculateDryerCost({
      wattage: 4000,
      minutesPerLoad: 45,
      loadsPerWeek: 5,
      weeks: 4,
      rateCentsPerKwh: 16.5,
    });
    expect(dryer.kwhPerLoad).toBe(3.0);
    expect(dryer.costPerLoadUsd).toBe(0.5);

    // Water heater worked example check
    const wh = calculateWaterHeaterCost({
      elementWatts: 4500,
      activeElements: 1,
      hoursPerDay: 3.0,
      days: 30,
      rateCentsPerKwh: 16.5,
    });
    expect(wh.dailyKwh).toBe(13.5);
    expect(wh.periodCostUsd).toBe(66.83);

    // Pool pump worked example check
    const pool = calculatePoolPumpCost({
      wattage: 1500,
      hoursPerDay: 8,
      daysPerWeek: 7,
      weeks: 20,
      rateCentsPerKwh: 16.5,
    });
    expect(pool.dailyKwh).toBe(12.0);
    expect(pool.periodCostUsd).toBe(277.2);

    // Dehumidifier worked example check
    const dehum = calculateApplianceCost({
      wattage: 500,
      hoursPerDay: 24,
      days: 30,
      rateCentsPerKwh: 16.5,
      dutyCyclePercent: 50,
    });
    expect(dehum.dailyKwh).toBe(6.0);
    expect(dehum.periodCostUsd).toBe(29.7);
  });
});
