import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { RelatedLinks } from '@/components/related-links';
import { DehumidifierContainer } from '@/features/dehumidifier-calculator';
import { createPageMetadata } from '@/lib/metadata';
import { publicRoutes, type PublicRouteHref } from '@/lib/routes';
import { getStateRatesSnapshot } from '@/lib/server/get-state-rates';

const routeInfo = publicRoutes.find((r) => r.href === '/tools/dehumidifier-cost-calculator')!;

export const metadata: Metadata = createPageMetadata({
  title: routeInfo ? routeInfo.label : 'Dehumidifier Electricity Cost Calculator',
  description: routeInfo
    ? routeInfo.description
    : 'Estimate dehumidifier electricity usage (kWh), daily running costs, and monthly energy bills using rated wattage, humidistat duty cycle, and utility rates.',
  path: '/tools/dehumidifier-cost-calculator',
});

export default async function DehumidifierCostCalculatorPage() {
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
    { href: '/tools/dehumidifier-cost-calculator', label: 'Dehumidifier Cost Calculator' },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/tools/appliance-energy-cost-calculator',
    '/tools/ac-cost-calculator',
    '/tools/space-heater-cost-calculator',
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
          Dehumidifier Electricity Cost Calculator
        </h1>
        <p style={{ fontSize: 16, color: '#595959', maxWidth: 800, lineHeight: 1.6 }}>
          Calculate monthly and annual electricity costs for basement and room dehumidifiers using
          compressor wattage, humidistat cycling duty cycle, and local utility electricity rates.
        </p>
      </header>

      <DehumidifierContainer stateOptions={stateOptions} sourcePeriodText={sourcePeriodText} />

      <section style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #f0f0f0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
          Understanding Dehumidifier Wattage & Humidistat Duty Cycles
        </h2>
        <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
          Dehumidifiers operate an internal refrigeration compressor and fan to condense airborne
          moisture. Capacity ratings (such as 35 or 50 pints per day) measure moisture removal
          performance, whereas electricity bills depend on electrical input wattage (typically 300W
          to 700W) and compressor cycling.
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
          <strong style={{ fontSize: 16 }}>Dehumidifier Energy Formula:</strong>
          <code style={{ display: 'block', marginTop: 8, fontSize: 15, color: '#176b5b' }}>
            Daily kWh = (Wattage × Connected Hours/Day × Duty Cycle %) ÷ 1,000
          </code>
          <code style={{ display: 'block', marginTop: 4, fontSize: 15, color: '#389e0d' }}>
            Monthly Cost ($) = (Daily kWh × 30) × (Rate ¢/kWh ÷ 100)
          </code>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
          Factors Affecting Dehumidifier Operating Hours
        </h3>
        <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
          Basement relative humidity, ambient space temperature, target humidistat setpoint, air
          filter cleanliness, and direct continuous drainage affect how many hours per day the
          compressor remains active.
        </p>

        <DataSourceNote>
          Estimates are based on user inputs and U.S. EIA residential state average rates. Actual
          energy consumption depends on relative humidity, air filter maintenance, and room
          insulation.
        </DataSourceNote>
      </section>

      <section style={{ marginTop: 40 }}>
        <RelatedLinks links={relatedLinks} />
      </section>
    </PageContainer>
  );
}
