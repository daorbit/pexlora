import "server-only";
import { ApiError } from "@/lib/api/errors";
import { getImageError } from "@/lib/image/validate";

export async function readImageUpload(request: Request) {
  const form = await request.formData().catch(() => {
    throw new ApiError("Invalid upload.");
  });
  const file = form.get("file");

  if (!(file instanceof File)) {
    throw new ApiError("No image was uploaded.");
  }

  const fileError = getImageError(file);
  if (fileError) {
    throw new ApiError(fileError, 415);
  }

  return { form, file, buffer: Buffer.from(await file.arrayBuffer()) };
}
