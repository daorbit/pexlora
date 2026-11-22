import type { Metadata } from "next";
import { routes } from "@/config/site";
import { fileHandlingCopy } from "@/content/file-handling";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { FileHandlingPage } from "@/components/file-handling/FileHandlingPage";

export const metadata: Metadata = pageMetadata(fileHandlingCopy.metaTitle, fileHandlingCopy.description, routes.fileHandling);

export default function FileHandling() {
  return <FileHandlingPage />;
}
