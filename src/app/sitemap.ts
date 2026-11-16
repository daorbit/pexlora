import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { lastCommitDate } from "@/lib/seo/content-dates";
import { sitemapEntries } from "@/lib/seo/sitemap-entries";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries().map(({ path, sources }) => {
    const lastModified = lastCommitDate(sources);
    return { url: `${env.appUrl}${path}`, ...(lastModified ? { lastModified } : {}) };
  });
}
