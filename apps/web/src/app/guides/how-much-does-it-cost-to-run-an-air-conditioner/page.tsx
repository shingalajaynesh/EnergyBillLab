import { calculateAcCost } from '@energy-bill-lab/calculation-engine';
import type { Metadata } from 'next';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-does-it-cost-to-run-an-air-conditioner']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideAcCostPage() {
  // Execute shared calculation engine for worked example: 12,000 BTU Window AC, EER 10.0, 8 hrs/day, 65% duty cycle, 16.5¢/kWh
  const workedExampleResult = calculateAcCost({
    mode: 'capacity_eer',
    coolingCapacityBtu: 12000,
    eer: 10,
    hoursPerDay: 8,
    days: 30,
    rateCentsPerKwh: 16.5,
    dutyCyclePercent: 65,
  });

  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>1. Cooling Capacity vs. Electrical Input Watts</h2>
        <p>
          Air conditioner sizing is rated in{' '}
          <strong>British Thermal Units per hour (BTU/hr)</strong> or{' '}
          <strong>Tons of Cooling</strong> (1 Ton = 12,000 BTU/hr). BTU measures how much heat
          energy the unit can remove from a room per hour.
        </p>
        <p>
          However, your electric meter measures electrical input power (Watts), not cooling BTUs. To
          find an air conditioner&apos;s electrical wattage, divide its cooling capacity by its{' '}
          <strong>Energy Efficiency Ratio (EER)</strong>:
        </p>
        <div className={styles.formulaBox}>Input Watts = Cooling Capacity (BTU/hr) ÷ EER</div>
        <p>
          For example, a 12,000 BTU room air conditioner with an EER rating of 10.0 draws{' '}
          <strong>1,200 Watts</strong> of electrical power when its compressor is running (12,000 ÷
          10).
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Understanding Thermostat Cycling & Duty Cycle</h2>
        <p>
          Air conditioners do not draw full electrical power constantly while turned on. When room
          temperature reaches your thermostat setpoint, the compressor cycles off while the indoor
          fan continues circulating air.
        </p>
        <p>
          The <strong>duty cycle percentage</strong> reflects the proportion of time the compressor
          is actively running. During moderate 82°F weather, a compressor might run at a 50% duty
          cycle. During a 98°F summer heatwave, the compressor may run at an 85% to 95% duty cycle.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Monthly Operating Cost Comparison by AC Type</h2>
        <p>
          Below is a comparison table showing estimated monthly cooling costs across standard air
          conditioner configurations based on a 30-day billing period at an electricity rate of
          16.5¢/kWh:
        </p>
        <div className={styles.tableWrapper}>
          <table aria-label="Air Conditioner Operating Cost Benchmarks">
            <caption>Air Conditioner Monthly Electricity Cost Benchmarks by Unit Type</caption>
            <thead>
              <tr>
                <th scope="col">AC Unit Type</th>
                <th scope="col">Cooling Capacity</th>
                <th scope="col">Input Watts</th>
                <th scope="col">Daily Hours</th>
                <th scope="col">Duty Cycle</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Est. Monthly Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Small Bedroom Window AC</td>
                <td>6,000 BTU/hr</td>
                <td>545 W</td>
                <td>8 hours</td>
                <td>60%</td>
                <td>78.5 kWh</td>
                <td>$12.95</td>
              </tr>
              <tr>
                <td>Medium Living Room Window AC</td>
                <td>12,000 BTU/hr</td>
                <td>1,200 W</td>
                <td>8 hours</td>
                <td>65%</td>
                <td>187.2 kWh</td>
                <td>$30.89</td>
              </tr>
              <tr>
                <td>Ductless Mini-Split Heat Pump</td>
                <td>18,000 BTU/hr</td>
                <td>1,440 W</td>
                <td>10 hours</td>
                <td>50%</td>
                <td>216.0 kWh</td>
                <td>$35.64</td>
              </tr>
              <tr>
                <td>Central Air Conditioner (3 Ton)</td>
                <td>36,000 BTU/hr</td>
                <td>3,272 W</td>
                <td>9 hours</td>
                <td>60%</td>
                <td>530.1 kWh</td>
                <td>$87.47</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>4. Engine-Verified Calculation Example</h2>
        <div className={styles.workedExampleCard}>
          <h3>
            Calculation Case Study: 12,000 BTU Window AC (EER 10.0, 8 hrs/day, 65% Duty Cycle)
          </h3>
          <p>
            Here is the step-by-step output generated by Energy Bill Lab&apos;s shared calculation
            engine:
          </p>
          <div className={styles.exampleGrid}>
            <div className={styles.exampleItem}>
              <div className={styles.label}>Electrical Input Draw</div>
              <div className={styles.value}>{workedExampleResult.inputWatts} Watts</div>
            </div>
            <div className={styles.exampleItem}>
              <div className={styles.label}>Effective Power Draw</div>
              <div className={styles.value}>{workedExampleResult.effectiveWatts} Watts</div>
            </div>
            <div className={styles.exampleItem}>
              <div className={styles.label}>Monthly Energy (kWh)</div>
              <div className={styles.value}>{workedExampleResult.monthlyKwh} kWh</div>
            </div>
            <div className={styles.exampleItem}>
              <div className={styles.label}>Monthly Operating Cost</div>
              <div className={styles.value}>${workedExampleResult.monthlyCostUsd}</div>
            </div>
          </div>
          <p>
            <strong>Step-by-Step Formula:</strong> Input Watts = 12,000 ÷ 10 = 1,200W. Effective
            Watts = 1,200W × 0.65 = 780W. Monthly kWh = (780W × 8 hrs × 30 days) ÷ 1,000 = 187.20
            kWh. Monthly Cost = (187.20 kWh × 16.5¢) ÷ 100 = $30.89.
          </p>
        </div>
      </section>
    </GuideArticleView>
  );
}
