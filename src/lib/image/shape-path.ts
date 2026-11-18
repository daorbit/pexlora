import type { ImageShape, ShapeCorners, ShapeOptions } from "@/lib/image/options";

type Size = { width: number; height: number };
type Point = [number, number];

export type ShapeFrame = Size & { x: number; y: number };

const CORNER_SHARE: Record<ShapeCorners, number> = { small: 0.06, medium: 0.12, large: 0.22 };
const STAR_POINTS = 5;
const STAR_INNER = 0.42;
const HEART: [string, number[]][] = [
  ["M", [50, 92]],
  ["C", [20, 71, 2, 53, 2, 31]],
  ["C", [2, 15, 14, 4, 28, 4]],
  ["C", [38, 4, 46, 10, 50, 18]],
  ["C", [54, 10, 62, 4, 72, 4]],
  ["C", [86, 4, 98, 15, 98, 31]],
  ["C", [98, 53, 80, 71, 50, 92]],
];

const round = (value: number) => Math.round(value * 100) / 100;

function polygon(points: Point[]) {
  return `M${points.map(([x, y]) => `${round(x)} ${round(y)}`).join("L")}Z`;
}

function regular(side: number, count: number, inner: number | null, offsetY = 0) {
  const radius = side / 2;
  const steps = inner === null ? count : count * 2;
  return polygon(
    Array.from({ length: steps }, (_, index) => {
      const angle = -Math.PI / 2 + (index * 2 * Math.PI) / steps;
      const r = inner !== null && index % 2 === 1 ? radius * inner : radius;
      return [radius + r * Math.cos(angle), radius + offsetY * side + r * Math.sin(angle)];
    }),
  );
}

function roundedRect({ width, height }: Size, corners: ShapeCorners) {
  const r = round(Math.min(width, height) * CORNER_SHARE[corners]);
  return `M${r} 0H${width - r}A${r} ${r} 0 0 1 ${width} ${r}V${height - r}A${r} ${r} 0 0 1 ${width - r} ${height}H${r}A${r} ${r} 0 0 1 0 ${height - r}V${r}A${r} ${r} 0 0 1 ${r} 0Z`;
}

function heart(side: number) {
  const scale = side / 100;
  return `${HEART.map(([command, values]) => command + values.map((value) => round(value * scale)).join(" ")).join("")}Z`;
}

function arch(side: number) {
  const r = side / 2;
  return `M0 ${side}V${r}A${r} ${r} 0 0 1 ${side} ${r}V${side}Z`;
}

const squarePaths: Record<Exclude<ImageShape, "rounded">, (side: number) => string> = {
  circle: (side) => `M0 ${side / 2}A${side / 2} ${side / 2} 0 1 0 ${side} ${side / 2}A${side / 2} ${side / 2} 0 1 0 0 ${side / 2}Z`,
  heart,
  star: (side) => regular(side, STAR_POINTS, STAR_INNER, 0.03),
  hexagon: (side) => regular(side, 6, null),
  arch,
};

export function shapeFrame(shape: ImageShape, source: Size): ShapeFrame {
  if (shape === "rounded") return { x: 0, y: 0, width: source.width, height: source.height };
  const side = Math.min(source.width, source.height);
  return {
    x: Math.round((source.width - side) / 2),
    y: Math.round((source.height - side) / 2),
    width: side,
    height: side,
  };
}

export function shapePath({ shape, corners }: ShapeOptions, size: Size) {
  return shape === "rounded" ? roundedRect(size, corners) : squarePaths[shape](size.width);
}
