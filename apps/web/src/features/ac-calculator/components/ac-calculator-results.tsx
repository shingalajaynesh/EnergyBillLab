'use client';

import type { AcCostResult } from '@energy-bill-lab/calculation-engine';
import { Table } from 'antd';
import React from 'react';

import styles from './ac-calculator-results.module.css';

type AcCalculatorResultsProps = {
  result: AcCostResult;
  periodDays: number;
};

export function AcCalculatorResults({ result, periodDays }: AcCalculatorResultsProps) {
  const isMonthBaseline = periodDays === 30;
  const isAnnualBaseline = periodDays === 365;

  const scenarioColumns = [
    {
      title: 'Scenario',
      dataIndex: 'label',
      key: 'label',
      render: (text: string, record: { description: string }) => (
        <div>
          <strong>{text}</strong>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Estimated kWh',
      dataIndex: 'periodKwh',
      key: 'periodKwh',
      render: (val: number) => `${val.toFixed(1)} kWh`,
    },
    {
      title: `Cost (${periodDays} Days)`,
      dataIndex: 'periodCostUsd',
      key: 'periodCostUsd',
      render: (val: number) => `$${val.toFixed(2)}`,
    },
    {
      title: 'Cost Difference',
      dataIndex: 'differenceUsd',
      key: 'differenceUsd',
      render: (val: number) => {
        if (val === 0) return <span style={{ color: '#595959' }}>Baseline</span>;
        const formatted = Math.abs(val).toFixed(2);
        return val < 0 ? (
          <span style={{ color: '#389e0d', fontWeight: 600 }}>Save ${formatted}</span>
        ) : (
          <span style={{ color: '#cf1322', fontWeight: 600 }}>+${formatted}</span>
        );
      },
    },
  ];

  return (
    <div className={styles.resultsContainer}>
      {/* Primary Result Banner */}
      <div className={styles.primaryResultCard}>
        <div className={styles.primaryTitle}>Estimated AC Operating Cost ({periodDays} Days)</div>
        <div className={styles.primaryValue}>${result.periodCostUsd.toFixed(2)} USD</div>
        <div className={styles.primarySubtext}>
          Total cooling energy: <strong>{result.periodKwh.toFixed(2)} kWh</strong> @{' '}
          {result.rateCentsPerKwhUsed.toFixed(2)}¢/kWh rate ({result.dutyCyclePercentUsed}%
          compressor duty cycle)
        </div>
      </div>

      {/* Breakdown Metrics Grid */}
      <div className={styles.grid}>
        {/* Daily Metric */}
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Daily Cooling Cost</div>
          <div className={styles.metricVal}>${result.dailyCostUsd.toFixed(2)} / day</div>
          <div className={styles.metricDetail}>{result.dailyKwh.toFixed(2)} kWh / day</div>
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

        {/* Electrical Input & Duty Cycle Power Draw */}
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Electrical Input Power</div>
          <div className={styles.metricVal}>{result.inputWatts} W</div>
          <div className={styles.metricDetail}>
            Active Draw ({result.dutyCyclePercentUsed}% Duty): {result.effectiveWatts} W (
            {result.hourlyKwh.toFixed(2)} kWh/hr)
          </div>
        </div>
      </div>

      {/* Cost Scenarios Table */}
      <div className={styles.scenarioSection}>
        <div className={styles.scenarioTitle}>Runtime & Thermostat Optimization Scenarios</div>
        <Table
          columns={scenarioColumns}
          dataSource={result.scenarios.map((s, idx) => ({ ...s, key: idx }))}
          pagination={false}
          size="small"
        />
        <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 8 }}>
          * Estimates based on entered parameters. Actual utility savings depend on ambient outdoor
          temperature, home insulation, thermostat settings, and equipment age.
        </div>
      </div>
    </div>
  );
}
