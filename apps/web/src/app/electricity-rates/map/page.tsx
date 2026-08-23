import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import { StateRateMap, type StateMapRecord } from '@/features/state-rates';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import { formatSourcePeriod } from '@/lib/server/get-state-page-data';
import { getStateRatesSnapshotUncached } from '@/lib/server/get-state-rates';
import { createFaqStructuredData, serializeStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = createPageMetadata({
  title: 'Interactive U.S. Electricity Rate Map & 50-State Price Heatmap',
  description:
    'Interactive 50-state residential electricity rate map. Compare ¢/kWh pricing tiers, regional rate spreads, and average monthly household utility bills across all U.S. states using official EIA data.',
  path: '/electricity-rates/map',
});

const breadcrumbs: Array<{ href: PublicRouteHref; label?: string }> = [
  { href: '/', label: 'Home' },
  { href: '/electricity-rates', label: 'Electricity Rates' },
  { href: '/electricity-rates/map', label: 'Rate Heatmap' },
];

const faqs = [
  {
    question: 'How are the state electricity rate tiers defined on the map?',
    answer:
      'State electricity rates (¢/kWh) are categorized into five visual color tiers: Lowest (<13.0¢/kWh), Below Average (13.0¢–16.4¢/kWh), Moderate (16.5¢–19.9¢/kWh), Above Average (20.0¢–25.9¢/kWh), and Highest (26.0¢+/kWh). Rates are derived from the latest monthly EIA-861M residential retail sales reports.',
  },
  {
    question: 'Which U.S. states have the lowest electricity rates?',
    answer:
      'States in the Northwest (like Washington and Idaho) and Northern Plains (like North Dakota and Nebraska) consistently enjoy the lowest electricity rates (often under 12¢/kWh) due to low-cost hydroelectric dams, abundant wind generation, and mine-mouth power plants.',
  },
  {
    question: 'Why are electricity rates in Hawaii, California, and New England so high?',
    answer:
      'Hawaii relies heavily on imported fuel oil shipped across the Pacific. California rates reflect extensive wildfire mitigation undergrounding, grid modernization, and renewable transition investments. New England faces natural gas pipeline capacity constraints during peak winter heating periods.',
  },
];

const relatedLinks: PublicRouteHref[] = [
  '/electricity-rates',
  '/compare-states',
  '/research/us-residential-electricity-rate-report',
  '/tools/bill-spike-detective',
];

const REGION_LOOKUP: Record<string, 'New England' | 'Middle Atlantic' | 'Midwest' | 'South' | 'West'> = {
  ME: 'New England', NH: 'New England', VT: 'New England', MA: 'New England', RI: 'New England', CT: 'New England',
  NY: 'Middle Atlantic', NJ: 'Middle Atlantic', PA: 'Middle Atlantic',
  OH: 'Midwest', IN: 'Midwest', IL: 'Midwest', MI: 'Midwest', WI: 'Midwest', MN: 'Midwest', IA: 'Midwest', MO: 'Midwest', ND: 'Midwest', SD: 'Midwest', NE: 'Midwest', KS: 'Midwest',
  DE: 'South', MD: 'South', DC: 'South', VA: 'South', WV: 'South', NC: 'South', SC: 'South', GA: 'South', FL: 'South', KY: 'South', TN: 'South', AL: 'South', MS: 'South', AR: 'South', LA: 'South', OK: 'South', TX: 'South',
  MT: 'West', ID: 'West', WY: 'West', CO: 'West', NM: 'West', AZ: 'West', UT: 'West', NV: 'West', WA: 'West', OR: 'West', CA: 'West', AK: 'West', HI: 'West',
};

export default async function StateRateMapPage() {
  const snapshot = await getStateRatesSnapshotUncached();
  const faqStructuredData = createFaqStructuredData(faqs);

  const stateRecords: StateMapRecord[] = snapshot.geographies
    .filter((g) => g.code !== 'US' && snapshot.rates[g.code])
    .map((g) => {
      const rateDto = snapshot.rates[g.code]!;
      return {
        code: g.code,
        name: g.name,
        slug: g.slug,
        rateCentsPerKwh: rateDto.priceCentsPerKwh,
        periodFormatted: formatSourcePeriod(rateDto.period),
        region: REGION_LOOKUP[g.code] ?? 'West',
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const nationalAvg =
    snapshot.rates['US']?.priceCentsPerKwh ??
    stateRecords.reduce((acc, s) => acc + s.rateCentsPerKwh, 0) / (stateRecords.length || 1);

  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        title="Interactive U.S. Electricity Rate Map"
        description="Explore residential electricity pricing tiers (¢/kWh) and average monthly household utility expenses across all 50 states + DC."
      />

      <StateRateMap
        states={stateRecords}
        nationalAverageRate={nationalAvg}
      />

      <section style={{ marginTop: 40 }}>
        <h2>National Rate Dispersion & Geography</h2>
        <p>
          U.S. residential electricity prices vary widely by geography, with rates spanning from under 11¢/kWh in low-cost hydro and fossil-producing states to over 40¢/kWh in island and remote grids.
        </p>
        <p>
          State-to-state differences stem from four primary cost drivers: regional generation fuel mix (hydropower, nuclear, natural gas, coal, renewables), transmission infrastructure density, state regulatory market structure (regulated monopolies vs. retail choice), and state clean energy transition riders.
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq) => (
          <div key={faq.question} style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', marginBottom: 4 }}>
              {faq.question}
            </h3>
            <p style={{ color: '#4b5563', lineHeight: 1.6, margin: 0 }}>{faq.answer}</p>
          </div>
        ))}
      </section>

      <DataSourceNote>
        Data sourced directly from U.S. Energy Information Administration (EIA) Form EIA-861M monthly residential sales reports ({stateRecords[0]?.periodFormatted ?? 'May 2026'}).
      </DataSourceNote>

      <RelatedLinks links={relatedLinks} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(faqStructuredData),
        }}
      />
    </PageContainer>
  );
}
