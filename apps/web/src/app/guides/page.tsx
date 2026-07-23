import type { Metadata } from 'next';

import { HubPage } from '@/components/hub-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Home Energy & Electric Bill Problem Guides',
  description:
    'Practical, source-backed guides for understanding sudden bill spikes, fixed utility charges, and seasonal energy usage.',
  path: '/guides',
});

export default function GuidesPage() {
  return (
    <HubPage
      description="Practical guides for diagnosing high electric bills, seasonal spikes, fixed charges, and utility statement line items."
      eyebrow="Energy Guides"
      introText="Unexpected electric bill increases are usually caused by a combination of weather extremes, longer billing cycles, rate adjustments, or estimated meter readings. Our guides explain how to dissect your utility statement and identify actionable steps to control costs."
      related={[
        '/electricity-bill-analyzer',
        '/tools/appliance-energy-cost-calculator',
        '/tools/ac-cost-calculator',
        '/tools/space-heater-cost-calculator',
        '/tools/ev-home-charging-cost-calculator',
        '/methodology',
        '/data-sources',
      ]}
      title="Electric Bill Problem Guides"
    />
  );
}
