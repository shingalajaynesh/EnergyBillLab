import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { RelatedLinks } from '@/components/related-links';
import { PoolPumpContainer } from '@/features/pool-pump-calculator';
import { createPageMetadata } from '@/lib/metadata';
import { publicRoutes, type PublicRouteHref } from '@/lib/routes';
import { getStateRatesSnapshot } from '@/lib/server/get-state-rates';
import {
  createFaqStructuredData,
  createWebApplicationStructuredData,
  serializeStructuredData,
} from '@/lib/structured-data';

const routeInfo = publicRoutes.find((r) => r.href === '/tools/pool-pump-cost-calculator')!;

export const metadata: Metadata = createPageMetadata({
  title: routeInfo ? routeInfo.label : 'Pool Pump Electricity Cost Calculator',
  description: routeInfo
    ? routeInfo.description
    : 'Estimate pool filtration pump electricity cost (kWh), daily running costs, and seasonal spending based on motor wattage, operating schedule, and utility rates.',
  path: '/tools/pool-pump-cost-calculator',
});

const faqs = [
  {
    question: 'How much electricity does a 1.5 HP pool pump use per day?',
    answer:
      'A standard single-speed 1.5 HP pool pump draws approximately 1,800 Watts of electrical power. Running it for 8 hours per day consumes 14.4 kWh daily ($2.65/day or ~$79.50/month at 18.4¢/kWh).',
  },
  {
    question: 'How many hours a day should a pool pump run?',
    answer:
      'A residential pool pump should run long enough to circulate the entire volume of pool water through the filter at least once per day (typically 6 to 8 hours in summer and 4 to 6 hours in winter).',
  },
  {
    question: 'Why do variable-speed pool pumps save so much electricity?',
    answer:
      'Due to the pump Affinity Laws, cutting motor RPM in half reduces electrical power draw by a factor of eight (cubed relationship). Running a variable-speed pump at low speed for 12 hours moves the same volume of water as a single-speed pump in 6 hours while using up to 70% less electricity.',
  },
  {
    question:
      'What is the annual operating cost difference between single-speed and variable-speed pumps?',
    answer:
      'According to ENERGY STAR, upgrading from an old single-speed pool pump to a certified variable-speed pump saves an average of $350 to $560 per year on household electric bills, paying for itself in under two seasons.',
  },
];

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
    '/guides/how-much-does-it-cost-to-run-a-pool-pump',
    '/guides/how-much-electricity-do-household-appliances-use',
    '/tools/appliance-energy-cost-calculator',
    '/tools/ac-cost-calculator',
    '/tools/dehumidifier-cost-calculator',
    '/electricity-bill-analyzer',
    '/electricity-rates',
    '/methodology',
  ];

  const webAppSchema = createWebApplicationStructuredData({
    name: 'Pool Pump Electricity Cost Calculator',
    description: routeInfo.description,
    path: '/tools/pool-pump-cost-calculator',
    applicationCategory: 'UtilityApplication',
  });

  const faqSchema = createFaqStructuredData(faqs);

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

        {/* Frequently Asked Questions Section */}
        <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>
          Frequently Asked Questions About Pool Pump Electricity
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 16,
            marginBottom: 24,
          }}
        >
          {faqs.map((faq) => (
            <div
              key={faq.question}
              style={{
                background: '#ffffff',
                padding: 18,
                borderRadius: 8,
                border: '1px solid #e8e8e8',
              }}
            >
              <h4 style={{ fontSize: 15, fontWeight: 600, color: '#1f1f1f', marginBottom: 8 }}>
                {faq.question}
              </h4>
              <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.6, margin: 0 }}>
                {faq.answer}
              </p>
            </div>
          ))}
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

      <section style={{ marginTop: 40, marginBottom: 48 }}>
        <RelatedLinks links={relatedLinks} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(faqSchema) }}
      />
    </PageContainer>
  );
}
