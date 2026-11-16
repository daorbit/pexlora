import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import Script from "next/script";
import { AnalyticsScript } from "@/components/layout/AnalyticsScript";
import { brandColors } from "@/config/brand";
import { seo } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { env } from "@/lib/env";
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
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: seo.locale,
    url: "/",
    title: seo.defaultTitle,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.defaultTitle,
    description: seo.description,
  },
  verification: {
    google: siteConfig.googleSiteVerification,
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
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Script id="sidebar-init" strategy="beforeInteractive">
          {sidebarInitScript}
        </Script>
        <AnalyticsScript />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
