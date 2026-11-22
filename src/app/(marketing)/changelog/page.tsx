import type { Metadata } from "next";
import { routes } from "@/config/site";
import { changelogCopy } from "@/content/changelog";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { ChangelogPage } from "@/components/changelog/ChangelogPage";

export const metadata: Metadata = pageMetadata(changelogCopy.metaTitle, changelogCopy.description, routes.changelog);

export default function Changelog() {
  return <ChangelogPage />;
}
