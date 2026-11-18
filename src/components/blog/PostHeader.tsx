import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { routes } from "@/config/site";
import { blogCopy } from "@/content/blog";
import type { Post } from "@/lib/blog/types";
import { textLinkClass } from "@/components/ui/text-link-styles";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { PostByline } from "@/components/blog/PostByline";
import { PostTopic } from "@/components/blog/PostTopic";

export function PostHeader({ post }: { post: Post }) {
  return (
    <header className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center sm:gap-5">
      <Link href={routes.blog} className={textLinkClass}>
        <ArrowLeft className="size-3.5" strokeWidth={2.4} aria-hidden />
        {blogCopy.post.back}
      </Link>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          {post.tags.slice(0, 3).map((tag) => (
            <PostTopic key={tag} tag={tag} />
          ))}
        </div>
      )}
      <h1 className="text-[28px] leading-[1.1] font-bold tracking-[-0.035em] motion-safe:animate-fade-up sm:text-[50px] sm:leading-[1.05]">
        {post.title}
      </h1>
      {post.description && (
        <p className="max-w-2xl text-[15.5px] leading-relaxed text-secondary motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] sm:text-[19px]">
          {post.description}
        </p>
      )}
      <div className="flex items-center gap-2.5 pt-1 text-left">
        <UserAvatar name={post.author.name} size="sm" />
        <div className="flex flex-col">
          <span className="text-[13.5px] font-semibold" translate="no">
            {post.author.name}
          </span>
          <PostByline date={post.date} readingMinutes={post.readingMinutes} />
        </div>
      </div>
    </header>
  );
}
