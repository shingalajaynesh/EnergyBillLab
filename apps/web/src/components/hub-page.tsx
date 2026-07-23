import Link from 'next/link';

import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import type { PublicRouteHref } from '@/lib/routes';
import { getRouteByHref, isPublicRoute } from '@/lib/routes';

import styles from './hub-page.module.css';

type HubPageProps = {
  description: string;
  eyebrow?: string;
  introText?: string;
  related: PublicRouteHref[];
  title: string;
};

export function HubPage({
  description,
  eyebrow = 'Resource Center',
  introText,
  related,
  title,
}: HubPageProps) {
  const links = related.map((href) => getRouteByHref(href)).filter(isPublicRoute);

  return (
    <PageContainer>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      {introText ? (
        <section className={styles.introSection}>
          <p>{introText}</p>
        </section>
      ) : null}
      <section className={styles.related} aria-labelledby="available-pages">
        <h2 id="available-pages">Featured Tools & Research</h2>
        <div className={styles.grid}>
          {links.map((route) => (
            <Link key={route.href} className={styles.link} href={route.href}>
              <span>{route.label}</span>
              <small>{route.description}</small>
            </Link>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
