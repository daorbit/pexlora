import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/config/company";
import { routes } from "@/config/site";
import { contactDetails } from "@/content/contact";

const rowClasses =
  "group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-fill focus-visible:outline-2 focus-visible:outline-ring";

const externalLinks = [
  { label: contactDetails.email, value: company.email, href: `mailto:${company.email}` },
  { label: contactDetails.linkedin, value: company.legalName, href: company.linkedin },
  { label: contactDetails.instagram, value: company.instagramHandle, href: company.instagram },
];

export function ContactDetails() {
  return (
    <section aria-labelledby="contact-details" className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <h2 id="contact-details" className="text-xl font-semibold tracking-[-0.02em]">
          {contactDetails.title}
        </h2>
        <p className="text-[15px] text-secondary">{contactDetails.description(company.legalName)}</p>
      </div>
      <ul className="divide-y divide-separator overflow-hidden rounded-[22px] bg-surface shadow-card">
        {externalLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className={rowClasses}>
              <span className="flex flex-col">
                <span className="text-xs font-semibold text-secondary">{link.label}</span>
                <span className="text-[15px] font-semibold">{link.value}</span>
              </span>
              <ArrowUpRight className="size-4 text-secondary transition-transform group-hover:-translate-y-0.5" aria-hidden />
            </a>
          </li>
        ))}
        <li>
          <Link href={routes.privacy} className={rowClasses}>
            <span className="text-[15px] font-semibold">{contactDetails.legal}</span>
            <ArrowUpRight className="size-4 text-secondary" aria-hidden />
          </Link>
        </li>
      </ul>
    </section>
  );
}
