'use client';

import { useState } from 'react';
import { Button, Form, Radio, Select, type RadioChangeEvent } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { NumberInputWithUnit } from '@/components/number-input-with-unit';
import {
  calculateApplianceCost,
  calculateRefrigeratorAnnualKwhCost,
  type ApplianceCostResult,
} from '@energy-bill-lab/calculation-engine';

import {
  getBenchmarksByApplianceType,
  type ApplianceBenchmark,
} from '@/content/appliance-benchmarks';
import { trackRefrigeratorAnalytics } from '../lib/refrigerator-analytics';
import {
  DEFAULT_REFRIGERATOR_FORM_VALUES,
  refrigeratorSchema,
  type RefrigeratorFormValues,
} from '../schemas/refrigerator-schema';
import styles from './refrigerator-form.module.css';

type StateOption = {
  stateCode: string;
  stateName: string;
  rateCentsPerKwh: number;
};

type RefrigeratorFormProps = {
  onCalculate: (result: ApplianceCostResult, values: RefrigeratorFormValues) => void;
  onReset: () => void;
  stateOptions?: StateOption[];
  sourcePeriodText?: string;
};

export function RefrigeratorForm({
  onCalculate,
  onReset,
  stateOptions = [],
  sourcePeriodText,
}: RefrigeratorFormProps) {
  const [form] = Form.useForm<RefrigeratorFormValues>();
  const [mode, setMode] = useState<'wattage' | 'annual_kwh'>('wattage');
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string | undefined>(
    'standard-top-freezer-fridge',
  );
  const [announcement, setAnnouncement] = useState('');

  const benchmarks = getBenchmarksByApplianceType('refrigerator');

  const handleBenchmarkSelect = (benchmark: ApplianceBenchmark) => {
    setSelectedBenchmarkId(benchmark.id);
    form.setFieldsValue({
      mode: 'wattage',
      wattage: benchmark.exampleWatts,
      hoursPerDay: benchmark.exampleRuntime,
      dutyCyclePercent: benchmark.exampleDutyCyclePercent,
      presetId: benchmark.id,
    });
    setMode('wattage');

    trackRefrigeratorAnalytics({
      event: 'refrigerator_preset_selected',
      mode: 'wattage',
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
      trackRefrigeratorAnalytics({
        event: 'refrigerator_state_average_used',
        mode,
      });
    }
  };

  const handleSubmit = (values: RefrigeratorFormValues) => {
    const parseResult = refrigeratorSchema.safeParse(values);
    if (!parseResult.success) {
      return;
    }

    let result: ApplianceCostResult;
    if (values.mode === 'annual_kwh') {
      result = calculateRefrigeratorAnnualKwhCost({
        annualKwh: values.annualKwh,
        days: values.days,
        rateCentsPerKwh: values.rateCentsPerKwh,
      });
    } else {
      result = calculateApplianceCost({
        wattage: values.wattage,
        hoursPerDay: values.hoursPerDay,
        days: values.days,
        rateCentsPerKwh: values.rateCentsPerKwh,
        dutyCyclePercent: values.dutyCyclePercent,
      });
    }

    const costBand =
      result.monthlyCostUsd < 15 ? 'LOW' : result.monthlyCostUsd < 40 ? 'MEDIUM' : 'HIGH';

    trackRefrigeratorAnalytics({
      event: 'refrigerator_calculation_completed',
      mode: values.mode,
      hasPreset: Boolean(selectedBenchmarkId),
      hasCustomRate: !values.selectedStateCode,
      costBand,
    });

    setAnnouncement(
      `Calculated refrigerator cost: $${result.monthlyCostUsd.toFixed(2)} per month.`,
    );
    onCalculate(result, values);
  };

  const handleReset = () => {
    form.resetFields();
    setMode('wattage');
    setSelectedBenchmarkId(undefined);
    setAnnouncement('Form reset to default values.');
    trackRefrigeratorAnalytics({ event: 'refrigerator_result_reset', mode: 'wattage' });
    onReset();
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.liveRegion} aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <div className={styles.presetSection}>
        <div className={styles.presetHeader}>Illustrative Refrigerator Benchmarks</div>
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
        initialValues={DEFAULT_REFRIGERATOR_FORM_VALUES}
        onFinish={handleSubmit}
      >
        <div className={styles.modeToggle}>
          <Form.Item name="mode" label="Calculation Mode">
            <Radio.Group
              onChange={(e: RadioChangeEvent) => {
                const val = e.target.value as unknown;
                if (val === 'wattage' || val === 'annual_kwh') {
                  setMode(val);
                }
              }}
              buttonStyle="solid"
            >
              <Radio.Button value="wattage">Wattage & Compressor Cycling</Radio.Button>
              <Radio.Button value="annual_kwh">Known Annual EnergyGuide kWh</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>

        <div className={styles.inputGrid}>
          {mode === 'wattage' ? (
            <>
              <Form.Item
                name="wattage"
                label="Rated Power Draw (Watts)"
                rules={[{ required: true, message: 'Please enter wattage' }]}
              >
                <NumberInputWithUnit min={1} max={5000} unit="W" />
              </Form.Item>

              <Form.Item name="dutyCyclePercent" label="Compressor Duty Cycle (%)">
                <NumberInputWithUnit min={0} max={100} unit="%" />
              </Form.Item>

              <Form.Item name="hoursPerDay" label="Connected Duration per Day (Hours)">
                <NumberInputWithUnit min={0} max={24} unit="hrs" />
              </Form.Item>
            </>
          ) : (
            <Form.Item
              name="annualKwh"
              label="Annual EnergyGuide Rating (kWh/year)"
              rules={[{ required: true, message: 'Please enter annual kWh' }]}
            >
              <NumberInputWithUnit min={1} max={5000} unit="kWh/yr" />
            </Form.Item>
          )}

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
            Calculate Refrigerator Cost
          </Button>
        </div>
      </Form>
    </div>
  );
}
