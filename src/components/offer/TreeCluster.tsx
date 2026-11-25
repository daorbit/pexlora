import { cn } from "@/lib/utils/cn";
import { ChristmasTreeIcon } from "@/components/icons/ChristmasTreeIcon";

const treeSizes = ["size-9", "size-16", "size-11"];

export function TreeCluster({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute hidden items-end xl:flex", className)}>
      {treeSizes.map((size) => (
        <ChristmasTreeIcon key={size} className={cn("shrink-0", size)} />
      ))}
    </span>
  );
}
