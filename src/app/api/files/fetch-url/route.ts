import { urlImportCopy } from "@/content/import-sources";
import { ApiError, withApiErrors } from "@/lib/api/errors";
import { assertApiRateLimit } from "@/lib/api/quota";
import { UrlImportError } from "@/lib/url-import/errors";
import { fetchRemoteFile } from "@/lib/url-import/safe-fetch";
import { urlImportSchema } from "@/lib/validations/url-import";

const JSON_TYPE = "application/json";

export const POST = withApiErrors(async (request) => {
  if (!request.headers.get("content-type")?.startsWith(JSON_TYPE)) throw new ApiError(urlImportCopy.invalid, 415);
  await assertApiRateLimit(request, "urlImport");

  const parsed = urlImportSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) throw new ApiError(urlImportCopy.invalid);

  try {
    const file = await fetchRemoteFile(parsed.data.url);
    return new Response(new Uint8Array(file.body), {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment",
        "X-File-Type": file.type,
        "X-File-Name": encodeURIComponent(file.name),
      },
    });
  } catch (error) {
    if (error instanceof UrlImportError) throw new ApiError(error.message, error.reason === "tooLarge" ? 413 : 422);
    throw new ApiError(urlImportCopy.failed, 502);
  }
});
