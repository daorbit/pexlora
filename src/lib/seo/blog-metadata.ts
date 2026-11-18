import type { Metadata } from "next";
import { blogPostPath } from "@/config/blog";
import { routes } from "@/config/site";
import { blogCopy } from "@/content/blog";
import { noIndexMetadata, pageMetadata } from "@/lib/seo/page-metadata";
import type { PostMeta } from "@/lib/blog/types";

export function blogIndexMetadata(): Metadata {
  return pageMetadata(blogCopy.metaTitle, blogCopy.metaDescription, routes.blog);
}

export function blogPostMetadata(post: PostMeta): Metadata {
  const base = pageMetadata(post.seoTitle, post.seoDescription, blogPostPath(post.slug), post.tags);
  const image = post.cover.url ? [{ url: post.cover.url, alt: post.cover.alt || post.title }] : undefined;

  return {
    ...base,
    ...(post.noIndex ? noIndexMetadata : {}),
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author.name],
      tags: post.tags,
      ...(image ? { images: image } : {}),
    },
    twitter: { ...base.twitter, ...(image ? { images: image } : {}) },
  };
}
