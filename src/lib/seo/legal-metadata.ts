import type { Metadata } from "next";
import type { LegalDocument } from "@/content/legal";
import { pageMetadata } from "@/lib/seo/page-metadata";

export function legalMetadata(doc: LegalDocument): Metadata {
  return pageMetadata(doc.metaTitle, doc.description, doc.path);
}
