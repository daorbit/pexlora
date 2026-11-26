import { cn } from "@/lib/utils/cn";

type SnowFlakeProps = { className?: string; dotClassName?: string };

export function SnowFlake({ className, dotClassName }: SnowFlakeProps) {
  return (
    <span className={cn("absolute inset-y-0 motion-safe:animate-snow-fall motion-reduce:hidden", className)}>
      <span className="block motion-safe:animate-snow-sway">
        <span className={cn("block rounded-full bg-current", dotClassName)} />
      </span>
    </span>
  );
}
