import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import { AuditWizard } from '@/features/home-energy-scorecard';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import { createFaqStructuredData, serializeStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = createPageMetadata({
  title: 'Home Energy Scorecard & Efficiency Audit Tool',
  description:
    'Free whole-home virtual energy audit. Evaluate your home insulation, HVAC efficiency, and window glazing to receive an Energy Efficiency Letter Grade (A+ to F), annual energy waste estimate, and prioritized Retrofit ROI Roadmap.',
  path: '/tools/home-energy-scorecard',
});

const breadcrumbs: Array<{ href: PublicRouteHref; label?: string }> = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
  { href: '/tools/home-energy-scorecard', label: 'Home Energy Scorecard' },
];

const faqs = [
  {
    question: 'How is the Home Energy Efficiency Letter Grade calculated?',
    answer:
      'The score (0–100) and letter grade (A+ to F) are modeled using building science principles from ASHRAE 90.2 and the U.S. Department of Energy (DOE) Residential Energy Consumption Survey (RECS). The tool scores five core thermal and mechanical components: building envelope/insulation (30 pts), primary heating system (25 pts), air conditioning efficiency (15 pts), domestic water heating (15 pts), and window draft resistance (15 pts).',
  },
  {
    question: 'What is estimated annual energy waste?',
    answer:
      'Annual energy waste represents the dollar value of electricity (kWh) and natural gas (therms) lost through preventable thermal bypass leaks, uninsulated attics, or obsolete mechanical equipment compared to a modern, code-compliant benchmark home.',
  },
  {
    question: 'Which home energy retrofit provides the fastest return on investment?',
    answer:
      'For most homes built before 2005, attic air sealing combined with R-49 blown-in cellulose insulation delivers the fastest simple payback (typically 2 to 4 years), saving 15% or more on annual heating and cooling expenses.',
  },
  {
    question: 'Are home energy efficiency upgrades eligible for federal tax credits?',
    answer:
      'Yes. Under the Inflation Reduction Act (IRA) Energy Efficient Home Improvement Credit (Section 25C), homeowners can claim a 30% federal tax credit up to $2,000 for qualifying heat pumps and heat pump water heaters, and up to $1,200 annually for insulation and air sealing.',
  },
];

const relatedLinks: PublicRouteHref[] = [
  '/tools/bill-spike-detective',
  '/tools/heating-fuel-comparator',
  '/guides/how-attic-insulation-affects-your-energy-bill',
  '/guides/heat-pump-vs-electric-resistance-heating-cost',
];

export default function HomeEnergyScorecardPage() {
  const faqStructuredData = createFaqStructuredData(faqs);

  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        title="Whole-Home Energy Efficiency Scorecard"
        description="Comprehensive virtual home energy audit. Calculate your home's thermal efficiency grade, quantify annual energy waste, and generate a customized retrofit ROI roadmap."
      />

      <AuditWizard />

      <section style={{ marginTop: 40 }}>
        <h2>Methodology & Building Physics Model</h2>
        <p>
          Energy Bill Lab's Whole-Home Energy Efficiency Scorecard benchmarks residential properties against the International Energy Conservation Code (IECC) and regional heating degree day (HDD) / cooling degree day (CDD) baselines.
        </p>
        <p>
          Thermal envelope resistance accounts for 30% of total score weighting because air leakage through unsealed top plates, recessed lighting cans, and attic hatches creates continuous convective thermal bypass. Mechanical systems (heating, cooling, and water heating) constitute 55% of the score because equipment efficiency (AFUE, SEER2, HSPF2, and UEF) dictates how much raw utility energy is required to deliver each unit of conditioned air or hot water.
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq) => (
          <div key={faq.question} style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', marginBottom: 4 }}>
              {faq.question}
            </h3>
            <p style={{ color: '#4b5563', lineHeight: 1.6, margin: 0 }}>{faq.answer}</p>
          </div>
        ))}
      </section>

      <DataSourceNote>
        Calculations benchmarked against U.S. Department of Energy (DOE) RECS baseline data and ASHRAE Standard 90.2 residential building energy models (August 2026 Reference Baseline).
      </DataSourceNote>

      <RelatedLinks links={relatedLinks} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(faqStructuredData),
        }}
      />
    </PageContainer>
  );
}
