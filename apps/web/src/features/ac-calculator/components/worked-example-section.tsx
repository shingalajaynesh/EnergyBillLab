'use client';

import type { AcCostResult } from '@energy-bill-lab/calculation-engine';
import React from 'react';

import styles from './worked-example-section.module.css';

type WorkedExampleSectionProps = {
  result: AcCostResult;
  periodDays: number;
};

export function WorkedExampleSection({ result, periodDays }: WorkedExampleSectionProps) {
  return (
    <div className={styles.exampleContainer}>
      <h2 className={styles.sectionTitle}>
        AC Calculation Methodology & Worked Example ({periodDays} Days)
      </h2>

      <p style={{ lineHeight: 1.6, color: '#434343' }}>
        Air conditioner electricity calculations translate thermal cooling capacity (BTU/hr) and
        efficiency ratings (EER) into electrical power draw (Watts) and energy consumption
        (kilowatt-hours):
      </p>

      <div className={styles.box}>
        <div>
          <span className={styles.stepTitle}>Step 1 (Input Watts):</span>{' '}
          {result.workedExample.step1Watts}
        </div>
        <div style={{ marginTop: 8 }}>
          <span className={styles.stepTitle}>Step 2 (Energy kWh):</span>{' '}
          {result.workedExample.step2Kwh}
        </div>
        <div style={{ marginTop: 4 }}>
          <span className={styles.stepTitle}>Step 3 (Operating Cost):</span>{' '}
          {result.workedExample.step3Cost}
        </div>
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>
        BTU, EER, and Cooling Tons Explained
      </h3>
      <ul style={{ paddingLeft: 20, lineHeight: 1.7, color: '#434343' }}>
        <li>
          <strong>BTU/hr (British Thermal Units per Hour):</strong> Standard measure of cooling
          capacity. 12,000 BTU/hr equals 1 Cooling Ton.
        </li>
        <li>
          <strong>EER (Energy Efficiency Ratio):</strong> The ratio of cooling capacity (BTU) to
          electrical power input (Watt-hours). Higher EER values indicate more efficient air
          conditioning units.
        </li>
        <li>
          <strong>Input Power Calculation:</strong> Input Watts = Cooling Capacity (BTU/hr) ÷ EER.
          For example, a 12,000 BTU AC with an EER of 12 draws 1,000 Watts (12,000 ÷ 12 = 1,000W).
        </li>
      </ul>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>
        Compressor Duty Cycle & Thermostats
      </h3>
      <p style={{ lineHeight: 1.6, color: '#434343' }}>
        Air conditioners rarely draw peak nameplate power 100% of the time. Once the room reaches
        the thermostat setpoint, the compressor cycles off while the fan continues circulating air.
      </p>
      <div
        className={styles.box}
        style={{ fontFamily: 'sans-serif', fontSize: 13, background: '#e6f4ff' }}
      >
        <strong>Duty Cycle Baseline:</strong> Standard residential air conditioners operate at a 50%
        to 70% duty cycle during hot summer days. Inverter-driven mini-splits modulate power
        dynamically.
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>
        Important Limitations & Exclusions
      </h3>
      <ul style={{ paddingLeft: 20, lineHeight: 1.7, color: '#595959', fontSize: 14 }}>
        <li>
          Nameplate EER ratings represent standard test conditions (95°F outdoor / 80°F indoor).
          Actual operating EER decreases during extreme heatwaves.
        </li>
        <li>
          Calculations exclude central HVAC furnace blower fans (~300W–500W) or external condenser
          fan motors unless included in the unit rating.
        </li>
        <li>
          Calculated costs do not include tiered utility rate thresholds, demand charges, or fixed
          customer service charges.
        </li>
      </ul>
    </div>
  );
}
