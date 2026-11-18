import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { blogPostPath } from "@/config/blog";
import { env } from "@/lib/env";
import { getPost, getRelatedPosts } from "@/lib/blog/posts";
import { blogPostMetadata } from "@/lib/seo/blog-metadata";
import { blogPostStructuredData } from "@/lib/seo/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { PostArticle } from "@/components/blog/PostArticle";
import { PostSkeleton } from "@/components/blog/BlogSkeleton";

type BlogPostRouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: BlogPostRouteProps): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return post ? blogPostMetadata(post) : {};
}

async function BlogPostContent({ params }: BlogPostRouteProps) {
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

export default function BlogPostRoute({ params }: BlogPostRouteProps) {
  return (
    <Suspense fallback={<PostSkeleton />}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}
