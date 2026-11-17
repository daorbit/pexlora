const JFIF_SIGNATURE = [0x4a, 0x46, 0x49, 0x46, 0x00];
const DOTS_PER_INCH = 1;

function hasJfifHeader(bytes: Uint8Array) {
  const app0 = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff && bytes[3] === 0xe0;
  return app0 && JFIF_SIGNATURE.every((value, index) => bytes[6 + index] === value);
}

export async function withJpegDpi(blob: Blob, dpi: number) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  if (!hasJfifHeader(bytes)) return blob;
  bytes[13] = DOTS_PER_INCH;
  bytes[14] = bytes[16] = dpi >> 8;
  bytes[15] = bytes[17] = dpi & 0xff;
  return new Blob([bytes as BlobPart], { type: "image/jpeg" });
}
