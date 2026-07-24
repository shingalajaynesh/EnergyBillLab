import { describe, expect, it } from 'vitest';

import { contentPages } from '@/content/pages';
import { createPageMetadata } from '@/lib/metadata';

describe('Public Publisher Identity & Trust Integrity', () => {
  it('identifies Jaynesh Shingala as Founder & Technical Publisher on About page', () => {
    const about = contentPages['/about'];
    expect(about).toBeDefined();
    expect(about.description).toContain('Jaynesh Shingala');
    expect(about.description).toContain('Full-Stack Software Engineer');

    const sectionsText = about.sections.flatMap((s) => s.paragraphs).join(' ');
    expect(sectionsText).toContain('Jaynesh Shingala');
    expect(sectionsText).toContain('Full-Stack Software Engineer');
    expect(sectionsText).toContain('Surat, Gujarat, India');
    expect(sectionsText).toContain('shingala.jaynesh@gmail.com');
  });

  it('provides public publisher contact email on Contact page', () => {
    const contact = contentPages['/contact'];
    expect(contact).toBeDefined();
    expect(contact.description).toContain('Jaynesh Shingala');

    const sectionsText = contact.sections.flatMap((s) => s.paragraphs).join(' ');
    expect(sectionsText).toContain('Jaynesh Shingala');
    expect(sectionsText).toContain('Founder & Technical Publisher');
    expect(sectionsText).toContain('shingala.jaynesh@gmail.com');
  });

  it('does not expose private contact information (phone, street address, birth date)', () => {
    const allContentText = JSON.stringify(contentPages);
    expect(allContentText).not.toMatch(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/); // No phone numbers
    expect(allContentText).not.toContain('Street Address');
    expect(allContentText).not.toContain('Date of Birth');
  });

  it('generates unique metadata and correct canonical paths for About and Contact pages', () => {
    const aboutMeta = createPageMetadata(contentPages['/about']);
    const contactMeta = createPageMetadata(contentPages['/contact']);

    expect(aboutMeta.title).toBe('About Energy Bill Lab');
    expect(contactMeta.title).toBe('Contact Energy Bill Lab');

    expect(aboutMeta.alternates?.canonical).toBe('/about');
    expect(contactMeta.alternates?.canonical).toBe('/contact');
    expect(aboutMeta.title).not.toEqual(contactMeta.title);
  });
});
