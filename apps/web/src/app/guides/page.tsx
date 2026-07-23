import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { energyGuides, guideSlugs } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from './guides-hub.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'Home Energy & Electric Bill Problem Guides',
  description:
    'Practical, source-backed guides for understanding sudden bill spikes, fixed utility charges, appliance power draw, AC cooling, space heating, and EV home charging.',
  path: '/guides',
});

const calculators = [
  {
    href: '/electricity-bill-analyzer',
    label: 'Electricity Bill Analyzer',
    description: 'Compare two utility statements to isolate usage and rate changes.',
  },
  {
    href: '/tools/appliance-energy-cost-calculator',
    label: 'Appliance Energy Cost Calculator',
    description: 'Calculate hourly, monthly, and annual appliance electricity costs.',
  },
  {
    href: '/tools/ac-cost-calculator',
    label: 'Air Conditioner Cost Calculator',
    description: 'Estimate cooling costs based on BTU, EER/SEER, and duty cycles.',
  },
  {
    href: '/tools/space-heater-cost-calculator',
    label: 'Space Heater Cost Calculator',
    description: 'Calculate 750W and 1,500W electric heater operating expenses.',
  },
  {
    href: '/tools/ev-home-charging-cost-calculator',
    label: 'EV Home Charging Calculator',
    description: 'Calculate session costs and Level 1/Level 2 efficiency losses.',
  },
];

export default function GuidesPage() {
  const guidesList = guideSlugs.map((slug) => energyGuides[slug]!);

  return (
    <PageContainer>
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/guides', label: 'Guides' },
        ]}
      />

      <div className={styles.hubContainer}>
        <PageHeader
          eyebrow="Energy Guides"
          title="Electric Bill Problem Guides"
          description="Practical guides for diagnosing high electric bills, appliance energy draw, AC cooling costs, space heater runtime, and EV home charging."
        />

        <div className={styles.introSection}>
          <p>
            Unexpected electric bill increases are usually caused by a combination of weather
            extremes, longer billing cycles, rate adjustments, or estimated meter readings. Our
            guides explain how to dissect your utility statement and identify actionable steps to
            control costs.
          </p>
        </div>

        <section className={styles.guideSection} aria-labelledby="energy-problem-guides">
          <h2 id="energy-problem-guides" className={styles.sectionHeader}>
            Energy Problem Guides
          </h2>
          <div className={styles.guideGrid}>
            {guidesList.map((guide) => (
              <Link key={guide.slug} href={guide.href} className={styles.guideCard}>
                <div className={styles.guideCardTop}>
                  <span className={styles.categoryTag}>{guide.category}</span>
                  <h3 className={styles.cardTitle}>{guide.h1Title}</h3>
                  <p className={styles.cardDescription}>{guide.description}</p>
                </div>
                <span className={styles.cardAction}>Read Guide →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.calculatorSection} aria-labelledby="use-a-calculator">
          <h2 id="use-a-calculator" className={styles.sectionHeader}>
            Use a Calculator
          </h2>
          <div className={styles.calcGrid}>
            {calculators.map((calc) => (
              <Link key={calc.href} href={calc.href} className={styles.calcLink}>
                <span className={styles.calcTitle}>{calc.label}</span>
                <span className={styles.calcSubtext}>{calc.description}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
