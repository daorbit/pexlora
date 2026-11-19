import { getListedPosts, postTopics } from "@/lib/blog/posts";
import { blogIndexMetadata } from "@/lib/seo/blog-metadata";
import { blogStructuredData } from "@/lib/seo/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { BlogEmptyState } from "@/components/blog/BlogEmptyState";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata = blogIndexMetadata();

async function BlogPosts() {
  const posts = await getListedPosts();
  if (posts.length === 0) return <BlogEmptyState />;

  return (
    <>
      <JsonLd data={blogStructuredData(posts)} />
      <BlogIndex posts={posts} topics={postTopics(posts)} />
    </>
  );
}

export default function BlogPage() {
  return (
    <section className="pt-8 pb-14 sm:pt-16 sm:pb-24">
      <Container className="flex max-w-6xl flex-col gap-7 sm:gap-12">
        <BlogHeader />
        <BlogPosts />
      </Container>
    </section>
  );
}
