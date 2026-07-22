import Button from 'antd/es/button';
import Link from 'next/link';

import { PageContainer } from '@/components/page-container';

import styles from './page.module.css';

const priorityLinks = [
  {
    href: '/tools/electricity-bill-analyzer',
    title: 'Bill Analyzer',
    text: 'Foundation route reserved for the first calculator workflow.',
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
            Energy Bill Lab is being built as a transparent U.S. home-energy data product:
            calculators first, official source dates always, and no login wall for core answers.
          </p>
          <div className={styles.actions}>
            <Button type="primary" size="large" href="/tools/electricity-bill-analyzer">
              Bill analyzer foundation
            </Button>
            <Button size="large" href="/data-sources">
              Data-source plan
            </Button>
          </div>
        </div>
        <div className={styles.readinessPanel} aria-label="Foundation readiness summary">
          <span className={styles.panelLabel}>Phase 0 foundation</span>
          <dl>
            <div>
              <dt>Public app</dt>
              <dd>Next.js App Router</dd>
            </div>
            <div>
              <dt>API</dt>
              <dd>NestJS Fastify</dd>
            </div>
            <div>
              <dt>Contracts</dt>
              <dd>Zod boundary package</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="foundation-links">
        <h2 id="foundation-links">Built for calculators without starting them yet</h2>
        <div className={styles.linkGrid}>
          {priorityLinks.map((item) => (
            <Link key={item.href} className={styles.linkCard} href={item.href}>
              <span>{item.title}</span>
              <small>{item.text}</small>
            </Link>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
