import { routes } from "@/config/site";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";

export function UpsellAlert({ message, upsell }: { message: string | null; upsell: boolean }) {
  if (!message) return null;

  return (
    <Alert
      message={message}
      action={
        upsell && (
          <ButtonLink href={routes.signUp} size="sm">
            Create Free Account
          </ButtonLink>
        )
      }
    />
  );
}
