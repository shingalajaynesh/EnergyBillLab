'use client';

import { Tag } from 'antd';
import React from 'react';

import { formatCurrency, formatRate } from '../lib/format-calculator-values';

import styles from './state-comparison-card.module.css';

type StateComparisonCardProps = {
  stateName: string;
  userRate: number; // $/kWh
  stateEiaRateCents: number; // cents/kWh
  period: string; // YYYY-MM
  currentKwh: number;
  isVariableBasis?: boolean;
};

export function StateComparisonCard({
  currentKwh,
  isVariableBasis = false,
  period,
  stateEiaRateCents,
  stateName,
  userRate,
}: StateComparisonCardProps) {
  const userRateCents = userRate * 100;
  const rateDiffCents = userRateCents - stateEiaRateCents;
  const stateRateDollars = stateEiaRateCents / 100;
  const percentDiff = stateEiaRateCents > 0 ? (rateDiffCents / stateEiaRateCents) * 100 : 0;
  const estimatedCostDiff = (rateDiffCents / 100) * currentKwh;

  // Threshold: Near average if within +/- 5%
  const isNear = Math.abs(percentDiff) <= 5;
  const isAbove = percentDiff > 5;

  const tagColor = isNear ? 'blue' : isAbove ? 'orange' : 'green';
  const tagLabel = isNear
    ? 'Near Statewide Average'
    : isAbove
      ? 'Above Statewide Average'
      : 'Below Statewide Average';

  // Format period text (e.g. 2026-04 -> April 2026)
  const formatPeriodText = (rawPeriod?: string) => {
    if (!rawPeriod) return 'Latest Period';
    try {
      const parts = rawPeriod.split('-');
      const year = parseInt(parts[0] || '2026', 10);
      const month = parseInt(parts[1] || '1', 10);
      const date = new Date(year, month - 1, 1);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch {
      return rawPeriod;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{stateName} Residential Average Comparison</h3>
          <span className={styles.sourcePeriod}>
            Latest available EIA residential average: <strong>{formatPeriodText(period)}</strong>
          </span>
        </div>
        <Tag color={tagColor}>{tagLabel}</Tag>
      </div>

      <div className={styles.metricsRow}>
        <div className={styles.metricBox}>
          <div className={styles.metricLabel}>{stateName} EIA Avg Price</div>
          <div className={styles.metricValue}>{formatRate(stateRateDollars)}/kWh</div>
        </div>

        <div className={styles.metricBox}>
          <div className={styles.metricLabel}>
            Your {isVariableBasis ? 'Variable Rate' : 'Effective Rate'}
          </div>
          <div className={styles.metricValue}>{formatRate(userRate)}/kWh</div>
        </div>

        <div className={styles.metricBox}>
          <div className={styles.metricLabel}>Rate Difference</div>
          <div className={styles.metricValue}>
            {rateDiffCents >= 0 ? `+${rateDiffCents.toFixed(2)}¢` : `${rateDiffCents.toFixed(2)}¢`}{' '}
            <span style={{ fontSize: '0.875rem', fontWeight: 'normal' }}>
              ({percentDiff >= 0 ? `+${percentDiff.toFixed(1)}%` : `${percentDiff.toFixed(1)}%`})
            </span>
          </div>
        </div>
      </div>

      {Math.abs(estimatedCostDiff) >= 0.01 ? (
        <p style={{ margin: '0 0 12px 0', fontSize: '0.9375rem', color: '#182230' }}>
          At your current usage of <strong>{currentKwh.toLocaleString()} kWh</strong>, your rate
          difference represents approximately{' '}
          <strong>
            {estimatedCostDiff >= 0
              ? `+${formatCurrency(estimatedCostDiff)} more`
              : `${formatCurrency(estimatedCostDiff)} less`}
          </strong>{' '}
          than if billed at the statewide EIA residential average.
        </p>
      ) : null}

      <p className={styles.caveatText}>
        <strong>Important Caveat:</strong> This statewide average combines many utilities, rate
        plans, and seasonal variations. Your actual utility statement includes fixed customer
        charges, local taxes, regulatory riders, and tiered pricing structure.
      </p>

      <p className={styles.attribution}>
        Source: U.S. Energy Information Administration (EIA), Electricity Retail Sales, residential
        sector.
      </p>
    </div>
  );
}
