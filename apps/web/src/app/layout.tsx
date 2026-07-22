import '@ant-design/v5-patch-for-react-19';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { AppFooter } from '@/components/app-footer';
import { AppHeader } from '@/components/app-header';
import { AppThemeProvider } from '@/components/app-theme-provider';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://energybilllab.com'),
  title: {
    default: 'Energy Bill Lab',
    template: '%s | Energy Bill Lab',
  },
  description:
    'Energy Bill Lab helps U.S. residents understand electricity costs, state rates, and practical ways to reduce home energy bills.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    description:
      'Understand energy bills, compare electricity rates, and prepare for transparent calculators.',
    siteName: 'Energy Bill Lab',
    title: 'Energy Bill Lab',
    type: 'website',
    url: '/',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <AppThemeProvider>
            <AppHeader />
            <main>{children}</main>
            <AppFooter />
          </AppThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
