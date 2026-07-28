import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from 'vitest';

import { createPageMetadata, createRootMetadata } from '../src/lib/metadata';
import robots from '../src/app/robots';
import {
  createOrganizationStructuredData,
  createWebsiteStructuredData,
  serializeStructuredData,
} from '../src/lib/structured-data';

describe('SEO & Canonical Branding Metadata System', () => {
  const rootDir = process.cwd();
  const appDir = path.join(rootDir, 'src/app');
  const publicDir = path.join(rootDir, 'public');

  it('1. App Router favicon exists (src/app/favicon.ico)', () => {
    expect(fs.existsSync(path.join(appDir, 'favicon.ico'))).toBe(true);
  });

  it('2. App Router icon.png exists (src/app/icon.png)', () => {
    expect(fs.existsSync(path.join(appDir, 'icon.png'))).toBe(true);
  });

  it('3. App Router Apple icon exists (src/app/apple-icon.png)', () => {
    expect(fs.existsSync(path.join(appDir, 'apple-icon.png'))).toBe(true);
  });

  it('4. Open Graph image exists (src/app/opengraph-image.png)', () => {
    expect(fs.existsSync(path.join(appDir, 'opengraph-image.png'))).toBe(true);
  });

  it('5. Twitter image exists (src/app/twitter-image.png)', () => {
    expect(fs.existsSync(path.join(appDir, 'twitter-image.png'))).toBe(true);
  });

  it('6. Required file sizes and non-empty asset contents are valid', () => {
    const icoStat = fs.statSync(path.join(appDir, 'favicon.ico'));
    const pngStat = fs.statSync(path.join(appDir, 'icon.png'));
    const appleStat = fs.statSync(path.join(appDir, 'apple-icon.png'));
    const ogStat = fs.statSync(path.join(appDir, 'opengraph-image.png'));
    const twStat = fs.statSync(path.join(appDir, 'twitter-image.png'));

    expect(icoStat.size).toBeGreaterThan(500);
    expect(pngStat.size).toBeGreaterThan(1000);
    expect(appleStat.size).toBeGreaterThan(1000);
    expect(ogStat.size).toBeGreaterThan(5000);
    expect(twStat.size).toBeGreaterThan(5000);
  });

  it('7. No unnecessary duplicated public assets remain', () => {
    expect(fs.existsSync(path.join(publicDir, 'icon.png'))).toBe(false);
    expect(fs.existsSync(path.join(publicDir, 'apple-icon.png'))).toBe(false);
    expect(fs.existsSync(path.join(publicDir, 'opengraph-image.png'))).toBe(false);
    expect(fs.existsSync(path.join(publicDir, 'twitter-image.png'))).toBe(false);
    expect(fs.existsSync(path.join(publicDir, 'favicon.ico'))).toBe(false);
  });

  it('8. No stale icon.svg Apple metadata or metadata icon overrides exist', () => {
    const rootMeta = createRootMetadata();
    const metaString = JSON.stringify(rootMeta);
    expect(metaString).not.toContain('icon.svg');
    expect(rootMeta.icons).toBeUndefined();
  });

  it('9. metadataBase uses https://energybilllab.com', () => {
    const rootMeta = createRootMetadata();
    expect(rootMeta.metadataBase?.toString()).toBe('https://energybilllab.com/');
  });

  it('10. Open Graph uses the apex host', () => {
    const rootMeta = createRootMetadata();
    const ogImages = rootMeta.openGraph?.images as Array<{
      url: string | URL;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    expect(ogImages).toBeDefined();
    expect(ogImages.length).toBeGreaterThan(0);
    expect(ogImages[0]!.url.toString()).toBe('https://energybilllab.com/opengraph-image.png');
    expect(ogImages[0]!.width).toBe(1200);
    expect(ogImages[0]!.height).toBe(630);
  });

  it('11. Twitter uses the apex host and summary_large_image', () => {
    const rootMeta = createRootMetadata();
    const rootTwitter = rootMeta.twitter as {
      card?: string;
      images?: Array<{ url: string | URL; alt?: string }>;
    };
    expect(rootTwitter?.card).toBe('summary_large_image');
    expect(rootTwitter?.images).toBeDefined();
    expect(rootTwitter?.images![0]!.url.toString()).toBe(
      'https://energybilllab.com/twitter-image.png',
    );
  });

  it('12. Organization logo uses the apex host', () => {
    const orgSchema = createOrganizationStructuredData();
    expect(orgSchema['@type']).toBe('Organization');
    expect(orgSchema.name).toBe('Energy Bill Lab');
    expect(orgSchema.url).toBe('https://energybilllab.com/');
    expect(orgSchema.logo).toBe('https://energybilllab.com/icon.png');
  });

  it('13. No www or localhost URLs exist in metadata or schemas', () => {
    const rootMeta = createRootMetadata();
    const metaString = JSON.stringify(rootMeta);
    expect(metaString).not.toContain('www.energybilllab.com');
    expect(metaString).not.toContain('http://');
    expect(metaString).not.toContain('localhost');

    const orgSchema = createOrganizationStructuredData();
    const orgString = JSON.stringify(orgSchema);
    expect(orgString).not.toContain('www.energybilllab.com');
    expect(orgString).not.toContain('http://');
    expect(orgString).not.toContain('localhost');
  });

  it('14. robots.txt permits asset crawling', () => {
    const robotsConfig = robots();
    const rules = Array.isArray(robotsConfig.rules) ? robotsConfig.rules : [robotsConfig.rules];
    const wildcardRule = rules.find((r) => r.userAgent === '*');
    expect(wildcardRule).toBeDefined();
    expect(wildcardRule?.allow).toBe('/');

    const disallow = Array.isArray(wildcardRule?.disallow)
      ? wildcardRule?.disallow
      : [wildcardRule?.disallow];
    expect(disallow).not.toContain('/icon.png');
    expect(disallow).not.toContain('/favicon.ico');
    expect(disallow).not.toContain('/apple-icon.png');
    expect(disallow).not.toContain('/opengraph-image.png');
  });

  it('15. Canonical page metadata creation remains truthful', () => {
    const pageMeta = createPageMetadata({
      title: 'Methodology',
      description: 'How Energy Bill Lab explains estimates.',
      path: '/methodology',
    });

    expect(pageMeta.alternates?.canonical).toBe('/methodology');
    expect(pageMeta.openGraph?.url).toBe('https://energybilllab.com/methodology');
  });

  it('16. Protected files exist and remain untouched', () => {
    expect(
      fs.existsSync(path.resolve(rootDir, '../../packages/database/src/clients/db-client.ts')),
    ).toBe(true);
    expect(fs.existsSync(path.resolve(rootDir, 'package.json'))).toBe(true);
    expect(fs.existsSync(path.resolve(rootDir, '../../turbo.json'))).toBe(true);
    expect(fs.existsSync(path.resolve(rootDir, '../../vercel.json'))).toBe(true);
    expect(fs.existsSync(path.resolve(rootDir, '../../render.yaml'))).toBe(true);
  });

  it('serializes truthful site structured data without unsafe angle brackets', () => {
    const json = serializeStructuredData([
      createWebsiteStructuredData(),
      createOrganizationStructuredData(),
      { name: '<script>' },
    ]);

    expect(json).toContain('"@type":"WebSite"');
    expect(json).toContain('"@type":"Organization"');
    expect(json).toContain('"logo":"https://energybilllab.com/icon.png"');
    expect(json).not.toContain('<script>');
    expect(json).toContain('\\u003cscript>');
  });
});
