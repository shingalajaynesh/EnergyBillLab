import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import { getNaturalGasHubData } from '@/lib/server/get-natural-gas-data';
import {
  createOrganizationStructuredData,
  createWebsiteStructuredData,
  serializeStructuredData,
} from '@/lib/structured-data';

import styles from './natural-gas-hub.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getNaturalGasHubData();

  const baseMeta = createPageMetadata({
    title: 'U.S. Residential Natural Gas Prices and Historical Trends',
    description:
      'Official EIA residential natural gas prices in $/Mcf and estimated $/therm, historical monthly data from June 2024 to April 2026, state data availability, and household cost calculators.',
    path: '/natural-gas-rates',
  });

  return {
    ...baseMeta,
    robots: data.hasData ? { index: true, follow: true } : { index: false, follow: true },
  };
}

function formatChange(val: number | null, percent: number | null): string {
  if (val === null || percent === null) return '—';
  const prefix = val > 0 ? '+' : '';
  return `${prefix}$${val.toFixed(2)} (${prefix}${percent.toFixed(2)}%)`;
}

export default async function NaturalGasRatesPage() {
  const data = await getNaturalGasHubData();

  const breadcrumbItems = [
    { href: '/' as const, label: 'Home' },
    { href: '/natural-gas-rates' as const, label: 'Natural Gas Rates' },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/electricity-rates',
    '/tools/appliance-energy-cost-calculator',
    '/tools/space-heater-cost-calculator',
    '/methodology',
    '/data-sources',
  ];

  const websiteSchema = createWebsiteStructuredData();
  const orgSchema = createOrganizationStructuredData();

  const latestMonthText = data.latestSourceMonthFormatted
    ? `Data through ${data.latestSourceMonthFormatted}`
    : 'Data through April 2026';

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

      <PageContainer>
        <Breadcrumbs items={breadcrumbItems} />

        <PageHeader
          eyebrow="U.S. Household Energy Research"
          title="U.S. Residential Natural Gas Prices and Historical Trends"
          description="Data-driven analysis of U.S. residential natural gas retail prices, Mcf to therm conversion standards, historical monthly trends from June 2024 to April 2026, and household cost calculators based on official U.S. Energy Information Administration (EIA) data."
        />

        <div className={styles.container}>
          {/* Rate Summary Cards */}
          <section className={styles.summaryGrid} aria-label="Natural Gas Price Summary">
            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>Reporting Period</span>
              <strong className={styles.summaryValue}>{latestMonthText}</strong>
              <small className={styles.summaryNote}>
                {data.hasData
                  ? 'Latest available EIA residential natural-gas price'
                  : 'Synchronization active'}
              </small>
            </div>

            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>U.S. Residential Price ($/Mcf)</span>
              <strong className={styles.summaryValue}>
                {data.latestNationalRate
                  ? `$${data.latestNationalRate.priceDollarsPerMcf.toFixed(2)} / Mcf`
                  : 'N/A'}
              </strong>
              <small className={styles.summaryNote}>Source unit: 1 Mcf = 1,000 cubic feet</small>
            </div>

            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>Estimated Price ($/Therm)</span>
              <strong className={styles.summaryValue}>
                {data.latestNationalRate
                  ? `$${data.latestNationalRate.priceDollarsPerTherm.toFixed(2)} / therm`
                  : 'N/A'}
              </strong>
              <small className={styles.summaryNote}>
                Estimated therm equivalent using the EIA U.S. average heat-content conversion of
                1,036 Btu per cubic foot.
              </small>
            </div>
          </section>

          {/* Natural Gas Calculators Callout */}
          <section className={styles.sectionCard} aria-labelledby="calculators-heading">
            <h2 id="calculators-heading" className={styles.sectionTitle}>
              Natural Gas Household Cost Tools
            </h2>
            <p className={styles.sectionSubtitle}>
              Estimate your monthly natural gas bill or calculate active heating costs for a gas
              furnace with our transparent browser tools:
            </p>
            <div className={styles.toolsGrid}>
              <Link className={styles.toolCard} href="/tools/natural-gas-bill-calculator">
                <span className={styles.toolCardTitle}>Natural Gas Bill Calculator →</span>
                <span className={styles.toolCardText}>
                  Calculate monthly natural gas spending from therms or Mcf usage, fixed account
                  fees, and local rider charges.
                </span>
              </Link>
              <Link className={styles.toolCard} href="/tools/gas-furnace-cost-calculator">
                <span className={styles.toolCardTitle}>Gas Furnace Cost Calculator →</span>
                <span className={styles.toolCardText}>
                  Estimate gas furnace operating costs based on input Btu/hr, AFUE seasonal
                  efficiency, runtime hours, and therm pricing.
                </span>
              </Link>
            </div>
          </section>

          {/* Data Explanation & Disclaimers */}
          <section className={styles.sectionCard} aria-labelledby="understanding-heading">
            <h2 id="understanding-heading" className={styles.sectionTitle}>
              Understanding Residential Natural Gas Pricing
            </h2>
            <div className={styles.prose}>
              <p>
                Natural gas retail prices published by the U.S. Energy Information Administration
                (EIA) represent total revenue derived from residential natural gas sales divided by
                total volume delivered. They provide an authoritative benchmark for regional gas
                cost movements, but differ from individual customer utility tariff quotes.
              </p>
              <h3>Components of a Residential Natural Gas Bill</h3>
              <ul>
                <li>
                  <strong>Commodity Supply Charge:</strong> The wholesale cost of natural gas
                  purchased by your local utility or retail energy supplier.
                </li>
                <li>
                  <strong>Local Distribution Tariff:</strong> Charges billed by the local natural
                  gas utility to operate, maintain, and deliver gas through underground pipelines to
                  your meter.
                </li>
                <li>
                  <strong>Fixed Monthly Customer Charge:</strong> A recurring flat account fee
                  charged regardless of how many therms or Mcf of gas you consume.
                </li>
                <li>
                  <strong>Weather Normalization & Taxes:</strong> Seasonal riders, municipal
                  franchise fees, and local sales taxes.
                </li>
              </ul>
              <h3>Unit Conversion Baseline</h3>
              <p>
                The EIA reports natural gas retail sales in dollars per thousand cubic feet ($/Mcf).
                Most residential utility meters in the United States bill customer usage in therms
                or hundred cubic feet (Ccf). To convert EIA Mcf rates into therm estimates, Energy
                Bill Lab applies the national average natural gas heat content baseline of 1,036 Btu
                per cubic foot (1 Mcf = 1,036,000 Btu = 10.36 therms).
              </p>
            </div>
          </section>

          {/* Historical Trend Table */}
          {data.trend.length > 0 ? (
            <section className={styles.sectionCard} aria-labelledby="history-heading">
              <h2 id="history-heading" className={styles.sectionTitle}>
                Historical U.S. Residential Natural Gas Trend (June 2024 – April 2026)
              </h2>
              <p className={styles.sectionSubtitle}>
                Official U.S. Energy Information Administration (EIA) monthly residential natural
                gas prices with month-over-month and year-over-year price shifts.
              </p>
              <div className={styles.tableWrapper}>
                <table className={styles.dataTable}>
                  <caption>
                    U.S. residential natural gas retail prices by monthly reporting period (Form
                    EIA-857)
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Reporting Period</th>
                      <th scope="col">Price ($/Mcf)</th>
                      <th scope="col">Estimated Price ($/Therm)</th>
                      <th scope="col">Month-over-Month</th>
                      <th scope="col">Year-over-Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.trend.map((row) => (
                      <tr key={row.period}>
                        <td>
                          <strong>{row.formattedMonth}</strong>
                        </td>
                        <td className={styles.numericCol}>${row.priceDollarsPerMcf.toFixed(2)}</td>
                        <td className={styles.numericCol}>
                          ${row.priceDollarsPerTherm.toFixed(2)}
                        </td>
                        <td className={styles.numericCol}>
                          {formatChange(row.momChangeDollarsPerMcf, row.momChangePercent)}
                        </td>
                        <td className={styles.numericCol}>
                          {formatChange(row.yoyChangeDollarsPerMcf, row.yoyChangePercent)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          {/* State Availability Overview (Explicit Cohort) */}
          <section className={styles.sectionCard} aria-labelledby="state-availability-heading">
            <h2 id="state-availability-heading" className={styles.sectionTitle}>
              State Natural Gas Data Availability
            </h2>
            <p className={styles.sectionSubtitle}>
              Reporting Period: {data.comparisonCohort.latestCommonPeriod || 'April 2026'}.{' '}
              {data.comparisonCohort.eligibleStatesCount > 0
                ? `${data.comparisonCohort.eligibleStatesCount} geographies have verified residential natural gas price data for this period.`
                : ''}{' '}
              {data.comparisonCohort.excludedStatesCount > 0
                ? `${data.comparisonCohort.excludedStatesCount} geographies with missing or non-positive EIA source reporting for this period are excluded from comparison.`
                : 'All reporting geographies present.'}
            </p>

            {Object.keys(data.stateRates).length > 0 ? (
              <div className={styles.availabilityGrid}>
                {Object.entries(data.stateRates).map(([code, item]) => (
                  <div key={code} className={styles.availabilityItem}>
                    <span className={styles.stateName}>{item.name}</span>
                    <span className={styles.stateRate}>
                      ${item.priceDollarsPerTherm.toFixed(2)} / therm
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.unavailableNotice}>
                State-level residential natural gas price data is currently undergoing schema
                validation and historical data import. No unverified or placeholder state rates are
                displayed.
              </div>
            )}
          </section>

          <DataSourceNote>
            {data.dataStatusText} For therm conversion formulas and calculation details, review our{' '}
            <Link href="/methodology">Methodology page</Link> or{' '}
            <Link href="/data-sources">Data Sources page</Link>.
          </DataSourceNote>

          <section style={{ marginTop: 16 }}>
            <RelatedLinks links={relatedLinks} />
          </section>
        </div>
      </PageContainer>
    </>
  );
}
