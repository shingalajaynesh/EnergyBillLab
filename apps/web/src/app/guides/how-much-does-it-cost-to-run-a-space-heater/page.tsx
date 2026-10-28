import { calculateSpaceHeaterCost } from '@energy-bill-lab/calculation-engine';
import type { Metadata } from 'next';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';
import {
  DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
  DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE,
} from '@/lib/constants/electricity';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-does-it-cost-to-run-a-space-heater']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideSpaceHeaterCostPage() {
  // Execute shared calculation engine for worked example: 1,500W heater, 1 unit, 8 hrs/day, 75% duty cycle at canonical benchmark
  const workedExampleResult = calculateSpaceHeaterCost({
    heaterWatts: 1500,
    quantity: 1,
    hoursPerDay: 8,
    days: 30,
    rateCentsPerKwh: DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
    dutyCyclePercent: 75,
  });

  const rateDollars = DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH / 100;

  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>1. Space Heater Power Ratings: 750W vs. 1,500W Settings</h2>
        <p>
          Standard portable electric space heaters sold in North America operate on 120V household
          branch circuits and are capped at a maximum drawing limit of{' '}
          <strong>1,500 Watts (1.5 kW)</strong> under National Electrical Code (NEC) safety
          standards.
        </p>
        <p>
          Most units feature two heat settings: Low (typically 750 Watts) and High (1,500 Watts).
          Operating a space heater on Low consumes exactly half the electricity per hour compared to
          running on High.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Space Heater Technologies & Heating Efficiency Myth</h2>
        <p>
          A common myth is that oil-filled radiator heaters or ceramic towers are significantly more
          energy-efficient than basic fan-forced coil heaters. In reality,{' '}
          <strong>
            all electric resistance heaters convert 100% of input electricity into heat energy
          </strong>{' '}
          (1 Watt of electricity produces 3.412 BTU of heat).
        </p>
        <p>
          Different heater styles alter how heat is distributed (radiant infrared heat warms objects
          directly; oil-filled radiators retain heat longer after shutting off), but a 1,500W
          ceramic heater and a 1,500W oil-filled heater draw identical electricity per hour when
          active.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Space Heater Operating Cost Benchmarks</h2>
        <p>
          Below is an operating cost reference table comparing different space heater power levels
          and runtimes over a 30-day billing month at the national benchmark rate of{' '}
          <strong>{DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢/kWh</strong> (
          {DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE}):
        </p>
        <div className={styles.tableWrapper}>
          <table aria-label="Space Heater Operating Cost Benchmarks">
            <caption>
              Electric Space Heater Operating Costs by Power Level & Duty Cycle (@{' '}
              {DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢/kWh)
            </caption>
            <thead>
              <tr>
                <th scope="col">Setting & Wattage</th>
                <th scope="col">Quantity</th>
                <th scope="col">Daily Hours</th>
                <th scope="col">Duty Cycle</th>
                <th scope="col">Monthly kWh</th>
                <th scope="col">Est. Monthly Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Low Setting (750W)</td>
                <td>1 heater</td>
                <td>4 hours</td>
                <td>100% (continuous)</td>
                <td>90.0 kWh</td>
                <td>${(90.0 * rateDollars).toFixed(2)}</td>
              </tr>
              <tr>
                <td>High Setting (1,500W)</td>
                <td>1 heater</td>
                <td>4 hours</td>
                <td>100% (continuous)</td>
                <td>180.0 kWh</td>
                <td>${(180.0 * rateDollars).toFixed(2)}</td>
              </tr>
              <tr>
                <td>High Setting (1,500W)</td>
                <td>1 heater</td>
                <td>8 hours</td>
                <td>75% (thermostat)</td>
                <td>270.0 kWh</td>
                <td>${(270.0 * rateDollars).toFixed(2)}</td>
              </tr>
              <tr>
                <td>High Setting (1,500W)</td>
                <td>1 heater</td>
                <td>12 hours</td>
                <td>100% (continuous)</td>
                <td>540.0 kWh</td>
                <td>${(540.0 * rateDollars).toFixed(2)}</td>
              </tr>
              <tr>
                <td>High Setting (1,500W)</td>
                <td>2 heaters</td>
                <td>8 hours</td>
                <td>75% (thermostat)</td>
                <td>540.0 kWh</td>
                <td>${(540.0 * rateDollars).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>4. Engine-Verified Calculation Example</h2>
        <div className={styles.workedExampleCard}>
          <h3>
            Calculation Case Study: 1,500W Heater (8 hrs/day, 75% Duty Cycle at{' '}
            {DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢/kWh)
          </h3>
          <p>
            Here is the step-by-step output calculated by Energy Bill Lab&apos;s shared space heater
            engine:
          </p>
          <div className={styles.exampleGrid}>
            <div className={styles.exampleItem}>
              <div className={styles.label}>Hourly Energy Draw</div>
              <div className={styles.value}>{workedExampleResult.hourlyKwh} kWh / active hr</div>
            </div>
            <div className={styles.exampleItem}>
              <div className={styles.label}>Daily Energy Draw</div>
              <div className={styles.value}>{workedExampleResult.dailyKwh} kWh / day</div>
            </div>
            <div className={styles.exampleItem}>
              <div className={styles.label}>30-Day Total Energy</div>
              <div className={styles.value}>{workedExampleResult.periodKwh} kWh</div>
            </div>
            <div className={styles.exampleItem}>
              <div className={styles.label}>30-Day Total Cost</div>
              <div className={styles.value}>${workedExampleResult.periodCostUsd}</div>
            </div>
          </div>
          <p>
            <strong>Step-by-Step Formula:</strong> Effective Watts = 1,500W × 0.75 = 1,125W. Daily
            kWh = (1,125W × 8 hrs) ÷ 1,000 = 9.00 kWh/day. 30-Day kWh = 9.00 kWh × 30 = 270.00 kWh.
            30-Day Cost = (270 kWh × {DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢) ÷ 100 = $
            {workedExampleResult.periodCostUsd}.
          </p>
        </div>
      </section>
    </GuideArticleView>
  );
}
