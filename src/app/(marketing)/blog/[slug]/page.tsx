import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPostPath } from "@/config/blog";
import { env } from "@/lib/env";
import { getPost, getPrerenderSlugs, getRelatedPosts } from "@/lib/blog/posts";
import { blogPostMetadata } from "@/lib/seo/blog-metadata";
import { blogPostStructuredData } from "@/lib/seo/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { PostArticle } from "@/components/blog/PostArticle";

type BlogPostRouteProps = { params: Promise<{ slug: string }> };

export const instant = false;

export async function generateStaticParams() {
  return (await getPrerenderSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostRouteProps): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return post ? blogPostMetadata(post) : {};
}

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post);

  return (
    <>
      <JsonLd data={blogPostStructuredData(post)} />
      <PostArticle post={post} related={related} url={`${env.appUrl}${blogPostPath(post.slug)}`} />
    </>
  );
}
