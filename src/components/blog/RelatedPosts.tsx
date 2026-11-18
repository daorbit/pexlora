import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/config/site";
import { blogCopy } from "@/content/blog";
import type { PostMeta } from "@/lib/blog/types";
import { textLinkClass } from "@/components/ui/text-link-styles";
import { PostGrid } from "@/components/blog/PostGrid";

export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby="related-posts" className="flex flex-col gap-4 sm:gap-6">
      <div className="flex items-end justify-between gap-4">
        <h2 id="related-posts" className="text-[22px] font-semibold tracking-[-0.028em] sm:text-[30px]">
          {blogCopy.post.related}
        </h2>
        <Link href={routes.blog} className={textLinkClass}>
          {blogCopy.post.relatedAll}
          <ArrowRight className="size-3.5" strokeWidth={2.4} aria-hidden />
        </Link>
      </div>
      <PostGrid posts={posts} />
    </section>
  );
}
