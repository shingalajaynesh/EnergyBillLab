import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import { APPROVED_STATE_SLUGS, FIRST_TEN_STATES } from '@/config/first-ten-states';
import {
  CalculatorCtaBox,
  DataUnavailablePanel,
  NationalRateSummary,
  StateRateCard,
} from '@/features/state-rates/components/state-rate-components';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import { formatSourcePeriod, type StatePageViewModel } from '@/lib/server/get-state-page-data';
import { getStateRatesSnapshot } from '@/lib/server/get-state-rates';

import styles from './rates-hub.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'U.S. Residential Electricity Rates by State',
  description:
    'Compare residential electricity rate benchmarks across U.S. states with verified EIA data, national benchmarks, monthly cost examples, and transparent methodology.',
  path: '/electricity-rates',
});

export default async function ElectricityRatesPage() {
  const snapshot = await getStateRatesSnapshot();
  const isAvailable = snapshot.available && snapshot.provenance.status !== 'unavailable';
  const nationalRateDto = snapshot.rates['US'];
  const nationalRateValue =
    isAvailable && nationalRateDto ? nationalRateDto.priceCentsPerKwh : null;
  const nationalPeriodFormatted =
    isAvailable && nationalRateDto ? formatSourcePeriod(nationalRateDto.period) : null;

  const breadcrumbs: Array<{ href: PublicRouteHref; label?: string }> = [
    { href: '/', label: 'Home' },
    { href: '/electricity-rates', label: 'Electricity Rates' },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/electricity-bill-analyzer',
    '/tools/appliance-energy-cost-calculator',
    '/tools/ac-cost-calculator',
    '/methodology',
  ];

  // Fallback viewmodel data for DataUnavailablePanel on hub page
  const hubUnavailableData: StatePageViewModel = {
    slug: 'hub',
    config: FIRST_TEN_STATES['california']!,
    hasData: false,
    provenance: { status: 'unavailable' },
    latestStateRate: null,
    latestNationalRate: null,
    differenceCents: null,
    percentageDifference: null,
    comparisonDirection: 'unavailable',
    comparisonDirectionText: 'Current rate benchmarks could not be loaded.',
    isPeriodMatched: false,
    periodMismatchNotice: null,
    householdExamples: [],
    history: [],
    latestSourceMonthFormatted: null,
    dataStatusText:
      'Current state-rate data could not be loaded. No estimated or placeholder rate is being displayed. You can continue using manual rate entry in our calculators.',
  };

  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        eyebrow="Independent Energy Benchmarks"
        title="U.S. Residential Electricity Rates by State"
        description="Residential electricity rates vary across U.S. states due to generation fuel mix, environmental regulations, grid infrastructure investments, and local weather patterns. Energy Bill Lab uses Form EIA-861M monthly retail sales data to provide verified rate benchmarks for home energy analysis."
      />

      {!isAvailable ? <DataUnavailablePanel data={hubUnavailableData} /> : null}

      {/* National Benchmark Card */}
      <NationalRateSummary
        nationalRate={nationalRateValue}
        periodFormatted={nationalPeriodFormatted}
        provenanceStatus={snapshot.provenance.status}
      />

      {/* Published State Pages Grid */}
      <section className={styles.section} aria-labelledby="published-states-heading">
        <h2 id="published-states-heading" className={styles.sectionTitle}>
          Published State Electricity Rate Reports
        </h2>
        <p className={styles.sectionSubtitle}>
          Select a state below to view detailed residential electricity rates, 24-month historical
          trend data, monthly household energy charges, and state-specific market drivers.
        </p>

        <div className={styles.statesGrid}>
          {APPROVED_STATE_SLUGS.map((slug) => {
            const config = FIRST_TEN_STATES[slug];
            if (!config) return null;
            const rateDto = snapshot.rates[config.code];
            const latestRateCents = isAvailable && rateDto ? rateDto.priceCentsPerKwh : null;
            const periodFormatted =
              isAvailable && rateDto ? formatSourcePeriod(rateDto.period) : null;

            return (
              <StateRateCard
                key={slug}
                config={config}
                latestRateCents={latestRateCents}
                periodFormatted={periodFormatted}
              />
            );
          })}
        </div>

        <p className={styles.noticeText}>
          * Note: Additional U.S. state pages will be published in subsequent releases following EIA
          dataset validation and state-level editorial review.
        </p>
      </section>

      {/* Methodology & Consumer Context */}
      <section className={styles.section} aria-labelledby="methodology-heading">
        <h2 id="methodology-heading" className={styles.sectionTitle}>
          Understanding Statewide Average Electricity Rates
        </h2>
        <p className={styles.paragraph}>
          Statewide average residential rates published by the U.S. Energy Information
          Administration (EIA) are calculated by dividing total monthly residential revenue by total
          kilowatt-hours (kWh) delivered to residential customers within each state.
        </p>
        <div className={styles.disclaimerCallout}>
          <strong>Important Consumer Disclaimer:</strong> A statewide average rate is a statistical
          benchmark, not an individual utility tariff. Your actual electric bill from your local
          electric utility or retail energy supplier will include fixed customer account fees,
          transmission and distribution tariffs, time-of-use (TOU) rates, and local taxes.
        </div>
        <DataSourceNote>
          State rates are sourced from official U.S. EIA Form EIA-861M Monthly Retail Sales
          datasets. For details on how rates are compiled, review our{' '}
          <Link href="/data-sources">data sources and methodology page</Link>.
        </DataSourceNote>
      </section>

      {/* Tools & Next Steps CTA */}
      <CalculatorCtaBox stateName="U.S." />

      {/* Related Internal Navigation */}
      <section style={{ marginTop: 32, marginBottom: 64 }}>
        <RelatedLinks links={relatedLinks} />
      </section>
    </PageContainer>
  );
}
