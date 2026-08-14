import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import { energyGuides, guideSlugs } from '@/content/guides';
import { getPublishedInsights } from '@/content/insights';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import { createPersonStructuredData, serializeStructuredData } from '@/lib/structured-data';

import styles from './author-profile.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'Jaynesh Shingala — Author & Publisher at Energy Bill Lab',
  description:
    'Engineering background, editorial standards, calculation methodologies, and published home-energy research by Jaynesh Shingala, publisher of Energy Bill Lab.',
  path: '/authors/jaynesh-shingala',
});

export default function AuthorProfilePage() {
  const publishedInsights = getPublishedInsights();
  const guidesList = guideSlugs.slice(0, 10).map((slug) => energyGuides[slug]!);

  const personStructuredData = createPersonStructuredData({
    name: 'Jaynesh Shingala',
    jobTitle: 'Publisher, Software Engineer & Energy Data Analyst',
    description:
      'Jaynesh Shingala is a software engineer and energy data analyst who designs transparent calculation engines, models utility rate structures, and publishes research on U.S. home energy costs.',
    url: '/authors/jaynesh-shingala',
  });

  const breadcrumbs = [
    { href: '/' as const, label: 'Home' },
    { href: '/about' as const, label: 'About' },
    { href: '/authors/jaynesh-shingala' as const, label: 'Jaynesh Shingala' },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/about',
    '/editorial-policy',
    '/methodology',
    '/data-sources',
    '/electricity-bill-analyzer',
    '/research/us-residential-electricity-rate-report',
  ];

  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbs} />

      <article className={styles.authorContainer}>
        <PageHeader
          eyebrow="Author & Publisher Profile"
          title="Jaynesh Shingala"
          description="Publisher, Software Engineer & Energy Data Analyst at Energy Bill Lab. Designing transparent, public-first home energy calculation engines, mathematical rate models, and official U.S. EIA data benchmarks."
        />

        {/* Bio Summary Card */}
        <section className={styles.bioCard} aria-labelledby="author-bio-heading">
          <div className={styles.bioHeader}>
            <div className={styles.avatarPlaceholder} aria-hidden="true">
              JS
            </div>
            <div>
              <h2 id="author-bio-heading" className={styles.authorName}>
                Jaynesh Shingala
              </h2>
              <p className={styles.authorRole}>
                Creator & Technical Lead · Energy Bill Lab
              </p>
              <div className={styles.contactRow}>
                <span>Email: <a href="mailto:shingala.jaynesh@gmail.com">shingala.jaynesh@gmail.com</a></span>
                <span>•</span>
                <span>Location: India & U.S. Energy Focus</span>
                <span>•</span>
                <span>Status: Active Editorial Reviewer</span>
              </div>
            </div>
          </div>

          <div className={styles.bioBody}>
            <h3>Background & Focus</h3>
            <p>
              Jaynesh Shingala is the software engineer, energy data analyst, and publisher behind
              Energy Bill Lab. His technical work focuses on building reproducible, decimal-safe
              calculation engines that demystify residential electricity bills, natural gas tariffs,
              HVAC efficiency ratings (SEER2, HSPF2, AFUE), and appliance power consumption.
            </p>
            <p>
              Frustrated by generic AI-generated blogs and opaque commercial lead-generation tools,
              Jaynesh founded Energy Bill Lab as a public-first, evidence-led utility platform. All
              tools and reference reports on Energy Bill Lab are built with transparent formulas,
              deterministic rounding, explicit boundary checks, and direct citations to official U.S.
              government datasets (primarily Form EIA-861M monthly retail sales reports).
            </p>
          </div>
        </section>

        {/* Editorial Standards & Methodology Responsibilities */}
        <section className={styles.section} aria-labelledby="editorial-standards-heading">
          <h2 id="editorial-standards-heading">Editorial & Calculation Responsibilities</h2>
          <div className={styles.gridTwoCol}>
            <div className={styles.featureCard}>
              <h3>Calculation Engine Architecture</h3>
              <p>
                Author and maintainer of all 12 pure TypeScript calculation packages in Energy Bill
                Lab, ensuring IEEE-754 decimal safety, explicit unit conversions (Watts, kWh, BTU/hr,
                therms, Mcf), and zero third-party framework dependencies in the mathematical core.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3>Data Verification & Integrity</h3>
              <p>
                Conducts monthly ingestion and statistical verification of U.S. Energy Information
                Administration (EIA) state electricity rates and natural gas price snapshots,
                maintaining historical 24-month baselines and quality status tracking.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3>Original Case Study Modeling</h3>
              <p>
                Develops practical worked examples for utility bill decomposition, isolating
                calendar billing drift (28 vs 35 billing days), fuel adjustment riders, customer
                charges, and appliance duty-cycle thermal shifts.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3>Public Corrections Process</h3>
              <p>
                Personally reviews and responds to all public source correction requests and
                accessibility inquiries within a committed 48-hour service level agreement (SLA).
              </p>
            </div>
          </div>
        </section>

        {/* Published Daily Insights by Jaynesh */}
        <section className={styles.section} aria-labelledby="published-insights-heading">
          <h2 id="published-insights-heading">
            Recent Data Research & Daily Insights ({publishedInsights.length} Published)
          </h2>
          <p className={styles.sectionLead}>
            Source-backed analytical benchmarks published by Jaynesh Shingala evaluating current
            market trends, rate disparities, and appliance efficiency standards:
          </p>
          <div className={styles.articleList}>
            {publishedInsights.slice(0, 6).map((art) => (
              <div key={art.slug} className={styles.articleItem}>
                <span className={styles.articleCategory}>{art.category.toUpperCase()}</span>
                <Link href={`/insights/${art.slug}`} className={styles.articleLink}>
                  {art.title}
                </Link>
                <p className={styles.articleSummary}>{art.summary}</p>
                <div className={styles.articleMeta}>
                  <span>Published {art.publishedAt}</span>
                  {art.reportingPeriod ? <span> · Period: {art.reportingPeriod}</span> : null}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Link href="/insights" style={{ fontWeight: 600, color: '#176b5b' }}>
              View All {publishedInsights.length} Energy Insights →
            </Link>
          </div>
        </section>

        {/* Core Educational Guides */}
        <section className={styles.section} aria-labelledby="published-guides-heading">
          <h2 id="published-guides-heading">
            Selected Problem-Solving Guides ({guideSlugs.length} Published)
          </h2>
          <div className={styles.gridTwoCol}>
            {guidesList.map((g) => (
              <div key={g.href} className={styles.guideCard}>
                <Link href={g.href} className={styles.guideTitle}>
                  {g.h1Title}
                </Link>
                <p className={styles.guideDesc}>{g.description}</p>
                <span className={styles.guideAuthor}>Written & data-checked by Jaynesh Shingala</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Link href="/guides" style={{ fontWeight: 600, color: '#176b5b' }}>
              View All {guideSlugs.length} Home Energy Problem Guides →
            </Link>
          </div>
        </section>

        {/* Trust Note & Navigation */}
        <DataSourceNote>
          Energy Bill Lab calculations represent informational estimates. All methodologies and rate
          benchmarks are documented transparently under our editorial and data source guidelines.
        </DataSourceNote>

        <section style={{ marginTop: 32 }}>
          <RelatedLinks links={relatedLinks} />
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(personStructuredData) }}
      />
    </PageContainer>
  );
}
