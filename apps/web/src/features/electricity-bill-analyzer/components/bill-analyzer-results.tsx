'use client';

import { Alert, Button } from 'antd';
import React from 'react';

import { CLASSIFICATION_MESSAGES } from '../constants/electricity-bill-constants';
import { formatCurrency, formatKwh, formatRate } from '../lib/format-calculator-values';
import type { CalculationResult } from '../types/electricity-bill-types';

import { BillComparisonBreakdown } from './bill-comparison-breakdown';
import { BillInsightList } from './bill-insight-list';
import { BillMetricCard } from './bill-metric-card';
import { CalculatorDisclaimer } from './calculator-disclaimer';
import styles from './bill-analyzer-results.module.css';

type BillAnalyzerResultsProps = {
  result: CalculationResult;
  onReset: () => void;
};

export function BillAnalyzerResults({ onReset, result }: BillAnalyzerResultsProps) {
  const { comparison, current, checklist, insights } = result;

  const classification = comparison?.classification ?? 'NO_COMPARISON';
  const alertMessage = CLASSIFICATION_MESSAGES[classification];

  const alertType =
    classification === 'USAGE_PRIMARY' || classification === 'RATE_FEE_PRIMARY'
      ? 'warning'
      : classification === 'BOTH_SIGNIFICANT'
        ? 'error'
        : 'info';

  return (
    <div className={styles.container} id="calculator-results" tabIndex={-1}>
      <Alert
        className={styles.summaryAlert}
        description={alertMessage}
        message="Bill Analysis Summary"
        showIcon
        type={alertType}
      />

      <div className={styles.metricsGrid}>
        <BillMetricCard
          badge="All-In Cost"
          highlight
          label="Effective Cost per kWh"
          subtext="Includes total bill / total kWh"
          value={`${formatRate(current.allInEffectiveCostPerKwh)}/kWh`}
        />

        <BillMetricCard
          badge="Daily Average"
          label="Daily Electricity Use"
          subtext="Primary home usage benchmark"
          value={formatKwh(current.dailyUsageKwh)}
        />

        <BillMetricCard
          badge="30-Day Estimate"
          label="30-Day Normalized Usage"
          subtext={`Est. 30-day bill: ${formatCurrency(current.estimated30DayCost)}`}
          value={formatKwh(current.estimated30DayUsageKwh)}
        />

        {current.estimatedVariableCostPerKwh !== undefined ? (
          <BillMetricCard
            badge="Detailed Mode"
            label="Estimated Variable Rate"
            subtext={`Variable subtotal: ${formatCurrency(current.variableSubtotal ?? 0)}`}
            value={`${formatRate(current.estimatedVariableCostPerKwh)}/kWh`}
          />
        ) : null}
      </div>

      {comparison && comparison.hasComparison ? (
        <BillComparisonBreakdown comparison={comparison} />
      ) : null}

      <BillInsightList checklist={checklist} insights={insights} />

      <CalculatorDisclaimer />

      <div className={styles.actions}>
        <Button onClick={onReset} size="large" type="default">
          Reset Calculator
        </Button>
      </div>
    </div>
  );
}
