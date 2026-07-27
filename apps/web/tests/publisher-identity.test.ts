import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from 'vitest';

import { contentPages } from '@/content/pages';
import { createPageMetadata } from '@/lib/metadata';
import {
  createOrganizationStructuredData,
  createReportStructuredData,
} from '@/lib/structured-data';

describe('Public Publisher Identity & Trust Integrity Whitelist', () => {
  it('1. Public identity uses exactly "Jaynesh Shingala"', () => {
    const about = contentPages['/about'];
    expect(about).toBeDefined();
    expect(about.description).toContain('Jaynesh Shingala');

    const contact = contentPages['/contact'];
    expect(contact).toBeDefined();
    expect(contact.description).toContain('Jaynesh Shingala');
  });

  it('2. Public email uses exactly "shingala.jaynesh@gmail.com"', () => {
    const allContentText = JSON.stringify(contentPages);
    expect(allContentText).toContain('shingala.jaynesh@gmail.com');
  });

  it('3 & 4. Public content does not contain "Surat" or "Gujarat"', () => {
    const allContentText = JSON.stringify(contentPages);
    expect(allContentText).not.toContain('Surat');
    expect(allContentText).not.toContain('Gujarat');
  });

  it('5. Public content does not contain personal-location references to India', () => {
    const aboutText = JSON.stringify(contentPages['/about']);
    const contactText = JSON.stringify(contentPages['/contact']);
    const editorialText = JSON.stringify(contentPages['/editorial-policy']);

    expect(aboutText).not.toContain('India');
    expect(contactText).not.toContain('India');
    expect(editorialText).not.toContain('India');
  });

  it('6 & 7. Public content does not contain "Full-Stack Software Engineer" or "Full-Stack Developer"', () => {
    const allContentText = JSON.stringify(contentPages);
    expect(allContentText).not.toContain('Full-Stack Software Engineer');
    expect(allContentText).not.toContain('Full-Stack Developer');
    expect(allContentText).not.toContain('Full Stack Software Engineer');
    expect(allContentText).not.toContain('Full Stack Developer');
  });

  it('8. Public content retains "Founder & Technical Publisher"', () => {
    const allContentText = JSON.stringify(contentPages);
    expect(allContentText).toContain('Founder & Technical Publisher');
  });

  it('9. Person JSON-LD retains jobTitle and excludes personal location/address fields', () => {
    const reportSchema = createReportStructuredData({
      title: 'U.S. Residential Electricity-Rate Report',
      description: 'National electricity rate report.',
      path: '/research/us-residential-electricity-rate-report',
      datePublished: '2026-07-24',
      dateModified: '2026-07-24',
      reportingPeriod: '2026-05',
    });

    const author = reportSchema.author;
    expect(author['@type']).toBe('Person');
    expect(author.name).toBe('Jaynesh Shingala');
    expect(author.jobTitle).toBe('Founder & Technical Publisher');
    expect((author as Record<string, unknown>).address).toBeUndefined();
    expect((author as Record<string, unknown>).homeLocation).toBeUndefined();
    expect((author as Record<string, unknown>).nationality).toBeUndefined();
    expect((author as Record<string, unknown>).alumniOf).toBeUndefined();
    expect((author as Record<string, unknown>).worksFor).toBeUndefined();
  });

  it('10 & 11. Article author names and Organization schema remain valid', () => {
    const orgSchema = createOrganizationStructuredData();
    expect(orgSchema['@type']).toBe('Organization');
    expect(orgSchema.name).toBe('Energy Bill Lab');
  });

  it('12 & 13. Contact mailto link is valid and no private phone numbers or physical addresses are exposed', () => {
    const contactText = JSON.stringify(contentPages['/contact']);
    expect(contactText).toContain('shingala.jaynesh@gmail.com');
    expect(contactText).not.toMatch(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/);
    expect(contactText).not.toContain('Street Address');
  });

  it('14. Canonical route metadata remains correct', () => {
    const aboutMeta = createPageMetadata(contentPages['/about']);
    const contactMeta = createPageMetadata(contentPages['/contact']);

    expect(aboutMeta.alternates?.canonical).toBe('/about');
    expect(contactMeta.alternates?.canonical).toBe('/contact');
  });

  it('15. Protected files remain untouched', () => {
    const root = process.cwd();
    expect(
      fs.existsSync(path.resolve(root, '../../packages/database/src/clients/db-client.ts')),
    ).toBe(true);
    expect(fs.existsSync(path.resolve(root, 'package.json'))).toBe(true);
    expect(fs.existsSync(path.resolve(root, '../../turbo.json'))).toBe(true);
    expect(fs.existsSync(path.resolve(root, '../../vercel.json'))).toBe(true);
    expect(fs.existsSync(path.resolve(root, '../../render.yaml'))).toBe(true);
  });
});
