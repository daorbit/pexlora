import { company } from "@/config/company";
import { routes } from "@/config/site";
import { legalCopy } from "@/content/legal";
import { ButtonLink } from "@/components/ui/Button";

export function LegalContactCard() {
  return (
    <section className="theme-dark flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand-surface p-7 text-brand-foreground sm:flex-row sm:items-center sm:p-9">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-[-0.025em]">{legalCopy.questions}</h2>
        <p className="max-w-md text-[15px] leading-relaxed text-secondary">{legalCopy.questionsBody(company.legalName)}</p>
        <a href={`mailto:${company.email}`} className="font-mono text-sm text-accent-text hover:underline">
          {company.email}
        </a>
      </div>
      <div className="flex flex-wrap gap-2">
        <ButtonLink href={`mailto:${company.email}`} arrow>
          {legalCopy.email}
        </ButtonLink>
        <ButtonLink href={routes.contact} variant="outline">
          {legalCopy.contactForm}
        </ButtonLink>
      </div>
    </section>
  );
}
