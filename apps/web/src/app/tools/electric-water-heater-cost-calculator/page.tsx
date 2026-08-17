import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { RelatedLinks } from '@/components/related-links';
import { WaterHeaterContainer } from '@/features/water-heater-calculator';
import { createPageMetadata } from '@/lib/metadata';
import { publicRoutes, type PublicRouteHref } from '@/lib/routes';
import { getStateRatesSnapshot } from '@/lib/server/get-state-rates';
import {
  createFaqStructuredData,
  createWebApplicationStructuredData,
  serializeStructuredData,
} from '@/lib/structured-data';

const routeInfo = publicRoutes.find(
  (r) => r.href === '/tools/electric-water-heater-cost-calculator',
)!;

export const metadata: Metadata = createPageMetadata({
  title: routeInfo ? routeInfo.label : 'Electric Water Heater Cost Calculator',
  description: routeInfo
    ? routeInfo.description
    : 'Estimate electric resistance water heater daily, monthly, and annual operating costs based on element wattage, active heating runtime, and electricity rates.',
  path: '/tools/electric-water-heater-cost-calculator',
});

const faqs = [
  {
    question: 'How many hours a day does an electric water heater run?',
    answer:
      'For an average family of three to four people, a 50-gallon electric resistance water heater runs actively for approximately 3 to 4 hours total per day, consuming 12 to 18 kWh daily ($2.20 to $3.30/day at 18.4¢/kWh).',
  },
  {
    question: 'Do both upper and lower heating elements run at the same time?',
    answer:
      'No. Standard residential electric water heater thermostats use non-simultaneous interlocking. The upper element turns on first to heat the top third of the tank for immediate hot water, then power switches to the lower element to heat the rest.',
  },
  {
    question: 'How much does standby heat loss cost on an electric tank water heater?',
    answer:
      'Standby thermal losses (heat leaking continuously through tank insulation into an unconditioned basement or garage) account for roughly 15% to 25% of total annual water heater energy use ($70 to $120/year). Adding an insulation blanket can reduce this loss by 25% to 45%.',
  },
  {
    question: 'How much money does switching to a hybrid heat pump water heater save?',
    answer:
      'Hybrid heat pump water heaters draw about 500W to 600W instead of 4,500W, using up to 70% less electricity. According to ENERGY STAR, switching from electric resistance to a hybrid heat pump saves the average household $330 to $400 per year on electric bills.',
  },
];

export default async function ElectricWaterHeaterCostCalculatorPage() {
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
    {
      href: '/tools/electric-water-heater-cost-calculator',
      label: 'Electric Water Heater Cost Calculator',
    },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/guides/how-much-does-it-cost-to-run-an-electric-water-heater',
    '/guides/how-much-electricity-do-household-appliances-use',
    '/tools/appliance-energy-cost-calculator',
    '/tools/refrigerator-cost-calculator',
    '/tools/clothes-dryer-cost-calculator',
    '/electricity-bill-analyzer',
    '/electricity-rates',
    '/methodology',
  ];

  const webAppSchema = createWebApplicationStructuredData({
    name: 'Electric Water Heater Cost Calculator',
    description: routeInfo.description,
    path: '/tools/electric-water-heater-cost-calculator',
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
          Electric Water Heater Cost Calculator
        </h1>
        <p style={{ fontSize: 16, color: '#595959', maxWidth: 800, lineHeight: 1.6 }}>
          Calculate monthly and annual electricity costs for electric-resistance water heaters using
          element wattage ratings, active daily heating hours, and local state utility rates.
        </p>
      </header>

      <WaterHeaterContainer stateOptions={stateOptions} sourcePeriodText={sourcePeriodText} />

      <section style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #f0f0f0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
          Understanding Electric Resistance Tank Water Heater Costs
        </h2>
        <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
          Standard electric tank water heaters feature upper and lower heating elements (usually
          3,500W to 5,500W). Standard thermostat wiring energizes only one element at a time to
          maintain water temperature and recover after hot water draws.
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
          <strong style={{ fontSize: 16 }}>Water Heater Energy Formula:</strong>
          <code style={{ display: 'block', marginTop: 8, fontSize: 15, color: '#176b5b' }}>
            Daily kWh = (Element Watts × Active Elements × Active Hours/Day) ÷ 1,000
          </code>
          <code style={{ display: 'block', marginTop: 4, fontSize: 15, color: '#389e0d' }}>
            Monthly Cost ($) = (Daily kWh × 30) × (Rate ¢/kWh ÷ 100)
          </code>
        </div>

        {/* Frequently Asked Questions Section */}
        <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>
          Frequently Asked Questions About Water Heater Power
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
          Technology Notice & Data Sources
        </h3>
        <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
          This calculator models electric-resistance tank water heaters. Hybrid heat-pump water
          heaters use refrigeration technology to achieve 3x to 4x higher efficiency. State rate
          data is provided via U.S. EIA monthly residential benchmarks.
        </p>

        <DataSourceNote>
          Estimates depend on user input parameters and U.S. EIA residential state rate averages.
          Standby heat losses through tank walls and ground inlet water temperature affect daily
          runtime.
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
