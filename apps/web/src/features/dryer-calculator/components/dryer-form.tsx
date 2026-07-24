'use client';

import { useState } from 'react';
import { Button, Form, Select } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { NumberInputWithUnit } from '@/components/number-input-with-unit';
import { calculateDryerCost, type DryerCostResult } from '@energy-bill-lab/calculation-engine';

import {
  getBenchmarksByApplianceType,
  type ApplianceBenchmark,
} from '@/content/appliance-benchmarks';
import { trackDryerAnalytics } from '../lib/dryer-analytics';
import {
  DEFAULT_DRYER_FORM_VALUES,
  dryerSchema,
  type DryerFormValues,
} from '../schemas/dryer-schema';
import styles from './dryer-form.module.css';

type StateOption = {
  stateCode: string;
  stateName: string;
  rateCentsPerKwh: number;
};

type DryerFormProps = {
  onCalculate: (result: DryerCostResult, values: DryerFormValues) => void;
  onReset: () => void;
  stateOptions?: StateOption[];
  sourcePeriodText?: string;
};

export function DryerForm({
  onCalculate,
  onReset,
  stateOptions = [],
  sourcePeriodText,
}: DryerFormProps) {
  const [form] = Form.useForm<DryerFormValues>();
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string | undefined>(
    'standard-electric-dryer',
  );
  const [announcement, setAnnouncement] = useState('');

  const benchmarks = getBenchmarksByApplianceType('clothes-dryer');

  const handleBenchmarkSelect = (benchmark: ApplianceBenchmark) => {
    setSelectedBenchmarkId(benchmark.id);
    form.setFieldsValue({
      wattage: benchmark.exampleWatts,
      minutesPerLoad: benchmark.exampleRuntime,
      presetId: benchmark.id,
    });

    trackDryerAnalytics({
      event: 'dryer_preset_selected',
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
      trackDryerAnalytics({
        event: 'dryer_state_average_used',
      });
    }
  };

  const handleSubmit = (values: DryerFormValues) => {
    const parseResult = dryerSchema.safeParse(values);
    if (!parseResult.success) {
      return;
    }

    const result = calculateDryerCost({
      wattage: values.wattage,
      minutesPerLoad: values.minutesPerLoad,
      loadsPerWeek: values.loadsPerWeek,
      weeks: values.weeks,
      rateCentsPerKwh: values.rateCentsPerKwh,
      dutyCyclePercent: values.dutyCyclePercent,
    });

    const costBand =
      result.monthlyCostUsd < 10 ? 'LOW' : result.monthlyCostUsd < 30 ? 'MEDIUM' : 'HIGH';

    trackDryerAnalytics({
      event: 'dryer_calculation_completed',
      hasPreset: Boolean(selectedBenchmarkId),
      hasCustomRate: !values.selectedStateCode,
      costBand,
    });

    setAnnouncement(
      `Calculated dryer cost: $${result.costPerLoadUsd.toFixed(2)} per load, $${result.monthlyCostUsd.toFixed(2)} per month.`,
    );
    onCalculate(result, values);
  };

  const handleReset = () => {
    form.resetFields();
    setSelectedBenchmarkId(undefined);
    setAnnouncement('Form reset to default values.');
    trackDryerAnalytics({ event: 'dryer_result_reset' });
    onReset();
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.liveRegion} aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <div className={styles.presetSection}>
        <div className={styles.presetHeader}>Illustrative Electric Dryer Benchmarks</div>
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
        initialValues={DEFAULT_DRYER_FORM_VALUES}
        onFinish={handleSubmit}
      >
        <div className={styles.inputGrid}>
          <Form.Item
            name="wattage"
            label="Dryer Rated Power (Watts)"
            rules={[{ required: true, message: 'Please enter wattage' }]}
          >
            <NumberInputWithUnit min={100} max={10000} step={100} unit="W" />
          </Form.Item>

          <Form.Item
            name="minutesPerLoad"
            label="Minutes per Load"
            rules={[{ required: true, message: 'Please enter minutes per load' }]}
          >
            <NumberInputWithUnit min={1} max={300} unit="min" />
          </Form.Item>

          <Form.Item
            name="loadsPerWeek"
            label="Laundry Loads per Week"
            rules={[{ required: true, message: 'Please enter loads per week' }]}
          >
            <NumberInputWithUnit min={0} max={50} unit="loads/wk" />
          </Form.Item>

          <Form.Item name="weeks" label="Calculation Period (Weeks)">
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
            Calculate Dryer Cost
          </Button>
        </div>
      </Form>
    </div>
  );
}
