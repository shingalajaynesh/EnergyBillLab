import { calculatePoolPumpCost } from '@energy-bill-lab/calculation-engine';
import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-does-it-cost-to-run-a-pool-pump']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function PoolPumpGuidePage() {
  // Worked Example: 1,500W pump, 8 hrs/day, 7 days/week, 20 weeks (seasonal), 16.5 ¢/kWh
  const workedExample = calculatePoolPumpCost({
    wattage: 1500,
    hoursPerDay: 8,
    daysPerWeek: 7,
    weeks: 20,
    rateCentsPerKwh: 16.5,
    dutyCyclePercent: 100,
  });

  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>1. Pool Pump Power Ratings: Electrical Watts vs. Motor Horsepower</h2>
        <p>
          Residential pool filtration pumps consume significant electricity during warm summer
          months. A common mistake when calculating pool pump energy cost is confusing mechanical
          output
          <strong> Horsepower (HP)</strong> with actual electrical input <strong>Watts (W)</strong>.
        </p>
        <p>
          While 1 mechanical Horsepower equals 746 Watts in theoretical physics, electric pool pump
          motors operate at electrical efficiencies between 65% and 85% and feature motor service
          factors (SF). A standard "1.5 HP" single-speed pool pump actually draws{' '}
          <strong>1,500 to 1,900 Watts</strong> of electrical power from the utility grid.
        </p>
        <div className={styles.callout}>
          <strong>Sanitation Scope Disclaimer:</strong> This guide and matching calculator calculate
          electrical operating costs based on wattage and runtime. They do not determine or
          guarantee water sanitation, turnover rates, or chemical safety standards required for
          specific pools.
        </div>
      </section>

      <section className={styles.section}>
        <h2>2. Pool Pump Energy Calculation Formulas</h2>
        <p>To calculate daily, monthly, and seasonal pool pump electricity consumption:</p>
        <div className={styles.formulaBox}>
          Normalized Daily Hours = Hours per Day × (Days per Week ÷ 7)
          <br />
          Daily kWh = (Electrical Input Watts × Normalized Daily Hours) ÷ 1,000
          <br />
          Monthly Cost (30 Days) = Daily kWh × 30 Days × (Electricity Rate in ¢/kWh ÷ 100)
          <br />
          Seasonal Cost = Daily kWh × (Weeks × 7) × (Electricity Rate in ¢/kWh ÷ 100)
        </div>
      </section>

      <section className={styles.section}>
        <h2>3. Worked Example: 1,500W Pump Seasonal Cost</h2>
        <p>
          Consider a <strong>1,500-Watt single-speed pool pump</strong> operating for{' '}
          <strong>8 hours per day</strong>,<strong>7 days per week</strong>, over a{' '}
          <strong>20-week pool season (140 days)</strong> at an example rate of{' '}
          <strong>16.5 ¢/kWh</strong>:
        </p>
        <ul>
          <li>
            <strong>Daily Energy Consumption:</strong> {workedExample.dailyKwh.toFixed(2)} kWh/day
          </li>
          <li>
            <strong>Daily Operating Cost:</strong> ${workedExample.dailyCostUsd.toFixed(2)}/day
          </li>
          <li>
            <strong>Estimated 30-Day Monthly Cost:</strong> $
            {workedExample.monthlyCostUsd.toFixed(2)}
          </li>
          <li>
            <strong>Total Seasonal Energy (140 days):</strong> {workedExample.periodKwh.toFixed(2)}{' '}
            kWh
          </li>
          <li>
            <strong>Total Seasonal Operating Cost (20 weeks):</strong> $
            {workedExample.periodCostUsd.toFixed(2)}
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>4. Single-Speed vs. Variable-Speed (VSP) Energy Comparison</h2>
        <div className={styles.tableWrapper}>
          <table aria-label="Pool Pump Single Speed vs Variable Speed Cost Comparison">
            <caption>Table 1: Filtration Cost Comparison (20-Week Season @ 16.5¢/kWh)</caption>
            <thead>
              <tr>
                <th scope="col">Pump Technology & Setting</th>
                <th scope="col">Electrical Input Watts</th>
                <th scope="col">Daily Runtime</th>
                <th scope="col">Daily kWh</th>
                <th scope="col">Estimated Seasonal Cost (20 Wks)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.5 HP Single-Speed (High Flow)</td>
                <td>1,800 W</td>
                <td>8 hrs/day</td>
                <td>14.4 kWh</td>
                <td>$332.64</td>
              </tr>
              <tr>
                <td>1.0 HP Single-Speed (Standard)</td>
                <td>1,200 W</td>
                <td>8 hrs/day</td>
                <td>9.6 kWh</td>
                <td>$221.76</td>
              </tr>
              <tr>
                <td>Variable Speed @ Medium RPM (1,750 RPM)</td>
                <td>450 W</td>
                <td>12 hrs/day</td>
                <td>5.4 kWh</td>
                <td>$124.74</td>
              </tr>
              <tr>
                <td>Variable Speed @ Low RPM (1,100 RPM)</td>
                <td>180 W</td>
                <td>16 hrs/day</td>
                <td>2.88 kWh</td>
                <td>$66.53</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>5. Factors Affecting Pool Pump Operating Expenses</h2>
        <ul>
          <li>
            <strong>Affinities of Pump Laws (VSP Savings):</strong> Power draw decreases with the
            cube of motor speed reduction. Cutting pump RPM in half reduces electrical power draw by
            nearly 80%, allowing low-speed filtration for longer hours at a fraction of the energy
            cost.
          </li>
          <li>
            <strong>Filter Pressure & Dirty Cartridges:</strong> High filter pressure increases
            dynamic head resistance, forcing pumps to work harder and reducing flow rate per Watt
            consumed.
          </li>
          <li>
            <strong>Plumbing Pipe Diameter:</strong> 1.5-inch suction piping increases friction head
            loss compared to 2.0-inch or 2.5-inch piping, requiring higher wattage for equivalent
            water circulation.
          </li>
          <li>
            <strong>Seasonal Schedule Adjustments:</strong> Reducing filtration runtime from 10
            hours in mid-summer to 4 hours during cooler spring/fall months significantly lowers
            total annual kWh.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>6. Limitations & Calculation Assumptions</h2>
        <p>
          Calculations estimate electrical energy input based on motor wattage ratings. Actual
          operating costs depend on specific utility time-of-use (TOU) peak pricing windows and
          total dynamic head (TDH) of pool plumbing.
        </p>
        <p>
          To calculate your exact pool pump operating costs, use our interactive tool:{' '}
          <Link href="/tools/pool-pump-cost-calculator">Go to Pool Pump Cost Calculator →</Link>
        </p>
      </section>
    </GuideArticleView>
  );
}
