'use client';

import { DownOutlined, MenuOutlined, ThunderboltOutlined } from '@ant-design/icons';
import Drawer from 'antd/es/drawer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import styles from './app-header.module.css';
import { PageContainer } from './page-container';

type DropdownKey = 'rates' | 'calculators' | 'research' | null;

export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on Escape key press or click outside
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown and drawer when pathname changes
  useEffect(() => {
    setOpenDropdown(null);
    setIsOpen(false);
  }, [pathname]);

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const isRatesActive =
    pathname === '/electricity-rates' ||
    pathname === '/natural-gas-rates' ||
    pathname.startsWith('/electricity-rates/');

  const isCalculatorsActive =
    pathname === '/tools' ||
    pathname === '/electricity-bill-analyzer' ||
    pathname.startsWith('/tools/');

  const isResearchActive =
    pathname === '/research' ||
    pathname.startsWith('/research/') ||
    pathname === '/comparisons' ||
    pathname === '/data-sources' ||
    pathname === '/methodology';

  return (
    <header className={styles.header}>
      <PageContainer>
        <div className={styles.inner}>
          {/* Logo */}
          <Link className={styles.brand} href="/" aria-label="Energy Bill Lab home">
            <span className={styles.brandMark} aria-hidden="true">
              <ThunderboltOutlined />
            </span>
            <span className={styles.brandText}>Energy Bill Lab</span>
          </Link>

          {/* Grouped Desktop Navigation */}
          <nav aria-label="Primary navigation" className={styles.nav} ref={navRef}>
            {/* Rates Dropdown */}
            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                className={`${styles.navDropdownTrigger} ${isRatesActive ? styles.activeNav : ''}`}
                aria-expanded={openDropdown === 'rates'}
                aria-haspopup="true"
                aria-controls="rates-dropdown-menu"
                onClick={() => toggleDropdown('rates')}
              >
                Rates <DownOutlined className={styles.dropdownIcon} />
              </button>

              {openDropdown === 'rates' && (
                <div id="rates-dropdown-menu" className={styles.dropdownMenu} role="menu">
                  <Link
                    href="/electricity-rates"
                    className={styles.dropdownItem}
                    role="menuitem"
                    aria-current={pathname === '/electricity-rates' ? 'page' : undefined}
                    onClick={() => setOpenDropdown(null)}
                  >
                    Electricity Rates
                  </Link>
                  <Link
                    href="/natural-gas-rates"
                    className={styles.dropdownItem}
                    role="menuitem"
                    aria-current={pathname === '/natural-gas-rates' ? 'page' : undefined}
                    onClick={() => setOpenDropdown(null)}
                  >
                    Natural Gas Rates
                  </Link>
                </div>
              )}
            </div>

            {/* Calculators Dropdown */}
            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                className={`${styles.navDropdownTrigger} ${
                  isCalculatorsActive ? styles.activeNav : ''
                }`}
                aria-expanded={openDropdown === 'calculators'}
                aria-haspopup="true"
                aria-controls="calculators-dropdown-menu"
                onClick={() => toggleDropdown('calculators')}
              >
                Calculators <DownOutlined className={styles.dropdownIcon} />
              </button>

              {openDropdown === 'calculators' && (
                <div id="calculators-dropdown-menu" className={styles.dropdownMenu} role="menu">
                  <Link
                    href="/electricity-bill-analyzer"
                    className={styles.dropdownItem}
                    role="menuitem"
                    aria-current={pathname === '/electricity-bill-analyzer' ? 'page' : undefined}
                    onClick={() => setOpenDropdown(null)}
                  >
                    Electricity Bill Calculator
                  </Link>
                  <Link
                    href="/tools/appliance-energy-cost-calculator"
                    className={styles.dropdownItem}
                    role="menuitem"
                    aria-current={
                      pathname === '/tools/appliance-energy-cost-calculator' ? 'page' : undefined
                    }
                    onClick={() => setOpenDropdown(null)}
                  >
                    Appliance Energy Cost Calculator
                  </Link>
                  <Link
                    href="/tools/natural-gas-bill-calculator"
                    className={styles.dropdownItem}
                    role="menuitem"
                    aria-current={
                      pathname === '/tools/natural-gas-bill-calculator' ? 'page' : undefined
                    }
                    onClick={() => setOpenDropdown(null)}
                  >
                    Natural Gas Bill Calculator
                  </Link>
                  <Link
                    href="/tools/gas-furnace-cost-calculator"
                    className={styles.dropdownItem}
                    role="menuitem"
                    aria-current={
                      pathname === '/tools/gas-furnace-cost-calculator' ? 'page' : undefined
                    }
                    onClick={() => setOpenDropdown(null)}
                  >
                    Gas Furnace Operating Cost Calculator
                  </Link>
                  <div className={styles.dropdownDivider} />
                  <Link
                    href="/tools"
                    className={styles.dropdownItemBold}
                    role="menuitem"
                    aria-current={pathname === '/tools' ? 'page' : undefined}
                    onClick={() => setOpenDropdown(null)}
                  >
                    View All Tools →
                  </Link>
                </div>
              )}
            </div>

            {/* Appliances Link */}
            <Link
              href="/appliances"
              className={styles.navLink}
              aria-current={pathname === '/appliances' ? 'page' : undefined}
            >
              Appliances
            </Link>

            {/* Guides Link */}
            <Link
              href="/guides"
              className={styles.navLink}
              aria-current={pathname === '/guides' ? 'page' : undefined}
            >
              Guides
            </Link>

            {/* Insights Link */}
            <Link
              href="/insights"
              className={styles.navLink}
              aria-current={pathname === '/insights' ? 'page' : undefined}
            >
              Insights
            </Link>

            {/* Research Dropdown */}
            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                className={`${styles.navDropdownTrigger} ${
                  isResearchActive ? styles.activeNav : ''
                }`}
                aria-expanded={openDropdown === 'research'}
                aria-haspopup="true"
                aria-controls="research-dropdown-menu"
                onClick={() => toggleDropdown('research')}
              >
                Research <DownOutlined className={styles.dropdownIcon} />
              </button>

              {openDropdown === 'research' && (
                <div id="research-dropdown-menu" className={styles.dropdownMenu} role="menu">
                  <Link
                    href="/research/us-residential-electricity-rate-report"
                    className={styles.dropdownItem}
                    role="menuitem"
                    aria-current={
                      pathname === '/research/us-residential-electricity-rate-report'
                        ? 'page'
                        : undefined
                    }
                    onClick={() => setOpenDropdown(null)}
                  >
                    U.S. Electricity Rate Report
                  </Link>
                  <Link
                    href="/comparisons"
                    className={styles.dropdownItem}
                    role="menuitem"
                    aria-current={pathname === '/comparisons' ? 'page' : undefined}
                    onClick={() => setOpenDropdown(null)}
                  >
                    Comparisons
                  </Link>
                  <Link
                    href="/data-sources"
                    className={styles.dropdownItem}
                    role="menuitem"
                    aria-current={pathname === '/data-sources' ? 'page' : undefined}
                    onClick={() => setOpenDropdown(null)}
                  >
                    Data Sources
                  </Link>
                  <Link
                    href="/methodology"
                    className={styles.dropdownItem}
                    role="menuitem"
                    aria-current={pathname === '/methodology' ? 'page' : undefined}
                    onClick={() => setOpenDropdown(null)}
                  >
                    Methodology
                  </Link>
                </div>
              )}
            </div>

            {/* About Link */}
            <Link
              href="/about"
              className={styles.navLink}
              aria-current={pathname === '/about' ? 'page' : undefined}
            >
              About
            </Link>
          </nav>

          {/* Mobile Navigation Hamburger Button */}
          <button
            type="button"
            className={styles.menuButton}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-drawer"
            onClick={() => setIsOpen(true)}
          >
            <MenuOutlined />
          </button>
        </div>
      </PageContainer>

      {/* Mobile Drawer */}
      <Drawer
        title="Navigation"
        placement="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        width={300}
      >
        <nav aria-label="Mobile navigation" className={styles.mobileNav}>
          {/* Rates Group */}
          <div className={styles.mobileNavGroup}>
            <span className={styles.mobileGroupTitle}>Rates</span>
            <Link
              href="/electricity-rates"
              className={styles.mobileNavLink}
              aria-current={pathname === '/electricity-rates' ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              Electricity Rates
            </Link>
            <Link
              href="/natural-gas-rates"
              className={styles.mobileNavLink}
              aria-current={pathname === '/natural-gas-rates' ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              Natural Gas Rates
            </Link>
          </div>

          {/* Calculators Group */}
          <div className={styles.mobileNavGroup}>
            <span className={styles.mobileGroupTitle}>Calculators</span>
            <Link
              href="/electricity-bill-analyzer"
              className={styles.mobileNavLink}
              aria-current={pathname === '/electricity-bill-analyzer' ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              Electricity Bill Calculator
            </Link>
            <Link
              href="/tools/appliance-energy-cost-calculator"
              className={styles.mobileNavLink}
              aria-current={
                pathname === '/tools/appliance-energy-cost-calculator' ? 'page' : undefined
              }
              onClick={() => setIsOpen(false)}
            >
              Appliance Energy Cost Calculator
            </Link>
            <Link
              href="/tools/natural-gas-bill-calculator"
              className={styles.mobileNavLink}
              aria-current={pathname === '/tools/natural-gas-bill-calculator' ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              Natural Gas Bill Calculator
            </Link>
            <Link
              href="/tools/gas-furnace-cost-calculator"
              className={styles.mobileNavLink}
              aria-current={pathname === '/tools/gas-furnace-cost-calculator' ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              Gas Furnace Operating Cost Calculator
            </Link>
            <Link
              href="/tools"
              className={styles.mobileNavLinkBold}
              aria-current={pathname === '/tools' ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              View All Tools →
            </Link>
          </div>

          {/* Direct Links */}
          <div className={styles.mobileNavGroup}>
            <Link
              href="/appliances"
              className={styles.mobileNavLinkTop}
              aria-current={pathname === '/appliances' ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              Appliances
            </Link>
            <Link
              href="/guides"
              className={styles.mobileNavLinkTop}
              aria-current={pathname === '/guides' ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              Guides
            </Link>
            <Link
              href="/insights"
              className={styles.mobileNavLinkTop}
              aria-current={pathname === '/insights' ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              Insights
            </Link>
          </div>

          {/* Research Group */}
          <div className={styles.mobileNavGroup}>
            <span className={styles.mobileGroupTitle}>Research</span>
            <Link
              href="/research/us-residential-electricity-rate-report"
              className={styles.mobileNavLink}
              aria-current={
                pathname === '/research/us-residential-electricity-rate-report' ? 'page' : undefined
              }
              onClick={() => setIsOpen(false)}
            >
              U.S. Electricity Rate Report
            </Link>
            <Link
              href="/comparisons"
              className={styles.mobileNavLink}
              aria-current={pathname === '/comparisons' ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              Comparisons
            </Link>
            <Link
              href="/data-sources"
              className={styles.mobileNavLink}
              aria-current={pathname === '/data-sources' ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              Data Sources
            </Link>
            <Link
              href="/methodology"
              className={styles.mobileNavLink}
              aria-current={pathname === '/methodology' ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              Methodology
            </Link>
          </div>

          {/* About */}
          <div className={styles.mobileNavGroup}>
            <Link
              href="/about"
              className={styles.mobileNavLinkTop}
              aria-current={pathname === '/about' ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </div>
        </nav>
      </Drawer>
    </header>
  );
}
