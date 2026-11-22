import Link from "next/link";
import { textLinkClass } from "@/components/ui/text-link-styles";

type RelatedLinksProps = {
  title: string;
  links: { label: string; href: string }[];
};

export function RelatedLinks({ title, links }: RelatedLinksProps) {
  return (
    <nav aria-label={title} className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold tracking-[0.12em] text-tertiary uppercase">{title}</h2>
      <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={textLinkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
