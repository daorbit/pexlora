import {
  EncryptedPDFError,
  PDFArray,
  PDFDict,
  PDFDocument,
  PDFHexString,
  PDFName,
  PDFRawStream,
  PDFRef,
  PDFStream,
  PDFString,
  decodePDFRawStream,
  type PDFObject,
} from "pdf-lib";
import { containsAscii, decodeText } from "@/lib/files/bytes";
import { addXmp } from "@/lib/files/xmp";
import { readC2pa } from "@/lib/metadata/c2pa";
import { addC2paEntries } from "@/lib/metadata/c2pa-report";
import { createReport } from "@/lib/metadata/report";
import type { MetadataGroupId } from "@/lib/metadata/types";
import { UnreadableFileError, type FileProcessor } from "@/lib/files/processors/types";

const NAMES = {
  af: PDFName.of("AF"),
  afRelationship: PDFName.of("AFRelationship"),
  ef: PDFName.of("EF"),
  embeddedFiles: PDFName.of("EmbeddedFiles"),
  f: PDFName.of("F"),
  kids: PDFName.of("Kids"),
  metadata: PDFName.of("Metadata"),
  names: PDFName.of("Names"),
  pieceInfo: PDFName.of("PieceInfo"),
  type: PDFName.of("Type"),
  uf: PDFName.of("UF"),
};

const INFO_GROUPS: Record<string, MetadataGroupId> = {
  Author: "people",
  Creator: "software",
  Producer: "software",
  CreationDate: "dates",
  ModDate: "dates",
};

const DATE_PATTERN = /^D:(\d{4})(\d{2})?(\d{2})?(\d{2})?(\d{2})?(\d{2})?/;

export async function loadPdf(file: Blob) {
  try {
    return await PDFDocument.load(await file.arrayBuffer(), { updateMetadata: false });
  } catch (error) {
    if (error instanceof EncryptedPDFError) {
      throw new UnreadableFileError("Password-protected PDFs can't be opened here. Remove the password first.");
    }
    throw new UnreadableFileError("This PDF couldn't be read. It may be damaged.");
  }
}

function textOf(object: PDFObject | undefined) {
  if (object instanceof PDFString || object instanceof PDFHexString) return object.decodeText();
  if (object instanceof PDFName) return object.decodeText();
  return object?.toString();
}

function formatPdfDate(value: string) {
  const match = value.match(DATE_PATTERN);
  if (!match) return value;
  const [, year, month = "01", day = "01", hour = "00", minute = "00", second = "00"] = match;
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function streamText(stream: PDFObject | undefined) {
  if (!(stream instanceof PDFRawStream)) return null;
  try {
    return decodeText(decodePDFRawStream(stream).decode());
  } catch {
    return null;
  }
}

function isMetadataStream(object: PDFObject) {
  return object instanceof PDFStream && object.dict.get(NAMES.type) === NAMES.metadata;
}

function dictOf(object: PDFObject) {
  if (object instanceof PDFDict) return object;
  if (object instanceof PDFStream) return object.dict;
  return null;
}

function isC2paFileSpec(doc: PDFDocument, ref: PDFObject) {
  const spec = doc.context.lookup(ref);
  if (!(spec instanceof PDFDict)) return false;
  const relationship = textOf(spec.get(NAMES.afRelationship)) ?? "";
  const name = textOf(spec.get(NAMES.uf)) ?? textOf(spec.get(NAMES.f)) ?? "";
  return /c2pa/i.test(relationship) || /\.c2pa$/i.test(name);
}

function c2paFileSpecs(doc: PDFDocument) {
  const af = doc.catalog.lookupMaybe(NAMES.af, PDFArray);
  return af ? af.asArray().filter((ref) => isC2paFileSpec(doc, ref)) : [];
}

function pruneNameTree(doc: PDFDocument, node: PDFObject | undefined, removed: Set<PDFObject>) {
  const dict = node instanceof PDFRef ? doc.context.lookup(node) : node;
  if (!(dict instanceof PDFDict)) return;
  const names = dict.lookupMaybe(NAMES.names, PDFArray);
  if (names) {
    const kept = names.asArray().flatMap((value, index, all) =>
      index % 2 === 0 && !removed.has(all[index + 1]) ? [value, all[index + 1]] : [],
    );
    dict.set(NAMES.names, doc.context.obj(kept));
  }
  dict.lookupMaybe(NAMES.kids, PDFArray)?.asArray().forEach((kid) => pruneNameTree(doc, kid, removed));
}

function removeC2pa(doc: PDFDocument) {
  const specs = c2paFileSpecs(doc);
  if (!specs.length) return;
  const removed = new Set<PDFObject>(specs);
  const af = doc.catalog.lookup(NAMES.af, PDFArray);
  doc.catalog.set(NAMES.af, doc.context.obj(af.asArray().filter((ref) => !removed.has(ref))));

  const embedded = doc.catalog.lookupMaybe(NAMES.names, PDFDict)?.get(NAMES.embeddedFiles);
  pruneNameTree(doc, embedded, removed);

  specs.forEach((ref) => {
    const spec = doc.context.lookup(ref, PDFDict);
    const stream = spec.lookupMaybe(NAMES.ef, PDFDict)?.get(NAMES.f);
    if (stream instanceof PDFRef) doc.context.delete(stream);
    if (ref instanceof PDFRef) doc.context.delete(ref);
  });
}

export const pdfProcessor: FileProcessor = {
  async inspect(file, format) {
    const doc = await loadPdf(file);
    const report = createReport();

    const info = doc.context.lookup(doc.context.trailerInfo.Info);
    if (info instanceof PDFDict) {
      for (const [name, value] of info.entries()) {
        const key = name.decodeText();
        const text = textOf(doc.context.lookup(value)) ?? "";
        report.entry(INFO_GROUPS[key] ?? "document", key, key.endsWith("Date") ? formatPdfDate(text) : text);
      }
    }

    const catalogXmp = streamText(doc.catalog.lookup(NAMES.metadata));
    if (catalogXmp) addXmp(report, catalogXmp);

    const nested = doc.context
      .enumerateIndirectObjects()
      .filter(([ref, object]) => isMetadataStream(object) && doc.catalog.get(NAMES.metadata) !== ref).length;
    if (nested) report.entry("xmp", "Embedded object metadata", `${nested} XMP ${nested === 1 ? "packet" : "packets"}`);

    const specs = c2paFileSpecs(doc).length;
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (specs || containsAscii(bytes, "/C2PA_Manifest")) addC2paEntries(report, readC2pa(bytes, true));

    return report.build({ format: format.label });
  },

  async clean(file) {
    const doc = await loadPdf(file);
    const { context } = doc;

    const info = context.trailerInfo.Info;
    if (info instanceof PDFRef) context.delete(info);
    context.trailerInfo.Info = undefined;

    removeC2pa(doc);

    for (const [ref, object] of context.enumerateIndirectObjects()) {
      if (isMetadataStream(object)) context.delete(ref);
    }
    for (const [, object] of context.enumerateIndirectObjects()) {
      const dict = dictOf(object);
      dict?.delete(NAMES.metadata);
      dict?.delete(NAMES.pieceInfo);
    }

    const bytes = await doc.save({ addDefaultPage: false, updateFieldAppearances: false });
    return new Blob([bytes as BlobPart], { type: "application/pdf" });
  },
};
