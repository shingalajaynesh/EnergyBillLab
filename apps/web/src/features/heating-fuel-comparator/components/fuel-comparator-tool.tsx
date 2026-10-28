'use client';

import React, { useState, useMemo } from 'react';
import { Form, InputNumber, Slider } from 'antd';
import {
  calculateHeatingFuelComparison,
  type CalculateHeatingFuelComparisonInput,
} from '@energy-bill-lab/calculation-engine';

import { ThermalCrossoverCard } from './thermal-crossover-card';
import { MmbtuBenchmarkTable } from './mmbtu-benchmark-table';
import {
  DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
  DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE,
} from '@/lib/constants/electricity';
import styles from './heating-fuel.module.css';

interface FuelComparatorToolProps {
  initialRates?: {
    electricityCentsPerKwh: number;
    naturalGasDollarsPerTherm: number;
  };
}

export function FuelComparatorTool({ initialRates }: FuelComparatorToolProps) {
  const [params, setParams] = useState<CalculateHeatingFuelComparisonInput>({
    electricityRateCentsPerKwh:
      initialRates?.electricityCentsPerKwh ?? DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
    naturalGasDollarsPerTherm: initialRates?.naturalGasDollarsPerTherm ?? 1.45,
    heatingOilDollarsPerGallon: 3.85,
    propaneDollarsPerGallon: 2.95,
    annualHeatingDemandMbtu: 50,
  });

  const comparison = useMemo(() => {
    return calculateHeatingFuelComparison(params);
  }, [params]);

  return (
    <div className={styles.container} aria-label="Heating Fuel & Heat Pump Breakeven Tool">
      {/* Controls Panel */}
      <div className={styles.controlsPanel}>
        <div className={styles.controlsGrid}>
          <Form layout="vertical">
            <Form.Item
              label="Electricity Rate (¢/kWh)"
              extra={DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE}
            >
              <InputNumber
                min={1}
                max={100}
                step={0.1}
                value={params.electricityRateCentsPerKwh}
                onChange={(val) =>
                  setParams((prev) => ({
                    ...prev,
                    electricityRateCentsPerKwh: val ?? DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
                  }))
                }
                addonAfter="¢/kWh"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Form>

          <Form layout="vertical">
            <Form.Item label="Natural Gas Price ($/therm)">
              <InputNumber
                min={0.2}
                max={15}
                step={0.05}
                value={params.naturalGasDollarsPerTherm}
                onChange={(val) =>
                  setParams((prev) => ({ ...prev, naturalGasDollarsPerTherm: val ?? 1.45 }))
                }
                prefix="$"
                addonAfter="/therm"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Form>

          <Form layout="vertical">
            <Form.Item label="Heating Oil Price ($/gal)">
              <InputNumber
                min={1}
                max={15}
                step={0.05}
                value={params.heatingOilDollarsPerGallon}
                onChange={(val) =>
                  setParams((prev) => ({ ...prev, heatingOilDollarsPerGallon: val ?? 3.85 }))
                }
                prefix="$"
                addonAfter="/gal"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Form>

          <Form layout="vertical">
            <Form.Item label="Propane Price ($/gal)">
              <InputNumber
                min={0.5}
                max={15}
                step={0.05}
                value={params.propaneDollarsPerGallon}
                onChange={(val) =>
                  setParams((prev) => ({ ...prev, propaneDollarsPerGallon: val ?? 2.95 }))
                }
                prefix="$"
                addonAfter="/gal"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Form>
        </div>

        {/* Heating Demand Slider */}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>
              Estimated Annual Heating Load (MMBtu)
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>
              {params.annualHeatingDemandMbtu} MMBtu (~{params.annualHeatingDemandMbtu! * 40} sq ft
              climate equivalent)
            </span>
          </div>
          <Slider
            min={15}
            max={150}
            step={5}
            value={params.annualHeatingDemandMbtu}
            onChange={(val) => setParams((prev) => ({ ...prev, annualHeatingDemandMbtu: val }))}
          />
        </div>
      </div>

      {/* Thermal Balance Point Card */}
      <ThermalCrossoverCard crossover={comparison.thermalBalancePoint} />

      {/* Benchmark Table */}
      <MmbtuBenchmarkTable
        fuels={comparison.fuels}
        annualDemandMbtu={comparison.annualDemandMbtu}
      />
    </div>
  );
}
