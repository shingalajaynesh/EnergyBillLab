import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['fixed-vs-variable-electricity-rates']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideFixedVsVariableRatePage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Fixed vs. Variable Electricity Rates</h2>
        <p>
          A <strong>Fixed-Rate</strong> electricity contract locks in a constant supply price per
          kilowatt-hour ($/kWh) for a set term (typically 12, 24, or 36 months), protecting
          households from energy market price spikes.
        </p>
        <p>
          A <strong>Variable-Rate</strong> electricity plan fluctuates monthly based on wholesale
          energy market conditions, weather events, and supplier pricing adjustments—offering
          flexibility without long-term contracts but exposing consumers to price volatility.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Supply Choice, Delivery Charges & Contract Terms</h2>
        <p>
          In deregulated retail electricity markets (such as Texas, Pennsylvania, Ohio, or
          Illinois), consumers can choose their retail energy supplier. Understanding fixed vs.
          variable contracts requires separating supply terms from utility distribution:
        </p>
        <ul>
          <li>
            <strong>Supply vs. Delivery Charges:</strong> Supply rate contracts govern only the
            generation portion of your bill. Regulated utility delivery (distribution) charges
            remain separate regardless of plan choice.
          </li>
          <li>
            <strong>Contract Term & Renewal Rules:</strong> Fixed-rate contracts expire after 12 to
            36 months. If not renewed or switched, plans often auto-enroll into high variable
            default rates.
          </li>
          <li>
            <strong>Introductory Teaser Pricing:</strong> Some variable plans advertise very low
            initial 1-month rates that automatically spike after the introductory promo period
            expires.
          </li>
          <li>
            <strong>Early Termination Fees (ETF):</strong> Fixed contracts may charge an early exit
            fee ($50–$150) if canceled prior to contract expiration.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Total Supply Bill ($) = Billed kWh × Supply Rate ($/kWh) + Monthly Base Fee ($)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Fixed vs. Variable Supply Cost Comparison</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Fixed versus variable electricity rate plan comparison across market conditions"
            className={styles.dataTable}
          >
            <caption>Supply Plan Comparison: 1,000 kWh Monthly Usage Baseline</caption>
            <thead>
              <tr>
                <th scope="col">Plan Type</th>
                <th scope="col">Contract Term</th>
                <th scope="col">Price Stability</th>
                <th scope="col">Sample Summer Cost (15¢/kWh)</th>
                <th scope="col">Sample Winter Spike (25¢/kWh)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fixed-Rate Contract</td>
                <td>12–24 Months</td>
                <td>100% Guaranteed Rate</td>
                <td>$150.00</td>
                <td>$150.00 (Protected)</td>
              </tr>
              <tr>
                <td>Variable Market Rate</td>
                <td>Month-to-Month</td>
                <td>Fluctuates Monthly</td>
                <td>$130.00 (Off-Peak Market)</td>
                <td>$250.00 (Market Spike)</td>
              </tr>
              <tr>
                <td>Utility Default Service (Standard)</td>
                <td>6–12 Month Regulated Tariff</td>
                <td>Semi-Annual Adjustment</td>
                <td>$145.00</td>
                <td>$160.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Contract terms, termination fees, and wholesale market price fluctuations vary by
          state retail choice regulations and energy supplier terms. Figures represent illustrative
          calculation assumptions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Contract Review Guidance</h2>
        <p>
          Neither plan type is universally superior for every consumer. Fixed rates provide budget
          predictability, while variable rates offer no-penalty exit flexibility. Always review
          contract terms carefully; this guide provides general consumer education and does not
          constitute legal or financial advisory advice.
        </p>
        <p>
          Analyze supply contract rates with our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link> or learn more in
          our{' '}
          <Link href="/guides/electricity-supply-charge-vs-delivery-charge">
            Supply vs. Delivery Charge Guide
          </Link>{' '}
          or rate increase guide:{' '}
          <Link href="/guides/why-electricity-rates-change">Why Electricity Rates Change</Link>.
        </p>
      </section>
    </GuideArticleView>
  );
}
