import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import { CalculatorIsland } from '@/features/electricity-bill-analyzer';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import { getStateRatesSnapshot } from '@/lib/server/get-state-rates';
import {
  createBreadcrumbStructuredData,
  createFaqStructuredData,
  createWebApplicationStructuredData,
  serializeStructuredData,
} from '@/lib/structured-data';

import styles from './page.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'Electricity Bill Analyzer: Compare Usage & Effective Cost',
  description:
    'Compare two electricity bills, normalize usage by billing days, calculate your effective cost per kWh, and isolate usage changes from utility rate increases.',
  path: '/electricity-bill-analyzer',
});

const faqs = [
  {
    question: 'How do I calculate my true all-in cost per kWh?',
    answer:
      'Divide your total monthly bill amount (including all fixed account fees, delivery charges, fuel riders, and local taxes) by the total kilowatt-hours (kWh) consumed during that billing cycle.',
  },
  {
    question: 'Why does billing period length cause sudden bill changes?',
    answer:
      'Utility billing cycles vary from 28 to 35 days depending on weekends and meter routes. A 34-day statement contains 21% more days than a 28-day cycle, raising total energy cost even if your daily consumption stayed identical.',
  },
  {
    question: 'What is the difference between an estimated and actual meter reading?',
    answer:
      'If severe weather or access issues prevent a manual read, utilities estimate consumption based on historical averages. When an actual read occurs later, any previous underestimation is billed as a one-time catch-up charge.',
  },
  {
    question: 'Can fixed customer charges raise my cost per kWh when usage drops?',
    answer:
      'Yes. Fixed customer fees ($5 to $25/month) are charged regardless of usage. When monthly kWh draw drops, fixed charges are spread over fewer units, mathematically increasing your effective cost per kWh.',
  },
];

const relatedLinks: PublicRouteHref[] = [
  '/guides/why-is-my-electric-bill-so-high',
  '/guides/how-to-read-an-electric-bill-line-by-line',
  '/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill',
  '/guides/why-is-my-electric-bill-high-when-usage-is-low',
  '/tools/appliance-energy-cost-calculator',
  '/electricity-rates',
  '/methodology',
  '/data-sources',
];

export default async function ElectricityBillAnalyzerPage() {
  const stateRatesSnapshot = await getStateRatesSnapshot();

  const webAppSchema = createWebApplicationStructuredData({
    name: 'Electricity Bill Analyzer',
    description:
      'Compare two utility statements, normalize usage by calendar days, estimate all-in cost per kWh, and isolate usage drivers from rate increases.',
    path: '/electricity-bill-analyzer',
    applicationCategory: 'UtilityApplication',
  });

  const breadcrumbSchema = createBreadcrumbStructuredData([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Electricity Bill Analyzer', path: '/electricity-bill-analyzer' },
  ]);

  const faqSchema = createFaqStructuredData(faqs);

  return (
    <PageContainer>
      <Breadcrumbs
        items={[{ href: '/' }, { href: '/tools' }, { href: '/electricity-bill-analyzer' }]}
      />

      <PageHeader
        description="Compare two billing periods, understand your effective electricity cost per kWh, and see whether usage or rate changes appear to be driving differences in your utility bill."
        eyebrow="Interactive Energy Tool"
        title="Electricity Bill Analyzer"
      />

      <div className={styles.disclaimerBanner}>
        <p>
          <strong>Informational Notice:</strong> This utility provides estimates from the values you
          enter. Utility taxes, fixed customer charges, tiered usage thresholds, fuel cost
          adjustments, and time-of-use pricing affect your final statement.
        </p>
      </div>

      <CalculatorIsland stateRatesSnapshot={stateRatesSnapshot} />

      {/* Crawlable Explanatory Content */}
      <section className={styles.methodologySection}>
        <h2>How This Calculation Works</h2>
        <p>
          Understanding your electricity statement requires looking past the total dollar amount to
          analyze two core components: <strong>how much electricity you used (kWh)</strong> and{' '}
          <strong>how much you paid per unit of electricity (effective cost per kWh)</strong>.
        </p>

        <div className={styles.formulaGrid}>
          <div className={styles.formulaCard}>
            <h3>1. All-In Effective Cost per kWh</h3>
            <p className={styles.equation}>
              All-In Effective Cost = Total Bill ($) &divide; Total Usage (kWh)
            </p>
            <p>
              This represents your true overall cost per kilowatt-hour, including all line
              items—fixed customer fees, transmission, distribution, environmental surcharges, and
              local taxes.
            </p>
          </div>

          <div className={styles.formulaCard}>
            <h3>2. Billing-Day Normalization</h3>
            <p className={styles.equation}>
              Adjusted Expected Usage = Previous Daily Usage &times; Current Billing Days
            </p>
            <p>
              Utility billing cycles vary from 28 to 35 days. Simply comparing total kWh between two
              months can be misleading if one billing period had 4 more days. Normalizing by
              calendar days ensures fair comparisons.
            </p>
          </div>

          <div className={styles.formulaCard}>
            <h3>3. Usage vs. Rate/Fee Decomposition</h3>
            <p className={styles.equation}>
              Total Bill Change = Usage Effect ($) + Rate/Fee & Other Effect ($)
            </p>
            <p>
              We calculate how much your bill would have changed if your rate stayed constant, and
              attribute the remaining dollar difference to rate adjustments, fee changes, or tax
              variances.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.checklistSection}>
        <h2>What to Inspect on Your Electric Statement</h2>
        <div className={styles.checklistGrid}>
          <div className={styles.checkCard}>
            <h3>Billing Period Dates & Days</h3>
            <p>
              Check the start and end dates of each billing cycle. Extreme cold or hot weather
              during a longer 34-day cycle frequently causes sudden bill increases.
            </p>
          </div>

          <div className={styles.checkCard}>
            <h3>Actual vs. Estimated Readings</h3>
            <p>
              Verify whether your meter reading is marked as &ldquo;Actual&rdquo; or
              &ldquo;Estimated.&rdquo; A series of low estimated bills followed by an actual reading
              can result in a catch-up charge.
            </p>
          </div>

          <div className={styles.checkCard}>
            <h3>Fixed Customer Charges</h3>
            <p>
              Look for recurring monthly base charges, service fees, or meter access charges that do
              not change regardless of how many kWh you consume.
            </p>
          </div>

          <div className={styles.checkCard}>
            <h3>Fuel Adjustments & Riders</h3>
            <p>
              Utilities periodically adjust supply rates via Generation & Fuel Cost Adjustments or
              Power Cost Riders to reflect wholesale energy market price shifts.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className={styles.methodologySection} aria-labelledby="analyzer-faq-heading">
        <h2 id="analyzer-faq-heading">Frequently Asked Questions</h2>
        <div className={styles.checklistGrid}>
          {faqs.map((faq) => (
            <div key={faq.question} className={styles.checkCard}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <DataSourceNote>
        Energy Bill Lab calculations provide informational estimates. Actual utility bills may
        differ because of local taxes, fixed customer charges, fuel riders, tier structures, demand
        fees, and household billing cycle variations.
      </DataSourceNote>

      <section style={{ marginTop: 32, marginBottom: 48 }}>
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
