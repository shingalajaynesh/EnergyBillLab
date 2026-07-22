import type { Metadata } from 'next';

import { HubPage } from '@/components/hub-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Appliances',
  description:
    'Planned appliance reference pages for watts, duty cycles, and home energy-cost context.',
  path: '/appliances',
});

export default function AppliancesPage() {
  return (
    <HubPage
      title="Appliances"
      description="Appliance pages will explain typical watts, use patterns, assumptions, and source dates once reviewed data is ready."
      emptyMessage="No appliance reference pages are published yet. The site will not present unsourced appliance defaults as facts."
      related={['/tools', '/methodology', '/data-sources']}
    />
  );
}
