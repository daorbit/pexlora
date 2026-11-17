import type { WatermarkLayout } from "@/lib/image/options";

export type WatermarkPlacement = { x: number; y: number; angle: number; size: number };

const GEOMETRY = {
  span: 0.7,
  maxShare: 0.3,
  tileAngle: 30,
  tileShare: 1 / 16,
  tileMin: 14,
  tileMax: 48,
  tileGapEm: 2,
  tileRowEm: 4,
};

export const PREVIEW_TEXT_UNIT_WIDTH = 0.62;

function fittedSize(span: number, unitWidth: number, width: number, height: number) {
  return Math.min((GEOMETRY.span * span) / unitWidth, GEOMETRY.maxShare * Math.min(width, height));
}

function tiledPlacements(width: number, height: number, unitWidth: number, scale: number): WatermarkPlacement[] {
  const size = Math.min(GEOMETRY.tileMax * scale, Math.max(GEOMETRY.tileMin * scale, Math.min(width, height) * GEOMETRY.tileShare));
  const textWidth = unitWidth * size;
  const stepAlong = textWidth + size * GEOMETRY.tileGapEm;
  const stepAcross = size * GEOMETRY.tileRowEm;
  const reach = Math.hypot(width, height) / 2 + textWidth;
  const radians = (GEOMETRY.tileAngle * Math.PI) / 180;
  const [cos, sin] = [Math.cos(radians), Math.sin(radians)];
  const placements: WatermarkPlacement[] = [];

  for (let row = 0, across = -reach; across <= reach; row += 1, across += stepAcross) {
    for (let along = -reach + (row % 2) * (stepAlong / 2); along <= reach; along += stepAlong) {
      const x = width / 2 + along * cos - across * sin;
      const y = height / 2 + along * sin + across * cos;
      if (x < -textWidth || x > width + textWidth || y < -textWidth || y > height + textWidth) continue;
      placements.push({ x, y, angle: GEOMETRY.tileAngle, size });
    }
  }
  return placements;
}

export function watermarkPlacements(
  width: number,
  height: number,
  unitWidth: number,
  layout: WatermarkLayout,
  scale = 1,
): WatermarkPlacement[] {
  if (layout === "tiled") return tiledPlacements(width, height, unitWidth, scale);
  const center = { x: width / 2, y: height / 2 };
  if (layout === "horizontal") return [{ ...center, angle: 0, size: fittedSize(width, unitWidth, width, height) }];
  const angle = (Math.atan2(height, width) * 180) / Math.PI;
  return [{ ...center, angle, size: fittedSize(Math.hypot(width, height), unitWidth, width, height) }];
}
