import { queueCopy } from "@/content/workspace";
import { cn } from "@/lib/utils/cn";
import { barWidth } from "@/components/ui/bar-widths";

export function BatchProgress({ done, total, className }: { done: number; total: number; className?: string }) {
  if (!total) return null;

  return (
    <div className={cn("flex flex-col gap-1.5 motion-safe:animate-fade-in", className)} role="status">
      <div className="flex items-center justify-between text-xs text-secondary">
        <span>{queueCopy.working(done, total)}</span>
        <span className="tabular-nums">{Math.round((done / total) * 100)}%</span>
      </div>
      <span className="relative h-1.5 overflow-hidden rounded-full bg-fill-strong" aria-hidden>
        <span className={cn("absolute inset-y-0 left-0 rounded-full bg-foreground transition-[width] duration-500", barWidth((done / total) * 100))} />
        <span className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-primary/70 motion-safe:animate-progress" />
      </span>
    </div>
  );
}
