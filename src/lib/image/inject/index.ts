import { injectJpeg } from "@/lib/image/inject/jpeg";
import { injectPng } from "@/lib/image/inject/png";
import { injectWebp } from "@/lib/image/inject/webp";
import { losslessByFormat } from "@/lib/image/lossless";

export const injectMetadata = losslessByFormat<[target: Uint8Array, carrier: Uint8Array]>({
  jpeg: injectJpeg,
  png: injectPng,
  webp: injectWebp,
});
