import Link from 'next/link';
import type { ReactNode } from 'react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { RelatedLinks } from '@/components/related-links';
import type { GuideDefinition } from '@/content/guides';
import { getSiteUrl } from '@/lib/site';
import { serializeStructuredData } from '@/lib/structured-data';

import styles from './guide-article-view.module.css';

export function GuideArticleView({
  guide,
  children,
}: {
  guide: GuideDefinition;
  children: ReactNode;
}) {
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1Title,
    description: guide.description,
    mainEntityOfPage: getSiteUrl(guide.href),
    datePublished: '2026-07-23',
    dateModified: guide.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Energy Bill Lab Editorial Team',
      url: getSiteUrl('/about'),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Energy Bill Lab',
      url: getSiteUrl('/'),
    },
  };

  return (
    <PageContainer>
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/guides', label: 'Guides' },
          { href: guide.href, label: guide.breadcrumbLabel },
        ]}
      />

      <article className={styles.articleContainer}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>{guide.eyebrow}</span>
          <h1 className={styles.title}>{guide.h1Title}</h1>
          <p className={styles.lead}>{guide.description}</p>
          <div className={styles.metaRow}>
            <span>By Energy Bill Lab Editorial Team</span>
            <span>•</span>
            <span>Reviewed for data accuracy</span>
            <span>•</span>
            <span>Updated {guide.updatedAt}</span>
          </div>
        </header>

        {guide.summaryTakeaways.length > 0 ? (
          <div className={styles.takeawayPanel}>
            <h2>Key Takeaways & Core Facts</h2>
            <ul>
              {guide.summaryTakeaways.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <main>{children}</main>

        <section className={styles.ctaCard}>
          <h3>{guide.primaryCalculatorLabel}</h3>
          <p>{guide.primaryCalculatorDescription}</p>
          <Link href={guide.primaryCalculatorHref} className={styles.ctaButton}>
            {guide.actionLabel} →
          </Link>
        </section>

        {guide.sources.length > 0 ? (
          <section className={styles.sourcesSection}>
            <h2>Government & Official Data Sources</h2>
            <ul className={styles.sourceList}>
              {guide.sources.map((src) => (
                <li key={src.url} className={styles.sourceItem}>
                  <strong>{src.organization}</strong> —{' '}
                  <a href={src.url} target="_blank" rel="noopener noreferrer">
                    {src.title}
                  </a>{' '}
                  ({src.topic})
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <DataSourceNote />
        <RelatedLinks links={guide.relatedRoutes} />
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(articleStructuredData) }}
      />
    </PageContainer>
  );
}
