import { cn } from "@/lib/utils/cn";
import { ChristmasTreeIcon } from "@/components/icons/ChristmasTreeIcon";

const treeSizes = ["size-6", "size-9", "size-7"];

export function TreeCluster({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute bottom-0 hidden items-end lg:flex", className)}>
      {treeSizes.map((size) => (
        <ChristmasTreeIcon key={size} className={cn("shrink-0", size)} />
      ))}
    </span>
  );
}
