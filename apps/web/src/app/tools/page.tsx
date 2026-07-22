import type { Metadata } from 'next';

import { HubPage } from '@/components/hub-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Tools',
  description:
    'Planned Energy Bill Lab calculators for bills, appliances, cooling, heating, and EV charging.',
  path: '/tools',
});

export default function ToolsPage() {
  return (
    <HubPage
      title="Energy Cost Tools"
      description="This hub will hold public calculators once the shared calculation engine is implemented and tested."
      emptyMessage="Calculator pages are intentionally not published in this task. Future tools must show formulas, assumptions, units, warnings, and source notes before they go live."
      related={['/methodology', '/data-sources', '/disclaimer']}
    />
  );
}
