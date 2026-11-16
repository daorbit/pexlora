import { ApiError, withApiErrors } from "@/lib/api/errors";
import { imageResponse } from "@/lib/api/image-response";
import { withFileQuota } from "@/lib/api/quota";
import { readImageUpload } from "@/lib/api/upload";
import { FORMAT_EXTENSIONS } from "@/lib/image/formats";
import { getMetadataFieldsError, METADATA_FIELDS, type MetadataFields } from "@/lib/image/options";
import { writeMetadata } from "@/lib/image/process";
import { withExtension } from "@/lib/utils/file-name";

function readFields(form: FormData): MetadataFields {
  const entries = METADATA_FIELDS.map((field) => {
    const value = form.get(field);
    return [field, typeof value === "string" ? value.trim() : ""];
  });
  return Object.fromEntries(entries) as MetadataFields;
}

export const POST = withApiErrors(async (request) => {
  const { form, file, buffer } = await readImageUpload(request);
  const fields = readFields(form);
  const fieldsError = getMetadataFieldsError(fields);

  if (fieldsError) {
    throw new ApiError(fieldsError);
  }

  const { quotaRemaining, result } = await withFileQuota(request, () => writeMetadata(buffer, fields));

  return imageResponse({
    buffer: result.buffer,
    format: result.format,
    fileName: withExtension(file.name, FORMAT_EXTENSIONS[result.format]),
    quotaRemaining,
  });
});
