import { blogCopy } from "@/content/blog";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";

export function PostFooter({ tags, url }: { tags: string[]; url: string }) {
  return (
    <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-separator pt-6 sm:mt-14">
      {tags.length > 0 ? (
        <ul aria-label={blogCopy.post.tags} className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li key={tag}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
      ) : (
        <span />
      )}
      <CopyButton value={url} label={blogCopy.post.copyLink} />
    </footer>
  );
}
