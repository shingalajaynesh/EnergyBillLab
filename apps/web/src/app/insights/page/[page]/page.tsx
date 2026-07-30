import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { getPublishedInsights, INSIGHT_CATEGORIES } from '@/content/insights';
import { createPageMetadata } from '@/lib/metadata';

import hubStyles from '../../insights-hub.module.css';

const PAGE_SIZE = 12;

type PaginationPageProps = {
  params: Promise<{
    page: string;
  }>;
};

export async function generateMetadata(props: PaginationPageProps): Promise<Metadata> {
  const { page } = await props.params;
  const pageNum = parseInt(page, 10);
  const published = getPublishedInsights();
  const totalPages = Math.ceil(published.length / PAGE_SIZE);

  if (isNaN(pageNum) || pageNum <= 1 || pageNum > totalPages) {
    return createPageMetadata({
      title: 'Page Not Found',
      description: 'The requested pagination page does not exist.',
      path: `/insights/page/${page}` as `/${string}`,
    });
  }

  return {
    ...createPageMetadata({
      title: `Energy Insights — Page ${pageNum}`,
      description: `Browse archive page ${pageNum} of data-driven U.S. residential energy insights and rate reports.`,
      path: `/insights/page/${pageNum}`,
    }),
    robots: { index: true, follow: true },
  };
}

export default async function InsightsPaginationPage(props: PaginationPageProps) {
  const { page } = await props.params;

  if (/[^0-9]/.test(page)) {
    notFound();
  }

  const pageNum = parseInt(page, 10);

  if (isNaN(pageNum) || pageNum <= 0) {
    notFound();
  }

  if (pageNum === 1) {
    permanentRedirect('/insights');
  }

  const published = getPublishedInsights();
  const totalPages = Math.ceil(published.length / PAGE_SIZE);

  if (published.length <= PAGE_SIZE || pageNum > totalPages) {
    notFound();
  }

  const startIndex = (pageNum - 1) * PAGE_SIZE;
  const pageArticles = published.slice(startIndex, startIndex + PAGE_SIZE);

  const breadcrumbItems = [
    { href: '/' as const, label: 'Home' },
    { href: '/insights' as const, label: 'Insights' },
    { href: `/insights/page/${pageNum}` as const, label: `Page ${pageNum}` },
  ];

  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbItems} />
      <PageHeader
        eyebrow="Energy Insights Archive"
        title={`Energy Insights — Page ${pageNum}`}
        description={`Page ${pageNum} of ${totalPages} containing dated data-driven analysis of U.S. energy rates and household costs.`}
      />

      <div className={hubStyles.container}>
        <section className={hubStyles.grid} aria-label={`Insights Page ${pageNum}`}>
          {pageArticles.map((article) => (
            <article key={article.id} className={hubStyles.articleCard}>
              <span className={hubStyles.cardCategory}>
                {INSIGHT_CATEGORIES[article.category]?.name || article.category}
              </span>
              <Link className={hubStyles.cardTitle} href={`/insights/${article.slug}`}>
                {article.title}
              </Link>
              <p className={hubStyles.cardSummary}>{article.summary}</p>
              <div className={hubStyles.cardMeta}>
                <span>Published: {article.publishedAt}</span>
                {article.reportingPeriod ? <span> • Period: {article.reportingPeriod}</span> : null}
              </div>
            </article>
          ))}
        </section>

        <nav
          aria-label="Archive pagination"
          style={{ display: 'flex', gap: '16px', marginTop: '24px' }}
        >
          {pageNum > 2 ? (
            <Link className={hubStyles.emptyStateLink} href={`/insights/page/${pageNum - 1}`}>
              ← Previous Page
            </Link>
          ) : (
            <Link className={hubStyles.emptyStateLink} href="/insights">
              ← First Page
            </Link>
          )}

          {pageNum < totalPages ? (
            <Link className={hubStyles.emptyStateLink} href={`/insights/page/${pageNum + 1}`}>
              Next Page →
            </Link>
          ) : null}
        </nav>
      </div>
    </PageContainer>
  );
}
