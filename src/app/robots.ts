import type { MetadataRoute } from "next";
import { shareTarget } from "@/config/share-target";
import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api/", shareTarget.action],
    },
    sitemap: `${env.appUrl}/sitemap.xml`,
  };
}
