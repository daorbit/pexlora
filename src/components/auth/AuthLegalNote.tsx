import Link from "next/link";
import { routes } from "@/config/site";
import { authLegal } from "@/content/auth";

const linkClasses = "font-medium text-accent-text hover:underline";

export function AuthLegalNote() {
  return (
    <p className="text-center text-[11.5px] leading-normal text-tertiary lg:text-left lg:text-[12.5px]">
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
