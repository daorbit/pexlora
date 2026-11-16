import "server-only";
import { FORMAT_MIME_TYPES, type OutputFormat } from "@/lib/image/formats";

type ImageResponseOptions = {
  buffer: Buffer;
  format: OutputFormat;
  fileName: string;
  quotaRemaining: number | null;
  leftoverTags?: number;
  width?: number;
  height?: number;
};

export function imageResponse({
  buffer,
  format,
  fileName,
  quotaRemaining,
  leftoverTags,
  width,
  height,
}: ImageResponseOptions) {
  const headers = new Headers({
    "Content-Type": FORMAT_MIME_TYPES[format],
    "Cache-Control": "no-store",
    "X-File-Name": encodeURIComponent(fileName),
  });

  if (quotaRemaining !== null) headers.set("X-Quota-Remaining", String(quotaRemaining));
  if (leftoverTags !== undefined) headers.set("X-Leftover-Tags", String(leftoverTags));
  if (width !== undefined && height !== undefined) {
    headers.set("X-Image-Width", String(width));
    headers.set("X-Image-Height", String(height));
  }

  return new Response(new Uint8Array(buffer), { headers });
}
