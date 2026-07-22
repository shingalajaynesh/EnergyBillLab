import Link from 'next/link';

import { EmptyState } from '@/components/empty-state';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import type { PublicRouteHref } from '@/lib/routes';
import { getRouteByHref, isPublicRoute } from '@/lib/routes';

import styles from './hub-page.module.css';

type HubPageProps = {
  description: string;
  emptyMessage: string;
  related: PublicRouteHref[];
  title: string;
};

export function HubPage({ description, emptyMessage, related, title }: HubPageProps) {
  const links = related.map((href) => getRouteByHref(href)).filter(isPublicRoute);

  return (
    <PageContainer>
      <PageHeader eyebrow="Public route" title={title} description={description} />
      <EmptyState title="No published entries yet" message={emptyMessage} />
      <section className={styles.related} aria-labelledby="available-pages">
        <h2 id="available-pages">Available pages</h2>
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
