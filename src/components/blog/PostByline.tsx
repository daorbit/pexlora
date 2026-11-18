import { blogCopy } from "@/content/blog";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/format-date";

type PostBylineProps = {
  date: string;
  readingMinutes?: number;
  className?: string;
};

export function PostByline({ date, readingMinutes, className }: PostBylineProps) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-tertiary sm:text-[13px]", className)}>
      <time dateTime={date}>{formatDate(date)}</time>
      {readingMinutes && (
        <>
          <span aria-hidden className="size-1 rounded-full bg-border-strong" />
          <span>{blogCopy.minRead(readingMinutes)}</span>
        </>
      )}
    </p>
  );
}
