import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import { FuelComparatorTool } from '@/features/heating-fuel-comparator';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import { createFaqStructuredData, serializeStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = createPageMetadata({
  title: 'Heating Fuel & Heat Pump Breakeven Calculator | Natural Gas vs Heat Pump',
  description:
    'Compare delivered heating costs per Million BTU (MMBtu) across Natural Gas, Heat Pumps, Heating Oil, Propane, and Electric Resistance. Calculate your home thermal balance crossover temperature.',
  path: '/tools/heating-fuel-comparator',
});

const breadcrumbs: Array<{ href: PublicRouteHref; label?: string }> = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
  { href: '/tools/heating-fuel-comparator', label: 'Heating Fuel Comparator' },
];

const faqs = [
  {
    question: 'How do you compare heating costs across different fuels?',
    answer:
      'Heating systems use different units (therms for natural gas, kWh for electricity, gallons for propane and heating oil). To compare them objectively, we convert each fuel into delivered cost per Million BTU (MMBtu) of heat output, taking into account the annual fuel utilization efficiency (AFUE) of furnaces or the coefficient of performance (COP) of heat pumps.',
  },
  {
    question: 'What is the thermal balance economic crossover point?',
    answer:
      'The thermal balance crossover point is the outdoor winter temperature where the operating cost of a heat pump equals that of a natural gas furnace. Because heat pump efficiency (COP) decreases as outdoor temperatures drop, there is an exact outdoor temperature where switching to gas or dual-fuel auxiliary heating becomes more economical per hour.',
  },
  {
    question: 'Is a heat pump cheaper than natural gas heating?',
    answer:
      'In regions with moderate electricity rates (under 16¢/kWh) or high natural gas rates (over $1.50/therm), high-efficiency cold-climate heat pumps (COP 2.5–3.5) are often cheaper to operate than standard natural gas furnaces. In regions with very cheap natural gas (under $1.00/therm) and high electricity rates (over 25¢/kWh), natural gas typically has the lower operating cost.',
  },
  {
    question: 'How much more expensive is electric resistance heating than a heat pump?',
    answer:
      'Electric resistance baseboards and furnace heat strips operate at a COP of 1.0 (1 kWh = 3,412 BTU). Modern inverter heat pumps deliver a seasonal COP between 2.5 and 3.5, providing 2.5 to 3.5 times more heat per kilowatt-hour of electricity, cutting annual heating bills by 60% to 70%.',
  },
];

const relatedLinks: PublicRouteHref[] = [
  '/tools/home-energy-scorecard',
  '/tools/gas-furnace-cost-calculator',
  '/guides/heat-pump-vs-electric-resistance-heating-cost',
  '/compare-states',
];

export default function HeatingFuelComparatorPage() {
  const faqStructuredData = createFaqStructuredData(faqs);

  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        title="Heating Fuel & Heat Pump Breakeven Comparator"
        description="Benchmark delivered heating cost per Million BTU (MMBtu) across Natural Gas, Heat Pumps, Heating Oil, Propane, and Electric Resistance at local utility prices."
      />

      <FuelComparatorTool />

      <section style={{ marginTop: 40 }}>
        <h2>Thermodynamic Conversion Formulas</h2>
        <p>
          To normalize disparate energy units, Energy Bill Lab converts each raw fuel into Million British Thermal Units (MMBtu) delivered into the conditioned living space:
        </p>
        <ul>
          <li>
            <strong>Natural Gas:</strong> 1 Therm = 100,000 BTU. Delivered Cost/MMBtu = (Price/Therm &times; 10) / AFUE
          </li>
          <li>
            <strong>Electricity (Heat Pump):</strong> 1 kWh = 3,412.14 BTU (293.071 kWh per MMBtu at 100%). Delivered Cost/MMBtu = (Rate in $/kWh &times; 293.071) / COP
          </li>
          <li>
            <strong>Propane:</strong> 1 Gallon = 91,500 BTU. Delivered Cost/MMBtu = (Price/Gallon &times; 10.929) / AFUE
          </li>
          <li>
            <strong>Heating Oil #2:</strong> 1 Gallon = 138,500 BTU. Delivered Cost/MMBtu = (Price/Gallon &times; 7.22) / AFUE
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq) => (
          <div key={faq.question} style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', marginBottom: 4 }}>
              {faq.question}
            </h3>
            <p style={{ color: '#4b5563', lineHeight: 1.6, margin: 0 }}>{faq.answer}</p>
          </div>
        ))}
      </section>

      <DataSourceNote>
        Energy conversion constants from U.S. Energy Information Administration (EIA) Thermal Equivalence Tables and U.S. DOE Building America Research Benchmarks (August 2026 Reference Data).
      </DataSourceNote>

      <RelatedLinks links={relatedLinks} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(faqStructuredData),
        }}
      />
    </PageContainer>
  );
}
