import Link from 'next/link';

import { getFooterGroups } from '@/lib/routes';

import styles from './app-footer.module.css';
import { PageContainer } from './page-container';

export function AppFooter() {
  const footerGroups = getFooterGroups();

  return (
    <footer className={styles.footer}>
      <PageContainer>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <strong className={styles.brandTitle}>Energy Bill Lab</strong>
            <p className={styles.brandDescription}>
              Transparent calculators and source-led explanations for U.S. home energy costs.
            </p>
            <p className={styles.independenceNote}>
              Energy Bill Lab is an independent informational service and is not a utility provider
              or government agency.
            </p>
          </div>
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title} className={styles.groupNav}>
              <span className={styles.groupTitle}>{group.title}</span>
              {group.links.map((route) => (
                <Link key={route.href} href={route.href} className={styles.groupLink}>
                  {route.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className={styles.bottomBar}>
          <span>&copy; {new Date().getFullYear()} Energy Bill Lab. All rights reserved.</span>
        </div>
      </PageContainer>
    </footer>
  );
}
