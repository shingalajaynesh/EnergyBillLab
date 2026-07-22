import type { Metadata } from 'next';

import { HubPage } from '@/components/hub-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Guides',
  description:
    'Planned practical guides for understanding high electric bills and home energy costs.',
  path: '/guides',
});

export default function GuidesPage() {
  return (
    <HubPage
      title="Guides"
      description="Guides will be published when they provide original, reviewed, problem-solving content."
      emptyMessage="No guides are published yet. Energy Bill Lab will avoid generic filler and mass-produced SEO pages."
      related={['/methodology', '/data-sources', '/editorial-policy']}
    />
  );
}
