import Button from 'antd/es/button';
import Link from 'next/link';
import type { Metadata } from 'next';

import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { createPageMetadata } from '@/lib/metadata';

import styles from './page.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'Energy Bill Lab',
  description:
    'Transparent home-energy cost tools, methodology, and source-led electricity-rate context for U.S. residents.',
  path: '/',
});

const priorityLinks = [
  {
    href: '/tools',
    title: 'Calculators',
    text: 'Bill, appliance, cooling, heating, and EV charging tools will publish only after formula tests exist.',
  },
  {
    href: '/electricity-rates',
    title: 'Electricity Rates',
    text: 'State rate pages will use validated official snapshots.',
  },
  {
    href: '/methodology',
    title: 'Methodology',
    text: 'Every estimate will show formulas, assumptions, and source dates.',
  },
];

export default function HomePage() {
  return (
    <PageContainer>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1>Understand what changed in your energy bill.</h1>
          <p className={styles.lede}>
            Energy Bill Lab is a public-first home-energy project for U.S. residents. The
            calculators are not live yet; this foundation explains how estimates, source dates, and
            limitations will be handled before tools are published.
          </p>
          <div className={styles.actions}>
            <Button type="primary" size="large" href="/tools">
              Review planned tools
            </Button>
            <Button size="large" href="/data-sources">
              Review data sources
            </Button>
          </div>
        </div>
        <div className={styles.readinessPanel} aria-label="Product trust summary">
          <span className={styles.panelLabel}>Trust rules</span>
          <dl>
            <div>
              <dt>Core access</dt>
              <dd>No public login wall</dd>
            </div>
            <div>
              <dt>Published numbers</dt>
              <dd>Source dates required</dd>
            </div>
            <div>
              <dt>Calculator outputs</dt>
              <dd>Estimates, not predictions</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="foundation-links">
        <h2 id="foundation-links">What this foundation covers</h2>
        <div className={styles.linkGrid}>
          {priorityLinks.map((item) => (
            <Link key={item.href} className={styles.linkCard} href={item.href}>
              <span>{item.title}</span>
              <small>{item.text}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.explainer} aria-labelledby="categories">
        <h2 id="categories">Planned product categories</h2>
        <div className={styles.columns}>
          <div>
            <h3>Bill and appliance tools</h3>
            <p>
              Future calculators will show formulas, units, assumptions, warnings, and intermediate
              values so users can understand the result instead of receiving a black-box total.
            </p>
          </div>
          <div>
            <h3>Rates and sources</h3>
            <p>
              Electricity-rate pages will wait for validated public data snapshots. Energy Bill Lab
              will not publish fabricated “latest rate” values.
            </p>
          </div>
          <div>
            <h3>Guides and comparisons</h3>
            <p>
              Editorial pages will focus on practical bill problems, reviewed methodology, and
              source-linked explanations rather than generic filler.
            </p>
          </div>
        </div>
      </section>

      <DataSourceNote>
        Tools will use estimates and sourced defaults where available. Actual bills can vary because
        of taxes, riders, fixed charges, tiers, demand charges, weather, billing-cycle length, and
        household behavior.
      </DataSourceNote>
    </PageContainer>
  );
}
