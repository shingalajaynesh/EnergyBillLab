import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
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
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
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
      </body>
    </html>
  );
}
