import { UtilityToolPage } from "@/components/utility/UtilityToolPage";
import { utilityToolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = utilityToolMetadata("unzip-files");

export default function UnzipFilesPage() {
  return <UtilityToolPage slug="unzip-files" />;
}
