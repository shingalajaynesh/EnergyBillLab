import React from 'react';

import styles from './bill-insight-list.module.css';

type BillInsightListProps = {
  insights: string[];
  checklist: string[];
};

export function BillInsightList({ checklist, insights }: BillInsightListProps) {
  return (
    <div className={styles.container}>
      {insights.length > 0 ? (
        <div className={styles.section}>
          <h3 className={styles.title}>Calculation Insights</h3>
          <ul className={styles.insightList}>
            {insights.map((insight, idx) => (
              <li key={idx} className={styles.insightItem}>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {checklist.length > 0 ? (
        <div className={styles.section}>
          <h3 className={styles.title}>What to Check on Your Utility Statement</h3>
          <ol className={styles.checklist}>
            {checklist.map((item, idx) => (
              <li key={idx} className={styles.checkItem}>
                {item}
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
