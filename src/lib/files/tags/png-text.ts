import { decodeText } from "@/lib/files/bytes";
import { pngChunks } from "@/lib/image/chunks";

export type PngText = { keyword: string; text: string };

export const PNG_XMP_KEYWORD = "XML:com.adobe.xmp";

async function inflate(data: Uint8Array) {
  const stream = new Blob([data as BlobPart]).stream().pipeThrough(new DecompressionStream("deflate"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

function splitAt(bytes: Uint8Array, from = 0) {
  const end = bytes.indexOf(0, from);
  return end === -1 ? [bytes.subarray(from), new Uint8Array()] : [bytes.subarray(from, end), bytes.subarray(end + 1)];
}

async function readChunk(type: string, data: Uint8Array): Promise<PngText | null> {
  const [keywordBytes, rest] = splitAt(data);
  const keyword = decodeText(keywordBytes, "latin1");

  if (type === "tEXt") return { keyword, text: decodeText(rest, "latin1") };
  if (type === "zTXt") return { keyword, text: decodeText(await inflate(rest.subarray(1)), "latin1") };

  const compressed = rest[0] === 1;
  const [, afterLanguage] = splitAt(rest, 2);
  const [, text] = splitAt(afterLanguage);
  return { keyword, text: decodeText(compressed ? await inflate(text) : text) };
}

export async function readPngText(bytes: Uint8Array): Promise<PngText[]> {
  const results: PngText[] = [];
  for (const chunk of pngChunks(bytes)) {
    if (chunk.type !== "tEXt" && chunk.type !== "zTXt" && chunk.type !== "iTXt") continue;
    try {
      const entry = await readChunk(chunk.type, bytes.subarray(chunk.start + 8, chunk.end - 4));
      if (entry) results.push(entry);
    } catch {
      continue;
    }
  }
  return results;
}
