import { ApiError, withApiErrors } from "@/lib/api/errors";
import { imageResponse } from "@/lib/api/image-response";
import { withFileQuota } from "@/lib/api/quota";
import { readImageUpload } from "@/lib/api/upload";
import { compressToTarget } from "@/lib/image/compress-target";
import { FORMAT_EXTENSIONS, type OutputFormat } from "@/lib/image/formats";
import { getCompressTargetError, isCompressionLevel } from "@/lib/image/options";
import { compressImage } from "@/lib/image/process";
import { withExtension } from "@/lib/utils/file-name";

type CompressJob = {
  run: () => Promise<{ buffer: Buffer; format: OutputFormat; width?: number; height?: number; targetMet?: boolean }>;
};

function compressByTarget(form: FormData, buffer: Buffer): CompressJob {
  const targetKb = Number(form.get("targetKb"));
  const targetError = getCompressTargetError(targetKb);
  if (targetError) throw new ApiError(targetError);

  const allowFormatChange = form.get("allowFormatChange") === "true";
  return { run: () => compressToTarget(buffer, targetKb * 1024, allowFormatChange) };
}

function compressByLevel(form: FormData, buffer: Buffer): CompressJob {
  const level = form.get("level");
  if (!isCompressionLevel(level)) {
    throw new ApiError("Choose a compression level: Light, Balanced or Strong.");
  }
  return { run: () => compressImage(buffer, level) };
}

export const POST = withApiErrors(async (request) => {
  const { form, file, buffer } = await readImageUpload(request);
  const job = form.has("targetKb") ? compressByTarget(form, buffer) : compressByLevel(form, buffer);

  const { quotaRemaining, result } = await withFileQuota(request, job.run);

  return imageResponse({
    ...result,
    fileName: withExtension(file.name, FORMAT_EXTENSIONS[result.format]),
    quotaRemaining,
  });
});
