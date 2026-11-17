import { optionsCopy } from "@/content/workspace";
import { WATERMARK_OPACITY_VALUES, type WatermarkOptions } from "@/lib/image/options";
import { PREVIEW_TEXT_UNIT_WIDTH, watermarkPlacements } from "@/lib/files/pdf/watermark-layout";
import { PAPER, PaperPage } from "@/components/workspace/stage/PaperPage";

export function WatermarkPreview({ text, layout, opacity }: WatermarkOptions) {
  const value = text.trim() || optionsCopy.watermarkPlaceholder;
  const unitWidth = value.length * PREVIEW_TEXT_UNIT_WIDTH;
  const placements = watermarkPlacements(PAPER.width, PAPER.height, unitWidth, layout);

  return (
    <PaperPage>
      <svg
        viewBox={`0 0 ${PAPER.width} ${PAPER.height}`}
        role="img"
        aria-label={optionsCopy.watermarkPreview}
        className="absolute inset-0 size-full"
      >
        {placements.map(({ x, y, angle, size }, index) => {
          const top = PAPER.height - y;
          return (
            <text
              key={index}
              x={x}
              y={top}
              fontSize={size}
              fillOpacity={WATERMARK_OPACITY_VALUES[opacity]}
              textAnchor="middle"
              dominantBaseline="central"
              transform={`rotate(${-angle} ${x} ${top})`}
              className="fill-neutral-500 font-sans font-bold transition-all duration-300"
            >
              {value}
            </text>
          );
        })}
      </svg>
    </PaperPage>
  );
}
