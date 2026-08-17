import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageContainer } from '@/components/page-container';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import { getSiteUrl, SITE_NAME } from '@/lib/site';
import { createFaqStructuredData, serializeStructuredData } from '@/lib/structured-data';

import { CategoryNavSection } from './category-nav-section';
import styles from './comparisons-hub.module.css';
import { PopularComparisonsGrid } from './popular-comparisons-grid';
import { QuickComparisonLauncher } from './quick-comparison-launcher';

export const metadata: Metadata = createPageMetadata({
  title: 'Home Energy Cost Comparisons & Calculators',
  description:
    'Compare household appliances, heating systems, cooling equipment, EV charging, and electricity-rate plans using transparent energy-use and cost formulas.',
  path: '/comparisons',
});

const breadcrumbs = [
  { label: 'Home', href: '/' as PublicRouteHref },
  { label: 'Comparisons', href: '/comparisons' as PublicRouteHref },
];

const faqs = [
  {
    question: 'How do I fairly compare operating costs between gas and electric appliances?',
    answer:
      'Convert all energy units to a common heating unit (BTU or kWh). One Therm of natural gas equals 100,000 BTU or approximately 29.3 kWh of electric equivalent. Multiply fuel usage by your utility rate per therm ($/therm) versus electricity rate per kWh ($/kWh), factoring in equipment AFUE combustion or COP heat pump efficiency.',
  },
  {
    question: 'Why are heat pumps significantly cheaper to run than electric resistance heating?',
    answer:
      'Electric resistance heaters convert 1 unit of electricity into 1 unit of heat (100% efficiency, COP 1.0). Heat pumps move ambient outdoor thermal energy indoors, delivering 2.5 to 4.0 units of heat per unit of electricity (250%–400% efficiency, COP 2.5–4.0), cutting heating bills by 50% to 60%.',
  },
  {
    question: 'What is the operating cost difference between window AC and portable AC units?',
    answer:
      'Window air conditioners achieve higher efficiency (EER 11.0–12.0) and seal directly into the window. Single-hose portable AC units expel exhaust through a duct that pulls warm outdoor air back into the room through cracks, increasing energy consumption by 30% to 40%.',
  },
  {
    question: 'How do Time-of-Use (TOU) electricity rates impact appliance cost comparisons?',
    answer:
      'Under TOU pricing, electricity costs 2x to 3x more during peak demand hours (typically 4 PM to 9 PM). Running high-draw appliances like clothes dryers, EV chargers, or pool pumps during off-peak morning or overnight hours cuts operating expenses in half compared to peak-period operation.',
  },
];

const collectionStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Home Energy Cost Comparisons',
  description:
    'Analytical evaluations comparing energy consumption scenarios, rate tier impacts, and appliance heating/cooling trade-offs.',
  url: getSiteUrl('/comparisons'),
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_NAME,
    url: getSiteUrl('/'),
  },
};

export default function ComparisonsPage() {
  const faqSchema = createFaqStructuredData(faqs);
  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(collectionStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(faqSchema) }}
      />
      <Breadcrumbs items={breadcrumbs} />

      <div className={styles.container}>
        {/* SECTION 1: HERO (Two-Column Layout on Light Muted Surface) */}
        <section className={styles.heroSection} aria-label="Hero Section">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>HOME ENERGY COMPARISONS</span>
              <h1 className={styles.heroTitle}>Compare Energy Costs Before You Choose</h1>
              <p className={styles.heroDescription}>
                Compare heating systems, cooling equipment, household appliances, EV charging, and
                electricity-rate plans using consistent energy-use and cost assumptions.
              </p>

              <ul className={styles.trustList}>
                <li className={styles.trustItem}>
                  <span className={styles.trustCheck}>✓</span> Transparent formulas
                </li>
                <li className={styles.trustItem}>
                  <span className={styles.trustCheck}>✓</span> Your electricity rate
                </li>
                <li className={styles.trustItem}>
                  <span className={styles.trustCheck}>✓</span> Source-backed assumptions
                </li>
              </ul>

              <div className={styles.heroActions}>
                <Link href="/electricity-bill-analyzer" className={styles.btnPrimary}>
                  Analyze My Electricity Bill
                </Link>
                <Link href="/electricity-rates" className={styles.btnSecondary}>
                  View Electricity Rates
                </Link>
              </div>

              <Link href="/methodology" className={styles.heroMethodologyLink}>
                See our comparison methodology →
              </Link>
            </div>

            <div className={styles.heroRight}>
              <QuickComparisonLauncher />
            </div>
          </div>
        </section>

        {/* SECTION 2: POPULAR COMPARISONS (White Page Section) */}
        <section className={styles.section} aria-labelledby="popular-heading">
          <div className={styles.sectionHeader}>
            <h2 id="popular-heading" className={styles.sectionTitle}>
              Popular Home Energy Comparisons
            </h2>
            <p className={styles.sectionIntro}>
              Start with the comparisons homeowners most often need when evaluating equipment,
              operating cost, or electricity-rate options.
            </p>
          </div>

          <PopularComparisonsGrid />
        </section>

        {/* SECTION 3: CATEGORY NAVIGATION (Light Neutral Section) */}
        <section className={styles.section} aria-labelledby="category-nav-heading">
          <div className={styles.sectionHeader}>
            <h2 id="category-nav-heading" className={styles.sectionTitle}>
              Energy Systems & Equipment Categories
            </h2>
            <p className={styles.sectionIntro}>
              Navigate comparison topics by equipment type to access targeted calculation variables
              and source-backed guides.
            </p>
          </div>

          <CategoryNavSection />
        </section>

        {/* SECTION 4: VISUAL COMPARISON EXAMPLE (White Page Panel) */}
        <section className={styles.section} aria-labelledby="example-heading">
          <div className={styles.examplePanel}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>WORKED DEMONSTRATION</span>
              <h2 id="example-heading" className={styles.sectionTitle}>
                Example: Two Cooling Options Using the Same Electricity Rate
              </h2>
              <p className={styles.sectionIntro}>
                Review how consistent wattage, runtime, duty cycle, and electricity rate assumptions
                yield transparent side-by-side cost estimates.
              </p>
            </div>

            <div className={styles.exampleTableWrapper}>
              <table className={styles.exampleTable}>
                <thead>
                  <tr>
                    <th>Comparison Factor</th>
                    <th>Option A: Window AC</th>
                    <th>Option B: Portable AC</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.factorName}>Rated Input Power</td>
                    <td className={styles.valA}>1,200 W</td>
                    <td className={styles.valB}>1,400 W</td>
                  </tr>
                  <tr>
                    <td className={styles.factorName}>Daily Runtime</td>
                    <td className={styles.valA}>8.0 Hours</td>
                    <td className={styles.valB}>8.0 Hours</td>
                  </tr>
                  <tr>
                    <td className={styles.factorName}>Duty Cycle (Compressor Run %)</td>
                    <td className={styles.valA}>50% (Sealed Window Frame)</td>
                    <td className={styles.valB}>70% (Exhaust Hose Heat Leakage)</td>
                  </tr>
                  <tr>
                    <td className={styles.factorName}>Estimated Daily kWh</td>
                    <td className={styles.valA}>4.80 kWh / Day</td>
                    <td className={styles.valB}>7.84 kWh / Day</td>
                  </tr>
                  <tr>
                    <td className={styles.factorName}>Electricity Rate Baseline</td>
                    <td className={styles.valA}>$0.17 / kWh</td>
                    <td className={styles.valB}>$0.17 / kWh</td>
                  </tr>
                  <tr>
                    <td className={styles.factorName}>Estimated 30-Day Operating Cost</td>
                    <td className={styles.valA}>$24.48 / Month</td>
                    <td className={styles.valB}>$39.98 / Month</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className={styles.exampleDisclaimer}>
              * Illustrative example: Your actual results depend on cooling capacity, room size,
              climate, equipment efficiency, and operating schedule.
            </p>

            <Link href="/tools/ac-cost-calculator" className={styles.btnPrimary}>
              Calculate With My Numbers →
            </Link>
          </div>
        </section>

        {/* SECTION 5: HOW COMPARISONS WORK (3-Step Light Neutral Cards) */}
        <section className={styles.section} aria-labelledby="how-it-works-heading">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>TRANSPARENT METHODOLOGY</span>
            <h2 id="how-it-works-heading" className={styles.sectionTitle}>
              How Energy Bill Lab Comparisons Work
            </h2>
            <p className={styles.sectionIntro}>
              We apply the same electricity rate, runtime, and operating assumptions to both options
              so the comparison remains consistent.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <span className={styles.stepNum}>1</span>
              <h3 className={styles.stepTitle}>Choose Options</h3>
              <p className={styles.stepDesc}>
                Select appliances, heating systems, cooling units, or rate plans to compare side by
                side.
              </p>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNum}>2</span>
              <h3 className={styles.stepTitle}>Use Consistent Assumptions</h3>
              <p className={styles.stepDesc}>
                Apply uniform runtime hours, rated wattage, active duty cycle, and baseline
                electricity rate inputs.
              </p>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNum}>3</span>
              <h3 className={styles.stepTitle}>Compare Energy & Cost</h3>
              <p className={styles.stepDesc}>
                Review daily kWh consumption, monthly bill impact, and long-term operating cost
                differences.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: FORMULA SECTION (Light Analytical Panel) */}
        <section className={styles.section} aria-label="Energy Formulas and Technical Notes">
          <div className={styles.formulaPanel}>
            <div className={styles.formulaHeader}>
              <div>
                <h2 className={styles.formulaTitle}>How Energy Cost Comparisons Are Calculated</h2>
                <p className={styles.formulaSubtitle}>
                  We apply the same electricity rate, runtime, and operating assumptions to both
                  options so the comparison remains consistent.
                </p>
              </div>
              <Link href="/methodology" className={styles.formulaMethodologyLink}>
                Review full methodology →
              </Link>
            </div>

            <div className={styles.formulaGridTwo}>
              <div className={styles.formulaCard}>
                <div className={styles.formulaCardHeader}>
                  <span className={styles.formulaIconContainer}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </span>
                  <span className={styles.formulaCardLabel}>1. Electrical Energy Used (kWh)</span>
                </div>
                <div className={styles.formulaText}>
                  Power (kW) × Runtime (Hours) × Duty Cycle (%)
                </div>
                <p className={styles.formulaExplanation}>
                  Calculates total electrical consumption based on equipment draw and active
                  runtime.
                </p>
              </div>

              <div className={styles.formulaCard}>
                <div className={styles.formulaCardHeader}>
                  <span className={styles.formulaIconContainer}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </span>
                  <span className={styles.formulaCardLabel}>2. Estimated Electricity Cost ($)</span>
                </div>
                <div className={styles.formulaText}>
                  Energy Used (kWh) × Electricity Rate ($/kWh)
                </div>
                <p className={styles.formulaExplanation}>
                  Multiplies total kilowatt-hours used by your local utility rate per kWh.
                </p>
              </div>
            </div>

            <details className={styles.techNotesDetails}>
              <summary className={styles.techNotesSummary}>
                + Technical notes on efficiency ratings (COP, EER, SEER2)
              </summary>
              <div className={styles.techNotesContent}>
                <p>
                  <strong>Dimensionless Efficiency:</strong> For pure percentage ratings,
                  Electricity Input = Required Output ÷ Efficiency (as a decimal).
                </p>
                <p>
                  <strong>Heat Pumps (COP):</strong> Electricity Consumed = Heat Delivered ÷
                  Coefficient of Performance (COP).
                </p>
                <p>
                  <strong>Cooling Ratings (EER & SEER2):</strong>{' '}
                  {'EER and SEER2 are imperial cooling-capacity ratios measured in BTU/Wh.'} Because
                  they carry physical units, they cannot be treated as ordinary dimensionless
                  efficiency percentages without unit conversions and seasonal load definitions.
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* SECTION 7: OWN-RATE CTA (Subtle Light Tinted Utility Panel) */}
        <section className={styles.section} aria-label="Calculate With Your Electricity Rate">
          <div className={styles.rateCtaPanel}>
            <div className={styles.rateCtaLeft}>
              <div className={styles.rateCtaBadgeRow}>
                <span className={styles.rateCtaIcon}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </span>
                <span className={styles.rateCtaBadge}>ACCURATE UTILITY COMPARISON</span>
              </div>
              <h2 className={styles.rateCtaTitle}>Use Your Actual Electricity Rate</h2>
              <p className={styles.rateCtaDesc}>
                Your utility rate, delivery charges, and time-of-use schedule can materially change
                the result.
              </p>
            </div>

            <div className={styles.rateCtaActions}>
              <Link href="/electricity-bill-analyzer" className={styles.btnPrimary}>
                Analyze My Bill
              </Link>
              <Link
                href="/guides/how-to-calculate-electricity-cost-per-kwh-from-your-bill"
                className={styles.btnSecondary}
              >
                Calculate Effective Rate
              </Link>
              <Link href="/electricity-rates" className={styles.rateCtaTextLink}>
                Browse State Rates →
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 8: FREQUENTLY ASKED QUESTIONS */}
        <section className={styles.section} aria-labelledby="faq-heading">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>COMMON QUESTIONS</span>
            <h2 id="faq-heading" className={styles.sectionTitle}>
              Frequently Asked Questions About Energy Cost Comparisons
            </h2>
            <p className={styles.sectionIntro}>
              Clear answers on comparing heating fuels, efficiency ratings, equipment types, and
              utility billing structures.
            </p>
          </div>

          <div className={styles.faqGrid}>
            {faqs.map((faq) => (
              <div key={faq.question} className={styles.faqCard}>
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* SECTION 8: TRUST AND LIMITATIONS FOOTER (Light Neutral Footer) */}
      <footer className={styles.trustFooter}>
        <div className={styles.container}>
          <div className={styles.trustFooterGrid}>
            <div className={styles.trustFooterItem}>
              <span className={styles.trustFooterDot} />
              <div className={styles.trustFooterText}>
                <strong>Estimates, not utility quotes:</strong> Comparisons provide directional
                guidance based on standard engineering formulas.
              </div>
            </div>

            <div className={styles.trustFooterItem}>
              <span className={styles.trustFooterDot} />
              <div className={styles.trustFooterText}>
                <strong>No guaranteed savings:</strong> Actual electricity consumption depends on
                household habits and weather.
              </div>
            </div>

            <div className={styles.trustFooterItem}>
              <span className={styles.trustFooterDot} />
              <div className={styles.trustFooterText}>
                <strong>Equipment performance varies:</strong> Nameplate wattage represents peak
                draw, not average cycling load.
              </div>
            </div>

            <div className={styles.trustFooterItem}>
              <span className={styles.trustFooterDot} />
              <div className={styles.trustFooterText}>
                <strong>Tariffs differ by utility:</strong> Tiered pricing, TOU multipliers, and
                delivery surcharges alter cost outcomes.
              </div>
            </div>
          </div>

          <div className={styles.policyLinksRow}>
            <Link href="/methodology" className={styles.policyLink}>
              Methodology
            </Link>
            <Link href="/data-sources" className={styles.policyLink}>
              Data Sources
            </Link>
            <Link href="/editorial-policy" className={styles.policyLink}>
              Editorial Policy
            </Link>
            <Link href="/disclaimer" className={styles.policyLink}>
              Disclaimer
            </Link>
          </div>
        </div>
      </footer>
    </PageContainer>
  );
}
