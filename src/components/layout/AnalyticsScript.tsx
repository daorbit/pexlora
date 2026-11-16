import Script from "next/script";
import { analyticsConfig } from "@/config/analytics";

export function AnalyticsScript() {
  return (
    <Script
      src={analyticsConfig.trackerSrc}
      data-site={analyticsConfig.siteId}
      strategy="afterInteractive"
    />
  );
}
