import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

import nextConfig from '../next.config';
import sitemap from '../src/app/sitemap';
import { energyGuides } from '../src/content/guides';
import { getPublishedInsights, insightsRegistry } from '../src/content/insights';
import { DEFAULT_AC_FORM_VALUES } from '../src/features/ac-calculator/schemas/ac-calculator-schema';
import { DEFAULT_APPLIANCE_FORM_VALUES } from '../src/features/appliance-calculator/schemas/appliance-calculator-schema';
import { DEFAULT_DEHUMIDIFIER_FORM_VALUES } from '../src/features/dehumidifier-calculator/schemas/dehumidifier-schema';
import { DEFAULT_DRYER_FORM_VALUES } from '../src/features/dryer-calculator/schemas/dryer-schema';
import { DEFAULT_EV_FORM_VALUES } from '../src/features/ev-calculator/schemas/ev-calculator-schema';
import { DEFAULT_POOL_PUMP_FORM_VALUES } from '../src/features/pool-pump-calculator/schemas/pool-pump-schema';
import { DEFAULT_REFRIGERATOR_FORM_VALUES } from '../src/features/refrigerator-calculator/schemas/refrigerator-schema';
import { DEFAULT_HEATER_FORM_VALUES } from '../src/features/space-heater-calculator/schemas/heater-calculator-schema';
import { DEFAULT_WATER_HEATER_FORM_VALUES } from '../src/features/water-heater-calculator/schemas/water-heater-schema';
import {
  CANONICAL_ELECTRICITY_SNAPSHOT,
  DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE,
  DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
} from '../src/lib/constants/electricity';
import { BUNDLED_STATE_RATES_SNAPSHOT } from '../src/lib/constants/state-rates-snapshot';
import { createRootMetadata } from '../src/lib/metadata';
import { ADSENSE_CLIENT_ID } from '../src/lib/site';

describe('AdSense Low-Value Content Remediation Quality Gates', () => {
  describe('1. Canonical Electricity Benchmark Architecture', () => {
    it('provides the verified August 2026 canonical electricity snapshot', () => {
      expect(CANONICAL_ELECTRICITY_SNAPSHOT).toMatchObject({
        reportingPeriod: '2026-08',
        displayPeriod: 'August 2026',
        eiaReleaseDate: '2026-10-23',
        validationDate: '2026-10-23',
        priceCentsPerKwh: 18.16,
        underlyingSurvey: 'Form EIA-861M',
        status: 'verified',
      });
    });

    it('exports DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH matching canonical snapshot (18.16)', () => {
      expect(DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH).toBe(18.16);
      expect(DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH).toBe(
        CANONICAL_ELECTRICITY_SNAPSHOT.priceCentsPerKwh,
      );
    });

    it('exports DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE matching canonical period', () => {
      expect(DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE).toBe(
        'U.S. residential benchmark — August 2026 — U.S. EIA',
      );
    });
  });

  describe('2. All 11 Calculator Defaults & Zero Stale Rates', () => {
    it('defaults AC Calculator rate to 18.16¢/kWh', () => {
      expect(DEFAULT_AC_FORM_VALUES.rateCentsPerKwh).toBe(18.16);
      expect(DEFAULT_AC_FORM_VALUES.rateCentsPerKwh).toBe(DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH);
    });

    it('defaults Appliance Calculator rate to 18.16¢/kWh', () => {
      expect(DEFAULT_APPLIANCE_FORM_VALUES.rateCentsPerKwh).toBe(18.16);
      expect(DEFAULT_APPLIANCE_FORM_VALUES.rateCentsPerKwh).toBe(
        DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
      );
    });

    it('defaults Clothes Dryer Calculator rate to 18.16¢/kWh', () => {
      expect(DEFAULT_DRYER_FORM_VALUES.rateCentsPerKwh).toBe(18.16);
      expect(DEFAULT_DRYER_FORM_VALUES.rateCentsPerKwh).toBe(
        DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
      );
    });

    it('defaults Refrigerator Calculator rate to 18.16¢/kWh', () => {
      expect(DEFAULT_REFRIGERATOR_FORM_VALUES.rateCentsPerKwh).toBe(18.16);
      expect(DEFAULT_REFRIGERATOR_FORM_VALUES.rateCentsPerKwh).toBe(
        DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
      );
    });

    it('defaults Electric Water Heater Calculator rate to 18.16¢/kWh', () => {
      expect(DEFAULT_WATER_HEATER_FORM_VALUES.rateCentsPerKwh).toBe(18.16);
      expect(DEFAULT_WATER_HEATER_FORM_VALUES.rateCentsPerKwh).toBe(
        DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
      );
    });

    it('defaults EV Home Charging Calculator rate to 18.16¢/kWh', () => {
      expect(DEFAULT_EV_FORM_VALUES.rateCentsPerKwh).toBe(18.16);
      expect(DEFAULT_EV_FORM_VALUES.rateCentsPerKwh).toBe(DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH);
    });

    it('defaults Space Heater Calculator rate to 18.16¢/kWh', () => {
      expect(DEFAULT_HEATER_FORM_VALUES.rateCentsPerKwh).toBe(18.16);
      expect(DEFAULT_HEATER_FORM_VALUES.rateCentsPerKwh).toBe(
        DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
      );
    });

    it('defaults Pool Pump Calculator rate to 18.16¢/kWh', () => {
      expect(DEFAULT_POOL_PUMP_FORM_VALUES.rateCentsPerKwh).toBe(18.16);
      expect(DEFAULT_POOL_PUMP_FORM_VALUES.rateCentsPerKwh).toBe(
        DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
      );
    });

    it('defaults Dehumidifier Calculator rate to 18.16¢/kWh', () => {
      expect(DEFAULT_DEHUMIDIFIER_FORM_VALUES.rateCentsPerKwh).toBe(18.16);
      expect(DEFAULT_DEHUMIDIFIER_FORM_VALUES.rateCentsPerKwh).toBe(
        DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
      );
    });

    it('Heating Fuel Comparator UI defaults electricity to 18.16¢/kWh', () => {
      const filePath = path.resolve(
        __dirname,
        '../src/features/heating-fuel-comparator/components/fuel-comparator-tool.tsx',
      );
      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).toContain('DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH');
      expect(content).toContain('DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE');
      expect(content).not.toContain('16.5');
    });

    it('Home Energy Scorecard UI defaults electricity to 18.16¢/kWh', () => {
      const filePath = path.resolve(
        __dirname,
        '../src/features/home-energy-scorecard/components/audit-wizard.tsx',
      );
      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).toContain('DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH');
      expect(content).toContain('DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE');
      expect(content).not.toContain('16.5');
    });

    it('confirms zero occurrences of stale 16.50¢/kWh across all calculator feature files', () => {
      const calculatorDirs = [
        'ac-calculator',
        'appliance-calculator',
        'dryer-calculator',
        'refrigerator-calculator',
        'water-heater-calculator',
        'ev-calculator',
        'space-heater-calculator',
        'pool-pump-calculator',
        'dehumidifier-calculator',
        'heating-fuel-comparator',
        'home-energy-scorecard',
      ];
      function checkDir(dir: string) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            checkDir(fullPath);
          } else if (/\.(tsx|ts)$/.test(file) && !file.includes('test')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            expect(content).not.toContain('16.5');
          }
        }
      }
      for (const calcDir of calculatorDirs) {
        const fullDirPath = path.resolve(__dirname, '../src/features', calcDir);
        if (fs.existsSync(fullDirPath)) {
          checkDir(fullDirPath);
        }
      }
    });
  });

  describe('3. State Rates Snapshot & EIA Table 5.6.A Agreement', () => {
    it('contains all 50 states + District of Columbia + US Total (52 entries)', () => {
      const entries = Object.values(BUNDLED_STATE_RATES_SNAPSHOT);
      expect(entries).toHaveLength(52);
    });

    it('verifies all state entries have reportingPeriod 2026-08 and positive rates', () => {
      const entries = Object.values(BUNDLED_STATE_RATES_SNAPSHOT);
      for (const entry of entries) {
        expect(entry.period).toBe('2026-08');
        expect(entry.priceCentsPerKwh).toBeGreaterThan(0);
        expect(entry.code).toBeTruthy();
        expect(entry.name).toBeTruthy();
      }
    });

    it('verifies US National benchmark in state rates snapshot is 18.16¢/kWh', () => {
      const usEntry = BUNDLED_STATE_RATES_SNAPSHOT['US'];
      expect(usEntry).toBeDefined();
      expect(usEntry?.priceCentsPerKwh).toBe(18.16);
    });

    it('verifies key benchmark states match official EIA Table 5.6.A (Aug 2026)', () => {
      const wa = BUNDLED_STATE_RATES_SNAPSHOT['WA'];
      const ca = BUNDLED_STATE_RATES_SNAPSHOT['CA'];
      const hi = BUNDLED_STATE_RATES_SNAPSHOT['HI'];
      const tx = BUNDLED_STATE_RATES_SNAPSHOT['TX'];

      expect(wa?.priceCentsPerKwh).toBe(14.63);
      expect(ca?.priceCentsPerKwh).toBe(29.75);
      expect(hi?.priceCentsPerKwh).toBe(47.18);
      expect(tx?.priceCentsPerKwh).toBe(15.91);
    });
  });

  describe('4. State Spread Insight Reconstruction', () => {
    it('uses a single internally consistent dataset (WA 11.52¢, CA 32.40¢, HI 52.00¢, US 18.44¢, 4.51x spread)', () => {
      const insight = insightsRegistry.find(
        (i) => i.slug === 'august-2026-state-residential-electricity-price-spread-benchmark',
      );
      expect(insight).toBeDefined();
      expect(insight?.status).toBe('published');
      expect(insight?.reportingPeriod).toBe('May 2026');
      expect(insight?.title).toContain('May 2026 EIA Benchmark');
      expect(insight?.summary).toContain('4.51x nationwide');
      expect(insight?.summary).toContain('11.52¢/kWh in Washington');
      expect(insight?.summary).toContain('52.00¢/kWh in Hawaii');
      expect(insight?.summary).toContain('32.40¢/kWh in California');
      expect(insight?.summary).toContain('$404.80 monthly');
      expect(insight?.summary).not.toContain('3.3x');
      expect(insight?.summary).not.toContain('Rhode Island');
      expect(insight?.summary).not.toContain('Oklahoma');
    });
  });

  describe('5. Consolidated Redundant Insights (301 Permanent Redirects)', () => {
    const EXPECTED_REDIRECTS = [
      {
        source: '/insights/august-2026-electric-clothes-dryer-kwh-operating-cost-benchmark',
        destination: '/guides/how-much-does-it-cost-to-run-an-electric-clothes-dryer',
      },
      {
        source: '/insights/august-2026-refrigerator-kwh-annual-operating-cost-benchmark',
        destination: '/guides/how-much-electricity-does-a-refrigerator-use',
      },
      {
        source: '/insights/august-2026-central-air-conditioner-seer2-cooling-cost-benchmark',
        destination: '/guides/how-much-electricity-does-central-air-conditioning-use',
      },
      {
        source: '/insights/august-2026-portable-electric-space-heater-operating-cost-benchmark',
        destination: '/guides/how-much-does-it-cost-to-run-a-space-heater',
      },
      {
        source: '/insights/august-2026-swimming-pool-pump-kwh-operating-cost-benchmark',
        destination: '/guides/how-much-does-it-cost-to-run-a-pool-pump',
      },
      {
        source: '/insights/august-2026-electric-dehumidifier-kwh-operating-cost-benchmark',
        destination: '/guides/how-much-does-it-cost-to-run-a-dehumidifier',
      },
      {
        source: '/insights/august-2026-window-air-conditioner-wattage-operating-cost-benchmark',
        destination: '/guides/how-much-electricity-does-a-window-air-conditioner-use',
      },
      {
        source: '/insights/august-2026-electric-dishwasher-kwh-operating-cost-benchmark',
        destination: '/guides/how-much-electricity-does-a-dishwasher-use',
      },
      {
        source: '/insights/august-2026-electric-clothes-washer-kwh-operating-cost-benchmark',
        destination: '/guides/how-much-electricity-does-a-washing-machine-use',
      },
      {
        source:
          '/insights/august-2026-vampire-power-phantom-load-standby-electricity-cost-benchmark',
        destination: '/guides/what-is-vampire-power-and-how-much-does-it-cost',
      },
      {
        source: '/insights/may-2026-ev-home-charging-cost-benchmark',
        destination: '/guides/how-much-does-it-cost-to-charge-an-ev-at-home',
      },
      {
        source: '/insights/august-2026-ev-home-charging-efficiency-losses-benchmark',
        destination: '/guides/how-much-does-it-cost-to-charge-an-ev-at-home',
      },
    ];

    it('defines all 12 permanent 301 redirects in next.config.ts', async () => {
      const redirects = await (
        nextConfig as {
          redirects?: () => Promise<
            Array<{ source: string; destination: string; permanent: boolean }>
          >;
        }
      ).redirects!();
      for (const expected of EXPECTED_REDIRECTS) {
        const found = redirects.find((r) => r.source === expected.source);
        expect(found).toBeDefined();
        expect(found?.destination).toBe(expected.destination);
        expect(found?.permanent).toBe(true);
      }
    });

    it('marks all 12 consolidated insights as status: archived in the registry', () => {
      for (const expected of EXPECTED_REDIRECTS) {
        const slug = expected.source.replace('/insights/', '');
        const insight = insightsRegistry.find((i) => i.slug === slug);
        expect(insight).toBeDefined();
        expect(insight?.status).toBe('archived');
      }
    });

    it('excludes all 12 consolidated insights from getPublishedInsights()', () => {
      const published = getPublishedInsights();
      for (const expected of EXPECTED_REDIRECTS) {
        const slug = expected.source.replace('/insights/', '');
        const inPublished = published.find((i) => i.slug === slug);
        expect(inPublished).toBeUndefined();
      }
    });

    it('excludes all 12 consolidated insights from XML sitemap', () => {
      const entries = sitemap();
      for (const expected of EXPECTED_REDIRECTS) {
        const inSitemap = entries.some((e) => e.url.endsWith(expected.source));
        expect(inSitemap).toBe(false);
      }
    });
  });

  describe('6. AdSense Technical Integrity & Verification', () => {
    it('verifies ads.txt exists and contains the valid DIRECT publisher line', () => {
      const adsTxtPath = path.resolve(__dirname, '../public/ads.txt');
      expect(fs.existsSync(adsTxtPath)).toBe(true);
      const content = fs.readFileSync(adsTxtPath, 'utf-8').trim();
      expect(content).toBe('google.com, pub-6303291083449043, DIRECT, f08c47fec0942fa0');
    });

    it('verifies createRootMetadata contains the single canonical ownership meta tag', () => {
      const rootMeta = createRootMetadata();
      expect(rootMeta.other?.['google-adsense-account']).toBe(ADSENSE_CLIENT_ID);
      expect(ADSENSE_CLIENT_ID).toBe('ca-pub-6303291083449043');
    });

    it('verifies layout.tsx has zero duplicate hardcoded meta tag and zero adsbygoogle script tags', () => {
      const layoutPath = path.resolve(__dirname, '../src/app/layout.tsx');
      const content = fs.readFileSync(layoutPath, 'utf-8');
      expect(content).not.toContain('<meta name="google-adsense-account"');
      expect(content).not.toContain('adsbygoogle');
      expect(content).not.toContain('pagead2.googlesyndication.com');
    });
  });

  describe('7. Sitemap & Robots Index Integrity', () => {
    it('has exactly 159 unique indexable URLs in sitemap', () => {
      const entries = sitemap();
      expect(entries).toHaveLength(159);

      // Verify no duplicates
      const urls = entries.map((e) => e.url);
      const uniqueUrls = new Set(urls);
      expect(uniqueUrls.size).toBe(159);
    });

    it('excludes directory hubs (/research, /insights/category/*) from sitemap', () => {
      const entries = sitemap();
      const urls = entries.map((e) => e.url);
      expect(urls).not.toContain('https://energybilllab.com/research');
      expect(urls.some((u) => u.includes('/insights/category/'))).toBe(false);
    });

    it('includes standalone original report /research/us-residential-electricity-rate-report in sitemap', () => {
      const entries = sitemap();
      const urls = entries.map((e) => e.url);
      expect(urls).toContain(
        'https://energybilllab.com/research/us-residential-electricity-rate-report',
      );
    });

    it('excludes seasonal forecast with noindex: true from sitemap', () => {
      const entries = sitemap();
      const urls = entries.map((e) => e.url);
      expect(urls).not.toContain(
        'https://energybilllab.com/insights/july-2026-summer-wholesale-electricity-price-forecast',
      );
    });
  });

  describe('8. Strengthened Canonical Guides & Deterministic Math', () => {
    it('confirms all 50 energy guides are registered and valid', () => {
      const slugs = Object.keys(energyGuides);
      expect(slugs).toHaveLength(50);
    });

    it('verifies appliance guides disclose benchmark rate and use canonical constants', () => {
      const guideSlugs = [
        'how-much-electricity-does-a-refrigerator-use',
        'how-much-does-it-cost-to-run-an-electric-clothes-dryer',
        'how-much-electricity-does-central-air-conditioning-use',
        'how-much-does-it-cost-to-run-a-space-heater',
        'how-much-does-it-cost-to-run-a-pool-pump',
        'how-much-does-it-cost-to-run-a-dehumidifier',
        'how-much-electricity-does-a-window-air-conditioner-use',
        'how-much-electricity-does-a-dishwasher-use',
        'how-much-electricity-does-a-washing-machine-use',
        'what-is-vampire-power-and-how-much-does-it-cost',
        'how-much-does-it-cost-to-charge-an-ev-at-home',
      ];

      for (const slug of guideSlugs) {
        const filePath = path.resolve(__dirname, `../src/app/guides/${slug}/page.tsx`);
        expect(fs.existsSync(filePath)).toBe(true);
        const content = fs.readFileSync(filePath, 'utf-8');
        expect(content).toContain('DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH');
        expect(content).toContain('DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE');
      }
    });
  });
});
