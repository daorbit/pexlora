import { cn } from "@/lib/utils/cn";

export function UsageBar({ used, limit, className }: { used: number; limit: number; className?: string }) {
  const percent = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 100;
  return (
    <progress
      value={percent}
      max={100}
      aria-label={`${percent}% of daily limit used`}
      className={cn(
        "h-1.5 w-full appearance-none overflow-hidden rounded-full [&::-moz-progress-bar]:bg-foreground [&::-webkit-progress-bar]:bg-fill [&::-webkit-progress-value]:bg-foreground",
        className,
      )}
    />
  );
}
