import { readBytes } from "@/lib/files/bytes";
import { cleanHeif, heifHasColorProfile, heifSize } from "@/lib/files/containers/heif";
import {
  addC2paMarker,
  addColorProfile,
  addExifSegments,
  readExifSegments,
  readLocation,
} from "@/lib/metadata/exif-report";
import { createReport } from "@/lib/metadata/report";
import { UnreadableFileError, type FileProcessor } from "@/lib/files/processors/types";

function unreadable(): never {
  throw new UnreadableFileError("This HEIC photo couldn't be read. It may be damaged.");
}

export const heifProcessor: FileProcessor = {
  async inspect(file, format) {
    const bytes = await readBytes(file);
    const segments = await readExifSegments(bytes);
    const report = createReport();

    addExifSegments(report, segments);
    addC2paMarker(report, bytes);

    let size: { width: number; height: number } | undefined;
    try {
      size = heifSize(bytes);
      addColorProfile(report, heifHasColorProfile(bytes));
    } catch {
      unreadable();
    }

    return report.build({ format: format.label, ...size, location: readLocation(segments.gps) });
  },

  async clean(file, format) {
    const bytes = await readBytes(file);
    try {
      return new Blob([cleanHeif(bytes) as BlobPart], { type: format.mimeTypes[0] });
    } catch {
      unreadable();
    }
  },
};
