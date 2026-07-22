import Button from 'antd/es/button';
import Link from 'next/link';
import type { Metadata } from 'next';

import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { createPageMetadata } from '@/lib/metadata';

import styles from './page.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'Energy Bill Lab | Understand Your Home Energy Bill',
  description:
    'Transparent home-energy cost tools, methodology, and source-led electricity-rate context for U.S. residents.',
  path: '/',
});

const priorityLinks = [
  {
    href: '/tools',
    title: 'Tool Library',
    text: 'Explore upcoming calculators for electricity bills, appliances, air conditioning, heating, and EV charging.',
  },
  {
    href: '/electricity-rates',
    title: 'Electricity Rates',
    text: 'Review how state electricity-rate snapshots will present residential averages with source dates.',
  },
  {
    href: '/guides',
    title: 'Bill Problem Guides',
    text: 'Understand common bill issues including seasonal spikes, fixed charges, and estimated meter readings.',
  },
];

export default function HomePage() {
  return (
    <PageContainer>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.badge}>Independent Home Energy Data</span>
          <h1>Understand what drives your home energy bill</h1>
          <p className={styles.lede}>
            Energy Bill Lab helps U.S. households understand electricity costs, appliance usage, and
            state-rate differences with transparent formulas and plain-English methodology.
          </p>
          <div className={styles.actions}>
            <Button type="primary" size="large" href="/tools">
              Explore energy tools
            </Button>
            <Button size="large" href="/methodology">
              See our methodology
            </Button>
          </div>
        </div>

        <div className={styles.readinessPanel} aria-label="Product trust rules">
          <span className={styles.panelLabel}>Product Principles</span>
          <dl>
            <div>
              <dt>Core Access</dt>
              <dd>No public login wall</dd>
            </div>
            <div>
              <dt>Data Transparency</dt>
              <dd>Source dates required</dd>
            </div>
            <div>
              <dt>Calculation Approach</dt>
              <dd>Estimates, not predictions</dd>
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
              heaters, EV home chargers, and major appliances.
            </p>
          </div>
          <div className={styles.problemCard}>
            <h3>3. Comparing state rate context</h3>
            <p>
              View residential electricity rate benchmarks with clear source attribution to EIA and
              official state records.
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
              U.S. EIA reports and state energy offices.
            </p>
            <Link href="/data-sources">Review data sources &rarr;</Link>
          </div>
          <div>
            <h3>Editorial standards</h3>
            <p>
              We publish practical, human-reviewed explanations for real home-energy questions
              without mass-generated AI content or clickbait.
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
