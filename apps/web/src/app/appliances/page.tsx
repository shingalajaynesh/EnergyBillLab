import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageContainer } from '@/components/page-container';
import { RelatedLinks } from '@/components/related-links';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';

export const metadata: Metadata = createPageMetadata({
  title: 'Appliance Energy Cost & Power Benchmark Reference',
  description:
    'Calculate and compare household appliance electricity costs. Explore specific calculators and guides for refrigerators, clothes dryers, water heaters, pool pumps, and dehumidifiers.',
  path: '/appliances',
});

export default function AppliancesPage() {
  const breadcrumbs: Array<{ href: PublicRouteHref; label?: string }> = [
    { href: '/', label: 'Home' },
    { href: '/appliances', label: 'Appliances Hub' },
  ];

  const specificCalculators = [
    {
      href: '/tools/refrigerator-cost-calculator' as PublicRouteHref,
      guideHref: '/guides/how-much-electricity-does-a-refrigerator-use' as PublicRouteHref,
      title: 'Refrigerator Cost Calculator',
      guideTitle: 'Refrigerator Energy Guide',
      description:
        'Estimate 24/7 continuous plugged-in cost using compressor duty cycle or annual EnergyGuide rating.',
    },
    {
      href: '/tools/clothes-dryer-cost-calculator' as PublicRouteHref,
      guideHref:
        '/guides/how-much-does-it-cost-to-run-an-electric-clothes-dryer' as PublicRouteHref,
      title: 'Clothes Dryer Cost Calculator',
      guideTitle: 'Electric Dryer Guide',
      description:
        'Calculate 240V electric dryer cost per laundry load, weekly spending, and annual consumption.',
    },
    {
      href: '/tools/electric-water-heater-cost-calculator' as PublicRouteHref,
      guideHref: '/guides/how-much-does-it-cost-to-run-an-electric-water-heater' as PublicRouteHref,
      title: 'Electric Water Heater Cost Calculator',
      guideTitle: 'Water Heater Guide',
      description:
        'Estimate electric resistance tank water heating costs using element wattage and active heating hours.',
    },
    {
      href: '/tools/pool-pump-cost-calculator' as PublicRouteHref,
      guideHref: '/guides/how-much-does-it-cost-to-run-a-pool-pump' as PublicRouteHref,
      title: 'Pool Pump Cost Calculator',
      guideTitle: 'Pool Pump Guide',
      description:
        'Calculate daily, monthly, and seasonal pool filtration electricity costs based on motor input wattage.',
    },
    {
      href: '/tools/dehumidifier-cost-calculator' as PublicRouteHref,
      guideHref: '/guides/how-much-does-it-cost-to-run-a-dehumidifier' as PublicRouteHref,
      title: 'Dehumidifier Cost Calculator',
      guideTitle: 'Dehumidifier Guide',
      description:
        'Estimate basement and room dehumidifier operating costs using rated power and humidistat duty cycle.',
    },
  ];

  const generalTools = [
    {
      href: '/tools/appliance-energy-cost-calculator' as PublicRouteHref,
      title: 'General Appliance Energy Cost Calculator',
      description:
        'Estimate energy usage and operating cost for any custom household appliance or electronics device.',
    },
    {
      href: '/tools/ac-cost-calculator' as PublicRouteHref,
      title: 'Air Conditioner Cost Calculator',
      description:
        'Calculate AC electricity usage using cooling capacity (BTU/hr), EER efficiency, and duty cycles.',
    },
    {
      href: '/tools/space-heater-cost-calculator' as PublicRouteHref,
      title: 'Space Heater Cost Calculator',
      description:
        'Estimate electric space heater operating costs based on wattage, quantity, and thermostat runtime.',
    },
    {
      href: '/tools/ev-home-charging-cost-calculator' as PublicRouteHref,
      title: 'EV Home Charging Cost Calculator',
      description:
        'Calculate EV charging session cost, grid losses, and cost per mile based on battery kWh.',
    },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/guides/how-much-electricity-do-household-appliances-use',
    '/guides/how-much-electricity-does-a-refrigerator-use',
    '/guides/how-much-does-it-cost-to-run-an-electric-clothes-dryer',
    '/guides/how-much-does-it-cost-to-run-an-electric-water-heater',
    '/guides/how-much-does-it-cost-to-run-a-pool-pump',
    '/guides/how-much-does-it-cost-to-run-a-dehumidifier',
    '/electricity-bill-analyzer',
    '/electricity-rates',
    '/methodology',
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
          Appliance Energy Consumption & Cost Hub
        </h1>
        <p style={{ fontSize: 16, color: '#595959', maxWidth: 840, lineHeight: 1.6 }}>
          Understanding household appliance electricity consumption requires evaluating electrical
          input wattage, daily operating hours, and duty cycle. Energy Bill Lab provides dedicated
          calculators and source-backed guides for major home appliances.
        </p>
      </header>

      {/* Appliance-Specific Calculators & Guides Section */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1f1f1f', marginBottom: 16 }}>
          Appliance Calculators & In-Depth Guides
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {specificCalculators.map((item) => (
            <div
              key={item.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 20,
                background: '#ffffff',
                border: '1px solid #e8e8e8',
                borderRadius: 10,
              }}
            >
              <div>
                <Link
                  href={item.href}
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: '#176b5b',
                    marginBottom: 6,
                    display: 'block',
                    textDecoration: 'none',
                  }}
                >
                  {item.title}
                </Link>
                <p
                  style={{ fontSize: 14, color: '#595959', margin: '0 0 12px 0', lineHeight: 1.5 }}
                >
                  {item.description}
                </p>
              </div>
              <div
                style={{
                  paddingTop: 8,
                  borderTop: '1px solid #f0f0f0',
                  display: 'flex',
                  gap: 12,
                  fontSize: 13,
                }}
              >
                <Link
                  href={item.href}
                  style={{ color: '#176b5b', fontWeight: 600, textDecoration: 'none' }}
                >
                  Use Calculator →
                </Link>
                <span style={{ color: '#d9d9d9' }}>|</span>
                <Link
                  href={item.guideHref}
                  style={{ color: '#595959', textDecoration: 'underline' }}
                >
                  Read Guide
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* General & High-Load Tools Section */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1f1f1f', marginBottom: 16 }}>
          General & Climate Control Energy Calculators
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {generalTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              style={{
                display: 'block',
                padding: 20,
                background: '#fafafa',
                border: '1px solid #e8e8e8',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              <h3 style={{ fontSize: 17, fontWeight: 600, color: '#1f1f1f', marginBottom: 6 }}>
                {tool.title}
              </h3>
              <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.5 }}>
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Educational Fundamentals Section */}
      <section style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #f0f0f0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
          Core Appliance Energy Fundamentals
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              background: '#ffffff',
              padding: 18,
              borderRadius: 8,
              border: '1px solid #f0f0f0',
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#176b5b', marginBottom: 8 }}>
              1. Electrical Wattage vs Operating Hours
            </h3>
            <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.6, margin: 0 }}>
              Wattage (W) indicates instantaneous electrical power draw. Operating hours define
              duration. Energy consumption (kWh) is the product of power and time divided by 1,000.
            </p>
          </div>

          <div
            style={{
              background: '#ffffff',
              padding: 18,
              borderRadius: 8,
              border: '1px solid #f0f0f0',
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#176b5b', marginBottom: 8 }}>
              2. Understanding Duty Cycles
            </h3>
            <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.6, margin: 0 }}>
              Refrigerators, air conditioners, and dehumidifiers cycle their cooling compressors on
              and off. The duty cycle percentage represents active compressor runtime relative to
              connected hours.
            </p>
          </div>

          <div
            style={{
              background: '#ffffff',
              padding: 18,
              borderRadius: 8,
              border: '1px solid #f0f0f0',
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#176b5b', marginBottom: 8 }}>
              3. Nameplate Rating vs Real Draw
            </h3>
            <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.6, margin: 0 }}>
              An appliance electrical nameplate states maximum peak electrical load for safety
              compliance. Average operational power draw is typically lower than maximum nameplate
              capacity.
            </p>
          </div>

          <div
            style={{
              background: '#ffffff',
              padding: 18,
              borderRadius: 8,
              border: '1px solid #f0f0f0',
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#176b5b', marginBottom: 8 }}>
              4. State Averages vs Utility Tariffs
            </h3>
            <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.6, margin: 0 }}>
              U.S. EIA state electricity averages represent total residential revenue divided by
              total kWh sales. Local utility bills may include tiered rate blocks, delivery fees,
              and fixed monthly meter charges.
            </p>
          </div>
        </div>

        <p style={{ fontSize: 15, color: '#434343', marginTop: 16 }}>
          Explore our in-depth appliance energy guides:{' '}
          <Link href="/guides" style={{ color: '#176b5b', fontWeight: 600 }}>
            View All 10 Home Energy Guides →
          </Link>
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <RelatedLinks links={relatedLinks} />
      </section>
    </PageContainer>
  );
}
