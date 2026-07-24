import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import { getNationalRateReport } from '@/lib/server/get-national-rate-report';

import styles from './research-hub.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'U.S. Residential Electricity Research & Data Reports',
  description:
    'Original, source-led research reports analyzing U.S. residential electricity rates, regional price trends, and household energy cost benchmarks.',
  path: '/research',
});

export default async function ResearchHubPage() {
  const report = await getNationalRateReport();

  const breadcrumbs: Array<{ href: PublicRouteHref; label?: string }> = [
    { href: '/', label: 'Home' },
    { href: '/research', label: 'Research' },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/electricity-rates',
    '/electricity-bill-analyzer',
    '/tools/appliance-energy-cost-calculator',
    '/methodology',
    '/data-sources',
  ];

  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        eyebrow="Data Journalism & Analysis"
        title="U.S. Residential Energy Research Reports"
        description="Energy Bill Lab publishes original, source-led data reports analyzing U.S. residential electricity rates, regional cost disparities, and seasonal price trends. All findings are derived from official U.S. Energy Information Administration (EIA) datasets."
      />

      <section className={styles.sectionCard} aria-labelledby="featured-report-heading">
        <div className={styles.reportBadge}>Featured National Report</div>
        <h2 id="featured-report-heading" className={styles.reportTitle}>
          <Link href="/research/us-residential-electricity-rate-report">
            U.S. Residential Electricity-Rate Report
          </Link>
        </h2>
        <p className={styles.reportDescription}>
          Comprehensive national analysis comparing residential electricity rates across all 50 U.S.
          states for one common EIA reporting period (
          {report.reportingPeriodFormatted || 'Latest EIA Release'}). Includes highest and lowest
          state rankings, month-over-month rate shifts, and normalized household energy charge
          benchmarks.
        </p>

        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Reporting Period</span>
            <span className={styles.metaValue}>
              {report.reportingPeriodFormatted || 'Data Snapshot'}
            </span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>National Average</span>
            <span className={styles.metaValue}>
              {report.nationalAverageCentsPerKwh !== null
                ? `${report.nationalAverageCentsPerKwh.toFixed(2)} ¢/kWh`
                : 'Benchmark Available'}
            </span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>States Analyzed</span>
            <span className={styles.metaValue}>
              {report.statesIncludedCount > 0
                ? `${report.statesIncludedCount} States`
                : '50 States'}
            </span>
          </div>
        </div>

        <div className={styles.actionRow}>
          <Link
            href="/research/us-residential-electricity-rate-report"
            className={styles.primaryCta}
          >
            Read Full National Report →
          </Link>
        </div>
      </section>

      {/* Publisher Identity Block */}
      <section className={styles.publisherCard} aria-labelledby="publisher-heading">
        <h2 id="publisher-heading" className={styles.publisherTitle}>
          About Energy Bill Lab Research
        </h2>
        <p className={styles.publisherText}>
          Energy Bill Lab research reports are founded and technically published by Jaynesh
          Shingala, a Full-Stack Software Engineer based in Surat, Gujarat, India. Our goal is to
          provide non-commercial, source-transparent data tools and data journalism for U.S.
          homeowners, researchers, and journalists.
        </p>
        <p className={styles.publisherContact}>
          Direct research inquiries or data clarification requests to:{' '}
          <a href="mailto:shingala.jaynesh@gmail.com">shingala.jaynesh@gmail.com</a>
        </p>
      </section>

      <section style={{ marginTop: 32, marginBottom: 64 }}>
        <RelatedLinks links={relatedLinks} />
      </section>
    </PageContainer>
  );
}
