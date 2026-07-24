import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { RelatedLinks } from '@/components/related-links';
import { DryerContainer } from '@/features/dryer-calculator';
import { createPageMetadata } from '@/lib/metadata';
import { publicRoutes, type PublicRouteHref } from '@/lib/routes';
import { getStateRatesSnapshot } from '@/lib/server/get-state-rates';

const routeInfo = publicRoutes.find((r) => r.href === '/tools/clothes-dryer-cost-calculator')!;

export const metadata: Metadata = createPageMetadata({
  title: routeInfo ? routeInfo.label : 'Clothes Dryer Electricity Cost Calculator',
  description: routeInfo
    ? routeInfo.description
    : 'Estimate electric clothes dryer cost per load, weekly cost, and annual energy usage using wattage, cycle length, and utility rates.',
  path: '/tools/clothes-dryer-cost-calculator',
});

export default async function ClothesDryerCostCalculatorPage() {
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
    { href: '/tools/clothes-dryer-cost-calculator', label: 'Clothes Dryer Cost Calculator' },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/tools/appliance-energy-cost-calculator',
    '/tools/refrigerator-cost-calculator',
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
          Clothes Dryer Electricity Cost Calculator
        </h1>
        <p style={{ fontSize: 16, color: '#595959', maxWidth: 800, lineHeight: 1.6 }}>
          Calculate electric clothes dryer electricity cost per laundry load, weekly spending, and
          annual kWh consumption based on element wattage, cycle length, and local utility rates.
        </p>
      </header>

      <DryerContainer stateOptions={stateOptions} sourcePeriodText={sourcePeriodText} />

      <section style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #f0f0f0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
          Understanding Electric Clothes Dryer Power Draw & Load Costs
        </h2>
        <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
          Electric clothes dryers use high-wattage 240V resistance heating coils (typically 3,000W
          to 5,600W) alongside a drum motor. Because heat generation is continuous during the main
          drying phase, operating cost is directly proportional to minutes per load and total weekly
          laundry loads.
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
          <strong style={{ fontSize: 16 }}>Clothes Dryer Energy Formula:</strong>
          <code style={{ display: 'block', marginTop: 8, fontSize: 15, color: '#176b5b' }}>
            kWh per Load = [Wattage × (Minutes per Load ÷ 60)] ÷ 1,000
          </code>
          <code style={{ display: 'block', marginTop: 4, fontSize: 15, color: '#389e0d' }}>
            Cost per Load ($) = kWh per Load × (Rate ¢/kWh ÷ 100)
          </code>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
          Electric Only Notice & Data Sources
        </h3>
        <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
          This calculator estimates electric drying equipment energy cost. Natural gas dryers use
          electricity for drum rotation and controls, but derive primary heating energy from therms
          of natural gas. State average rates are sourced directly from U.S. EIA residential data.
        </p>

        <DataSourceNote>
          Estimates are based on user inputs and U.S. EIA residential state rate averages.
          Real-world consumption varies by moisture level, exhaust vent airflow restriction, and
          heat setting.
        </DataSourceNote>
      </section>

      <section style={{ marginTop: 40 }}>
        <RelatedLinks links={relatedLinks} />
      </section>
    </PageContainer>
  );
}
