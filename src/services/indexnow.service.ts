import "server-only";
import { indexNow } from "@/config/indexnow";
import { env } from "@/lib/env";

const DAY_MS = 24 * 60 * 60 * 1000;

type SitemapUrl = { url: string; lastModified?: Date };

export function validIndexNowKey() {
  const key = env.indexNowKey;
  return key && indexNow.keyPattern.test(key) ? key : null;
}

function parseSitemap(xml: string): SitemapUrl[] {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].flatMap(([, block]) => {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    if (!loc) return [];
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim();
    return [{ url: loc, lastModified: lastmod ? new Date(lastmod) : undefined }];
  });
}

export async function changedSitemapUrls(all: boolean) {
  const response = await fetch(`${env.appUrl}${indexNow.sitemapPath}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Sitemap request failed: ${response.status}`);
  const entries = parseSitemap(await response.text());
  if (all) return entries.map((entry) => entry.url);

  const since = Date.now() - indexNow.lookbackDays * DAY_MS;
  return entries.filter((entry) => entry.lastModified && entry.lastModified.getTime() >= since).map((entry) => entry.url);
}

export async function submitToIndexNow(urls: string[], key: string) {
  const host = new URL(env.appUrl).host;
  const statuses: number[] = [];

  for (let start = 0; start < urls.length; start += indexNow.maxUrlsPerRequest) {
    const response = await fetch(indexNow.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `${env.appUrl}${indexNow.keyPath}`,
        urlList: urls.slice(start, start + indexNow.maxUrlsPerRequest),
      }),
    });
    statuses.push(response.status);
  }

  return statuses;
}
