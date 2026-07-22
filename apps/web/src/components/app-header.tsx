'use client';

import { MenuOutlined } from '@ant-design/icons';
import Button from 'antd/es/button';
import Drawer from 'antd/es/drawer';
import Link from 'next/link';
import { useState } from 'react';

import styles from './app-header.module.css';
import { PageContainer } from './page-container';

const navigationItems = [
  { href: '/tools/electricity-bill-analyzer', label: 'Bill Analyzer' },
  { href: '/tools', label: 'Calculators' },
  { href: '/electricity-rates', label: 'Rates' },
  { href: '/guides', label: 'Guides' },
  { href: '/about', label: 'About' },
];

export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <PageContainer>
        <div className={styles.inner}>
          <Link className={styles.brand} href="/" aria-label="Energy Bill Lab home">
            Energy Bill Lab
          </Link>

          <nav aria-label="Primary navigation" className={styles.nav}>
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
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
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </Drawer>
    </header>
  );
}
