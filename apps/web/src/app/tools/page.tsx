import type { Metadata } from 'next';

import { HubPage } from '@/components/hub-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Home Energy Cost Tools & Calculators',
  description:
    'Public Energy Bill Lab calculators for analyzing utility bills, normalizing usage by billing days, and estimating operating costs.',
  path: '/tools',
});

export default function ToolsPage() {
  return (
    <HubPage
      description="Production-quality calculators designed to explain your utility statements and energy costs with transparent formulas."
      eyebrow="Interactive Utilities"
      introText="Energy Bill Lab provides transparent calculators to help U.S. households understand electricity charges, usage fluctuations, and appliance operating costs. All tools are free to use and do not require user account registration."
      related={[
        '/electricity-bill-analyzer',
        '/tools/appliance-energy-cost-calculator',
        '/tools/ac-cost-calculator',
        '/tools/space-heater-cost-calculator',
        '/tools/ev-home-charging-cost-calculator',
        '/methodology',
        '/data-sources',
        '/editorial-policy',
      ]}
      title="Home Energy Cost Tools"
    />
  );
}
