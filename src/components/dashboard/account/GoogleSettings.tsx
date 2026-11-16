import { Check } from "lucide-react";
import { routes } from "@/config/site";
import { accountCopy } from "@/content/account";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";
import { GoogleIcon } from "@/components/auth/GoogleIcon";
import { SettingsRow } from "@/components/dashboard/SettingsRow";

const copy = accountCopy.google;

export function GoogleSettings({ connected }: { connected: boolean }) {
  return (
    <SettingsRow
      label={copy.label}
      description={connected ? copy.description.connected : copy.description.disconnected}
    >
      {connected ? (
        <Badge tone="success" className="gap-1.5">
          <Check className="size-3" strokeWidth={3} aria-hidden />
          {copy.connected}
        </Badge>
      ) : (
        <a href={routes.googleLink} className={buttonClasses({ variant: "secondary", size: "sm" })}>
          <GoogleIcon className="size-3.5" />
          {copy.connect}
        </a>
      )}
    </SettingsRow>
  );
}
