import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { resultPreviewCopy } from "@/content/workspace";
import { textLinkClass } from "@/components/ui/text-link-styles";

type PreviewFrameProps = {
  name: string;
  url: string;
  label?: ReactNode;
  children: ReactNode;
};

export function PreviewFrame({ name, url, label, children }: PreviewFrameProps) {
  return (
    <section className="flex flex-col gap-2.5" aria-label={resultPreviewCopy.title(name)}>
      <div className="flex items-center justify-between gap-2 px-1">
        <span className="min-w-0 truncate text-[13px] font-semibold text-secondary tabular-nums">{label}</span>
        <a href={url} target="_blank" rel="noopener" className={textLinkClass}>
          {resultPreviewCopy.openFull}
          <ExternalLink className="size-3.5" aria-hidden />
        </a>
      </div>
      {children}
    </section>
  );
}
