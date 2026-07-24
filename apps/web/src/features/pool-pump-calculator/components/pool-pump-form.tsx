'use client';

import { useState } from 'react';
import { Button, Form, Select } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { NumberInputWithUnit } from '@/components/number-input-with-unit';
import {
  calculatePoolPumpCost,
  type ApplianceCostResult,
} from '@energy-bill-lab/calculation-engine';

import {
  getBenchmarksByApplianceType,
  type ApplianceBenchmark,
} from '@/content/appliance-benchmarks';
import { trackPoolPumpAnalytics } from '../lib/pool-pump-analytics';
import {
  DEFAULT_POOL_PUMP_FORM_VALUES,
  poolPumpSchema,
  type PoolPumpFormValues,
} from '../schemas/pool-pump-schema';
import styles from './pool-pump-form.module.css';

type StateOption = {
  stateCode: string;
  stateName: string;
  rateCentsPerKwh: number;
};

type PoolPumpFormProps = {
  onCalculate: (result: ApplianceCostResult, values: PoolPumpFormValues) => void;
  onReset: () => void;
  stateOptions?: StateOption[];
  sourcePeriodText?: string;
};

export function PoolPumpForm({
  onCalculate,
  onReset,
  stateOptions = [],
  sourcePeriodText,
}: PoolPumpFormProps) {
  const [form] = Form.useForm<PoolPumpFormValues>();
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string | undefined>(
    'standard-pool-pump',
  );
  const [announcement, setAnnouncement] = useState('');

  const benchmarks = getBenchmarksByApplianceType('pool-pump');

  const handleBenchmarkSelect = (benchmark: ApplianceBenchmark) => {
    setSelectedBenchmarkId(benchmark.id);
    form.setFieldsValue({
      wattage: benchmark.exampleWatts,
      hoursPerDay: benchmark.exampleRuntime,
      daysPerWeek: 7,
      presetId: benchmark.id,
    });

    trackPoolPumpAnalytics({
      event: 'pool_pump_preset_selected',
      hasPreset: true,
    });
  };

  const handleStateSelect = (stateCode: string) => {
    const matched = stateOptions.find((opt) => opt.stateCode === stateCode);
    if (matched) {
      form.setFieldsValue({
        rateCentsPerKwh: matched.rateCentsPerKwh,
        selectedStateCode: stateCode,
      });
      trackPoolPumpAnalytics({
        event: 'pool_pump_state_average_used',
      });
    }
  };

  const handleSubmit = (values: PoolPumpFormValues) => {
    const parseResult = poolPumpSchema.safeParse(values);
    if (!parseResult.success) {
      return;
    }

    const result = calculatePoolPumpCost({
      wattage: values.wattage,
      hoursPerDay: values.hoursPerDay,
      daysPerWeek: values.daysPerWeek,
      weeks: values.weeks,
      rateCentsPerKwh: values.rateCentsPerKwh,
      dutyCyclePercent: values.dutyCyclePercent,
    });

    const costBand =
      result.monthlyCostUsd < 30 ? 'LOW' : result.monthlyCostUsd < 70 ? 'MEDIUM' : 'HIGH';

    trackPoolPumpAnalytics({
      event: 'pool_pump_calculation_completed',
      hasPreset: Boolean(selectedBenchmarkId),
      hasCustomRate: !values.selectedStateCode,
      costBand,
    });

    setAnnouncement(
      `Calculated pool pump cost: $${result.dailyCostUsd.toFixed(2)} per day, $${result.monthlyCostUsd.toFixed(2)} per month.`,
    );
    onCalculate(result, values);
  };

  const handleReset = () => {
    form.resetFields();
    setSelectedBenchmarkId(undefined);
    setAnnouncement('Form reset to default values.');
    trackPoolPumpAnalytics({ event: 'pool_pump_result_reset' });
    onReset();
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.liveRegion} aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <div className={styles.presetSection}>
        <div className={styles.presetHeader}>Illustrative Pool Pump Benchmarks</div>
        <div className={styles.presetGrid}>
          {benchmarks.map((benchmark) => (
            <Button
              key={benchmark.id}
              type={selectedBenchmarkId === benchmark.id ? 'primary' : 'default'}
              className={styles.presetBtn}
              onClick={() => handleBenchmarkSelect(benchmark)}
            >
              {benchmark.label}
            </Button>
          ))}
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={DEFAULT_POOL_PUMP_FORM_VALUES}
        onFinish={handleSubmit}
      >
        <div className={styles.inputGrid}>
          <Form.Item
            name="wattage"
            label="Pump Electrical Input Power (Watts)"
            rules={[{ required: true, message: 'Please enter input wattage' }]}
          >
            <NumberInputWithUnit min={100} max={10000} step={100} unit="W" />
          </Form.Item>

          <Form.Item
            name="hoursPerDay"
            label="Filtration Duration per Day (Hours)"
            rules={[{ required: true, message: 'Please enter hours per day' }]}
          >
            <NumberInputWithUnit min={0} max={24} step={0.5} unit="hrs/day" />
          </Form.Item>

          <Form.Item
            name="daysPerWeek"
            label="Operating Days per Week (Days)"
            rules={[{ required: true, message: 'Please enter days per week' }]}
          >
            <NumberInputWithUnit min={1} max={7} unit="days/wk" />
          </Form.Item>

          <Form.Item name="weeks" label="Season Duration (Weeks)">
            <NumberInputWithUnit min={1} max={52} step={0.1} unit="weeks" />
          </Form.Item>

          <Form.Item
            name="rateCentsPerKwh"
            label="Electricity Rate (¢/kWh)"
            rules={[{ required: true, message: 'Please enter electricity rate' }]}
          >
            <NumberInputWithUnit min={0.01} max={500} step={0.1} unit="¢/kWh" />
          </Form.Item>

          {stateOptions.length > 0 && (
            <Form.Item
              label={`Select State Rate (${sourcePeriodText ?? 'EIA Residential Average'})`}
            >
              <Select
                placeholder="Choose U.S. State"
                allowClear
                onChange={handleStateSelect}
                options={stateOptions.map((opt) => ({
                  value: opt.stateCode,
                  label: `${opt.stateName} (${opt.rateCentsPerKwh.toFixed(2)}¢/kWh)`,
                }))}
              />
            </Form.Item>
          )}
        </div>

        <div className={styles.actionRow}>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            Reset
          </Button>
          <Button type="primary" htmlType="submit">
            Calculate Pool Pump Cost
          </Button>
        </div>
      </Form>
    </div>
  );
}
