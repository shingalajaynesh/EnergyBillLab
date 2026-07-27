import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import {
  APPROVED_STATE_SLUGS,
  isApprovedStateSlug,
  PUBLISHED_STATES,
} from '@/config/published-states';
import {
  CalculatorCtaBox,
  DataUnavailablePanel,
  HouseholdCostExamplesTable,
  RateHistoryTable,
  RateSummaryGrid,
  StateDriverGrid,
} from '@/features/state-rates/components/state-rate-components';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import { getStatePageData } from '@/lib/server/get-state-page-data';

import styles from './state-page.module.css';

type Props = {
  params: Promise<{ state: string }>;
};

export function generateStaticParams() {
  return APPROVED_STATE_SLUGS.map((slug) => ({
    state: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params;
  const normalizedSlug = state.toLowerCase();
  if (!isApprovedStateSlug(normalizedSlug)) {
    return {};
  }

  const config = PUBLISHED_STATES[normalizedSlug];
  if (!config) return {};

  return createPageMetadata({
    title: config.metaTitle,
    description: config.metaDescription,
    path: `/electricity-rates/${config.slug}`,
  });
}

export default async function StateElectricityRatePage({ params }: Props) {
  const { state } = await params;
  const normalizedSlug = state.toLowerCase();

  if (!isApprovedStateSlug(normalizedSlug)) {
    notFound();
  }

  const pageData = await getStatePageData(normalizedSlug);

  if (!pageData) {
    notFound();
  }

  const { config, hasData, isPeriodMatched, periodMismatchNotice } = pageData;

  const breadcrumbs: Array<{ href: PublicRouteHref; label?: string }> = [
    { href: '/', label: 'Home' },
    { href: '/electricity-rates', label: 'Electricity Rates' },
    { href: `/electricity-rates/${config.slug}` as PublicRouteHref, label: config.name },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/electricity-rates',
    '/research/us-residential-electricity-rate-report',
    '/electricity-bill-analyzer',
    '/tools/appliance-energy-cost-calculator',
    '/tools/ac-cost-calculator',
    '/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill',
    '/guides/how-to-read-an-electric-bill-line-by-line',
    '/methodology',
    '/data-sources',
  ];

  const approvedRelatedSlugs = config.relatedStateSlugs.filter((s) => isApprovedStateSlug(s));

  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        eyebrow="Residential Rate Report"
        title={`${config.name} Residential Electricity Rates`}
        description={config.overview}
      />

      {hasData ? (
        <>
          <RateSummaryGrid data={pageData} />

          {!isPeriodMatched && periodMismatchNotice ? (
            <div className={styles.mismatchNotice} role="status">
              {periodMismatchNotice}
            </div>
          ) : null}

          <HouseholdCostExamplesTable data={pageData} />

          <RateHistoryTable data={pageData} />
        </>
      ) : (
        <DataUnavailablePanel data={pageData} />
      )}

      {/* State Market Drivers Grid */}
      <StateDriverGrid config={config} />

      {/* Educational & Rate Guide Contextual Section */}
      <section className={styles.sectionCard} aria-labelledby="rate-guides-heading">
        <h2 id="rate-guides-heading" className={styles.sectionTitle}>
          Understand & Lower Your {config.name} Electricity Bill
        </h2>
        <p className={styles.sectionIntro}>
          Compare {config.name}&apos;s average residential electricity rate against national
          benchmarks, calculate your true effective cost per kWh, and analyze statement charges:
        </p>
        <ul className={styles.factorsList}>
          <li>
            <Link
              href="/research/us-residential-electricity-rate-report"
              style={{ fontWeight: 600, color: '#1677ff' }}
            >
              U.S. National Electricity-Rate Benchmark Report
            </Link>
            : Compare {config.name}&apos;s rate ranking and price movements against all 50 U.S.
            states.
          </li>
          <li>
            <Link
              href="/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill"
              style={{ fontWeight: 600, color: '#1677ff' }}
            >
              How to Calculate Your Effective Cost per kWh
            </Link>
            : Step-by-step formula for calculating your true all-in electricity rate from monthly
            statement dollars.
          </li>
          <li>
            <Link
              href="/guides/how-to-read-an-electric-bill-line-by-line"
              style={{ fontWeight: 600, color: '#1677ff' }}
            >
              How to Read Your Electric Bill Line by Line
            </Link>
            : Understand supply charges, delivery tariffs, customer fees, and seasonal riders.
          </li>
        </ul>
      </section>

      {/* Why Bills Differ Section */}
      <section className={styles.sectionCard} aria-labelledby="bill-variance-heading">
        <h2 id="bill-variance-heading" className={styles.sectionTitle}>
          Why Your Individual Electric Bill May Differ
        </h2>
        <p className={styles.sectionIntro}>
          Statewide average rates compiled by the U.S. EIA reflect overall residential revenue
          divided by total sales. Your actual monthly electricity bill in {config.name} will vary
          based on:
        </p>
        <ul className={styles.factorsList}>
          <li>
            <strong>Fixed Monthly Customer Charges:</strong> Basic meter account service fees
            assessed regardless of kWh consumption.
          </li>
          <li>
            <strong>Delivery & Distribution Tariffs:</strong> Regulated transmission charges set by
            state utility commissions.
          </li>
          <li>
            <strong>Time-of-Use (TOU) Pricing:</strong> Higher peak-period demand rates during hot
            afternoon or winter evening hours.
          </li>
          <li>
            <strong>Local Taxes & Clean Energy Riders:</strong> Municipal taxes and clean energy
            fund surcharges.
          </li>
        </ul>
      </section>

      {/* Calculator CTA Box */}
      <CalculatorCtaBox stateName={config.name} />

      {/* Compare Other Approved States */}
      {approvedRelatedSlugs.length > 0 ? (
        <section className={styles.sectionCard} aria-labelledby="related-states-heading">
          <h2 id="related-states-heading" className={styles.sectionTitle}>
            Compare Electricity Rates in Neighboring & Related States
          </h2>
          <div className={styles.relatedGrid}>
            {approvedRelatedSlugs.map((relSlug) => {
              const relConfig = PUBLISHED_STATES[relSlug];
              if (!relConfig) return null;
              return (
                <Link
                  key={relSlug}
                  href={`/electricity-rates/${relSlug}`}
                  className={styles.relatedStateLink}
                >
                  <span>{relConfig.name}</span>
                  <small>{relConfig.marketType}</small>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* Official Data Sources & Methodology */}
      <section className={styles.sourcesSection} aria-labelledby="sources-heading">
        <h2 id="sources-heading" className={styles.sectionTitle}>
          Official Data Sources & Editorial Citations
        </h2>
        <ul className={styles.sourcesList}>
          {config.sources.map((src) => (
            <li key={src.url}>
              <a href={src.url} target="_blank" rel="noopener noreferrer">
                {src.name}
              </a>
            </li>
          ))}
          <li>
            <Link href="/data-sources">Energy Bill Lab Data Sources Documentation</Link>
          </li>
          <li>
            <Link href="/methodology">Calculation Engine Methodology</Link>
          </li>
        </ul>
        <DataSourceNote>
          State residential rates are updated monthly following official U.S. EIA release schedules.
          For complete calculation details, review our methodology page.
        </DataSourceNote>
      </section>

      {/* Related Internal Navigation */}
      <section style={{ marginTop: 32, marginBottom: 64 }}>
        <RelatedLinks links={relatedLinks} />
      </section>
    </PageContainer>
  );
}
