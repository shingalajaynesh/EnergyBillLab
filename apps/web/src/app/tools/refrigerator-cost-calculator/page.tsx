import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { RelatedLinks } from '@/components/related-links';
import { RefrigeratorContainer } from '@/features/refrigerator-calculator';
import { createPageMetadata } from '@/lib/metadata';
import { publicRoutes, type PublicRouteHref } from '@/lib/routes';
import { getStateRatesSnapshot } from '@/lib/server/get-state-rates';

const routeInfo = publicRoutes.find((r) => r.href === '/tools/refrigerator-cost-calculator')!;

export const metadata: Metadata = createPageMetadata({
  title: routeInfo ? routeInfo.label : 'Refrigerator Electricity Cost Calculator',
  description: routeInfo
    ? routeInfo.description
    : 'Estimate refrigerator electricity usage (kWh) and operating cost using rated wattage, compressor duty cycle, or annual EnergyGuide rating.',
  path: '/tools/refrigerator-cost-calculator',
});

export default async function RefrigeratorCostCalculatorPage() {
  const snapshot = await getStateRatesSnapshot();
  const sourcePeriodText =
    snapshot.provenance.status === 'live_database' ||
    snapshot.provenance.status === 'bundled_snapshot'
      ? snapshot.provenance.sourcePeriod
      : undefined;

  const stateOptions = Object.values(snapshot.rates).map((r) => ({
    stateCode: r.code,
    stateName: r.name,
    rateCentsPerKwh: r.priceCentsPerKwh,
  }));

  const breadcrumbs: Array<{ href: PublicRouteHref; label?: string }> = [
    { href: '/', label: 'Home' },
    { href: '/tools', label: 'Tools' },
    { href: '/tools/refrigerator-cost-calculator', label: 'Refrigerator Cost Calculator' },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/tools/appliance-energy-cost-calculator',
    '/tools/clothes-dryer-cost-calculator',
    '/tools/electric-water-heater-cost-calculator',
    '/guides/how-much-electricity-do-household-appliances-use',
    '/electricity-bill-analyzer',
  ];

  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbs} />

      <header style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: '#1f1f1f',
            marginBottom: 8,
            letterSpacing: '-0.5px',
          }}
        >
          Refrigerator Electricity Cost Calculator
        </h1>
        <p style={{ fontSize: 16, color: '#595959', maxWidth: 800, lineHeight: 1.6 }}>
          Calculate monthly and annual electricity costs for your refrigerator using rated power,
          compressor cycling percentage, or official EnergyGuide annual kWh benchmarks.
        </p>
      </header>

      <RefrigeratorContainer stateOptions={stateOptions} sourcePeriodText={sourcePeriodText} />

      <section style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #f0f0f0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
          Understanding Refrigerator Power Draw and Compressor Duty Cycles
        </h2>
        <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
          Refrigerators remain plugged into the electrical grid 24 hours a day, but their cooling
          compressor runs intermittently. Under typical room temperatures, a modern residential
          refrigerator compressor runs approximately 30% to 45% of total time.
        </p>

        <div
          style={{
            background: '#fafafa',
            padding: 20,
            borderRadius: 8,
            border: '1px solid #e8e8e8',
            marginBottom: 24,
          }}
        >
          <strong style={{ fontSize: 16 }}>Refrigerator Energy & Cost Formula:</strong>
          <code style={{ display: 'block', marginTop: 8, fontSize: 15, color: '#176b5b' }}>
            Daily kWh = (Wattage × 24 hrs × Duty Cycle %) ÷ 1,000
          </code>
          <code style={{ display: 'block', marginTop: 4, fontSize: 15, color: '#389e0d' }}>
            Monthly Cost ($) = (Daily kWh × 30 days) × (Rate ¢/kWh ÷ 100)
          </code>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
          Data Sources & Methodology
        </h3>
        <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
          All U.S. state electricity rate averages provided in this calculator are sourced directly
          from the official U.S. Energy Information Administration (EIA) monthly residential
          dataset.
        </p>

        <DataSourceNote>
          Calculations are estimates based on user parameters and U.S. EIA residential state
          averages. Actual cost varies by ambient kitchen temperature, door usage frequency, and
          appliance defrost frequency.
        </DataSourceNote>
      </section>

      <section style={{ marginTop: 40 }}>
        <RelatedLinks links={relatedLinks} />
      </section>
    </PageContainer>
  );
}
