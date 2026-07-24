'use client';

import { useState } from 'react';
import { Button, Form, Select } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { NumberInputWithUnit } from '@/components/number-input-with-unit';
import {
  calculateWaterHeaterCost,
  type ApplianceCostResult,
} from '@energy-bill-lab/calculation-engine';

import {
  getBenchmarksByApplianceType,
  type ApplianceBenchmark,
} from '@/content/appliance-benchmarks';
import { trackWaterHeaterAnalytics } from '../lib/water-heater-analytics';
import {
  DEFAULT_WATER_HEATER_FORM_VALUES,
  waterHeaterSchema,
  type WaterHeaterFormValues,
} from '../schemas/water-heater-schema';
import styles from './water-heater-form.module.css';

type StateOption = {
  stateCode: string;
  stateName: string;
  rateCentsPerKwh: number;
};

type WaterHeaterFormProps = {
  onCalculate: (result: ApplianceCostResult, values: WaterHeaterFormValues) => void;
  onReset: () => void;
  stateOptions?: StateOption[];
  sourcePeriodText?: string;
};

export function WaterHeaterForm({
  onCalculate,
  onReset,
  stateOptions = [],
  sourcePeriodText,
}: WaterHeaterFormProps) {
  const [form] = Form.useForm<WaterHeaterFormValues>();
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string | undefined>(
    'standard-electric-water-heater',
  );
  const [announcement, setAnnouncement] = useState('');

  const benchmarks = getBenchmarksByApplianceType('electric-water-heater');

  const handleBenchmarkSelect = (benchmark: ApplianceBenchmark) => {
    setSelectedBenchmarkId(benchmark.id);
    form.setFieldsValue({
      elementWatts: benchmark.exampleWatts,
      activeElements: 1,
      hoursPerDay: benchmark.exampleRuntime,
      presetId: benchmark.id,
    });

    trackWaterHeaterAnalytics({
      event: 'water_heater_preset_selected',
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
      trackWaterHeaterAnalytics({
        event: 'water_heater_state_average_used',
      });
    }
  };

  const handleSubmit = (values: WaterHeaterFormValues) => {
    const parseResult = waterHeaterSchema.safeParse(values);
    if (!parseResult.success) {
      return;
    }

    const result = calculateWaterHeaterCost({
      elementWatts: values.elementWatts,
      activeElements: values.activeElements,
      hoursPerDay: values.hoursPerDay,
      days: values.days,
      rateCentsPerKwh: values.rateCentsPerKwh,
      dutyCyclePercent: values.dutyCyclePercent,
    });

    const costBand =
      result.monthlyCostUsd < 40 ? 'LOW' : result.monthlyCostUsd < 80 ? 'MEDIUM' : 'HIGH';

    trackWaterHeaterAnalytics({
      event: 'water_heater_calculation_completed',
      hasPreset: Boolean(selectedBenchmarkId),
      hasCustomRate: !values.selectedStateCode,
      costBand,
    });

    setAnnouncement(
      `Calculated water heater cost: $${result.dailyCostUsd.toFixed(2)} per day, $${result.monthlyCostUsd.toFixed(2)} per month.`,
    );
    onCalculate(result, values);
  };

  const handleReset = () => {
    form.resetFields();
    setSelectedBenchmarkId(undefined);
    setAnnouncement('Form reset to default values.');
    trackWaterHeaterAnalytics({ event: 'water_heater_result_reset' });
    onReset();
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.liveRegion} aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <div className={styles.presetSection}>
        <div className={styles.presetHeader}>Illustrative Electric Water Heater Benchmarks</div>
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
        initialValues={DEFAULT_WATER_HEATER_FORM_VALUES}
        onFinish={handleSubmit}
      >
        <div className={styles.inputGrid}>
          <Form.Item
            name="elementWatts"
            label="Heating Element Rating (Watts)"
            rules={[{ required: true, message: 'Please enter element wattage' }]}
          >
            <NumberInputWithUnit min={500} max={12000} step={500} unit="W" />
          </Form.Item>

          <Form.Item
            name="activeElements"
            label="Simultaneously Active Elements"
            rules={[{ required: true, message: 'Please select active element count' }]}
          >
            <NumberInputWithUnit min={1} max={4} unit="element(s)" />
          </Form.Item>

          <Form.Item
            name="hoursPerDay"
            label="Active Heating Duration per Day (Hours)"
            rules={[{ required: true, message: 'Please enter active hours' }]}
          >
            <NumberInputWithUnit min={0} max={24} step={0.5} unit="hrs" />
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
            Calculate Water Heater Cost
          </Button>
        </div>
      </Form>
    </div>
  );
}
