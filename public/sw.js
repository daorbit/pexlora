const SHARE_ACTION = "/share-target";
const SHARE_FIELD = "files";
const SHARE_CACHE = "pexlora-share";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

async function storeSharedFiles(request) {
  const data = await request.formData();
  const files = data.getAll(SHARE_FIELD).filter((entry) => entry instanceof File);
  await caches.delete(SHARE_CACHE);
  const cache = await caches.open(SHARE_CACHE);
  await Promise.all(
    files.map((file, index) =>
      cache.put(
        `/shared-file/${index}`,
        new Response(file, {
          headers: { "content-type": file.type || "application/octet-stream", "x-file-name": encodeURIComponent(file.name) },
        }),
      ),
    ),
  );
  return Response.redirect(`${SHARE_ACTION}?received=1`, 303);
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "POST" || url.origin !== self.location.origin || url.pathname !== SHARE_ACTION) return;
  event.respondWith(storeSharedFiles(event.request));
});
