import { PHOTO_SIGN_LAYOUT } from "@/config/limits";
import { createCanvas } from "@/lib/files/convert/canvas-cover";
import { decodeImage } from "@/lib/files/convert/image-decode";
import { largestJpegUnder } from "@/lib/files/convert/jpeg-fit";
import { UnreadableFileError } from "@/lib/files/processors/types";
import type { PhotoSignOptions } from "@/lib/image/options";

type Box = { x: number; y: number; width: number; height: number };

export type PhotoSignResult = { blob: Blob; width: number; height: number; met: boolean };

const { gap, padding, signatureShare, shrinkStep, minSide } = PHOTO_SIGN_LAYOUT;

function fit(source: ImageBitmap, maxWidth: number, maxHeight: number) {
  const scale = Math.min(maxWidth / source.width, maxHeight / source.height);
  return { width: Math.round(source.width * scale), height: Math.round(source.height * scale) };
}

function arrange(photo: ImageBitmap, signature: ImageBitmap, layout: PhotoSignOptions["layout"], side: number) {
  if (layout === "below") {
    const photoSize = fit(photo, side, side);
    const signSize = fit(signature, photoSize.width, photoSize.height * signatureShare);
    const width = photoSize.width + padding * 2;
    const height = photoSize.height + gap + signSize.height + padding * 2;
    const photoBox: Box = { x: padding, y: padding, ...photoSize };
    const signBox: Box = { x: (width - signSize.width) / 2, y: padding + photoSize.height + gap, ...signSize };
    return { width, height, photoBox, signBox };
  }
  const photoSize = fit(photo, side, side);
  const signSize = fit(signature, photoSize.width * 1.5, photoSize.height * signatureShare);
  const width = photoSize.width + gap + signSize.width + padding * 2;
  const height = photoSize.height + padding * 2;
  const photoBox: Box = { x: padding, y: padding, ...photoSize };
  const signBox: Box = { x: padding + photoSize.width + gap, y: (height - signSize.height) / 2, ...signSize };
  return { width, height, photoBox, signBox };
}

function draw(photo: ImageBitmap, signature: ImageBitmap, layout: PhotoSignOptions["layout"], side: number) {
  const plan = arrange(photo, signature, layout, side);
  const { canvas, context } = createCanvas({ width: plan.width, height: plan.height });
  context.drawImage(photo, plan.photoBox.x, plan.photoBox.y, plan.photoBox.width, plan.photoBox.height);
  context.drawImage(signature, plan.signBox.x, plan.signBox.y, plan.signBox.width, plan.signBox.height);
  return canvas;
}

export async function joinPhotoAndSignature(files: File[], options: PhotoSignOptions): Promise<PhotoSignResult> {
  if (files.length !== 2) throw new UnreadableFileError("Add exactly two images: your photo first, then your signature.");
  const [photo, signature] = await Promise.all(files.map((file) => decodeImage(file)));
  try {
    const maxBytes = Number(options.maxKb) * 1024;
    let side = Math.min(PHOTO_SIGN_LAYOUT.maxSide, Math.max(photo.width, photo.height));
    let canvas = draw(photo, signature, options.layout, side);
    let blob = await largestJpegUnder(canvas, maxBytes);

    while (blob.size > maxBytes && side > minSide) {
      side = Math.round(side * shrinkStep);
      canvas = draw(photo, signature, options.layout, side);
      blob = await largestJpegUnder(canvas, maxBytes);
    }

    return { blob, width: canvas.width, height: canvas.height, met: blob.size <= maxBytes };
  } finally {
    photo.close();
    signature.close();
  }
}
