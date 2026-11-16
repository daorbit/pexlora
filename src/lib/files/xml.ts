export type XmlField = { key: string; value: string };

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };

const TOKEN_PATTERN = /<(\/?)([\w.:-]+)((?:\s+[^\s=>/]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*(\/?)>|([^<]+)/g;
const ATTRIBUTE_PATTERN = /([^\s=>/]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;

export function decodeEntities(text: string) {
  return text.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (match, code: string) => {
    if (code[0] === "#") {
      const point = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(point) ? String.fromCodePoint(point) : match;
    }
    return ENTITIES[code] ?? match;
  });
}

function skipped(name: string, prefixes: string[]) {
  return prefixes.some((prefix) => name.startsWith(prefix));
}

export function readXmlFields(
  xml: string,
  { skip = [], attributes = false }: { skip?: string[]; attributes?: boolean } = {},
): XmlField[] {
  const stack: string[] = [];
  const values = new Map<string, string[]>();
  const push = (key: string, value: string) => {
    const clean = decodeEntities(value).trim();
    if (!clean) return;
    const existing = values.get(key) ?? [];
    if (!existing.includes(clean)) values.set(key, [...existing, clean]);
  };

  for (const match of xml.matchAll(TOKEN_PATTERN)) {
    const [, closing, name, rawAttributes, selfClosing, text] = match;
    if (text !== undefined) {
      const key = [...stack].reverse().find((entry) => !skipped(entry, skip));
      if (key) push(key, text);
      continue;
    }
    if (closing) {
      const index = stack.lastIndexOf(name);
      if (index !== -1) stack.length = index;
      continue;
    }
    if (attributes && rawAttributes) {
      for (const [, attribute, double, single] of rawAttributes.matchAll(ATTRIBUTE_PATTERN)) {
        if (attribute.includes(":") && !skipped(attribute, skip)) push(attribute, double ?? single ?? "");
      }
    }
    if (!selfClosing) stack.push(name);
  }

  return [...values].map(([key, list]) => ({ key, value: list.join(", ") }));
}

function escapeName(name: string) {
  return name.replace(/[.:]/g, "\\$&");
}

function attributePattern(attribute: string) {
  return new RegExp(`(\\s${escapeName(attribute)}\\s*=\\s*)(?:"([^"]*)"|'([^']*)')`, "g");
}

function elementPattern(name: string) {
  return new RegExp(`(<${escapeName(name)}(?:\\s[^>]*)?>)([^<]*)(</${escapeName(name)}>)`, "g");
}

export function attributeValues(xml: string, attribute: string) {
  return [...xml.matchAll(attributePattern(attribute))].map((match) => decodeEntities(match[2] ?? match[3] ?? ""));
}

export function elementTexts(xml: string, name: string) {
  return [...xml.matchAll(elementPattern(name))].map((match) => decodeEntities(match[2]));
}

export function replaceAttributeValues(xml: string, attributes: string[]) {
  return attributes.reduce((current, attribute) => current.replace(attributePattern(attribute), '$1""'), xml);
}

export function emptyElementTexts(xml: string, names: string[]) {
  return names.reduce((current, name) => current.replace(elementPattern(name), "$1$3"), xml);
}

export function emptyRootElement(xml: string) {
  const open = xml.match(/<(?!\?)([\w.:-]+)(\s[^>]*)?>/);
  if (!open || open.index === undefined || open[0].endsWith("/>")) return xml;
  const name = open[1];
  return `${xml.slice(0, open.index + open[0].length)}</${name}>`;
}

export function removeElements(xml: string, names: string[]) {
  return names.map(escapeName).reduce(
    (current, name) =>
      current
        .replace(new RegExp(`<${name}(\\s[^>]*)?>[\\s\\S]*?</${name}>`, "g"), "")
        .replace(new RegExp(`<${name}(\\s[^>]*)?/>`, "g"), ""),
    xml,
  );
}
