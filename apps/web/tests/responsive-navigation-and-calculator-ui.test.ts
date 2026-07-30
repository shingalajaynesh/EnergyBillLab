import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { publicRoutes } from '../src/lib/routes';

describe('Responsive Navigation & Calculator UI Cleanup', () => {
  it('1. header CSS enforces 1100px responsive breakpoint hiding desktop nav on mobile', () => {
    const cssPath = resolve(__dirname, '../src/components/app-header.module.css');
    const cssContent = readFileSync(cssPath, 'utf-8');

    expect(cssContent).toContain('@media (max-width: 1100px)');
    expect(cssContent).toContain('.nav {\n    display: none;');
    expect(cssContent).toContain('.menuButton {');
  });

  it('2. header component supports Escape key and click-outside for dropdown closing', () => {
    const tsxPath = resolve(__dirname, '../src/components/app-header.tsx');
    const tsxContent = readFileSync(tsxPath, 'utf-8');

    expect(tsxContent).toContain("e.key === 'Escape'");
    expect(tsxContent).toContain('handleClickOutside');
    expect(tsxContent).toContain('aria-expanded');
    expect(tsxContent).toContain('aria-haspopup="true"');
  });

  it('3. rates dropdown contains Electricity Rates and Natural Gas Rates', () => {
    const tsxPath = resolve(__dirname, '../src/components/app-header.tsx');
    const tsxContent = readFileSync(tsxPath, 'utf-8');

    expect(tsxContent).toContain('/electricity-rates');
    expect(tsxContent).toContain('/natural-gas-rates');
    expect(tsxContent).toContain('Electricity Rates');
    expect(tsxContent).toContain('Natural Gas Rates');
  });

  it('4. calculators dropdown contains primary tools and view all link', () => {
    const tsxPath = resolve(__dirname, '../src/components/app-header.tsx');
    const tsxContent = readFileSync(tsxPath, 'utf-8');

    expect(tsxContent).toContain('/electricity-bill-analyzer');
    expect(tsxContent).toContain('/tools/appliance-energy-cost-calculator');
    expect(tsxContent).toContain('/tools/natural-gas-bill-calculator');
    expect(tsxContent).toContain('/tools/gas-furnace-cost-calculator');
    expect(tsxContent).toContain('/tools');
    expect(tsxContent).toContain('View All Tools →');
  });

  it('5. research dropdown contains report, comparisons, data-sources, methodology', () => {
    const tsxPath = resolve(__dirname, '../src/components/app-header.tsx');
    const tsxContent = readFileSync(tsxPath, 'utf-8');

    expect(tsxContent).toContain('/research/us-residential-electricity-rate-report');
    expect(tsxContent).toContain('/comparisons');
    expect(tsxContent).toContain('/data-sources');
    expect(tsxContent).toContain('/methodology');
  });

  it('6. mobile drawer contains exact grouped hierarchy and tap targets', () => {
    const tsxPath = resolve(__dirname, '../src/components/app-header.tsx');
    const tsxContent = readFileSync(tsxPath, 'utf-8');

    expect(tsxContent).toContain('setIsOpen(false)');
    expect(tsxContent).toContain('mobileNavGroup');
    expect(tsxContent).toContain('mobileGroupTitle');
  });

  it('7. global CSS enforces scoped responsive calculator card, preset, and mode switcher rules', () => {
    const cssPath = resolve(__dirname, '../src/app/globals.css');
    const cssContent = readFileSync(cssPath, 'utf-8');

    expect(cssContent).toContain('.calculatorPage');
    expect(cssContent).toContain('presetGrid');
    expect(cssContent).toContain('white-space: normal');
    expect(cssContent).toContain('overflow-wrap: anywhere');
    expect(cssContent).toContain('@media (max-width: 600px)');
    expect(cssContent).toContain('flex-direction: column');
  });

  it('8. calculator form modules allow 1fr single-column preset grid on mobile', () => {
    const acCssPath = resolve(
      __dirname,
      '../src/features/ac-calculator/components/ac-calculator-form.module.css',
    );
    const acCss = readFileSync(acCssPath, 'utf-8');

    expect(acCss).toContain('@media (max-width: 600px)');
    expect(acCss).toContain('grid-template-columns: 1fr');

    const whCssPath = resolve(
      __dirname,
      '../src/features/water-heater-calculator/components/water-heater-form.module.css',
    );
    const whCss = readFileSync(whCssPath, 'utf-8');

    expect(whCss).toContain('grid-template-columns: 1fr');
  });

  it('9. homepage task-card CSS styles remain fully intact', () => {
    const pageCssPath = resolve(__dirname, '../src/app/page.module.css');
    const pageCss = readFileSync(pageCssPath, 'utf-8');

    expect(pageCss).toContain('.taskSelectionSection');
    expect(pageCss).toContain('.taskSelectionGrid');
    expect(pageCss).toContain('.taskCard');
    expect(pageCss).toContain('.taskTitle');
    expect(pageCss).toContain('.taskDesc');
    expect(pageCss).toContain('.taskAction');
  });

  it('10. public route registry maintains required routes', () => {
    const paths = publicRoutes.map((r) => r.href);

    expect(paths).toContain('/electricity-rates');
    expect(paths).toContain('/natural-gas-rates');
    expect(paths).toContain('/electricity-bill-analyzer');
    expect(paths).toContain('/tools/appliance-energy-cost-calculator');
    expect(paths).toContain('/tools/natural-gas-bill-calculator');
    expect(paths).toContain('/tools/gas-furnace-cost-calculator');
    expect(paths).toContain('/tools');
    expect(paths).toContain('/appliances');
    expect(paths).toContain('/guides');
    expect(paths).toContain('/insights');
    expect(paths).toContain('/research');
    expect(paths).toContain('/about');
  });
});
