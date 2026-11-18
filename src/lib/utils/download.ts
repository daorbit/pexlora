export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function uniqueName(name: string, used: Set<string>) {
  let candidate = name;
  let index = 1;
  while (used.has(candidate)) {
    const dot = name.lastIndexOf(".");
    candidate = `${name.slice(0, dot)}-${index}${name.slice(dot)}`;
    index += 1;
  }
  used.add(candidate);
  return candidate;
}

export async function createZip(files: { blob: Blob; name: string }[]) {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  const used = new Set<string>();
  files.forEach((file) => zip.file(uniqueName(file.name, used), file.blob));
  return zip.generateAsync({ type: "blob", mimeType: "application/zip" });
}

const DOWNLOAD_GAP_MS = 250;

export async function downloadEach(files: { blob: Blob; name: string }[]) {
  for (const file of files) {
    downloadBlob(file.blob, file.name);
    await new Promise((resolve) => setTimeout(resolve, DOWNLOAD_GAP_MS));
  }
}

export async function downloadZip(files: { blob: Blob; name: string }[], zipName: string) {
  downloadBlob(await createZip(files), zipName);
}
