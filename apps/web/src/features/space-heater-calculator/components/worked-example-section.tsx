'use client';

import type { SpaceHeaterCostResult } from '@energy-bill-lab/calculation-engine';
import React from 'react';

import styles from './worked-example-section.module.css';

type WorkedExampleSectionProps = {
  result: SpaceHeaterCostResult;
  periodDays: number;
};

export function WorkedExampleSection({ result, periodDays }: WorkedExampleSectionProps) {
  return (
    <div className={styles.exampleContainer}>
      <h2 className={styles.sectionTitle}>
        Calculation Methodology & Worked Example ({periodDays} Days)
      </h2>

      <p style={{ lineHeight: 1.6, color: '#434343' }}>
        Electric resistance space heaters convert 100% of drawn electrical power into room heat at
        the point of use. Operating cost is calculated by multiplying total connected wattage by
        active runtime and tariff rate:
      </p>

      <div className={styles.box}>
        <div>
          <span className={styles.stepTitle}>Step 1 (Effective Watts):</span>{' '}
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
        Why Space Heater Style Does Not Override Wattage
      </h3>
      <p style={{ lineHeight: 1.6, color: '#434343' }}>
        All standard plug-in electric resistance heaters (ceramic, oil-filled radiator, infrared,
        fan-forced, or quartz) convert electrical energy to heat at virtually 100% point-of-use
        efficiency. A 1,500-watt oil-filled heater draws the exact same electrical power as a
        1,500-watt ceramic fan heater on high setting.
      </p>
      <div
        className={styles.box}
        style={{
          fontFamily: 'sans-serif',
          fontSize: 13,
          background: '#fff7e6',
          borderColor: '#ffd591',
        }}
      >
        💡 <strong>Key Takeaway:</strong> Different heater styles alter how heat is distributed
        (radiant warmth vs. forced airflow), but operating cost is determined strictly by{' '}
        <strong>wattage rating, quantity, runtime, and thermostat duty cycle</strong>.
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>
        Spot Heating vs. Whole-Home Central Heating
      </h3>
      <p style={{ lineHeight: 1.6, color: '#434343' }}>
        Portable space heaters are designed for <em>supplemental spot heating</em> in single
        occupied rooms. Using space heaters to warm an entire house is generally far more expensive
        than central heat pump or natural gas systems because electric resistance heat has a
        Coefficient of Performance (COP) of 1.0, whereas modern heat pumps deliver a COP of 2.5 to
        4.0+.
      </p>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>
        General Electrical Safety Guidelines
      </h3>
      <ul style={{ paddingLeft: 20, lineHeight: 1.7, color: '#595959', fontSize: 14 }}>
        <li>
          Plug space heaters directly into a dedicated wall outlet. Avoid power strips or
          lightweight extension cords, which can overheat.
        </li>
        <li>
          Maintain at least 3 feet of clearance around the heater away from furniture, bedding,
          curtains, and paper.
        </li>
        <li>
          Never leave a space heater running unattended or while sleeping. Ensure the unit features
          automatic tip-over shutoff protection.
        </li>
        <li>
          Calculations provide informational estimates. Actual utility bills depend on local tariff
          tiers, fixed customer charges, and household billing variations.
        </li>
      </ul>
    </div>
  );
}
