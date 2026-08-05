import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-much-electricity-does-an-electric-kettle-use']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideElectricKettleElectricityPage() {
  return (
    <GuideArticleView guide={guide}>
      {/* Immediate Above-the-Fold Direct Answer */}
      <section className={styles.section}>
        <h2>Direct Answer: How Much Electricity Does an Electric Kettle Use?</h2>
        <p>
          <strong>
            A 1,200-watt electric kettle running for 5 minutes uses 0.1 kWh of electricity.
          </strong>
        </p>
        <p>
          At the U.S. national average residential electricity rate of{' '}
          <strong>18.44 cents per kWh</strong>, boiling a 1,200W kettle for 5 minutes costs
          approximately <strong>$0.018 (1.8 cents) per boil</strong>. A 1,500W kettle running for 5
          minutes consumes <strong>0.125 kWh</strong> ($0.023 per boil).
        </p>
        <div className={styles.formulaBox}>
          <strong>Transparent Calculation:</strong>
          <br />
          1,200 W ÷ 1,000 = 1.2 kW
          <br />
          5 minutes ÷ 60 = 0.0833 hours
          <br />
          1.2 kW × 0.0833 hours ≈ <strong>0.10 kWh</strong>
          <br />
          0.10 kWh × $0.1844/kWh = <strong>$0.0184 per boil</strong>
        </div>
      </section>

      {/* Worked-Example Calculation Table */}
      <section className={styles.section}>
        <h2>Worked-Example Table: Wattage, Runtime, kWh & Operating Cost</h2>
        <p>
          Electric kettle power consumption depends strictly on heating element wattage (typically
          1,200W to 1,800W) and total operating runtime. The table below models energy consumption
          and cost across common wattage levels and usage schedules at the national average
          electricity rate (18.44 ¢/kWh).
        </p>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Electric kettle energy consumption and cost worked examples"
            className={styles.dataTable}
          >
            <caption>Electric Kettle Energy & Cost Examples (18.44 ¢/kWh National Average)</caption>
            <thead>
              <tr>
                <th scope="col">Usage Scenario</th>
                <th scope="col">Element Wattage</th>
                <th scope="col">Runtime</th>
                <th scope="col">kWh Consumed</th>
                <th scope="col">Cost per Session</th>
                <th scope="col">Transparent Formula</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Standard 1,200W Kettle (Single Boil)</td>
                <td>1,200 W</td>
                <td>5 minutes (0.0833h)</td>
                <td>0.100 kWh</td>
                <td>$0.018</td>
                <td>(1,200W × 0.0833h ÷ 1,000) × $0.1844</td>
              </tr>
              <tr>
                <td>High-Power 1,500W Kettle (Single Boil)</td>
                <td>1,500 W</td>
                <td>5 minutes (0.0833h)</td>
                <td>0.125 kWh</td>
                <td>$0.023</td>
                <td>(1,500W × 0.0833h ÷ 1,000) × $0.1844</td>
              </tr>
              <tr>
                <td>Ultra-Fast 1,800W Kettle (Single Boil)</td>
                <td>1,800 W</td>
                <td>5 minutes (0.0833h)</td>
                <td>0.150 kWh</td>
                <td>$0.028</td>
                <td>(1,800W × 0.0833h ÷ 1,000) × $0.1844</td>
              </tr>
              <tr>
                <td>Extended Boil / Multi-Liter (1,500W)</td>
                <td>1,500 W</td>
                <td>10 minutes (0.1667h)</td>
                <td>0.250 kWh</td>
                <td>$0.046</td>
                <td>(1,500W × 0.1667h ÷ 1,000) × $0.1844</td>
              </tr>
              <tr>
                <td>Daily Use (3 Boils / Day @ 1,500W)</td>
                <td>1,500 W</td>
                <td>15 min/day (0.2500h)</td>
                <td>0.375 kWh/day</td>
                <td>$0.069 / day</td>
                <td>(0.125 kWh × 3 boils) × $0.1844</td>
              </tr>
              <tr>
                <td>Monthly Household Use (30 Days)</td>
                <td>1,500 W</td>
                <td>450 min/mo (7.5000h)</td>
                <td>11.250 kWh/mo</td>
                <td>$2.07 / month</td>
                <td>11.25 kWh × $0.1844/kWh</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: All cost calculations use the U.S. EIA residential electricity benchmark of 18.44
          ¢/kWh. To check your specific state utility pricing, view our{' '}
          <Link href="/electricity-rates">State Electricity Rates Hub</Link>.
        </p>
      </section>

      {/* Comprehensive Search Intent Coverage */}
      <section className={styles.section}>
        <h2>Search Intent Breakdown: Key Kettle Energy Questions</h2>

        <h3>How much electricity does one kettle boil use?</h3>
        <p>
          Boiling 1 liter of water in a standard domestic electric kettle consumes between{' '}
          <strong>0.08 kWh and 0.15 kWh</strong> of electrical energy, depending on the element
          wattage and starting water temperature.
        </p>

        <h3>How many kWh does a kettle use in five minutes?</h3>
        <p>
          In 5 minutes of continuous operation, a 1,200W kettle uses <strong>0.10 kWh</strong>, a
          1,500W kettle uses <strong>0.125 kWh</strong>, and an 1,800W kettle uses{' '}
          <strong>0.15 kWh</strong>.
        </p>

        <h3>How much does it cost to boil a kettle?</h3>
        <p>
          At national average power rates, boiling a full kettle costs approximately{' '}
          <strong>1.8 to 2.8 cents per boil</strong>. In high-rate states like California (32.40
          ¢/kWh), boiling a 1,500W kettle for 5 minutes costs about 4.1 cents.
        </p>

        <h3>How much electricity does a kettle use per day and per month?</h3>
        <p>
          A household that boils a 1,500W kettle 3 times daily (15 total runtime minutes per day)
          uses <strong>0.375 kWh per day</strong> ($0.069/day). Over a 30-day billing cycle, this
          totals <strong>11.25 kWh per month</strong>, adding approximately{' '}
          <strong>$2.07 per month</strong> to your electric bill. Compare this baseline in our{' '}
          <Link href="/guides/how-much-electricity-do-household-appliances-use">
            Household Appliance Electricity Usage Guide
          </Link>
          .
        </p>

        <h3>Does filling the kettle with more water increase energy cost?</h3>
        <p>
          Yes. Overfilling is a primary driver of unnecessary kettle energy draw. Heating 1.7 liters
          of water when you only need one 250mL cup requires heating 6.8 times more liquid mass.
          Based on standard thermodynamic calculations, overfilling can increase your boiling cost
          from $0.004 per cup to $0.023 per session—wasting an estimated 80% of the energy consumed
          for that single cup.
        </p>

        <h3>Is an electric kettle cheaper than a microwave or stovetop?</h3>
        <p>
          Electric kettles submerge their resistance heating element directly inside the water,
          generally transferring more input energy directly to the liquid than electric stovetop
          coil burners or microwave ovens. As detailed in our{' '}
          <Link href="/guides/how-much-electricity-does-a-microwave-use">
            Microwave Electricity Usage Guide
          </Link>
          , an electric kettle is typically faster and more energy-efficient for boiling water than
          a microwave or electric stove, though exact energy transfer results vary by appliance
          design and heating element type.
        </p>

        <h3>Does wattage or runtime matter more for kettle power use?</h3>
        <p>
          Because total energy consumption equals <code>Watts × Hours</code>, a higher-wattage
          kettle (e.g., 1,800W vs 1,200W) heats water proportionally faster. As a result, the total
          kWh required to boil 1 liter of water remains nearly identical (~0.10 kWh). Higher wattage
          reduces boiling time, making total water volume—not wattage rating—the primary factor
          governing cost.
        </p>
      </section>

      {/* Internal Links and Calculation Engine Connection */}
      <section className={styles.section}>
        <h2>Related Energy Tools & Appliance Calculators</h2>
        <p>
          Want to estimate operating costs for other kitchen and home devices? Use our interactive{' '}
          <Link href="/tools/appliance-energy-cost-calculator">
            Appliance Energy Cost Calculator
          </Link>{' '}
          to calculate daily, monthly, and annual expenses for any household device based on custom
          wattage and utility rates.
        </p>
        <p>
          To learn how utility rates impact your monthly statement, read our guide on{' '}
          <Link href="/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill">
            How to Calculate Electricity Cost per kWh from Your Bill
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
