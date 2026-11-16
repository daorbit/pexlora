import type { WorkspaceToolSlug } from "@/config/tools";
import { housePromoCopy } from "@/content/house-promos";

export type PromoPlacement = "results" | "footer";

export type HousePromo = {
  id: string;
  name: string;
  logoSrc: string;
  url: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
};

const quantalog = {
  name: "Quantalog",
  logoSrc: "/brand/partners/quantalog.png",
  url: "https://quantalog.daorbit.in",
};

export const housePromos: Record<PromoPlacement, HousePromo> = {
  results: { id: "quantalog-seo", ...quantalog, ...housePromoCopy.results },
  footer: { id: "quantalog-workspace", ...quantalog, ...housePromoCopy.footer },
};

export const resultsPromoTools: WorkspaceToolSlug[] = ["compress-image", "convert-format", "resize-image", "image-alt-text"];

export function promoHref(promo: HousePromo, placement: PromoPlacement) {
  const url = new URL(promo.url);
  url.searchParams.set("utm_source", "pexlora");
  url.searchParams.set("utm_medium", "house-ad");
  url.searchParams.set("utm_campaign", `${promo.id}-${placement}`);
  return url.toString();
}
