import { AntdRegistry } from '@ant-design/nextjs-registry';
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import Script from 'next/script';
import type { ReactNode } from 'react';

import { AppFooter } from '@/components/app-footer';
import { AppHeader } from '@/components/app-header';
import { AppThemeProvider } from '@/components/app-theme-provider';
import { createRootMetadata } from '@/lib/metadata';
import {
  createOrganizationStructuredData,
  createWebsiteStructuredData,
  serializeStructuredData,
} from '@/lib/structured-data';

import './globals.css';

export const metadata: Metadata = createRootMetadata();

export default function RootLayout({ children }: { children: ReactNode }) {
  const structuredData = [createWebsiteStructuredData(), createOrganizationStructuredData()];

  return (
    <html lang="en">
      <body>
        <GoogleTagManager gtmId="GTM-W6X7RMMT" />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6303291083449043"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <AntdRegistry>
          <AppThemeProvider>
            <AppHeader />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <AppFooter />
          </AppThemeProvider>
        </AntdRegistry>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
