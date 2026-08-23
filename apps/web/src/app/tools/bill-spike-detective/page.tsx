import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import { DiagnosticWizard } from '@/features/bill-spike-detective';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import { createFaqStructuredData, serializeStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = createPageMetadata({
  title: 'Bill Spike Detective | Why Is My Electric Bill So High?',
  description:
    'Forensic electric bill diagnostic tool. Isolate whether your utility bill spike was caused by extreme weather, AC/heat pump compressor cycling, rate rider jumps, or estimated meter readings.',
  path: '/tools/bill-spike-detective',
});

const breadcrumbs: Array<{ href: PublicRouteHref; label?: string }> = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
  { href: '/tools/bill-spike-detective', label: 'Bill Spike Detective' },
];

const faqs = [
  {
    question: 'How does the Bill Spike Detective identify why my electric bill increased?',
    answer:
      'The diagnostic engine compares your current statement against your previous baseline across both kilowatt-hours (kWh) and effective cost per kWh ($/kWh). It normalizes for billing cycle calendar days, cross-references seasonal climate conditions, and calculates probability attribution scores for major culprits including AC runtime, space heaters, rate tariff hikes, and estimated meter reading true-ups.',
  },
  {
    question: 'What is the difference between a usage spike and a rate spike?',
    answer:
      'A usage spike occurs when your household consumed more kilowatt-hours (e.g. running air conditioning during a 95°F heatwave). A rate spike occurs when your utility increases its base energy supply rate, distribution delivery tariff, or seasonal fuel adjustment surcharge—meaning your bill increases even if your electricity consumption remained identical.',
  },
  {
    question: 'What should I do if my bill spike is due to an "Estimated Meter Reading"?',
    answer:
      'When utility personnel cannot access your physical meter, the utility estimates consumption based on historical averages. If past estimates were too low, the next actual physical read will include a large "true-up" catch-up charge. You can call your utility to verify the meter reading and request a multi-month payment arrangement if the estimate was inaccurate.',
  },
];

const relatedLinks: PublicRouteHref[] = [
  '/electricity-bill-analyzer',
  '/tools/ac-cost-calculator',
  '/tools/space-heater-cost-calculator',
  '/guides/why-is-my-electric-bill-so-high',
  '/guides/why-is-my-electric-bill-high-when-usage-is-low',
  '/guides/how-to-read-an-electric-bill-line-by-line',
  '/guides/estimated-vs-actual-meter-reading',
  '/guides/how-billing-cycle-length-affects-electricity-bills',
];

export default function BillSpikeDetectivePage() {
  const faqSchema = createFaqStructuredData(faqs);

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(faqSchema) }}
      />
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        eyebrow="Forensic Diagnostic Triage"
        title="Bill Spike Detective & Diagnostic Tool"
        description="Isolate exactly why your electric bill suddenly increased. Our interactive forensic wizard evaluates your usage numbers, seasonal weather extremes, high-draw equipment, and utility billing indicators to pinpoint the root culprit and provide a prioritized savings action plan."
      />

      <DiagnosticWizard />

      {/* Deep Contextual Content Section */}
      <section style={{ marginTop: 48, marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1f1f1f', marginBottom: 16 }}>
          How the Forensic Diagnostic Triage Works
        </h2>
        <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.6, maxWidth: 800 }}>
          Utility bills can jump for multiple interconnected reasons. A single 10-day summer heatwave can double air conditioner compressor runtime, while a simultaneous 3-day calendar extension in your billing period adds baseline overhead. The Bill Spike Detective isolates:
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
            marginTop: 24,
            marginBottom: 36,
          }}
        >
          <div style={{ background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: 8, padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#176b5b', marginBottom: 8 }}>
              1. Weather & Climate Drivers
            </h3>
            <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
              HVAC cooling and heating represent over 50% of typical home electricity. Extreme outdoor temperatures force compressors and resistance heat strips to run extended duty cycles.
            </p>
          </div>

          <div style={{ background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: 8, padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#176b5b', marginBottom: 8 }}>
              2. Billing Cycle Calendar Days
            </h3>
            <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
              Utility billing cycles vary from 27 to 36 days. Comparing total dollars without normalizing for calendar days creates false alarms that mask steady daily usage habits.
            </p>
          </div>

          <div style={{ background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: 8, padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#176b5b', marginBottom: 8 }}>
              3. Tariff Hikes & Fuel Riders
            </h3>
            <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
              Utilities frequently adjust generation supply charges, distribution riders, and fuel adjustment surcharges, resulting in higher bills even when total kWh consumption remains flat.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section style={{ marginTop: 40, marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1f1f1f', marginBottom: 20 }}>
          Frequently Asked Questions About Bill Spikes
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e8e8e8',
                borderRadius: 8,
                padding: '16px 20px',
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f1f1f', marginBottom: 6 }}>
                {faq.question}
              </h3>
              <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <DataSourceNote>
        Energy Bill Lab calculations provide forensic estimates based on standard thermodynamic and electrical engineering models (ASHRAE Standard 55, U.S. DOE Energy Saver). Actual utility statements may include utility-specific riders, taxes, tier thresholds, and demand surcharges.
      </DataSourceNote>

      <section style={{ marginTop: 40 }}>
        <RelatedLinks links={relatedLinks} />
      </section>
    </PageContainer>
  );
}
