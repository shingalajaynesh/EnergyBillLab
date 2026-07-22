import React from 'react';

import { formatCurrency, formatKwh, formatPercent } from '../lib/format-calculator-values';
import type { ComparisonDecomposition } from '../types/electricity-bill-types';

import styles from './bill-comparison-breakdown.module.css';

type BillComparisonBreakdownProps = {
  comparison: ComparisonDecomposition;
};

export function BillComparisonBreakdown({ comparison }: BillComparisonBreakdownProps) {
  const {
    adjustedExpectedCurrentKwh,
    billChangeDollar,
    billChangePercent,
    daysDifference,
    estimatedRateFeeOtherEffectDollar,
    estimatedUsageEffectDollar,
    normalizedKwhDifference,
    reconciliationReconciles,
  } = comparison;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Decomposed Bill Difference</h3>
      <p className={styles.description}>
        This breakdown isolates normalized usage changes from effective rate, fee, tax, and charge
        variances.
      </p>

      <div className={styles.summaryBox}>
        <div className={styles.totalRow}>
          <span>Total Bill Difference</span>
          <strong className={billChangeDollar > 0 ? styles.positive : styles.negative}>
            {formatCurrency(billChangeDollar, true)} ({formatPercent(billChangePercent, true)})
          </strong>
        </div>

        {daysDifference !== 0 ? (
          <div className={styles.noteRow}>
            <span>Billing Day Adjustment</span>
            <small>
              Current period is {Math.abs(daysDifference)}{' '}
              {daysDifference > 0 ? 'days longer' : 'days shorter'}. Expected current baseline
              usage: {formatKwh(adjustedExpectedCurrentKwh)}.
            </small>
          </div>
        ) : null}
      </div>

      <div className={styles.breakdownGrid}>
        <div className={styles.itemCard}>
          <div className={styles.itemHeader}>
            <span>1. Usage-Related Change</span>
            <span className={styles.kwhBadge}>{formatKwh(normalizedKwhDifference, true)}</span>
          </div>
          <div className={styles.itemValue}>{formatCurrency(estimatedUsageEffectDollar, true)}</div>
          <p className={styles.itemExplain}>
            Calculated by applying the previous baseline rate to your billing-day-adjusted usage
            change ({formatKwh(normalizedKwhDifference, true)}).
          </p>
        </div>

        <div className={styles.itemCard}>
          <div className={styles.itemHeader}>
            <span>2. Rate, Fee & Other Change</span>
            <span className={styles.feeBadge}>Effective Cost & Surcharges</span>
          </div>
          <div className={styles.itemValue}>
            {formatCurrency(estimatedRateFeeOtherEffectDollar, true)}
          </div>
          <p className={styles.itemExplain}>
            Calculated as the remaining bill difference from effective supply rate adjustments,
            customer charges, fuel riders, taxes, or credits.
          </p>
        </div>
      </div>

      {reconciliationReconciles ? (
        <div className={styles.reconciliationNotice}>
          <span className={styles.checkIcon}>&check;</span> Exact Reconciliation:{' '}
          {formatCurrency(estimatedUsageEffectDollar, true)} (Usage) +{' '}
          {formatCurrency(estimatedRateFeeOtherEffectDollar, true)} (Rate/Fee) ={' '}
          {formatCurrency(billChangeDollar, true)} (Total Bill Change).
        </div>
      ) : null}
    </div>
  );
}
