import Button from 'antd/es/button';
import type { Metadata } from 'next';
import Link from 'next/link';

import { DataSourceNote } from '@/components/data-source-note';
import { HomepageTaskSelection } from '@/components/homepage-task-selection';
import { LatestInsightsSection } from '@/components/latest-insights-section';
import { PageContainer } from '@/components/page-container';
import { createPageMetadata } from '@/lib/metadata';
import { getNaturalGasHubData } from '@/lib/server/get-natural-gas-data';

import styles from './page.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'Energy Bill Lab | Electricity Rates, Natural Gas & Home Energy Calculators',
  description:
    'Compare residential electricity and natural gas rates across all U.S. states, analyze your electric bill, and estimate household energy costs using transparent formulas and U.S. EIA data.',
  path: '/',
});

export default async function HomePage() {
  const gasData = await getNaturalGasHubData();

  const gasRateMcf = gasData.latestNationalRate
    ? `$${gasData.latestNationalRate.priceDollarsPerMcf.toFixed(2)} / Mcf`
    : null;
  const gasRateTherm = gasData.latestNationalRate
    ? `$${gasData.latestNationalRate.priceDollarsPerTherm.toFixed(2)} / therm`
    : null;
  const gasMonthText = gasData.latestSourceMonthFormatted
    ? `Data through ${gasData.latestSourceMonthFormatted}`
    : 'Data through April 2026';

  return (
    <PageContainer>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.badge}>Independent U.S. Home Energy Intelligence</span>
          <h1>Understand what drives your home energy bill</h1>
          <p className={styles.lede}>
            Energy Bill Lab helps U.S. households understand electricity costs, natural gas rates,
            appliance usage, and utility rate differences across all 50 U.S. states with transparent
            formulas, official EIA data, and plain-English methodology.
          </p>
          <div className={styles.actions}>
            <Button type="primary" size="large" href="/electricity-bill-analyzer">
              Analyze your electric bill
            </Button>
            <Button size="large" href="/natural-gas-rates">
              Explore natural gas rates
            </Button>
          </div>
        </div>

        <div className={styles.readinessPanel} aria-label="Energy Bill Lab product coverage">
          <span className={styles.panelLabel}>Product Coverage</span>
          <dl>
            <div>
              <dt>State Coverage</dt>
              <dd>50 of 50 U.S. States</dd>
            </div>
            <div>
              <dt>Data Provenance</dt>
              <dd>U.S. EIA Monthly Data</dd>
            </div>
            <div>
              <dt>Calculation Tools</dt>
              <dd>12 Household Calculators</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Task Selection */}
      <HomepageTaskSelection />

      {/* Homepage Category Cards: Explore Home Energy Costs */}
      <section className={styles.categorySection} aria-labelledby="energy-categories-heading">
        <h2 id="energy-categories-heading">Explore Home Energy Costs</h2>
        <p className={styles.categoryIntro}>
          Compare official electricity and natural-gas data, estimate household usage costs, and
          understand how energy prices affect your bill.
        </p>
        <div className={styles.categoryGrid}>
          {/* Electricity Card */}
          <div className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <h3>Electricity Rates</h3>
              <p>
                Compare U.S. residential electricity prices, state averages, historical data and
                monthly household costs.
              </p>
            </div>
            <div>
              <Link className={styles.primaryCategoryBtn} href="/electricity-rates">
                Explore Electricity Rates →
              </Link>
              <ul className={styles.secondaryLinksList}>
                <li>
                  <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link>
                </li>
                <li>
                  <Link href="/electricity-rates">State Electricity Rates</Link>
                </li>
                <li>
                  <Link href="/research/us-residential-electricity-rate-report">
                    U.S. Residential Electricity-Rate Report
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Natural Gas Card */}
          <div className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <h3>Natural Gas Rates</h3>
              <p>
                Explore EIA residential natural-gas prices, historical trends and household cost
                calculators.
              </p>
            </div>
            <div>
              <Link className={styles.primaryCategoryBtn} href="/natural-gas-rates">
                Explore Natural Gas Rates →
              </Link>
              <ul className={styles.secondaryLinksList}>
                <li>
                  <Link href="/tools/natural-gas-bill-calculator">Natural Gas Bill Calculator</Link>
                </li>
                <li>
                  <Link href="/tools/gas-furnace-cost-calculator">Gas Furnace Cost Calculator</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Latest U.S. Energy Benchmarks Section */}
      <section className={styles.benchmarkSection} aria-labelledby="benchmarks-heading">
        <h2 id="benchmarks-heading">Latest U.S. Energy Benchmarks</h2>
        <div className={styles.benchmarkGrid}>
          {/* Electricity Benchmark */}
          <div className={styles.benchmarkCard}>
            <div>
              <span className={styles.benchmarkLabel}>U.S. Residential Electricity</span>
              <div className={styles.benchmarkValue}>18.44 ¢/kWh</div>
              <div className={styles.benchmarkPeriod}>Reporting period: May 2026</div>
            </div>
            <Link className={styles.benchmarkLink} href="/electricity-rates">
              View state electricity rates →
            </Link>
          </div>

          {/* Natural Gas Benchmark */}
          <div className={styles.benchmarkCard}>
            <div>
              <span className={styles.benchmarkLabel}>U.S. Residential Natural Gas</span>
              {gasRateMcf ? (
                <>
                  <div className={styles.benchmarkValue}>{gasRateMcf}</div>
                  <div className={styles.benchmarkSubValue}>Estimated {gasRateTherm}</div>
                </>
              ) : (
                <div className={styles.benchmarkValue}>Data temporarily unavailable</div>
              )}
              <div className={styles.benchmarkPeriod}>
                Latest available EIA residential natural-gas price ({gasMonthText})
              </div>
            </div>
            <Link className={styles.benchmarkLink} href="/natural-gas-rates">
              View natural gas trends →
            </Link>
          </div>
        </div>
      </section>

      {/* High-Value Household Energy Tools Section */}
      <section className={styles.toolsSection} aria-labelledby="homepage-tools-heading">
        <h2 id="homepage-tools-heading">High-Value Household Energy Tools</h2>
        <div className={styles.toolsGrid}>
          <Link className={styles.toolCard} href="/electricity-bill-analyzer">
            <div>
              <span className={styles.toolTitle}>Electricity Bill Analyzer</span>
              <p className={styles.toolDesc}>
                Compare two utility statements and isolate usage changes from rate adjustments.
              </p>
            </div>
            <span className={styles.toolAction}>Analyze bill →</span>
          </Link>

          <Link className={styles.toolCard} href="/tools/natural-gas-bill-calculator">
            <div>
              <span className={styles.toolTitle}>Natural Gas Bill Calculator</span>
              <p className={styles.toolDesc}>
                Calculate monthly gas spending from therms, fixed account fees, and local riders.
              </p>
            </div>
            <span className={styles.toolAction}>Calculate gas bill →</span>
          </Link>

          <Link className={styles.toolCard} href="/tools/appliance-energy-cost-calculator">
            <div>
              <span className={styles.toolTitle}>Appliance Cost Calculator</span>
              <p className={styles.toolDesc}>
                Estimate kWh usage and operating costs for any household appliance.
              </p>
            </div>
            <span className={styles.toolAction}>Estimate appliance →</span>
          </Link>

          <Link className={styles.toolCard} href="/tools/gas-furnace-cost-calculator">
            <div>
              <span className={styles.toolTitle}>Gas Furnace Cost Calculator</span>
              <p className={styles.toolDesc}>
                Calculate furnace operating costs based on input Btu/hr, AFUE rating, and therm
                rates.
              </p>
            </div>
            <span className={styles.toolAction}>Calculate furnace →</span>
          </Link>
        </div>
      </section>

      <LatestInsightsSection />

      {/* Trust & Foundation Section */}
      <section className={styles.trustSection} aria-labelledby="trust-heading">
        <h2 id="trust-heading">Built on transparent engineering</h2>
        <div className={styles.trustColumns}>
          <div>
            <h3>Open methodology</h3>
            <p>
              Every calculator formula and assumption is documented publicly. We explain units,
              default values, and calculation boundaries.
            </p>
            <Link href="/methodology">Read methodology &rarr;</Link>
          </div>
          <div>
            <h3>Official data sources</h3>
            <p>
              Rate data and state benchmarks link directly to published public datasets, including
              U.S. EIA monthly retail sales reports and state energy offices.
            </p>
            <Link href="/data-sources">Review data sources &rarr;</Link>
          </div>
          <div>
            <h3>Editorial standards</h3>
            <p>
              We publish practical, source-reviewed explanations for real home-energy questions with
              transparent methodology, clear citations, and editorial review.
            </p>
            <Link href="/editorial-policy">Read editorial policy &rarr;</Link>
          </div>
        </div>
      </section>

      <DataSourceNote>
        Energy Bill Lab calculations provide informational estimates. Actual utility bills may
        differ because of local taxes, fixed customer charges, fuel riders, tier structures, demand
        fees, and household billing cycle variations.
      </DataSourceNote>
    </PageContainer>
  );
}
