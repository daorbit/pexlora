import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("csv-to-excel");

export default function CsvToExcelPage() {
  return <ToolPage slug="csv-to-excel" />;
}
