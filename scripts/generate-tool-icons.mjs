import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "public", "icons");

const photoFrame =
  '<path d="M21 11.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6.5"/><path d="m3 16 4.3-4.3a2 2 0 0 1 2.8 0l2.4 2.4"/><circle cx="15.5" cy="7.5" r="1.6"/>';

const tools = {
  "remove-metadata": {
    color: "#F25C54",
    glyph: `${photoFrame}<circle cx="18" cy="18" r="3.75"/><path d="m15.4 20.6 5.2-5.2"/>`,
  },
  "view-metadata": {
    color: "#7C5CFF",
    glyph: `${photoFrame}<circle cx="17" cy="17" r="3.25"/><path d="m21.5 21.5-2.2-2.2"/>`,
  },
  "edit-metadata": {
    color: "#E0479E",
    glyph: `${photoFrame}<path d="M21.4 14.6a1.55 1.55 0 0 0-2.2 0L14.5 19.3V21.5h2.2l4.7-4.7a1.55 1.55 0 0 0 0-2.2z"/>`,
  },
  "compress-image": {
    color: "#22A861",
    glyph:
      '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13.5h6"/><path d="m10 9.5 2 2 2-2"/><path d="m10 19 2-2 2 2"/>',
  },
  "resize-image": {
    color: "#F5A524",
    glyph:
      '<path d="M3 10.5V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><path d="m13.5 10.5 4-4"/><path d="M13.5 6.5h4v4"/>',
  },
  "convert-format": {
    color: "#B9F12F",
    ink: "#10120D",
    glyph:
      '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/><path d="M14.5 5H17a3 3 0 0 1 3 3v2"/><path d="m18 8.2 2 2 2-2"/><path d="M9.5 19H7a3 3 0 0 1-3-3v-2"/><path d="m2 15.8 2-2 2 2"/>',
  },
};

const aiTile = "#1F2318";
const aiInk = "#B9F12F";

Object.assign(tools, {
  "image-alt-text": {
    color: aiTile,
    ink: aiInk,
    glyph: `${photoFrame}<path d="M15 16.5h6"/><path d="M15 20h4"/>`,
  },
  "ai-text-detector": {
    color: aiTile,
    ink: aiInk,
    glyph:
      '<path d="M11.5 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8l5 5v2.5"/><path d="M8 9h4"/><path d="M8 13h3"/><circle cx="17" cy="16.5" r="3.25"/><path d="m21.5 21-2.2-2.2"/>',
  },
  "ai-humanizer": {
    color: aiTile,
    ink: aiInk,
    glyph:
      '<path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3.5 20.5l1.4-4.6A8.5 8.5 0 1 1 21 11.5z"/><path d="M9 13a3.6 3.6 0 0 0 6 0"/><path d="M9.5 9.2h.01"/><path d="M14.5 9.2h.01"/>',
  },
});

const formats = {
  jpg: { label: "JPG", color: "#E8A80C" },
  png: { label: "PNG", color: "#22A861" },
  webp: { label: "WEBP", color: "#7C5CFF" },
  avif: { label: "AVIF", color: "#F25C54" },
  gif: { label: "GIF", color: "#E0479E" },
  tiff: { label: "TIFF", color: "#6B6F64" },
};

const sources = ["jpg", "png", "webp", "avif", "gif", "tiff"];
const outputs = ["jpg", "png", "webp", "avif"];

const font = "font-family=\"Inter, -apple-system, 'Segoe UI', Arial, sans-serif\" font-weight=\"800\" text-anchor=\"middle\"";

function toolSvg({ color, ink = "#FFFFFF", glyph }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
<rect width="48" height="48" rx="10" fill="${color}"/>
<g transform="translate(10 10) scale(1.1667)" fill="none" stroke="${ink}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${glyph}</g>
</svg>
`;
}

function conversionSvg(from, to) {
  const source = formats[from];
  const target = formats[to];
  const pillSize = source.label.length > 3 ? 7 : 8.5;
  const docSize = target.label.length > 3 ? 9 : 10.5;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
<path d="M17 10h16l11 11v20a5 5 0 0 1-5 5H17a5 5 0 0 1-5-5V15a5 5 0 0 1 5-5z" fill="${target.color}"/>
<path d="M33 10v7a4 4 0 0 0 4 4h7z" fill="#FFFFFF" fill-opacity="0.35"/>
<path d="M21 28.5h11m-4-4 4 4-4 4" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
<text x="28" y="42" font-size="${docSize}" fill="#FFFFFF" ${font}>${target.label}</text>
<rect x="2" y="3" width="25" height="14" rx="5" fill="${source.color}" stroke="#FFFFFF" stroke-width="2"/>
<text x="14.5" y="12.9" font-size="${pillSize}" fill="#FFFFFF" ${font}>${source.label}</text>
</svg>
`;
}

await mkdir(path.join(root, "tools"), { recursive: true });
await mkdir(path.join(root, "convert"), { recursive: true });

for (const [slug, tool] of Object.entries(tools)) {
  await writeFile(path.join(root, "tools", `${slug}.svg`), toolSvg(tool));
}

let count = 0;
for (const from of sources) {
  for (const to of outputs) {
    if (from === to) continue;
    await writeFile(path.join(root, "convert", `${from}-to-${to}.svg`), conversionSvg(from, to));
    count += 1;
  }
}

console.log(`Wrote ${Object.keys(tools).length} tool icons and ${count} conversion icons to public/icons`);
