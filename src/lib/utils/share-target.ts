import { shareTarget } from "@/config/share-target";
import { replaceSearchParams } from "@/lib/url/search-params";

function hasSharedFiles() {
  return new URLSearchParams(window.location.search).has(shareTarget.sharedParam);
}

async function readCachedFiles() {
  if (typeof caches === "undefined") return [];
  const cache = await caches.open(shareTarget.cacheName);
  const requests = await cache.keys();
  const files = await Promise.all(
    requests.map(async (request) => {
      const response = await cache.match(request);
      if (!response) return null;
      const name = decodeURIComponent(response.headers.get("x-file-name") ?? "shared-file");
      const blob = await response.blob();
      return new File([blob], name, { type: blob.type });
    }),
  );
  await caches.delete(shareTarget.cacheName);
  return files.filter((file): file is File => file !== null);
}

export async function takeSharedFiles(): Promise<File[]> {
  if (!hasSharedFiles()) return [];
  replaceSearchParams({ [shareTarget.sharedParam]: null });
  try {
    return await readCachedFiles();
  } catch {
    return [];
  }
}

export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("/sw.js").catch(() => undefined);
}
