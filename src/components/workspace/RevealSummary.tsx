import { Camera, Clock, UserRound } from "lucide-react";
import type { IconComponent } from "@/components/icons/types";
import { AiTagIcon } from "@/components/icons/AiTagIcon";
import { revealCopy } from "@/content/workspace";
import { revealFacts, type RevealKind } from "@/lib/metadata/reveals";
import type { MetadataReport } from "@/lib/metadata/types";
import { cn } from "@/lib/utils/cn";

const icons: Record<RevealKind, IconComponent> = {
  ai: AiTagIcon,
  camera: Camera,
  author: UserRound,
  date: Clock,
};

export function RevealSummary({ report, removed }: { report: MetadataReport; removed: boolean }) {
  const facts = revealFacts(report);
  if (!facts.length) return null;

  return (
    <section className="flex flex-col gap-2 rounded-2xl bg-background p-3">
      <h4 className="px-1 text-[11px] font-medium tracking-wide text-secondary uppercase">
        {removed ? revealCopy.removedTitle : revealCopy.title}
      </h4>
      <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {facts.map((fact) => {
          const Icon = icons[fact.kind];
          return (
            <li key={fact.kind} className="flex min-w-0 items-center gap-2.5 rounded-xl bg-surface px-3 py-2">
              <Icon className={cn("size-4 shrink-0", fact.kind === "ai" ? "text-warning" : "text-secondary")} />
              <span className="shrink-0 text-[12.5px] text-secondary">{revealCopy.labels[fact.kind]}</span>
              <span
                className={cn(
                  "min-w-0 truncate text-[13px] font-medium",
                  removed && "text-tertiary line-through decoration-primary decoration-2",
                )}
              >
                {fact.value}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
