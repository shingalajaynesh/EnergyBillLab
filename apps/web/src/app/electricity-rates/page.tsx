import type { Metadata } from 'next';

import { HubPage } from '@/components/hub-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Electricity Rates',
  description: 'How Energy Bill Lab will present sourced U.S. residential electricity-rate pages.',
  path: '/electricity-rates',
});

export default function ElectricityRatesPage() {
  return (
    <HubPage
      title="Electricity Rates"
      description="State rate pages will be published only after validated source snapshots and update dates are available."
      emptyMessage="No state rate pages are published yet. This avoids placeholder pages and prevents unsupported rate claims."
      related={['/data-sources', '/methodology', '/editorial-policy']}
    />
  );
}
