import type { ReactNode } from 'react';

import styles from './page-container.module.css';

export function PageContainer({
  children,
  narrow = false,
}: {
  children: ReactNode;
  narrow?: boolean;
}) {
  const className = narrow ? `${styles.container} ${styles.narrow}` : styles.container;

  return <div className={className}>{children}</div>;
}
