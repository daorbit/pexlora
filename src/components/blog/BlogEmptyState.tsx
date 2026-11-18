import { NotebookPen } from "lucide-react";
import { allToolsHref } from "@/config/tool-hub";
import { blogCopy } from "@/content/blog";
import { ButtonLink } from "@/components/ui/Button";

export function BlogEmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl bg-surface px-6 py-12 text-center shadow-card sm:py-16">
      <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <NotebookPen className="size-5" aria-hidden />
      </span>
      <h2 className="text-[20px] font-semibold tracking-[-0.02em] sm:text-[24px]">{blogCopy.empty.title}</h2>
      <p className="max-w-md text-[14.5px] leading-relaxed text-secondary sm:text-base">{blogCopy.empty.body}</p>
      <ButtonLink href={allToolsHref()} variant="ink" arrow className="mt-2">
        {blogCopy.empty.action}
      </ButtonLink>
    </div>
  );
}
