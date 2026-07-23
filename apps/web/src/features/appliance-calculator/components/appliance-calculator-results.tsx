'use client';

import type { ApplianceCostResult } from '@energy-bill-lab/calculation-engine';
import React from 'react';

import styles from './appliance-calculator-results.module.css';

type ApplianceCalculatorResultsProps = {
  result: ApplianceCostResult;
  periodDays: number;
};

export function ApplianceCalculatorResults({
  result,
  periodDays,
}: ApplianceCalculatorResultsProps) {
  const isMonthBaseline = periodDays === 30;
  const isAnnualBaseline = periodDays === 365;

  return (
    <div className={styles.resultsContainer}>
      {/* Primary Result Banner */}
      <div className={styles.primaryResultCard}>
        <div className={styles.primaryTitle}>Estimated Operating Cost ({periodDays} Days)</div>
        <div className={styles.primaryValue}>${result.periodCostUsd.toFixed(2)} USD</div>
        <div className={styles.primarySubtext}>
          Total energy consumed: <strong>{result.periodKwh.toFixed(2)} kWh</strong> @{' '}
          {result.rateCentsPerKwhUsed.toFixed(2)}¢/kWh rate ({result.dutyCyclePercentUsed}% duty
          cycle)
        </div>
      </div>

      {/* Breakdown Cards Grid */}
      <div className={styles.grid}>
        {/* Daily Metric */}
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Daily Operating Cost</div>
          <div className={styles.metricVal}>${result.dailyCostUsd.toFixed(2)} / day</div>
          <div className={styles.metricDetail}>{result.dailyKwh.toFixed(2)} kWh per day</div>
        </div>

        {/* Monthly Baseline Metric */}
        {!isMonthBaseline && (
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Standard Monthly (30-Day)</div>
            <div className={styles.metricVal}>${result.monthlyCostUsd.toFixed(2)} / mo</div>
            <div className={styles.metricDetail}>{result.monthlyKwh.toFixed(2)} kWh / month</div>
          </div>
        )}

        {/* Annual Baseline Metric */}
        {!isAnnualBaseline && (
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Estimated Annual (365-Day)</div>
            <div className={styles.metricVal}>${result.annualCostUsd.toFixed(2)} / yr</div>
            <div className={styles.metricDetail}>{result.annualKwh.toFixed(2)} kWh / year</div>
          </div>
        )}

        {/* Active Power Draw */}
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Effective Power Draw</div>
          <div className={styles.metricVal}>{result.effectiveWatts} W</div>
          <div className={styles.metricDetail}>{result.hourlyKwh.toFixed(3)} kWh per active hr</div>
        </div>
      </div>
    </div>
  );
}
