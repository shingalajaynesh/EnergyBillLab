'use client';

import type { EvChargingCostResult } from '@energy-bill-lab/calculation-engine';
import React from 'react';

import styles from './worked-example-section.module.css';

type WorkedExampleSectionProps = {
  result: EvChargingCostResult;
};

export function WorkedExampleSection({ result }: WorkedExampleSectionProps) {
  return (
    <div className={styles.exampleContainer}>
      <h2 className={styles.sectionTitle}>Calculation Methodology & Worked Example</h2>

      <p style={{ lineHeight: 1.6, color: '#434343' }}>
        Charging an electric vehicle at home involves converting wall-outlet AC power to
        battery-stored DC power. Operating cost is calculated from{' '}
        <strong>grid electricity drawn</strong>, not just net battery capacity:
      </p>

      <div className={styles.box}>
        <div>
          <span className={styles.stepTitle}>Step 1 (SoC Added):</span>{' '}
          {result.workedExample.step1Percent}
        </div>
        <div style={{ marginTop: 8 }}>
          <span className={styles.stepTitle}>Step 2 (Net Battery Energy):</span>{' '}
          {result.workedExample.step2BatteryKwh}
        </div>
        <div style={{ marginTop: 8 }}>
          <span className={styles.stepTitle}>Step 3 (Grid Energy + Loss):</span>{' '}
          {result.workedExample.step3GridKwh}
        </div>
        <div style={{ marginTop: 4 }}>
          <span className={styles.stepTitle}>Step 4 (Session Cost):</span>{' '}
          {result.workedExample.step4Cost}
        </div>
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>
        Distinguishing Net Battery Energy vs. Grid Energy
      </h3>
      <p style={{ lineHeight: 1.6, color: '#434343' }}>
        Your utility meter records total AC electrical energy drawn from the electric grid. When
        charging an EV, 8% to 15% of grid power is converted into thermal heat within the onboard
        AC-to-DC converter, charging cable, and battery thermal management system. Therefore, a 45
        kWh battery charge typically requires 50 kWh to 53 kWh of grid electricity.
      </p>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>
        Level 1 vs. Level 2 EV Home Charging
      </h3>
      <p style={{ lineHeight: 1.6, color: '#434343' }}>
        Standard 120V Level 1 trickle charging (1.4 kW draw) generally experiences lower AC-to-DC
        conversion efficiency (~80%-85%) due to longer active cooling fan runtimes and baseline
        vehicle electronics draw. 240V Level 2 chargers (7.2 kW - 11.5 kW draw) achieve higher
        efficiency (~88%-92%) by reducing total charging time.
      </p>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>
        Time-of-Use (TOU) Rates & Off-Peak Savings
      </h3>
      <p style={{ lineHeight: 1.6, color: '#434343' }}>
        Many electric utilities offer special EV rate plans or Time-of-Use (TOU) tariffs where
        electricity prices drop by 30% to 60% during overnight off-peak hours (e.g. 11 PM to 6 AM).
        Scheduling your EV charger to operate off-peak significantly reduces annual fuel costs.
      </p>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>
        Electrical Safety & Installation Guidance
      </h3>
      <ul style={{ paddingLeft: 20, lineHeight: 1.7, color: '#595959', fontSize: 14 }}>
        <li>
          Follow vehicle and charger manufacturer guidelines for charging limits and maintenance.
        </li>
        <li>
          Ensure home Level 2 charging equipment is installed on a dedicated 240V circuit rated for
          125% of continuous load (e.g. a 40A circuit for a 32A charger).
        </li>
        <li>
          Permanent hardwired charger installation should be performed by a qualified electrician in
          compliance with local electrical codes and permits.
        </li>
        <li>
          This calculator provides informational estimates for home charging energy. Actual utility
          bills depend on local tariff tiers, fixed customer service charges, and household billing
          variations.
        </li>
      </ul>
    </div>
  );
}
