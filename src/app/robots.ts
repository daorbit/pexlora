import type { MetadataRoute } from "next";
import { AI_CRAWLERS } from "@/config/crawlers";
import { shareTarget } from "@/config/share-target";
import { env } from "@/lib/env";

const disallow = ["/dashboard", "/api/", shareTarget.action];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: [...AI_CRAWLERS], allow: ["/", "/llms.txt"], disallow },
    ],
    sitemap: `${env.appUrl}/sitemap.xml`,
    host: env.appUrl,
  };
}
