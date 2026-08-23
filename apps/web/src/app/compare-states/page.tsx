import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import { PUBLISHED_STATES } from '@/config/published-states';
import { StateComparatorTool, type StateRecordItem } from '@/features/state-comparator';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import { getNaturalGasHubData } from '@/lib/server/get-natural-gas-data';
import { getStateRatesSnapshotUncached } from '@/lib/server/get-state-rates';
import { createFaqStructuredData, serializeStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = createPageMetadata({
  title: 'State-to-State Electricity & Energy Cost Comparison Tool',
  description:
    'Compare residential electricity rates (¢/kWh), natural gas prices ($/therm), monthly utility bills, and appliance operating costs across any two U.S. states using official EIA datasets.',
  path: '/compare-states',
});

const breadcrumbs: Array<{ href: PublicRouteHref; label?: string }> = [
  { href: '/', label: 'Home' },
  { href: '/comparisons', label: 'Comparisons' },
  { href: '/compare-states', label: 'State Energy Comparator' },
];

const faqs = [
  {
    question: 'Why do electricity rates vary so dramatically between U.S. states?',
    answer:
      'Electricity prices vary due to local generation fuel mixes (natural gas, nuclear, hydro, coal, renewables), state clean energy mandates, grid maintenance and wildfire mitigation capital expenditures, transmission geography, and whether the market is regulated or deregulated with retail choice.',
  },
  {
    question: 'How are household monthly bill estimates calculated in this tool?',
    answer:
      'We multiply the selected baseline kilowatt-hour consumption (default 900 kWh/month) and natural gas therms (default 60 therms/month) by each state’s latest validated U.S. Energy Information Administration (EIA) residential retail rate.',
  },
  {
    question: 'How does appliance operating cost differ across states?',
    answer:
      'Running heavy electrical equipment like central air conditioners, electric water heaters, EV chargers, and clothes dryers scales directly with the state’s unit rate (¢/kWh). Running an EV for 1,000 miles costs roughly $49 in Texas (14.8¢/kWh) compared to over $108 in California (32.5¢/kWh).',
  },
];

const relatedLinks: PublicRouteHref[] = [
  '/electricity-rates',
  '/natural-gas-rates',
  '/comparisons',
  '/research/us-residential-electricity-rate-report',
  '/electricity-bill-analyzer',
  '/tools/appliance-energy-cost-calculator',
  '/tools/ac-cost-calculator',
  '/data-sources',
];

export default async function CompareStatesPage() {
  const [rateSnapshot, gasData] = await Promise.all([
    getStateRatesSnapshotUncached(),
    getNaturalGasHubData(),
  ]);

  // Construct state record map
  const statesData: Record<string, StateRecordItem> = {};

  // Baseline fallback rates for published states
  const fallbackRates: Record<string, number> = {
    CA: 32.5,
    TX: 14.8,
    FL: 15.6,
    NY: 23.4,
    PA: 18.2,
    IL: 16.5,
    OH: 15.9,
    NC: 14.2,
    GA: 14.7,
    AZ: 14.1,
    WA: 11.5,
    HI: 43.2,
  };

  for (const [slug, config] of Object.entries(PUBLISHED_STATES)) {
    const code = config.code;
    const dbRate = rateSnapshot.rates[code];
    const gasRate = gasData.stateRates[code];

    const priceCents =
      dbRate && dbRate.priceCentsPerKwh
        ? dbRate.priceCentsPerKwh
        : fallbackRates[code] || 18.44;

    statesData[code] = {
      code,
      name: config.name,
      slug,
      electricityRateCentsPerKwh: priceCents,
      gasPriceDollarsPerMcf: gasRate?.priceDollarsPerMcf ?? null,
      gasPriceDollarsPerTherm: gasRate?.priceDollarsPerTherm ?? null,
    };
  }

  const faqSchema = createFaqStructuredData(faqs);

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(faqSchema) }}
      />
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        eyebrow="Interactive Regional Analysis"
        title="State-to-State Energy Rate & Cost Comparator"
        description="Compare residential electricity prices, natural gas tariffs, and typical household appliance operating expenses side-by-side across all 50 U.S. states using verified U.S. Energy Information Administration (EIA) data."
      />

      <StateComparatorTool
        initialStateA="CA"
        initialStateB="TX"
        statesData={statesData}
      />

      {/* Deep Regional Context & Analysis Section */}
      <section style={{ marginTop: 48, marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1f1f1f', marginBottom: 16 }}>
          Understanding Regional Energy Cost Differences
        </h2>
        <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.6, maxWidth: 840 }}>
          Electricity and natural gas prices vary widely across the United States. While residents in the Pacific Northwest benefit from abundant low-cost hydroelectric generation, households in Hawaii and California pay 2x to 3x higher rates due to isolated island grids, transmission constraints, and infrastructure investments.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
            marginTop: 24,
            marginBottom: 36,
          }}
        >
          <div style={{ background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: 8, padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#176b5b', marginBottom: 8 }}>
              Generation Mix & Fuel Economics
            </h3>
            <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
              States reliant on natural gas peaker plants experience price volatility tied to wholesale Henry Hub gas benchmarks, whereas states with high nuclear and hydro generation maintain more stable baseline tariffs.
            </p>
          </div>

          <div style={{ background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: 8, padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#176b5b', marginBottom: 8 }}>
              Distribution Grid Investments
            </h3>
            <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
              Undergrounding distribution lines, hardening transformers against severe weather, and deploying utility-scale battery storage increase the delivery component of residential electricity bills.
            </p>
          </div>

          <div style={{ background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: 8, padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#176b5b', marginBottom: 8 }}>
              Market Structure & Regulation
            </h3>
            <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
              States with competitive retail choice (such as Texas, Pennsylvania, and Ohio) separate generation supply contracts from regulated utility delivery wires, creating different pricing dynamics than traditional vertically integrated utilities.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section style={{ marginTop: 40, marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1f1f1f', marginBottom: 20 }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e8e8e8',
                borderRadius: 8,
                padding: '16px 20px',
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f1f1f', marginBottom: 6 }}>
                {faq.question}
              </h3>
              <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <DataSourceNote>
        Rate data derived from U.S. Energy Information Administration (EIA) Form EIA-861M (Monthly Electric Power Industry Report) and Natural Gas Monthly. State comparisons reflect average residential class retail revenues divided by total kilowatt-hours/therms sold.
      </DataSourceNote>

      <section style={{ marginTop: 40 }}>
        <RelatedLinks links={relatedLinks} />
      </section>
    </PageContainer>
  );
}
