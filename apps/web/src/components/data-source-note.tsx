import Link from 'next/link';
import type { ReactNode } from 'react';

import styles from './data-source-note.module.css';

export function DataSourceNote({ children }: { children?: ReactNode }) {
  return (
    <aside className={styles.note} aria-label="Data source note">
      <strong>Source note</strong>
      <p>
        {children ??
          'Published rate and appliance defaults will identify their source, unit, scope, and data date. This release does not include live rate data.'}
      </p>
      <Link href="/data-sources">Review data-source approach</Link>
    </aside>
  );
}
