import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { RelatedLinks } from '@/components/related-links';
import { SpaceHeaterContainer } from '@/features/space-heater-calculator';
import { createPageMetadata } from '@/lib/metadata';
import { publicRoutes, type PublicRouteHref } from '@/lib/routes';
import { getStateRatesSnapshot } from '@/lib/server/get-state-rates';

const routeInfo = publicRoutes.find((r) => r.href === '/tools/space-heater-cost-calculator')!;

export const metadata: Metadata = createPageMetadata({
  title: `${routeInfo.label} | Energy Bill Lab`,
  description: routeInfo.description,
  path: routeInfo.href,
});

export default async function SpaceHeaterCostCalculatorPage() {
  const snapshot = await getStateRatesSnapshot();

  const stateRateOptions = Object.values(snapshot.rates).map((r) => ({
    code: r.code,
    name: r.name,
    priceCentsPerKwh: r.priceCentsPerKwh,
    period: r.period,
  }));

  const breadcrumbs: Array<{ href: PublicRouteHref; label?: string }> = [
    { href: '/', label: 'Home' },
    { href: '/tools', label: 'Tools' },
    { href: '/tools/space-heater-cost-calculator', label: 'Space Heater Cost Calculator' },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/tools/ac-cost-calculator',
    '/tools/appliance-energy-cost-calculator',
    '/electricity-bill-analyzer',
    '/electricity-rates',
    '/methodology',
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
          Space Heater Cost Calculator
        </h1>
        <p style={{ fontSize: 16, color: '#595959', maxWidth: 800, lineHeight: 1.6 }}>
          Estimate electricity usage (kWh) and operating cost for one or more electric space heaters
          using transparent wattage, quantity, runtime, duty-cycle, and electricity-rate
          assumptions.
        </p>
      </header>

      {/* Main Interactive Calculator */}
      <SpaceHeaterContainer stateRates={stateRateOptions} />

      {/* Substantial Publisher Content Section for SEO & AdSense Readiness */}
      <section style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #f0f0f0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
          Understanding Portable Space Heater Operating Costs
        </h2>
        <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
          Electric space heaters are among the highest power-drawing plug-in appliances in U.S.
          homes. Because electric resistance heat converts 100% of electrical energy into thermal
          energy, operating cost depends strictly on rated wattage, number of heaters, daily
          runtime, and utility rates:
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
          <strong style={{ fontSize: 16 }}>Space Heater Energy & Cost Formulas:</strong>
          <code style={{ display: 'block', marginTop: 8, fontSize: 15, color: '#0958d9' }}>
            Effective Watts (W) = Heater Watts × Quantity × (Duty Cycle % ÷ 100)
          </code>
          <code style={{ display: 'block', marginTop: 4, fontSize: 15, color: '#389e0d' }}>
            Operating Cost ($) = [(Effective Watts × Hours/Day × Days) ÷ 1,000] × (Rate ¢/kWh ÷ 100)
          </code>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>
          Key Factors Driving Electric Space Heater Bills
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              background: '#ffffff',
              padding: 16,
              borderRadius: 8,
              border: '1px solid #f0f0f0',
            }}
          >
            <h4 style={{ fontSize: 15, fontWeight: 600, color: '#fa8c16', marginBottom: 6 }}>
              1. Rated Electrical Wattage (W)
            </h4>
            <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
              Most standard 120V space heaters draw 1,500 Watts on high heat setting (drawing ~12.5
              Amps on a standard 15A household circuit).
            </p>
          </div>
          <div
            style={{
              background: '#ffffff',
              padding: 16,
              borderRadius: 8,
              border: '1px solid #f0f0f0',
            }}
          >
            <h4 style={{ fontSize: 15, fontWeight: 600, color: '#fa8c16', marginBottom: 6 }}>
              2. Quantity of Operating Units
            </h4>
            <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
              Running two 1,500W space heaters simultaneously doubles your connected load to 3,000W,
              generating ~3.0 kWh per hour of active heating.
            </p>
          </div>
          <div
            style={{
              background: '#ffffff',
              padding: 16,
              borderRadius: 8,
              border: '1px solid #f0f0f0',
            }}
          >
            <h4 style={{ fontSize: 15, fontWeight: 600, color: '#fa8c16', marginBottom: 6 }}>
              3. Thermostat Cycling & Duty Cycle
            </h4>
            <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
              Units with built-in adjustable thermostats cycle the heating element on and off once
              room temperature is reached, lowering active duty cycle.
            </p>
          </div>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
          Data Sources & Methodology
        </h3>
        <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
          All U.S. state electricity rate averages provided in this calculator are sourced directly
          from the official{' '}
          <a
            href="https://www.eia.gov/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1677ff' }}
          >
            U.S. Energy Information Administration (EIA) Form EIA-861M
          </a>{' '}
          monthly residential retail sales dataset.
        </p>

        <DataSourceNote>
          Calculations are estimates based on user-entered parameters and official U.S. EIA
          residential state average rates. Actual utility bill charges may vary due to local utility
          tariff tiers, fuel adjustment surcharges, and fixed customer service charges.
        </DataSourceNote>
      </section>

      {/* Related Tools */}
      <section style={{ marginTop: 40 }}>
        <RelatedLinks links={relatedLinks} />
      </section>
    </PageContainer>
  );
}
