import Link from "next/link";
import { routes } from "@/config/site";
import { authLegal } from "@/content/auth";

const linkClasses = "text-foreground underline decoration-primary decoration-2 underline-offset-3 hover:decoration-foreground";

export function AuthLegalNote({ freeNote }: { freeNote?: boolean }) {
  return (
    <p className="text-center text-[12px] leading-normal text-balance text-secondary">
      {freeNote && <>{authLegal.freeNote} </>}
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
