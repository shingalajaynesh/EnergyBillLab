import type { Metadata } from 'next';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['why-is-my-electric-bill-so-high']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideHighElectricBillPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Quick Answer: Isolating Your Bill Increase</h2>
        <p>
          A sudden increase in your electric bill is always caused by one or a combination of three
          fundamental factors: higher kilowatt-hour (kWh) electricity consumption, an increase in
          your utility&apos;s all-in price per kWh, or a longer billing cycle (more days between
          meter reads).
        </p>
        <p>
          Before assuming an appliance is broken or rates have spiked, compare your current
          statement against the same billing month from last year. Look closely at billing cycle
          days, total kWh used, and whether your meter reading was marked as actual or estimated.
        </p>
      </section>

      <section className={styles.section}>
        <h2>First Checks to Perform Immediately</h2>
        <p>
          When reviewing a higher-than-expected electric bill, check these four line items first:
        </p>
        <ul>
          <li>
            <strong>Billing Period Days:</strong> Utility billing cycles vary between 28 and 35
            days. A 33-day billing cycle contains 18% more billing days than a 28-day cycle,
            increasing total cost even if daily energy usage was identical.
          </li>
          <li>
            <strong>Actual vs. Estimated Readings:</strong> If severe weather prevents meter readers
            from visiting your home, utilities may generate an estimated bill based on past usage.
            When an actual read occurs later, any underestimation is added as a catch-up charge.
          </li>
          <li>
            <strong>Total Kilowatt-Hours (kWh):</strong> Compare total kWh consumed against the
            previous month and the same month last year.
          </li>
          <li>
            <strong>Effective Cost per kWh:</strong> Divide your total bill amount (including all
            delivery, fuel, rider, and tax charges) by total kWh to determine your true all-in cost
            per kWh.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Usage Increase vs. Rate Increase</h2>
        <p>
          Homeowners often blame utility rate hikes for bill spikes when the primary driver was
          unnoticed consumption. Conversely, utility rate adjustments or fuel supply surcharges can
          raise monthly bills even during months when usage dropped.
        </p>
        <p>
          To separate these drivers, calculate your <strong>effective cost per kWh</strong> for both
          statements:
        </p>
        <div className={styles.formulaBox}>
          Effective Cost per kWh (¢/kWh) = (Total Bill Amount in USD ÷ Total Billing kWh) × 100
        </div>
      </section>

      <section className={styles.section}>
        <h2>Billing-Period Length & Calendar Drift</h2>
        <p>
          Electric utility meters are read on varying schedules depending on weekends, holidays, and
          meter reader routes. A statement covering 34 days will naturally show higher total kWh
          consumption than a 29-day statement. Always divide total kWh by billing days to determine
          your <strong>average kWh per day</strong>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Seasonal Heating and Cooling Causes</h2>
        <p>
          According to data from the U.S. Energy Information Administration (EIA), heating and air
          conditioning account for over 50% of annual household energy consumption. Extreme summer
          heatwaves or winter cold snaps force HVAC compressors and electric heating elements to run
          for significantly longer hours each day.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Appliance and Equipment Causes</h2>
        <p>
          Adding new appliances (such as a second refrigerator in a hot garage, a portable AC unit,
          or an electric space heater) can dramatically increase monthly kWh draw. Faulty appliance
          thermostats, clogged air filters, or failing refrigerator door seals force compressors to
          run continuously without cycling off.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Fixed Charges, Delivery Riders & Taxes</h2>
        <p>
          Your electric bill consists of more than just volumetric electricity generation charges.
          Total bill charges include:
        </p>
        <ul>
          <li>
            <strong>Customer Charge:</strong> A fixed monthly administrative fee ($5 to $20/month)
            charged regardless of electricity usage.
          </li>
          <li>
            <strong>Transmission & Distribution Charges:</strong> Tariffs set by state public
            utility commissions to maintain power lines and substation infrastructure.
          </li>
          <li>
            <strong>Fuel Adjustment Riders:</strong> Variable surcharges reflecting utility fuel
            costs (natural gas, coal) passed directly to consumers.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Step-by-Step Investigation Checklist</h2>
        <div className={styles.tableWrapper}>
          <table aria-label="High Electric Bill Diagnostic Checklist">
            <caption>Diagnostic Steps for Analyzing a Sudden High Electric Bill</caption>
            <thead>
              <tr>
                <th scope="col">Step</th>
                <th scope="col">Check Item</th>
                <th scope="col">Actionable Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Compare Billing Days</td>
                <td>Verify if current statement has more days than previous statement.</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Check Reading Type</td>
                <td>Look for "Actual" vs "Estimated" indicator on your statement.</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Calculate Daily kWh</td>
                <td>Divide total kWh by billing days to isolate daily consumption.</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Check Weather Anomalies</td>
                <td>Review local degree days (cooling or heating degree days) during the cycle.</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Calculate Effective Rate</td>
                <td>Divide total bill by kWh to verify per-unit rate changes.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Worked Bill Comparison Example</h2>
        <div className={styles.workedExampleCard}>
          <h3>Illustrative Case Study: Analyzing a $95 Bill Spike</h3>
          <p>
            Consider a household whose monthly electric bill increased from <strong>$160.00</strong>{' '}
            to <strong>$255.00</strong> between October and November:
          </p>
          <div className={styles.exampleGrid}>
            <div className={styles.exampleItem}>
              <div className={styles.label}>October Statement</div>
              <div className={styles.value}>$160.00 (1,000 kWh / 30 days)</div>
              <small>Daily: 33.3 kWh/day | Effective Rate: 16.00¢/kWh</small>
            </div>
            <div className={styles.exampleItem}>
              <div className={styles.label}>November Statement</div>
              <div className={styles.value}>$255.00 (1,500 kWh / 34 days)</div>
              <small>Daily: 44.1 kWh/day | Effective Rate: 17.00¢/kWh</small>
            </div>
          </div>
          <p>
            <strong>Diagnosis Breakdown:</strong> The 4-day longer billing cycle accounted for{' '}
            <strong>$21.25</strong> of the increase. A 1¢/kWh rate increase accounted for{' '}
            <strong>$15.00</strong>. The remaining <strong>$58.75</strong> was caused by a 32%
            increase in daily energy consumption due to portable space heater usage during November
            cold nights.
          </p>
        </div>
      </section>
    </GuideArticleView>
  );
}
