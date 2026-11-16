import JSZip from "jszip";
import { binaryLabel, createReport, toEntry } from "@/lib/metadata/report";
import type { MetadataGroupId } from "@/lib/metadata/types";
import {
  attributeValues,
  decodeEntities,
  elementTexts,
  emptyElementTexts,
  emptyRootElement,
  readXmlFields,
  removeElements,
  replaceAttributeValues,
} from "@/lib/files/xml";
import { UnreadableFileError, type FileProcessor } from "@/lib/files/processors/types";

const PARTS = {
  core: "docProps/core.xml",
  app: "docProps/app.xml",
  custom: "docProps/custom.xml",
  rels: "_rels/.rels",
};

const THUMBNAIL_PATTERN = /^docProps\/thumbnail\.\w+$/;

const CORE_GROUPS: Record<string, MetadataGroupId> = {
  creator: "people",
  lastModifiedBy: "people",
  created: "dates",
  modified: "dates",
  lastPrinted: "dates",
};

const APP_GROUPS: Record<string, MetadataGroupId> = {
  Application: "software",
  AppVersion: "software",
  Company: "people",
  Manager: "people",
  Template: "document",
  TotalTime: "document",
  HyperlinkBase: "document",
};

type AuthorSource = {
  pattern: RegExp;
  names: string[];
  ids?: string[];
  elements?: string[];
};

const AUTHOR_SOURCES: AuthorSource[] = [
  {
    pattern: /^word\/(document|comments\w*|footnotes|endnotes|header\d*|footer\d*)\.xml$/,
    names: ["w:author"],
    ids: ["w:initials"],
  },
  { pattern: /^word\/people\.xml$/, names: ["w15:author"], ids: ["w15:userId", "w15:providerId"] },
  { pattern: /^ppt\/commentAuthors\.xml$/, names: ["name"], ids: ["initials"] },
  { pattern: /^ppt\/authors\.xml$/, names: ["name"], ids: ["initials", "userId", "providerId"] },
  { pattern: /^xl\/persons\/person\d*\.xml$/, names: ["displayName"], ids: ["userId", "providerId"] },
  { pattern: /^xl\/comments\d*\.xml$/, names: [], elements: ["author"] },
];

async function load(file: Blob) {
  try {
    const zip = await JSZip.loadAsync(await file.arrayBuffer());
    if (!zip.file("[Content_Types].xml")) throw new Error("Not an Office document");
    return zip;
  } catch {
    throw new UnreadableFileError(
      "This document couldn't be opened. Password-protected files and old .doc, .xls and .ppt files aren't supported.",
    );
  }
}

async function readPart(zip: JSZip, path: string) {
  return (await zip.file(path)?.async("string")) ?? null;
}

function localName(key: string) {
  return key.split(":").pop() ?? key;
}

function authorFiles(zip: JSZip) {
  return Object.keys(zip.files).flatMap((path) => {
    const source = AUTHOR_SOURCES.find((candidate) => candidate.pattern.test(path));
    return source ? [{ path, source }] : [];
  });
}

function thumbnails(zip: JSZip) {
  return Object.keys(zip.files).filter((path) => THUMBNAIL_PATTERN.test(path));
}

function customProperties(xml: string) {
  return [...xml.matchAll(/<property\b[^>]*\bname="([^"]*)"[^>]*>([\s\S]*?)<\/property>/g)].map(
    ([, name, inner]) => toEntry(decodeEntities(name), decodeEntities(inner.replace(/<[^>]+>/g, ""))),
  );
}

export const ooxmlProcessor: FileProcessor = {
  async inspect(file, format) {
    const zip = await load(file);
    const report = createReport();

    const core = await readPart(zip, PARTS.core);
    readXmlFields(core ?? "").forEach(({ key, value }) =>
      report.entry(CORE_GROUPS[localName(key)] ?? "document", key, value),
    );

    const app = await readPart(zip, PARTS.app);
    readXmlFields(app ?? "")
      .filter(({ key }) => key in APP_GROUPS)
      .forEach(({ key, value }) => report.entry(APP_GROUPS[key], key, value));

    const custom = await readPart(zip, PARTS.custom);
    if (custom) report.add("custom", customProperties(custom));

    const reviewers = new Set<string>();
    for (const { path, source } of authorFiles(zip)) {
      const xml = (await readPart(zip, path)) ?? "";
      source.names.flatMap((name) => attributeValues(xml, name)).forEach((name) => reviewers.add(name.trim()));
      (source.elements ?? []).flatMap((name) => elementTexts(xml, name)).forEach((name) => reviewers.add(name.trim()));
    }
    [...reviewers].filter(Boolean).forEach((name) => report.entry("people", "Comment or revision author", name));

    for (const path of thumbnails(zip)) {
      const bytes = await zip.file(path)!.async("uint8array");
      report.entry("attachments", "Preview thumbnail", binaryLabel(bytes.byteLength, "image"));
    }

    return report.build({ format: format.label });
  },

  async clean(file, format) {
    const zip = await load(file);
    const rewrite = async (path: string, transform: (xml: string) => string) => {
      const xml = await readPart(zip, path);
      if (xml !== null) zip.file(path, transform(xml));
    };

    await rewrite(PARTS.core, emptyRootElement);
    await rewrite(PARTS.app, (xml) => removeElements(xml, Object.keys(APP_GROUPS)));
    await rewrite(PARTS.custom, emptyRootElement);

    for (const { path, source } of authorFiles(zip)) {
      await rewrite(path, (xml) =>
        emptyElementTexts(replaceAttributeValues(xml, [...source.names, ...(source.ids ?? [])]), source.elements ?? []),
      );
    }

    const removedThumbnails = thumbnails(zip);
    removedThumbnails.forEach((path) => zip.remove(path));
    if (removedThumbnails.length) {
      await rewrite(PARTS.rels, (xml) => xml.replace(/<Relationship\b[^>]*Target="\/?docProps\/thumbnail\.\w+"[^>]*\/>/g, ""));
    }

    return zip.generateAsync({ type: "blob", compression: "DEFLATE", mimeType: format.mimeTypes[0] });
  },
};
