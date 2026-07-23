import Link from 'next/link';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
  ThunderboltOutlined,
  InfoCircleOutlined,
  RightOutlined,
  CalculatorOutlined,
  BarChartOutlined,
  GlobalOutlined,
  ExclamationCircleOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';

import type { FirstTenStateConfig } from '@/config/first-ten-states';
import type { StatePageViewModel } from '@/lib/server/get-state-page-data';

import styles from './state-rate-components.module.css';

/* 1. National Benchmark Panel */
export function NationalRateSummary({
  nationalRate,
  periodFormatted,
  provenanceStatus,
}: {
  nationalRate: number | null;
  periodFormatted: string | null;
  provenanceStatus?: 'live_database' | 'bundled_snapshot' | 'unavailable';
}) {
  const isAvailable =
    provenanceStatus === 'live_database' ||
    (nationalRate !== null && provenanceStatus !== 'unavailable');

  return (
    <section className={styles.benchmarkCard} aria-labelledby="national-benchmark-heading">
      <div className={styles.benchmarkHeader}>
        <GlobalOutlined className={styles.benchmarkIcon} />
        <h2 id="national-benchmark-heading" className={styles.benchmarkLabel}>
          U.S. National Average Benchmark
        </h2>
      </div>
      <div className={styles.benchmarkBody}>
        {isAvailable && nationalRate !== null ? (
          <>
            <div className={styles.benchmarkValue}>{nationalRate.toFixed(2)} ¢/kWh</div>
            {periodFormatted ? (
              <span className={styles.benchmarkPeriodTag}>{periodFormatted} EIA Benchmark</span>
            ) : null}
          </>
        ) : (
          <div
            style={{ fontSize: '1.125rem', fontWeight: 600, color: '#475467', padding: '4px 0' }}
          >
            Rate benchmarks temporarily unavailable — use manual entry in calculators below
          </div>
        )}
      </div>
      <p className={styles.benchmarkDesc}>
        The overall U.S. residential average electricity price is compiled monthly by the U.S.
        Energy Information Administration (EIA) across all state electric utilities and serves as a
        benchmark for household energy cost comparisons.
      </p>
    </section>
  );
}

/* 2. Single Interactive State Card */
export function StateRateCard({
  config,
  latestRateCents,
  periodFormatted,
}: {
  config: FirstTenStateConfig;
  latestRateCents: number | null;
  periodFormatted: string | null;
}) {
  return (
    <Link
      href={`/electricity-rates/${config.slug}`}
      className={styles.stateCard}
      aria-label={`${config.name} electricity rate report`}
    >
      <div className={styles.stateCardTop}>
        <div className={styles.stateNameGroup}>
          <span className={styles.stateName}>{config.name}</span>
          <span className={styles.stateBadge}>{config.code}</span>
        </div>
      </div>
      <div className={styles.stateMarketType}>{config.marketType}</div>
      <div className={styles.stateCardBottom}>
        <div>
          {latestRateCents !== null ? (
            <>
              <div className={styles.stateRateValue}>{latestRateCents.toFixed(2)} ¢/kWh</div>
              {periodFormatted ? (
                <span style={{ fontSize: '0.8125rem', color: '#667085' }}>{periodFormatted}</span>
              ) : null}
            </>
          ) : (
            <div
              className={styles.stateRateValue}
              style={{ fontSize: '0.9375rem', color: '#667085' }}
            >
              Rate data unavailable
            </div>
          )}
        </div>
        <span className={styles.stateAction}>
          View Report <RightOutlined style={{ fontSize: 10 }} />
        </span>
      </div>
    </Link>
  );
}

/* 3. Primary Rate Summary Grid for State Page */
export function RateSummaryGrid({ data }: { data: StatePageViewModel }) {
  if (!data.hasData || !data.latestStateRate || data.provenance.status === 'unavailable') {
    return null;
  }

  const statePrice = data.latestStateRate.priceCentsPerKwh;
  const isDeregulated = data.config.marketType.includes('Retail Choice');

  return (
    <div className={styles.metricsGrid}>
      <div className={styles.metricCard}>
        <div className={styles.metricHeader}>
          <ThunderboltOutlined style={{ color: '#176b5b' }} />
          <span className={styles.metricLabel}>Residential Electricity Rate</span>
        </div>
        <div className={styles.metricPrimary}>{statePrice.toFixed(2)} ¢/kWh</div>
        <div className={styles.metricSubtext}>
          Verified database rate for {data.latestSourceMonthFormatted}
        </div>
      </div>

      <div className={styles.metricCard}>
        <div className={styles.metricHeader}>
          <BarChartOutlined style={{ color: '#176b5b' }} />
          <span className={styles.metricLabel}>U.S. National Comparison</span>
        </div>
        <div style={{ marginBottom: 8 }}>
          {data.comparisonDirection === 'above' ? (
            <span className={styles.badgeAbove}>
              <ArrowUpOutlined /> {data.comparisonDirectionText}
            </span>
          ) : data.comparisonDirection === 'below' ? (
            <span className={styles.badgeBelow}>
              <ArrowDownOutlined /> {data.comparisonDirectionText}
            </span>
          ) : data.comparisonDirection === 'equal' ? (
            <span className={styles.badgeEqual}>
              <MinusOutlined /> {data.comparisonDirectionText}
            </span>
          ) : (
            <span className={styles.metricSubtext}>Comparison unavailable</span>
          )}
        </div>
        <div className={styles.metricSubtext}>
          National Average:{' '}
          {data.latestNationalRate
            ? `${data.latestNationalRate.priceCentsPerKwh.toFixed(2)} ¢/kWh`
            : 'N/A'}
        </div>
      </div>

      <div className={styles.metricCard}>
        <div className={styles.metricHeader}>
          <FieldTimeOutlined style={{ color: '#176b5b' }} />
          <span className={styles.metricLabel}>Market Framework</span>
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#182230', marginBottom: 6 }}>
          {data.config.marketType}
        </div>
        <div className={styles.metricSubtext}>
          {isDeregulated
            ? 'Retail supplier choice available for residential customers.'
            : 'Traditional regulated utility service territories.'}
        </div>
      </div>
    </div>
  );
}

/* 4. User-Facing Data Unavailable Fallback Panel */
export function DataUnavailablePanel({ data }: { data: StatePageViewModel }) {
  return (
    <div className={styles.fallbackPanel} role="status">
      <div className={styles.fallbackHeader}>
        <ExclamationCircleOutlined className={styles.fallbackIcon} />
        <h2 className={styles.fallbackTitle}>Current State Rate Data Temporarily Unavailable</h2>
      </div>
      <p className={styles.fallbackBody}>{data.dataStatusText}</p>
      <div className={styles.fallbackActions}>
        <Link href="/electricity-bill-analyzer" className={styles.btnPrimary}>
          <CalculatorOutlined /> Open Electricity Bill Analyzer
        </Link>
        <Link href="/tools/appliance-energy-cost-calculator" className={styles.btnSecondary}>
          Appliance Cost Calculator
        </Link>
        <Link href="/data-sources" className={styles.btnSecondary}>
          Data Sources & Methodology
        </Link>
      </div>
    </div>
  );
}

/* 5. Household Energy Charge Examples Table */
export function HouseholdCostExamplesTable({ data }: { data: StatePageViewModel }) {
  if (
    !data.hasData ||
    data.householdExamples.length === 0 ||
    data.provenance.status === 'unavailable'
  ) {
    return null;
  }

  return (
    <section className={styles.sectionCard} aria-labelledby="household-cost-heading">
      <h2 id="household-cost-heading" className={styles.sectionTitle}>
        Estimated Monthly Household Energy Charges
      </h2>
      <p className={styles.sectionIntro}>
        Estimated monthly energy charges for standard home electricity usage baselines in{' '}
        {data.config.name} calculated at {data.latestStateRate?.priceCentsPerKwh.toFixed(2)} ¢/kWh:
      </p>

      <div className={styles.tableScrollContainer}>
        <table className={styles.dataTable}>
          <caption>
            {data.config.name} residential monthly electricity cost estimates by consumption level
          </caption>
          <thead>
            <tr>
              <th scope="col">Monthly Usage (kWh)</th>
              <th scope="col">Household Profile Baseline</th>
              <th scope="col">Estimated Energy Charge ($/mo)</th>
            </tr>
          </thead>
          <tbody>
            {data.householdExamples.map((ex) => (
              <tr key={ex.kwh}>
                <td style={{ fontWeight: 700 }}>{ex.kwh.toLocaleString()} kWh</td>
                <td>{ex.label}</td>
                <td style={{ fontWeight: 800, color: '#104c41' }}>
                  ${ex.monthlyEnergyCostUsd.toFixed(2)} / mo
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.tableCaveat}>
        * <strong>Estimated energy charge only.</strong> Excludes utility fixed monthly customer
        fees, local distribution charges, time-of-use peak demand rates, fuel surcharges, and state
        taxes.
      </p>
    </section>
  );
}

/* 6. Historical 24-Month Trend Table */
export function RateHistoryTable({ data }: { data: StatePageViewModel }) {
  if (!data.hasData || data.history.length === 0 || data.provenance.status === 'unavailable') {
    return null;
  }

  return (
    <section className={styles.sectionCard} aria-labelledby="history-heading">
      <h2 id="history-heading" className={styles.sectionTitle}>
        24-Month Historical Rate Trend ({data.config.name})
      </h2>
      <p className={styles.sectionIntro}>
        Official U.S. EIA residential electricity price history for {data.config.name} over recent
        reporting periods:
      </p>

      <div className={styles.tableScrollContainer}>
        <table className={styles.dataTable}>
          <caption>
            {data.config.name} monthly residential electricity rate history (cents per kWh)
          </caption>
          <thead>
            <tr>
              <th scope="col">Reporting Month</th>
              <th scope="col">Average Rate (¢/kWh)</th>
              <th scope="col">Month-over-Month Change</th>
            </tr>
          </thead>
          <tbody>
            {data.history.map((row) => (
              <tr key={row.period}>
                <td style={{ fontWeight: 600 }}>{row.periodFormatted}</td>
                <td style={{ fontWeight: 700 }}>{row.priceCentsPerKwh.toFixed(2)} ¢/kWh</td>
                <td>
                  {row.changeCents === null ? (
                    <span style={{ color: '#667085' }}>
                      {row.isConsecutive ? '—' : 'Not reported'}
                    </span>
                  ) : row.changeCents > 0 ? (
                    <span style={{ color: '#b91c1c', fontWeight: 600 }}>
                      <ArrowUpOutlined style={{ fontSize: 11 }} /> +{row.changeCents.toFixed(2)} ¢
                    </span>
                  ) : row.changeCents < 0 ? (
                    <span style={{ color: '#15803d', fontWeight: 600 }}>
                      <ArrowDownOutlined style={{ fontSize: 11 }} /> {row.changeCents.toFixed(2)} ¢
                    </span>
                  ) : (
                    <span style={{ color: '#475467' }}>0.00 ¢</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* 7. State Market & Climate Drivers Grid */
export function StateDriverGrid({ config }: { config: FirstTenStateConfig }) {
  return (
    <section className={styles.sectionCard} aria-labelledby="drivers-heading">
      <h2 id="drivers-heading" className={styles.sectionTitle}>
        Key Electricity Cost Drivers in {config.name}
      </h2>
      <p className={styles.sectionIntro}>
        Primary market structure, generation mix, and environmental factors shaping electricity
        costs across {config.name}:
      </p>
      <div className={styles.driverGrid}>
        {config.keyFactors.map((factor, idx) => (
          <div key={factor.title} className={styles.driverCard}>
            <div className={styles.driverHeader}>
              <InfoCircleOutlined className={styles.driverIcon} />
              <h3 className={styles.driverTitle}>
                {idx + 1}. {factor.title}
              </h3>
            </div>
            <p className={styles.driverDesc}>{factor.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* 8. Calculator Call-to-Action Box */
export function CalculatorCtaBox({ stateName }: { stateName: string }) {
  return (
    <section className={styles.ctaBox} aria-labelledby="cta-heading">
      <h2 id="cta-heading" className={styles.ctaTitle}>
        Calculate Your Exact {stateName} Home Electricity Bill
      </h2>
      <p className={styles.ctaDesc}>
        Statewide average rates provide a baseline, but your actual electric bill depends on your
        utility tariff structure, seasonal AC usage, and household appliances. Use Energy Bill Lab
        tools to analyze your bill or calculate appliance operating costs.
      </p>
      <div className={styles.ctaButtons}>
        <Link href="/electricity-bill-analyzer" className={styles.btnPrimary}>
          <CalculatorOutlined /> Analyze Electricity Bill
        </Link>
        <Link href="/tools/appliance-energy-cost-calculator" className={styles.btnSecondary}>
          Appliance Cost Calculator
        </Link>
        <Link href="/tools/ac-cost-calculator" className={styles.btnSecondary}>
          Air Conditioner Calculator
        </Link>
      </div>
    </section>
  );
}
