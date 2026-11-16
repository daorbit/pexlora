import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public", "samples");
const WIDTH = 1200;
const HEIGHT = 900;

const scenes = {
  "ai-render": `
    <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2b1a5a"/><stop offset="0.55" stop-color="#c2508f"/><stop offset="1" stop-color="#ffb37a"/>
        </linearGradient>
        <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stop-color="#fff4d6"/><stop offset="1" stop-color="#ffd08a" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#sky)"/>
      <circle cx="760" cy="520" r="260" fill="url(#sun)"/>
      <circle cx="760" cy="520" r="90" fill="#fff1d0"/>
      <path d="M0 620 L180 470 L330 560 L520 380 L700 540 L880 420 L1060 560 L1200 480 L1200 900 L0 900Z" fill="#5a2d6e"/>
      <path d="M0 700 L220 580 L420 660 L640 560 L860 690 L1040 610 L1200 680 L1200 900 L0 900Z" fill="#3b1d52"/>
      <path d="M0 790 L260 720 L520 780 L780 710 L1000 770 L1200 730 L1200 900 L0 900Z" fill="#22113a"/>
    </svg>`,
  "phone-photo": `
    <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#5aa9e6"/><stop offset="1" stop-color="#d6ecfa"/>
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#1f7fb8"/><stop offset="1" stop-color="#0d4f7a"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#sky)"/>
      <ellipse cx="300" cy="200" rx="160" ry="38" fill="#ffffff" opacity="0.85"/>
      <ellipse cx="860" cy="140" rx="210" ry="44" fill="#ffffff" opacity="0.7"/>
      <path d="M0 520 L1200 520 L1200 900 L0 900Z" fill="url(#sea)"/>
      <path d="M640 900 C760 700 980 620 1200 600 L1200 900Z" fill="#e8d3a8"/>
      <path d="M0 520 C140 470 260 480 380 520Z" fill="#3f7a5a"/>
    </svg>`,
};

const metadata = {
  "ai-render": {
    exif: {
      IFD0: {
        Software: "Midjourney v6.1",
        Artist: "midjourney-bot",
        ImageDescription: "a dreamy sunset over violet mountains, cinematic, --ar 4:3 --v 6.1",
      },
    },
    xmp: `<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?><x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/" Iptc4xmpExt:DigitalSourceType="http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia" xmp:CreatorTool="Midjourney v6.1" photoshop:Credit="Made with AI"/></rdf:RDF></x:xmpmeta><?xpacket end="w"?>`,
  },
  "phone-photo": {
    exif: {
      IFD0: {
        Make: "Apple",
        Model: "iPhone 15 Pro",
        Software: "17.4.1",
        DateTime: "2026:10:14 17:42:09",
      },
      IFD2: {
        DateTimeOriginal: "2026:10:14 17:42:09",
        LensModel: "iPhone 15 Pro back triple camera 6.86mm f/1.78",
      },
      IFD3: {
        GPSLatitudeRef: "N",
        GPSLatitude: "15/1 29/1 4512/100",
        GPSLongitudeRef: "E",
        GPSLongitude: "73/1 48/1 3360/100",
      },
    },
  },
};

await mkdir(outDir, { recursive: true });

for (const [name, svg] of Object.entries(scenes)) {
  const { exif, xmp } = metadata[name];
  let pipeline = sharp(Buffer.from(svg)).jpeg({ quality: 86, mozjpeg: true }).withExif(exif);
  if (xmp) pipeline = pipeline.withXmp(xmp);
  await pipeline.toFile(path.join(outDir, `${name}.jpg`));
}

console.log(`Wrote ${Object.keys(scenes).length} samples to public/samples`);
