"use client";

import { routes, siteConfig } from "@/config/site";
import { statusCopy } from "@/content/status";
import { RouteError } from "@/components/feedback/RouteError";
import "./globals.css";

export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="en" data-theme="light">
      <body className="flex min-h-dvh flex-col items-center justify-center">
        <title>{`${statusCopy.error.title} | ${siteConfig.name}`}</title>
        <RouteError error={error} retry={retry} homeHref={routes.home} homeLabel={statusCopy.error.home} />
      </body>
    </html>
  );
}
