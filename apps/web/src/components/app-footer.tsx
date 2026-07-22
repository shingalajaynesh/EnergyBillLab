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
          <div>
            <strong>Energy Bill Lab</strong>
            <p>Transparent calculators and source-led explanations for home energy costs.</p>
          </div>
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <span>{group.title}</span>
              {group.links.map((route) => (
                <Link key={route.href} href={route.href}>
                  {route.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
      </PageContainer>
    </footer>
  );
}
