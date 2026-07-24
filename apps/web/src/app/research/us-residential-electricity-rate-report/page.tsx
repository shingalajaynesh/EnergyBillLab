import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import { APPROVED_STATE_SLUGS, PUBLISHED_STATES } from '@/config/published-states';
import { DataUnavailablePanel } from '@/features/state-rates/components/state-rate-components';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import { getNationalRateReport } from '@/lib/server/get-national-rate-report';
import type { StatePageViewModel } from '@/lib/server/get-state-page-data';

import styles from './report-page.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'U.S. Residential Electricity-Rate Report',
  description:
    'Comprehensive national data report analyzing U.S. residential electricity rates, state rankings, month-over-month price changes, annual trends, and household energy charge benchmarks.',
  path: '/research/us-residential-electricity-rate-report',
});

export default async function NationalRateReportPage() {
  const report = await getNationalRateReport();

  const breadcrumbs: Array<{ href: PublicRouteHref; label?: string }> = [
    { href: '/', label: 'Home' },
    { href: '/research', label: 'Research' },
    {
      href: '/research/us-residential-electricity-rate-report',
      label: 'U.S. Residential Electricity-Rate Report',
    },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/electricity-rates',
    '/electricity-bill-analyzer',
    '/tools/appliance-energy-cost-calculator',
    '/methodology',
    '/data-sources',
  ];

  // Fallback viewmodel data for DataUnavailablePanel
  const unavailableViewModel: StatePageViewModel = {
    slug: 'national-report',
    config: PUBLISHED_STATES['california']!,
    hasData: false,
    provenance: { status: 'unavailable' },
    latestStateRate: null,
    latestNationalRate: null,
    differenceCents: null,
    percentageDifference: null,
    comparisonDirection: 'unavailable',
    comparisonDirectionText: 'Current rate report benchmarks could not be loaded.',
    isPeriodMatched: false,
    periodMismatchNotice: null,
    householdExamples: [],
    history: [],
    latestSourceMonthFormatted: null,
    dataStatusText:
      'Current national research report data could not be loaded. No estimated or placeholder rate metrics are displayed. You can continue using manual rate entry in our calculators.',
  };

  const citationText = `Energy Bill Lab. "U.S. Residential Electricity-Rate Report." Reporting period: ${
    report.reportingPeriodFormatted || 'Latest EIA Release'
  }. Based on U.S. Energy Information Administration Form EIA-861M Monthly Retail Sales data. Published by Jaynesh Shingala. https://energybilllab.com/research/us-residential-electricity-rate-report`;

  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        eyebrow="National Energy Research Report"
        title="U.S. Residential Electricity-Rate Report"
        description="An original, source-led data report analyzing residential electricity rates across all U.S. states for one common reporting period. Features national benchmarks, state rankings, month-over-month rate movements, annual price shifts, and normalized household energy charge comparisons."
      />

      {!report.available ? (
        <DataUnavailablePanel data={unavailableViewModel} />
      ) : (
        <>
          {/* Executive Summary Grid */}
          <section className={styles.summaryGrid} aria-label="Report Executive Summary">
            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>Common Reporting Period</span>
              <strong className={styles.summaryValue}>
                {report.reportingPeriodFormatted || report.reportingPeriod}
              </strong>
              <small className={styles.summaryNote}>Single period enforced across all states</small>
            </div>

            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>U.S. Residential Average</span>
              <strong className={styles.summaryValue}>
                {report.nationalAverageCentsPerKwh !== null
                  ? `${report.nationalAverageCentsPerKwh.toFixed(2)} ¢/kWh`
                  : 'N/A'}
              </strong>
              <small className={styles.summaryNote}>Weighted national residential baseline</small>
            </div>

            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>Highest vs. Lowest Spread</span>
              <strong className={styles.summaryValue}>
                {report.rateSpreadCents !== null
                  ? `${report.rateSpreadCents.toFixed(2)} ¢/kWh`
                  : 'N/A'}
              </strong>
              <small className={styles.summaryNote}>
                {report.rateSpreadRatio !== null
                  ? `${report.rateSpreadRatio.toFixed(1)}× regional rate ratio`
                  : 'Regional disparity'}
              </small>
            </div>

            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>Database Coverage</span>
              <strong className={styles.summaryValue}>
                {report.statesIncludedCount} U.S. States
              </strong>
              <small className={styles.summaryNote}>
                20 states with published editorial reports
              </small>
            </div>
          </section>

          {/* Key Findings Callout */}
          <section className={styles.sectionCard} aria-labelledby="key-findings-heading">
            <h2 id="key-findings-heading" className={styles.sectionTitle}>
              Key Research Findings
            </h2>
            <ul className={styles.findingsList}>
              <li>
                <strong>Common Reporting Period Integration:</strong> To eliminate period mismatch
                skew, all ranking calculations compare data strictly for the single common EIA
                reporting period of <strong>{report.reportingPeriodFormatted}</strong>.
              </li>
              <li>
                <strong>National Residential Baseline:</strong> The U.S. residential average rate
                for this period stood at{' '}
                <strong>
                  {report.nationalAverageCentsPerKwh !== null
                    ? `${report.nationalAverageCentsPerKwh.toFixed(2)} ¢/kWh`
                    : 'N/A'}
                </strong>
                .
              </li>
              <li>
                <strong>Regional Rate Disparity:</strong> The state with the highest residential
                rate (
                {report.highestRates[0]
                  ? `${report.highestRates[0].name} at ${report.highestRates[0].priceCentsPerKwh.toFixed(
                      2,
                    )} ¢/kWh`
                  : 'N/A'}
                ) was approximately{' '}
                <strong>
                  {report.rateSpreadRatio !== null
                    ? `${report.rateSpreadRatio.toFixed(1)}×`
                    : 'N/A'}
                </strong>{' '}
                higher than the state with the lowest rate (
                {report.lowestRates[0]
                  ? `${report.lowestRates[0].name} at ${report.lowestRates[0].priceCentsPerKwh.toFixed(
                      2,
                    )} ¢/kWh`
                  : 'N/A'}
                ).
              </li>
              <li>
                <strong>Household Cost Sensitivity:</strong> A standard 1,000 kWh monthly energy
                charge ranges from{' '}
                <strong>
                  $
                  {report.householdExamples[2]?.lowestStateCostUsd !== null &&
                  report.householdExamples[2]?.lowestStateCostUsd !== undefined
                    ? report.householdExamples[2].lowestStateCostUsd.toFixed(2)
                    : 'N/A'}
                </strong>{' '}
                in {report.householdExamples[2]?.lowestStateName || 'the lowest-cost state'} to{' '}
                <strong>
                  $
                  {report.householdExamples[2]?.highestStateCostUsd !== null &&
                  report.householdExamples[2]?.highestStateCostUsd !== undefined
                    ? report.householdExamples[2].highestStateCostUsd.toFixed(2)
                    : 'N/A'}
                </strong>{' '}
                in {report.householdExamples[2]?.highestStateName || 'the highest-cost state'}.
              </li>
            </ul>
          </section>

          {/* Highest State Rates Table */}
          <section className={styles.sectionCard} aria-labelledby="highest-rates-heading">
            <h2 id="highest-rates-heading" className={styles.sectionTitle}>
              Highest Residential Electricity Rates by State
            </h2>
            <p className={styles.sectionSubtitle}>
              Top 10 U.S. states with the highest residential electricity rates for period{' '}
              {report.reportingPeriodFormatted}.
            </p>
            <div className={styles.tableWrapper}>
              <table
                className={styles.dataTable}
                aria-label={`Highest residential electricity rates for ${report.reportingPeriodFormatted}`}
              >
                <caption>
                  Top 10 U.S. states with highest residential electricity rates (Form EIA-861M,{' '}
                  {report.reportingPeriodFormatted})
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">State</th>
                    <th scope="col">Residential Rate (¢/kWh)</th>
                    <th scope="col">Reporting Period</th>
                    <th scope="col">Editorial Report</th>
                  </tr>
                </thead>
                <tbody>
                  {report.highestRates.map((item) => (
                    <tr key={item.code}>
                      <td>#{item.rank}</td>
                      <td>
                        <strong>{item.name}</strong> ({item.code})
                      </td>
                      <td className={styles.numericCol}>{item.priceCentsPerKwh.toFixed(2)} ¢</td>
                      <td>{item.periodFormatted}</td>
                      <td>
                        {item.isPublished ? (
                          <Link
                            href={`/electricity-rates/${item.slug}`}
                            className={styles.reportLink}
                          >
                            View {item.name} Report →
                          </Link>
                        ) : (
                          <span className={styles.unpublishedTag}>Data Only</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Lowest State Rates Table */}
          <section className={styles.sectionCard} aria-labelledby="lowest-rates-heading">
            <h2 id="lowest-rates-heading" className={styles.sectionTitle}>
              Lowest Residential Electricity Rates by State
            </h2>
            <p className={styles.sectionSubtitle}>
              Top 10 U.S. states with the lowest residential electricity rates for period{' '}
              {report.reportingPeriodFormatted}.
            </p>
            <div className={styles.tableWrapper}>
              <table
                className={styles.dataTable}
                aria-label={`Lowest residential electricity rates for ${report.reportingPeriodFormatted}`}
              >
                <caption>
                  Top 10 U.S. states with lowest residential electricity rates (Form EIA-861M,{' '}
                  {report.reportingPeriodFormatted})
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">State</th>
                    <th scope="col">Residential Rate (¢/kWh)</th>
                    <th scope="col">Reporting Period</th>
                    <th scope="col">Editorial Report</th>
                  </tr>
                </thead>
                <tbody>
                  {report.lowestRates.map((item) => (
                    <tr key={item.code}>
                      <td>#{item.rank}</td>
                      <td>
                        <strong>{item.name}</strong> ({item.code})
                      </td>
                      <td className={styles.numericCol}>{item.priceCentsPerKwh.toFixed(2)} ¢</td>
                      <td>{item.periodFormatted}</td>
                      <td>
                        {item.isPublished ? (
                          <Link
                            href={`/electricity-rates/${item.slug}`}
                            className={styles.reportLink}
                          >
                            View {item.name} Report →
                          </Link>
                        ) : (
                          <span className={styles.unpublishedTag}>Data Only</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Month-over-Month Rate Changes */}
          <section className={styles.sectionCard} aria-labelledby="monthly-changes-heading">
            <h2 id="monthly-changes-heading" className={styles.sectionTitle}>
              Largest Month-over-Month Rate Movements
            </h2>
            <p className={styles.sectionSubtitle}>
              States experiencing the largest single-month residential rate increases and decreases
              compared to the preceding calendar month.
            </p>

            <div className={styles.twoColumnGrid}>
              <div className={styles.columnBlock}>
                <h3 className={styles.columnTitle}>Largest Monthly Increases</h3>
                <div className={styles.tableWrapper}>
                  <table className={styles.miniTable} aria-label="Largest monthly rate increases">
                    <caption>Largest monthly rate increases (Form EIA-861M)</caption>
                    <thead>
                      <tr>
                        <th scope="col">State</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Change (¢)</th>
                        <th scope="col">Change (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.largestMonthlyIncreases.map((item) => (
                        <tr key={item.code}>
                          <td>
                            {item.isPublished ? (
                              <Link href={`/electricity-rates/${item.slug}`}>{item.name}</Link>
                            ) : (
                              item.name
                            )}
                          </td>
                          <td className={styles.numericCol}>{item.currentRateCents.toFixed(2)}¢</td>
                          <td className={styles.increaseCol}>+{item.changeCents.toFixed(2)}¢</td>
                          <td className={styles.increaseCol}>+{item.changePercent.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={styles.columnBlock}>
                <h3 className={styles.columnTitle}>Largest Monthly Decreases</h3>
                <div className={styles.tableWrapper}>
                  <table className={styles.miniTable} aria-label="Largest monthly rate decreases">
                    <caption>Largest monthly rate decreases (Form EIA-861M)</caption>
                    <thead>
                      <tr>
                        <th scope="col">State</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Change (¢)</th>
                        <th scope="col">Change (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.largestMonthlyDecreases.map((item) => (
                        <tr key={item.code}>
                          <td>
                            {item.isPublished ? (
                              <Link href={`/electricity-rates/${item.slug}`}>{item.name}</Link>
                            ) : (
                              item.name
                            )}
                          </td>
                          <td className={styles.numericCol}>{item.currentRateCents.toFixed(2)}¢</td>
                          <td className={styles.decreaseCol}>{item.changeCents.toFixed(2)}¢</td>
                          <td className={styles.decreaseCol}>{item.changePercent.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Year-over-Year Rate Changes */}
          <section className={styles.sectionCard} aria-labelledby="annual-changes-heading">
            <h2 id="annual-changes-heading" className={styles.sectionTitle}>
              Largest 12-Month Annual Rate Movements
            </h2>
            <p className={styles.sectionSubtitle}>
              States with the highest year-over-year rate shifts compared to the exact same calendar
              month one year earlier.
            </p>

            <div className={styles.twoColumnGrid}>
              <div className={styles.columnBlock}>
                <h3 className={styles.columnTitle}>Largest Annual Increases</h3>
                <div className={styles.tableWrapper}>
                  <table className={styles.miniTable} aria-label="Largest annual rate increases">
                    <caption>Largest 12-month annual rate increases (Form EIA-861M)</caption>
                    <thead>
                      <tr>
                        <th scope="col">State</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Change (¢)</th>
                        <th scope="col">Change (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.largestAnnualIncreases.map((item) => (
                        <tr key={item.code}>
                          <td>
                            {item.isPublished ? (
                              <Link href={`/electricity-rates/${item.slug}`}>{item.name}</Link>
                            ) : (
                              item.name
                            )}
                          </td>
                          <td className={styles.numericCol}>{item.currentRateCents.toFixed(2)}¢</td>
                          <td className={styles.increaseCol}>+{item.changeCents.toFixed(2)}¢</td>
                          <td className={styles.increaseCol}>+{item.changePercent.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={styles.columnBlock}>
                <h3 className={styles.columnTitle}>Largest Annual Decreases</h3>
                <div className={styles.tableWrapper}>
                  <table className={styles.miniTable} aria-label="Largest annual rate decreases">
                    <caption>Largest 12-month annual rate decreases (Form EIA-861M)</caption>
                    <thead>
                      <tr>
                        <th scope="col">State</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Change (¢)</th>
                        <th scope="col">Change (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.largestAnnualDecreases.map((item) => (
                        <tr key={item.code}>
                          <td>
                            {item.isPublished ? (
                              <Link href={`/electricity-rates/${item.slug}`}>{item.name}</Link>
                            ) : (
                              item.name
                            )}
                          </td>
                          <td className={styles.numericCol}>{item.currentRateCents.toFixed(2)}¢</td>
                          <td className={styles.decreaseCol}>{item.changeCents.toFixed(2)}¢</td>
                          <td className={styles.decreaseCol}>{item.changePercent.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Normalized Household Energy Charge Table */}
          <section className={styles.sectionCard} aria-labelledby="household-comparison-heading">
            <h2 id="household-comparison-heading" className={styles.sectionTitle}>
              Normalized Household Energy Charge Benchmarks
            </h2>
            <p className={styles.sectionSubtitle}>
              Monthly energy-only cost estimates calculated at standard consumption levels (kWh ×
              rate in cents ÷ 100).
            </p>
            <div className={styles.disclaimerCallout}>
              <strong>Important Consumer Disclaimer:</strong> These figures represent normalized
              energy-only charges. Actual monthly electric bills include fixed customer account
              fees, local transmission tariffs, time-of-use (TOU) rates, and municipal taxes.
            </div>

            <div className={styles.tableWrapper}>
              <table
                className={styles.dataTable}
                aria-label="Normalized household monthly energy cost comparison"
              >
                <caption>
                  Household monthly energy cost comparisons by usage level (Form EIA-861M,{' '}
                  {report.reportingPeriodFormatted})
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Monthly Usage</th>
                    <th scope="col">National Avg Cost</th>
                    <th scope="col">Lowest State Cost</th>
                    <th scope="col">Highest State Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {report.householdExamples.map((ex) => (
                    <tr key={ex.kwh}>
                      <td>
                        <strong>{ex.label}</strong>
                      </td>
                      <td className={styles.numericCol}>
                        {ex.nationalCostUsd !== null ? `$${ex.nationalCostUsd.toFixed(2)}` : 'N/A'}
                      </td>
                      <td>
                        {ex.lowestStateCostUsd !== null
                          ? `$${ex.lowestStateCostUsd.toFixed(2)} (${ex.lowestStateName})`
                          : 'N/A'}
                      </td>
                      <td>
                        {ex.highestStateCostUsd !== null
                          ? `$${ex.highestStateCostUsd.toFixed(2)} (${ex.highestStateName})`
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Published State Reports Links */}
          <section className={styles.sectionCard} aria-labelledby="published-reports-heading">
            <h2 id="published-reports-heading" className={styles.sectionTitle}>
              Published State Rate Reports ({APPROVED_STATE_SLUGS.length} Published States)
            </h2>
            <p className={styles.sectionSubtitle}>
              Explore our full 24-month historical trend analysis and market driver reports for
              editorially published states:
            </p>
            <div className={styles.publishedGrid}>
              {APPROVED_STATE_SLUGS.map((slug) => {
                const conf = PUBLISHED_STATES[slug];
                if (!conf) return null;
                return (
                  <Link
                    key={slug}
                    href={`/electricity-rates/${slug}`}
                    className={styles.publishedStateCard}
                  >
                    <span className={styles.publishedStateName}>{conf.name}</span>
                    <span className={styles.publishedStateCode}>{conf.code}</span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Methodology & Data Disclosures */}
          <section className={styles.sectionCard} aria-labelledby="methodology-heading">
            <h2 id="methodology-heading" className={styles.sectionTitle}>
              Data Sourcing, Methodology & Exclusions
            </h2>
            <div className={styles.prose}>
              <h3>Data Source & Sourcing Standard</h3>
              <p>
                All rate figures are derived from Form EIA-861M Monthly Retail Sales of Electricity
                reports published by the U.S. Energy Information Administration (EIA). The average
                residential rate is calculated by dividing total residential revenue (in U.S.
                dollars) by total residential energy sales (in kilowatt-hours) for each state.
              </p>

              <h3>Common Period Principle</h3>
              <p>
                To avoid skew caused by asynchronous state data updates, this report evaluates all
                rankings using a single common reporting period (
                <strong>{report.reportingPeriodFormatted}</strong>). If a state record is missing
                for that specific period, it is disclosed under excluded states and omitted from
                rankings rather than replaced with an older value.
              </p>

              {report.statesExcluded.length > 0 ? (
                <>
                  <h3>Excluded States ({report.statesExcluded.length})</h3>
                  <ul>
                    {report.statesExcluded.map((ex) => (
                      <li key={ex.code}>
                        <strong>
                          {ex.name} ({ex.code}):
                        </strong>{' '}
                        {ex.reason}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </section>

          {/* Citation & Data Reuse Block */}
          <section className={styles.citationCard} aria-labelledby="citation-heading">
            <h2 id="citation-heading" className={styles.citationTitle}>
              Citation & Data Reuse Guidance
            </h2>
            <p className={styles.citationSubtitle}>
              Journalists, researchers, university faculties, and educational resource pages are
              welcome to cite or quote this report with proper attribution.
            </p>

            <div className={styles.citationBox}>
              <code>{citationText}</code>
            </div>

            <div className={styles.exportRow}>
              <a
                href="/research/us-residential-electricity-rate-report/csv"
                className={styles.downloadBtn}
                download="us-residential-electricity-rate-report.csv"
              >
                Download Report Summary (CSV) ↓
              </a>
            </div>
          </section>

          {/* Publisher Identity Block */}
          <section className={styles.publisherCard} aria-labelledby="publisher-heading">
            <h2 id="publisher-heading" className={styles.publisherTitle}>
              About the Publisher
            </h2>
            <p className={styles.publisherText}>
              This report is researched, built, and technically published by Jaynesh Shingala,
              Founder & Technical Publisher of Energy Bill Lab (Surat, Gujarat, India). Jaynesh is a
              Full-Stack Software Engineer specializing in deterministic energy data tools and
              transparent public calculators.
            </p>
            <p className={styles.publisherContact}>
              For custom data extracts, media inquiries, or technical methodology questions,
              contact:
              <a href="mailto:shingala.jaynesh@gmail.com">shingala.jaynesh@gmail.com</a>
            </p>
          </section>

          {/* Official Footnote */}
          <DataSourceNote>
            Report findings are based on U.S. EIA Form EIA-861M retail energy sales reports. For
            further calculation details, review our{' '}
            <Link href="/methodology">Methodology page</Link> or{' '}
            <Link href="/data-sources">Data Sources overview</Link>.
          </DataSourceNote>
        </>
      )}

      <section style={{ marginTop: 32, marginBottom: 64 }}>
        <RelatedLinks links={relatedLinks} />
      </section>
    </PageContainer>
  );
}
