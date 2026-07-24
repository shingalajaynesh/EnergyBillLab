'use client';

import { useState } from 'react';
import { Button, Form, Select } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { NumberInputWithUnit } from '@/components/number-input-with-unit';
import {
  calculateApplianceCost,
  type ApplianceCostResult,
} from '@energy-bill-lab/calculation-engine';

import {
  getBenchmarksByApplianceType,
  type ApplianceBenchmark,
} from '@/content/appliance-benchmarks';
import { trackDehumidifierAnalytics } from '../lib/dehumidifier-analytics';
import {
  DEFAULT_DEHUMIDIFIER_FORM_VALUES,
  dehumidifierSchema,
  type DehumidifierFormValues,
} from '../schemas/dehumidifier-schema';
import styles from './dehumidifier-form.module.css';

type StateOption = {
  stateCode: string;
  stateName: string;
  rateCentsPerKwh: number;
};

type DehumidifierFormProps = {
  onCalculate: (result: ApplianceCostResult, values: DehumidifierFormValues) => void;
  onReset: () => void;
  stateOptions?: StateOption[];
  sourcePeriodText?: string;
};

export function DehumidifierForm({
  onCalculate,
  onReset,
  stateOptions = [],
  sourcePeriodText,
}: DehumidifierFormProps) {
  const [form] = Form.useForm<DehumidifierFormValues>();
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string | undefined>(
    'standard-dehumidifier',
  );
  const [announcement, setAnnouncement] = useState('');

  const benchmarks = getBenchmarksByApplianceType('dehumidifier');

  const handleBenchmarkSelect = (benchmark: ApplianceBenchmark) => {
    setSelectedBenchmarkId(benchmark.id);
    form.setFieldsValue({
      wattage: benchmark.exampleWatts,
      hoursPerDay: benchmark.exampleRuntime,
      dutyCyclePercent: benchmark.exampleDutyCyclePercent,
      presetId: benchmark.id,
    });

    trackDehumidifierAnalytics({
      event: 'dehumidifier_preset_selected',
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
      trackDehumidifierAnalytics({
        event: 'dehumidifier_state_average_used',
      });
    }
  };

  const handleSubmit = (values: DehumidifierFormValues) => {
    const parseResult = dehumidifierSchema.safeParse(values);
    if (!parseResult.success) {
      return;
    }

    const result = calculateApplianceCost({
      wattage: values.wattage,
      hoursPerDay: values.hoursPerDay,
      days: values.days,
      rateCentsPerKwh: values.rateCentsPerKwh,
      dutyCyclePercent: values.dutyCyclePercent,
    });

    const costBand =
      result.monthlyCostUsd < 15 ? 'LOW' : result.monthlyCostUsd < 40 ? 'MEDIUM' : 'HIGH';

    trackDehumidifierAnalytics({
      event: 'dehumidifier_calculation_completed',
      hasPreset: Boolean(selectedBenchmarkId),
      hasCustomRate: !values.selectedStateCode,
      costBand,
    });

    setAnnouncement(
      `Calculated dehumidifier cost: $${result.dailyCostUsd.toFixed(2)} per day, $${result.monthlyCostUsd.toFixed(2)} per month.`,
    );
    onCalculate(result, values);
  };

  const handleReset = () => {
    form.resetFields();
    setSelectedBenchmarkId(undefined);
    setAnnouncement('Form reset to default values.');
    trackDehumidifierAnalytics({ event: 'dehumidifier_result_reset' });
    onReset();
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.liveRegion} aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <div className={styles.presetSection}>
        <div className={styles.presetHeader}>Illustrative Dehumidifier Benchmarks</div>
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
        initialValues={DEFAULT_DEHUMIDIFIER_FORM_VALUES}
        onFinish={handleSubmit}
      >
        <div className={styles.inputGrid}>
          <Form.Item
            name="wattage"
            label="Dehumidifier Rated Power (Watts)"
            rules={[{ required: true, message: 'Please enter wattage' }]}
          >
            <NumberInputWithUnit min={50} max={5000} step={50} unit="W" />
          </Form.Item>

          <Form.Item
            name="hoursPerDay"
            label="Connected Duration per Day (Hours)"
            rules={[{ required: true, message: 'Please enter connected hours' }]}
          >
            <NumberInputWithUnit min={0} max={24} step={0.5} unit="hrs" />
          </Form.Item>

          <Form.Item name="dutyCyclePercent" label="Compressor Duty Cycle (%)">
            <NumberInputWithUnit min={0} max={100} unit="%" />
          </Form.Item>

          <Form.Item name="days" label="Calculation Period (Days)">
            <NumberInputWithUnit min={1} max={365} unit="days" />
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
            Calculate Dehumidifier Cost
          </Button>
        </div>
      </Form>
    </div>
  );
}
