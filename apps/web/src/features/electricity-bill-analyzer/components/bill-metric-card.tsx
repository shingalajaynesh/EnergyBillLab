import React from 'react';

import styles from './bill-metric-card.module.css';

type BillMetricCardProps = {
  label: string;
  value: string;
  subtext?: string;
  badge?: string;
  highlight?: boolean;
};

export function BillMetricCard({
  badge,
  highlight = false,
  label,
  subtext,
  value,
}: BillMetricCardProps) {
  return (
    <div className={`${styles.card} ${highlight ? styles.highlight : ''}`}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {badge ? <span className={styles.badge}>{badge}</span> : null}
      </div>
      <div className={styles.value}>{value}</div>
      {subtext ? <div className={styles.subtext}>{subtext}</div> : null}
    </div>
  );
}
