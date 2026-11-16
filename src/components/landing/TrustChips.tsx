import { Check } from "lucide-react";
import { trustChips } from "@/content/landing";
import { cn } from "@/lib/utils/cn";

export function TrustChips({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-8 gap-y-3 text-[14.5px] font-semibold", className)}>
      {trustChips.map((label) => (
        <li key={label} className="flex items-center gap-2.5">
          <span className="inline-flex size-[22px] items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="size-3" strokeWidth={3.5} aria-hidden />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}
