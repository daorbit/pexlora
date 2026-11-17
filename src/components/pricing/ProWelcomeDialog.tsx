"use client";

import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { PlanId } from "@/config/plans";
import { routes } from "@/config/site";
import { planCopy, pricingCopy, proWelcomeCopy } from "@/content/pricing";
import { useModalDismiss } from "@/hooks/useModalDismiss";
import { formatDate } from "@/lib/utils/format-date";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Highlight } from "@/components/ui/Highlight";
import { PlanGemIcon } from "@/components/icons/PlanGemIcon";
import { planGems } from "@/components/pricing/plan-visuals";

export type ProWelcome = { plan: PlanId; expiresAt: string | null };

type ProWelcomeDialogProps = ProWelcome & { onClose: () => void };

const TITLE_ID = "pro-welcome-title";

export function ProWelcomeDialog({ plan, expiresAt, onClose }: ProWelcomeDialogProps) {
  useModalDismiss(onClose);
  const planName = planCopy[plan].name;
  const validity = expiresAt ? proWelcomeCopy.until(planName, formatDate(expiresAt, "long")) : proWelcomeCopy.lifetime;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={TITLE_ID}
      className="fixed inset-0 z-[105] flex items-end justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:items-center sm:p-4"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label={proWelcomeCopy.close}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] motion-safe:animate-fade-in"
      />
      <div className="relative flex max-h-[92dvh] w-full max-w-105 flex-col gap-6 overflow-y-auto rounded-3xl bg-surface p-6 text-center text-foreground shadow-card motion-safe:animate-pop sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label={proWelcomeCopy.close}
          className="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-lg text-tertiary transition-colors hover:bg-fill hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <X className="size-4" aria-hidden />
        </button>

        <div className="relative mx-auto mt-2 flex size-24 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-primary/40 motion-safe:animate-celebrate-ring" aria-hidden />
          <span className="absolute inset-2 rounded-full bg-primary/25" aria-hidden />
          <PlanGemIcon
            gem={planGems[plan]}
            facets="dark"
            className="relative size-16 motion-safe:animate-pop motion-safe:[animation-delay:0.15s]"
          />
        </div>

        <div className="flex flex-col gap-2 motion-safe:animate-fade-up motion-safe:[animation-delay:0.2s]">
          <p className="text-[12px] font-semibold tracking-[0.08em] text-tertiary uppercase">{proWelcomeCopy.eyebrow}</p>
          <h2 id={TITLE_ID} className="text-[30px] leading-[1.1] font-bold tracking-[-0.035em] sm:text-[34px]">
            <Highlight>{proWelcomeCopy.highlight}</Highlight> {proWelcomeCopy.title}
          </h2>
          <p className="text-sm text-secondary">{validity}</p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-fill p-4 text-left motion-safe:animate-fade-up motion-safe:[animation-delay:0.35s]">
          <p className="text-[12px] font-semibold tracking-[0.06em] text-tertiary uppercase">{proWelcomeCopy.perksTitle}</p>
          <CheckList items={pricingCopy.perks} />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row-reverse">
          <ButtonLink href={routes.dashboard} variant="ink" size="lg" arrow className="w-full sm:flex-1">
            {proWelcomeCopy.start}
          </ButtonLink>
          <ButtonLink href={routes.dashboardSettings} variant="secondary" size="lg" className="w-full sm:flex-1">
            {proWelcomeCopy.billing}
          </ButtonLink>
        </div>
      </div>
    </div>,
    document.body,
  );
}
