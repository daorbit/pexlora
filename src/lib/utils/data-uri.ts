const DATA_URI = /^data:([^;,]+)?((?:;[^;,]+)*?)(;base64)?,([\s\S]*)$/;

export function dataUriToBlob(uri: string) {
  const match = DATA_URI.exec(uri);
  if (!match) throw new Error("Not a data URI");
  const [, type = "application/octet-stream", , base64, payload] = match;
  if (!base64) return new Blob([decodeURIComponent(payload)], { type });
  const binary = atob(payload);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return new Blob([bytes], { type });
}
