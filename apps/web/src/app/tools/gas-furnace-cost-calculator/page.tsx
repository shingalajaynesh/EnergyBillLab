import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import { GasFurnaceCalculatorIsland } from '@/features/gas-furnace-calculator/components/gas-furnace-calculator-island';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import { getNaturalGasHubData } from '@/lib/server/get-natural-gas-data';
import {
  createFaqStructuredData,
  createWebApplicationStructuredData,
  serializeStructuredData,
} from '@/lib/structured-data';

export const metadata: Metadata = createPageMetadata({
  title: 'Gas Furnace Cost Calculator: AFUE Heating Expense',
  description:
    'Calculate gas furnace operating costs based on input Btu/hr rating or heating output capacity, AFUE seasonal efficiency, burner runtime hours, and therm gas rates.',
  path: '/tools/gas-furnace-cost-calculator',
});

const faqs = [
  {
    question: 'How do I calculate how much natural gas my furnace uses per hour?',
    answer:
      'Divide your furnace input rating in BTU/hr by 100,000 to find Therms consumed per full burner hour. For example, an 80,000 BTU/hr furnace burns 0.80 Therms per active hour ($1.53/hr at $1.91/therm national average gas price).',
  },
  {
    question: 'What is the difference between an 80% AFUE and 96% AFUE gas furnace?',
    answer:
      'AFUE (Annual Fuel Utilization Efficiency) measures combustion efficiency. An 80% standard furnace vents 20% of heat out the chimney, whereas a 96% high-efficiency condensing furnace captures almost all waste heat, saving 16% to 20% on annual winter heating bills.',
  },
  {
    question: 'How many hours a day does a gas furnace run in winter?',
    answer:
      'Under typical winter weather (30°F–40°F), a properly sized residential furnace runs 5 to 8 hours total per day (cycling on and off). During extreme sub-zero cold snaps, runtimes can reach 12 to 16 hours daily.',
  },
  {
    question: 'Is natural gas heating cheaper than electric resistance heat?',
    answer:
      'Yes. Natural gas delivered at $1.91 per therm provides 100,000 BTU of heat for $1.91. Delivering that same 100,000 BTU with electric resistance baseboards or space heaters (29.3 kWh at 18.4¢/kWh) costs $5.39—making natural gas nearly 65% cheaper per unit of thermal heat.',
  },
];

export default async function GasFurnaceCostCalculatorPage() {
  const hubData = await getNaturalGasHubData();

  const benchmarkProps = {
    reportingPeriod: hubData.latestSourceMonthFormatted,
    estimatedPricePerTherm: hubData.latestNationalRate?.priceDollarsPerTherm ?? 19.83 / 10.36,
    sourceLabel:
      hubData.latestNationalRate?.source === 'EIA'
        ? 'U.S. EIA Form EIA-857'
        : 'U.S. EIA Delivered Price',
  };

  const breadcrumbs = [
    { href: '/' as const, label: 'Home' },
    { href: '/tools' as const, label: 'Tools' },
    { href: '/tools/gas-furnace-cost-calculator' as const, label: 'Gas Furnace Cost Calculator' },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/natural-gas-rates',
    '/tools/natural-gas-bill-calculator',
    '/tools/space-heater-cost-calculator',
    '/methodology',
    '/data-sources',
  ];

  const webAppSchema = createWebApplicationStructuredData({
    name: 'Gas Furnace Cost Calculator',
    description:
      'Calculate residential gas furnace heating costs by input capacity (Btu/hr) or heating output rating with AFUE efficiency percentage, runtime hours, and therm gas pricing.',
    path: '/tools/gas-furnace-cost-calculator',
    applicationCategory: 'UtilityApplication',
  });

  const faqSchema = createFaqStructuredData(faqs);

  return (
    <>
      <PageContainer>
        <Breadcrumbs items={breadcrumbs} />

        <PageHeader
          eyebrow="Household Heating Tool"
          title="Gas Furnace Operating Cost Calculator"
          description="Calculate residential gas furnace heating costs by input capacity (Btu/hr) or heating output rating with AFUE efficiency percentage, runtime hours, and therm gas pricing."
        />

        <GasFurnaceCalculatorIsland initialBenchmark={benchmarkProps} />

        {/* Crawlable Math & FAQs Section */}
        <section style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #f0f0f0' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: '#1f1f1f' }}>
            How Furnace Gas Consumption Is Calculated
          </h2>
          <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
            Furnace heating expenses depend on burner input capacity (BTU/hr), annual fuel
            utilization efficiency (AFUE), and burner runtime duration:
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
            <strong style={{ fontSize: 16 }}>Gas Furnace Energy Formula:</strong>
            <code style={{ display: 'block', marginTop: 8, fontSize: 15, color: '#176b5b' }}>
              Therms per Hour = Input Capacity (BTU/hr) ÷ 100,000 BTU/Therm
            </code>
            <code style={{ display: 'block', marginTop: 4, fontSize: 15, color: '#389e0d' }}>
              Operating Cost ($) = (Therms/Hour × Daily Runtime Hours × Days) × Rate per Therm ($)
            </code>
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>
            Frequently Asked Questions About Gas Furnace Costs
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

          <DataSourceNote>
            Gas furnace operating costs calculate burner natural gas consumption. Furnace blower
            motor electricity usage (kWh) and utility fixed monthly charges are excluded.
          </DataSourceNote>

          <section style={{ marginTop: 24, marginBottom: 48 }}>
            <RelatedLinks links={relatedLinks} />
          </section>
        </section>
      </PageContainer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(faqSchema) }}
      />
    </>
  );
}
