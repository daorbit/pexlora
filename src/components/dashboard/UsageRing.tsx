import { cn } from "@/lib/utils/cn";

const RADIUS = 14;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function UsageRing({ used, limit, className }: { used: number; limit: number; className?: string }) {
  const share = limit > 0 ? Math.min(1, used / limit) : 0;
  const filled = Math.max(share * CIRCUMFERENCE, used > 0 ? 3 : 0);

  return (
    <svg viewBox="0 0 36 36" className={cn("size-9 shrink-0 -rotate-90", className)} aria-hidden>
      <circle cx="18" cy="18" r={RADIUS} fill="none" strokeWidth="5" className="stroke-fill-strong" />
      <circle
        cx="18"
        cy="18"
        r={RADIUS}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${CIRCUMFERENCE}`}
        className="stroke-primary"
      />
    </svg>
  );
}
