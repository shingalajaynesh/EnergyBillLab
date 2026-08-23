'use client';

import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type {
  ApplianceCostComparisonItem,
  CalculateStateComparisonOutput,
} from '@energy-bill-lab/calculation-engine';

import styles from './state-comparator.module.css';

interface StateComparisonTableProps {
  comparison: CalculateStateComparisonOutput;
}

export function StateComparisonTable({ comparison }: StateComparisonTableProps) {
  const { stateA, stateB, electricity, naturalGas, totalHouseholdCombined, appliances } = comparison;

  // General rate comparison data rows
  const overviewRows = [
    {
      key: 'elec_rate',
      metric: 'Residential Electricity Rate',
      unit: '¢ / kWh',
      stateAValue: `${electricity.rateStateA.toFixed(2)} ¢`,
      stateBValue: `${electricity.rateStateB.toFixed(2)} ¢`,
      delta: `${Math.abs(electricity.rateDeltaCents).toFixed(2)} ¢ (${Math.abs(
        electricity.rateDeltaPercent
      ).toFixed(1)}%)`,
      winner:
        electricity.cheaperState === 'stateA'
          ? stateA.name
          : electricity.cheaperState === 'stateB'
            ? stateB.name
            : 'Tie',
    },
    {
      key: 'monthly_elec',
      metric: 'Monthly Electricity Bill',
      unit: 'Est. 900 kWh / mo',
      stateAValue: `$${electricity.monthlyBillStateA.toFixed(2)}`,
      stateBValue: `$${electricity.monthlyBillStateB.toFixed(2)}`,
      delta: `$${Math.abs(electricity.monthlyBillDifference).toFixed(2)} / mo`,
      winner:
        electricity.cheaperState === 'stateA'
          ? stateA.name
          : electricity.cheaperState === 'stateB'
            ? stateB.name
            : 'Tie',
    },
    {
      key: 'annual_elec',
      metric: 'Annual Electricity Expense',
      unit: 'Est. 10,800 kWh / yr',
      stateAValue: `$${(electricity.monthlyBillStateA * 12).toFixed(2)}`,
      stateBValue: `$${(electricity.monthlyBillStateB * 12).toFixed(2)}`,
      delta: `$${electricity.annualBillDifference.toFixed(2)} / yr`,
      winner:
        electricity.cheaperState === 'stateA'
          ? stateA.name
          : electricity.cheaperState === 'stateB'
            ? stateB.name
            : 'Tie',
    },
    ...(naturalGas.available && naturalGas.thermRateStateA && naturalGas.thermRateStateB
      ? [
          {
            key: 'gas_therm',
            metric: 'Residential Natural Gas Rate',
            unit: '$ / therm',
            stateAValue: `$${naturalGas.thermRateStateA.toFixed(2)}`,
            stateBValue: `$${naturalGas.thermRateStateB.toFixed(2)}`,
            delta: `$${Math.abs(naturalGas.thermDeltaDollars ?? 0).toFixed(2)} / therm`,
            winner:
              naturalGas.cheaperState === 'stateA'
                ? stateA.name
                : naturalGas.cheaperState === 'stateB'
                  ? stateB.name
                  : 'Tie',
          },
          {
            key: 'combined_monthly',
            metric: 'Combined Monthly Energy Bill',
            unit: 'Elec (900 kWh) + Gas (60 therms)',
            stateAValue: `$${totalHouseholdCombined.monthlyCombinedStateA.toFixed(2)}`,
            stateBValue: `$${totalHouseholdCombined.monthlyCombinedStateB.toFixed(2)}`,
            delta: `$${Math.abs(totalHouseholdCombined.monthlyCombinedDifference).toFixed(2)} / mo`,
            winner:
              totalHouseholdCombined.cheaperState === 'stateA'
                ? stateA.name
                : totalHouseholdCombined.cheaperState === 'stateB'
                  ? stateB.name
                  : 'Tie',
          },
        ]
      : []),
  ];

  const overviewColumns: ColumnsType<(typeof overviewRows)[0]> = [
    {
      title: 'Energy Metric',
      dataIndex: 'metric',
      key: 'metric',
      render: (text, record) => (
        <div>
          <strong style={{ color: '#1f1f1f' }}>{text}</strong>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>{record.unit}</div>
        </div>
      ),
    },
    {
      title: stateA.name,
      dataIndex: 'stateAValue',
      key: 'stateAValue',
      align: 'right',
      render: (val, record) => (
        <span
          style={{
            fontWeight: record.winner === stateA.name ? 700 : 500,
            color: record.winner === stateA.name ? '#389e0d' : '#1f1f1f',
          }}
        >
          {val}
        </span>
      ),
    },
    {
      title: stateB.name,
      dataIndex: 'stateBValue',
      key: 'stateBValue',
      align: 'right',
      render: (val, record) => (
        <span
          style={{
            fontWeight: record.winner === stateB.name ? 700 : 500,
            color: record.winner === stateB.name ? '#389e0d' : '#1f1f1f',
          }}
        >
          {val}
        </span>
      ),
    },
    {
      title: 'Difference',
      dataIndex: 'delta',
      key: 'delta',
      align: 'right',
    },
    {
      title: 'Lower Cost',
      dataIndex: 'winner',
      key: 'winner',
      align: 'center',
      render: (winner) => (
        <Tag color={winner === 'Tie' ? 'default' : 'success'}>{winner}</Tag>
      ),
    },
  ];

  const applianceColumns: ColumnsType<ApplianceCostComparisonItem> = [
    {
      title: 'Appliance / Equipment',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <strong style={{ color: '#1f1f1f' }}>{text}</strong>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>{record.baselineUnitLabel}</div>
        </div>
      ),
    },
    {
      title: `${stateA.name} Cost`,
      dataIndex: 'stateACost',
      key: 'stateACost',
      align: 'right',
      render: (_: unknown, record: ApplianceCostComparisonItem) => (
        <span
          style={{
            fontWeight: record.cheaperState === 'stateA' ? 700 : 500,
            color: record.cheaperState === 'stateA' ? '#389e0d' : '#1f1f1f',
          }}
        >
          ${record.stateACost.toFixed(2)}
        </span>
      ),
    },
    {
      title: `${stateB.name} Cost`,
      dataIndex: 'stateBCost',
      key: 'stateBCost',
      align: 'right',
      render: (_: unknown, record: ApplianceCostComparisonItem) => (
        <span
          style={{
            fontWeight: record.cheaperState === 'stateB' ? 700 : 500,
            color: record.cheaperState === 'stateB' ? '#389e0d' : '#1f1f1f',
          }}
        >
          ${record.stateBCost.toFixed(2)}
        </span>
      ),
    },
    {
      title: 'Dollar Gap',
      dataIndex: 'differenceDollars',
      key: 'differenceDollars',
      align: 'right',
      render: (_: unknown, record: ApplianceCostComparisonItem) => (
        <span>${record.differenceDollars.toFixed(2)}</span>
      ),
    },
    {
      title: 'Cheaper Location',
      key: 'cheaperState',
      align: 'center',
      render: (_, record) => {
        const winner =
          record.cheaperState === 'stateA'
            ? stateA.name
            : record.cheaperState === 'stateB'
              ? stateB.name
              : 'Tie';
        return <Tag color="success">{winner}</Tag>;
      },
    },
  ];

  return (
    <div>
      {/* 1. Rates & Household Bills Overview Table */}
      <div className={styles.tableSection}>
        <h3 className={styles.tableSectionTitle}>State-to-State Energy Bill Comparison</h3>
        <Table
          columns={overviewColumns}
          dataSource={overviewRows}
          pagination={false}
          bordered
          size="middle"
          scroll={{ x: 600 }}
        />
      </div>

      {/* 2. Major Appliance Operating Cost Matrix */}
      <div className={styles.tableSection}>
        <h3 className={styles.tableSectionTitle}>
          Appliance Operating Cost Matrix ({stateA.name} vs. {stateB.name})
        </h3>
        <Table
          columns={applianceColumns}
          dataSource={appliances}
          rowKey="id"
          pagination={false}
          bordered
          size="middle"
          scroll={{ x: 600 }}
        />
      </div>
    </div>
  );
}
