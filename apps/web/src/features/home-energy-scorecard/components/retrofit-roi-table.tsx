'use client';

import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { RetrofitUpgradeItem } from '@energy-bill-lab/calculation-engine';

import styles from './home-energy-scorecard.module.css';

interface RetrofitRoiTableProps {
  upgrades: RetrofitUpgradeItem[];
}

export function RetrofitRoiTable({ upgrades }: RetrofitRoiTableProps) {
  const columns: ColumnsType<RetrofitUpgradeItem> = [
    {
      title: 'Recommended Retrofit',
      dataIndex: 'title',
      key: 'title',
      render: (_: unknown, record: RetrofitUpgradeItem) => (
        <div>
          <div style={{ fontWeight: 600, color: '#0f172a' }}>{record.title}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Estimated Cost',
      dataIndex: 'estimatedCostRange',
      key: 'estimatedCostRange',
      width: 140,
      render: (cost: string) => <span style={{ fontWeight: 500 }}>{cost}</span>,
    },
    {
      title: 'Annual Savings',
      dataIndex: 'estimatedAnnualSavingsDollars',
      key: 'estimatedAnnualSavingsDollars',
      align: 'right',
      width: 140,
      render: (savings: number) => (
        <span style={{ fontWeight: 700, color: '#16a34a' }}>${savings.toLocaleString()}/yr</span>
      ),
    },
    {
      title: 'Simple Payback',
      dataIndex: 'simplePaybackYears',
      key: 'simplePaybackYears',
      align: 'center',
      width: 130,
      render: (years: number) => (
        <Tag color={years <= 3 ? 'green' : years <= 6 ? 'blue' : 'orange'}>
          {years} {years === 1 ? 'year' : 'years'}
        </Tag>
      ),
    },
  ];

  return (
    <div className={styles.roadmapContainer}>
      <h3 className={styles.roadmapTitle}>Prioritized Energy Retrofit & ROI Roadmap</h3>
      <p className={styles.roadmapSubtitle}>
        Recommended capital improvements ranked by shortest payback period and highest utility bill
        return.
      </p>
      <Table<RetrofitUpgradeItem>
        columns={columns}
        dataSource={upgrades}
        rowKey="id"
        pagination={false}
        size="middle"
        scroll={{ x: 600 }}
      />
    </div>
  );
}
