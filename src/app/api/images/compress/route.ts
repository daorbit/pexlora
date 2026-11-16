import { ApiError, withApiErrors } from "@/lib/api/errors";
import { imageResponse } from "@/lib/api/image-response";
import { consumeFileQuota } from "@/lib/api/quota";
import { readImageUpload } from "@/lib/api/upload";
import { FORMAT_EXTENSIONS } from "@/lib/image/formats";
import { isCompressionLevel } from "@/lib/image/options";
import { compressImage } from "@/lib/image/process";
import { withExtension } from "@/lib/utils/file-name";

export const POST = withApiErrors(async (request) => {
  const { form, file, buffer } = await readImageUpload(request);
  const level = form.get("level");

  if (!isCompressionLevel(level)) {
    throw new ApiError("Choose a compression level: Light, Balanced or Strong.");
  }

  const quotaRemaining = await consumeFileQuota(request);
  const result = await compressImage(buffer, level);

  return imageResponse({
    buffer: result.buffer,
    format: result.format,
    fileName: withExtension(file.name, FORMAT_EXTENSIONS[result.format]),
    quotaRemaining,
  });
});
