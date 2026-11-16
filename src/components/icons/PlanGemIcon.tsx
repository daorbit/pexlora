import { useId, type SVGProps } from "react";

export type PlanGem = "rose" | "lime" | "amber";

const gradients: Record<PlanGem, readonly [string, string]> = {
  rose: ["#ffb07a", "#ff2e7e"],
  lime: ["#e4ff6a", "#14b866"],
  amber: ["#ffe07a", "#f07000"],
};

const facetStyles = {
  light: { stroke: "#ffffff", strokeOpacity: 0.75 },
  dark: { stroke: "#10120d", strokeOpacity: 0.45 },
};

const OUTLINE = "M14 10h20l8 9-18 21L6 19Z";
const FACETS = "M6 19h36M14 10l5 9 5-9 5 9 5-9M19 19l5 21M29 19l-5 21";

type PlanGemIconProps = SVGProps<SVGSVGElement> & { gem: PlanGem; facets?: keyof typeof facetStyles };

export function PlanGemIcon({ gem, facets = "light", ...props }: PlanGemIconProps) {
  const gradientId = useId();
  const [from, to] = gradients[gem];

  return (
    <svg viewBox="0 0 48 48" aria-hidden {...props}>
      <defs>
        <linearGradient id={gradientId} x1="6" y1="10" x2="42" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <path d={OUTLINE} fill={`url(#${gradientId})`} />
      <path d={FACETS} fill="none" strokeWidth="1.4" strokeLinejoin="round" {...facetStyles[facets]} />
    </svg>
  );
}
