import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { RelatedLinks } from '@/components/related-links';
import { AcCalculatorContainer } from '@/features/ac-calculator';
import { createPageMetadata } from '@/lib/metadata';
import { publicRoutes, type PublicRouteHref } from '@/lib/routes';
import { getStateRatesSnapshot } from '@/lib/server/get-state-rates';
import {
  createBreadcrumbStructuredData,
  createFaqStructuredData,
  createWebApplicationStructuredData,
  serializeStructuredData,
} from '@/lib/structured-data';

const routeInfo = publicRoutes.find((r) => r.href === '/tools/ac-cost-calculator')!;

export const metadata: Metadata = createPageMetadata({
  title: routeInfo.label,
  description: routeInfo.description,
  path: routeInfo.href,
});

const faqs = [
  {
    question: 'How do I convert AC BTU/hr cooling capacity to electrical Watts?',
    answer:
      'Divide the cooling capacity in BTU/hr by the Energy Efficiency Ratio (EER). For example, a 12,000 BTU/hr window AC with an EER of 10.0 draws approximately 1,200 Watts (12,000 ÷ 10 = 1,200 W) of electrical input power.',
  },
  {
    question: 'What is the difference between EER and SEER2 ratings?',
    answer:
      'EER measures instantaneous cooling efficiency at a fixed outdoor temperature of 95°F. SEER2 (Seasonal Energy Efficiency Ratio 2) measures average cooling efficiency across an entire variable summer cooling season according to updated DOE M1 testing standards.',
  },
  {
    question: 'How much does it cost to run a central AC vs a window AC per hour?',
    answer:
      'At national average rates (~18.4¢/kWh), a 1,200W window AC costs about $0.22 per active hour ($0.11/hr at 50% duty cycle). A central 3.5-ton AC drawing 3,500W costs about $0.64 per active hour ($0.32/hr at 50% duty cycle).',
  },
  {
    question: 'Does raising the thermostat by 2°F really lower electric bills?',
    answer:
      'Yes. According to the U.S. Department of Energy (DOE), setting your thermostat 7°F–10°F higher for 8 hours a day can save up to 10% on annual cooling costs by reducing total compressor run-time and indoor-outdoor heat transfer.',
  },
];

export default async function AcCostCalculatorPage() {
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
    { href: '/tools/ac-cost-calculator', label: 'Air Conditioner Cost Calculator' },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/guides/how-much-does-it-cost-to-run-an-air-conditioner',
    '/guides/how-much-electricity-does-central-air-conditioning-use',
    '/guides/how-much-electricity-does-a-window-air-conditioner-use',
    '/guides/should-you-turn-off-the-air-conditioner-when-away',
    '/tools/appliance-energy-cost-calculator',
    '/electricity-bill-analyzer',
    '/electricity-rates',
    '/methodology',
  ];

  const webAppSchema = createWebApplicationStructuredData({
    name: 'Air Conditioner Cost Calculator',
    description: routeInfo.description,
    path: '/tools/ac-cost-calculator',
    applicationCategory: 'UtilityApplication',
  });

  const breadcrumbSchema = createBreadcrumbStructuredData([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Air Conditioner Cost Calculator', path: '/tools/ac-cost-calculator' },
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
          Air Conditioner Cost Calculator
        </h1>
        <p style={{ fontSize: 16, color: '#595959', maxWidth: 800, lineHeight: 1.6 }}>
          Estimate air conditioner electricity usage (kWh) and operating cost using cooling capacity
          (BTU/hr), EER efficiency ratings, electrical wattage, and compressor duty cycle.
        </p>
      </header>

      {/* Main Interactive Calculator Container */}
      <AcCalculatorContainer stateRates={stateRateOptions} />

      {/* Substantial Publisher Content Section for SEO & AdSense Readiness */}
      <section style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #f0f0f0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
          Understanding Air Conditioner Electricity Costs
        </h2>
        <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
          Air conditioning is often the single largest contributor to summer residential electric
          bills in North America. Calculating AC operating costs requires converting thermal cooling
          capacity (BTU/hr) into electrical power draw (Watts) and accounting for thermostat
          compressor cycling:
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
          <strong style={{ fontSize: 16 }}>Standard AC Power & Cost Formulas:</strong>
          <code style={{ display: 'block', marginTop: 8, fontSize: 15, color: '#0958d9' }}>
            Input Watts (W) = Cooling Capacity (BTU/hr) ÷ EER Rating
          </code>
          <code style={{ display: 'block', marginTop: 4, fontSize: 15, color: '#389e0d' }}>
            Operating Cost ($) = [(Input Watts × Hours/Day × Days × Duty Cycle %) ÷ 1,000] × (Rate
            ¢/kWh ÷ 100)
          </code>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>
          Key Factors Affecting Summer AC Power Consumption
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
              1. Energy Efficiency Rating (EER)
            </h4>
            <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
              Modern high-efficiency AC units (EER 12.0+) draw up to 25% less power than older
              legacy units (EER 9.0) for the exact same cooling capacity.
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
              2. Thermostat Setpoint & Duty Cycle
            </h4>
            <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
              Setting your thermostat 2°F to 3°F higher reduces compressor runtime, lowering duty
              cycle from ~70% to ~50% during summer afternoons.
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
              3. U.S. State Utility Rates (¢/kWh)
            </h4>
            <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
              Electricity rates range from ~12¢/kWh in high-hydro states to over 28¢/kWh in
              California and New England, directly multiplying operating cost.
            </p>
          </div>
        </div>

        {/* Frequently Asked Questions Section */}
        <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>
          Frequently Asked Questions About Air Conditioning Costs
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

      {/* Related Tools & Navigation */}
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
