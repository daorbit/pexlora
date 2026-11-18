import { formatMime } from "@/config/file-formats";
import { escapeXml } from "@/lib/files/xml";
import type { HeadingLevel } from "@/lib/files/pdf/text-paragraphs";

export type DocxParagraph = { text: string; heading: HeadingLevel | null; pageBreakBefore?: boolean };

const WORD_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const INVALID_XML = /[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g;

const CONTENT_TYPES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`;

const PACKAGE_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`;

const DOCUMENT_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;

const heading = (level: HeadingLevel, size: number, before: number) =>
  `<w:style w:type="paragraph" w:styleId="Heading${level}"><w:name w:val="heading ${level}"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="${before}" w:after="80"/><w:outlineLvl w:val="${level - 1}"/></w:pPr><w:rPr><w:b/><w:sz w:val="${size}"/></w:rPr></w:style>`;

const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="${WORD_NS}"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="en-IN"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>${heading(1, 32, 360)}${heading(2, 26, 240)}${heading(3, 24, 200)}</w:styles>`;

function runs(text: string) {
  return text
    .replace(INVALID_XML, "")
    .split("\t")
    .map((part) => (part ? `<w:t xml:space="preserve">${escapeXml(part)}</w:t>` : ""))
    .join("<w:tab/>");
}

function paragraphXml({ text, heading: level, pageBreakBefore }: DocxParagraph) {
  const properties = [level ? `<w:pStyle w:val="Heading${level}"/>` : "", pageBreakBefore ? "<w:pageBreakBefore/>" : ""].join("");
  return `<w:p>${properties ? `<w:pPr>${properties}</w:pPr>` : ""}<w:r>${runs(text)}</w:r></w:p>`;
}

export async function writeDocx(paragraphs: DocxParagraph[]) {
  const { default: JSZip } = await import("jszip");
  const body = paragraphs.map(paragraphXml).join("");
  const document = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="${WORD_NS}"><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  const zip = new JSZip();
  zip.file("[Content_Types].xml", CONTENT_TYPES);
  zip.file("_rels/.rels", PACKAGE_RELS);
  zip.file("word/_rels/document.xml.rels", DOCUMENT_RELS);
  zip.file("word/document.xml", document);
  zip.file("word/styles.xml", STYLES);
  return zip.generateAsync({ type: "blob", mimeType: formatMime("docx"), compression: "DEFLATE" });
}
