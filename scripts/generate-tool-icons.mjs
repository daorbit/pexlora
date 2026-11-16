import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..", "public", "icons");
const brandMark = path.resolve(import.meta.dirname, "..", "public", "brand", "pexlora-mark.png");
const WHITE = "#FFFFFF";
const INK = "#10120D";
const font = "font-family=\"Inter, -apple-system, 'Segoe UI', Arial, sans-serif\" font-weight=\"800\" text-anchor=\"middle\"";

const colors = {
  coral: "#F0504A",
  violet: "#7457F5",
  magenta: "#D63A8C",
  green: "#1F9D55",
  amber: "#F2A11F",
  lime: "#B9F12F",
  orange: "#F26B1D",
};

function photoCard(tile, { x = 8, y = 10, w = 26, h = 22 } = {}) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${WHITE}"/>
<path d="M${x + 3} ${y + h - 3}l6.5-7.5a1.5 1.5 0 0 1 2.2-.1l4.3 4.6 2.6-2.8a1.5 1.5 0 0 1 2.2 0l5.2 5.8z" fill="${tile}"/>
<circle cx="${x + w - 7}" cy="${y + 7}" r="2.6" fill="${tile}"/>`;
}

function badge(tile, inner, cx = 34, cy = 33) {
  return `<circle cx="${cx}" cy="${cy}" r="10" fill="${tile}"/>
<circle cx="${cx}" cy="${cy}" r="8" fill="${WHITE}"/>
${inner}`;
}

function aiTag(tile) {
  return `<rect x="28.5" y="4" width="15.5" height="10.5" rx="3.5" fill="${WHITE}"/>
<text x="36.25" y="12.2" font-size="7.6" fill="${tile}" ${font}>AI</text>`;
}

const tools = {
  "remove-metadata": (c = colors.coral) =>
    photoCard(c) +
    badge(c, `<circle cx="34" cy="33" r="4.3" fill="none" stroke="${c}" stroke-width="2.2"/><path d="m31 36 6-6" stroke="${c}" stroke-width="2.2" stroke-linecap="round"/>`),
  "view-metadata": (c = colors.violet) =>
    photoCard(c) +
    badge(c, `<circle cx="33" cy="32" r="3.6" fill="none" stroke="${c}" stroke-width="2.3"/><path d="m35.7 34.7 2.6 2.6" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/>`),
  "edit-metadata": (c = colors.magenta) =>
    photoCard(c) +
    badge(c, `<path d="M36.4 28.6a1.8 1.8 0 0 1 2.5 2.5l-6.2 6.2-3.4.9.9-3.4z" fill="${c}"/>`),
  "compress-image": (c = colors.green) => `<rect x="12" y="8" width="24" height="32" rx="5" fill="${WHITE}"/>
<path d="M19 24h10" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>
<path d="m19.5 13.5 4.5 4.5 4.5-4.5" fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="m19.5 34.5 4.5-4.5 4.5 4.5" fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,
  "resize-image": (c = colors.amber) => `<rect x="9.5" y="9.5" width="29" height="29" rx="5" fill="none" stroke="${WHITE}" stroke-width="3" stroke-dasharray="5 3.4"/>
<rect x="9" y="25" width="14" height="14" rx="4" fill="${WHITE}"/>
<path d="M26 22l8-8M27.5 14H34v6.5" fill="none" stroke="${WHITE}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  "convert-format": () => `<rect x="8" y="8" width="15" height="15" rx="4" fill="${INK}"/>
<rect x="25" y="25" width="15" height="15" rx="4" fill="${INK}"/>
<path d="M27 11.5h3.5a5 5 0 0 1 5 5V20" fill="none" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>
<path d="m32.5 18 3 3 3-3" fill="none" stroke="${INK}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 36.5h-3.5a5 5 0 0 1-5-5V28" fill="none" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>
<path d="m9.5 30 3-3 3 3" fill="none" stroke="${INK}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`,
};

const aiTools = {
  "image-alt-text": {
    tint: "#E3F7FD",
    color: "#0FA3D4",
    glyph: `<rect x="29" y="30" width="10" height="2.4" rx="1.2" fill="${WHITE}"/><rect x="29" y="34.8" width="7" height="2.4" rx="1.2" fill="${WHITE}"/>`,
  },
  "ai-text-detector": {
    tint: "#E7EDFF",
    color: "#2F5BFF",
    glyph: `<circle cx="33" cy="32.4" r="3.6" fill="none" stroke="${WHITE}" stroke-width="2.3"/><path d="m35.7 35.1 2.5 2.5" stroke="${WHITE}" stroke-width="2.4" stroke-linecap="round"/>`,
  },
  "ai-humanizer": {
    tint: "#F2E8FF",
    color: "#8B3CF6",
    glyph: `<circle cx="31.4" cy="31.6" r="1.2" fill="${WHITE}"/><circle cx="36.6" cy="31.6" r="1.2" fill="${WHITE}"/><path d="M30.6 34.6c1.9 2.2 4.9 2.2 6.8 0" fill="none" stroke="${WHITE}" stroke-width="1.9" stroke-linecap="round"/>`,
  },
};

async function brandMarkDataUrl() {
  const png = await sharp(brandMark).resize(112, 112).png().toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

function aiToolSvg({ tint, color, glyph }, mark) {
  return svg(`<rect width="48" height="48" rx="12" fill="${tint}"/>
<image href="${mark}" x="5" y="5" width="30" height="30"/>
<circle cx="34" cy="34" r="11" fill="${tint}"/>
<circle cx="34" cy="34" r="9" fill="${color}"/>
${glyph}`);
}

const tileColors = {
  "remove-metadata": colors.coral,
  "view-metadata": colors.violet,
  "edit-metadata": colors.magenta,
  "compress-image": colors.green,
  "resize-image": colors.amber,
  "convert-format": colors.lime,
};

const formats = {
  jpg: { label: "JPG", color: "#E8A80C" },
  png: { label: "PNG", color: "#1F9D55" },
  webp: { label: "WEBP", color: "#7457F5" },
  avif: { label: "AVIF", color: "#F0504A" },
  gif: { label: "GIF", color: "#D63A8C" },
  tiff: { label: "TIFF", color: "#6B6F64" },
};

const sources = ["jpg", "png", "webp", "avif", "gif", "tiff"];
const outputs = ["jpg", "png", "webp", "avif"];

function svg(body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">\n${body}\n</svg>\n`;
}

function toolSvg(slug) {
  return svg(`<rect width="48" height="48" rx="12" fill="${tileColors[slug]}"/>\n${tools[slug]()}`);
}

function conversionSvg(from, to) {
  const source = formats[from];
  const target = formats[to];
  const pillSize = source.label.length > 3 ? 7 : 8.5;
  const docSize = target.label.length > 3 ? 9 : 10.5;

  return svg(`<path d="M17 10h16l11 11v20a5 5 0 0 1-5 5H17a5 5 0 0 1-5-5V15a5 5 0 0 1 5-5z" fill="${target.color}"/>
<path d="M33 10v7a4 4 0 0 0 4 4h7z" fill="${WHITE}" fill-opacity="0.35"/>
<path d="M21 28.5h11m-4-4 4 4-4 4" fill="none" stroke="${WHITE}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
<text x="28" y="42" font-size="${docSize}" fill="${WHITE}" ${font}>${target.label}</text>
<rect x="2" y="3" width="25" height="14" rx="5" fill="${source.color}" stroke="${WHITE}" stroke-width="2"/>
<text x="14.5" y="12.9" font-size="${pillSize}" fill="${WHITE}" ${font}>${source.label}</text>`);
}

await mkdir(path.join(root, "tools"), { recursive: true });
await mkdir(path.join(root, "convert"), { recursive: true });

for (const slug of Object.keys(tools)) {
  await writeFile(path.join(root, "tools", `${slug}.svg`), toolSvg(slug));
}

const mark = await brandMarkDataUrl();
for (const [slug, tool] of Object.entries(aiTools)) {
  await writeFile(path.join(root, "tools", `${slug}.svg`), aiToolSvg(tool, mark));
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
