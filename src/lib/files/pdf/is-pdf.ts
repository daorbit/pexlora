export function isPdfBlob(blob: Blob, name = "") {
  return blob.type === "application/pdf" || /\.pdf$/i.test(name);
}
