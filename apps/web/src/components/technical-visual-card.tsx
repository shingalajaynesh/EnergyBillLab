import React, { type ReactNode } from 'react';

import styles from './technical-visual-card.module.css';

export interface VisualBarItem {
  badge?: string;
  color?: 'primary' | 'success' | 'warning' | 'neutral' | 'danger';
  displayValue: string;
  highlight?: boolean;
  label: string;
  subLabel?: string;
  value: number; // 0 to 100 relative percentage or absolute unit scaled against maxValue
}

export interface TechnicalVisualCardProps {
  badge?: string;
  badgeType?: 'primary' | 'success' | 'neutral';
  children?: ReactNode;
  footerNote?: string;
  items?: VisualBarItem[];
  maxValue?: number;
  subtitle?: string;
  title: string;
}

export function TechnicalVisualCard({
  title,
  subtitle,
  badge,
  badgeType = 'neutral',
  items,
  maxValue,
  footerNote,
  children,
}: TechnicalVisualCardProps) {
  // If maxValue is not supplied, determine from max value in items
  const computedMax =
    maxValue ?? (items && items.length > 0 ? Math.max(...items.map((i) => i.value)) : 100);

  const badgeClass =
    badgeType === 'success'
      ? `${styles.badge} ${styles.badgeSuccess}`
      : badgeType === 'primary'
        ? `${styles.badge} ${styles.badgePrimary}`
        : styles.badge;

  return (
    <figure
      className={styles.card}
      role="img"
      aria-label={`${title}${subtitle ? `: ${subtitle}` : ''}`}
    >
      <figcaption className={styles.header}>
        <div className={styles.topRow}>
          <h3 className={styles.title}>{title}</h3>
          {badge ? <span className={badgeClass}>{badge}</span> : null}
        </div>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </figcaption>

      {items && items.length > 0 ? (
        <div className={styles.barList}>
          {items.map((item, idx) => {
            const pct = Math.min(100, Math.max(4, Math.round((item.value / computedMax) * 100)));
            const colorClass =
              item.color === 'success'
                ? styles.fillSuccess
                : item.color === 'warning'
                  ? styles.fillWarning
                  : item.color === 'danger'
                    ? styles.fillDanger
                    : item.color === 'neutral'
                      ? styles.fillNeutral
                      : styles.fillPrimary;

            return (
              <div key={idx} className={styles.barItem}>
                <div className={styles.barMeta}>
                  <span
                    className={
                      item.highlight
                        ? `${styles.barLabel} ${styles.barLabelHighlight}`
                        : styles.barLabel
                    }
                  >
                    {item.label}
                    {item.badge ? (
                      <span
                        style={{
                          marginLeft: '0.4rem',
                          fontSize: '0.72rem',
                          padding: '0.1rem 0.35rem',
                          borderRadius: '3px',
                          background: item.highlight ? '#ecfdf5' : '#f1f5f9',
                          color: item.highlight ? '#047857' : '#475569',
                          fontWeight: 600,
                        }}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </span>
                  <span className={styles.barValue}>{item.displayValue}</span>
                </div>

                <div className={styles.barTrack} aria-hidden="true">
                  <div className={`${styles.barFill} ${colorClass}`} style={{ width: `${pct}%` }} />
                </div>

                {item.subLabel ? <div className={styles.barSubtext}>{item.subLabel}</div> : null}
              </div>
            );
          })}
        </div>
      ) : null}

      {children}

      {footerNote ? <div className={styles.footerNote}>{footerNote}</div> : null}
    </figure>
  );
}
