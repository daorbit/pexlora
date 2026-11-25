import { cn } from "@/lib/utils/cn";

const SEGMENTS = Array.from({ length: 20 }, (_, index) => index);
const BULB_POSITIONS = ["left-[30%]", "left-[70%]"];

const bulbTones = [
  "bg-festive-red",
  "bg-primary [--twinkle-delay:-0.8s]",
  "bg-festive-gold [--twinkle-delay:-1.6s]",
];

export function LightString() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-full flex overflow-hidden">
      {SEGMENTS.map((segment) => (
        <span key={segment} className="relative h-3 min-w-20 flex-1">
          <svg viewBox="0 0 100 8" preserveAspectRatio="none" className="block h-2 w-full text-border-strong">
            <path d="M0 0Q50 10 100 0" fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke" />
          </svg>
          {BULB_POSITIONS.map((position, index) => (
            <span
              key={position}
              className={cn(
                "absolute top-1 h-1.75 w-1.25 rounded-full motion-safe:animate-twinkle",
                position,
                bulbTones[(segment * BULB_POSITIONS.length + index) % bulbTones.length],
              )}
            />
          ))}
        </span>
      ))}
    </div>
  );
}
