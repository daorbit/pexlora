import type { MetadataRoute } from "next";
import { brandAssets, brandColors } from "@/config/brand";
import { seo } from "@/config/seo";
import { shareTarget, shareTargetAccept } from "@/config/share-target";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${siteConfig.name}: Remove Metadata, Compress & Resize Images`,
    short_name: siteConfig.name,
    description: seo.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: brandColors.pearl,
    theme_color: brandColors.pearl,
    categories: ["utilities", "photo", "productivity"],
    share_target: {
      action: shareTarget.action,
      method: "POST",
      enctype: "multipart/form-data",
      params: { files: [{ name: shareTarget.field, accept: shareTargetAccept }] },
    },
    icons: [
      { src: brandAssets.iconLight, sizes: "512x512", type: "image/png", purpose: "any" },
      { src: brandAssets.iconLight, sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: brandAssets.appleTouchIcon, sizes: "180x180", type: "image/png" },
    ],
  };
}
