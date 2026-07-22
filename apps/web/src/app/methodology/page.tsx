import type { Metadata } from 'next';

import { ContentPageView } from '@/components/content-page';
import { contentPages } from '@/content/pages';
import { createPageMetadata } from '@/lib/metadata';

const page = contentPages['/methodology'];

export const metadata: Metadata = createPageMetadata(page);

export default function MethodologyPage() {
  return <ContentPageView page={page} showSourceNote />;
}
