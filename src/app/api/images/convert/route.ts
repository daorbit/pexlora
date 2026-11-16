import { ApiError, withApiErrors } from "@/lib/api/errors";
import { imageResponse } from "@/lib/api/image-response";
import { consumeFileQuota } from "@/lib/api/quota";
import { readImageUpload } from "@/lib/api/upload";
import { FORMAT_EXTENSIONS, isOutputFormat } from "@/lib/image/formats";
import { convertImage } from "@/lib/image/process";
import { withExtension } from "@/lib/utils/file-name";

export const POST = withApiErrors(async (request) => {
  const { form, file, buffer } = await readImageUpload(request);
  const format = form.get("format");

  if (!isOutputFormat(format)) {
    throw new ApiError("Choose a target format: JPG, PNG, WebP or AVIF.");
  }

  const quotaRemaining = await consumeFileQuota(request);
  const result = await convertImage(buffer, format);

  return imageResponse({
    buffer: result.buffer,
    format: result.format,
    fileName: withExtension(file.name, FORMAT_EXTENSIONS[result.format]),
    quotaRemaining,
  });
});
