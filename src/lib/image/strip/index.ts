import { losslessByFormat } from "@/lib/image/lossless";
import { stripJpeg } from "@/lib/image/strip/jpeg";
import { stripPng } from "@/lib/image/strip/png";
import { stripWebp } from "@/lib/image/strip/webp";

export const stripLossless = losslessByFormat<[bytes: Uint8Array]>({
  jpeg: stripJpeg,
  png: stripPng,
  webp: stripWebp,
});
