import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { RelatedLinks } from '@/components/related-links';
import { DryerContainer } from '@/features/dryer-calculator';
import { createPageMetadata } from '@/lib/metadata';
import { publicRoutes, type PublicRouteHref } from '@/lib/routes';
import { getStateRatesSnapshot } from '@/lib/server/get-state-rates';
import {
  createBreadcrumbStructuredData,
  createFaqStructuredData,
  createWebApplicationStructuredData,
  serializeStructuredData,
} from '@/lib/structured-data';

const routeInfo = publicRoutes.find((r) => r.href === '/tools/clothes-dryer-cost-calculator')!;

export const metadata: Metadata = createPageMetadata({
  title: routeInfo ? routeInfo.label : 'Clothes Dryer Electricity Cost Calculator',
  description: routeInfo
    ? routeInfo.description
    : 'Estimate electric clothes dryer cost per load, weekly cost, and annual energy usage using wattage, cycle length, and utility rates.',
  path: '/tools/clothes-dryer-cost-calculator',
});

const faqs = [
  {
    question: 'How much electricity does an electric clothes dryer use per cycle?',
    answer:
      'A standard electric clothes dryer (rated at 3,000W to 5,000W) running a 45-minute cycle consumes approximately 2.5 to 3.5 kWh of electricity per load ($0.46 to $0.64 at 18.4¢/kWh).',
  },
  {
    question: 'Are heat pump clothes dryers more efficient than standard electric dryers?',
    answer:
      'Yes. Heat pump ventless dryers recycle ambient heat rather than exhausting hot air outdoors. They draw roughly 1,000W to 1,500W and consume 40% to 60% less energy per cycle compared to conventional resistance element dryers.',
  },
  {
    question: 'How many loads of laundry does an average household do per week?',
    answer:
      'According to ENERGY STAR data, the average American family does 5 to 7 loads of laundry per week (approximately 300 loads per year), totaling 750–1,050 kWh annually for drying alone.',
  },
  {
    question: 'Does cleaning the lint trap reduce electric dryer bills?',
    answer:
      'Yes. A clogged lint filter or restricted ductwork impedes airflow, causing the moisture sensor to extend cycle duration by 15–20 minutes per load, increasing energy consumption by 25% to 35%.',
  },
];

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
    '/guides/how-much-does-it-cost-to-run-an-electric-clothes-dryer',
    '/guides/how-much-electricity-do-household-appliances-use',
    '/tools/appliance-energy-cost-calculator',
    '/tools/refrigerator-cost-calculator',
    '/tools/electric-water-heater-cost-calculator',
    '/electricity-bill-analyzer',
    '/electricity-rates',
    '/methodology',
  ];

  const webAppSchema = createWebApplicationStructuredData({
    name: 'Clothes Dryer Electricity Cost Calculator',
    description: routeInfo.description,
    path: '/tools/clothes-dryer-cost-calculator',
    applicationCategory: 'UtilityApplication',
  });

  const breadcrumbSchema = createBreadcrumbStructuredData([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Clothes Dryer Cost Calculator', path: '/tools/clothes-dryer-cost-calculator' },
  ]);

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

        {/* Frequently Asked Questions Section */}
        <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>
          Frequently Asked Questions About Clothes Dryer Energy
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

      <section style={{ marginTop: 40, marginBottom: 48 }}>
        <RelatedLinks links={relatedLinks} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(faqSchema) }}
      />
    </PageContainer>
  );
}
