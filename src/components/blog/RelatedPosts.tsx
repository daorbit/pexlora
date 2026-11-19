import { blogCopy } from "@/content/blog";
import type { PostMeta } from "@/lib/blog/types";
import { PostGrid } from "@/components/blog/PostGrid";
import { PostListHeader } from "@/components/blog/PostListHeader";

export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby="related-posts" className="flex flex-col gap-4 sm:gap-6">
      <PostListHeader id="related-posts" title={blogCopy.post.related} linkLabel={blogCopy.post.relatedAll} />
      <PostGrid posts={posts} />
    </section>
  );
}
