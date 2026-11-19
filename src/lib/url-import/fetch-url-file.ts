import { urlImport } from "@/config/import-sources";
import { parseHttpUrl, UrlImportError } from "@/lib/url-import/errors";
import { mimeOf, remoteFileName } from "@/lib/url-import/file-name";

const PAGE_TYPES = ["text/html", "application/xhtml+xml"];

async function fetchDirect(url: URL) {
  const response = await fetch(url, { credentials: "omit", signal: AbortSignal.timeout(urlImport.browserTimeoutMs) });
  if (!response.ok) throw new UrlImportError("failed");
  const type = mimeOf(response.headers.get("content-type"));
  if (PAGE_TYPES.includes(type)) throw new UrlImportError("notFile");
  const blob = await response.blob();
  return new File([blob], remoteFileName(url, response.headers.get("content-disposition"), type), { type });
}

async function fetchViaServer(url: URL) {
  const response = await fetch(urlImport.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: url.toString() }),
  });
  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new UrlImportError("failed", data?.error);
  }
  const type = response.headers.get("X-File-Type") ?? "application/octet-stream";
  const name = decodeURIComponent(response.headers.get("X-File-Name") ?? "") || remoteFileName(url, null, type);
  return new File([await response.blob()], name, { type });
}

export async function fetchUrlFile(raw: string) {
  const url = parseHttpUrl(raw);
  try {
    return await fetchDirect(url);
  } catch (error) {
    if (error instanceof UrlImportError && error.reason === "notFile") throw error;
  }
  return fetchViaServer(url);
}
