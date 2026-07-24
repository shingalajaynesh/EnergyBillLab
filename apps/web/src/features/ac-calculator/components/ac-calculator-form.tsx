'use client';

import { InfoCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { calculateAcCost, type AcCostResult } from '@energy-bill-lab/calculation-engine';
import { Button, Radio, Select } from 'antd';
import React, { useState } from 'react';

import { NumberInputWithUnit } from '@/components/number-input-with-unit';

import { AC_PRESETS, type AcPreset } from '../constants/ac-presets';
import { trackAcAnalytics } from '../lib/ac-analytics';
import {
  DEFAULT_AC_FORM_VALUES,
  type AcCalculatorFormValues,
} from '../schemas/ac-calculator-schema';
import styles from './ac-calculator-form.module.css';

export type StateRateOption = {
  code: string;
  name: string;
  priceCentsPerKwh: number;
  period: string;
};

type AcCalculatorFormProps = {
  onCalculate: (result: AcCostResult) => void;
  onReset: () => void;
  stateRates?: StateRateOption[];
};

export function AcCalculatorForm({ onCalculate, onReset, stateRates = [] }: AcCalculatorFormProps) {
  const [values, setValues] = useState<AcCalculatorFormValues>(DEFAULT_AC_FORM_VALUES);
  const [selectedPreset, setSelectedPreset] = useState<AcPreset | null>(
    AC_PRESETS.find((p) => p.id === DEFAULT_AC_FORM_VALUES.presetId) || null,
  );
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handlePresetSelect = (preset: AcPreset) => {
    setSelectedPreset(preset);
    const updated: AcCalculatorFormValues = {
      ...values,
      mode: preset.mode,
      acType: preset.acType,
      wattage: preset.wattage ?? values.wattage,
      coolingCapacityBtu: preset.coolingCapacityBtu ?? values.coolingCapacityBtu,
      eer: preset.eer ?? values.eer,
      hoursPerDay: preset.defaultHoursPerDay,
      dutyCyclePercent: preset.defaultDutyCyclePercent,
      presetId: preset.id,
    };
    setValues(updated);
    runCalculation(updated, true);

    trackAcAnalytics({
      event: 'ac_preset_selected',
      calculationMethod: preset.mode,
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

      trackAcAnalytics({
        event: 'ac_state_average_used',
        hasCustomRate: false,
      });
    }
  };

  const runCalculation = (
    currentValues: AcCalculatorFormValues,
    isPresetAction = false,
    isStateAction = false,
  ) => {
    setValidationError(null);
    try {
      const result = calculateAcCost({
        mode: currentValues.mode,
        acType: currentValues.acType,
        wattage: currentValues.wattage,
        coolingCapacityBtu: currentValues.coolingCapacityBtu,
        eer: currentValues.eer,
        hoursPerDay: currentValues.hoursPerDay,
        days: currentValues.days,
        rateCentsPerKwh: currentValues.rateCentsPerKwh,
        dutyCyclePercent: currentValues.dutyCyclePercent,
      });

      onCalculate(result);

      const monthlyFormatted = result.monthlyCostUsd.toFixed(2);
      setLiveAnnouncement(
        `AC calculation updated. Estimated monthly operating cost is $${monthlyFormatted} USD (${result.periodKwh.toFixed(1)} kWh over ${currentValues.days} days).`,
      );

      let band: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH' = 'LOW';
      if (result.monthlyCostUsd > 100) band = 'VERY_HIGH';
      else if (result.monthlyCostUsd > 50) band = 'HIGH';
      else if (result.monthlyCostUsd > 20) band = 'MEDIUM';

      trackAcAnalytics({
        event: 'ac_calculation_completed',
        calculationMethod: currentValues.mode,
        hasPreset: isPresetAction || Boolean(selectedPreset),
        hasCustomRate: isStateAction || Boolean(selectedStateCode),
        hasDutyCycleAdjustment: currentValues.dutyCyclePercent < 100,
        resultBand: band,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Invalid AC calculation inputs.';
      setValidationError(msg);
      setLiveAnnouncement(`Calculation error: ${msg}`);
    }
  };

  const handleReset = () => {
    setValues(DEFAULT_AC_FORM_VALUES);
    setSelectedPreset(AC_PRESETS.find((p) => p.id === DEFAULT_AC_FORM_VALUES.presetId) || null);
    setSelectedStateCode(null);
    setValidationError(null);
    setLiveAnnouncement('AC calculator reset to default parameters.');
    onReset();

    trackAcAnalytics({
      event: 'ac_result_reset',
    });
  };

  return (
    <div className={styles.formCard}>
      {/* Accessibility Announcement */}
      <div aria-live="polite" aria-atomic="true" className={styles.liveRegion}>
        {liveAnnouncement}
      </div>

      {/* Mode Switcher */}
      <div className={styles.modeToggleSection}>
        <div className={styles.modeHeader}>Calculation Method</div>
        <Radio.Group
          value={values.mode}
          onChange={(e) => {
            const nextMode = e.target.value as 'capacity_eer' | 'wattage';
            const next = { ...values, mode: nextMode };
            setValues(next);
            runCalculation(next);

            trackAcAnalytics({
              event: 'ac_calculation_method_selected',
              calculationMethod: nextMode,
            });
          }}
          optionType="button"
          buttonStyle="solid"
          style={{ width: '100%', display: 'flex', gap: 8 }}
        >
          <Radio.Button
            value="capacity_eer"
            style={{ flex: 1, textAlign: 'center', minHeight: 44, lineHeight: '42px' }}
          >
            Cooling Capacity & Efficiency (BTU + EER)
          </Radio.Button>
          <Radio.Button
            value="wattage"
            style={{ flex: 1, textAlign: 'center', minHeight: 44, lineHeight: '42px' }}
          >
            Known Electrical Wattage (Watts)
          </Radio.Button>
        </Radio.Group>
      </div>

      {/* Presets */}
      <div className={styles.presetSection}>
        <div className={styles.presetHeader}>Quick AC Benchmarks</div>
        <div className={styles.presetGrid}>
          {AC_PRESETS.map((preset) => {
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

      {/* Input Grid */}
      <div className={styles.inputGrid}>
        {/* Conditional Mode Inputs */}
        {values.mode === 'capacity_eer' ? (
          <>
            {/* Cooling Capacity BTU */}
            <div className={styles.inputGroup}>
              <label
                htmlFor="ac-capacity-input"
                style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
              >
                Cooling Capacity (BTU/hr) *
              </label>
              <NumberInputWithUnit
                id="ac-capacity-input"
                aria-label="Cooling Capacity in BTU per hour"
                value={values.coolingCapacityBtu}
                min={1000}
                max={120000}
                step={500}
                unit="BTU/hr"
                style={{ width: '100%', minHeight: 44 }}
                onChange={(val) => {
                  if (val !== null) {
                    const next = { ...values, coolingCapacityBtu: val, presetId: undefined };
                    setSelectedPreset(null);
                    setValues(next);
                    runCalculation(next);
                  }
                }}
              />
              <div className={styles.fieldHint}>Note: 12,000 BTU/hr = 1 Cooling Ton.</div>
            </div>

            {/* EER Rating */}
            <div className={styles.inputGroup}>
              <label
                htmlFor="ac-eer-input"
                style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
              >
                Energy Efficiency Ratio (EER) *
              </label>
              <NumberInputWithUnit
                id="ac-eer-input"
                aria-label="Energy Efficiency Ratio EER"
                value={values.eer}
                min={1}
                max={40}
                step={0.5}
                precision={1}
                unit="EER"
                style={{ width: '100%', minHeight: 44 }}
                onChange={(val) => {
                  if (val !== null) {
                    const next = { ...values, eer: val, presetId: undefined };
                    setSelectedPreset(null);
                    setValues(next);
                    runCalculation(next);
                  }
                }}
              />
              <div className={styles.fieldHint}>
                BTU per Watt-Hour rating (higher is more efficient).
              </div>
            </div>
          </>
        ) : (
          /* Electrical Input Wattage */
          <div className={styles.inputGroup}>
            <label
              htmlFor="ac-wattage-input"
              style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
            >
              AC Electrical Input Power (Watts) *
            </label>
            <NumberInputWithUnit
              id="ac-wattage-input"
              aria-label="AC Electrical Input Power in Watts"
              value={values.wattage}
              min={10}
              max={20000}
              step={50}
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
            <div className={styles.fieldHint}>
              Electrical power input rating listed on the unit specification label.
            </div>
          </div>
        )}

        {/* AC Category / Type */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="ac-type-select"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Air Conditioner Category
          </label>
          <Select
            id="ac-type-select"
            aria-label="Air Conditioner Category"
            value={values.acType}
            onChange={(val) => {
              const next = { ...values, acType: val };
              setValues(next);
              runCalculation(next);
            }}
            style={{ width: '100%', minHeight: 44 }}
            options={[
              { value: 'window', label: 'Window Air Conditioner' },
              { value: 'portable', label: 'Portable Air Conditioner' },
              { value: 'minisplit', label: 'Ductless Mini-Split System' },
              { value: 'central', label: 'Central Air Conditioning System' },
              { value: 'custom', label: 'Custom / Other Unit' },
            ]}
          />
          <div className={styles.fieldHint}>Equipment design type baseline.</div>
        </div>

        {/* Operating Hours per Day */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="ac-hours-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Operating Duration per Day (Hours) *
          </label>
          <NumberInputWithUnit
            id="ac-hours-input"
            aria-label="Operating Duration per Day in Hours"
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
          <div className={styles.fieldHint}>Number of hours the AC unit is turned on daily.</div>
        </div>

        {/* Days */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="ac-days-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Calculation Period (Days) *
          </label>
          <NumberInputWithUnit
            id="ac-days-input"
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
          <div className={styles.fieldHint}>Billing period duration (default 30 days).</div>
        </div>

        {/* Electricity Rate */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="ac-rate-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Electricity Rate (Cents per kWh) *
          </label>
          <NumberInputWithUnit
            id="ac-rate-input"
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
            Enter your bill rate or select a state EIA benchmark.
          </div>
        </div>

        {/* Optional State EIA Rate */}
        {stateRates.length > 0 && (
          <div className={styles.inputGroup}>
            <label
              htmlFor="ac-state-select"
              style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
            >
              Optional State Rate Benchmark
            </label>
            <Select
              id="ac-state-select"
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
            htmlFor="ac-duty-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Compressor Duty Cycle (% Active Draw){' '}
            <span style={{ fontWeight: 'normal', fontSize: 13 }}>
              <InfoCircleOutlined title="Percentage of time the compressor actively runs while thermostat is on." />
            </span>
          </label>
          <NumberInputWithUnit
            id="ac-duty-input"
            aria-label="Compressor Duty Cycle Percentage"
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
            Typical AC duty cycle is 50%–70% under thermostat control.
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
