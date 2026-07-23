import type { Metadata } from 'next';

import { HubPage } from '@/components/hub-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Appliance Energy Cost & Power Benchmark Reference',
  description:
    'Reference guide for typical appliance wattage, duty cycles, operating hours, and daily operating cost formulas.',
  path: '/appliances',
});

export default function AppliancesPage() {
  return (
    <HubPage
      description="Appliance energy consumption benchmarks, typical wattage ranges, and daily operating cost estimations."
      eyebrow="Appliance Reference"
      introText="Understanding household appliance electricity usage requires evaluating three parameters: rated wattage, daily operating hours, and duty cycle. Energy Bill Lab provides power consumption guidance for air conditioners, space heaters, refrigerators, EV home chargers, and major household equipment."
      related={[
        '/tools/appliance-energy-cost-calculator',
        '/tools/ac-cost-calculator',
        '/tools/space-heater-cost-calculator',
        '/tools/ev-home-charging-cost-calculator',
        '/electricity-bill-analyzer',
        '/methodology',
        '/data-sources',
      ]}
      title="Appliance Energy Consumption"
    />
  );
}
