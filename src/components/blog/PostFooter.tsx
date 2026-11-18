import { blogCopy } from "@/content/blog";
import { formatDate } from "@/lib/utils/format-date";
import type { PostMeta } from "@/lib/blog/types";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { PostAuthorAvatar } from "@/components/blog/PostAuthorAvatar";

type PostFooterProps = { post: Pick<PostMeta, "tags" | "author" | "updated">; url: string };

export function PostFooter({ post, url }: PostFooterProps) {
  return (
    <footer className="mt-10 flex flex-col gap-5 border-t border-separator pt-6 sm:mt-14">
      {post.tags.length > 0 && (
        <ul aria-label={blogCopy.post.tags} className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <PostAuthorAvatar name={post.author.name} size="md" />
          <div className="flex flex-col">
            <span className="text-[12px] text-tertiary">{blogCopy.post.writtenBy}</span>
            <span className="text-[14px] font-semibold" translate="no">
              {post.author.name}
            </span>
          </div>
          <span aria-hidden className="mx-1 h-8 w-px bg-separator" />
          <div className="flex flex-col">
            <span className="text-[12px] text-tertiary">{blogCopy.post.updated}</span>
            <time dateTime={post.updated} className="text-[14px] font-semibold">
              {formatDate(post.updated)}
            </time>
          </div>
        </div>
        <CopyButton value={url} label={blogCopy.post.copyLink} />
      </div>
    </footer>
  );
}
