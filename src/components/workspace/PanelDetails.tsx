import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function PanelDetails({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details open className="group/details">
      <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="size-4 text-secondary transition-transform group-open/details:rotate-180" aria-hidden />
      </summary>
      <div className="pb-3">{children}</div>
    </details>
  );
}
