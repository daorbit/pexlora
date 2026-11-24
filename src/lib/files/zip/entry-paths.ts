import { baseName, extensionOf, safeFileName } from "@/lib/utils/file-name";

export type EntryPath = { folders: string[]; file: string };

function safeSegment(segment: string) {
  return safeFileName(segment, "_").replace(/[. ]+$/, "").trim();
}

function numbered(name: string, index: number) {
  if (!index) return name;
  const extension = extensionOf(name);
  return extension ? `${baseName(name)} (${index}).${extension}` : `${name} (${index})`;
}

export function safeEntryPaths(names: string[]): EntryPath[] {
  const used = new Set<string>();

  return names.map((name) => {
    const segments = name.split(/[\\/]/).map(safeSegment).filter(Boolean);
    const original = segments.pop() ?? "file";
    const pathOf = (file: string) => [...segments, file].join("/").toLowerCase();
    let index = 0;
    while (used.has(pathOf(numbered(original, index)))) index += 1;
    const file = numbered(original, index);
    used.add(pathOf(file));
    return { folders: segments, file };
  });
}

export function safeFolderName(name: string) {
  return safeSegment(name) || "files";
}
