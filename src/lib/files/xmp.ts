import { toEntry, type ReportBuilder } from "@/lib/metadata/report";
import { readXmlFields } from "@/lib/files/xml";

const XMP_SKIP = ["rdf:", "x:", "xmlns", "xml:"];

export function addXmp(report: ReportBuilder, xml: string) {
  const fields = readXmlFields(xml, { skip: XMP_SKIP, attributes: true });
  report.add(
    "xmp",
    fields.map((field) => toEntry(field.key, field.value)),
  );
}
