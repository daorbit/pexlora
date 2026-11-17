import { fileFormats, fileKinds, formatsOfKinds, type FileFormat, type FileKind } from "@/config/file-formats";
import { SERVER_IMAGE_SIZE_MB } from "@/config/limits";
import { FREE_PERKS, type WorkspacePerks } from "@/lib/plan/perks";
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

export function isLocalFormat(format: FileFormat) {
  return format.engine !== "image";
}

export function hasPreview(format: FileFormat) {
  return format.kind === "image" || format.kind === "vector";
}

function runsInBrowser(format: FileFormat, localCapable: boolean) {
  return format.kind !== "image" || (localCapable && isLocalFormat(format));
}

export function sizeLimitMb(format: FileFormat, localCapable: boolean, perks: WorkspacePerks = FREE_PERKS) {
  return runsInBrowser(format, localCapable) ? perks.localSizeLimitsMb[format.kind] : SERVER_IMAGE_SIZE_MB;
}

function kindSizeLimitMb(kind: FileKind, localCapable: boolean, perks: WorkspacePerks) {
  return Math.max(...formatsOfKinds([kind], localCapable).map((format) => sizeLimitMb(format, localCapable, perks)));
}

export function describeFormats(kinds: FileKind[], localCapable = true) {
  return formatsOfKinds(kinds, localCapable)
    .map((format) => format.label)
    .join(", ");
}

export function describeAccepted(
  kinds: FileKind[],
  localCapable = true,
  perks: WorkspacePerks = FREE_PERKS,
  formatsLabel?: string,
) {
  if (kinds.length === 1) {
    const formats = formatsLabel ?? describeFormats(kinds, localCapable);
    return `${formats} · up to ${formatMegabytes(kindSizeLimitMb(kinds[0], localCapable, perks))}`;
  }
  return kinds.map((kind) => fileKinds[kind].label).join(", ");
}

export function getFileError(
  file: { name: string; type: string; size: number },
  accepts: FileKind[],
  localCapable = true,
  perks: WorkspacePerks = FREE_PERKS,
) {
  const format = detectFormat(file);
  const usable = format && accepts.includes(format.kind) && (localCapable || format.serverReadable !== false);
  if (!format || !usable) {
    return `Unsupported file type. Use ${describeFormats(accepts, localCapable)}.`;
  }
  if (file.size === 0) return "This file is empty.";
  const limitMb = sizeLimitMb(format, localCapable, perks);
  if (file.size > limitMb * 1024 * 1024) {
    const label = format.kind === "image" ? format.label : fileKinds[format.kind].label;
    return `${label} files can be up to ${formatMegabytes(limitMb)}.`;
  }
  return null;
}
