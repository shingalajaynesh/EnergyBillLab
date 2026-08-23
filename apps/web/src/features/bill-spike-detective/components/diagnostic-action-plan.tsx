'use client';

import React from 'react';
import { Tag } from 'antd';
import {
  CheckCircleOutlined,
  ThunderboltOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import type { ActionItem } from '@energy-bill-lab/calculation-engine';

import styles from './bill-spike-detective.module.css';

interface DiagnosticActionPlanProps {
  actionPlan: ActionItem[];
}

export function DiagnosticActionPlan({ actionPlan }: DiagnosticActionPlanProps) {
  if (!actionPlan || actionPlan.length === 0) return null;

  const getCategoryIcon = (category: ActionItem['category']) => {
    switch (category) {
      case 'zero_cost':
        return <CheckCircleOutlined style={{ color: '#389e0d' }} />;
      case 'low_cost':
        return <ToolOutlined style={{ color: '#0958d9' }} />;
      case 'utility_action':
        return <ThunderboltOutlined style={{ color: '#d46b08' }} />;
      default:
        return <CheckCircleOutlined />;
    }
  };

  const getCategoryTag = (category: ActionItem['category']) => {
    switch (category) {
      case 'zero_cost':
        return <Tag color="success">Zero Cost Habit</Tag>;
      case 'low_cost':
        return <Tag color="processing">Low Cost Upgrade</Tag>;
      case 'utility_action':
        return <Tag color="warning">Utility Action</Tag>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.actionSection}>
      <h3 className={styles.sectionTitle}>Prioritized Energy Savings Action Plan</h3>
      <div>
        {actionPlan.map((action) => (
          <div key={action.id} className={styles.actionCard}>
            <div className={styles.actionIcon}>{getCategoryIcon(action.category)}</div>
            <div className={styles.actionContent}>
              <div className={styles.actionTitle}>{action.title}</div>
              <div className={styles.actionDesc}>{action.description}</div>
              <div className={styles.actionTags}>
                {getCategoryTag(action.category)}
                <Tag color="cyan">Savings: {action.estimatedSavingsPotential}</Tag>
                <Tag color="default">Effort: {action.difficulty}</Tag>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
