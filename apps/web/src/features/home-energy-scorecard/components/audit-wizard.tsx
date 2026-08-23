'use client';

import React, { useState } from 'react';
import { Steps, Form, InputNumber, Select, Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, ExperimentOutlined } from '@ant-design/icons';
import {
  calculateHomeEnergyScore,
  type CalculateHomeEnergyScoreOutput,
  type YearBuiltTier,
  type ClimateZone,
  type InsulationLevel,
  type HeatingType,
  type CoolingType,
  type WaterHeaterType,
  type WindowType,
} from '@energy-bill-lab/calculation-engine';

import { EfficiencyGradeCard } from './efficiency-grade-card';
import styles from './home-energy-scorecard.module.css';

interface WizardState {
  squareFootage: number;
  yearBuiltTier: YearBuiltTier;
  climateZone: ClimateZone;
  insulationLevel: InsulationLevel;
  heatingType: HeatingType;
  coolingType: CoolingType;
  waterHeaterType: WaterHeaterType;
  windowType: WindowType;
  electricityRateCentsPerKwh: number;
  gasPriceDollarsPerTherm: number;
}

const INITIAL_STATE: WizardState = {
  squareFootage: 2000,
  yearBuiltTier: '1991_2005',
  climateZone: 'moderate',
  insulationLevel: 'average_batt',
  heatingType: 'gas_standard_80',
  coolingType: 'central_standard_seer14',
  waterHeaterType: 'gas_tank',
  windowType: 'double_clear',
  electricityRateCentsPerKwh: 16.5,
  gasPriceDollarsPerTherm: 1.45,
};

export function AuditWizard() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formState, setFormState] = useState<WizardState>(INITIAL_STATE);
  const [report, setReport] = useState<CalculateHomeEnergyScoreOutput | null>(null);

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const result = calculateHomeEnergyScore({
        squareFootage: formState.squareFootage,
        yearBuiltTier: formState.yearBuiltTier,
        climateZone: formState.climateZone,
        insulationLevel: formState.insulationLevel,
        heatingType: formState.heatingType,
        coolingType: formState.coolingType,
        waterHeaterType: formState.waterHeaterType,
        windowType: formState.windowType,
        electricityRateCentsPerKwh: formState.electricityRateCentsPerKwh,
        gasPriceDollarsPerTherm: formState.gasPriceDollarsPerTherm,
      });
      setReport(result);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setReport(null);
    setCurrentStep(0);
    setFormState(INITIAL_STATE);
  };

  if (report) {
    return <EfficiencyGradeCard scorecard={report} onReset={handleReset} />;
  }

  const steps = [
    { title: 'Home & Climate', description: 'Size & Envelope' },
    { title: 'HVAC & Water', description: 'Mechanical Systems' },
    { title: 'Rates & Review', description: 'Tariff Benchmark' },
  ];

  return (
    <div className={styles.auditContainer} aria-label="Whole-Home Energy Audit Wizard">
      <Steps current={currentStep} items={steps} style={{ marginBottom: 32 }} responsive={true} />

      {/* STEP 0: Home & Climate */}
      {currentStep === 0 && (
        <div>
          <div className={styles.stepHeader}>
            <h2 className={styles.stepTitle}>Step 1: Home Structure & Thermal Envelope</h2>
            <p className={styles.stepSubtitle}>
              Building vintage and insulation resistance determine your home's baseline heating and
              cooling load.
            </p>
          </div>

          <Form layout="vertical">
            <div className={styles.formGrid}>
              <Form.Item label="Finished Living Area (Square Feet)" required>
                <InputNumber
                  min={400}
                  max={15000}
                  step={100}
                  value={formState.squareFootage}
                  onChange={(val) =>
                    setFormState((prev) => ({ ...prev, squareFootage: val ?? 2000 }))
                  }
                  addonAfter="sq ft"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="Year Built / Building Vintage" required>
                <Select<YearBuiltTier>
                  value={formState.yearBuiltTier}
                  onChange={(val) => setFormState((prev) => ({ ...prev, yearBuiltTier: val }))}
                  options={[
                    { value: 'pre_1975', label: 'Before 1975 (Pre-Energy Code / High Leakage)' },
                    { value: '1975_1990', label: '1975 – 1990 (Early Code Baseline)' },
                    { value: '1991_2005', label: '1991 – 2005 (Standard Insulation)' },
                    { value: '2006_2015', label: '2006 – 2015 (Modern IECC Compliant)' },
                    { value: '2016_plus', label: '2016 – Present (High Performance / Tight)' },
                  ]}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="Regional Climate Zone" required>
                <Select<ClimateZone>
                  value={formState.climateZone}
                  onChange={(val) => setFormState((prev) => ({ ...prev, climateZone: val }))}
                  options={[
                    { value: 'cold', label: 'Cold / Sub-Freezing (Northeast, Midwest, Mountain)' },
                    { value: 'moderate', label: 'Moderate / Mixed (Mid-Atlantic, Central)' },
                    { value: 'hot_humid', label: 'Hot & Humid (Southeast, Gulf Coast, Texas)' },
                    { value: 'hot_dry', label: 'Hot & Dry / Desert (Southwest, Arizona)' },
                    { value: 'marine', label: 'Marine / Mild (Pacific Northwest)' },
                  ]}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="Attic & Wall Insulation Quality" required>
                <Select<InsulationLevel>
                  value={formState.insulationLevel}
                  onChange={(val) => setFormState((prev) => ({ ...prev, insulationLevel: val }))}
                  options={[
                    {
                      value: 'poor_uninsulated',
                      label: 'Poor / Uninsulated (Drafty, <R-19 Attic)',
                    },
                    {
                      value: 'average_batt',
                      label: 'Average (Standard Fiberglass Batts R-19 to R-30)',
                    },
                    { value: 'high_r38_r49', label: 'High (R-38 to R-49 Blown Attic Insulation)' },
                    {
                      value: 'air_sealed_super',
                      label: 'Super-Insulated & Air Sealed (Spray Foam / R-60)',
                    },
                  ]}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      )}

      {/* STEP 1: HVAC & Water */}
      {currentStep === 1 && (
        <div>
          <div className={styles.stepHeader}>
            <h2 className={styles.stepTitle}>Step 2: Heating, Cooling & Water Heating</h2>
            <p className={styles.stepSubtitle}>
              Mechanical equipment accounts for over 70% of total household utility expenditure.
            </p>
          </div>

          <Form layout="vertical">
            <div className={styles.formGrid}>
              <Form.Item label="Primary Heating System" required>
                <Select<HeatingType>
                  value={formState.heatingType}
                  onChange={(val) => setFormState((prev) => ({ ...prev, heatingType: val }))}
                  options={[
                    { value: 'gas_standard_80', label: 'Standard Natural Gas Furnace (80% AFUE)' },
                    { value: 'gas_high_96', label: 'High-Efficiency Gas Furnace (96%+ AFUE)' },
                    { value: 'heat_pump_standard', label: 'Standard Heat Pump (HSPF2 7.5–8.5)' },
                    {
                      value: 'heat_pump_inverter',
                      label: 'Cold-Climate Inverter Heat Pump (HSPF2 10+)',
                    },
                    {
                      value: 'electric_resistance',
                      label: 'Electric Baseboard / Strip Resistance (COP 1.0)',
                    },
                  ]}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="Cooling / Air Conditioning" required>
                <Select<CoolingType>
                  value={formState.coolingType}
                  onChange={(val) => setFormState((prev) => ({ ...prev, coolingType: val }))}
                  options={[
                    {
                      value: 'central_standard_seer14',
                      label: 'Standard Central AC (SEER 14 / SEER2 13.4)',
                    },
                    {
                      value: 'heat_pump_seer2_16',
                      label: 'High-Efficiency Inverter AC / Heat Pump (SEER2 16+)',
                    },
                    { value: 'central_old_seer10', label: 'Aging Central AC (SEER 10 or older)' },
                    { value: 'window_units', label: 'Window / Portable AC Units' },
                    { value: 'none', label: 'No Active Cooling' },
                  ]}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="Domestic Water Heater" required>
                <Select<WaterHeaterType>
                  value={formState.waterHeaterType}
                  onChange={(val) => setFormState((prev) => ({ ...prev, waterHeaterType: val }))}
                  options={[
                    { value: 'gas_tank', label: 'Standard Natural Gas Tank (0.60 UEF)' },
                    {
                      value: 'electric_tank',
                      label: 'Standard Electric Resistance Tank (0.92 UEF)',
                    },
                    {
                      value: 'heat_pump_hybrid',
                      label: 'Hybrid Heat Pump Water Heater (3.5+ UEF)',
                    },
                    { value: 'tankless_gas', label: 'Condensing Gas Tankless (0.90+ UEF)' },
                  ]}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="Window Glazing Type" required>
                <Select<WindowType>
                  value={formState.windowType}
                  onChange={(val) => setFormState((prev) => ({ ...prev, windowType: val }))}
                  options={[
                    { value: 'double_clear', label: 'Standard Double-Pane Clear Glass' },
                    { value: 'double_low_e', label: 'Energy Star Low-E Double-Pane with Argon' },
                    { value: 'single_pane', label: 'Single-Pane Glass (High Heat Transfer)' },
                    { value: 'triple_pane', label: 'Triple-Pane High-Performance Glazing' },
                  ]}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      )}

      {/* STEP 2: Rates & Review */}
      {currentStep === 2 && (
        <div>
          <div className={styles.stepHeader}>
            <h2 className={styles.stepTitle}>Step 3: Energy Utility Rates</h2>
            <p className={styles.stepSubtitle}>
              Adjust your local utility rates to accurately calculate annual waste and retrofit
              payback timelines.
            </p>
          </div>

          <Form layout="vertical">
            <div className={styles.formGrid}>
              <Form.Item label="Electricity Rate (¢/kWh)" required>
                <InputNumber
                  min={1}
                  max={100}
                  step={0.1}
                  value={formState.electricityRateCentsPerKwh}
                  onChange={(val) =>
                    setFormState((prev) => ({ ...prev, electricityRateCentsPerKwh: val ?? 16.5 }))
                  }
                  addonAfter="¢/kWh"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="Natural Gas Price ($/therm)">
                <InputNumber
                  min={0.2}
                  max={15}
                  step={0.05}
                  value={formState.gasPriceDollarsPerTherm}
                  onChange={(val) =>
                    setFormState((prev) => ({ ...prev, gasPriceDollarsPerTherm: val ?? 1.45 }))
                  }
                  prefix="$"
                  addonAfter="/therm"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className={styles.navigationBar}>
        <Button
          onClick={handlePrev}
          disabled={currentStep === 0}
          icon={<ArrowLeftOutlined />}
          size="large"
        >
          Previous
        </Button>

        <Button
          type="primary"
          onClick={handleNext}
          icon={currentStep === 2 ? <ExperimentOutlined /> : <ArrowRightOutlined />}
          size="large"
          style={{ background: '#176b5b', borderColor: '#176b5b', minWidth: 160 }}
        >
          {currentStep === 2 ? 'Generate Scorecard' : 'Next Step'}
        </Button>
      </div>
    </div>
  );
}
