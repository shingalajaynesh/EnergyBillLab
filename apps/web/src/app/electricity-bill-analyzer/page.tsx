import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { CalculatorIsland } from '@/features/electricity-bill-analyzer';
import { createPageMetadata } from '@/lib/metadata';
import { getStateRatesSnapshot } from '@/lib/server/get-state-rates';

import styles from './page.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'Electricity Bill Analyzer: Compare Usage and Effective Cost',
  description:
    'Compare two electricity bills, normalize usage by billing days, estimate your all-in cost per kWh, and understand what may be driving the change.',
  path: '/electricity-bill-analyzer',
});

export default async function ElectricityBillAnalyzerPage() {
  const stateRatesSnapshot = await getStateRatesSnapshot();

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

      <section className={styles.navigationSection}>
        <h2>Explore More Energy Tools & Research</h2>
        <p>
          Energy Bill Lab provides transparent calculations and source-led research to help you
          understand household energy expenses.
        </p>
        <div className={styles.linkButtons}>
          <Link className={styles.linkButton} href="/tools">
            View All Energy Tools &rarr;
          </Link>
          <Link className={styles.linkButton} href="/methodology">
            Read Calculation Methodology &rarr;
          </Link>
          <Link className={styles.linkButton} href="/editorial-policy">
            Our Editorial Standards &rarr;
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
