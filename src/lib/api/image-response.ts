import "server-only";
import { FORMAT_MIME_TYPES, type OutputFormat } from "@/lib/image/formats";

type ImageResponseOptions = {
  buffer: Buffer;
  format: OutputFormat;
  fileName: string;
  quotaRemaining: number | null;
  leftoverTags?: number;
};

export function imageResponse({
  buffer,
  format,
  fileName,
  quotaRemaining,
  leftoverTags,
}: ImageResponseOptions) {
  const headers = new Headers({
    "Content-Type": FORMAT_MIME_TYPES[format],
    "Cache-Control": "no-store",
    "X-File-Name": encodeURIComponent(fileName),
  });

  if (quotaRemaining !== null) headers.set("X-Quota-Remaining", String(quotaRemaining));
  if (leftoverTags !== undefined) headers.set("X-Leftover-Tags", String(leftoverTags));

  return new Response(new Uint8Array(buffer), { headers });
}
