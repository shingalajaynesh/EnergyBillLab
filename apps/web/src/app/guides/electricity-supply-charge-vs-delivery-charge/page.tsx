import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['electricity-supply-charge-vs-delivery-charge']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideSupplyVsDeliveryPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Supply vs. Delivery Charges Defined</h2>
        <p>Your monthly electric bill is split into two major service categories:</p>
        <ul>
          <li>
            <strong>Supply Charge (Generation):</strong> The cost of producing electricity at power
            plants (using natural gas, nuclear, wind, solar, or coal). In deregulated retail choice
            states (such as Texas, Pennsylvania, Ohio, and Illinois), consumers can choose an
            independent competitive retail supplier for this service.
          </li>
          <li>
            <strong>Delivery Charge (Distribution & Transmission):</strong> The cost of delivering
            electricity from power plants through high-voltage transmission lines, local
            substations, transformers, and utility poles to your home. Delivery is always provided
            by your regulated local distribution utility.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Supply vs. Delivery Feature Breakdown</h2>

        <div className={styles.tableWrapper}>
          <table
            aria-label="Comparison of electricity supply charges versus delivery charges"
            className={styles.dataTable}
          >
            <caption>Electric Bill Comparison: Supply Charges vs. Delivery Charges</caption>
            <thead>
              <tr>
                <th scope="col">Feature Category</th>
                <th scope="col">Supply Charge (Generation)</th>
                <th scope="col">Delivery Charge (Transmission & Distribution)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>What It Covers</td>
                <td>Raw electricity generation commodity</td>
                <td>Physical grid wires, poles, transformers, and maintenance</td>
              </tr>
              <tr>
                <td>Service Provider</td>
                <td>Electric supplier or utility default service</td>
                <td>Regulated local electric utility (LDC)</td>
              </tr>
              <tr>
                <td>Customer Choice</td>
                <td>Available in retail choice / deregulated states</td>
                <td>Regulated monopoly; no choice of delivery utility</td>
              </tr>
              <tr>
                <td>Rate Component Types</td>
                <td>Fixed/variable ¢/kWh rate</td>
                <td>Variable ¢/kWh rate + fixed monthly customer account fee</td>
              </tr>
              <tr>
                <td>Regulatory Body</td>
                <td>Market competition / FERC oversight</td>
                <td>State Public Utility Commission (PUC/PSC)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Regulated Markets vs. Retail Choice States</h2>
        <p>
          In traditionally regulated utility markets (such as Florida, Georgia, and Washington),
          your local utility provides both generation supply and grid delivery under one bundled
          tariff approved by the state public service commission.
        </p>
        <p>
          In deregulated retail choice markets (such as New York, Texas, Pennsylvania, and
          Massachusetts), the bill itemizes separate supply and delivery charges. Shopping for a
          competitive supplier changes only the supply rate portion of your bill; delivery tariffs
          remain regulated by state utility commissions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Related Tools & Resources</h2>
        <p>
          Analyze your bill line items with our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link>, examine
          statewide rate benchmarks on our{' '}
          <Link href="/electricity-rates">Electricity Rates Hub</Link>, or read our guide on{' '}
          <Link href="/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill">
            Calculating Cost per kWh From Your Bill
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
