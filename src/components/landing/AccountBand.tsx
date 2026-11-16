import { routes } from "@/config/site";
import { accountCopy } from "@/content/landing";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function AccountBand() {
  return (
    <section className="pb-16 sm:pb-22">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-[32px] bg-primary p-8 text-primary-foreground sm:p-14">
          <div className="flex max-w-xl flex-col gap-3">
            <h2 className="text-[28px] leading-[1.08] font-semibold tracking-[-0.028em] sm:text-[38px]">
              {accountCopy.title}
            </h2>
            <p className="text-[17px] opacity-80">{accountCopy.description}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <GoogleButton
              label={accountCopy.google}
              className="border-transparent bg-white text-primary-foreground hover:bg-white/85 sm:w-auto"
            />
            <ButtonLink
              href={routes.signUp}
              variant="ink"
              size="xl"
              arrow
              className="bg-primary-foreground text-white hover:bg-primary-foreground/85"
            >
              {accountCopy.email}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
