'use client';

import React, { useMemo, useState } from 'react';
import { Select, InputNumber, Button, Tag } from 'antd';
import { SwapOutlined, CheckCircleOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { calculateStateComparison } from '@energy-bill-lab/calculation-engine';

import { StateComparisonTable } from './state-comparison-table';
import styles from './state-comparator.module.css';

export interface StateRecordItem {
  code: string;
  name: string;
  slug: string;
  electricityRateCentsPerKwh: number;
  gasPriceDollarsPerMcf?: number | null;
  gasPriceDollarsPerTherm?: number | null;
}

interface StateComparatorToolProps {
  initialStateA?: string; // state code e.g. 'CA'
  initialStateB?: string; // state code e.g. 'TX'
  statesData: Record<string, StateRecordItem>;
}

export function StateComparatorTool({
  initialStateA = 'CA',
  initialStateB = 'TX',
  statesData,
}: StateComparatorToolProps) {
  const [selectedCodeA, setSelectedCodeA] = useState<string>(initialStateA);
  const [selectedCodeB, setSelectedCodeB] = useState<string>(initialStateB);
  const [kwhBaseline, setKwhBaseline] = useState<number>(900);
  const [thermsBaseline, setThermsBaseline] = useState<number>(60);

  const stateOptions = useMemo(() => {
    return Object.values(statesData)
      .map((s) => ({
        value: s.code,
        label: `${s.name} (${s.electricityRateCentsPerKwh.toFixed(1)} ¢/kWh)`,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [statesData]);

  const stateAItem = statesData[selectedCodeA] || {
    name: 'California',
    code: 'CA',
    slug: 'california',
    electricityRateCentsPerKwh: 32.5,
    gasPriceDollarsPerTherm: 1.85,
    gasPriceDollarsPerMcf: 19.18,
  };

  const stateBItem = statesData[selectedCodeB] || {
    name: 'Texas',
    code: 'TX',
    slug: 'texas',
    electricityRateCentsPerKwh: 14.8,
    gasPriceDollarsPerTherm: 1.25,
    gasPriceDollarsPerMcf: 12.96,
  };

  const comparison = useMemo(() => {
    return calculateStateComparison({
      stateA: {
        name: stateAItem.name,
        code: stateAItem.code,
        slug: stateAItem.slug,
        electricityRateCentsPerKwh: stateAItem.electricityRateCentsPerKwh,
        gasPriceDollarsPerMcf: stateAItem.gasPriceDollarsPerMcf,
        gasPriceDollarsPerTherm: stateAItem.gasPriceDollarsPerTherm,
      },
      stateB: {
        name: stateBItem.name,
        code: stateBItem.code,
        slug: stateBItem.slug,
        electricityRateCentsPerKwh: stateBItem.electricityRateCentsPerKwh,
        gasPriceDollarsPerMcf: stateBItem.gasPriceDollarsPerMcf,
        gasPriceDollarsPerTherm: stateBItem.gasPriceDollarsPerTherm,
      },
      monthlyKwhBaseline: kwhBaseline,
      monthlyThermsBaseline: thermsBaseline,
    });
  }, [stateAItem, stateBItem, kwhBaseline, thermsBaseline]);

  const handleSwap = () => {
    const temp = selectedCodeA;
    setSelectedCodeA(selectedCodeB);
    setSelectedCodeB(temp);
  };

  return (
    <div className={styles.comparatorContainer} aria-label="State-to-State Rate Comparator">
      {/* 1. Selector Bar */}
      <div className={styles.selectorBar}>
        <div className={styles.selectorGrid}>
          <div className={styles.selectorColumn}>
            <label className={styles.selectorLabel}>State A</label>
            <Select
              showSearch
              value={selectedCodeA}
              onChange={(val) => setSelectedCodeA(val)}
              options={stateOptions}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              style={{ width: '100%' }}
              size="large"
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <Button
              shape="circle"
              icon={<SwapOutlined />}
              onClick={handleSwap}
              title="Swap States"
              size="middle"
              style={{ margin: '0 auto' }}
            />
            <div className={styles.vsDivider}>VS</div>
          </div>

          <div className={styles.selectorColumn}>
            <label className={styles.selectorLabel}>State B</label>
            <Select
              showSearch
              value={selectedCodeB}
              onChange={(val) => setSelectedCodeB(val)}
              options={stateOptions}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              style={{ width: '100%' }}
              size="large"
            />
          </div>
        </div>

        {/* Baseline adjustments */}
        <div className={styles.baselineControls}>
          <div>
            <label
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#595959',
                display: 'block',
                marginBottom: 4,
              }}
            >
              Monthly Household Electricity Usage
            </label>
            <InputNumber
              min={100}
              max={10000}
              step={50}
              value={kwhBaseline}
              onChange={(v) => setKwhBaseline(v ?? 900)}
              addonAfter="kWh / mo"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#595959',
                display: 'block',
                marginBottom: 4,
              }}
            >
              Monthly Household Natural Gas Usage
            </label>
            <InputNumber
              min={0}
              max={1000}
              step={10}
              value={thermsBaseline}
              onChange={(v) => setThermsBaseline(v ?? 60)}
              addonAfter="Therms / mo"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* 2. Verdict Banner */}
      <div className={styles.verdictCard}>
        <div className={styles.verdictTitle}>
          <ThunderboltOutlined style={{ marginRight: 8 }} />
          Comparison Verdict
        </div>
        <p className={styles.verdictText}>{comparison.summaryVerdict}</p>
      </div>

      {/* 3. Dual Score Cards */}
      <div className={styles.dualScoreGrid}>
        {/* State A Card */}
        <div
          className={`${styles.stateScoreCard} ${
            comparison.electricity.cheaperState === 'stateA' ? styles.stateScoreCardWinner : ''
          }`}
        >
          <div className={styles.stateCardHeader}>
            <h3 className={styles.stateName}>{comparison.stateA.name}</h3>
            {comparison.electricity.cheaperState === 'stateA' && (
              <Tag color="success" icon={<CheckCircleOutlined />}>
                Lower Electricity Cost
              </Tag>
            )}
          </div>
          <div className={styles.rateStatRow}>
            <span className={styles.rateStatLabel}>Electricity Rate</span>
            <span className={styles.rateStatValue}>
              {comparison.electricity.rateStateA.toFixed(2)} ¢ / kWh
            </span>
          </div>
          <div className={styles.rateStatRow}>
            <span className={styles.rateStatLabel}>Est. Monthly Electric Bill</span>
            <span className={styles.rateStatValue}>
              ${comparison.electricity.monthlyBillStateA.toFixed(2)}
            </span>
          </div>
          {comparison.naturalGas.available && comparison.naturalGas.thermRateStateA && (
            <div className={styles.rateStatRow}>
              <span className={styles.rateStatLabel}>Natural Gas Rate</span>
              <span className={styles.rateStatValue}>
                ${comparison.naturalGas.thermRateStateA.toFixed(2)} / therm
              </span>
            </div>
          )}
        </div>

        {/* State B Card */}
        <div
          className={`${styles.stateScoreCard} ${
            comparison.electricity.cheaperState === 'stateB' ? styles.stateScoreCardWinner : ''
          }`}
        >
          <div className={styles.stateCardHeader}>
            <h3 className={styles.stateName}>{comparison.stateB.name}</h3>
            {comparison.electricity.cheaperState === 'stateB' && (
              <Tag color="success" icon={<CheckCircleOutlined />}>
                Lower Electricity Cost
              </Tag>
            )}
          </div>
          <div className={styles.rateStatRow}>
            <span className={styles.rateStatLabel}>Electricity Rate</span>
            <span className={styles.rateStatValue}>
              {comparison.electricity.rateStateB.toFixed(2)} ¢ / kWh
            </span>
          </div>
          <div className={styles.rateStatRow}>
            <span className={styles.rateStatLabel}>Est. Monthly Electric Bill</span>
            <span className={styles.rateStatValue}>
              ${comparison.electricity.monthlyBillStateB.toFixed(2)}
            </span>
          </div>
          {comparison.naturalGas.available && comparison.naturalGas.thermRateStateB && (
            <div className={styles.rateStatRow}>
              <span className={styles.rateStatLabel}>Natural Gas Rate</span>
              <span className={styles.rateStatValue}>
                ${comparison.naturalGas.thermRateStateB.toFixed(2)} / therm
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 4. Comparison Tables */}
      <StateComparisonTable comparison={comparison} />
    </div>
  );
}
