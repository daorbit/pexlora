import "server-only";
import sharp, { type Exif, type Sharp } from "sharp";
import { escapeXml } from "@/lib/files/xml";
import type { OutputFormat } from "@/lib/image/formats";
import { splitKeywords, type MetadataFields } from "@/lib/image/options";

function listItems(values: string[], attributes = "") {
  return values.map((value) => `<rdf:li${attributes}>${escapeXml(value)}</rdf:li>`).join("");
}

function xmpProperty(name: string, container: "Seq" | "Bag" | "Alt", values: string[]) {
  if (!values.length) return "";
  const attributes = container === "Alt" ? ' xml:lang="x-default"' : "";
  return `<dc:${name}><rdf:${container}>${listItems(values, attributes)}</rdf:${container}></dc:${name}>`;
}

function present(value: string) {
  return value ? [value] : [];
}

export function buildXmp(fields: MetadataFields) {
  const properties = [
    xmpProperty("creator", "Seq", present(fields.author)),
    xmpProperty("rights", "Alt", present(fields.copyright)),
    xmpProperty("description", "Alt", present(fields.description)),
    xmpProperty("subject", "Bag", splitKeywords(fields.keywords)),
  ].join("");

  return [
    '<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>',
    '<x:xmpmeta xmlns:x="adobe:ns:meta/">',
    '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">',
    `<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">${properties}</rdf:Description>`,
    "</rdf:RDF>",
    "</x:xmpmeta>",
    '<?xpacket end="w"?>',
  ].join("");
}

export function buildExif(fields: MetadataFields): Exif {
  const ifd0 = Object.fromEntries(
    [
      ["Artist", fields.author],
      ["Copyright", fields.copyright],
      ["ImageDescription", fields.description],
    ].filter(([, value]) => value),
  );
  return { IFD0: ifd0 };
}

export function withMetadataFields(pipeline: Sharp, fields: MetadataFields) {
  return pipeline.withExif(buildExif(fields)).withXmp(buildXmp(fields));
}

export function metadataCarrier(format: OutputFormat, fields: MetadataFields) {
  const pixel = sharp({ create: { width: 1, height: 1, channels: 3, background: "#ffffff" } });
  return withMetadataFields(pixel, fields).toFormat(format).toBuffer();
}
