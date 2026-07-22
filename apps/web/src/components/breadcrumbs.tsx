import Link from 'next/link';

import type { PublicRouteHref } from '@/lib/routes';
import { getRouteByHref } from '@/lib/routes';
import { getSiteUrl } from '@/lib/site';
import { serializeStructuredData } from '@/lib/structured-data';

import styles from './breadcrumbs.module.css';

type BreadcrumbItem = {
  href: PublicRouteHref;
  label?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const resolvedItems = items.map((item) => ({
    href: item.href,
    label: item.label ?? getRouteByHref(item.href)?.label ?? item.href,
  }));

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: resolvedItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: getSiteUrl(item.href),
    })),
  };

  return (
    <>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <ol>
          {resolvedItems.map((item, index) => (
            <li key={item.href}>
              {index === resolvedItems.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
      />
    </>
  );
}
