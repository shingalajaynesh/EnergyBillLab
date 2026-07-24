import fs from 'fs';
import path from 'path';

import {
  calculateAcCost,
  calculateApplianceCost,
  calculateEvChargingCost,
  calculateSpaceHeaterCost,
} from '@energy-bill-lab/calculation-engine';
import { describe, expect, it } from 'vitest';

import { energyGuides, guideSlugs } from '@/content/guides';
import { isAdEligibleRoute } from '@/lib/ad-eligibility';
import { createPageMetadata } from '@/lib/metadata';
import { getFooterGroups, publicRoutes, sitemapRoutes } from '@/lib/routes';

describe('First Five Energy Guides Architecture & Integrity', () => {
  it('defines exactly five guide definitions in energyGuides registry', () => {
    expect(guideSlugs).toHaveLength(5);
    expect(guideSlugs).toEqual([
      'why-is-my-electric-bill-so-high',
      'how-much-electricity-do-household-appliances-use',
      'how-much-does-it-cost-to-run-an-air-conditioner',
      'how-much-does-it-cost-to-run-a-space-heater',
      'how-much-does-it-cost-to-charge-an-ev-at-home',
    ]);
  });

  it('registers all five guide routes in publicRoutes and sitemapRoutes', () => {
    const publicHrefs = publicRoutes.map((r) => r.href);
    const sitemapHrefs = sitemapRoutes.map((r) => r.href);

    guideSlugs.forEach((slug) => {
      const guideHref = `/guides/${slug}` as const;
      expect(publicHrefs).toContain(guideHref);
      expect(sitemapHrefs).toContain(guideHref);
    });
  });

  it('marks all five guide routes as ad-eligible in isAdEligibleRoute', () => {
    guideSlugs.forEach((slug) => {
      const guideHref = `/guides/${slug}`;
      expect(isAdEligibleRoute(guideHref)).toBe(true);
    });
  });

  it('links every guide to a valid primary calculator', () => {
    const validCalculators = [
      '/electricity-bill-analyzer',
      '/tools/appliance-energy-cost-calculator',
      '/tools/ac-cost-calculator',
      '/tools/space-heater-cost-calculator',
      '/tools/ev-home-charging-cost-calculator',
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

  it('verifies valid table markup in guide page files without raw aria-label text nodes', () => {
    const guidePageFiles = [
      'src/app/guides/why-is-my-electric-bill-so-high/page.tsx',
      'src/app/guides/how-much-electricity-do-household-appliances-use/page.tsx',
      'src/app/guides/how-much-does-it-cost-to-run-an-air-conditioner/page.tsx',
      'src/app/guides/how-much-does-it-cost-to-run-a-space-heater/page.tsx',
      'src/app/guides/how-much-does-it-cost-to-charge-an-ev-at-home/page.tsx',
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

  it('verifies .gitignore explicitly preserves .env.example', () => {
    const repoRoot = path.resolve(process.cwd(), '../..');
    const gitignorePath = path.join(repoRoot, '.gitignore');
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');

    expect(gitignoreContent).toContain('!.env.example');
    expect(gitignoreContent).toContain('.next');
    expect(gitignoreContent).toContain('node_modules');
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

    // AC calculation worked example check
    const ac = calculateAcCost({
      mode: 'capacity_eer',
      coolingCapacityBtu: 12000,
      eer: 10,
      hoursPerDay: 8,
      days: 30,
      rateCentsPerKwh: 16.5,
      dutyCyclePercent: 65,
    });
    expect(ac.inputWatts).toBe(1200);
    expect(ac.monthlyKwh).toBe(187.2);
    expect(ac.monthlyCostUsd).toBe(30.89);

    // Space heater calculation worked example check
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

    // EV charging calculation worked example check
    const ev = calculateEvChargingCost({
      batteryCapacityKwh: 75,
      startingChargePercent: 20,
      targetChargePercent: 80,
      chargingEfficiencyPercent: 88,
      rateCentsPerKwh: 16.5,
    });
    expect(ev.batteryEnergyAddedKwh).toBe(45);
    expect(ev.gridEnergyRequiredKwh).toBe(51.14);
    expect(ev.chargeCostUsd).toBe(8.44);
  });
});
