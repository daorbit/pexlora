import { routes } from "@/config/site";
import { accountCopy } from "@/content/landing";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { Band } from "@/components/ui/Band";
import { ButtonLink } from "@/components/ui/Button";
import { BandTitle } from "@/components/landing/BandTitle";

export function AccountBand() {
  return (
    <Band tone="pearl" className="lg:pb-40" containerClassName="flex flex-col gap-10">
      <BandTitle size="giant">
        {accountCopy.title}{" "}
        <span className="rounded-[14px] bg-primary px-[0.12em] text-primary-foreground lg:rounded-[22px]">
          {accountCopy.highlight}
        </span>
      </BandTitle>
      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-border-strong pt-8">
        <p className="text-[17px] text-secondary lg:text-[19px]">{accountCopy.description}</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <GoogleButton label={accountCopy.google} variant="ink" size="2xl" arrow className="sm:w-auto" />
          <ButtonLink href={routes.signUp} variant="outline" size="2xl">
            {accountCopy.email}
          </ButtonLink>
        </div>
      </div>
    </Band>
  );
}
