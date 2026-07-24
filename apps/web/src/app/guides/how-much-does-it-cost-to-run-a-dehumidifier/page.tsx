import { calculateApplianceCost } from '@energy-bill-lab/calculation-engine';
import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-does-it-cost-to-run-a-dehumidifier']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function DehumidifierGuidePage() {
  // Worked Example: 500W unit, 24 connected hours/day, 50% duty cycle, 30 days, 16.5 ¢/kWh
  const workedExample = calculateApplianceCost({
    wattage: 500,
    hoursPerDay: 24,
    days: 30,
    rateCentsPerKwh: 16.5,
    dutyCyclePercent: 50,
  });

  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>1. Dehumidifier Power Draw & Capacity Distinctions</h2>
        <p>
          Dehumidifiers are widely used in basements, crawl spaces, and humid living areas to
          control indoor moisture. A common area of confusion when calculating electricity expenses
          is the difference between <strong>Pint Capacity Rating</strong> and{' '}
          <strong>Electrical Input Wattage</strong>.
        </p>
        <ul>
          <li>
            <strong>Pint Capacity (Pints / 24 Hours):</strong> Measures the volume of moisture
            removed from air under standardized test conditions (e.g., 20, 35, or 50 pints/day).
            Pint rating does not state electrical power consumption.
          </li>
          <li>
            <strong>Electrical Input Wattage (W):</strong> The actual electrical power drawn by the
            internal refrigerant compressor and circulation fan (typically 300 to 700 Watts).
          </li>
        </ul>
        <div className={styles.callout}>
          <strong>Non-Medical Scope Disclaimer:</strong> Energy Bill Lab models electrical energy
          consumption and utility operating costs. We do not evaluate mold remediation, medical air
          quality claims, or building structural moisture limits.
        </div>
      </section>

      <section className={styles.section}>
        <h2>2. Dehumidifier Energy Calculation Formula</h2>
        <p>To compute daily and monthly electrical operating costs for a portable dehumidifier:</p>
        <div className={styles.formulaBox}>
          Daily Active Runtime (Hours) = Connected Hours per Day × (Duty Cycle % ÷ 100)
          <br />
          Daily Energy (kWh) = (Rated Watts × Daily Active Runtime) ÷ 1,000
          <br />
          Period Cost (USD) = (Daily Energy × Days × Electricity Rate in ¢/kWh) ÷ 100
        </div>
      </section>

      <section className={styles.section}>
        <h2>3. Worked Example: 500W Unit at 50% Humidistat Duty Cycle</h2>
        <p>
          Consider a <strong>500-Watt basement dehumidifier</strong> plugged in{' '}
          <strong>24 hours per day</strong>, cycling its compressor at a{' '}
          <strong>50% duty cycle</strong> over <strong>30 days</strong> at an example rate of{' '}
          <strong>16.5 ¢/kWh</strong>:
        </p>
        <ul>
          <li>
            <strong>Active Compressor Runtime:</strong> 12 hours per day (50% of 24 hours)
          </li>
          <li>
            <strong>Daily Energy Consumption:</strong> {workedExample.dailyKwh.toFixed(2)} kWh/day
          </li>
          <li>
            <strong>Daily Operating Cost:</strong> ${workedExample.dailyCostUsd.toFixed(2)}/day
          </li>
          <li>
            <strong>30-Day Energy Consumption:</strong> {workedExample.periodKwh.toFixed(2)} kWh
          </li>
          <li>
            <strong>30-Day Operating Cost:</strong> ${workedExample.periodCostUsd.toFixed(2)}
          </li>
          <li>
            <strong>Extrapolated Annual Cost (365 days):</strong> $
            {workedExample.annualCostUsd.toFixed(2)}/year
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>4. Humidistat Duty Cycle vs. Monthly Electricity Cost</h2>
        <div className={styles.tableWrapper}>
          <table aria-label="Dehumidifier Duty Cycle vs Monthly Operating Cost">
            <caption>
              Table 1: Estimated Dehumidifier Costs by Duty Cycle (500W Unit @ 16.5¢/kWh, 30 Days)
            </caption>
            <thead>
              <tr>
                <th scope="col">Basement Humidity Condition</th>
                <th scope="col">Compressor Duty Cycle (%)</th>
                <th scope="col">Active Daily Hours</th>
                <th scope="col">30-Day Energy (kWh)</th>
                <th scope="col">Estimated Monthly Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Low Humidity / Maintenance Mode</td>
                <td>25% Duty Cycle</td>
                <td>6 hrs/day</td>
                <td>90.0 kWh</td>
                <td>$14.85</td>
              </tr>
              <tr>
                <td>Moderate Summer Humidity</td>
                <td>50% Duty Cycle</td>
                <td>12 hrs/day</td>
                <td>180.0 kWh</td>
                <td>$29.70</td>
              </tr>
              <tr>
                <td>High Humidity / Damp Basement</td>
                <td>75% Duty Cycle</td>
                <td>18 hrs/day</td>
                <td>270.0 kWh</td>
                <td>$44.55</td>
              </tr>
              <tr>
                <td>Continuous Operation (Wet Space)</td>
                <td>100% Duty Cycle</td>
                <td>24 hrs/day</td>
                <td>360.0 kWh</td>
                <td>$59.40</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>5. Key Factors Affecting Dehumidifier Operating Expenses</h2>
        <ul>
          <li>
            <strong>Humidistat Target Setting:</strong> Setting target relative humidity to 50%
            maintains comfortable moisture levels while avoiding continuous compressor operation
            triggered by lower 30% or 40% targets.
          </li>
          <li>
            <strong>Ambient Room Temperature:</strong> Standard refrigerant dehumidifiers lose
            efficiency when ambient basement temperatures drop below 65°F, leading to frost
            accumulation on cooling coils.
          </li>
          <li>
            <strong>Continuous Drainage Setup:</strong> Connecting a gravity hose or condensate pump
            allows uninterrupted operation without manual bucket shutoffs.
          </li>
          <li>
            <strong>ENERGY STAR Integrated Energy Factor (IEF):</strong> ENERGY STAR certified
            dehumidifiers remove more liters of water per kWh consumed, reducing operating expenses
            by 15% to 25% compared to baseline models.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>6. Limitations & Calculation Assumptions</h2>
        <p>
          Calculated energy costs represent electrical power draw of the refrigeration compressor
          and fan motor. Actual monthly utility statements vary based on local utility electricity
          rates, indoor relative humidity, and room air infiltration.
        </p>
        <p>
          To calculate your exact dehumidifier operating costs, use our interactive tool:{' '}
          <Link href="/tools/dehumidifier-cost-calculator">
            Go to Dehumidifier Cost Calculator →
          </Link>
        </p>
      </section>
    </GuideArticleView>
  );
}
