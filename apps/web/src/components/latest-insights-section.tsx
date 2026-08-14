import Link from 'next/link';

import {
  formatHumanDate,
  getPublishedInsights,
  INSIGHT_CATEGORIES,
  isInsightsHubEligible,
} from '@/content/insights';

import styles from './latest-insights-section.module.css';

export function LatestInsightsSection() {
  if (!isInsightsHubEligible()) {
    return null;
  }

  const latestThree = getPublishedInsights().slice(0, 3);

  if (latestThree.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="latest-insights-heading">
      <div className={styles.headerRow}>
        <h2 id="latest-insights-heading" className={styles.heading}>
          Latest Energy Insights
        </h2>
        <Link className={styles.viewAll} href="/insights">
          View all Insights &rarr;
        </Link>
      </div>

      <div className={styles.grid}>
        {latestThree.map((article) => (
          <article key={article.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.category}>
                {INSIGHT_CATEGORIES[article.category]?.name || article.category}
              </span>
              <span className={styles.date}>{formatHumanDate(article.publishedAt)}</span>
            </div>
            <Link className={styles.title} href={`/insights/${article.slug}`}>
              {article.title}
            </Link>
            <p className={styles.summary}>{article.summary}</p>
            <div className={styles.cardFooter}>
              {article.reportingPeriod ? (
                <span className={styles.period} title={article.reportingPeriod}>
                  Data: {article.reportingPeriod}
                </span>
              ) : (
                <span />
              )}
              <Link className={styles.readMoreLink} href={`/insights/${article.slug}`}>
                Read Entire Insight →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
