import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { Suspense } from "react";
import { AnalyticsScript } from "@/components/layout/AnalyticsScript";
import { BlockingScript } from "@/components/layout/BlockingScript";
import { ConfettiHost } from "@/components/ui/ConfettiHost";
import { Toaster } from "@/components/ui/Toaster";
import { ConnectionToasts } from "@/components/layout/ConnectionToasts";
import { ServiceWorkerRegistrar } from "@/components/layout/ServiceWorkerRegistrar";
import { GoogleTranslate } from "@/components/language/GoogleTranslate";
import { adSenseConfig } from "@/config/ads";
import { brandAssets, brandColors } from "@/config/brand";
import { openGraphDefaults, seo, twitterDefaults } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { env } from "@/lib/env";
import { offerInitScript } from "@/lib/offers/offer-state";
import { sidebarInitScript } from "@/lib/sidebar";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: brandColors.pearl },
    { media: "(prefers-color-scheme: dark)", color: brandColors.night },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(env.appUrl),
  appleWebApp: { capable: true, title: siteConfig.name, statusBarStyle: "default" },
  formatDetection: { telephone: false },
  title: {
    default: seo.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: siteConfig.name,
  category: "technology",
  robots: { index: true, follow: true },
  openGraph: { ...openGraphDefaults, title: seo.defaultTitle, description: seo.description },
  twitter: { ...twitterDefaults, title: seo.defaultTitle, description: seo.description },
  verification: {
    other: { "msvalidate.01": siteConfig.bingSiteVerification },
  },
  other: {
    "google-adsense-account": adSenseConfig.clientId,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" sizes="192x192" href={brandAssets.favicon} />
        <BlockingScript id="theme-init" code={themeInitScript} />
        <BlockingScript id="sidebar-init" code={sidebarInitScript} />
        <BlockingScript id="offer-init" code={offerInitScript} />
        <AnalyticsScript />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <Suspense fallback={null}>
          <Toaster />
        </Suspense>
        <ConfettiHost />
        <ConnectionToasts />
        <ServiceWorkerRegistrar />
        <GoogleTranslate />
      </body>
    </html>
  );
}
