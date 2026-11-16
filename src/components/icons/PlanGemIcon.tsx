import type { SVGProps } from "react";

export type PlanGem = "rhombus" | "brilliant" | "crown";

const facet = { fill: "none", stroke: "var(--tone)", strokeWidth: 1.4, strokeLinejoin: "round" as const };

const shapes: Record<PlanGem, { body: string; facets: string }> = {
  rhombus: {
    body: "M12 2.5 19.5 12 12 21.5 4.5 12Z",
    facets: "M4.5 12h15M12 2.5v19M8.25 7.25 12 12l3.75-4.75",
  },
  brilliant: {
    body: "M6.5 4h11l4.5 5.5L12 21 2 9.5Z",
    facets: "M2 9.5h20M9.5 4 7.5 9.5 12 21l4.5-11.5-2-5.5M7.5 9.5 12 4l4.5 5.5",
  },
  crown: {
    body: "M3 7.5 7.75 12 12 4.5l4.25 7.5L21 7.5 19 18H5Z",
    facets: "M5.6 15h12.8M12 4.5V15",
  },
};

export function PlanGemIcon({ gem, ...props }: SVGProps<SVGSVGElement> & { gem: PlanGem }) {
  const { body, facets } = shapes[gem];

  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d={body} fill="currentColor" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d={facets} {...facet} />
    </svg>
  );
}
