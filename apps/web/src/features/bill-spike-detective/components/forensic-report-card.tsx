'use client';

import React from 'react';
import Link from 'next/link';
import { Progress, Tag, Button } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BookOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import type {
  CulpritDiagnosis,
  DiagnoseBillSpikeOutput,
} from '@energy-bill-lab/calculation-engine';

import { DiagnosticActionPlan } from './diagnostic-action-plan';
import styles from './bill-spike-detective.module.css';

interface ForensicReportCardProps {
  diagnosis: DiagnoseBillSpikeOutput;
  onReset: () => void;
}

export function ForensicReportCard({ diagnosis, onReset }: ForensicReportCardProps) {
  const { metrics, culprits, actionPlan, relatedGuideSlugs, summaryVerdict, primaryDriver } =
    diagnosis;

  const getSeverityTag = (severity: CulpritDiagnosis['severity']) => {
    switch (severity) {
      case 'high':
        return <Tag color="error">High Impact Culprit</Tag>;
      case 'medium':
        return <Tag color="warning">Medium Factor</Tag>;
      case 'low':
        return <Tag color="default">Minor Contribution</Tag>;
    }
  };

  return (
    <div className={styles.reportContainer} aria-label="Bill Spike Forensic Report">
      {/* 1. Main Verdict Banner */}
      <div className={styles.verdictBanner}>
        <span className={styles.verdictBadge}>Forensic Diagnostic Verdict</span>
        <h2 className={styles.verdictTitle}>{primaryDriver}</h2>
        <p className={styles.verdictDescription}>{summaryVerdict}</p>
      </div>

      {/* 2. Key Metrics Summary Grid */}
      <div className={styles.metricsSummaryGrid}>
        {/* Metric 1: Total Dollar Shift */}
        <div className={styles.metricBox}>
          <span className={styles.metricBoxLabel}>Bill Dollar Change</span>
          <div className={styles.metricBoxValue}>
            {metrics.dollarChange >= 0 ? '+' : '-'}${Math.abs(metrics.dollarChange).toFixed(2)}
          </div>
          <div
            className={`${styles.metricBoxDelta} ${
              metrics.dollarChange > 0 ? styles.deltaUp : styles.deltaDown
            }`}
          >
            {metrics.dollarChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{' '}
            {Math.abs(metrics.dollarChangePercent).toFixed(1)}% vs previous
          </div>
        </div>

        {/* Metric 2: kWh Usage Shift */}
        <div className={styles.metricBox}>
          <span className={styles.metricBoxLabel}>Energy Consumption</span>
          <div className={styles.metricBoxValue}>
            {metrics.kwhChange >= 0 ? '+' : '-'}
            {Math.abs(metrics.kwhChange).toLocaleString()} kWh
          </div>
          <div
            className={`${styles.metricBoxDelta} ${
              metrics.kwhChange > 0 ? styles.deltaUp : styles.deltaDown
            }`}
          >
            {metrics.kwhChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{' '}
            {Math.abs(metrics.kwhChangePercent).toFixed(1)}% usage delta
          </div>
        </div>

        {/* Metric 3: Normalized Daily kWh */}
        <div className={styles.metricBox}>
          <span className={styles.metricBoxLabel}>Daily Average Burn</span>
          <div className={styles.metricBoxValue}>{metrics.dailyKwhCurrent.toFixed(1)} kWh/day</div>
          <div
            className={`${styles.metricBoxDelta} ${
              metrics.dailyKwhChangePercent > 0 ? styles.deltaUp : styles.deltaDown
            }`}
          >
            Previous: {metrics.dailyKwhPrevious.toFixed(1)} kWh/day
          </div>
        </div>

        {/* Metric 4: Effective Rate */}
        <div className={styles.metricBox}>
          <span className={styles.metricBoxLabel}>Effective Unit Rate</span>
          <div className={styles.metricBoxValue}>
            {metrics.effectiveRateCurrentCents.toFixed(2)} ¢/kWh
          </div>
          <div
            className={`${styles.metricBoxDelta} ${
              metrics.effectiveRateChangePercent > 0 ? styles.deltaUp : styles.deltaDown
            }`}
          >
            {metrics.effectiveRateChangePercent >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{' '}
            {Math.abs(metrics.effectiveRateChangePercent).toFixed(1)}% rate shift
          </div>
        </div>
      </div>

      {/* 3. Identified Culprits Section */}
      <div className={styles.culpritsSection}>
        <div className={styles.sectionTitle}>
          <span>Ranked Culprits & Probability Scoring</span>
          <span style={{ fontSize: 13, color: '#8c8c8c', fontWeight: 500 }}>
            Usage: {metrics.usageVsRateAttribution.usageSharePercent}% | Rate:{' '}
            {metrics.usageVsRateAttribution.rateSharePercent}%
          </span>
        </div>

        {culprits.map((culprit) => (
          <div key={culprit.id} className={styles.culpritCard}>
            <div className={styles.culpritHeader}>
              <div>
                <div className={styles.culpritMeta}>
                  <h4 className={styles.culpritTitle}>{culprit.title}</h4>
                  {getSeverityTag(culprit.severity)}
                </div>
                <div style={{ width: 180, marginTop: 4 }}>
                  <Progress
                    percent={culprit.probabilityScore}
                    size="small"
                    strokeColor={
                      culprit.probabilityScore > 75
                        ? '#cf1322'
                        : culprit.probabilityScore > 45
                          ? '#fa8c16'
                          : '#52c41a'
                    }
                    format={(percent) => `${percent}% confidence`}
                  />
                </div>
              </div>

              {culprit.estimatedDollarImpact > 0 && (
                <div className={styles.culpritImpact}>Est. +${culprit.estimatedDollarImpact}</div>
              )}
            </div>

            <p style={{ fontSize: 14, color: '#595959', margin: '8px 0', lineHeight: 1.5 }}>
              {culprit.description}
            </p>

            <div className={styles.culpritEvidence}>
              <strong>Diagnostic Evidence:</strong> {culprit.evidence}
            </div>

            {culprit.recommendedGuideSlug && (
              <div style={{ marginTop: 10 }}>
                <Link
                  href={`/guides/${culprit.recommendedGuideSlug}`}
                  style={{
                    fontSize: 13,
                    color: '#176b5b',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <BookOutlined /> Read in-depth troubleshooting guide &rarr;
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 4. Action Plan Checklist */}
      <DiagnosticActionPlan actionPlan={actionPlan} />

      {/* 5. Additional Guides */}
      {relatedGuideSlugs.length > 0 && (
        <div
          style={{
            marginTop: 24,
            padding: 20,
            background: '#f6ffed',
            borderRadius: 8,
            border: '1px solid #b7eb8f',
          }}
        >
          <h4 style={{ fontSize: 15, fontWeight: 700, color: '#135200', marginBottom: 8 }}>
            Recommended Deep-Dive Research
          </h4>
          <ul style={{ margin: 0, paddingLeft: 20, color: '#389e0d' }}>
            {relatedGuideSlugs.map((slug) => (
              <li key={slug} style={{ marginBottom: 6 }}>
                <Link
                  href={`/guides/${slug}`}
                  style={{ color: '#176b5b', fontWeight: 600, textDecoration: 'underline' }}
                >
                  {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Reset / New Analysis Button */}
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <Button
          size="large"
          icon={<ReloadOutlined />}
          onClick={onReset}
          style={{ minWidth: 200, height: 44 }}
        >
          Run Another Diagnostic Triage
        </Button>
      </div>
    </div>
  );
}
