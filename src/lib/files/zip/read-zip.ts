import { ZIP_PARALLEL_READS } from "@/config/limits";
import { previewType } from "@/lib/files/preview-kind";
import { runPool } from "@/lib/utils/run-pool";

export type ZipEntry = { name: string; blob: Blob };

export async function readZip(blob: Blob, onProgress?: (done: number, total: number) => void): Promise<ZipEntry[]> {
  const { default: JSZip } = await import("jszip");
  const zip = await JSZip.loadAsync(blob);
  const files = Object.values(zip.files).filter((entry) => !entry.dir);
  const entries: ZipEntry[] = new Array(files.length);
  let done = 0;

  await runPool([...files.keys()], ZIP_PARALLEL_READS, async (index) => {
    const { name } = files[index];
    const data = await files[index].async("blob");
    entries[index] = { name, blob: new Blob([data], { type: previewType(data, name) }) };
    done += 1;
    onProgress?.(done, files.length);
  });

  return entries;
}
