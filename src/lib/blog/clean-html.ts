import "server-only";
import sanitizeHtml from "sanitize-html";

const TEXT_TAGS = ["p", "br", "hr", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s", "del", "mark", "sub", "sup", "small", "span", "div"];
const BLOCK_TAGS = ["ul", "ol", "li", "blockquote", "aside", "pre", "code", "figure", "figcaption", "img", "a"];
const TABLE_TAGS = ["table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption"];

const options: sanitizeHtml.IOptions = {
  allowedTags: [...TEXT_TAGS, ...BLOCK_TAGS, ...TABLE_TAGS],
  allowedAttributes: {
    "*": ["class"],
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading"],
    div: ["data-callout", "data-columns", "data-emoji"],
    h2: ["id"],
    h3: ["id"],
    th: ["colspan", "rowspan", "scope"],
    td: ["colspan", "rowspan"],
    ol: ["start"],
  },
  allowedSchemes: ["https", "http", "mailto"],
  allowedSchemesByTag: { img: ["https"] },
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs: attribs.target === "_blank" ? { ...attribs, rel: "noopener noreferrer" } : attribs,
    }),
  },
};

export function cleanPostHtml(html: string) {
  return sanitizeHtml(html, options);
}
