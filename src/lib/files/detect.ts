import { fileFormats, fileKinds, formatsOfKinds, type FileKind } from "@/config/file-formats";
import { FILE_SIZE_LIMITS_MB, maxFileSize } from "@/config/limits";
import { extensionOf } from "@/lib/utils/file-name";
import { formatMegabytes } from "@/lib/utils/format-bytes";

export function detectFormat(file: { name: string; type: string }) {
  const extension = extensionOf(file.name);
  return (
    fileFormats.find((format) => format.extensions.includes(extension)) ??
    fileFormats.find((format) => format.mimeTypes.includes(file.type)) ??
    null
  );
}

export function describeFormats(kinds: FileKind[], localCapable = true) {
  return formatsOfKinds(kinds, localCapable)
    .map((format) => format.label)
    .join(", ");
}

export function describeAccepted(kinds: FileKind[], localCapable = true) {
  if (kinds.length === 1) {
    return `${describeFormats(kinds, localCapable)} · up to ${formatMegabytes(FILE_SIZE_LIMITS_MB[kinds[0]])}`;
  }
  return kinds.map((kind) => fileKinds[kind].label).join(", ");
}

export function getFileError(
  file: { name: string; type: string; size: number },
  accepts: FileKind[],
  localCapable = true,
) {
  const format = detectFormat(file);
  const usable = format && accepts.includes(format.kind) && (localCapable || format.serverReadable !== false);
  if (!format || !usable) {
    return `Unsupported file type. Use ${describeFormats(accepts, localCapable)}.`;
  }
  if (file.size === 0) return "This file is empty.";
  if (file.size > maxFileSize(format.kind)) {
    const { label } = fileKinds[format.kind];
    return `${label} files can be up to ${formatMegabytes(FILE_SIZE_LIMITS_MB[format.kind])}.`;
  }
  return null;
}
