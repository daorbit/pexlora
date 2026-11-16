import "server-only";
import sharp, { type SharpOptions } from "sharp";
import { MAX_INPUT_PIXELS } from "@/config/security";

export function openImage(input: Buffer, options: SharpOptions = {}) {
  return sharp(input, { limitInputPixels: MAX_INPUT_PIXELS, ...options });
}
