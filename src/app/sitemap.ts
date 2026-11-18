import type { MetadataRoute } from "next";
import { blogPostPath } from "@/config/blog";
import { env } from "@/lib/env";
import { getListedPosts } from "@/lib/blog/posts";
import { lastCommitDate } from "@/lib/seo/content-dates";
import { sitemapEntries } from "@/lib/seo/sitemap-entries";

async function blogEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const posts = await getListedPosts();
    return posts.map((post) => ({ url: `${env.appUrl}${blogPostPath(post.slug)}`, lastModified: post.updated }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = sitemapEntries().map(({ path, sources }) => {
    const lastModified = lastCommitDate(sources);
    return { url: `${env.appUrl}${path}`, ...(lastModified ? { lastModified } : {}) };
  });

  return [...pages, ...(await blogEntries())];
}
