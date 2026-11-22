import { degrees, type Color, type PDFFont, type PDFImage, type PDFPage } from "pdf-lib";

export type PageFrame = {
  box: { x: number; y: number; width: number; height: number };
  rotation: number;
  width: number;
  height: number;
};

export type VisualText = {
  x: number;
  y: number;
  angle: number;
  size: number;
  font: PDFFont;
  color: Color;
  opacity: number;
};

const CAP_HEIGHT = 0.7;

export function pageFrame(page: PDFPage): PageFrame {
  const box = page.getCropBox();
  const rotation = ((Math.round(page.getRotation().angle / 90) * 90) % 360 + 360) % 360;
  const turned = rotation === 90 || rotation === 270;
  return { box, rotation, width: turned ? box.height : box.width, height: turned ? box.width : box.height };
}

function toPagePoint({ box, rotation }: PageFrame, x: number, y: number) {
  switch (rotation) {
    case 90:
      return { x: box.x + box.width - y, y: box.y + x };
    case 180:
      return { x: box.x + box.width - x, y: box.y + box.height - y };
    case 270:
      return { x: box.x + y, y: box.y + box.height - x };
    default:
      return { x: box.x + x, y: box.y + y };
  }
}

export function drawVisualText(page: PDFPage, frame: PageFrame, text: string, { x, y, angle, ...style }: VisualText) {
  const point = toPagePoint(frame, x, y);
  page.drawText(text, { ...point, ...style, rotate: degrees(frame.rotation + angle) });
}

export function drawVisualImage(
  page: PDFPage,
  frame: PageFrame,
  image: PDFImage,
  { x, y, width, height }: { x: number; y: number; width: number; height: number },
) {
  const point = toPagePoint(frame, x, y);
  page.drawImage(image, { ...point, width, height, rotate: degrees(frame.rotation) });
}

export function centeredStart(centerX: number, centerY: number, angle: number, textWidth: number, size: number) {
  const radians = (angle * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const lift = (size * CAP_HEIGHT) / 2;
  return {
    x: centerX - (cos * textWidth) / 2 + sin * lift,
    y: centerY - (sin * textWidth) / 2 - cos * lift,
  };
}

export function capHeight(size: number) {
  return size * CAP_HEIGHT;
}
