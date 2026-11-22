import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brandAssets } from "@/config/brand";
import { toolIconSrc } from "@/config/tools";
import type { OgCard } from "@/lib/seo/og-cards";
import { OG_SIZE } from "@/lib/seo/og-path";
import { OgToolImage } from "@/components/og/OgToolImage";

const DESCRIPTION_MAX = 150;

const publicFile = (src: string) => readFile(join(process.cwd(), "public", src));

let sharedAssets: ReturnType<typeof loadSharedAssets> | null = null;

async function loadSharedAssets() {
  const [regular, bold, mark] = await Promise.all([
    publicFile("/fonts/LiberationSans-Regular.ttf"),
    publicFile("/fonts/LiberationSans-Bold.ttf"),
    publicFile(brandAssets.mark),
  ]);
  return {
    markData: `data:image/png;base64,${mark.toString("base64")}`,
    fonts: [
      { name: "Liberation Sans", data: regular, weight: 400 as const, style: "normal" as const },
      { name: "Liberation Sans", data: bold, weight: 700 as const, style: "normal" as const },
    ],
  };
}

async function svgDataUri(src: string) {
  const data = await publicFile(src).catch(() => publicFile(toolIconSrc("remove-metadata")));
  return `data:image/svg+xml;base64,${data.toString("base64")}`;
}

function shorten(text: string) {
  if (text.length <= DESCRIPTION_MAX) return text;
  const cut = text.slice(0, DESCRIPTION_MAX);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export async function renderOgImage(card: OgCard) {
  sharedAssets ??= loadSharedAssets();
  const [iconData, { markData, fonts }] = await Promise.all([svgDataUri(card.iconSrc), sharedAssets]);

  return new ImageResponse(
    <OgToolImage name={card.name} description={shorten(card.description)} iconData={iconData} markData={markData} />,
    { ...OG_SIZE, fonts },
  );
}
