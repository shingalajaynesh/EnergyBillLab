import { describe, expect, it } from 'vitest';

import { createPageMetadata } from '../src/lib/metadata';
import {
  createOrganizationStructuredData,
  createWebsiteStructuredData,
  serializeStructuredData,
} from '../src/lib/structured-data';

describe('SEO helpers', () => {
  it('creates canonical page metadata', () => {
    const metadata = createPageMetadata({
      title: 'Methodology',
      description: 'How Energy Bill Lab explains estimates.',
      path: '/methodology',
    });

    expect(metadata.alternates?.canonical).toBe('/methodology');
    expect(metadata.openGraph?.url).toContain('/methodology');
    expect(metadata.twitter).toEqual(
      expect.objectContaining({
        card: 'summary',
      }),
    );
  });

  it('serializes truthful site structured data without unsafe angle brackets', () => {
    const json = serializeStructuredData([
      createWebsiteStructuredData(),
      createOrganizationStructuredData(),
      { name: '<script>' },
    ]);

    expect(json).toContain('"@type":"WebSite"');
    expect(json).toContain('"@type":"Organization"');
    expect(json).not.toContain('<script>');
    expect(json).toContain('\\u003cscript>');
  });
});
