import { routes } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { buttonClasses } from "@/components/ui/Button";
import { GoogleIcon } from "@/components/auth/GoogleIcon";

export function GoogleButton({ label, className }: { label: string; className?: string }) {
  return (
    <a href={routes.googleAuth} className={buttonClasses({ variant: "secondary", size: "xl", className: cn("w-full", className) })}>
      <GoogleIcon className="size-[18px]" />
      {label}
    </a>
  );
}
