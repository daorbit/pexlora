import { cn } from "@/lib/utils/cn";

export function PostTopic({ tag, className }: { tag?: string; className?: string }) {
  if (!tag) return null;
  return (
    <span className={cn("font-mono text-[11px] font-medium tracking-[0.08em] text-accent-text uppercase", className)}>
      {tag}
    </span>
  );
}
