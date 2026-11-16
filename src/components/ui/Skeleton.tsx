import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";

export function Skeleton({ className }: { className?: string }) {
  return <span aria-hidden className={cn("block rounded-lg bg-fill-strong motion-safe:animate-pulse", className)} />;
}

type SkeletonCardProps = { lines?: number; className?: string };

const lineWidths = ["w-2/5", "w-4/5", "w-3/5", "w-2/3", "w-1/2"];

export function SkeletonCard({ lines = 3, className }: SkeletonCardProps) {
  return (
    <Card aria-hidden className={cn("flex flex-col gap-3.5 p-5", className)}>
      <Skeleton className="h-4 w-1/3" />
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton key={index} className={cn("h-3", lineWidths[index % lineWidths.length])} />
      ))}
    </Card>
  );
}
