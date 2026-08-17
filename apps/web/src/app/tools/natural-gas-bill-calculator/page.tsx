import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import { NaturalGasBillCalculatorIsland } from '@/features/natural-gas-bill-calculator/components/natural-gas-bill-calculator-island';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import { getNaturalGasHubData } from '@/lib/server/get-natural-gas-data';
import {
  createFaqStructuredData,
  createWebApplicationStructuredData,
  serializeStructuredData,
} from '@/lib/structured-data';

export const metadata: Metadata = createPageMetadata({
  title: 'Natural Gas Bill Calculator: Usage in Therms & Mcf',
  description:
    'Calculate your monthly natural gas bill spending, usage charges in therms or Mcf, fixed customer account fees, and all-in effective cost per unit.',
  path: '/tools/natural-gas-bill-calculator',
});

const faqs = [
  {
    question: 'How do I convert between Mcf, Ccf, and Therms on my gas bill?',
    answer:
      'Natural gas meters measure volume, while bills charge for heating energy. 1 Mcf (1,000 cubic feet) equals 10 Ccf (hundred cubic feet) and contains approximately 10.36 Therms (1,036,000 BTU) depending on local gas energy density.',
  },
  {
    question: 'Why does my natural gas bill stay high in summer when heating is off?',
    answer:
      'Fixed monthly customer service fees ($10 to $30/month) and municipal pipeline maintenance charges are billed every month regardless of gas usage. Additionally, natural gas water heaters and pilot lights consume steady baseline fuel year-round.',
  },
  {
    question: 'What is a Purchased Gas Adjustment (PGA) rider?',
    answer:
      'Utilities pass wholesale commodity gas market price fluctuations directly to consumers without markup through Purchased Gas Adjustment (PGA) or Gas Cost Recovery (GCR) line-item riders, which update monthly or quarterly.',
  },
  {
    question: 'How do I calculate my true all-in cost per therm of natural gas?',
    answer:
      'Divide your total monthly gas statement dollar amount (including customer charges, delivery fees, franchise taxes, and commodity costs) by the total therms consumed during that billing period.',
  },
];

export default async function NaturalGasBillCalculatorPage() {
  const hubData = await getNaturalGasHubData();

  const benchmarkProps = {
    reportingPeriod: hubData.latestSourceMonthFormatted,
    priceDollarsPerMcf: hubData.latestNationalRate?.priceDollarsPerMcf ?? 19.83,
    estimatedPricePerTherm: hubData.latestNationalRate?.priceDollarsPerTherm ?? 19.83 / 10.36,
    sourceLabel:
      hubData.latestNationalRate?.source === 'EIA'
        ? 'U.S. EIA Form EIA-857'
        : 'U.S. EIA Delivered Price',
  };

  const breadcrumbs = [
    { href: '/' as const, label: 'Home' },
    { href: '/tools' as const, label: 'Tools' },
    { href: '/tools/natural-gas-bill-calculator' as const, label: 'Natural Gas Bill Calculator' },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/natural-gas-rates',
    '/tools/gas-furnace-cost-calculator',
    '/electricity-bill-analyzer',
    '/methodology',
    '/data-sources',
  ];

  const webAppSchema = createWebApplicationStructuredData({
    name: 'Natural Gas Bill Calculator',
    description:
      'Calculate monthly natural gas bill spending, usage charges in therms or Mcf, fixed customer account fees, and all-in cost per unit.',
    path: '/tools/natural-gas-bill-calculator',
    applicationCategory: 'UtilityApplication',
  });

  const faqSchema = createFaqStructuredData(faqs);

  return (
    <>
      <PageContainer>
        <Breadcrumbs items={breadcrumbs} />

        <PageHeader
          eyebrow="Household Energy Tool"
          title="Natural Gas Bill Calculator"
          description="Estimate your monthly natural gas bill by calculating volumetric usage charges in therms or Mcf, adding fixed account fees, and analyzing all-in cost per unit."
        />

        <NaturalGasBillCalculatorIsland initialBenchmark={benchmarkProps} />

        {/* Crawlable Math & FAQs Section */}
        <section style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #f0f0f0' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: '#1f1f1f' }}>
            How Natural Gas Bills Are Structured
          </h2>
          <p style={{ lineHeight: 1.7, color: '#434343', marginBottom: 16 }}>
            Natural gas utility bills consist of two primary parts: fixed customer access fees and
            variable volumetric consumption charges. Volumetric charges depend on volume (Ccf or
            Mcf) converted into heat content (Therms):
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
            <strong style={{ fontSize: 16 }}>Standard Gas Bill Calculation:</strong>
            <code style={{ display: 'block', marginTop: 8, fontSize: 15, color: '#176b5b' }}>
              Volumetric Charge ($) = Usage (Therms) × Rate per Therm ($)
            </code>
            <code style={{ display: 'block', marginTop: 4, fontSize: 15, color: '#389e0d' }}>
              Total Bill ($) = Volumetric Charge + Monthly Customer Charge + Taxes & Riders
            </code>
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>
            Frequently Asked Questions About Natural Gas Bills
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
            Gas usage formulas calculate volumetric charges. Actual utility statements include local
            distribution tariffs, franchise fees, and weather normalization riders.
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
