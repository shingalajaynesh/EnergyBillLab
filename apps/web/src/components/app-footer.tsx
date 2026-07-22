import Link from 'next/link';

import styles from './app-footer.module.css';
import { PageContainer } from './page-container';

const footerGroups = [
  {
    title: 'Tools',
    links: [
      ['Bill Analyzer', '/tools/electricity-bill-analyzer'],
      ['Appliance Calculator', '/tools/appliance-energy-cost-calculator'],
      ['AC Calculator', '/tools/ac-cost-calculator'],
    ],
  },
  {
    title: 'Research',
    links: [
      ['Electricity Rates', '/electricity-rates'],
      ['Data Sources', '/data-sources'],
      ['Methodology', '/methodology'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Contact', '/contact'],
      ['Accessibility', '/accessibility'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Privacy', '/privacy'],
      ['Terms', '/terms'],
      ['Disclaimer', '/disclaimer'],
    ],
  },
] satisfies Array<{
  title: string;
  links: Array<[label: string, href: string]>;
}>;

export function AppFooter() {
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
              {group.links.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
      </PageContainer>
    </footer>
  );
}
