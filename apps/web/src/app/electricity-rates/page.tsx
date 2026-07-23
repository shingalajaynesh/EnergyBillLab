import type { Metadata } from 'next';

import { HubPage } from '@/components/hub-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Residential Electricity Rates & U.S. Benchmarks',
  description:
    'Explore residential electricity rate benchmarks, state averages, and transparent source dates backed by official U.S. EIA monthly data.',
  path: '/electricity-rates',
});

export default function ElectricityRatesPage() {
  return (
    <HubPage
      description="U.S. residential electricity rate benchmarks and state average comparisons grounded in official U.S. EIA data."
      eyebrow="Rate Benchmarks"
      introText="Residential electricity rates vary significantly across U.S. states due to generation mix, fuel costs, regulatory structures, and delivery infrastructure. Energy Bill Lab uses Form EIA-861M monthly retail sales data to provide verified rate benchmarks for household utility analysis."
      related={['/electricity-bill-analyzer', '/data-sources', '/methodology', '/editorial-policy']}
      title="Residential Electricity Rates"
    />
  );
}
