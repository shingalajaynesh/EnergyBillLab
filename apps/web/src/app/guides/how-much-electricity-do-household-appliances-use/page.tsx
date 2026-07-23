import { calculateApplianceCost } from '@energy-bill-lab/calculation-engine';
import type { Metadata } from 'next';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-do-household-appliances-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideApplianceUsagePage() {
  // Execute shared calculation engine for worked example
  const workedExampleResult = calculateApplianceCost({
    wattage: 1500,
    hoursPerDay: 8,
    days: 30,
    rateCentsPerKwh: 16.5,
    dutyCyclePercent: 100,
  });

  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>1. Understanding Power Ratings: Watts vs. Kilowatts</h2>
        <p>
          Electrical appliances are labeled with a power rating in <strong>Watts (W)</strong> or{' '}
          <strong>Kilowatts (kW)</strong> (where 1 kW = 1,000 Watts). This rating indicates the rate
          at which the appliance consumes electrical energy when active.
        </p>
        <p>
          Your electric utility does not bill you for Watts directly; it bills you for total energy
          consumed over time, measured in <strong>kilowatt-hours (kWh)</strong>. One kWh represents
          1,000 Watts of electrical power drawn continuously for one hour.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Core Energy Calculation Formula</h2>
        <p>
          To calculate monthly electricity consumption (kWh) and cost for any appliance, use the
          standard formula:
        </p>
        <div className={styles.formulaBox}>
          Period kWh = (Appliance Watts × Hours per Day × Days × Duty Cycle %) ÷ 100,000
          <br />
          Period Cost (USD) = (Period kWh × Electricity Rate in ¢/kWh) ÷ 100
        </div>
        <p>
          Where <strong>Duty Cycle %</strong> represents the fraction of time the appliance draws
          active power while turned on (e.g., 50% for a cycling refrigerator compressor).
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Why Two 1,500W Appliances Have Different Monthly Costs</h2>
        <p>
          A common source of confusion is comparing appliances with equal nameplate wattage. A
          1,500W toaster and a 1,500W space heater draw the exact same 1.5 kW when active. However,
          a toaster operates for only 3 minutes per day (0.05 hours), whereas a space heater might
          run for 8 hours daily.
        </p>
        <ul>
          <li>
            <strong>1,500W Toaster (3 min/day for 30 days):</strong> 1,500W × 0.05 hrs × 30 days ÷
            1,000 = <strong>2.25 kWh/month</strong> ($0.37/month at 16.5¢/kWh).
          </li>
          <li>
            <strong>1,500W Space Heater (8 hrs/day for 30 days):</strong> 1,500W × 8.0 hrs × 30 days
            ÷ 1,000 = <strong>360.00 kWh/month</strong> ($59.40/month at 16.5¢/kWh).
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>4. Typical Household Appliance Power Benchmarks</h2>
        <p>
          Below is a reference benchmark table showing typical wattage ratings, estimated daily
          runtimes, and monthly energy consumption for common home appliances:
        </p>
        <div className={styles.tableWrapper}>
          <table aria-label="Appliance Power Consumption Benchmarks">
            <caption>Illustrative Appliance Wattage & Monthly Energy Consumption Baselines</caption>
            <thead>
              <tr>
                <th scope="col">Appliance</th>
                <th scope="col">Typical Rated Watts</th>
                <th scope="col">Daily Runtime</th>
                <th scope="col">Est. Duty Cycle</th>
                <th scope="col">Est. Monthly kWh</th>
                <th scope="col">Est. Monthly Cost (at 16.5¢)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>LED Light Bulb (100W Equivalent)</td>
                <td>14 W</td>
                <td>6 hours</td>
                <td>100%</td>
                <td>2.52 kWh</td>
                <td>$0.42</td>
              </tr>
              <tr>
                <td>55&quot; Smart Television</td>
                <td>110 W</td>
                <td>5 hours</td>
                <td>100%</td>
                <td>16.50 kWh</td>
                <td>$2.72</td>
              </tr>
              <tr>
                <td>ENERGY STAR Refrigerator (18 cu ft)</td>
                <td>150 W</td>
                <td>24 hours</td>
                <td>35% (cycling)</td>
                <td>37.80 kWh</td>
                <td>$6.24</td>
              </tr>
              <tr>
                <td>Desktop Computer & Dual Monitors</td>
                <td>200 W</td>
                <td>8 hours</td>
                <td>100%</td>
                <td>48.00 kWh</td>
                <td>$7.92</td>
              </tr>
              <tr>
                <td>Dishwasher (Heated Dry)</td>
                <td>1,200 W</td>
                <td>1 hour</td>
                <td>100%</td>
                <td>36.00 kWh</td>
                <td>$5.94</td>
              </tr>
              <tr>
                <td>Electric Clothes Dryer</td>
                <td>4,000 W</td>
                <td>0.75 hours</td>
                <td>100%</td>
                <td>90.00 kWh</td>
                <td>$14.85</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>5. Engine-Verified Calculation Example</h2>
        <div className={styles.workedExampleCard}>
          <h3>Calculation Case Study: 1,500W Appliance (8 hrs/day at 16.5¢/kWh)</h3>
          <p>
            Using Energy Bill Lab&apos;s calculation engine, here is the exact step-by-step output
            for a 1,500W load running 8 hours daily over a 30-day billing period:
          </p>
          <div className={styles.exampleGrid}>
            <div className={styles.exampleItem}>
              <div className={styles.label}>Calculation Formula</div>
              <div className={styles.value}>{workedExampleResult.workedExample.formulaSummary}</div>
            </div>
            <div className={styles.exampleItem}>
              <div className={styles.label}>Step 1: Period kWh</div>
              <div className={styles.value}>{workedExampleResult.workedExample.step1Kwh}</div>
            </div>
            <div className={styles.exampleItem}>
              <div className={styles.label}>Step 2: Total Cost</div>
              <div className={styles.value}>{workedExampleResult.workedExample.step2Cost}</div>
            </div>
            <div className={styles.exampleItem}>
              <div className={styles.label}>Annual Estimate</div>
              <div className={styles.value}>
                {workedExampleResult.annualKwh} kWh (${workedExampleResult.annualCostUsd})
              </div>
            </div>
          </div>
          <p>
            <em>
              Note: Actual energy consumption varies depending on appliance age, efficiency
              maintenance, and household operating conditions.
            </em>
          </p>
        </div>
      </section>
    </GuideArticleView>
  );
}
