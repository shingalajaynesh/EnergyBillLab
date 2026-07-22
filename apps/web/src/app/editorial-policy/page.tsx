import type { Metadata } from 'next';

import { ContentPageView } from '@/components/content-page';
import { contentPages } from '@/content/pages';
import { createPageMetadata } from '@/lib/metadata';

const page = contentPages['/editorial-policy'];

export const metadata: Metadata = createPageMetadata(page);

export default function EditorialPolicyPage() {
  return <ContentPageView page={page} />;
}
