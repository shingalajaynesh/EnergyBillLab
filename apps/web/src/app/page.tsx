import Button from 'antd/es/button';
import Link from 'next/link';
import type { Metadata } from 'next';

import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { createPageMetadata } from '@/lib/metadata';

import styles from './page.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'Energy Bill Lab | Electricity Rates & Home Energy Calculators',
  description:
    'Compare residential electricity rates across all 50 U.S. states, analyze your electric bill, and estimate appliance energy costs using transparent formulas and U.S. EIA data.',
  path: '/',
});

const priorityLinks = [
  {
    href: '/electricity-bill-analyzer',
    title: 'Electricity Bill Analyzer',
    text: 'Compare two billing statements, normalize usage by billing days, and isolate usage effects from rate/fee changes.',
  },
  {
    href: '/electricity-rates',
    title: '50-State Electricity Rates Hub',
    text: 'Explore detailed residential electricity rate reports for all 50 U.S. states with official EIA monthly data provenance.',
  },
  {
    href: '/research/us-residential-electricity-rate-report',
    title: 'U.S. Electricity Rate Research Report',
    text: 'Review our original national research report analyzing residential rate benchmarks, rankings, and trends across all 50 states.',
  },
  {
    href: '/tools',
    title: 'Interactive Energy Calculators (10)',
    text: 'Calculate operating costs for air conditioners, space heaters, EV chargers, refrigerators, water heaters, dryers, pool pumps, and dehumidifiers.',
  },
  {
    href: '/tools/appliance-energy-cost-calculator',
    title: 'Appliance Energy Cost Calculator',
    text: 'Estimate electricity usage (kWh) and operating costs for major household appliances with transparent duty cycle controls.',
  },
  {
    href: '/tools/ac-cost-calculator',
    title: 'Air Conditioner Cost Calculator',
    text: 'Calculate AC electricity costs using cooling capacity (BTU/hr), EER efficiency ratings, wattage, and duty cycle.',
  },
  {
    href: '/tools/ev-home-charging-cost-calculator',
    title: 'EV Home Charging Cost Calculator',
    text: 'Calculate EV home charging electricity usage (kWh), grid charging losses, session costs, and cost per mile.',
  },
  {
    href: '/guides',
    title: 'Problem-Solving Energy Guides (10)',
    text: 'Understand seasonal bill spikes, appliance usage benchmarks, heat pump costs, fixed charges, and estimated meter readings.',
  },
];

export default function HomePage() {
  return (
    <PageContainer>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.badge}>Independent U.S. Home Energy Data</span>
          <h1>Understand what drives your home energy bill</h1>
          <p className={styles.lede}>
            Energy Bill Lab helps U.S. households understand electricity costs, appliance usage, and
            state-rate differences across all 50 U.S. states with transparent formulas, official EIA
            data, and plain-English methodology.
          </p>
          <div className={styles.actions}>
            <Button type="primary" size="large" href="/electricity-bill-analyzer">
              Analyze your electric bill
            </Button>
            <Button size="large" href="/electricity-rates">
              View 50-state rate reports
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
              <dd>U.S. EIA Form EIA-861M</dd>
            </div>
            <div>
              <dt>Calculation Tools</dt>
              <dd>10 Interactive Calculators</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="user-problems-heading">
        <h2 id="user-problems-heading">Three core user problems we solve</h2>
        <div className={styles.problemGrid}>
          <div className={styles.problemCard}>
            <h3>1. Understanding bill changes</h3>
            <p>
              Compare two billing cycles to separate usage increases from rate changes, fixed fees,
              or billing-day differences.
            </p>
          </div>
          <div className={styles.problemCard}>
            <h3>2. Estimating appliance costs</h3>
            <p>
              Calculate daily, monthly, and annual operating costs for air conditioners, space
              heaters, EV home chargers, water heaters, refrigerators, and major home appliances.
            </p>
          </div>
          <div className={styles.problemCard}>
            <h3>3. 50-State rate context</h3>
            <p>
              View residential electricity rate benchmarks across all 50 U.S. states with clear
              source attribution to official U.S. EIA reports and state regulatory agencies.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="foundation-links">
        <h2 id="foundation-links">Explore energy resources</h2>
        <div className={styles.linkGrid}>
          {priorityLinks.map((item) => (
            <Link key={item.href} className={styles.linkCard} href={item.href}>
              <span>{item.title}</span>
              <small>{item.text}</small>
            </Link>
          ))}
        </div>
      </section>

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
              We publish practical, source-reviewed explanations for real home-energy questions
              with transparent methodology, clear citations, and editorial review.
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
