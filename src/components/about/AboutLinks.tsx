import Link from "next/link";
import { company } from "@/config/company";
import { routes } from "@/config/site";
import { aboutCopy } from "@/content/about";
import { textLinkClass } from "@/components/ui/text-link-styles";

const { links } = aboutCopy;

const internal = [
  { label: links.privacy, href: routes.privacy },
  { label: links.security, href: routes.security },
  { label: links.fileHandling, href: routes.fileHandling },
  { label: links.pricing, href: routes.pricing },
];

const external = [
  { label: links.linkedin, href: company.linkedin },
  { label: links.instagram, href: company.instagram },
];

export function AboutLinks() {
  return (
    <nav aria-label={aboutCopy.linksTitle} className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold tracking-[0.12em] text-tertiary uppercase">{aboutCopy.linksTitle}</h2>
      <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
        {internal.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={textLinkClass}>
              {link.label}
            </Link>
          </li>
        ))}
        {external.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noopener noreferrer me" className={textLinkClass}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
