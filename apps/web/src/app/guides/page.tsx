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
    'Practical, source-backed guides for understanding sudden bill spikes, fixed utility charges, appliance power draw, AC cooling, space heating, EV charging, refrigerators, dryers, water heaters, pool pumps, and dehumidifiers.',
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
  {
    href: '/tools/refrigerator-cost-calculator',
    label: 'Refrigerator Cost Calculator',
    description:
      'Estimate monthly refrigerator operating costs using compressor duty cycle or annual kWh rating.',
  },
  {
    href: '/tools/clothes-dryer-cost-calculator',
    label: 'Clothes Dryer Cost Calculator',
    description:
      'Calculate 240V electric dryer cost per load, weekly spending, and annual consumption.',
  },
  {
    href: '/tools/electric-water-heater-cost-calculator',
    label: 'Electric Water Heater Cost Calculator',
    description:
      'Estimate electric resistance tank water heating costs using element wattage and runtime.',
  },
  {
    href: '/tools/pool-pump-cost-calculator',
    label: 'Pool Pump Cost Calculator',
    description:
      'Calculate daily, monthly, and seasonal pool filtration costs based on motor input wattage.',
  },
  {
    href: '/tools/dehumidifier-cost-calculator',
    label: 'Dehumidifier Cost Calculator',
    description:
      'Estimate basement and room dehumidifier operating costs using rated power and duty cycle.',
  },
];

export default function GuidesPage() {
  const allGuides = guideSlugs.map((slug) => energyGuides[slug]!);

  const problemGuides = allGuides.filter((g) => g.category === 'Electric Bill Diagnostics');
  const applianceGuides = allGuides.filter((g) => g.category === 'Appliance Benchmarks');

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
          title="Electric Bill & Appliance Guides"
          description="Practical, source-backed guides for diagnosing high electric bills, appliance energy draw, AC cooling costs, space heater runtime, EV charging, refrigerators, dryers, water heaters, pool pumps, and dehumidifiers."
        />

        <div className={styles.introSection}>
          <p>
            Unexpected electric bill increases are usually caused by a combination of weather
            extremes, longer billing cycles, rate adjustments, or estimated meter readings. Our
            guides explain how to dissect your utility statement, estimate appliance electricity
            draw, and identify actionable steps to control costs.
          </p>
        </div>

        {/* Section 1: Electric Bill Diagnostics */}
        <section className={styles.guideSection} aria-labelledby="electric-bill-diagnostics">
          <h2 id="electric-bill-diagnostics" className={styles.sectionHeader}>
            Electric Bill Diagnostic Guides
          </h2>
          <div className={styles.guideGrid}>
            {problemGuides.map((guide) => (
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

        {/* Section 2: Appliance Energy Guides */}
        <section
          className={styles.guideSection}
          aria-labelledby="appliance-energy-guides"
          style={{ marginTop: 40 }}
        >
          <h2 id="appliance-energy-guides" className={styles.sectionHeader}>
            Appliance Energy & Cost Guides
          </h2>
          <div className={styles.guideGrid}>
            {applianceGuides.map((guide) => (
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

        {/* Section 3: Calculators */}
        <section
          className={styles.calculatorSection}
          aria-labelledby="use-a-calculator"
          style={{ marginTop: 48 }}
        >
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
