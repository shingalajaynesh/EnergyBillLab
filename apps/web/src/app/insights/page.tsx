import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import {
  getPublishedInsights,
  INSIGHT_CATEGORIES,
  isInsightsHubEligible,
} from '@/content/insights';
import { createPageMetadata } from '@/lib/metadata';
import {
  createBreadcrumbStructuredData,
  createOrganizationStructuredData,
  createWebsiteStructuredData,
  serializeStructuredData,
} from '@/lib/structured-data';

import styles from './insights-hub.module.css';

const HUB_TITLE = 'Energy Insights';
const HUB_DESCRIPTION =
  'Data-driven analysis of U.S. electricity rates, household energy costs, appliances, natural gas, solar and battery storage.';

export function generateMetadata(): Metadata {
  const baseMeta = createPageMetadata({
    title: HUB_TITLE,
    description: HUB_DESCRIPTION,
    path: '/insights',
  });

  const isEligible = isInsightsHubEligible();

  return {
    ...baseMeta,
    robots: isEligible ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default function InsightsHubPage() {
  const published = getPublishedInsights();
  const breadcrumbItems = [
    { href: '/' as const, label: 'Home' },
    { href: '/insights' as const, label: 'Insights' },
  ];

  const websiteSchema = createWebsiteStructuredData();
  const orgSchema = createOrganizationStructuredData();
  const breadcrumbSchema = createBreadcrumbStructuredData([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(breadcrumbSchema) }}
      />

      <PageContainer>
        <Breadcrumbs items={breadcrumbItems} />
        <PageHeader
          eyebrow="Data Analysis & Energy Reports"
          title={HUB_TITLE}
          description={HUB_DESCRIPTION}
        />

        <div className={styles.container}>
          {published.length === 0 ? (
            <section className={styles.emptyStateCard} aria-labelledby="empty-insights-title">
              <span className={styles.emptyStateBadge}>Publishing System Active</span>
              <h2 id="empty-insights-title" className={styles.emptyStateHeading}>
                Energy Insights & Governance Infrastructure
              </h2>
              <p className={styles.emptyStateText}>
                Data-driven analysis of U.S. residential electricity rates, natural gas price
                shifts, appliance energy costs, solar generation trends, and home battery storage.
                All future Insights undergo strict intent-conflict, source verification, and
                calculation checks before publication.
              </p>
              <div className={styles.emptyStateStatus}>
                Editorial governance active • 0 published articles • Page non-indexable until
                publication threshold met.
              </div>
              <div className={styles.emptyStateLinks}>
                <Link
                  className={styles.emptyStateLink}
                  href="/research/us-residential-electricity-rate-report"
                >
                  U.S. Electricity Rate Report
                </Link>
                <Link className={styles.emptyStateLink} href="/data-sources">
                  Official Data Sources
                </Link>
                <Link className={styles.emptyStateLink} href="/methodology">
                  Calculation Methodology
                </Link>
              </div>
            </section>
          ) : (
            <section className={styles.grid} aria-label="Published Energy Insights">
              {published.map((article) => (
                <article key={article.id} className={styles.articleCard}>
                  <span className={styles.cardCategory}>
                    {INSIGHT_CATEGORIES[article.category]?.name || article.category}
                  </span>
                  <Link className={styles.cardTitle} href={`/insights/${article.slug}`}>
                    {article.title}
                  </Link>
                  <p className={styles.cardSummary}>{article.summary}</p>
                  <div className={styles.cardMeta}>
                    <span>Published: {article.publishedAt}</span>
                    {article.reportingPeriod ? (
                      <span> • Period: {article.reportingPeriod}</span>
                    ) : null}
                  </div>
                </article>
              ))}
            </section>
          )}

          <section className={styles.trustSection} aria-labelledby="trust-links-heading">
            <h3 id="trust-links-heading" className={styles.trustHeading}>
              Data Sources & Publishing Standards
            </h3>
            <div className={styles.trustGrid}>
              <Link className={styles.trustCard} href="/data-sources">
                Data Sources & EIA Snapshots
              </Link>
              <Link className={styles.trustCard} href="/methodology">
                Calculation Methodology
              </Link>
              <Link className={styles.trustCard} href="/editorial-policy">
                Editorial & Corrections Policy
              </Link>
              <Link
                className={styles.trustCard}
                href="/research/us-residential-electricity-rate-report"
              >
                U.S. Rate Benchmarks
              </Link>
            </div>
          </section>
        </div>
      </PageContainer>
    </>
  );
}
