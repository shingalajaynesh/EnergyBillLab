import Link from 'next/link';

import type { PublicRouteHref } from '@/lib/routes';
import { getRouteByHref, isPublicRoute } from '@/lib/routes';

import styles from './related-links.module.css';

export function RelatedLinks({ links }: { links: PublicRouteHref[] }) {
  const resolvedLinks = links.map((href) => getRouteByHref(href)).filter(isPublicRoute);

  if (resolvedLinks.length === 0) {
    return null;
  }

  return (
    <nav className={styles.related} aria-label="Related pages">
      <h2>Related Pages</h2>
      <ul>
        {resolvedLinks.map((route) => (
          <li key={route.href}>
            <Link href={route.href}>{route.label}</Link>
            <span>{route.description}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
