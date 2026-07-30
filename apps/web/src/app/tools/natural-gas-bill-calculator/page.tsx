import type { Metadata } from 'next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { DataSourceNote } from '@/components/data-source-note';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import { NaturalGasBillCalculatorIsland } from '@/features/natural-gas-bill-calculator/components/natural-gas-bill-calculator-island';
import { createPageMetadata } from '@/lib/metadata';
import type { PublicRouteHref } from '@/lib/routes';
import {
  createBreadcrumbStructuredData,
  createOrganizationStructuredData,
  createWebsiteStructuredData,
  serializeStructuredData,
} from '@/lib/structured-data';

export const metadata: Metadata = createPageMetadata({
  title: 'Natural Gas Bill Calculator',
  description:
    'Calculate your monthly natural gas bill spending, usage charges in therms or Mcf, fixed customer account fees, and all-in effective cost per unit.',
  path: '/tools/natural-gas-bill-calculator',
});

export default function NaturalGasBillCalculatorPage() {
  const breadcrumbs = [
    { href: '/' as const, label: 'Home' },
    { href: '/tools' as const, label: 'Tools' },
    { href: '/tools/natural-gas-bill-calculator' as const, label: 'Natural Gas Bill Calculator' },
  ];

  const relatedLinks: PublicRouteHref[] = [
    '/natural-gas-rates',
    '/tools/gas-furnace-cost-calculator',
    '/electricity-bill-analyzer',
    '/methodology',
    '/data-sources',
  ];

  const websiteSchema = createWebsiteStructuredData();
  const orgSchema = createOrganizationStructuredData();
  const breadcrumbSchema = createBreadcrumbStructuredData([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Natural Gas Bill Calculator', path: '/tools/natural-gas-bill-calculator' },
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
          eyebrow="Household Energy Tool"
          title="Natural Gas Bill Calculator"
          description="Estimate your monthly natural gas bill by calculating volumetric usage charges in therms or Mcf, adding fixed account fees, and analyzing all-in cost per unit."
        />

        <NaturalGasBillCalculatorIsland />

        <div style={{ marginTop: 32 }}>
          <DataSourceNote>
            Gas usage formulas calculate volumetric charges. Actual utility statements include local
            distribution tariffs, franchise fees, and weather normalization riders.
          </DataSourceNote>

          <section style={{ marginTop: 24 }}>
            <RelatedLinks links={relatedLinks} />
          </section>
        </div>
      </PageContainer>
    </>
  );
}
