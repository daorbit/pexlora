"use client";

import { optionsCopy } from "@/content/workspace";
import { useImagePreview } from "@/hooks/useImagePreview";
import { sheetCells, type SheetCell, type SheetLayout } from "@/lib/files/convert/sheet-layout";

const CUT_LINE = 0.35;

function Silhouette({ x, y, width, height }: SheetCell) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} className="fill-black/[0.06]" />
      <circle cx={x + width / 2} cy={y + height * 0.4} r={width * 0.2} className="fill-black/20" />
      <path
        d={`M${x + width * 0.14} ${y + height}C${x + width * 0.14} ${y + height * 0.66} ${x + width * 0.86} ${y + height * 0.66} ${x + width * 0.86} ${y + height}Z`}
        className="fill-black/20"
      />
    </g>
  );
}

export function SheetPreview({ layout, file }: { layout: SheetLayout; file?: File }) {
  const photo = useImagePreview(file);
  const { sheet } = layout;

  return (
    <svg
      viewBox={`0 0 ${sheet.width} ${sheet.height}`}
      role="img"
      aria-label={optionsCopy.passportPreview}
      className="max-h-64 w-auto max-w-full drop-shadow-md sm:max-h-80"
    >
      <rect width={sheet.width} height={sheet.height} rx={1.5} className="fill-white" />
      {sheetCells(layout).map((cell, index) => (
        <g key={index}>
          {photo ? (
            <image href={photo.url} preserveAspectRatio="xMidYMid slice" {...cell} />
          ) : (
            <Silhouette {...cell} />
          )}
          <rect {...cell} fill="none" strokeWidth={CUT_LINE} className="stroke-black/25" />
        </g>
      ))}
    </svg>
  );
}
