import { UtilityToolPage } from "@/components/utility/UtilityToolPage";
import { utilityToolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = utilityToolMetadata("zip-files");

export default function ZipFilesPage() {
  return <UtilityToolPage slug="zip-files" />;
}
