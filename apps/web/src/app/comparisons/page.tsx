import type { Metadata } from 'next';

import { HubPage } from '@/components/hub-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Household Energy Cost & Equipment Comparisons',
  description:
    'Compare household energy consumption scenarios, heating vs cooling impact, and effective cost differences.',
  path: '/comparisons',
});

export default function ComparisonsPage() {
  return (
    <HubPage
      description="Analytical evaluations comparing energy consumption scenarios, rate tier impacts, and appliance heating/cooling trade-offs."
      eyebrow="Energy Comparisons"
      introText="Evaluating home energy efficiency requires comparing alternative heating, cooling, and charging options against baseline utility rates. Energy Bill Lab provides comparative analysis frameworks based on normalized daily kilowatt-hour consumption."
      related={['/electricity-bill-analyzer', '/tools', '/methodology', '/data-sources']}
      title="Household Energy Comparisons"
    />
  );
}
