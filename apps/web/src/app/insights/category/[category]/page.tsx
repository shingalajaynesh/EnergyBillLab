import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import type { InsightCategory } from '@/content/insights';
import {
  formatHumanDate,
  getInsightsByCategory,
  INSIGHT_CATEGORIES,
  INSIGHTS_PUBLICATION_THRESHOLD,
} from '@/content/insights';
import { createPageMetadata } from '@/lib/metadata';

import hubStyles from '../../insights-hub.module.css';

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const { category } = await props.params;
  const meta = INSIGHT_CATEGORIES[category as InsightCategory];

  if (!meta) {
    return {
      ...createPageMetadata({
        title: 'Category Not Found',
        description: 'The requested insight category does not exist.',
        path: `/insights/category/${category}` as `/${string}`,
      }),
      robots: { index: false, follow: false },
    };
  }

  const articles = getInsightsByCategory(meta.slug);
  const isEligible = articles.length >= INSIGHTS_PUBLICATION_THRESHOLD;

  const baseMeta = createPageMetadata({
    title: `${meta.name} Energy Insights`,
    description: meta.description,
    path: `/insights/category/${meta.slug}`,
  });

  return {
    ...baseMeta,
    robots: isEligible ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function InsightCategoryPage(props: CategoryPageProps) {
  const { category } = await props.params;
  const catMeta = INSIGHT_CATEGORIES[category as InsightCategory];

  if (!catMeta) {
    notFound();
  }

  const articles = getInsightsByCategory(catMeta.slug);
  const isEligible = articles.length >= INSIGHTS_PUBLICATION_THRESHOLD;

  const breadcrumbItems = [
    { href: '/' as const, label: 'Home' },
    { href: '/insights' as const, label: 'Insights' },
    { href: `/insights/category/${catMeta.slug}` as const, label: catMeta.name },
  ];

  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbItems} />
      <PageHeader
        eyebrow="Energy Category Analysis"
        title={`${catMeta.name} Insights`}
        description={catMeta.description}
      />

      <div className={hubStyles.container}>
        {!isEligible ? (
          <section className={hubStyles.emptyStateCard} aria-labelledby="category-empty-title">
            <span className={hubStyles.emptyStateBadge}>Category Building Phase</span>
            <h2 id="category-empty-title" className={hubStyles.emptyStateHeading}>
              {catMeta.name} Insights Archive
            </h2>
            <p className={hubStyles.emptyStateText}>
              {catMeta.description} Analysis in this category is currently in research or data
              verification. Category archives require at least {INSIGHTS_PUBLICATION_THRESHOLD}{' '}
              published reports before search indexation to prevent thin content pages.
            </p>
            <div className={hubStyles.emptyStateStatus}>
              Status: {articles.length} of {INSIGHTS_PUBLICATION_THRESHOLD} required articles
              published • Page set to noindex.
            </div>
            <div className={hubStyles.emptyStateLinks}>
              <Link className={hubStyles.emptyStateLink} href="/insights">
                All Energy Insights
              </Link>
              <Link className={hubStyles.emptyStateLink} href="/data-sources">
                Data Sources
              </Link>
            </div>
          </section>
        ) : (
          <section className={hubStyles.grid} aria-label={`${catMeta.name} Insights`}>
            {articles.map((article) => (
              <article key={article.id} className={hubStyles.articleCard}>
                <div className={hubStyles.cardHeader}>
                  <span className={hubStyles.cardCategory}>{catMeta.name}</span>
                  <span className={hubStyles.cardDate}>{formatHumanDate(article.publishedAt)}</span>
                </div>
                <Link className={hubStyles.cardTitle} href={`/insights/${article.slug}`}>
                  {article.title}
                </Link>
                <p className={hubStyles.cardSummary}>{article.summary}</p>
                <div className={hubStyles.cardFooter}>
                  {article.reportingPeriod ? (
                    <span className={hubStyles.cardPeriod} title={article.reportingPeriod}>
                      Data: {article.reportingPeriod}
                    </span>
                  ) : (
                    <span />
                  )}
                  <Link className={hubStyles.readMoreLink} href={`/insights/${article.slug}`}>
                    Read Entire Insight →
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </PageContainer>
  );
}
