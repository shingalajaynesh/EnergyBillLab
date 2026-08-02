import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import { GasFurnaceCalculatorIsland } from '@/features/gas-furnace-calculator/components/gas-furnace-calculator-island';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import { getNaturalGasHubData } from '@/lib/server/get-natural-gas-data';
import {
  createBreadcrumbStructuredData,
  createOrganizationStructuredData,
  createWebsiteStructuredData,
  serializeStructuredData,
} from '@/lib/structured-data';

export const metadata: Metadata = createPageMetadata({
  title: 'Gas Furnace Cost Calculator',
  description:
    'Calculate gas furnace operating costs based on input Btu/hr rating or heating output capacity, AFUE seasonal efficiency, burner runtime hours, and therm gas rates.',
  path: '/tools/gas-furnace-cost-calculator',
});

export default async function GasFurnaceCostCalculatorPage() {
  const hubData = await getNaturalGasHubData();

  const benchmarkProps = {
    reportingPeriod: hubData.latestSourceMonthFormatted,
    estimatedPricePerTherm: hubData.latestNationalRate?.priceDollarsPerTherm ?? 19.83 / 10.36,
    sourceLabel:
      hubData.latestNationalRate?.source === 'EIA'
        ? 'U.S. EIA Form EIA-857'
        : 'U.S. EIA Delivered Price',
  };

  const breadcrumbs = [
    { href: '/' as const, label: 'Home' },
    { href: '/tools' as const, label: 'Tools' },
    { href: '/tools/gas-furnace-cost-calculator' as const, label: 'Gas Furnace Cost Calculator' },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/natural-gas-rates',
    '/tools/natural-gas-bill-calculator',
    '/tools/space-heater-cost-calculator',
    '/methodology',
    '/data-sources',
  ];

  const websiteSchema = createWebsiteStructuredData();
  const orgSchema = createOrganizationStructuredData();
  const breadcrumbSchema = createBreadcrumbStructuredData([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Gas Furnace Cost Calculator', path: '/tools/gas-furnace-cost-calculator' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(breadcrumbSchema) }}
      />

      <PageContainer>
        <Breadcrumbs items={breadcrumbs} />

        <PageHeader
          eyebrow="Household Heating Tool"
          title="Gas Furnace Operating Cost Calculator"
          description="Calculate residential gas furnace heating costs by input capacity (Btu/hr) or heating output rating with AFUE efficiency percentage, runtime hours, and therm gas pricing."
        />

        <GasFurnaceCalculatorIsland initialBenchmark={benchmarkProps} />

        <div style={{ marginTop: 32 }}>
          <DataSourceNote>
            Gas furnace operating costs calculate burner natural gas consumption. Furnace blower
            motor electricity usage (kWh) and utility fixed monthly charges are excluded.
          </DataSourceNote>

          <section style={{ marginTop: 24 }}>
            <RelatedLinks links={relatedLinks} />
          </section>
        </div>
      </PageContainer>
    </>
  );
}
