import Link from "next/link";
import { routes } from "@/config/site";
import { authLegal } from "@/content/auth";

const linkClasses = "font-medium text-foreground underline decoration-border-strong underline-offset-2 hover:decoration-foreground";

export function AuthLegalNote() {
  return (
    <p className="text-center text-xs leading-relaxed text-secondary">
      {authLegal.before}{" "}
      <Link href={routes.terms} className={linkClasses}>
        {authLegal.terms}
      </Link>{" "}
      {authLegal.and}{" "}
      <Link href={routes.privacy} className={linkClasses}>
        {authLegal.privacy}
      </Link>
      {authLegal.after}
    </p>
  );
}
