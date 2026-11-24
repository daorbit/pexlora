import { FOLDER_PARALLEL_WRITES } from "@/config/limits";
import { safeEntryPaths, safeFolderName } from "@/lib/files/zip/entry-paths";
import type { ZipEntry } from "@/lib/files/zip/read-zip";
import { runPool } from "@/lib/utils/run-pool";

type DirectoryPickerOptions = { id?: string; mode?: "read" | "readwrite"; startIn?: "downloads" };
type DirectoryPicker = (options?: DirectoryPickerOptions) => Promise<FileSystemDirectoryHandle>;

const FATAL_ERRORS = ["NotAllowedError", "QuotaExceededError"];

export type FolderSave = { folder: string; saved: number; failed: number };

function directoryPicker() {
  if (typeof window === "undefined" || !("showDirectoryPicker" in window)) return null;
  return (window.showDirectoryPicker as DirectoryPicker).bind(window);
}

const isNamed = (error: unknown, names: string[]) => error instanceof DOMException && names.includes(error.name);

export const canSaveToFolder = () => directoryPicker() !== null;

export async function pickFolder() {
  try {
    return (await directoryPicker()?.({ id: "pexlora-unzip", mode: "readwrite", startIn: "downloads" })) ?? null;
  } catch (error) {
    if (isNamed(error, ["AbortError"])) return null;
    throw error;
  }
}

async function nameTaken(parent: FileSystemDirectoryHandle, name: string) {
  try {
    await parent.getDirectoryHandle(name);
    return true;
  } catch (error) {
    if (isNamed(error, ["NotFoundError"])) return false;
    if (isNamed(error, ["TypeMismatchError"])) return true;
    throw error;
  }
}

async function createNewFolder(parent: FileSystemDirectoryHandle, name: string) {
  let candidate = name;
  for (let index = 1; await nameTaken(parent, candidate); index += 1) candidate = `${name} (${index})`;
  return parent.getDirectoryHandle(candidate, { create: true });
}

function folderCache(root: FileSystemDirectoryHandle) {
  const cache = new Map<string, Promise<FileSystemDirectoryHandle>>([["", Promise.resolve(root)]]);

  return function resolve(folders: string[]): Promise<FileSystemDirectoryHandle> {
    const key = folders.join("/");
    const known = cache.get(key);
    if (known) return known;
    const created = resolve(folders.slice(0, -1)).then((parent) => parent.getDirectoryHandle(folders[folders.length - 1], { create: true }));
    cache.set(key, created);
    return created;
  };
}

async function writeFile(directory: FileSystemDirectoryHandle, name: string, blob: Blob) {
  const handle = await directory.getFileHandle(name, { create: true });
  const stream = await handle.createWritable();
  try {
    await stream.write(blob);
    await stream.close();
  } catch (error) {
    await stream.abort().catch(() => {});
    throw error;
  }
}

export async function saveEntriesToFolder(
  parent: FileSystemDirectoryHandle,
  folderName: string,
  entries: ZipEntry[],
  onProgress: (done: number) => void,
): Promise<FolderSave> {
  const root = await createNewFolder(parent, safeFolderName(folderName));
  const directoryFor = folderCache(root);
  const paths = safeEntryPaths(entries.map((entry) => entry.name));
  let done = 0;
  let saved = 0;

  await runPool([...entries.keys()], FOLDER_PARALLEL_WRITES, async (index, stop) => {
    const { folders, file } = paths[index];
    try {
      await writeFile(await directoryFor(folders), file, entries[index].blob);
      saved += 1;
    } catch (error) {
      if (isNamed(error, FATAL_ERRORS)) stop();
    }
    done += 1;
    onProgress(done);
  });

  return { folder: root.name, saved, failed: entries.length - saved };
}
