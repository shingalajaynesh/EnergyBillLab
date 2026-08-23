'use client';

import React from 'react';
import { Button, Progress, Tag } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import type { CalculateHomeEnergyScoreOutput } from '@energy-bill-lab/calculation-engine';

import { RetrofitRoiTable } from './retrofit-roi-table';
import styles from './home-energy-scorecard.module.css';

interface EfficiencyGradeCardProps {
  scorecard: CalculateHomeEnergyScoreOutput;
  onReset: () => void;
}

export function EfficiencyGradeCard({ scorecard, onReset }: EfficiencyGradeCardProps) {
  const {
    score,
    letterGrade,
    estimatedAnnualElectricityKwh,
    estimatedAnnualGasTherms,
    estimatedAnnualTotalCostDollars,
    estimatedAnnualWasteDollars,
    efficiencySummary,
    componentScores,
    retrofitRoadmap,
  } = scorecard;

  const getStatusColor = (status: 'good' | 'average' | 'poor') => {
    if (status === 'good') return 'green';
    if (status === 'average') return 'orange';
    return 'red';
  };

  return (
    <div>
      {/* Score Header */}
      <div className={styles.scoreHeader}>
        <div>
          <span
            style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.9 }}
          >
            Virtual Home Energy Audit Report
          </span>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#ffffff', margin: '4px 0 8px 0' }}>
            Energy Efficiency Rating: {score}/100
          </h2>
          <p style={{ maxWidth: 640, fontSize: 14, lineHeight: 1.5, opacity: 0.95, margin: 0 }}>
            {efficiencySummary}
          </p>
        </div>

        <div className={styles.gradeBadge}>
          <span className={styles.gradeLetter}>{letterGrade}</span>
          <span className={styles.gradeSub}>Grade</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className={styles.metricsRow}>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Annual Electric Consumption</div>
          <div className={styles.metricValue}>
            {estimatedAnnualElectricityKwh.toLocaleString()} kWh
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Annual Natural Gas</div>
          <div className={styles.metricValue}>
            {estimatedAnnualGasTherms > 0
              ? `${estimatedAnnualGasTherms.toLocaleString()} Therms`
              : 'N/A (All-Electric)'}
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Estimated Annual Energy Cost</div>
          <div className={styles.metricValue}>
            ${estimatedAnnualTotalCostDollars.toLocaleString()}
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Preventable Energy Waste</div>
          <div
            className={styles.metricValue}
            style={{ color: estimatedAnnualWasteDollars > 0 ? '#e11d48' : '#16a34a' }}
          >
            ${estimatedAnnualWasteDollars.toLocaleString()}/yr
          </div>
        </div>
      </div>

      {/* Component Scores Grid */}
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
        Building Envelope & Mechanical Sub-Scores
      </h3>
      <div className={styles.componentGrid}>
        {Object.values(componentScores).map((comp) => (
          <div key={comp.name} className={styles.componentCard}>
            <div className={styles.componentHeader}>
              <span className={styles.componentTitle}>{comp.name}</span>
              <Tag color={getStatusColor(comp.status)}>
                {comp.score}/{comp.maxScore} pts
              </Tag>
            </div>
            <Progress
              percent={Math.round((comp.score / comp.maxScore) * 100)}
              showInfo={false}
              strokeColor={
                comp.status === 'good'
                  ? '#16a34a'
                  : comp.status === 'average'
                    ? '#f59e0b'
                    : '#ef4444'
              }
              size="small"
            />
            <div className={styles.componentNote}>{comp.note}</div>
          </div>
        ))}
      </div>

      {/* Retrofit Table */}
      <RetrofitRoiTable upgrades={retrofitRoadmap} />

      {/* Reset Bar */}
      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <Button icon={<ReloadOutlined />} onClick={onReset} size="large">
          Re-evaluate Another Home Profile
        </Button>
      </div>
    </div>
  );
}
