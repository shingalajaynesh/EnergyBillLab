'use client';

import { InfoCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import {
  calculateApplianceCost,
  type ApplianceCostResult,
} from '@energy-bill-lab/calculation-engine';
import { Button, Select } from 'antd';
import React, { useState } from 'react';

import { NumberInputWithUnit } from '@/components/number-input-with-unit';

import { APPLIANCE_PRESETS, type AppliancePreset } from '../constants/appliance-presets';
import { trackApplianceAnalytics } from '../lib/appliance-analytics';
import {
  DEFAULT_APPLIANCE_FORM_VALUES,
  type ApplianceCalculatorFormValues,
} from '../schemas/appliance-calculator-schema';
import styles from './appliance-calculator-form.module.css';

export type StateRateOption = {
  code: string;
  name: string;
  priceCentsPerKwh: number;
  period: string;
};

type ApplianceCalculatorFormProps = {
  onCalculate: (result: ApplianceCostResult) => void;
  onReset: () => void;
  stateRates?: StateRateOption[];
};

export function ApplianceCalculatorForm({
  onCalculate,
  onReset,
  stateRates = [],
}: ApplianceCalculatorFormProps) {
  const [values, setValues] = useState<ApplianceCalculatorFormValues>(
    DEFAULT_APPLIANCE_FORM_VALUES,
  );
  const [selectedPreset, setSelectedPreset] = useState<AppliancePreset | null>(
    APPLIANCE_PRESETS.find((p) => p.id === DEFAULT_APPLIANCE_FORM_VALUES.presetId) || null,
  );
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handlePresetSelect = (preset: AppliancePreset) => {
    setSelectedPreset(preset);
    const updated: ApplianceCalculatorFormValues = {
      ...values,
      wattage: preset.wattage,
      hoursPerDay: preset.defaultHoursPerDay,
      dutyCyclePercent: preset.defaultDutyCyclePercent,
      presetId: preset.id,
    };
    setValues(updated);
    runCalculation(updated, true);

    trackApplianceAnalytics({
      event: 'appliance_preset_selected',
      hasPreset: true,
      hasDutyCycleAdjustment: preset.defaultDutyCyclePercent < 100,
    });
  };

  const handleStateSelect = (stateCode: string) => {
    setSelectedStateCode(stateCode);
    const match = stateRates.find((s) => s.code === stateCode);
    if (match) {
      const updated = { ...values, rateCentsPerKwh: match.priceCentsPerKwh };
      setValues(updated);
      runCalculation(updated, false, true);

      trackApplianceAnalytics({
        event: 'state_average_used',
        hasCustomRate: false,
      });
    }
  };

  const runCalculation = (
    currentValues: ApplianceCalculatorFormValues,
    isPresetAction = false,
    isStateAction = false,
  ) => {
    setValidationError(null);
    try {
      const result = calculateApplianceCost({
        wattage: currentValues.wattage,
        hoursPerDay: currentValues.hoursPerDay,
        days: currentValues.days,
        rateCentsPerKwh: currentValues.rateCentsPerKwh,
        dutyCyclePercent: currentValues.dutyCyclePercent,
      });

      onCalculate(result);

      const monthlyFormatted = result.monthlyCostUsd.toFixed(2);
      setLiveAnnouncement(
        `Calculation updated. Estimated monthly operating cost is $${monthlyFormatted} USD for ${result.periodKwh.toFixed(1)} kWh over ${currentValues.days} days.`,
      );

      // Determine result cost band for privacy-safe analytics
      let band: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH' = 'LOW';
      if (result.monthlyCostUsd > 50) band = 'VERY_HIGH';
      else if (result.monthlyCostUsd > 20) band = 'HIGH';
      else if (result.monthlyCostUsd > 5) band = 'MEDIUM';

      trackApplianceAnalytics({
        event: 'appliance_calculation_completed',
        hasPreset: isPresetAction || Boolean(selectedPreset),
        hasCustomRate: isStateAction || Boolean(selectedStateCode),
        hasDutyCycleAdjustment: currentValues.dutyCyclePercent < 100,
        resultBand: band,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Invalid calculation inputs.';
      setValidationError(msg);
      setLiveAnnouncement(`Calculation error: ${msg}`);
    }
  };

  const handleReset = () => {
    setValues(DEFAULT_APPLIANCE_FORM_VALUES);
    setSelectedPreset(
      APPLIANCE_PRESETS.find((p) => p.id === DEFAULT_APPLIANCE_FORM_VALUES.presetId) || null,
    );
    setSelectedStateCode(null);
    setValidationError(null);
    setLiveAnnouncement('Calculator reset to default parameters.');
    onReset();

    trackApplianceAnalytics({
      event: 'appliance_result_reset',
    });
  };

  return (
    <div className={styles.formCard}>
      {/* Live Region Accessibility Announcement */}
      <div aria-live="polite" aria-atomic="true" className={styles.liveRegion}>
        {liveAnnouncement}
      </div>

      {/* Appliance Presets */}
      <div className={styles.presetSection}>
        <div className={styles.presetHeader}>Quick Appliance Presets (Typical Benchmarks)</div>
        <div className={styles.presetGrid}>
          {APPLIANCE_PRESETS.map((preset) => {
            const isSelected = selectedPreset?.id === preset.id;
            return (
              <Button
                key={preset.id}
                type={isSelected ? 'primary' : 'default'}
                className={styles.presetBtn}
                onClick={() => handlePresetSelect(preset)}
                aria-pressed={isSelected}
              >
                {preset.name}
              </Button>
            );
          })}
        </div>
        {selectedPreset && <div className={styles.presetCaveat}>💡 {selectedPreset.caveat}</div>}
      </div>

      {/* Inputs Form Grid */}
      <div className={styles.inputGrid}>
        {/* Wattage */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="appliance-wattage-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Appliance Power Rating (Watts) *
          </label>
          <NumberInputWithUnit
            id="appliance-wattage-input"
            aria-label="Appliance Power Rating in Watts"
            value={values.wattage}
            min={1}
            max={50000}
            step={10}
            unit="W"
            style={{ width: '100%', minHeight: 44 }}
            onChange={(val) => {
              if (val !== null) {
                const next = { ...values, wattage: val, presetId: undefined };
                setSelectedPreset(null);
                setValues(next);
                runCalculation(next);
              }
            }}
          />
          <div className={styles.fieldHint}>Continuous or maximum nameplate wattage rating.</div>
        </div>

        {/* Hours Per Day */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="appliance-hours-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Usage Duration per Day (Hours) *
          </label>
          <NumberInputWithUnit
            id="appliance-hours-input"
            aria-label="Usage Duration per Day in Hours"
            value={values.hoursPerDay}
            min={0}
            max={24}
            step={0.5}
            unit="hrs/day"
            style={{ width: '100%', minHeight: 44 }}
            onChange={(val) => {
              if (val !== null) {
                const next = { ...values, hoursPerDay: val };
                setValues(next);
                runCalculation(next);
              }
            }}
          />
          <div className={styles.fieldHint}>
            Hours the appliance is switched on or plugged in daily.
          </div>
        </div>

        {/* Calculation Period (Days) */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="appliance-days-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Calculation Period (Days) *
          </label>
          <NumberInputWithUnit
            id="appliance-days-input"
            aria-label="Calculation Period in Days"
            value={values.days}
            min={1}
            max={365}
            step={1}
            unit="days"
            style={{ width: '100%', minHeight: 44 }}
            onChange={(val) => {
              if (val !== null) {
                const next = { ...values, days: val };
                setValues(next);
                runCalculation(next);
              }
            }}
          />
          <div className={styles.fieldHint}>
            Standard billing period duration (default 30 days).
          </div>
        </div>

        {/* Electricity Rate */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="appliance-rate-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Electricity Rate (Cents per kWh) *
          </label>
          <NumberInputWithUnit
            id="appliance-rate-input"
            aria-label="Electricity Rate in Cents per kWh"
            value={values.rateCentsPerKwh}
            min={0.1}
            max={500}
            step={0.1}
            precision={2}
            unit="¢/kWh"
            style={{ width: '100%', minHeight: 44 }}
            onChange={(val) => {
              if (val !== null) {
                const next = { ...values, rateCentsPerKwh: val };
                setValues(next);
                runCalculation(next);
              }
            }}
          />
          <div className={styles.fieldHint}>
            Check your monthly electric bill or select a state EIA benchmark below.
          </div>
        </div>

        {/* Optional State EIA Average Rate Dropdown */}
        {stateRates.length > 0 && (
          <div className={styles.inputGroup}>
            <label
              htmlFor="appliance-state-select"
              style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
            >
              Optional State Rate Benchmark
            </label>
            <Select
              id="appliance-state-select"
              aria-label="Select U.S. State Average Rate"
              placeholder="Select U.S. State (EIA Average)"
              value={selectedStateCode}
              onChange={handleStateSelect}
              allowClear
              onClear={() => setSelectedStateCode(null)}
              style={{ width: '100%', minHeight: 44 }}
              options={stateRates.map((s) => ({
                value: s.code,
                label: `${s.name} (${s.priceCentsPerKwh.toFixed(2)}¢/kWh - EIA ${s.period.substring(0, 7)})`,
              }))}
            />
            <div className={styles.fieldHint}>
              Fills official EIA state residential average rate.
            </div>
          </div>
        )}

        {/* Duty Cycle Percentage */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="appliance-duty-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Duty Cycle (% Active Draw){' '}
            <span style={{ fontWeight: 'normal', fontSize: 13 }}>
              <InfoCircleOutlined title="Percentage of time the appliance actively draws full rated power while running." />
            </span>
          </label>
          <NumberInputWithUnit
            id="appliance-duty-input"
            aria-label="Duty Cycle Percentage"
            value={values.dutyCyclePercent}
            min={0}
            max={100}
            step={5}
            unit="%"
            style={{ width: '100%', minHeight: 44 }}
            onChange={(val) => {
              if (val !== null) {
                const next = { ...values, dutyCyclePercent: val };
                setValues(next);
                runCalculation(next);
              }
            }}
          />
          <div className={styles.fieldHint}>
            e.g. 100% for space heaters/dryers; ~33% for cycling refrigerators.
          </div>
        </div>
      </div>

      {validationError && (
        <div role="alert" style={{ color: '#ff4d4f', marginTop: 12, fontSize: 14 }}>
          ⚠️ {validationError}
        </div>
      )}

      {/* Action Buttons */}
      <div className={styles.actionRow}>
        <Button icon={<ReloadOutlined />} onClick={handleReset} style={{ minHeight: 44 }}>
          Reset Parameters
        </Button>
      </div>
    </div>
  );
}
