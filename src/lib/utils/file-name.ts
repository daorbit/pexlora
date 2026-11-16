export function baseName(fileName: string) {
  const dot = fileName.lastIndexOf(".");
  return dot > 0 ? fileName.slice(0, dot) : fileName;
}

export function extensionOf(fileName: string) {
  const dot = fileName.lastIndexOf(".");
  return dot > 0 ? fileName.slice(dot + 1).toLowerCase() : "";
}

export function withExtension(fileName: string, extension: string, suffix = "") {
  return `${baseName(fileName)}${suffix}.${extension}`;
}
