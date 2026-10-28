import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';
import {
  DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH,
  DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE,
} from '@/lib/constants/electricity';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-a-dishwasher-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideDishwasherElectricityPage() {
  const rateDollars = DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH / 100;

  // Cycle baselines (DOE 10 CFR Part 430 & ENERGY STAR criteria; 215 cycles/yr benchmark)
  const heatedDryKwh = 1.35;
  const airDryKwh = 0.85;
  const legacyKwh = 2.2;
  const handWashKwh = 2.45; // 18 gal water heated by electric resistance tank

  const heatedDryCost = heatedDryKwh * rateDollars;
  const airDryCost = airDryKwh * rateDollars;
  const legacyCost = legacyKwh * rateDollars;
  const handWashCost = handWashKwh * rateDollars;

  const annualHeatedDryCost = heatedDryKwh * 215 * rateDollars;
  const annualAirDryCost = airDryKwh * 215 * rateDollars;
  const annualAirDrySavings = annualHeatedDryCost - annualAirDryCost;

  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Dishwasher Electricity Use & Cost</h2>
        <p>
          A standard ENERGY STAR residential dishwasher uses between{' '}
          <strong>0.85 kWh and 1.35 kWh per load</strong>, drawing 1,200 to 1,800 Watts during
          active heating and washing sequences. At the current U.S. residential benchmark
          electricity rate of <strong>{DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH} ¢/kWh</strong> (
          {DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE}), running one dishwasher load costs
          approximately <strong>${airDryCost.toFixed(2)} on Eco Air-Dry</strong> to{' '}
          <strong>${heatedDryCost.toFixed(2)} on Heated Dry</strong> ($
          {(airDryCost * 30).toFixed(2)} to ${(heatedDryCost * 30).toFixed(2)} per month for daily
          use).
        </p>
        <p>
          Over 70% to 80% of a dishwasher&apos;s electrical consumption goes toward heating incoming
          water and powering the calrod heated-dry coil. Disabling the heated-dry element reduces
          cycle power consumption by <strong>37.0%</strong>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Dishwasher Energy Calculation Formula</h2>
        <div className={styles.formulaBox}>
          Cycle Energy (kWh) = Motor Work (~0.15 kWh) + Water Booster Heating (~0.70 kWh) + Calrod
          Dry (~0.50 kWh)
          <br />
          Energy Cost per Load ($) = kWh per Load × Electricity Rate ($/kWh)
          <br />
          Annual Operating Cost ($) = Annual Cycles (215 default) × kWh per Load × Rate ($/kWh)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Cycle Operating Modes & Annual Benchmark Matrix</h2>
        <p>
          Under Department of Energy (DOE 10 CFR Part 430) test procedures, standard household usage
          is established at <strong>215 cycles per year</strong> (4.13 loads/week). Below is the
          operating cost matrix evaluated at the national benchmark rate of{' '}
          <strong>{DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢/kWh</strong> (
          {DEFAULT_ELECTRICITY_BENCHMARK_DISCLOSURE}):
        </p>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Dishwasher operating cost across modes and electricity rates"
            className={styles.dataTable}
          >
            <caption>
              Table 1: Dishwasher Cycle Energy & Annual Operating Cost Benchmark (@{' '}
              {DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢/kWh; 215 Cycles/Year Baseline)
            </caption>
            <thead>
              <tr>
                <th scope="col">Operating Mode</th>
                <th scope="col">Energy / Load</th>
                <th scope="col">Cost / Cycle</th>
                <th scope="col">Annual kWh (215 cycles)</th>
                <th scope="col">Annual Cost (@ {DEFAULT_ELECTRICITY_RATE_CENTS_PER_KWH}¢)</th>
                <th scope="col">Cost at 30 ¢/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ENERGY STAR Eco Air-Dry</td>
                <td>0.85 kWh</td>
                <td>${airDryCost.toFixed(2)}</td>
                <td>{(0.85 * 215).toFixed(1)} kWh</td>
                <td>${annualAirDryCost.toFixed(2)} / yr</td>
                <td>${(0.85 * 215 * 0.3).toFixed(2)} / yr</td>
              </tr>
              <tr>
                <td>ENERGY STAR Normal Heated Dry</td>
                <td>1.35 kWh</td>
                <td>${heatedDryCost.toFixed(2)}</td>
                <td>{(1.35 * 215).toFixed(1)} kWh</td>
                <td>${annualHeatedDryCost.toFixed(2)} / yr</td>
                <td>${(1.35 * 215 * 0.3).toFixed(2)} / yr</td>
              </tr>
              <tr>
                <td>Pre-2012 Non-Certified Unit</td>
                <td>2.20 kWh</td>
                <td>${legacyCost.toFixed(2)}</td>
                <td>{(2.2 * 215).toFixed(1)} kWh</td>
                <td>${(2.2 * 215 * rateDollars).toFixed(2)} / yr</td>
                <td>${(2.2 * 215 * 0.3).toFixed(2)} / yr</td>
              </tr>
              <tr>
                <td>Manual Hand Washing (Thermal Load)</td>
                <td>2.45 kWh</td>
                <td>${handWashCost.toFixed(2)}</td>
                <td>{(2.45 * 215).toFixed(1)} kWh</td>
                <td>${(2.45 * 215 * rateDollars).toFixed(2)} / yr</td>
                <td>${(2.45 * 215 * 0.3).toFixed(2)} / yr</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Selecting <strong>Eco Air-Dry</strong> over heated dry saves 107.5 kWh per year (
          <strong>${annualAirDrySavings.toFixed(2)} annually</strong> nationally, and over
          $34.80/year in high-rate states like California).
        </p>
      </section>

      <section className={styles.section}>
        <h2>Hand Washing vs. Dishwasher: The Water-Heating Truth</h2>
        <p>
          A common consumer myth is that washing dishes by hand saves electricity and money. In
          reality, hand washing incurs a severe thermal energy penalty through hot water volume:
        </p>
        <ul>
          <li>
            <strong>Hand Washing Hot Water Draw:</strong> Washing 12 to 14 place settings under a
            running tap consumes 15 to 25 gallons of water (averaging 18 gallons of hot water).
            Heating 18 gallons of municipal tap water from 60°F to 120°F requires 9,007 BTU of
            thermal energy. When supplied by an electric resistance water heater (0.90 EF), this hot
            water draw requires{' '}
            <strong>2.45 kWh of electricity per wash (${handWashCost.toFixed(2)}/load)</strong>.
          </li>
          <li>
            <strong>ENERGY STAR Dishwasher Efficiency:</strong> A modern certified dishwasher uses
            high-pressure internal spray arms and recirculates just{' '}
            <strong>3.2 gallons of total water</strong> per cycle, drawing only{' '}
            <strong>0.85 kWh (${airDryCost.toFixed(2)}/load)</strong> on Eco air-dry.
          </li>
          <li>
            <strong>Net Energy Advantage:</strong> Using a dishwasher on Eco air-dry uses{' '}
            <strong>65.3% less electricity</strong> than hand washing, saving approximately $0.29
            per load ($63.40+ per year in electricity alone, before additional municipal water and
            sewer savings).
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Actionable Energy-Saving Practices for Dishwashers</h2>
        <ul>
          <li>
            <strong>Disable Heated Dry:</strong> Select &quot;Air Dry&quot;, &quot;Eco Dry&quot;, or
            crack the door open after the wash cycle to let condensation dissipate naturally.
          </li>
          <li>
            <strong>Run Full Loads Only:</strong> Dishwashers consume virtually the same electrical
            power and water regardless of load volume.
          </li>
          <li>
            <strong>Do Not Pre-Rinse Dishes:</strong> Modern dishwashers feature soil sensors that
            calibrate cycle length to grease levels. Scraping food into the trash without
            pre-rinsing saves up to 20 gallons of water per load.
          </li>
          <li>
            <strong>Use Off-Peak Hours on TOU Tariffs:</strong> Program the dishwasher delay timer
            to run overnight when time-of-use electricity rates are discounted.
          </li>
        </ul>
        <p>
          Calculate custom appliance operating costs with our{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>{' '}
          or explore water heater operating costs in our{' '}
          <Link href="/guides/how-much-does-it-cost-to-run-an-electric-water-heater">
            Electric Water Heater Guide
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
