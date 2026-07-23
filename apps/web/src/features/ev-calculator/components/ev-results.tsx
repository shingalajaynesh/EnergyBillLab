'use client';

import type { EvChargingCostResult } from '@energy-bill-lab/calculation-engine';
import { Table } from 'antd';
import React from 'react';

import styles from './ev-results.module.css';

type EvResultsProps = {
  result: EvChargingCostResult;
};

export function EvResults({ result }: EvResultsProps) {
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
      title: 'Grid Energy Required',
      dataIndex: 'gridEnergyRequiredKwh',
      key: 'gridEnergyRequiredKwh',
      render: (val: number) => `${val.toFixed(1)} kWh`,
    },
    {
      title: 'Session Cost',
      dataIndex: 'chargeCostUsd',
      key: 'chargeCostUsd',
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
        <div className={styles.primaryTitle}>Estimated Home EV Charging Session Cost</div>
        <div className={styles.primaryValue}>${result.chargeCostUsd.toFixed(2)} USD</div>
        <div className={styles.primarySubtext}>
          Total grid electricity drawn:{' '}
          <strong>{result.gridEnergyRequiredKwh.toFixed(2)} kWh</strong> (
          {result.batteryPercentAdded}% charge added to {result.batteryCapacityKwh} kWh battery @{' '}
          {result.rateCentsPerKwhUsed.toFixed(2)}¢/kWh, {result.chargingEfficiencyPercentUsed}%
          efficiency)
        </div>
      </div>

      {/* Metrics Grid */}
      <div className={styles.grid}>
        {/* Net Battery Energy Added */}
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Net Battery Energy Added</div>
          <div className={styles.metricVal}>{result.batteryEnergyAddedKwh.toFixed(2)} kWh</div>
          <div className={styles.metricDetail}>
            {result.startingChargePercent}% to {result.targetChargePercent}% (
            {result.batteryPercentAdded}% added)
          </div>
        </div>

        {/* Grid Charging Losses */}
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Grid Charging Losses</div>
          <div className={styles.metricVal}>{result.chargingLossKwh.toFixed(2)} kWh</div>
          <div className={styles.metricDetail}>
            {100 - result.chargingEfficiencyPercentUsed}% lost to heat / conversion
          </div>
        </div>

        {/* Cost per 1% SoC */}
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Cost per 1% Battery Charge</div>
          <div className={styles.metricVal}>${result.costPerPercentUsd.toFixed(4)}</div>
          <div className={styles.metricDetail}>
            {(result.costPerPercentUsd * 10).toFixed(2)}¢ per 1% added
          </div>
        </div>

        {/* Optional Driving Cost per Mile */}
        {result.drivingMetrics && (
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Driving Energy Cost per Mile</div>
            <div className={styles.metricVal}>
              ${result.drivingMetrics.costPerMileUsd.toFixed(4)} / mi
            </div>
            <div className={styles.metricDetail}>
              ${result.drivingMetrics.costPer100MilesUsd.toFixed(2)} per 100 miles (@{' '}
              {result.drivingMetrics.milesPerKwh} mi/kWh)
            </div>
          </div>
        )}

        {/* Optional Monthly Driving Cost */}
        {result.drivingMetrics && (
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Standard Monthly (1,000 mi)</div>
            <div className={styles.metricVal}>
              ${result.drivingMetrics.monthlyDrivingCostUsd.toFixed(2)} / mo
            </div>
            <div className={styles.metricDetail}>
              {result.drivingMetrics.monthlyDrivingGridKwh.toFixed(1)} kWh grid / month
            </div>
          </div>
        )}
      </div>

      {/* Comparison Scenarios Table */}
      <div className={styles.scenarioSection}>
        <div className={styles.scenarioTitle}>EV Home Charging Cost Comparison Scenarios</div>
        <Table
          columns={scenarioColumns}
          dataSource={result.scenarios.map((s, idx) => ({ ...s, key: idx }))}
          pagination={false}
          size="small"
        />
        <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 8 }}>
          * Estimated difference based on the entered assumptions. Actual charging cost depends on
          vehicle model, charger level, ambient temperature, battery conditioning, and utility
          tariff structure.
        </div>
      </div>
    </div>
  );
}
