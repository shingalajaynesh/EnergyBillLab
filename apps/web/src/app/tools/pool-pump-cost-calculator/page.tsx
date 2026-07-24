import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { RelatedLinks } from '@/components/related-links';
import { PoolPumpContainer } from '@/features/pool-pump-calculator';
import { createPageMetadata } from '@/lib/metadata';
import { publicRoutes, type PublicRouteHref } from '@/lib/routes';
import { getStateRatesSnapshot } from '@/lib/server/get-state-rates';

const routeInfo = publicRoutes.find((r) => r.href === '/tools/pool-pump-cost-calculator')!;

export const metadata: Metadata = createPageMetadata({
  title: routeInfo ? routeInfo.label : 'Pool Pump Electricity Cost Calculator',
  description: routeInfo
    ? routeInfo.description
    : 'Estimate pool filtration pump electricity cost (kWh), daily running costs, and seasonal spending based on motor wattage, operating schedule, and utility rates.',
  path: '/tools/pool-pump-cost-calculator',
});

export default async function PoolPumpCostCalculatorPage() {
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
    { href: '/tools/pool-pump-cost-calculator', label: 'Pool Pump Cost Calculator' },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/tools/appliance-energy-cost-calculator',
    '/tools/ac-cost-calculator',
    '/tools/dehumidifier-cost-calculator',
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
          Pool Pump Electricity Cost Calculator
        </h1>
        <p style={{ fontSize: 16, color: '#595959', maxWidth: 800, lineHeight: 1.6 }}>
          Calculate daily, monthly, and seasonal electricity costs for residential pool pumps using
          electrical input wattage, filtration schedule hours, and utility power rates.
        </p>
      </header>

      <PoolPumpContainer stateOptions={stateOptions} sourcePeriodText={sourcePeriodText} />

      <section style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #f0f0f0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
          Understanding Pool Pump Electrical Input vs Motor Horsepower
        </h2>
        <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
          Pool pump motors consume significant electrical power during daily filtration runs. While
          motors are rated in mechanical output horsepower (HP), power bills depend on actual
          electrical input wattage (W), which includes motor electrical efficiency losses.
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
          <strong style={{ fontSize: 16 }}>Pool Pump Energy Formula:</strong>
          <code style={{ display: 'block', marginTop: 8, fontSize: 15, color: '#176b5b' }}>
            Daily kWh = (Input Watts × Filtration Hours/Day) ÷ 1,000
          </code>
          <code style={{ display: 'block', marginTop: 4, fontSize: 15, color: '#389e0d' }}>
            Monthly Cost ($) = (Daily kWh × 30) × (Rate ¢/kWh ÷ 100)
          </code>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
          Single-Speed vs Variable-Speed Operation
        </h3>
        <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
          Single-speed pumps operate at full power (typically 1,500W to 2,200W). Variable-speed
          pumps allow low-speed circulation schedules (300W to 500W), reducing energy consumption by
          up to 70% while maintaining required water turnover volume.
        </p>

        <DataSourceNote>
          Estimates rely on user parameters and U.S. EIA residential state average rates. Actual
          cost depends on filter pressure, pipe friction, and pool turnover volume requirements.
        </DataSourceNote>
      </section>

      <section style={{ marginTop: 40 }}>
        <RelatedLinks links={relatedLinks} />
      </section>
    </PageContainer>
  );
}
