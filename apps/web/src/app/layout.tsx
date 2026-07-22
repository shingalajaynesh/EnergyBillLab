import { AntdRegistry } from '@ant-design/nextjs-registry';
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
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W6X7RMMT');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W6X7RMMT"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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
