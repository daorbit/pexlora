import { cn } from "@/lib/utils/cn";

export function StrikeText({ text, className }: { text: string; className?: string }) {
  return (
    <p className={cn("relative w-fit whitespace-nowrap", className)}>
      <span className="motion-safe:animate-strike-ghost">{text}</span>
      <span
        className="absolute inset-x-[-1%] top-1/2 h-1 -mt-0.5 rounded-full bg-primary motion-safe:animate-strike-sweep lg:h-2 lg:-mt-1"
        aria-hidden
      />
    </p>
  );
}
