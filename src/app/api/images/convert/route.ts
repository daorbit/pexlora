import { ApiError, withApiErrors } from "@/lib/api/errors";
import { imageResponse } from "@/lib/api/image-response";
import { consumeFileQuota } from "@/lib/api/quota";
import { readImageUpload } from "@/lib/api/upload";
import { DEFAULT_QUALITY, FORMAT_EXTENSIONS, isOutputFormat } from "@/lib/image/formats";
import { convertImage } from "@/lib/image/process";
import { withExtension } from "@/lib/utils/file-name";

function parseQuality(value: FormDataEntryValue | null) {
  const quality = Number(value ?? DEFAULT_QUALITY);
  return Number.isFinite(quality) ? Math.min(100, Math.max(1, Math.round(quality))) : DEFAULT_QUALITY;
}

export const POST = withApiErrors(async (request) => {
  const { form, file, buffer } = await readImageUpload(request);
  const format = form.get("format");

  if (!isOutputFormat(format)) {
    throw new ApiError("Choose a target format: JPG, PNG, WebP or AVIF.");
  }

  const quotaRemaining = await consumeFileQuota(request);
  const result = await convertImage(buffer, format, parseQuality(form.get("quality")));

  return imageResponse({
    buffer: result.buffer,
    format: result.format,
    fileName: withExtension(file.name, FORMAT_EXTENSIONS[result.format]),
    quotaRemaining,
  });
});
