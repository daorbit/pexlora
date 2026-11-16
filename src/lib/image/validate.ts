import { MAX_IMAGE_SIZE, MAX_IMAGE_SIZE_MB } from "@/config/limits";
import { ACCEPTED_MIME_TYPES, INPUT_FORMAT_LABELS } from "@/lib/image/formats";

export function getImageError(file: { type: string; size: number }) {
  if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
    return `Unsupported file type. Use ${INPUT_FORMAT_LABELS.join(", ")}.`;
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return `File is larger than ${MAX_IMAGE_SIZE_MB} MB.`;
  }
  return null;
}
