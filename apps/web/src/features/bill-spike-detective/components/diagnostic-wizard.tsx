'use client';

import React, { useState } from 'react';
import {
  Steps,
  Form,
  InputNumber,
  Radio,
  Checkbox,
  Button,
  Select,
  type RadioChangeEvent,
} from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, ExperimentOutlined } from '@ant-design/icons';
import {
  diagnoseBillSpike,
  type DiagnoseBillSpikeOutput,
  type BillingSeason,
  type RateStructure,
  type HouseholdEquipment,
  type HouseholdEvent,
} from '@energy-bill-lab/calculation-engine';

import { ForensicReportCard } from './forensic-report-card';
import styles from './bill-spike-detective.module.css';

interface WizardState {
  currentBillAmount: number;
  previousBillAmount: number;
  currentKwh: number;
  previousKwh: number;
  billingDaysCurrent: number;
  billingDaysPrevious: number;
  season: BillingSeason;
  rateStructure: RateStructure;
  equipment: HouseholdEquipment[];
  events: HouseholdEvent[];
  stateCode?: string;
}

const INITIAL_STATE: WizardState = {
  currentBillAmount: 245,
  previousBillAmount: 140,
  currentKwh: 1350,
  previousKwh: 820,
  billingDaysCurrent: 30,
  billingDaysPrevious: 30,
  season: 'summer',
  rateStructure: 'unknown',
  equipment: ['central_ac', 'electric_water_heater'],
  events: ['heat_wave'],
};

export function DiagnosticWizard() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formState, setFormState] = useState<WizardState>(INITIAL_STATE);
  const [report, setReport] = useState<DiagnoseBillSpikeOutput | null>(null);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate final forensic triage
      const result = diagnoseBillSpike({
        currentBillAmount: formState.currentBillAmount,
        previousBillAmount: formState.previousBillAmount,
        currentKwh: formState.currentKwh,
        previousKwh: formState.previousKwh,
        billingDaysCurrent: formState.billingDaysCurrent,
        billingDaysPrevious: formState.billingDaysPrevious,
        season: formState.season,
        rateStructure: formState.rateStructure,
        equipment: formState.equipment,
        events: formState.events,
        stateCode: formState.stateCode,
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
    return <ForensicReportCard diagnosis={report} onReset={handleReset} />;
  }

  const steps = [
    { title: 'Statement Data', description: 'Bill & Usage' },
    { title: 'Season & Climate', description: 'Weather Impact' },
    { title: 'Equipment', description: 'Home Appliances' },
    { title: 'Billing Clues', description: 'Tariff & Habits' },
  ];

  return (
    <div className={styles.detectiveContainer} aria-label="Bill Spike Detective Wizard">
      <Steps current={currentStep} items={steps} style={{ marginBottom: 32 }} responsive={true} />

      {/* STEP 0: Statement Data */}
      {currentStep === 0 && (
        <div>
          <div className={styles.stepHeader}>
            <h2 className={styles.stepTitle}>Step 1: Enter Your Bill & Usage Numbers</h2>
            <p className={styles.stepSubtitle}>
              Compare your current high bill with your previous normal statement to isolate
              kilowatt-hour changes from rate adjustments.
            </p>
          </div>

          <div className={styles.formGrid}>
            <div>
              <div className={styles.formSectionHeading}>Current (High) Billing Period</div>
              <Form layout="vertical">
                <Form.Item label="Current Bill Total ($)" required>
                  <InputNumber
                    min={1}
                    max={5000}
                    value={formState.currentBillAmount}
                    onChange={(val) =>
                      setFormState((prev) => ({ ...prev, currentBillAmount: val ?? 1 }))
                    }
                    prefix="$"
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                <Form.Item label="Current Energy Usage (kWh)" required>
                  <InputNumber
                    min={1}
                    max={20000}
                    value={formState.currentKwh}
                    onChange={(val) => setFormState((prev) => ({ ...prev, currentKwh: val ?? 1 }))}
                    addonAfter="kWh"
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                <Form.Item label="Current Billing Days">
                  <InputNumber
                    min={1}
                    max={60}
                    value={formState.billingDaysCurrent}
                    onChange={(val) =>
                      setFormState((prev) => ({ ...prev, billingDaysCurrent: val ?? 30 }))
                    }
                    addonAfter="Days"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Form>
            </div>

            <div>
              <div className={styles.formSectionHeading}>Previous (Normal) Billing Period</div>
              <Form layout="vertical">
                <Form.Item label="Previous Bill Total ($)" required>
                  <InputNumber
                    min={1}
                    max={5000}
                    value={formState.previousBillAmount}
                    onChange={(val) =>
                      setFormState((prev) => ({ ...prev, previousBillAmount: val ?? 1 }))
                    }
                    prefix="$"
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                <Form.Item label="Previous Energy Usage (kWh)" required>
                  <InputNumber
                    min={1}
                    max={20000}
                    value={formState.previousKwh}
                    onChange={(val) => setFormState((prev) => ({ ...prev, previousKwh: val ?? 1 }))}
                    addonAfter="kWh"
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                <Form.Item label="Previous Billing Days">
                  <InputNumber
                    min={1}
                    max={60}
                    value={formState.billingDaysPrevious}
                    onChange={(val) =>
                      setFormState((prev) => ({ ...prev, billingDaysPrevious: val ?? 30 }))
                    }
                    addonAfter="Days"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      )}

      {/* STEP 1: Season & Climate Context */}
      {currentStep === 1 && (
        <div>
          <div className={styles.stepHeader}>
            <h2 className={styles.stepTitle}>Step 2: Season & Weather Conditions</h2>
            <p className={styles.stepSubtitle}>
              Outdoor temperature swings account for over 50% of residential electricity variance.
            </p>
          </div>

          <Form layout="vertical">
            <Form.Item label="What season did this high bill occur in?" required>
              <Radio.Group
                value={formState.season}
                onChange={(e: RadioChangeEvent) => {
                  const val = e.target.value as BillingSeason;
                  setFormState((prev) => ({ ...prev, season: val }));
                }}
                style={{ width: '100%' }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 12,
                  }}
                >
                  <Radio.Button value="summer" style={{ height: 60, padding: 10 }}>
                    <strong>Summer</strong>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                      Hot weather & air conditioning
                    </div>
                  </Radio.Button>
                  <Radio.Button value="winter" style={{ height: 60, padding: 10 }}>
                    <strong>Winter</strong>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                      Cold snaps & space/heat pump heating
                    </div>
                  </Radio.Button>
                  <Radio.Button value="shoulder" style={{ height: 60, padding: 10 }}>
                    <strong>Spring / Fall</strong>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                      Moderate transition weather
                    </div>
                  </Radio.Button>
                </div>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Did any of these climate or timeline events happen?">
              <Checkbox.Group<HouseholdEvent>
                value={formState.events}
                onChange={(checked) => setFormState((prev) => ({ ...prev, events: checked }))}
                style={{ width: '100%' }}
              >
                <div className={styles.choiceGrid}>
                  <label
                    className={`${styles.choiceCard} ${
                      formState.events.includes('heat_wave') ? styles.choiceCardSelected : ''
                    }`}
                  >
                    <Checkbox value="heat_wave" />
                    <div>
                      <span className={styles.choiceLabel}>Extreme Heat Wave</span>
                      <span className={styles.choiceDesc}>
                        90°F+ temperatures forcing continuous AC
                      </span>
                    </div>
                  </label>

                  <label
                    className={`${styles.choiceCard} ${
                      formState.events.includes('cold_snap') ? styles.choiceCardSelected : ''
                    }`}
                  >
                    <Checkbox value="cold_snap" />
                    <div>
                      <span className={styles.choiceLabel}>Extreme Cold Snap / Polar Vortex</span>
                      <span className={styles.choiceDesc}>
                        Sub-freezing temperatures triggering heat strips
                      </span>
                    </div>
                  </label>

                  <label
                    className={`${styles.choiceCard} ${
                      formState.events.includes('longer_billing_cycle')
                        ? styles.choiceCardSelected
                        : ''
                    }`}
                  >
                    <Checkbox value="longer_billing_cycle" />
                    <div>
                      <span className={styles.choiceLabel}>Longer Billing Cycle</span>
                      <span className={styles.choiceDesc}>
                        32–36 days instead of normal 28–30 days
                      </span>
                    </div>
                  </label>

                  <label
                    className={`${styles.choiceCard} ${
                      formState.events.includes('rate_increase') ? styles.choiceCardSelected : ''
                    }`}
                  >
                    <Checkbox value="rate_increase" />
                    <div>
                      <span className={styles.choiceLabel}>Recent Utility Rate Hike</span>
                      <span className={styles.choiceDesc}>
                        Utility announced higher base or fuel charges
                      </span>
                    </div>
                  </label>
                </div>
              </Checkbox.Group>
            </Form.Item>
          </Form>
        </div>
      )}

      {/* STEP 2: Household Equipment Profile */}
      {currentStep === 2 && (
        <div>
          <div className={styles.stepHeader}>
            <h2 className={styles.stepTitle}>Step 3: Household Equipment & Appliances</h2>
            <p className={styles.stepSubtitle}>
              Select the major power-drawing equipment present in your home during this billing
              cycle.
            </p>
          </div>

          <Checkbox.Group<HouseholdEquipment>
            value={formState.equipment}
            onChange={(checked) => setFormState((prev) => ({ ...prev, equipment: checked }))}
            style={{ width: '100%' }}
          >
            <div className={styles.choiceGrid}>
              <label
                className={`${styles.choiceCard} ${
                  formState.equipment.includes('central_ac') ? styles.choiceCardSelected : ''
                }`}
              >
                <Checkbox value="central_ac" />
                <div>
                  <span className={styles.choiceLabel}>Central Air Conditioning</span>
                  <span className={styles.choiceDesc}>Whole-home AC (3,000W – 4,500W)</span>
                </div>
              </label>

              <label
                className={`${styles.choiceCard} ${
                  formState.equipment.includes('window_ac') ? styles.choiceCardSelected : ''
                }`}
              >
                <Checkbox value="window_ac" />
                <div>
                  <span className={styles.choiceLabel}>Window / Portable AC</span>
                  <span className={styles.choiceDesc}>Room AC units (600W – 1,400W)</span>
                </div>
              </label>

              <label
                className={`${styles.choiceCard} ${
                  formState.equipment.includes('space_heater') ? styles.choiceCardSelected : ''
                }`}
              >
                <Checkbox value="space_heater" />
                <div>
                  <span className={styles.choiceLabel}>Electric Space Heaters</span>
                  <span className={styles.choiceDesc}>Portable plug-in heaters (1,500W each)</span>
                </div>
              </label>

              <label
                className={`${styles.choiceCard} ${
                  formState.equipment.includes('heat_pump') ? styles.choiceCardSelected : ''
                }`}
              >
                <Checkbox value="heat_pump" />
                <div>
                  <span className={styles.choiceLabel}>Heat Pump with Backup Strips</span>
                  <span className={styles.choiceDesc}>Electric auxiliary strips (5–15 kW)</span>
                </div>
              </label>

              <label
                className={`${styles.choiceCard} ${
                  formState.equipment.includes('electric_water_heater')
                    ? styles.choiceCardSelected
                    : ''
                }`}
              >
                <Checkbox value="electric_water_heater" />
                <div>
                  <span className={styles.choiceLabel}>Electric Tank Water Heater</span>
                  <span className={styles.choiceDesc}>Standard resistance tank (4,500W)</span>
                </div>
              </label>

              <label
                className={`${styles.choiceCard} ${
                  formState.equipment.includes('ev') ? styles.choiceCardSelected : ''
                }`}
              >
                <Checkbox value="ev" />
                <div>
                  <span className={styles.choiceLabel}>Electric Vehicle (EV)</span>
                  <span className={styles.choiceDesc}>Level 1 or Level 2 home charging</span>
                </div>
              </label>

              <label
                className={`${styles.choiceCard} ${
                  formState.equipment.includes('pool_pump') ? styles.choiceCardSelected : ''
                }`}
              >
                <Checkbox value="pool_pump" />
                <div>
                  <span className={styles.choiceLabel}>Swimming Pool Pump</span>
                  <span className={styles.choiceDesc}>Filtration pump (1,000W – 2,500W)</span>
                </div>
              </label>

              <label
                className={`${styles.choiceCard} ${
                  formState.equipment.includes('hot_tub') ? styles.choiceCardSelected : ''
                }`}
              >
                <Checkbox value="hot_tub" />
                <div>
                  <span className={styles.choiceLabel}>Hot Tub / Spa</span>
                  <span className={styles.choiceDesc}>Heater & jet pumps (1,500W – 6,000W)</span>
                </div>
              </label>
            </div>
          </Checkbox.Group>
        </div>
      )}

      {/* STEP 3: Billing & Behavioral Clues */}
      {currentStep === 3 && (
        <div>
          <div className={styles.stepHeader}>
            <h2 className={styles.stepTitle}>Step 4: Statement Clues & Lifestyle Factors</h2>
            <p className={styles.stepSubtitle}>
              Identify special utility statement conditions or temporary household changes.
            </p>
          </div>

          <Form layout="vertical">
            <Form.Item label="Check any special billing indicators or household changes:">
              <Checkbox.Group<HouseholdEvent>
                value={formState.events}
                onChange={(checked) => setFormState((prev) => ({ ...prev, events: checked }))}
                style={{ width: '100%' }}
              >
                <div className={styles.choiceGrid}>
                  <label
                    className={`${styles.choiceCard} ${
                      formState.events.includes('estimated_meter_reading')
                        ? styles.choiceCardSelected
                        : ''
                    }`}
                  >
                    <Checkbox value="estimated_meter_reading" />
                    <div>
                      <span className={styles.choiceLabel}>"Estimated" Meter Reading on Bill</span>
                      <span className={styles.choiceDesc}>
                        Utility estimated usage or did a catch-up true-up
                      </span>
                    </div>
                  </label>

                  <label
                    className={`${styles.choiceCard} ${
                      formState.events.includes('guests_or_wfh') ? styles.choiceCardSelected : ''
                    }`}
                  >
                    <Checkbox value="guests_or_wfh" />
                    <div>
                      <span className={styles.choiceLabel}>
                        Visiting Guests or Working from Home
                      </span>
                      <span className={styles.choiceDesc}>
                        More people home during daytime hours
                      </span>
                    </div>
                  </label>

                  <label
                    className={`${styles.choiceCard} ${
                      formState.events.includes('new_appliance') ? styles.choiceCardSelected : ''
                    }`}
                  >
                    <Checkbox value="new_appliance" />
                    <div>
                      <span className={styles.choiceLabel}>Added New Major Appliance</span>
                      <span className={styles.choiceDesc}>
                        New second fridge, freezer, dehumidifier, etc.
                      </span>
                    </div>
                  </label>
                </div>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item label="Utility Rate Structure (if known)">
              <Select<RateStructure>
                value={formState.rateStructure}
                onChange={(val) => setFormState((prev) => ({ ...prev, rateStructure: val }))}
                options={[
                  { value: 'unknown', label: "I don't know / Standard Flat Rate" },
                  { value: 'tiered', label: 'Tiered Pricing (Rates increase as usage increases)' },
                  { value: 'tou', label: 'Time-of-Use (TOU) Rates (Expensive peak 4 PM – 9 PM)' },
                  { value: 'flat', label: 'Flat Fixed Rate per kWh' },
                ]}
                style={{ width: '100%', maxWidth: 400 }}
              />
            </Form.Item>
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
          icon={currentStep === 3 ? <ExperimentOutlined /> : <ArrowRightOutlined />}
          size="large"
          style={{ background: '#176b5b', borderColor: '#176b5b', minWidth: 160 }}
        >
          {currentStep === 3 ? 'Run Forensic Triage' : 'Next Step'}
        </Button>
      </div>
    </div>
  );
}
