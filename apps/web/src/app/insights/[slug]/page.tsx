import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageContainer } from '@/components/page-container';
import { RelatedLinks } from '@/components/related-links';
import { TechnicalVisualCard } from '@/components/technical-visual-card';
import {
  formatHumanDate,
  getInsightBySlug,
  getPublishedInsights,
  INSIGHT_CATEGORIES,
} from '@/content/insights';
import { INSIGHT_VISUAL_CONFIGS } from '@/content/insights/visuals';
import { getMaxValidPublicationDate } from '@/lib/insights-validation';
import { createPageMetadata } from '@/lib/metadata';
import {
  createInsightArticleStructuredData,
  serializeStructuredData,
} from '@/lib/structured-data';

import styles from './insight-article.module.css';

type InsightPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  const published = getPublishedInsights();
  return published.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(props: InsightPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getInsightBySlug(slug);
  const maxValidDate = getMaxValidPublicationDate();

  if (
    !article ||
    article.status !== 'published' ||
    article.noindex ||
    article.publishedAt.slice(0, 10) > maxValidDate
  ) {
    return createPageMetadata({
      title: 'Insight Not Found',
      description: 'The requested energy insight is unavailable.',
      path: `/insights/${slug}` as `/${string}`,
    });
  }

  return createPageMetadata({
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.summary,
    path: `/insights/${article.slug}` as `/${string}`,
  });
}

export default async function InsightDetailPage(props: InsightPageProps) {
  const { slug } = await props.params;
  const article = getInsightBySlug(slug);
  const maxValidDate = getMaxValidPublicationDate();

  if (
    !article ||
    article.status !== 'published' ||
    article.noindex ||
    article.publishedAt.slice(0, 10) > maxValidDate
  ) {
    notFound();
  }

  const breadcrumbItems = [
    { href: '/' as const, label: 'Home' },
    { href: '/insights' as const, label: 'Insights' },
    { href: `/insights/${article.slug}` as const, label: article.title },
  ];

  const articleSchema = createInsightArticleStructuredData({
    title: article.title,
    description: article.summary,
    path: `/insights/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    category: INSIGHT_CATEGORIES[article.category]?.name || article.category,
    image: article.featuredImage,
  });

  const visualConfig = INSIGHT_VISUAL_CONFIGS[article.slug];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(articleSchema) }}
      />

      <PageContainer>
        <Breadcrumbs items={breadcrumbItems} />

        <article className={styles.article}>
          <header className={styles.header}>
            <span className={styles.categoryBadge}>
              {INSIGHT_CATEGORIES[article.category]?.name || article.category}
            </span>
            <h1 className={styles.h1}>{article.title}</h1>
            <div className={styles.metaRow}>
              <span className={styles.author}>
                By{' '}
                <Link
                  href="/authors/jaynesh-shingala"
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  Jaynesh Shingala
                </Link>
              </span>
              <span>Published {formatHumanDate(article.publishedAt)}</span>
              {article.updatedAt ? (
                <span> · Updated {formatHumanDate(article.updatedAt)}</span>
              ) : null}
              {article.reportingPeriod ? (
                <span> · Data period: {article.reportingPeriod}</span>
              ) : null}
            </div>
          </header>

          <div className={styles.summaryBox}>
            <div className={styles.summaryHeading}>Direct Answer & Summary</div>
            <p className={styles.summaryText}>{article.summary}</p>
          </div>

          {visualConfig ? (
            <TechnicalVisualCard
              title={visualConfig.title}
              subtitle={visualConfig.subtitle}
              badge={visualConfig.badge}
              badgeType={visualConfig.badgeType}
              items={visualConfig.items}
              footerNote={visualConfig.footerNote}
            />
          ) : null}

          {article.keyFindings && article.keyFindings.length > 0 ? (
            <div className={styles.keyFindings}>
              <h2 className={styles.findingsHeading}>Key Analytical Findings</h2>
              <ul className={styles.findingsList}>
                {article.keyFindings.map((finding, idx) => (
                  <li key={idx}>{finding}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className={styles.content}>
            {article.bodyParagraphs
              ? article.bodyParagraphs.map((para, idx) => <p key={idx}>{para}</p>)
              : null}

            {article.sections
              ? article.sections.map((sec, idx) => (
                  <div key={idx}>
                    <h2>{sec.heading}</h2>
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                ))
              : null}

            {article.practicalExample ? (
              <div className={styles.summaryBox}>
                <div className={styles.summaryHeading}>Household Bill Impact Example</div>
                <p className={styles.summaryText}>{article.practicalExample}</p>
              </div>
            ) : null}
          </div>

          {article.methodologyNotes ? (
            <section className={styles.methodology} aria-labelledby="methodology-heading">
              <h2 id="methodology-heading" className={styles.sectionHeading}>
                Data Methodology & Limits
              </h2>
              <p>{article.methodologyNotes}</p>
            </section>
          ) : null}

          {article.sources && article.sources.length > 0 ? (
            <section className={styles.sources} aria-labelledby="sources-heading">
              <h2 id="sources-heading" className={styles.sectionHeading}>
                Official Data Sources & Citations
              </h2>
              <ul className={styles.sourcesList}>
                {article.sources.map((src, idx) => (
                  <li key={idx} className={styles.sourceItem}>
                    <strong>{src.organization}</strong> —{' '}
                    <a
                      className={styles.sourceLink}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {src.title}
                    </a>
                    {src.topic ? ` (${src.topic})` : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {article.relatedRoutes && article.relatedRoutes.length > 0 ? (
            <RelatedLinks links={article.relatedRoutes} />
          ) : null}

          <div className={styles.corrections}>
            Data questions or source corrections:{' '}
            <a className={styles.correctionsLink} href="mailto:shingala.jaynesh@gmail.com">
              shingala.jaynesh@gmail.com
            </a>
          </div>
        </article>
      </PageContainer>
    </>
  );
}
