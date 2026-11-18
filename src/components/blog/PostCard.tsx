import Link from "next/link";
import { blogPostPath } from "@/config/blog";
import { cn } from "@/lib/utils/cn";
import type { PostMeta } from "@/lib/blog/types";
import { PostByline } from "@/components/blog/PostByline";
import { PostCover } from "@/components/blog/PostCover";
import { PostTopic } from "@/components/blog/PostTopic";

export function PostCard({ post, className }: { post: PostMeta; className?: string }) {
  return (
    <Link
      href={blogPostPath(post.slug)}
      className={cn(
        "group flex h-full flex-col gap-2 rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:gap-3",
        className,
      )}
    >
      <PostCover
        image={post.thumbnail}
        title={post.title}
        sizes="(min-width: 1024px) 360px, 50vw"
        className="aspect-[40/21] rounded-xl transition-opacity group-hover:opacity-90 sm:rounded-[14px]"
      />
      <PostTopic tag={post.tags[0]} className="mt-1 max-sm:hidden" />
      <h3 className="line-clamp-3 text-[14px] leading-[1.3] font-semibold sm:text-[20px] sm:leading-[1.25] sm:tracking-[-0.02em]">
        {post.title}
      </h3>
      <PostByline date={post.date} className="max-sm:hidden" />
    </Link>
  );
}
