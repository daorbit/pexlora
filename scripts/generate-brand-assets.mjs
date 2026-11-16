import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const source = path.join(root, "public", "Pexlora.png");
const outDir = path.join(root, "public", "brand");

const MARK_REGION = { left: 541, top: 242, width: 464, height: 507 };
const BACKGROUND = [251, 251, 253];
const SATURATION_EDGE = [36, 72];
const MARK_SIZE = 512;
const TILES = {
  light: { background: "#ffffff" },
  dark: { background: "#1c1c1e" },
};

function smoothstep(edge0, edge1, value) {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function cutOutMark(data) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const saturation = Math.max(r, g, b) - Math.min(r, g, b);
    const alpha = smoothstep(SATURATION_EDGE[0], SATURATION_EDGE[1], saturation);

    if (alpha > 0 && alpha < 1) {
      for (let c = 0; c < 3; c++) {
        const base = BACKGROUND[c];
        const value = (data[i + c] - base * (1 - alpha)) / alpha;
        data[i + c] = Math.round(Math.min(255, Math.max(0, value)));
      }
    }

    data[i + 3] = Math.round(alpha * 255);
  }
  return data;
}

async function extractMark() {
  const { data, info } = await sharp(source)
    .extract(MARK_REGION)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cutout = await sharp(cutOutMark(data), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();

  const trimmed = await sharp(cutout).trim({ threshold: 1 }).toBuffer();
  const inner = 480;
  const padding = (MARK_SIZE - inner) / 2;

  return sharp(trimmed)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

function roundedMask(size, radiusRatio) {
  const radius = Math.round(size * radiusRatio);
  return Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`,
  );
}

async function tile(mark, size, background, { rounded = true, markScale = 0.66 } = {}) {
  const markPixels = Math.round(size * markScale);
  const markLayer = await sharp(mark).resize(markPixels, markPixels).png().toBuffer();
  const base = sharp({
    create: { width: size, height: size, channels: 4, background },
  }).composite([{ input: markLayer, gravity: "center" }]);

  const flat = await base.png().toBuffer();
  if (!rounded) return flat;

  return sharp(flat)
    .composite([{ input: roundedMask(size, 0.2237), blend: "dest-in" }])
    .png()
    .toBuffer();
}

function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);

  return Buffer.concat([header, entry, png]);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const mark = await extractMark();
  const outputs = { "pexlora-mark.png": mark };

  for (const [theme, { background }] of Object.entries(TILES)) {
    outputs[`icon-${theme}-64.png`] = await tile(mark, 64, background);
    outputs[`icon-${theme}-512.png`] = await tile(mark, 512, background);
  }

  outputs["apple-touch-icon.png"] = await tile(mark, 180, TILES.light.background, {
    rounded: false,
    markScale: 0.62,
  });

  await Promise.all(
    Object.entries(outputs).map(([name, buffer]) => writeFile(path.join(outDir, name), buffer)),
  );

  const icoPng = await tile(mark, 32, TILES.light.background);
  await writeFile(path.join(root, "public", "favicon.ico"), pngToIco(icoPng, 32));

  console.log(`Wrote ${Object.keys(outputs).length + 1} files to public/brand and public/favicon.ico`);
}

await main();
