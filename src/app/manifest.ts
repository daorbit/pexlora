import type { MetadataRoute } from "next";
import { brandAssets, brandColors } from "@/config/brand";
import { seo } from "@/config/seo";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${siteConfig.name}: Metadata Cleaner`,
    short_name: siteConfig.name,
    description: seo.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: brandColors.pearl,
    theme_color: brandColors.pearl,
    categories: ["utilities", "photo", "productivity"],
    icons: [
      { src: brandAssets.iconLight, sizes: "512x512", type: "image/png", purpose: "any" },
      { src: brandAssets.iconLight, sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: brandAssets.appleTouchIcon, sizes: "180x180", type: "image/png" },
    ],
  };
}
