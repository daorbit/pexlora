import { History } from "lucide-react";
import { routes } from "@/config/site";
import { historyCopy } from "@/content/dashboard";
import { ButtonLink } from "@/components/ui/Button";

export function HistoryEmpty() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[22px] bg-surface px-6 py-14 text-center shadow-card sm:py-20">
      <History className="size-9 stroke-[1.5] text-tertiary" aria-hidden />
      <h2 className="text-[17px] font-semibold tracking-[-0.02em]">{historyCopy.emptyTitle}</h2>
      <p className="max-w-xs text-sm text-secondary">{historyCopy.empty}</p>
      <ButtonLink href={routes.dashboard} variant="ink" size="md" arrow className="mt-2">
        {historyCopy.openTools}
      </ButtonLink>
    </div>
  );
}
