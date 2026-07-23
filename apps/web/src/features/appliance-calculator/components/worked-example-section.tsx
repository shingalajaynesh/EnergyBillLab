'use client';

import type { ApplianceCostResult } from '@energy-bill-lab/calculation-engine';
import React from 'react';

import styles from './worked-example-section.module.css';

type WorkedExampleSectionProps = {
  result: ApplianceCostResult;
  periodDays: number;
};

export function WorkedExampleSection({ result, periodDays }: WorkedExampleSectionProps) {
  return (
    <div className={styles.exampleContainer}>
      <h2 className={styles.sectionTitle}>
        Formula & Step-by-Step Calculation Breakdown ({periodDays} Days)
      </h2>

      <p style={{ lineHeight: 1.6, color: '#434343' }}>
        Appliance energy calculations use the standard physics conversion formula from Power (Watts)
        and Duration (Hours) to Energy (Kilowatt-Hours), factored by duty cycle and electricity
        tariff rates:
      </p>

      <div className={styles.box}>
        <div>
          <span className={styles.stepTitle}>Formula:</span> {result.workedExample.formulaSummary}
        </div>
        <div style={{ marginTop: 8 }}>
          <span className={styles.stepTitle}>Step 1 (Energy):</span> {result.workedExample.step1Kwh}
        </div>
        <div style={{ marginTop: 4 }}>
          <span className={styles.stepTitle}>Step 2 (Cost):</span> {result.workedExample.step2Cost}
        </div>
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>
        Understanding Duty Cycle
      </h3>
      <p style={{ lineHeight: 1.6, color: '#434343' }}>
        <strong>Duty Cycle</strong> represents the estimated percentage of time an appliance
        actively draws its rated power while switched on.
      </p>
      <ul style={{ paddingLeft: 20, lineHeight: 1.7, color: '#434343' }}>
        <li>
          <strong>100% Duty Cycle:</strong> Continuous heating elements (space heaters, hair dryers,
          clothes dryers) and electronics (computers, LED bulbs) draw full nameplate power while on.
        </li>
        <li>
          <strong>30% – 50% Duty Cycle:</strong> Thermostatically controlled appliances
          (refrigerators, freezers, air conditioners) cycle their compressors on and off to maintain
          target temperatures.
        </li>
      </ul>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>
        How to Find Your Appliance Wattage
      </h3>
      <p style={{ lineHeight: 1.6, color: '#434343' }}>
        Look for the electrical specification label on the back or bottom of your appliance. It
        lists power in Watts (W). If your label lists Volts (V) and Amperes (A), multiply them to
        calculate Watts:
      </p>
      <div
        className={styles.box}
        style={{ fontFamily: 'sans-serif', fontSize: 13, background: '#f0f5ff' }}
      >
        <strong>Power Equation:</strong> Watts (W) = Volts (V) × Amps (A)
        <br />
        <em>Example: A 120V toaster drawing 10A uses 1,200 Watts (120V × 10A = 1,200W).</em>
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>
        Important Limitations & Caveats
      </h3>
      <ul style={{ paddingLeft: 20, lineHeight: 1.7, color: '#595959', fontSize: 14 }}>
        <li>
          Nameplate wattage represents maximum or peak power rating; actual power draw during
          variable operation may be lower.
        </li>
        <li>
          Calculated costs do not include tiered utility rate structures or fixed monthly customer
          delivery fees.
        </li>
        <li>
          Seasonal ambient temperature changes significantly impact heating and cooling appliance
          cycle times.
        </li>
      </ul>
    </div>
  );
}
