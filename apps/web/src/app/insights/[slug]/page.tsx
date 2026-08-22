import React from 'react';
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
import { createInsightArticleStructuredData, serializeStructuredData } from '@/lib/structured-data';

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

type RenderBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'table'; caption?: string; headers: string[]; rows: string[][] };

function parseParagraphBlocks(paragraphs: string[]): RenderBlock[] {
  const blocks: RenderBlock[] = [];
  let i = 0;

  const isTableLine = (line: string) => {
    const trimmed = line.trim();
    return trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.length > 2;
  };

  const isSeparatorRow = (rowCells: string[]) => {
    return rowCells.every((cell) => /^:?-+:?$/.test(cell.trim()));
  };

  const parseCells = (line: string) => {
    const trimmed = line.trim();
    const inner = trimmed.slice(1, -1);
    return inner.split('|').map((c) => c.trim());
  };

  while (i < paragraphs.length) {
    const current = paragraphs[i]!;

    if (isTableLine(current)) {
      const tableLines: string[] = [];
      while (i < paragraphs.length && isTableLine(paragraphs[i]!)) {
        tableLines.push(paragraphs[i]!);
        i++;
      }

      if (tableLines.length >= 2) {
        let caption: string | undefined = undefined;
        if (
          blocks.length > 0 &&
          blocks[blocks.length - 1]?.type === 'paragraph' &&
          /^Table(\s+\d+)?:/i.test(
            (blocks[blocks.length - 1] as { type: 'paragraph'; text: string }).text.trim(),
          )
        ) {
          caption = (blocks.pop() as { type: 'paragraph'; text: string }).text.trim();
        }

        const headerCells = parseCells(tableLines[0]!);
        const dataRows: string[][] = [];

        for (let r = 1; r < tableLines.length; r++) {
          const cells = parseCells(tableLines[r]!);
          if (isSeparatorRow(cells)) {
            continue;
          }
          dataRows.push(cells);
        }

        blocks.push({
          type: 'table',
          caption,
          headers: headerCells,
          rows: dataRows,
        });
      } else {
        blocks.push({ type: 'paragraph', text: tableLines[0]! });
      }
    } else {
      blocks.push({ type: 'paragraph', text: current });
      i++;
    }
  }

  return blocks;
}

function renderContentBlocks(paragraphs: string[]) {
  const blocks = parseParagraphBlocks(paragraphs);

  return blocks.map((block, idx) => {
    if (block.type === 'table') {
      return (
        <div key={idx} className={styles.tableWrapper}>
          <table className={styles.dataTable}>
            {block.caption ? <caption>{block.caption}</caption> : null}
            <thead>
              <tr>
                {block.headers.map((h, hIdx) => (
                  <th key={hIdx} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return <p key={idx}>{block.text}</p>;
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
            {article.bodyParagraphs ? renderContentBlocks(article.bodyParagraphs) : null}

            {article.sections
              ? article.sections.map((sec, idx) => (
                  <div key={idx}>
                    <h2>{sec.heading}</h2>
                    {renderContentBlocks(sec.paragraphs)}
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
