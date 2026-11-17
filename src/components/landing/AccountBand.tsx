import { routes } from "@/config/site";
import { accountCopy } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { Band } from "@/components/ui/Band";
import { ButtonLink } from "@/components/ui/Button";
import { ResponsiveLabel } from "@/components/ui/ResponsiveLabel";
import { BandText } from "@/components/landing/BandText";
import { BandTitle } from "@/components/landing/BandTitle";

const buttonSize = "h-12 min-w-0 flex-1 basis-0 text-sm sm:h-14 sm:flex-none sm:basis-auto sm:text-base";

export function AccountBand() {
  return (
    <Band tone="pearl" className="lg:pb-40" containerClassName="flex flex-col gap-6 sm:gap-10">
      <BandTitle size="giant">
        {accountCopy.title}{" "}
        <span className="inline-block rounded-xl bg-primary px-[0.12em] text-primary-foreground translated:bg-transparent translated:px-0 translated:text-inherit lg:rounded-[22px]">
          {accountCopy.highlight}
        </span>
      </BandTitle>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-strong pt-5 sm:gap-6 sm:pt-8">
        <BandText>{accountCopy.description}</BandText>
        <div className="flex w-full gap-2 sm:w-auto sm:gap-3">
          <GoogleButton
            label={<ResponsiveLabel short={accountCopy.googleShort} full={accountCopy.google} />}
            variant="ink"
            size="xl"
            arrow
            className={cn("w-auto", buttonSize)}
          />
          <ButtonLink href={routes.signUp} variant="outline" size="xl" className={buttonSize}>
            <ResponsiveLabel short={accountCopy.emailShort} full={accountCopy.email} />
          </ButtonLink>
        </div>
      </div>
    </Band>
  );
}
