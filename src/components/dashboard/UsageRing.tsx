const RADIUS = 14;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function UsageRing({ used, limit }: { used: number; limit: number }) {
  const share = limit > 0 ? Math.min(1, used / limit) : 0;
  const filled = Math.max(share * CIRCUMFERENCE, used > 0 ? 3 : 0);

  return (
    <svg viewBox="0 0 36 36" className="size-9 shrink-0 -rotate-90" aria-hidden>
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
