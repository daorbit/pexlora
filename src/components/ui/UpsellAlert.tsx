import { routes } from "@/config/site";
import { upsellCopy } from "@/content/pricing";
import type { Upsell } from "@/lib/api/upsell";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";

const upsellHref = { account: routes.signUp, pro: routes.pricing } as const;

export function UpsellAlert({ message, upsell }: { message: string | null; upsell: Upsell }) {
  if (!message) return null;

  return (
    <Alert
      message={message}
      action={
        upsell && (
          <ButtonLink href={upsellHref[upsell]} size="sm">
            {upsellCopy[upsell]}
          </ButtonLink>
        )
      }
    />
  );
}
