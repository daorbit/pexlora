import { cn } from "@/lib/utils/cn";

export function SnowDrift({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 32"
      preserveAspectRatio="none"
      className={cn("pointer-events-none block w-full", className)}
      aria-hidden
    >
      <path d="M0 32V15C110 2 250 5 390 14S690 27 850 12S1090 3 1200 15V32Z" />
    </svg>
  );
}
