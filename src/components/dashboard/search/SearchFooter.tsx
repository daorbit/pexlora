import { ArrowDown, ArrowUp, CornerDownLeft } from "lucide-react";
import { shellCopy } from "@/content/dashboard";
import { Kbd } from "@/components/ui/Kbd";

const iconClass = "size-3";

export function SearchFooter({ count }: { count: number }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-separator bg-background/60 px-4 py-2.5 text-[12px] text-secondary max-sm:hidden">
      <span aria-live="polite">{shellCopy.resultCount(count)}</span>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <Kbd>
            <ArrowUp className={iconClass} aria-hidden />
          </Kbd>
          <Kbd>
            <ArrowDown className={iconClass} aria-hidden />
          </Kbd>
          {shellCopy.hintNavigate}
        </span>
        <span className="flex items-center gap-1.5">
          <Kbd>
            <CornerDownLeft className={iconClass} aria-hidden />
          </Kbd>
          {shellCopy.hintOpen}
        </span>
        <span className="flex items-center gap-1.5">
          <Kbd>{shellCopy.escKey}</Kbd>
          {shellCopy.hintClose}
        </span>
      </div>
    </div>
  );
}
