import type { Metadata } from 'next';
import Link from 'next/link';

import { GuideArticleView } from '@/components/guide-article-view';
import { energyGuides } from '@/content/guides';
import { createPageMetadata } from '@/lib/metadata';

import styles from '@/components/guide-article-view.module.css';

const guide = energyGuides['how-budget-billing-works']!;

export const metadata: Metadata = createPageMetadata({
  title: guide.title,
  description: guide.description,
  path: guide.href,
});

export default function GuideBudgetBillingPage() {
  return (
    <GuideArticleView guide={guide}>
      <section className={styles.section}>
        <h2>Direct Answer: How Does Budget Billing Work?</h2>
        <p>
          <strong>Budget Billing</strong> (also known as Levelized Payment or Balanced Billing) is a
          voluntary utility payment plan that averages your annual electricity expenditures into
          predictable, equal monthly payment amounts.
        </p>
        <p>
          Budget billing does <strong>not</strong> discount your electricity rate or reduce total
          kilowatt-hours consumed. It simply smooths out high summer cooling and winter heating bill
          spikes across 12 months.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Levelized Calculations, Deferred Balances & Annual True-Ups</h2>
        <p>Budget billing programs operate through systematic financial reconciliation:</p>
        <ul>
          <li>
            <strong>Annual Usage Averaging:</strong> The utility calculates your monthly payment by
            taking your past 12-month energy costs (Total Annual Expenditure ÷ 12).
          </li>
          <li>
            <strong>Deferred Balance Account:</strong> Each month, the difference between your fixed
            budget payment and your actual electricity usage is tracked in a deferred balance
            account.
          </li>
          <li>
            <strong>Quarterly Adjustments:</strong> If weather or rate changes cause actual usage to
            deviate significantly from historical averages, utilities recalculate your monthly
            payment mid-year to prevent large deferred balances.
          </li>
          <li>
            <strong>Annual True-Up Settlement:</strong> At the 12-month mark, the utility performs
            an annual true-up reconciliation. If actual usage exceeded budget payments, you pay the
            remaining balance; if payments exceeded actual usage, a statement credit is issued.
          </li>
        </ul>
        <div className={styles.formulaBox}>
          Levelized Monthly Payment ($) = Total Prior 12-Month Electricity Costs ($) ÷ 12
        </div>
      </section>

      <section className={styles.section}>
        <h2>Budget Billing vs. Actual Consumption Example</h2>
        <div className={styles.tableWrapper}>
          <table
            aria-label="Monthly comparison of actual electric usage costs versus fixed budget billing payments"
            className={styles.dataTable}
          >
            <caption>Sample Monthly Spend: Actual Usage vs. Budget Billing Plan</caption>
            <thead>
              <tr>
                <th scope="col">Season / Month</th>
                <th scope="col">Actual Usage Cost ($)</th>
                <th scope="col">Fixed Budget Payment ($)</th>
                <th scope="col">Monthly Deferred Balance Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Spring (April / Mild)</td>
                <td>$90.00</td>
                <td>$150.00</td>
                <td>+$60.00 (Credit Accrues)</td>
              </tr>
              <tr>
                <td>Summer (July / AC Peak)</td>
                <td>$240.00</td>
                <td>$150.00</td>
                <td>-$90.00 (Credit Drawn Down)</td>
              </tr>
              <tr>
                <td>Fall (October / Mild)</td>
                <td>$90.00</td>
                <td>$150.00</td>
                <td>+$60.00 (Credit Accrues)</td>
              </tr>
              <tr>
                <td>Winter (January / Heat Peak)</td>
                <td>$210.00</td>
                <td>$150.00</td>
                <td>-$60.00 (Credit Drawn Down)</td>
              </tr>
              <tr>
                <td>
                  <strong>Annual 12-Month Total</strong>
                </td>
                <td>
                  <strong>$1,800.00</strong>
                </td>
                <td>
                  <strong>$1,800.00</strong>
                </td>
                <td>
                  <strong>$0.00 (Annual True-Up Reconciled)</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          * Note: Budget billing plan terms, recalculation schedules, and true-up rules vary by
          utility provider. Figures represent an illustrative calculation assumption for a $1,800
          annual energy profile.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Assumptions & Plan Cancellation Rules</h2>
        <p>
          If you cancel budget billing or close your utility account mid-year, any accumulated
          negative deferred balance becomes immediately due on your final statement.
        </p>
        <p>
          Calculate your annual average utility spend with our{' '}
          <Link href="/electricity-bill-analyzer">Electricity Bill Analyzer</Link> or learn more in
          our{' '}
          <Link href="/guides/how-to-read-an-electric-bill-line-by-line">
            Reading Your Electric Bill Guide
          </Link>{' '}
          or high bill diagnostics:{' '}
          <Link href="/guides/why-is-my-electric-bill-so-high">
            Why Is My Electric Bill So High?
          </Link>
          .
        </p>
      </section>
    </GuideArticleView>
  );
}
