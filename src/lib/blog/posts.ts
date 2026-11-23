import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { BLOG_CMS, BLOG_PLACEHOLDER_SLUG, BLOG_RELATED_COUNT, BLOG_WORDS_PER_MINUTE } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { getCmsPage, listCmsPages } from "@/services/cms.service";
import { cleanPostHtml } from "@/lib/blog/clean-html";
import { plainText, withHeadingIds } from "@/lib/blog/headings";
import type { CmsImage, CmsPage, Post, PostMeta } from "@/lib/blog/types";

const SUMMARY_FIELDS: (keyof CmsPage)[] = [
  "title",
  "slug",
  "description",
  "tags",
  "author",
  "publishedAt",
  "updatedAt",
  "heroImage",
  "thumbnailImage",
  "seo",
  "readingMinutes",
];

const emptyImage: CmsImage = { url: "", alt: "" };

function readingMinutes(html: string) {
  const words = plainText(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / BLOG_WORDS_PER_MINUTE));
}

function toMeta(page: CmsPage): PostMeta {
  const cover = page.heroImage?.url ? page.heroImage : (page.thumbnailImage ?? emptyImage);
  const thumbnail = page.thumbnailImage?.url ? page.thumbnailImage : cover;

  return {
    slug: page.slug,
    title: page.title,
    description: page.description ?? "",
    date: page.publishedAt ?? page.updatedAt,
    updated: page.updatedAt,
    tags: page.tags ?? [],
    author: page.author?.name ? page.author : { name: siteConfig.name, role: "" },
    thumbnail,
    cover,
    seoTitle: page.seo?.title || page.title,
    seoDescription: page.seo?.description || page.description || "",
    noIndex: page.seo?.noIndex ?? false,
    readingMinutes: page.readingMinutes > 0 ? page.readingMinutes : undefined,
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(BLOG_CMS.cacheTag);

  const pages = await listCmsPages({ group: BLOG_CMS.group, fields: SUMMARY_FIELDS });
  return pages.map(toMeta);
}

export async function getListedPosts() {
  return (await getAllPosts()).filter((post) => !post.noIndex);
}

export async function getLatestPosts(limit: number) {
  try {
    return (await getListedPosts()).slice(0, limit);
  } catch {
    return [];
  }
}

export async function getPostsBySlugs(slugs: string[]) {
  if (!slugs.length) return [];
  try {
    const posts = await getListedPosts();
    return slugs.flatMap((slug) => posts.find((post) => post.slug === slug) ?? []);
  } catch {
    return [];
  }
}

export async function getPrerenderSlugs() {
  try {
    const slugs = (await getAllPosts()).map((post) => post.slug);
    return slugs.length ? slugs : [BLOG_PLACEHOLDER_SLUG];
  } catch {
    return [BLOG_PLACEHOLDER_SLUG];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag(BLOG_CMS.cacheTag);

  if (slug === BLOG_PLACEHOLDER_SLUG) return null;
  const page = await getCmsPage(slug);
  if (!page || page.group !== BLOG_CMS.group) return null;

  const { html, headings } = withHeadingIds(cleanPostHtml(page.content ?? ""));
  return { ...toMeta(page), html, headings, readingMinutes: readingMinutes(html) };
}

export async function getRelatedPosts(post: PostMeta, limit = BLOG_RELATED_COUNT) {
  const others = (await getListedPosts()).filter((other) => other.slug !== post.slug);

  return others
    .map((other, index) => ({ other, index, score: other.tags.filter((tag) => post.tags.includes(tag)).length }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ other }) => other);
}

export function postTopics(posts: PostMeta[]) {
  const counts = new Map<string, number>();
  posts.forEach((post) => post.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)));
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag]) => tag);
}
