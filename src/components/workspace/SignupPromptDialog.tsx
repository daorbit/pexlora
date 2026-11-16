"use client";

import { createPortal } from "react-dom";
import { Check, Download, Mail, X } from "lucide-react";
import { housePromos } from "@/config/house-promos";
import { routes } from "@/config/site";
import { signupPromptCopy } from "@/content/workspace";
import { useModalDismiss } from "@/hooks/useModalDismiss";
import { withNextParam } from "@/lib/url/next-path";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { HousePromoStrip } from "@/components/promo/HousePromoStrip";

type SignupPromptDialogProps = { next: string; count: number; onSkip: () => void; onClose: () => void };

const TITLE_ID = "signup-prompt-title";

export function SignupPromptDialog({ next, count, onSkip, onClose }: SignupPromptDialogProps) {
  useModalDismiss(onClose);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={TITLE_ID}
      className="fixed inset-0 z-50 flex items-end justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:items-center sm:p-4"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label={signupPromptCopy.close}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] motion-safe:animate-fade-in"
      />
      <div className="relative flex max-h-[92dvh] w-full max-w-[420px] flex-col overflow-hidden rounded-3xl bg-surface text-foreground shadow-card motion-safe:animate-pop">
        <div className="flex flex-col gap-5 overflow-y-auto p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-md bg-success-soft px-2 py-1 text-xs font-semibold text-success">
              <Check className="size-3.5" strokeWidth={3} aria-hidden />
              {signupPromptCopy.ready(count)}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label={signupPromptCopy.close}
              className="-m-1.5 inline-flex size-8 items-center justify-center rounded-lg text-tertiary transition-colors hover:bg-fill hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <h2 id={TITLE_ID} className="text-[26px] leading-[1.15] font-semibold tracking-[-0.028em]">
              <Highlight>{signupPromptCopy.highlight}</Highlight> {signupPromptCopy.title}
            </h2>
            <p className="text-sm text-secondary">{signupPromptCopy.body}</p>
          </div>

          <ul className="flex flex-col gap-2.5">
            {signupPromptCopy.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2.5 text-sm font-medium">
                <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
                {perk}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2.5">
            <div className="grid grid-cols-2 gap-2">
              <GoogleButton label={signupPromptCopy.google} next={next} variant="ink" size="lg" />
              <ButtonLink href={withNextParam(routes.signUp, next)} variant="secondary" size="lg" className="w-full">
                <Mail className="size-4" aria-hidden />
                {signupPromptCopy.email}
              </ButtonLink>
            </div>
            <Button type="button" variant="plain" size="lg" autoFocus onClick={onSkip} className="h-11 w-full text-secondary hover:text-foreground">
              <Download className="size-4" aria-hidden />
              {signupPromptCopy.skip}
            </Button>
          </div>
        </div>

        <HousePromoStrip promo={housePromos.download} placement="download" className="border-t border-separator bg-subtle px-6 py-3.5" />
      </div>
    </div>,
    document.body,
  );
}
