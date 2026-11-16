import { useId } from "react";
import { cn } from "@/lib/utils/cn";

const RAYS = Array.from({ length: 8 }, (_, index) => index * 45);
const morph = "transition-[scale,translate,rotate,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

export function SunMoonIcon({ moon, className }: { moon: boolean; className?: string }) {
  const maskId = useId();

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
        <rect width="64" height="64" fill="#fff" />
        <circle
          cx="78"
          cy="-14"
          r="18"
          fill="#000"
          className={cn(morph, moon ? "-translate-x-8 translate-y-8" : "translate-0")}
        />
      </mask>
      <g
        className={cn(morph, "origin-center transform-fill", moon ? "scale-50 rotate-90 opacity-0" : "opacity-100")}
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      >
        {RAYS.map((angle) => (
          <line key={angle} x1="32" y1="6" x2="32" y2="12" transform={`rotate(${angle} 32 32)`} />
        ))}
      </g>
      <g mask={`url(#${maskId})`}>
        <circle
          cx="32"
          cy="32"
          r="22"
          fill="currentColor"
          className={cn(morph, "origin-center transform-fill", moon ? "scale-100" : "scale-50")}
        />
      </g>
    </svg>
  );
}
