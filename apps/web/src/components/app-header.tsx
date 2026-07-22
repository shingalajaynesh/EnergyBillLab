'use client';

import { MenuOutlined } from '@ant-design/icons';
import Button from 'antd/es/button';
import Drawer from 'antd/es/drawer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { primaryNavigation } from '@/lib/routes';

import styles from './app-header.module.css';
import { PageContainer } from './page-container';

export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <PageContainer>
        <div className={styles.inner}>
          <Link className={styles.brand} href="/" aria-label="Energy Bill Lab home">
            Energy Bill Lab
          </Link>

          <nav aria-label="Primary navigation" className={styles.nav}>
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button
            className={styles.menuButton}
            aria-label="Open navigation menu"
            icon={<MenuOutlined />}
            onClick={() => setIsOpen(true)}
          />
        </div>
      </PageContainer>

      <Drawer
        title="Energy Bill Lab"
        placement="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        width={300}
      >
        <nav aria-label="Mobile navigation" className={styles.mobileNav}>
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Drawer>
    </header>
  );
}
