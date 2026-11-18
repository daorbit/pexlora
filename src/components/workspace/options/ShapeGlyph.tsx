import type { ImageShape, ShapeCorners } from "@/lib/image/options";
import { shapePath } from "@/lib/image/shape-path";

const GLYPH_SIDE = 24;
const ROUNDED_HEIGHT = 18;

export function ShapeGlyph({ shape, corners = "medium" }: { shape: ImageShape; corners?: ShapeCorners }) {
  const height = shape === "rounded" ? ROUNDED_HEIGHT : GLYPH_SIDE;
  const offset = (GLYPH_SIDE - height) / 2;

  return (
    <svg aria-hidden viewBox={`0 0 ${GLYPH_SIDE} ${GLYPH_SIDE}`} className="size-6">
      <path d={shapePath({ shape, corners, background: "transparent" }, { width: GLYPH_SIDE, height })} transform={`translate(0 ${offset})`} className="fill-current" />
    </svg>
  );
}
