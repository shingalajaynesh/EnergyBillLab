import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['why-electricity-rates-change']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideWhyRatesChangePage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: Why Do Electricity Rates Change?</h2>
        <p>
          Residential electricity rates ($/kWh) change due to four primary economic drivers:{' '}
          <strong>fuel generation costs</strong> (natural gas and coal prices),{' '}
          <strong>transmission & distribution grid infrastructure investments</strong>,{' '}
          <strong>extreme weather events</strong>, and <strong>state regulatory rate cases</strong>.
        </p>
        <p>
          It is essential to separate a <strong>rate change</strong> (a change in the price charged
          per kWh) from a <strong>usage change</strong> (a change in the number of kWh your
          household consumed).
        </p>
      </section>

      <section className={styles.section}>
        <h2>Primary Drivers of Electricity Price Fluctuations</h2>
        <p>
          According to 2023 data from the{' '}
          <strong>U.S. Energy Information Administration (EIA)</strong>, U.S. residential
          electricity prices reflect three core operational cost categories:
        </p>
        <ul>
          <li>
            <strong>Generation / Power Supply (~46% of Rate):</strong> Costs to generate electricity
            from natural gas, nuclear, coal, and renewable resources fluctuate based on wholesale
            energy markets and fuel prices.
          </li>
          <li>
            <strong>Distribution Grid (~38% of Rate):</strong> Regulated local utility expenses for
            building, maintaining, and repairing neighborhood power lines, substations,
            transformers, and customer meters.
          </li>
          <li>
            <strong>Transmission Grid (~16% of Rate):</strong> Costs for moving high-voltage
            electricity across interstate transmission towers from power plants to local
            distribution networks.
          </li>
          <li>
            <strong>State Regulatory Rate Cases:</strong> Regulated utilities must submit public
            evidence to state public utility commissions (PUCs) to approve base rate changes for
            distribution operations.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Total Bill Change ($) = (Rate Change × Billed kWh) + (Usage Change × Previous Rate)
        </div>
      </section>

      <section className={styles.section}>
        <h2>Electricity Price Component Breakdown & Regulatory Jurisdiction</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Breakdown of primary cost drivers behind residential electricity pricing"
            className={styles.dataTable}
          >
            <caption>
              U.S. Residential Electricity Price Breakdown (EIA 2023 National Benchmark)
            </caption>
            <thead>
              <tr>
                <th scope="col">Price Component</th>
                <th scope="col">National Average Share</th>
                <th scope="col">Primary Volatility Drivers</th>
                <th scope="col">Regulatory Authority</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Generation / Power Supply</td>
                <td>~46% of Total Rate</td>
                <td>Wholesale fuel price volatility, plant maintenance, regional demand</td>
                <td>FERC (Wholesale Markets) / State PUCs (Retail Supply)</td>
              </tr>
              <tr>
                <td>Distribution Grid</td>
                <td>~38% of Total Rate</td>
                <td>Local power line repairs, substation upgrades, storm restoration</td>
                <td>State Public Utility Commissions (PUCs)</td>
              </tr>
              <tr>
                <td>Transmission Grid</td>
                <td>~16% of Total Rate</td>
                <td>High-voltage interstate line expansion, regional reliability projects</td>
                <td>FERC & Regional Transmission Organizations (RTOs)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Official national benchmark based on 2023 U.S. Energy Information Administration
          (EIA) price component data. FERC regulates interstate transmission and wholesale markets,
          while state PUCs regulate local retail distribution charges. Component proportions vary
          significantly by state and utility.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Specific Bill Diagnosis</h2>
        <p>
          Never attribute a specific monthly bill increase solely to a rate hike without inspecting
          your statement line items. Compare your current billed usage (kWh) and unit rate ($/kWh)
          against the same month from the previous year.
        </p>
        <p>
          Diagnose your electric bill changes with our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link> or evaluate
          utility riders in our{' '}
          <Link href="/guides/fuel-adjustment-charges-and-utility-riders-explained">
            Fuel Adjustment Charges & Riders Guide
          </Link>{' '}
          or explore state rates on our{' '}
          <Link href="/electricity-rates">U.S. Electricity Rates Directory</Link>.
        </p>
      </section>
    </GuideArticleView>
  );
}
