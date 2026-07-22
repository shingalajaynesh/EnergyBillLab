import type { Metadata } from 'next';

import { ContentPageView } from '@/components/content-page';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { contentPages } from '@/content/pages';
import { CONTACT_EMAIL } from '@/lib/site';
import { createPageMetadata } from '@/lib/metadata';

import styles from './page.module.css';

const page = contentPages['/contact'] ?? {
  title: 'Contact Energy Bill Lab',
  description: 'How to contact Energy Bill Lab.',
  path: '/contact' as const,
  updatedAt: '2026-07-22',
  related: ['/about', '/accessibility', '/privacy'],
  sections: [],
};

export const metadata: Metadata = createPageMetadata(page);

export default function ContactPage() {
  if (!CONTACT_EMAIL) {
    return (
      <PageContainer narrow>
        <PageHeader
          eyebrow="Contact"
          title="Contact Energy Bill Lab"
          description="A public contact channel has not been configured yet."
        />
        <section className={styles.contactNotice}>
          <h2>Configuration required</h2>
          <p>
            Set <code>NEXT_PUBLIC_CONTACT_EMAIL</code> before publishing contact intake. Energy Bill
            Lab will not invent an address or phone number.
          </p>
        </section>
      </PageContainer>
    );
  }

  return (
    <>
      <ContentPageView page={page} />
      <PageContainer narrow>
        <section className={styles.contactNotice}>
          <h2>Email</h2>
          <p>
            Use <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> for public site feedback.
          </p>
        </section>
      </PageContainer>
    </>
  );
}
