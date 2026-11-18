import { cn } from "@/lib/utils/cn";
import { staggerDelay } from "@/lib/utils/stagger";
import type { PostMeta } from "@/lib/blog/types";
import { PostCard } from "@/components/blog/PostCard";

export const postGridClass = "grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-3";

export function PostGrid({ posts, className }: { posts: PostMeta[]; className?: string }) {
  return (
    <ul className={cn(postGridClass, className)}>
      {posts.map((post, index) => (
        <li key={post.slug} className={cn("min-w-0 motion-safe:animate-fade-up", staggerDelay(index))}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
