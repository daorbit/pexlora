"use client";

import { useMemo } from "react";
import { blogCopy } from "@/content/blog";
import { useSearchParamState } from "@/hooks/useSearchParamState";
import { cn } from "@/lib/utils/cn";
import type { PostMeta } from "@/lib/blog/types";
import { Segmented } from "@/components/ui/Segmented";
import { SelectSheet } from "@/components/ui/SelectSheet";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { PostGrid } from "@/components/blog/PostGrid";

const ALL = "all";

type BlogIndexProps = { posts: PostMeta[]; topics: string[] };

export function BlogIndex({ posts, topics }: BlogIndexProps) {
  const [topic, setTopic] = useSearchParamState<string>("topic", topics, ALL);
  const options = useMemo(
    () => [{ value: ALL, label: blogCopy.allTopics }, ...topics.map((tag) => ({ value: tag, label: tag }))],
    [topics],
  );

  const showAll = topic === ALL;
  const [featured, ...rest] = posts;
  const listed = showAll ? rest : posts.filter((post) => post.tags.includes(topic));
  const showList = !showAll || rest.length > 0;

  return (
    <div className="flex flex-col gap-8 sm:gap-12">
      {featured && showAll && <FeaturedPost post={featured} />}

      <div className={cn("flex flex-col gap-4 border-t border-separator pt-6 sm:gap-8 sm:pt-12", !showList && "hidden")}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[18px] font-semibold tracking-[-0.02em] sm:text-[22px]">{blogCopy.articles}</h2>
          {topics.length > 1 && (
            <Segmented
              label={blogCopy.topicFilterLabel}
              value={topic}
              options={options}
              onChange={setTopic}
              layout="chips"
              className="max-sm:hidden"
            />
          )}
        </div>
        {topics.length > 1 && (
          <SelectSheet
            label={blogCopy.topicLabel}
            value={topic}
            options={options}
            onChange={setTopic}
            closeLabel={blogCopy.topicClose}
            className="sm:hidden"
          />
        )}
        {listed.length > 0 ? (
          <PostGrid key={topic} posts={listed} />
        ) : (
          <p className="py-10 text-center text-[14.5px] text-secondary">
            {blogCopy.noMatches}
          </p>
        )}
      </div>
    </div>
  );
}
