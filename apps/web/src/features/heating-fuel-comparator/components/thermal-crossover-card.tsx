'use client';

import React from 'react';
import { Tag } from 'antd';
import { ThunderboltOutlined, FireOutlined } from '@ant-design/icons';
import type { ThermalCrossoverPoint } from '@energy-bill-lab/calculation-engine';

import styles from './heating-fuel.module.css';

interface ThermalCrossoverCardProps {
  crossover: ThermalCrossoverPoint;
}

export function ThermalCrossoverCard({ crossover }: ThermalCrossoverCardProps) {
  return (
    <div className={styles.crossoverCard}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <Tag color="cyan" style={{ fontSize: 13, padding: '2px 10px', fontWeight: 600 }}>
          Thermal Balance Analysis
        </Tag>
        <span style={{ fontSize: 13, opacity: 0.9 }}>
          Outdoor Temperature Crossover Point: <strong>{crossover.crossoverTempF}°F</strong>
        </span>
      </div>

      <h3 className={styles.crossoverHeading}>
        {crossover.heatPumpBeatsGasAboveF ? (
          <>
            <ThunderboltOutlined style={{ marginRight: 8, color: '#5cdbd3' }} />
            Heat Pump vs. Natural Gas Economic Balance Point
          </>
        ) : (
          <>
            <FireOutlined style={{ marginRight: 8, color: '#ff7875' }} />
            Natural Gas Dominance Threshold
          </>
        )}
      </h3>

      <p className={styles.crossoverExplanation}>{crossover.explanation}</p>
    </div>
  );
}
