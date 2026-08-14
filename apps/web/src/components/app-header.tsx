'use client';

import {
  ArrowRightOutlined,
  BookOutlined,
  BulbOutlined,
  CalculatorOutlined,
  CloseOutlined,
  DownOutlined,
  ExperimentOutlined,
  FireOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
  MenuOutlined,
  RightOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import Drawer from 'antd/es/drawer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import styles from './app-header.module.css';
import { PageContainer } from './page-container';

type DropdownKey = 'rates' | 'calculators' | 'research' | null;
type MobileAccordionKey = 'rates' | 'calculators' | 'guides' | 'insights' | 'research';

export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [expandedSections, setExpandedSections] = useState<Record<MobileAccordionKey, boolean>>({
    rates: false,
    calculators: false,
    guides: false,
    insights: false,
    research: false,
  });
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on Escape key press or click outside
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setIsOpen(false);
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

  // Close dropdown, drawer, and reset accordions when pathname changes
  useEffect(() => {
    setOpenDropdown(null);
    setIsOpen(false);
    setExpandedSections({
      rates: false,
      calculators: false,
      guides: false,
      insights: false,
      research: false,
    });
  }, [pathname]);

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const toggleMobileSection = (key: MobileAccordionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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

  const isGuidesActive = pathname === '/guides' || pathname.startsWith('/guides/');
  const isInsightsActive = pathname === '/insights' || pathname.startsWith('/insights/');
  const isAppliancesActive = pathname === '/appliances';
  const isAboutActive = pathname === '/about';

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
              className={`${styles.navLink} ${isAppliancesActive ? styles.activeNav : ''}`}
              aria-current={pathname === '/appliances' ? 'page' : undefined}
            >
              Appliances
            </Link>

            {/* Guides Link */}
            <Link
              href="/guides"
              className={`${styles.navLink} ${isGuidesActive ? styles.activeNav : ''}`}
              aria-current={pathname === '/guides' ? 'page' : undefined}
            >
              Guides
            </Link>

            {/* Insights Link */}
            <Link
              href="/insights"
              className={`${styles.navLink} ${isInsightsActive ? styles.activeNav : ''}`}
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
              className={`${styles.navLink} ${isAboutActive ? styles.activeNav : ''}`}
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
        placement="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        width={340}
        closable={false}
        className={styles.customDrawer}
      >
        <div className={styles.drawerHeader}>
          <Link
            className={styles.drawerBrand}
            href="/"
            aria-label="Energy Bill Lab home"
            onClick={() => setIsOpen(false)}
          >
            <span className={styles.brandMark} aria-hidden="true">
              <ThunderboltOutlined />
            </span>
            <div className={styles.drawerBrandInfo}>
              <span className={styles.drawerBrandTitle}>Energy Bill Lab</span>
              <span className={styles.drawerBrandSubtitle}>Independent Energy Tools</span>
            </div>
          </Link>
          <button
            type="button"
            className={styles.drawerCloseButton}
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
          >
            <CloseOutlined />
          </button>
        </div>

        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile navigation"
          className={styles.mobileNav}
        >
          {/* Quick Action Cards */}
          <div className={styles.quickActionContainer}>
            <Link
              href="/electricity-bill-analyzer"
              className={styles.quickActionButton}
              onClick={() => setIsOpen(false)}
            >
              <div className={styles.quickActionIcon}>
                <ThunderboltOutlined />
              </div>
              <div className={styles.quickActionText}>
                <span className={styles.quickActionTitle}>Analyze Electric Bill</span>
                <span className={styles.quickActionDesc}>Calculate effective kWh rate & tiers</span>
              </div>
              <ArrowRightOutlined className={styles.quickActionArrow} />
            </Link>

            <Link
              href="/tools/appliance-energy-cost-calculator"
              className={styles.quickActionButtonSecondary}
              onClick={() => setIsOpen(false)}
            >
              <div className={styles.quickActionIconSecondary}>
                <CalculatorOutlined />
              </div>
              <div className={styles.quickActionText}>
                <span className={styles.quickActionTitle}>Appliance Calculator</span>
                <span className={styles.quickActionDesc}>Compare running costs for 100+ loads</span>
              </div>
              <ArrowRightOutlined className={styles.quickActionArrow} />
            </Link>
          </div>

          {/* Rates Group */}
          <div className={styles.mobileNavGroup}>
            <button
              type="button"
              className={styles.mobileGroupHeader}
              onClick={() => toggleMobileSection('rates')}
              aria-expanded={expandedSections.rates}
            >
              <div className={styles.mobileGroupHeaderLeft}>
                <FireOutlined className={styles.groupIcon} />
                <span className={styles.mobileGroupTitle}>Rates & State Benchmarks</span>
              </div>
              <span className={styles.groupBadge}>50 States</span>
              <DownOutlined
                className={`${styles.accordionChevron} ${
                  expandedSections.rates ? styles.chevronOpen : ''
                }`}
              />
            </button>

            {expandedSections.rates && (
              <div className={styles.mobileGroupItems}>
                <Link
                  href="/electricity-rates"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/electricity-rates' ? styles.activeMobileLink : ''
                  }`}
                  aria-current={pathname === '/electricity-rates' ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Electricity Rates
                </Link>
                <Link
                  href="/natural-gas-rates"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/natural-gas-rates' ? styles.activeMobileLink : ''
                  }`}
                  aria-current={pathname === '/natural-gas-rates' ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Natural Gas Rates
                </Link>
              </div>
            )}
          </div>

          {/* Calculators Group */}
          <div className={styles.mobileNavGroup}>
            <button
              type="button"
              className={styles.mobileGroupHeader}
              onClick={() => toggleMobileSection('calculators')}
              aria-expanded={expandedSections.calculators}
            >
              <div className={styles.mobileGroupHeaderLeft}>
                <CalculatorOutlined className={styles.groupIcon} />
                <span className={styles.mobileGroupTitle}>Calculators & Tools</span>
              </div>
              <span className={styles.groupBadge}>12 Tools</span>
              <DownOutlined
                className={`${styles.accordionChevron} ${
                  expandedSections.calculators ? styles.chevronOpen : ''
                }`}
              />
            </button>

            {expandedSections.calculators && (
              <div className={styles.mobileGroupItems}>
                <Link
                  href="/electricity-bill-analyzer"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/electricity-bill-analyzer' ? styles.activeMobileLink : ''
                  }`}
                  aria-current={pathname === '/electricity-bill-analyzer' ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Electricity Bill Calculator
                </Link>
                <Link
                  href="/tools/appliance-energy-cost-calculator"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/tools/appliance-energy-cost-calculator'
                      ? styles.activeMobileLink
                      : ''
                  }`}
                  aria-current={
                    pathname === '/tools/appliance-energy-cost-calculator' ? 'page' : undefined
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Appliance Energy Cost Calculator
                </Link>
                <Link
                  href="/tools/ac-cost-calculator"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/tools/ac-cost-calculator' ? styles.activeMobileLink : ''
                  }`}
                  aria-current={pathname === '/tools/ac-cost-calculator' ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Air Conditioner Cost Calculator
                </Link>
                <Link
                  href="/tools/ev-home-charging-cost-calculator"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/tools/ev-home-charging-cost-calculator'
                      ? styles.activeMobileLink
                      : ''
                  }`}
                  aria-current={
                    pathname === '/tools/ev-home-charging-cost-calculator' ? 'page' : undefined
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  EV Home Charging Calculator
                </Link>
                <Link
                  href="/tools/electric-water-heater-cost-calculator"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/tools/electric-water-heater-cost-calculator'
                      ? styles.activeMobileLink
                      : ''
                  }`}
                  aria-current={
                    pathname === '/tools/electric-water-heater-cost-calculator' ? 'page' : undefined
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Water Heater Operating Cost Calculator
                </Link>
                <Link
                  href="/tools/space-heater-cost-calculator"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/tools/space-heater-cost-calculator'
                      ? styles.activeMobileLink
                      : ''
                  }`}
                  aria-current={
                    pathname === '/tools/space-heater-cost-calculator' ? 'page' : undefined
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Space Heater Cost Calculator
                </Link>
                <Link
                  href="/tools/natural-gas-bill-calculator"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/tools/natural-gas-bill-calculator' ? styles.activeMobileLink : ''
                  }`}
                  aria-current={
                    pathname === '/tools/natural-gas-bill-calculator' ? 'page' : undefined
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Natural Gas Bill Calculator
                </Link>
                <Link
                  href="/tools/gas-furnace-cost-calculator"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/tools/gas-furnace-cost-calculator' ? styles.activeMobileLink : ''
                  }`}
                  aria-current={
                    pathname === '/tools/gas-furnace-cost-calculator' ? 'page' : undefined
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Gas Furnace Operating Cost Calculator
                </Link>
                <Link
                  href="/tools/pool-pump-cost-calculator"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/tools/pool-pump-cost-calculator' ? styles.activeMobileLink : ''
                  }`}
                  aria-current={
                    pathname === '/tools/pool-pump-cost-calculator' ? 'page' : undefined
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Pool Pump Operating Cost Calculator
                </Link>
                <Link
                  href="/tools"
                  className={styles.mobileNavLinkBold}
                  aria-current={pathname === '/tools' ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  View All 12 Tools →
                </Link>
              </div>
            )}
          </div>

          {/* Guides Group */}
          <div className={styles.mobileNavGroup}>
            <button
              type="button"
              className={styles.mobileGroupHeader}
              onClick={() => toggleMobileSection('guides')}
              aria-expanded={expandedSections.guides}
            >
              <div className={styles.mobileGroupHeaderLeft}>
                <BookOutlined className={styles.groupIcon} />
                <span className={styles.mobileGroupTitle}>Guides & Education</span>
              </div>
              <span className={styles.groupBadge}>50 Guides</span>
              <DownOutlined
                className={`${styles.accordionChevron} ${
                  expandedSections.guides ? styles.chevronOpen : ''
                }`}
              />
            </button>

            {expandedSections.guides && (
              <div className={styles.mobileGroupItems}>
                <Link
                  href="/guides"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/guides' ? styles.activeMobileLink : ''
                  }`}
                  aria-current={pathname === '/guides' ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Guides Hub
                </Link>
                <Link
                  href="/guides/why-is-my-electric-bill-so-high"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/guides/why-is-my-electric-bill-so-high'
                      ? styles.activeMobileLink
                      : ''
                  }`}
                  aria-current={
                    pathname === '/guides/why-is-my-electric-bill-so-high' ? 'page' : undefined
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Why Is My Electric Bill So High?
                </Link>
                <Link
                  href="/guides/how-to-read-an-electric-bill-line-by-line"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/guides/how-to-read-an-electric-bill-line-by-line'
                      ? styles.activeMobileLink
                      : ''
                  }`}
                  aria-current={
                    pathname === '/guides/how-to-read-an-electric-bill-line-by-line'
                      ? 'page'
                      : undefined
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  How to Read an Electric Bill
                </Link>
                <Link
                  href="/guides/what-is-a-time-of-use-electricity-rate"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/guides/what-is-a-time-of-use-electricity-rate'
                      ? styles.activeMobileLink
                      : ''
                  }`}
                  aria-current={
                    pathname === '/guides/what-is-a-time-of-use-electricity-rate'
                      ? 'page'
                      : undefined
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Time-of-Use Rates Explained
                </Link>
                <Link
                  href="/guides"
                  className={styles.mobileNavLinkBold}
                  onClick={() => setIsOpen(false)}
                >
                  Explore All 50 Guides →
                </Link>
              </div>
            )}
          </div>

          {/* Insights Group */}
          <div className={styles.mobileNavGroup}>
            <button
              type="button"
              className={styles.mobileGroupHeader}
              onClick={() => toggleMobileSection('insights')}
              aria-expanded={expandedSections.insights}
            >
              <div className={styles.mobileGroupHeaderLeft}>
                <LineChartOutlined className={styles.groupIcon} />
                <span className={styles.mobileGroupTitle}>Energy Insights</span>
              </div>
              <span className={styles.groupBadge}>24 Reports</span>
              <DownOutlined
                className={`${styles.accordionChevron} ${
                  expandedSections.insights ? styles.chevronOpen : ''
                }`}
              />
            </button>

            {expandedSections.insights && (
              <div className={styles.mobileGroupItems}>
                <Link
                  href="/insights"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/insights' ? styles.activeMobileLink : ''
                  }`}
                  aria-current={pathname === '/insights' ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Insights Hub
                </Link>
                <Link
                  href="/insights/august-2026-induction-vs-electric-vs-gas-cooktop-energy-cost-benchmark"
                  className={`${styles.mobileNavLink} ${
                    pathname ===
                    '/insights/august-2026-induction-vs-electric-vs-gas-cooktop-energy-cost-benchmark'
                      ? styles.activeMobileLink
                      : ''
                  }`}
                  aria-current={
                    pathname ===
                    '/insights/august-2026-induction-vs-electric-vs-gas-cooktop-energy-cost-benchmark'
                      ? 'page'
                      : undefined
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Induction vs Electric vs Gas Cooktop
                </Link>
                <Link
                  href="/insights/august-2026-swimming-pool-pump-kwh-operating-cost-benchmark"
                  className={`${styles.mobileNavLink} ${
                    pathname ===
                    '/insights/august-2026-swimming-pool-pump-kwh-operating-cost-benchmark'
                      ? styles.activeMobileLink
                      : ''
                  }`}
                  aria-current={
                    pathname ===
                    '/insights/august-2026-swimming-pool-pump-kwh-operating-cost-benchmark'
                      ? 'page'
                      : undefined
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Swimming Pool Pump Benchmark
                </Link>
                <Link
                  href="/insights"
                  className={styles.mobileNavLinkBold}
                  onClick={() => setIsOpen(false)}
                >
                  View All Market Insights →
                </Link>
              </div>
            )}
          </div>

          {/* Appliances Hub Direct Link */}
          <div className={styles.mobileNavGroup}>
            <Link
              href="/appliances"
              className={`${styles.mobileNavLinkTop} ${
                isAppliancesActive ? styles.activeMobileLink : ''
              }`}
              aria-current={isAppliancesActive ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              <div className={styles.mobileGroupHeaderLeft}>
                <BulbOutlined className={styles.groupIcon} />
                <span>Appliances Catalog</span>
              </div>
              <RightOutlined className={styles.directNavArrow} />
            </Link>
          </div>

          {/* Research Group */}
          <div className={styles.mobileNavGroup}>
            <button
              type="button"
              className={styles.mobileGroupHeader}
              onClick={() => toggleMobileSection('research')}
              aria-expanded={expandedSections.research}
            >
              <div className={styles.mobileGroupHeaderLeft}>
                <ExperimentOutlined className={styles.groupIcon} />
                <span className={styles.mobileGroupTitle}>Research & Data</span>
              </div>
              <span className={styles.groupBadge}>EIA Data</span>
              <DownOutlined
                className={`${styles.accordionChevron} ${
                  expandedSections.research ? styles.chevronOpen : ''
                }`}
              />
            </button>

            {expandedSections.research && (
              <div className={styles.mobileGroupItems}>
                <Link
                  href="/research/us-residential-electricity-rate-report"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/research/us-residential-electricity-rate-report'
                      ? styles.activeMobileLink
                      : ''
                  }`}
                  aria-current={
                    pathname === '/research/us-residential-electricity-rate-report'
                      ? 'page'
                      : undefined
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  U.S. Electricity Rate Report
                </Link>
                <Link
                  href="/comparisons"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/comparisons' ? styles.activeMobileLink : ''
                  }`}
                  aria-current={pathname === '/comparisons' ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Comparisons
                </Link>
                <Link
                  href="/data-sources"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/data-sources' ? styles.activeMobileLink : ''
                  }`}
                  aria-current={pathname === '/data-sources' ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Data Sources
                </Link>
                <Link
                  href="/methodology"
                  className={`${styles.mobileNavLink} ${
                    pathname === '/methodology' ? styles.activeMobileLink : ''
                  }`}
                  aria-current={pathname === '/methodology' ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkDot} />
                  Methodology
                </Link>
              </div>
            )}
          </div>

          {/* About & Trust */}
          <div className={styles.mobileNavGroup}>
            <Link
              href="/about"
              className={`${styles.mobileNavLinkTop} ${
                isAboutActive ? styles.activeMobileLink : ''
              }`}
              aria-current={isAboutActive ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              <div className={styles.mobileGroupHeaderLeft}>
                <InfoCircleOutlined className={styles.groupIcon} />
                <span>About Energy Bill Lab</span>
              </div>
              <RightOutlined className={styles.directNavArrow} />
            </Link>
          </div>

          {/* Drawer Footer Note */}
          <div className={styles.drawerFooter}>
            <div className={styles.drawerFooterTrust}>
              <span className={styles.drawerTrustDot} />
              <span>Independent & Public Utility Analysis</span>
            </div>
            <p className={styles.drawerFooterText}>
              Published by <strong>Jaynesh Shingala</strong>. Data questions or feedback:{' '}
              <a href="mailto:shingala.jaynesh@gmail.com" className={styles.drawerFooterEmail}>
                shingala.jaynesh@gmail.com
              </a>
            </p>
          </div>
        </nav>
      </Drawer>
    </header>
  );
}
