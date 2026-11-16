export async function readBytes(blob: Blob, start = 0, end = blob.size) {
  return new Uint8Array(await blob.slice(start, Math.min(end, blob.size)).arrayBuffer());
}

export function view(bytes: Uint8Array) {
  return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}

export function ascii(bytes: Uint8Array, start: number, length: number) {
  let text = "";
  for (let index = start; index < start + length && index < bytes.length; index += 1) {
    text += String.fromCharCode(bytes[index]);
  }
  return text;
}

export function writeAscii(bytes: Uint8Array, offset: number, text: string) {
  for (let index = 0; index < text.length; index += 1) bytes[offset + index] = text.charCodeAt(index);
}

export function u64be(bytes: Uint8Array, offset: number) {
  return Number(view(bytes).getBigUint64(offset));
}

export function decodeText(bytes: Uint8Array, encoding = "utf-8") {
  return new TextDecoder(encoding).decode(bytes).replace(/\0+$/, "");
}

export function fixedText(bytes: Uint8Array) {
  const end = bytes.indexOf(0);
  return decodeText(end === -1 ? bytes : bytes.subarray(0, end), "latin1").trim();
}

export function indexOfBytes(bytes: Uint8Array, needle: Uint8Array, from = 0) {
  outer: for (let index = from; index <= bytes.length - needle.length; index += 1) {
    for (let offset = 0; offset < needle.length; offset += 1) {
      if (bytes[index + offset] !== needle[offset]) continue outer;
    }
    return index;
  }
  return -1;
}

export function containsAscii(bytes: Uint8Array, text: string) {
  return indexOfBytes(bytes, new TextEncoder().encode(text)) !== -1;
}

export function isPrintable(bytes: Uint8Array) {
  if (!bytes.length) return false;
  let printable = 0;
  for (const byte of bytes) if ((byte >= 32 && byte < 127) || byte === 9 || byte === 10 || byte === 13 || byte >= 160) printable += 1;
  return printable / bytes.length > 0.9;
}

export function zeros(length: number) {
  return new Uint8Array(length);
}
