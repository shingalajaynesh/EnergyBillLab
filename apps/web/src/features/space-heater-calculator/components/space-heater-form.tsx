'use client';

import { InfoCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import {
  calculateSpaceHeaterCost,
  type SpaceHeaterCostResult,
} from '@energy-bill-lab/calculation-engine';
import { Button, InputNumber, Select } from 'antd';
import React, { useState } from 'react';

import { HEATER_PRESETS, type SpaceHeaterPreset } from '../constants/heater-presets';
import { trackHeaterAnalytics } from '../lib/heater-analytics';
import {
  DEFAULT_HEATER_FORM_VALUES,
  type SpaceHeaterFormValues,
} from '../schemas/heater-calculator-schema';
import styles from './space-heater-form.module.css';

export type StateRateOption = {
  code: string;
  name: string;
  priceCentsPerKwh: number;
  period: string;
};

type SpaceHeaterFormProps = {
  onCalculate: (result: SpaceHeaterCostResult) => void;
  onReset: () => void;
  stateRates?: StateRateOption[];
};

export function SpaceHeaterForm({ onCalculate, onReset, stateRates = [] }: SpaceHeaterFormProps) {
  const [values, setValues] = useState<SpaceHeaterFormValues>(DEFAULT_HEATER_FORM_VALUES);
  const [selectedPreset, setSelectedPreset] = useState<SpaceHeaterPreset | null>(
    HEATER_PRESETS.find((p) => p.id === DEFAULT_HEATER_FORM_VALUES.presetId) || null,
  );
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handlePresetSelect = (preset: SpaceHeaterPreset) => {
    setSelectedPreset(preset);
    const updated: SpaceHeaterFormValues = {
      ...values,
      heaterWatts: preset.heaterWatts,
      quantity: preset.quantity,
      hoursPerDay: preset.defaultHoursPerDay,
      dutyCyclePercent: preset.defaultDutyCyclePercent,
      presetId: preset.id,
    };
    setValues(updated);
    runCalculation(updated, true);

    trackHeaterAnalytics({
      event: 'heater_preset_selected',
      hasPreset: true,
      hasMultipleHeaters: preset.quantity > 1,
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

      trackHeaterAnalytics({
        event: 'heater_state_average_used',
        hasCustomRate: false,
      });
    }
  };

  const runCalculation = (
    currentValues: SpaceHeaterFormValues,
    isPresetAction = false,
    isStateAction = false,
  ) => {
    setValidationError(null);
    try {
      const result = calculateSpaceHeaterCost({
        heaterWatts: currentValues.heaterWatts,
        quantity: currentValues.quantity,
        hoursPerDay: currentValues.hoursPerDay,
        days: currentValues.days,
        rateCentsPerKwh: currentValues.rateCentsPerKwh,
        dutyCyclePercent: currentValues.dutyCyclePercent,
      });

      onCalculate(result);

      const monthlyFormatted = result.monthlyCostUsd.toFixed(2);
      setLiveAnnouncement(
        `Space heater calculation updated. Estimated monthly operating cost for ${currentValues.quantity} unit${currentValues.quantity > 1 ? 's' : ''} is $${monthlyFormatted} USD (${result.periodKwh.toFixed(1)} kWh over ${currentValues.days} days).`,
      );

      let band: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH' = 'LOW';
      if (result.monthlyCostUsd > 100) band = 'VERY_HIGH';
      else if (result.monthlyCostUsd > 50) band = 'HIGH';
      else if (result.monthlyCostUsd > 20) band = 'MEDIUM';

      trackHeaterAnalytics({
        event: 'heater_calculation_completed',
        hasPreset: isPresetAction || Boolean(selectedPreset),
        hasMultipleHeaters: currentValues.quantity > 1,
        hasCustomRate: isStateAction || Boolean(selectedStateCode),
        hasDutyCycleAdjustment: currentValues.dutyCyclePercent < 100,
        resultBand: band,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Invalid space heater calculation inputs.';
      setValidationError(msg);
      setLiveAnnouncement(`Calculation error: ${msg}`);
    }
  };

  const handleReset = () => {
    setValues(DEFAULT_HEATER_FORM_VALUES);
    setSelectedPreset(
      HEATER_PRESETS.find((p) => p.id === DEFAULT_HEATER_FORM_VALUES.presetId) || null,
    );
    setSelectedStateCode(null);
    setValidationError(null);
    setLiveAnnouncement('Space heater calculator reset to default parameters.');
    onReset();

    trackHeaterAnalytics({
      event: 'heater_result_reset',
    });
  };

  return (
    <div className={styles.formCard}>
      {/* Accessibility Live Announcement */}
      <div aria-live="polite" aria-atomic="true" className={styles.liveRegion}>
        {liveAnnouncement}
      </div>

      {/* Presets */}
      <div className={styles.presetSection}>
        <div className={styles.presetHeader}>Space Heater Example Presets</div>
        <div className={styles.presetGrid}>
          {HEATER_PRESETS.map((preset) => {
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

      {/* Inputs Grid */}
      <div className={styles.inputGrid}>
        {/* Heater Watts */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="heater-watts-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Heater Wattage Rating (Watts) *
          </label>
          <InputNumber
            id="heater-watts-input"
            aria-label="Space Heater Wattage Rating in Watts"
            value={values.heaterWatts}
            min={10}
            max={10000}
            step={50}
            addonAfter="W"
            style={{ width: '100%', minHeight: 44 }}
            onChange={(val) => {
              if (val !== null) {
                const next = { ...values, heaterWatts: val, presetId: undefined };
                setSelectedPreset(null);
                setValues(next);
                runCalculation(next);
              }
            }}
          />
          <div className={styles.fieldHint}>
            Rated electrical power rating listed on the heater label (e.g. 1,500W).
          </div>
        </div>

        {/* Quantity */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="heater-qty-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Number of Space Heaters (Quantity) *
          </label>
          <InputNumber
            id="heater-qty-input"
            aria-label="Number of Space Heaters"
            value={values.quantity}
            min={1}
            max={20}
            step={1}
            precision={0}
            addonAfter="unit(s)"
            style={{ width: '100%', minHeight: 44 }}
            onChange={(val) => {
              if (val !== null) {
                const next = { ...values, quantity: val };
                setValues(next);
                runCalculation(next);

                trackHeaterAnalytics({
                  event: 'heater_quantity_changed',
                  hasMultipleHeaters: val > 1,
                });
              }
            }}
          />
          <div className={styles.fieldHint}>Multiplies total connected electrical load.</div>
        </div>

        {/* Operating Hours per Day */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="heater-hours-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Operating Duration per Day (Hours) *
          </label>
          <InputNumber
            id="heater-hours-input"
            aria-label="Operating Duration per Day in Hours"
            value={values.hoursPerDay}
            min={0}
            max={24}
            step={0.5}
            addonAfter="hrs/day"
            style={{ width: '100%', minHeight: 44 }}
            onChange={(val) => {
              if (val !== null) {
                const next = { ...values, hoursPerDay: val };
                setValues(next);
                runCalculation(next);
              }
            }}
          />
          <div className={styles.fieldHint}>Total hours the heater switch is left ON per day.</div>
        </div>

        {/* Period (Days) */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="heater-days-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Calculation Period (Days) *
          </label>
          <InputNumber
            id="heater-days-input"
            aria-label="Calculation Period in Days"
            value={values.days}
            min={1}
            max={365}
            step={1}
            addonAfter="days"
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

        {/* Rate Cents per kWh */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="heater-rate-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Electricity Rate (Cents per kWh) *
          </label>
          <InputNumber
            id="heater-rate-input"
            aria-label="Electricity Rate in Cents per kWh"
            value={values.rateCentsPerKwh}
            min={0.1}
            max={500}
            step={0.1}
            precision={2}
            addonAfter="¢/kWh"
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

        {/* State Rate Benchmark */}
        {stateRates.length > 0 && (
          <div className={styles.inputGroup}>
            <label
              htmlFor="heater-state-select"
              style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
            >
              Optional State Rate Benchmark
            </label>
            <Select
              id="heater-state-select"
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

        {/* Thermostat Duty Cycle */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="heater-duty-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Thermostat Duty Cycle (% Active Draw){' '}
            <span style={{ fontWeight: 'normal', fontSize: 13 }}>
              <InfoCircleOutlined title="Percentage of time the heating element actively draws full power while switched on." />
            </span>
          </label>
          <InputNumber
            id="heater-duty-input"
            aria-label="Thermostat Duty Cycle Percentage"
            value={values.dutyCyclePercent}
            min={0}
            max={100}
            step={5}
            addonAfter="%"
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
            Set to 100% for unthermostatted continuous heating; 70%-90% for thermostat cycling.
          </div>
        </div>
      </div>

      {validationError && (
        <div role="alert" style={{ color: '#ff4d4f', marginTop: 12, fontSize: 14 }}>
          ⚠️ {validationError}
        </div>
      )}

      {/* Actions */}
      <div className={styles.actionRow}>
        <Button icon={<ReloadOutlined />} onClick={handleReset} style={{ minHeight: 44 }}>
          Reset Parameters
        </Button>
      </div>
    </div>
  );
}
