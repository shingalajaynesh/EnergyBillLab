'use client';

import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { FuelComparisonItem } from '@energy-bill-lab/calculation-engine';

import styles from './heating-fuel.module.css';

interface MmbtuBenchmarkTableProps {
  fuels: FuelComparisonItem[];
  annualDemandMbtu: number;
}

export function MmbtuBenchmarkTable({ fuels, annualDemandMbtu }: MmbtuBenchmarkTableProps) {
  const columns: ColumnsType<FuelComparisonItem> = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      width: 70,
      align: 'center',
      render: (rank: number, record: FuelComparisonItem) => (
        <Tag color={record.isLowest ? 'green' : 'default'} style={{ fontWeight: 700 }}>
          #{rank}
        </Tag>
      ),
    },
    {
      title: 'Heating System & Fuel Type',
      dataIndex: 'name',
      key: 'name',
      render: (_: unknown, record: FuelComparisonItem) => (
        <div>
          <div style={{ fontWeight: 600, color: record.isLowest ? '#16a34a' : '#0f172a' }}>
            {record.name}
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
            {record.efficiencyRating} • Unit Rate: {record.unitPriceDisplay}
          </div>
        </div>
      ),
    },
    {
      title: 'Cost per MMBtu Delivered',
      dataIndex: 'costPerMbtuDeliveredDollars',
      key: 'costPerMbtuDeliveredDollars',
      align: 'right',
      width: 170,
      render: (cost: number, record: FuelComparisonItem) => (
        <span
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: record.isLowest ? '#16a34a' : '#1e293b',
          }}
        >
          ${cost.toFixed(2)} / MMBtu
        </span>
      ),
    },
    {
      title: `Annual Cost (${annualDemandMbtu} MMBtu)`,
      dataIndex: 'annualHeatingCostDollars',
      key: 'annualHeatingCostDollars',
      align: 'right',
      width: 170,
      render: (cost: number, record: FuelComparisonItem) => (
        <span
          style={{
            fontWeight: 700,
            color: record.isLowest ? '#16a34a' : '#0f172a',
          }}
        >
          ${cost.toLocaleString()}/yr
        </span>
      ),
    },
    {
      title: 'Annual Spread vs Lowest',
      dataIndex: 'differenceVsLowestDollars',
      key: 'differenceVsLowestDollars',
      align: 'right',
      width: 160,
      render: (diff: number) =>
        diff === 0 ? (
          <Tag color="success" style={{ fontWeight: 600 }}>
            Lowest Cost Winner
          </Tag>
        ) : (
          <span style={{ color: '#e11d48', fontWeight: 600 }}>
            +${diff.toLocaleString()}/yr
          </span>
        ),
    },
  ];

  return (
    <div className={styles.tableSection}>
      <h3 className={styles.sectionHeading}>Delivered Fuel Cost & Heating System Ranking</h3>
      <p className={styles.sectionSub}>
        Comparing 1 Million BTU (MMBtu) of delivered thermal heat energy accounting for system efficiency (AFUE and COP).
      </p>
      <Table<FuelComparisonItem>
        columns={columns}
        dataSource={fuels}
        rowKey="fuelType"
        pagination={false}
        size="middle"
        scroll={{ x: 700 }}
      />
    </div>
  );
}
