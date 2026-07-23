'use client';

import { InfoCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import {
  calculateEvChargingCost,
  type EvChargingCostResult,
} from '@energy-bill-lab/calculation-engine';
import { Button, InputNumber, Select } from 'antd';
import React, { useState } from 'react';

import { EV_PRESETS, type EvPreset } from '../constants/ev-presets';
import { trackEvAnalytics } from '../lib/ev-analytics';
import {
  DEFAULT_EV_FORM_VALUES,
  evCalculatorSchema,
  type EvFormValues,
} from '../schemas/ev-calculator-schema';
import styles from './ev-form.module.css';

export type StateRateOption = {
  code: string;
  name: string;
  priceCentsPerKwh: number;
  period: string;
};

type EvFormProps = {
  onCalculate: (result: EvChargingCostResult) => void;
  onReset: () => void;
  stateRates?: StateRateOption[];
};

export function EvForm({ onCalculate, onReset, stateRates = [] }: EvFormProps) {
  const [values, setValues] = useState<EvFormValues>(DEFAULT_EV_FORM_VALUES);
  const [selectedPreset, setSelectedPreset] = useState<EvPreset | null>(
    EV_PRESETS.find((p) => p.id === DEFAULT_EV_FORM_VALUES.presetId) || null,
  );
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handlePresetSelect = (preset: EvPreset) => {
    setSelectedPreset(preset);
    const updated: EvFormValues = {
      ...values,
      batteryCapacityKwh: preset.batteryCapacityKwh,
      startingChargePercent: preset.defaultStartPercent,
      targetChargePercent: preset.defaultTargetPercent,
      chargingEfficiencyPercent: preset.defaultEfficiencyPercent,
      presetId: preset.id,
    };
    setValues(updated);
    runCalculation(updated, true);

    trackEvAnalytics({
      event: 'ev_preset_selected',
      hasPreset: true,
      hasEfficiencyAdjustment: preset.defaultEfficiencyPercent !== 88,
    });
  };

  const handleStateSelect = (stateCode: string) => {
    setSelectedStateCode(stateCode);
    const match = stateRates.find((s) => s.code === stateCode);
    if (match) {
      const updated = { ...values, rateCentsPerKwh: match.priceCentsPerKwh };
      setValues(updated);
      runCalculation(updated, false, true);

      trackEvAnalytics({
        event: 'ev_state_average_used',
        hasCustomRate: false,
      });
    }
  };

  const runCalculation = (
    currentValues: EvFormValues,
    isPresetAction = false,
    isStateAction = false,
  ) => {
    setValidationError(null);

    const validation = evCalculatorSchema.safeParse(currentValues);
    if (!validation.success) {
      const firstIssue =
        validation.error.issues[0]?.message || 'Invalid EV charging calculation inputs.';
      setValidationError(firstIssue);
      setLiveAnnouncement(`Calculation error: ${firstIssue}`);
      return;
    }

    try {
      const result = calculateEvChargingCost({
        batteryCapacityKwh: currentValues.batteryCapacityKwh,
        startingChargePercent: currentValues.startingChargePercent,
        targetChargePercent: currentValues.targetChargePercent,
        chargingEfficiencyPercent: currentValues.chargingEfficiencyPercent,
        rateCentsPerKwh: currentValues.rateCentsPerKwh,
        milesDriven: currentValues.milesDriven,
        milesPerKwh: currentValues.milesPerKwh,
      });

      onCalculate(result);

      const sessionFormatted = result.chargeCostUsd.toFixed(2);
      setLiveAnnouncement(
        `EV charging calculation updated. Estimated home charging cost for ${result.batteryPercentAdded}% charge (${result.gridEnergyRequiredKwh.toFixed(1)} kWh grid) is $${sessionFormatted} USD.`,
      );

      let rangeBand: 'SMALL_TOPUP' | 'STANDARD_DAILY' | 'DEEP_CHARGE' = 'STANDARD_DAILY';
      if (result.batteryPercentAdded > 70) rangeBand = 'DEEP_CHARGE';
      else if (result.batteryPercentAdded < 40) rangeBand = 'SMALL_TOPUP';

      let costBand: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH' = 'LOW';
      if (result.chargeCostUsd > 15) costBand = 'VERY_HIGH';
      else if (result.chargeCostUsd > 10) costBand = 'HIGH';
      else if (result.chargeCostUsd > 5) costBand = 'MEDIUM';

      trackEvAnalytics({
        event: 'ev_calculation_completed',
        hasPreset: isPresetAction || Boolean(selectedPreset),
        hasMileageEstimate: Boolean(currentValues.milesDriven && currentValues.milesPerKwh),
        hasCustomRate: isStateAction || Boolean(selectedStateCode),
        hasEfficiencyAdjustment: currentValues.chargingEfficiencyPercent !== 88,
        chargeRangeBand: rangeBand,
        resultBand: costBand,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Invalid EV charging calculation inputs.';
      setValidationError(msg);
      setLiveAnnouncement(`Calculation error: ${msg}`);
    }
  };

  const handleReset = () => {
    setValues(DEFAULT_EV_FORM_VALUES);
    setSelectedPreset(EV_PRESETS.find((p) => p.id === DEFAULT_EV_FORM_VALUES.presetId) || null);
    setSelectedStateCode(null);
    setValidationError(null);
    setLiveAnnouncement('EV charging calculator reset to default parameters.');
    onReset();

    trackEvAnalytics({
      event: 'ev_result_reset',
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
        <div className={styles.presetHeader}>EV Battery Example Presets</div>
        <div className={styles.presetGrid}>
          {EV_PRESETS.map((preset) => {
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
        {/* Battery Capacity */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="ev-capacity-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Usable Battery Capacity (kWh) *
          </label>
          <InputNumber
            id="ev-capacity-input"
            aria-label="Usable EV Battery Capacity in kWh"
            value={values.batteryCapacityKwh}
            min={5}
            max={300}
            step={5}
            addonAfter="kWh"
            style={{ width: '100%', minHeight: 44 }}
            onChange={(val) => {
              if (val !== null) {
                const next = { ...values, batteryCapacityKwh: val, presetId: undefined };
                setSelectedPreset(null);
                setValues(next);
                runCalculation(next);
              }
            }}
          />
          <div className={styles.fieldHint}>
            Total usable energy storage of the EV battery pack (e.g. 75 kWh).
          </div>
        </div>

        {/* Starting Charge SoC */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="ev-start-soc-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Starting Charge State of Charge (SoC %) *
          </label>
          <InputNumber
            id="ev-start-soc-input"
            aria-label="Starting Battery Charge Percentage"
            value={values.startingChargePercent}
            min={0}
            max={99}
            step={5}
            addonAfter="%"
            style={{ width: '100%', minHeight: 44 }}
            onChange={(val) => {
              if (val !== null) {
                const next = { ...values, startingChargePercent: val };
                setValues(next);
                runCalculation(next);
              }
            }}
          />
          <div className={styles.fieldHint}>Battery percentage when plugging in (e.g. 20%).</div>
        </div>

        {/* Target Charge SoC */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="ev-target-soc-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Target Charge State of Charge (SoC %) *
          </label>
          <InputNumber
            id="ev-target-soc-input"
            aria-label="Target Battery Charge Percentage"
            value={values.targetChargePercent}
            min={1}
            max={100}
            step={5}
            addonAfter="%"
            style={{ width: '100%', minHeight: 44 }}
            onChange={(val) => {
              if (val !== null) {
                const next = { ...values, targetChargePercent: val };
                setValues(next);
                runCalculation(next);
              }
            }}
          />
          <div className={styles.fieldHint}>
            Battery percentage target (e.g. 80% for daily health).
          </div>
        </div>

        {/* Charging Efficiency */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="ev-efficiency-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Charging Efficiency (% AC-to-Battery){' '}
            <span style={{ fontWeight: 'normal', fontSize: 13 }}>
              <InfoCircleOutlined title="Accounts for onboard AC-to-DC conversion, cable heat loss, and thermal battery management." />
            </span>
          </label>
          <InputNumber
            id="ev-efficiency-input"
            aria-label="AC Charging Efficiency Percentage"
            value={values.chargingEfficiencyPercent}
            min={50}
            max={100}
            step={1}
            addonAfter="%"
            style={{ width: '100%', minHeight: 44 }}
            onChange={(val) => {
              if (val !== null) {
                const next = { ...values, chargingEfficiencyPercent: val };
                setValues(next);
                runCalculation(next);
              }
            }}
          />
          <div className={styles.fieldHint}>
            Level 2 EVSE typically 88%-92%; Level 1 wall outlets ~80%-85%.
          </div>
        </div>

        {/* Electricity Rate */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="ev-rate-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Electricity Rate (Cents per kWh) *
          </label>
          <InputNumber
            id="ev-rate-input"
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
              htmlFor="ev-state-select"
              style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
            >
              Optional State Rate Benchmark
            </label>
            <Select
              id="ev-state-select"
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

        {/* Driving Efficiency Section Header */}
        <div className={styles.subSectionHeader}>Optional Driving Cost Estimates</div>

        {/* Miles Driven */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="ev-miles-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Trip / Daily Driving Distance (Miles)
          </label>
          <InputNumber
            id="ev-miles-input"
            aria-label="Driving Distance in Miles"
            value={values.milesDriven}
            min={1}
            max={50000}
            step={5}
            addonAfter="mi"
            style={{ width: '100%', minHeight: 44 }}
            onChange={(val) => {
              const next = { ...values, milesDriven: val ?? undefined };
              setValues(next);
              if (val !== null) {
                trackEvAnalytics({ event: 'ev_mileage_enabled', hasMileageEstimate: true });
              }
              runCalculation(next);
            }}
          />
          <div className={styles.fieldHint}>
            Optional driving distance to compute cost per mile.
          </div>
        </div>

        {/* Miles per kWh Efficiency */}
        <div className={styles.inputGroup}>
          <label
            htmlFor="ev-mi-kwh-input"
            style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}
          >
            Vehicle Driving Efficiency (Miles per kWh)
          </label>
          <InputNumber
            id="ev-mi-kwh-input"
            aria-label="Vehicle Efficiency in Miles per kWh"
            value={values.milesPerKwh}
            min={0.5}
            max={10}
            step={0.1}
            precision={1}
            addonAfter="mi/kWh"
            style={{ width: '100%', minHeight: 44 }}
            onChange={(val) => {
              const next = { ...values, milesPerKwh: val ?? undefined };
              setValues(next);
              runCalculation(next);
            }}
          />
          <div className={styles.fieldHint}>
            Typical EV efficiency (3.0-4.0 mi/kWh for sedans; 2.0-2.8 for trucks).
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
