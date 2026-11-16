"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { promoHref, type HousePromo, type PromoPlacement } from "@/config/house-promos";
import { housePromoCopy } from "@/content/house-promos";
import { useDismissed } from "@/hooks/useDismissed";
import { cn } from "@/lib/utils/cn";
import { buttonClasses, ButtonContent } from "@/components/ui/Button";

type HousePromoCardProps = {
  promo: HousePromo;
  placement: PromoPlacement;
  dismissible?: boolean;
  className?: string;
};

function PromoBody({ promo, placement, onDismiss, className }: HousePromoCardProps & { onDismiss?: () => void }) {
  return (
    <aside
      aria-label={promo.eyebrow}
      className={cn("flex flex-col gap-3 rounded-2xl border border-separator bg-surface p-4", className)}
    >
      <div className="flex items-center gap-2.5">
        <Image src={promo.logoSrc} alt="" width={28} height={28} className="size-7 shrink-0 rounded-lg" />
        <p className="flex-1 text-[11px] font-semibold tracking-[0.06em] text-tertiary uppercase">{promo.eyebrow}</p>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label={housePromoCopy.dismiss}
            className="-m-1 inline-flex size-7 items-center justify-center rounded-lg text-tertiary transition-colors hover:bg-fill hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <X className="size-4" aria-hidden />
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[15px] font-semibold tracking-[-0.01em]">{promo.title}</p>
        <p className="text-[13px] leading-relaxed text-secondary">{promo.body}</p>
      </div>
      <a
        href={promoHref(promo, placement)}
        target="_blank"
        rel="noopener"
        className={buttonClasses({ variant: "ink", size: "sm", arrow: true, className: "self-start" })}
      >
        <ButtonContent variant="ink" size="sm" arrow>
          {promo.cta}
        </ButtonContent>
      </a>
    </aside>
  );
}

function DismissiblePromo(props: HousePromoCardProps) {
  const [dismissed, dismiss] = useDismissed(props.promo.id);
  if (dismissed) return null;
  return <PromoBody {...props} onDismiss={dismiss} className={cn("motion-safe:animate-fade-up", props.className)} />;
}

export function HousePromoCard(props: HousePromoCardProps) {
  return props.dismissible ? <DismissiblePromo {...props} /> : <PromoBody {...props} />;
}
