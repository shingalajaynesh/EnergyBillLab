'use client';

import { appTheme } from '@energy-bill-lab/design-system';
import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';

export function AppThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={appTheme}>{children}</ConfigProvider>;
}
