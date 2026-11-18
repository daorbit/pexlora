import Link from "next/link";
import { blogPostPath } from "@/config/blog";
import { blogCopy } from "@/content/blog";
import type { PostMeta } from "@/lib/blog/types";
import { PostByline } from "@/components/blog/PostByline";
import { PostCover } from "@/components/blog/PostCover";
import { PostTopic } from "@/components/blog/PostTopic";

export function FeaturedPost({ post }: { post: PostMeta }) {
  const topic = [blogCopy.latest, post.tags[0]].filter(Boolean).join(" · ");

  return (
    <Link
      href={blogPostPath(post.slug)}
      className="group flex flex-col gap-3 rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:gap-6"
    >
      <PostCover
        image={post.cover}
        title={post.title}
        sizes="(min-width: 1152px) 1152px, 100vw"
        priority
        className="aspect-[16/9] rounded-2xl transition-opacity group-hover:opacity-90 sm:rounded-3xl"
      />
      <div className="grid gap-2.5 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="flex flex-col gap-2.5 sm:gap-3.5">
          <PostTopic tag={topic} />
          <h2 className="text-[22px] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[40px] sm:leading-[1.08] sm:tracking-[-0.032em]">
            {post.title}
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4 lg:pt-8">
          {post.description && (
            <p className="line-clamp-3 text-[15px] leading-relaxed text-secondary max-sm:hidden sm:text-[17px] sm:leading-[1.65]">
              {post.description}
            </p>
          )}
          <PostByline date={post.date} readingMinutes={post.readingMinutes} />
        </div>
      </div>
    </Link>
  );
}
