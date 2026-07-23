import { calculateEvChargingCost } from '@energy-bill-lab/calculation-engine';
import type { Metadata } from 'next';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-does-it-cost-to-charge-an-ev-at-home']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideEvChargingCostPage() {
  // Execute shared calculation engine for worked example: 75 kWh battery, 20% to 80% charge (60% added), 88% Level 2 efficiency, 16.5¢/kWh
  const workedExampleResult = calculateEvChargingCost({
    batteryCapacityKwh: 75,
    startingChargePercent: 20,
    targetChargePercent: 80,
    chargingEfficiencyPercent: 88,
    rateCentsPerKwh: 16.5,
  });

  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>1. Battery Capacity vs. Grid Energy Required</h2>
        <p>
          Electric vehicle (EV) battery sizes are measured in <strong>kilowatt-hours (kWh)</strong>,
          typically ranging from 40 kWh for compact commuter cars to 100+ kWh for long-range SUVs
          and electric trucks.
        </p>
        <p>
          When charging at home, your electric meter measures more kWh than the battery receives
          because of <strong>charging efficiency losses</strong>. Electrical energy is lost as heat
          during AC-to-DC power conversion inside the onboard charger and battery thermal
          conditioning.
        </p>
        <div className={styles.formulaBox}>
          Grid Energy Required (kWh) = Battery Energy Added (kWh) ÷ (Charging Efficiency % ÷ 100)
        </div>
      </section>

      <section className={styles.section}>
        <h2>2. Level 1 vs. Level 2 Home Charging Efficiency</h2>
        <p>Home EV charging is categorized into two voltage levels:</p>
        <ul>
          <li>
            <strong>Level 1 (120V Standard Outlet):</strong> Delivers 1.4 kW to 1.9 kW of power (3-5
            miles of range per hour). Level 1 charging operates at approximately{' '}
            <strong>80% to 85% efficiency</strong> due to longer thermal cooling fan runtimes.
          </li>
          <li>
            <strong>Level 2 (240V Dedicated Circuit):</strong> Delivers 7.2 kW to 11.5 kW of power
            (20-40 miles of range per hour). Level 2 charging operates at approximately{' '}
            <strong>88% to 92% efficiency</strong>, reducing grid loss overhead.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>3. EV Home Charging Session Cost Benchmarks</h2>
        <p>
          Below is a reference benchmark table showing grid energy draw and session costs across
          common EV battery capacities when charging from 20% to 80% (adding 60% state-of-charge) at
          a Level 2 efficiency of 88% and a rate of 16.5¢/kWh:
        </p>
        <div className={styles.tableWrapper}>
          <table aria-label="EV Home Charging Cost Benchmarks">
            <caption>
              Home EV Charging Session Costs (20% to 80% Charge at 88% Level 2 Efficiency)
            </caption>
            <thead>
              <tr>
                <th scope="col">EV Vehicle Class</th>
                <th scope="col">Battery Capacity</th>
                <th scope="col">Energy Added (60%)</th>
                <th scope="col">Grid Draw Required</th>
                <th scope="col">Session Cost (at 16.5¢)</th>
                <th scope="col">Est. Cost / Mile (3 mi/kWh)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Compact EV (e.g. Nissan Leaf)</td>
                <td>40 kWh</td>
                <td>24.0 kWh</td>
                <td>27.27 kWh</td>
                <td>$4.50</td>
                <td>4.5¢ / mile</td>
              </tr>
              <tr>
                <td>Standard Sedan (e.g. Model 3)</td>
                <td>60 kWh</td>
                <td>36.0 kWh</td>
                <td>40.91 kWh</td>
                <td>$6.75</td>
                <td>4.5¢ / mile</td>
              </tr>
              <tr>
                <td>Long-Range SUV (e.g. Model Y / Ioniq 5)</td>
                <td>75 kWh</td>
                <td>45.0 kWh</td>
                <td>51.14 kWh</td>
                <td>$8.44</td>
                <td>4.7¢ / mile</td>
              </tr>
              <tr>
                <td>Full-Size Truck (e.g. F-150 Lightning)</td>
                <td>131 kWh</td>
                <td>78.6 kWh</td>
                <td>89.32 kWh</td>
                <td>$14.74</td>
                <td>6.1¢ / mile</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>4. Engine-Verified Calculation Example</h2>
        <div className={styles.workedExampleCard}>
          <h3>
            Calculation Case Study: 75 kWh EV Battery (20% to 80% Charge, 88% Level 2 Efficiency)
          </h3>
          <p>
            Here is the exact step-by-step output calculated by Energy Bill Lab&apos;s shared EV
            charging engine:
          </p>
          <div className={styles.exampleGrid}>
            <div className={styles.exampleItem}>
              <div className={styles.label}>Battery Energy Added</div>
              <div className={styles.value}>{workedExampleResult.batteryEnergyAddedKwh} kWh</div>
            </div>
            <div className={styles.exampleItem}>
              <div className={styles.label}>Grid Energy Required</div>
              <div className={styles.value}>{workedExampleResult.gridEnergyRequiredKwh} kWh</div>
            </div>
            <div className={styles.exampleItem}>
              <div className={styles.label}>Efficiency Loss Overhead</div>
              <div className={styles.value}>{workedExampleResult.chargingLossKwh} kWh</div>
            </div>
            <div className={styles.exampleItem}>
              <div className={styles.label}>Session Cost (at 16.5¢)</div>
              <div className={styles.value}>${workedExampleResult.chargeCostUsd}</div>
            </div>
          </div>
          <p>
            <strong>Step-by-Step Formula:</strong> Battery Added = 75 kWh × (80% - 20%) = 45.0 kWh.
            Grid Required = 45.0 ÷ 0.88 = 51.14 kWh. Charging Session Cost = (51.14 kWh × 16.5¢) ÷
            100 = $8.44.
          </p>
        </div>
      </section>
    </GuideArticleView>
  );
}
