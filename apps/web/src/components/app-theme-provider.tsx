'use client';

import '@ant-design/v5-patch-for-react-19';
import { appTheme } from '@energy-bill-lab/design-system';
import ConfigProvider from 'antd/es/config-provider';
import type { ReactNode } from 'react';

export function AppThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={appTheme}>{children}</ConfigProvider>;
}
