import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { promoHref, type HousePromo, type PromoPlacement } from "@/config/house-promos";
import { cn } from "@/lib/utils/cn";

type HousePromoStripProps = { promo: HousePromo; placement: PromoPlacement; className?: string };

export function HousePromoStrip({ promo, placement, className }: HousePromoStripProps) {
  return (
    <a
      href={promoHref(promo, placement)}
      target="_blank"
      rel="noopener"
      className={cn(
        "group flex items-center gap-3 transition-colors hover:bg-fill focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      <Image src={promo.logoSrc} alt="" width={28} height={28} className="size-7 shrink-0 rounded-lg" />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[10.5px] font-semibold tracking-[0.06em] text-tertiary uppercase">{promo.eyebrow}</span>
        <span className="truncate text-[13px] text-secondary">
          <span className="font-semibold text-foreground">{promo.title}</span> {promo.body}
        </span>
      </span>
      <span className="inline-flex shrink-0 items-center gap-0.5 text-[13px] font-semibold text-accent-text">
        {promo.cta}
        <ArrowUpRight className="size-3.5 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden />
      </span>
    </a>
  );
}
