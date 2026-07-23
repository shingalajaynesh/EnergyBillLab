import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { RelatedLinks } from '@/components/related-links';
import { ApplianceCalculatorContainer } from '@/features/appliance-calculator';
import { createPageMetadata } from '@/lib/metadata';
import { publicRoutes, type PublicRouteHref } from '@/lib/routes';
import { getStateRatesSnapshot } from '@/lib/server/get-state-rates';

const routeInfo = publicRoutes.find((r) => r.href === '/tools/appliance-energy-cost-calculator')!;

export const metadata: Metadata = createPageMetadata({
  title: routeInfo.label,
  description: routeInfo.description,
  path: routeInfo.href,
});

export default async function ApplianceEnergyCostCalculatorPage() {
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
    { href: '/tools/appliance-energy-cost-calculator', label: 'Appliance Energy Cost Calculator' },
  ];

  const relatedLinks: PublicRouteHref[] = [
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
          Appliance Energy Cost Calculator
        </h1>
        <p style={{ fontSize: 16, color: '#595959', maxWidth: 800, lineHeight: 1.6 }}>
          Calculate the exact electricity consumption (kWh) and operating cost of any household
          appliance. Enter your appliance wattage, usage hours, and electricity rate to estimate
          daily, monthly, and annual energy expenses.
        </p>
      </header>

      {/* Main Interactive Calculator Section */}
      <ApplianceCalculatorContainer stateRates={stateRateOptions} />

      {/* Substantial Publisher Content Section for SEO & AdSense Readiness */}
      <section style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #f0f0f0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
          How Appliance Electricity Consumption Is Calculated
        </h2>
        <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
          Electric utility providers bill residential customers based on{' '}
          <strong>kilowatt-hours (kWh)</strong>, where 1 kWh equals 1,000 watts of electrical power
          consumed continuously for 1 hour. To determine how much an appliance adds to your electric
          bill, you must convert its power rating (Watts) and operating duration (Hours) into kWh:
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
          <strong style={{ fontSize: 16 }}>Standard Appliance Energy Formula:</strong>
          <code style={{ display: 'block', marginTop: 8, fontSize: 15, color: '#0958d9' }}>
            kWh = (Watts × Hours Used per Day × Days × Duty Cycle %) ÷ 1,000
          </code>
          <code style={{ display: 'block', marginTop: 4, fontSize: 15, color: '#389e0d' }}>
            Total Cost ($) = kWh × (Electricity Rate in ¢/kWh ÷ 100)
          </code>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>
          Factors That Influence Household Power Expenses
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
            <h4 style={{ fontSize: 15, fontWeight: 600, color: '#1677ff', marginBottom: 6 }}>
              1. Appliance Wattage (W)
            </h4>
            <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
              Higher wattage devices (space heaters, clothes dryers, ovens) convert energy faster,
              costing significantly more per hour of active use than low-wattage electronics.
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
            <h4 style={{ fontSize: 15, fontWeight: 600, color: '#1677ff', marginBottom: 6 }}>
              2. Operating Hours & Schedule
            </h4>
            <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
              Continuous baseline appliances (refrigerators, WiFi routers) accumulate energy use
              24/7, whereas intermittent devices (microwaves, toasters) use high power for only
              minutes.
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
            <h4 style={{ fontSize: 15, fontWeight: 600, color: '#1677ff', marginBottom: 6 }}>
              3. Utility Electricity Rate (¢/kWh)
            </h4>
            <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
              U.S. residential electricity rates vary widely by state—from under 12¢/kWh in states
              with abundant hydro/gas power to over 30¢/kWh in the Northeast and Hawaii.
            </p>
          </div>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
          Transparent Source Methodology
        </h3>
        <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
          All state electricity rate benchmarks offered in Energy Bill Lab calculators are sourced
          directly from the official{' '}
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

      {/* Related Tools & Navigation */}
      <section style={{ marginTop: 40 }}>
        <RelatedLinks links={relatedLinks} />
      </section>
    </PageContainer>
  );
}
