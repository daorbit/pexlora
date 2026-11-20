import "server-only";
import { lastCommitDate } from "@/lib/seo/content-dates";
import { sitemapEntries, type SitemapEntry } from "@/lib/seo/sitemap-entries";

let entriesByPath: Map<string, SitemapEntry> | undefined;

export function pageUpdatedAt(path: string): Date | undefined {
  entriesByPath ??= new Map(sitemapEntries().map((entry) => [entry.path, entry]));
  const entry = entriesByPath.get(path);
  return entry ? lastCommitDate(entry.sources) : undefined;
}
