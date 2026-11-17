import { previewType } from "@/lib/files/preview-kind";

export type ZipEntry = { name: string; blob: Blob };

export async function readZip(blob: Blob): Promise<ZipEntry[]> {
  const { default: JSZip } = await import("jszip");
  const zip = await JSZip.loadAsync(blob);
  const files = Object.values(zip.files).filter((entry) => !entry.dir);

  return Promise.all(
    files.map(async (entry) => {
      const data = await entry.async("blob");
      return { name: entry.name, blob: new Blob([data], { type: previewType(data, entry.name) }) };
    }),
  );
}
