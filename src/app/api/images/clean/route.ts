import { withApiErrors } from "@/lib/api/errors";
import { imageResponse } from "@/lib/api/image-response";
import { consumeFileQuota } from "@/lib/api/quota";
import { readImageUpload } from "@/lib/api/upload";
import { FORMAT_EXTENSIONS } from "@/lib/image/formats";
import { inspectImage } from "@/lib/image/metadata";
import { stripMetadata } from "@/lib/image/process";
import { withExtension } from "@/lib/utils/file-name";

export const POST = withApiErrors(async (request) => {
  const { file, buffer } = await readImageUpload(request);
  const quotaRemaining = await consumeFileQuota(request);
  const result = await stripMetadata(buffer);
  const verification = await inspectImage(result.buffer);

  return imageResponse({
    buffer: result.buffer,
    format: result.format,
    fileName: withExtension(file.name, FORMAT_EXTENSIONS[result.format], "-clean"),
    quotaRemaining,
    leftoverTags: verification.totalTags,
  });
});
