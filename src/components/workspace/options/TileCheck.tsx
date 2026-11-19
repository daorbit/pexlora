import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function TileCheck({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute flex items-center justify-center rounded-full bg-primary text-primary-foreground motion-safe:animate-pop",
        className,
      )}
    >
      <Check className="size-[70%]" strokeWidth={3.2} />
    </span>
  );
}
