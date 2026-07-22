import type { Metadata } from 'next';

import { HubPage } from '@/components/hub-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Comparisons',
  description:
    'Planned comparison pages for energy equipment, rates, and household cost scenarios.',
  path: '/comparisons',
});

export default function ComparisonsPage() {
  return (
    <HubPage
      title="Comparisons"
      description="Comparison pages will be published only when there is enough source-backed context to make them useful."
      emptyMessage="No comparison pages are published yet. This prevents thin pages that simply restate generic advice."
      related={['/tools', '/guides', '/methodology']}
    />
  );
}
