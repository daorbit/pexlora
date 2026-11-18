import { ChevronDown } from "lucide-react";
import { blogCopy } from "@/content/blog";
import type { PostHeading } from "@/lib/blog/types";
import { TableOfContents } from "@/components/ui/TableOfContents";

const MIN_SECTIONS = 3;

function toItems(headings: PostHeading[]) {
  const sections = headings.filter((heading) => heading.level === 2);
  const shown = sections.length >= MIN_SECTIONS ? sections : headings;
  return shown.map((heading) => ({ id: heading.id, label: heading.text, nested: heading.level === 3 }));
}

export function PostContentsDrawer({ headings }: { headings: PostHeading[] }) {
  if (headings.length < 2) return null;
  return (
    <details className="group mb-7 rounded-[22px] bg-surface shadow-card lg:hidden">
      <summary className="flex h-12 list-none items-center justify-between px-4 text-[14px] font-semibold">
        {blogCopy.post.contents}
        <ChevronDown className="size-4 text-secondary transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <TableOfContents
        label={blogCopy.post.contents}
        items={toItems(headings)}
        className="px-4 pb-4 [&>p]:sr-only"
      />
    </details>
  );
}

export function PostContentsRail({ headings }: { headings: PostHeading[] }) {
  if (headings.length < 2) return null;
  return <TableOfContents label={blogCopy.post.contents} items={toItems(headings)} />;
}
