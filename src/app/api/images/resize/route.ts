import { ApiError, withApiErrors } from "@/lib/api/errors";
import { imageResponse } from "@/lib/api/image-response";
import { consumeFileQuota } from "@/lib/api/quota";
import { readImageUpload } from "@/lib/api/upload";
import { FORMAT_EXTENSIONS } from "@/lib/image/formats";
import { getResizeError, isResizeMode, type ResizeOptions } from "@/lib/image/options";
import { resizeImage } from "@/lib/image/process";
import { withExtension } from "@/lib/utils/file-name";

function readNumber(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" && value.trim() ? Number(value) : null;
}

function readResizeOptions(form: FormData): ResizeOptions {
  const mode = form.get("mode");
  if (!isResizeMode(mode)) {
    throw new ApiError("Choose how to resize: by percentage or by dimensions.");
  }

  return {
    mode,
    percent: readNumber(form, "percent") ?? Number.NaN,
    width: readNumber(form, "width"),
    height: readNumber(form, "height"),
    keepAspect: form.get("keepAspect") !== "false",
  };
}

export const POST = withApiErrors(async (request) => {
  const { form, file, buffer } = await readImageUpload(request);
  const options = readResizeOptions(form);
  const optionsError = getResizeError(options);

  if (optionsError) {
    throw new ApiError(optionsError);
  }

  const quotaRemaining = await consumeFileQuota(request);
  const result = await resizeImage(buffer, options);

  return imageResponse({
    buffer: result.buffer,
    format: result.format,
    fileName: withExtension(file.name, FORMAT_EXTENSIONS[result.format]),
    quotaRemaining,
    width: result.width,
    height: result.height,
  });
});
