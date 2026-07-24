import {
  calculateApplianceCost,
  calculateRefrigeratorAnnualKwhCost,
} from '@energy-bill-lab/calculation-engine';
import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-a-refrigerator-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function RefrigeratorGuidePage() {
  // Worked Example 1: Annual EnergyGuide mode (400 kWh/year at 16.5 ¢/kWh)
  const annualModeResult = calculateRefrigeratorAnnualKwhCost({
    annualKwh: 400,
    days: 30,
    rateCentsPerKwh: 16.5,
  });

  // Worked Example 2: Wattage mode (150W compressor at 35% duty cycle over 30 days at 16.5 ¢/kWh)
  const wattageModeResult = calculateApplianceCost({
    wattage: 150,
    hoursPerDay: 24,
    days: 30,
    rateCentsPerKwh: 16.5,
    dutyCyclePercent: 35,
  });

  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>1. Watts Rating vs. Annual EnergyGuide kWh</h2>
        <p>
          Refrigerators are unique household appliances because they remain plugged into electrical
          wall outlets 24 hours a day, 365 days a year. However, a refrigerator does not draw its
          full electrical power draw continuously.
        </p>
        <p>
          Modern residential refrigerators feature two primary ways to evaluate electricity
          consumption:
        </p>
        <ul>
          <li>
            <strong>Electrical Input Wattage (W):</strong> The instantaneous power drawn when the
            cooling compressor and evaporator fans are actively running (typically 100W to 400W).
          </li>
          <li>
            <strong>Annual EnergyGuide Rating (kWh/year):</strong> The official standardized annual
            energy consumption tested under Federal Trade Commission (FTC) guidelines (typically 350
            to 650 kWh/year for modern units).
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>2. Understanding Compressor Duty Cycles</h2>
        <p>
          A refrigerator maintains internal temperature using a thermostatic switch that cycles the
          refrigerant compressor on and off. The fraction of time the compressor actively operates
          is called the <strong>compressor duty cycle</strong>.
        </p>
        <p>
          In typical indoor room conditions (70°F ambient), a well-sealed refrigerator operates at a
          <strong> 30% to 40% duty cycle</strong> (cycling on for roughly 20 to 25 minutes per
          hour).
        </p>
        <div className={styles.formulaBox}>
          Daily kWh = (Compressor Watts × 24 Hours × Duty Cycle %) ÷ 100,000
          <br />
          Monthly Cost = (Daily kWh × 30 Days × Electricity Rate in ¢/kWh) ÷ 100
        </div>
      </section>

      <section className={styles.section}>
        <h2>3. Why Annual EnergyGuide Mode Must Not Double-Adjust Duty Cycle</h2>
        <p>
          When using official yellow EnergyGuide label ratings, the annual kilowatt-hour (kWh) value
          already incorporates natural compressor cycling, automatic defrost heater operation, and
          standardized door openings during laboratory testing.
        </p>
        <div className={styles.callout}>
          <strong>Critical Calculation Rule:</strong> When calculating monthly costs from an annual
          EnergyGuide kWh rating, daily energy is computed as <code>Annual kWh ÷ 365</code>. Do not
          apply compressor duty cycle percentage a second time, as doing so would artificially
          understate operating expenses by 60% to 70%.
        </div>
      </section>

      <section className={styles.section}>
        <h2>4. Worked Calculations: Shared Engine Results</h2>
        <p>
          Below are two worked examples calculated using Energy Bill Lab’s verified calculation
          engine at an example electricity rate of <strong>16.5 ¢/kWh</strong>.
        </p>

        <h3>Example A: Standard 400 kWh/year EnergyGuide Rating</h3>
        <p>
          For a standard refrigerator labeled with <strong>400 kWh/year</strong>:
        </p>
        <ul>
          <li>
            <strong>Average Daily kWh:</strong> {annualModeResult.dailyKwh.toFixed(2)} kWh/day
          </li>
          <li>
            <strong>Estimated 30-Day Energy:</strong> {annualModeResult.periodKwh.toFixed(2)} kWh
          </li>
          <li>
            <strong>Estimated 30-Day Cost:</strong> ${annualModeResult.periodCostUsd.toFixed(2)}
          </li>
          <li>
            <strong>Estimated Annual Cost:</strong> ${(400 * 0.165).toFixed(2)}/year
          </li>
        </ul>

        <h3>Example B: 150-Watt Unit at 35% Compressor Duty Cycle</h3>
        <p>
          For a unit rated at <strong>150 Watts</strong> operating at a{' '}
          <strong>35% duty cycle</strong> over 24 connected hours:
        </p>
        <ul>
          <li>
            <strong>Daily Active Runtime:</strong> 8.4 hours/day
          </li>
          <li>
            <strong>30-Day Energy Consumption:</strong> {wattageModeResult.periodKwh.toFixed(2)} kWh
          </li>
          <li>
            <strong>30-Day Operating Cost:</strong> ${wattageModeResult.periodCostUsd.toFixed(2)}
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>5. Factors Affecting Refrigerator Electricity Consumption</h2>
        <div className={styles.tableWrapper}>
          <table aria-label="Factors Affecting Refrigerator Power Draw">
            <caption>Table 1: Key Factors Influencing Refrigerator Electricity Consumption</caption>
            <thead>
              <tr>
                <th scope="col">Factor</th>
                <th scope="col">Impact on Energy Draw</th>
                <th scope="col">Actionable Guidance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ambient Location Temperature</td>
                <td>Increases compressor runtime by 30% to 50% in unconditioned spaces</td>
                <td>Avoid placing secondary refrigerators in unconditioned garages or hot sheds</td>
              </tr>
              <tr>
                <td>Door Gasket Seals</td>
                <td>Worn magnetic seals allow continuous warm air infiltration</td>
                <td>Perform paper test; replace brittle magnetic gaskets</td>
              </tr>
              <tr>
                <td>Condenser Coil Dust</td>
                <td>Accumulated lint restricts heat rejection efficiency</td>
                <td>Vacuum rear or lower condenser coils once per year</td>
              </tr>
              <tr>
                <td>Automatic Defrost Heaters</td>
                <td>Defrost heating elements draw 400W-800W during short defrost cycles</td>
                <td>Ensure defrost drain tube remains clear of ice obstruction</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>6. Garage and Secondary Refrigerator Impact</h2>
        <p>
          Keeping an older, secondary refrigerator in an unheated or uncooled garage often leads to
          unexpected electric bill increases. During summer heat spikes (85°F to 95°F ambient), a
          garage refrigerator compressor may run continuously at an 80% to 90% duty cycle, doubling
          monthly electricity expenses compared to indoor room placement.
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Limitations & Calculation Assumptions</h2>
        <p>
          Calculated energy expenses are estimates based on steady-state room temperatures and
          standardized power ratings. Actual utility bill amounts vary depending on local utility
          tiered rates, seasonal demand charges, and door opening frequency.
        </p>
        <p>
          To calculate your exact refrigerator operating costs, use our interactive tool:{' '}
          <Link href="/tools/refrigerator-cost-calculator">
            Go to Refrigerator Cost Calculator →
          </Link>
        </p>
      </section>
    </GuideArticleView>
  );
}
