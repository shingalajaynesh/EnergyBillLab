import Link from 'next/link';
import type { ReactNode } from 'react';

import styles from './data-source-note.module.css';

export function DataSourceNote({ children }: { children?: ReactNode }) {
  return (
    <aside className={styles.note} aria-label="Data source note">
      <strong>Source note</strong>
      <p>
        {children ??
          'Published electricity rates are historical averages. Use the rate on your bill for a household estimate.'}
      </p>
      <Link href="/data-sources">Review data-source approach</Link>
    </aside>
  );
}
