import type { Metadata } from 'next';

import { HubPage } from '@/components/hub-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Tools',
  description:
    'Public Energy Bill Lab calculators for electricity bills, appliances, cooling, heating, and EV charging.',
  path: '/tools',
});

export default function ToolsPage() {
  return (
    <HubPage
      description="Production-quality calculators designed to explain your utility statements and energy costs with transparent formulas."
      emptyMessage="Additional appliance and state rate tools are under active development."
      related={['/electricity-bill-analyzer', '/methodology', '/data-sources', '/disclaimer']}
      title="Energy Cost Tools"
    />
  );
}
