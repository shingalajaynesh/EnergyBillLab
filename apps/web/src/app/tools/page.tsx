import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageContainer } from '@/components/page-container';
import { RelatedLinks } from '@/components/related-links';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';

export const metadata: Metadata = createPageMetadata({
  title: 'Home Energy Cost Tools & Calculators',
  description:
    'Free production energy calculators for electricity bill analysis, appliance usage, climate control, EV charging, and major home equipment.',
  path: '/tools',
});

export default function ToolsPage() {
  const breadcrumbs: Array<{ href: PublicRouteHref; label?: string }> = [
    { href: '/', label: 'Home' },
    { href: '/tools', label: 'Tools' },
  ];

  const categories = [
    {
      title: 'Bill Analysis & Rate Benchmarks',
      tools: [
        {
          href: '/electricity-bill-analyzer' as PublicRouteHref,
          name: 'Electricity Bill Analyzer',
          description:
            'Analyze bill spikes, normalize billing cycle length, and calculate your all-in cost per kWh.',
        },
      ],
    },
    {
      title: 'General Energy Calculations',
      tools: [
        {
          href: '/tools/appliance-energy-cost-calculator' as PublicRouteHref,
          name: 'Appliance Energy Cost Calculator',
          description:
            'Estimate electricity usage and operating cost for any custom household appliance or device.',
        },
      ],
    },
    {
      title: 'Heating, Cooling & Environmental Control',
      tools: [
        {
          href: '/tools/ac-cost-calculator' as PublicRouteHref,
          name: 'Air Conditioner Cost Calculator',
          description:
            'Calculate AC electricity usage using cooling capacity (BTU/hr), EER efficiency, and duty cycles.',
        },
        {
          href: '/tools/space-heater-cost-calculator' as PublicRouteHref,
          name: 'Space Heater Cost Calculator',
          description:
            'Estimate electric space heater operating costs based on wattage, quantity, and thermostat runtime.',
        },
        {
          href: '/tools/dehumidifier-cost-calculator' as PublicRouteHref,
          name: 'Dehumidifier Cost Calculator',
          description:
            'Calculate basement and room dehumidifier operating costs using compressor wattage and duty cycle.',
        },
      ],
    },
    {
      title: 'Electric Mobility & Vehicles',
      tools: [
        {
          href: '/tools/ev-home-charging-cost-calculator' as PublicRouteHref,
          name: 'EV Home Charging Cost Calculator',
          description:
            'Calculate EV charging session cost, grid charging losses, and cost per mile based on battery kWh.',
        },
      ],
    },
    {
      title: 'Appliance-Specific Calculators',
      tools: [
        {
          href: '/tools/refrigerator-cost-calculator' as PublicRouteHref,
          name: 'Refrigerator Cost Calculator',
          description:
            'Estimate 24/7 continuous plugged-in cost using compressor duty cycle or EnergyGuide annual kWh.',
        },
        {
          href: '/tools/clothes-dryer-cost-calculator' as PublicRouteHref,
          name: 'Clothes Dryer Cost Calculator',
          description:
            'Calculate 240V electric clothes dryer cost per load, weekly spending, and annual consumption.',
        },
        {
          href: '/tools/electric-water-heater-cost-calculator' as PublicRouteHref,
          name: 'Electric Water Heater Cost Calculator',
          description:
            'Estimate electric resistance tank water heating costs using element wattage and active heating hours.',
        },
        {
          href: '/tools/pool-pump-cost-calculator' as PublicRouteHref,
          name: 'Pool Pump Cost Calculator',
          description:
            'Calculate daily, monthly, and seasonal pool filtration electricity costs based on motor input wattage.',
        },
      ],
    },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/appliances',
    '/guides',
    '/electricity-rates',
    '/methodology',
    '/data-sources',
  ];

  return (
    <PageContainer>
      <Breadcrumbs items={breadcrumbs} />

      <header style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: '#1f1f1f',
            marginBottom: 12,
            letterSpacing: '-0.5px',
          }}
        >
          Home Energy Cost Tools & Calculators
        </h1>
        <p style={{ fontSize: 16, color: '#595959', maxWidth: 840, lineHeight: 1.6 }}>
          Energy Bill Lab provides transparent calculators to help U.S. households understand
          utility charges, usage spikes, climate control costs, and major appliance energy
          consumption. All tools run locally in your browser with transparent formulas.
        </p>
      </header>

      {categories.map((cat) => (
        <section key={cat.title} style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1f1f1f', marginBottom: 14 }}>
            {cat.title}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {cat.tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                style={{
                  display: 'block',
                  padding: 20,
                  background: '#ffffff',
                  border: '1px solid #e8e8e8',
                  borderRadius: 10,
                  textDecoration: 'none',
                }}
              >
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#176b5b', marginBottom: 6 }}>
                  {tool.name}
                </h3>
                <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section style={{ marginTop: 40 }}>
        <RelatedLinks links={relatedLinks} />
      </section>
    </PageContainer>
  );
}
