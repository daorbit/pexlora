import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "ink" | "secondary" | "outline" | "plain" | "nav" | "icon" | "tile";
type Size = "sm" | "md" | "lg" | "xl" | "2xl";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  ink: "bg-ink text-ink-foreground hover:bg-ink-hover",
  secondary: "border border-border-strong bg-surface text-foreground hover:bg-fill",
  outline: "border border-border-strong text-foreground hover:border-foreground hover:bg-fill",
  plain: "text-sm font-semibold text-foreground underline decoration-border-strong underline-offset-4 hover:decoration-foreground",
  nav: "text-sm font-semibold text-secondary hover:text-foreground",
  icon: "text-secondary hover:bg-fill hover:text-foreground",
  tile: "bg-surface text-foreground shadow-thumb hover:bg-fill",
};

const chipVariants: Partial<Record<Variant, string>> = {
  primary: "bg-primary-foreground text-primary",
  ink: "bg-primary text-primary-foreground",
};

const sizes: Record<Size, string> = {
  sm: "h-8 rounded-xl px-3.5 text-[13px]",
  md: "h-10 rounded-xl px-4.5 text-sm",
  lg: "h-11 rounded-xl px-5 text-[15px]",
  xl: "h-12 rounded-xl px-6 text-[15px]",
  "2xl": "h-14 rounded-xl px-6 text-base",
};

const arrowSizes: Record<Size, { padding: string; chip: string; icon: string }> = {
  sm: { padding: "pr-1", chip: "size-6", icon: "size-3" },
  md: { padding: "pr-1", chip: "size-8", icon: "size-3.5" },
  lg: { padding: "pr-1", chip: "size-9", icon: "size-4" },
  xl: { padding: "pr-1.5", chip: "size-9", icon: "size-4" },
  "2xl": { padding: "pr-2", chip: "size-10", icon: "size-4" },
};

const iconSizes: Record<Size, string> = {
  sm: "size-8 rounded-xl",
  md: "size-10 rounded-xl",
  lg: "size-11 rounded-xl",
  xl: "size-12 rounded-xl",
  "2xl": "size-14 rounded-xl",
};

export type ButtonStyleProps = { variant?: Variant; size?: Size; arrow?: boolean };
type StyleProps = ButtonStyleProps;

export function buttonClasses({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
}: StyleProps & { className?: string }) {
  const textOnly = variant === "plain" || variant === "nav";
  const square = variant === "icon" || variant === "tile";
  const sizing = square ? iconSizes[size] : textOnly ? "" : sizes[size];
  return cn(base, variants[variant], sizing, arrow && !textOnly && arrowSizes[size].padding, className);
}

export function ButtonContent({ children, variant = "primary", size = "md", arrow }: StyleProps & { children?: ReactNode }) {
  if (!arrow) return children;
  const { chip, icon } = arrowSizes[size];
  return (
    <>
      {children}
      <span className={cn("ml-1 inline-flex items-center justify-center rounded-lg", chip, chipVariants[variant])}>
        <ArrowRight className={icon} strokeWidth={2.5} aria-hidden />
      </span>
    </>
  );
}

export function Button({
  variant,
  size,
  arrow,
  className,
  type = "button",
  children,
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, arrow, className })} {...props}>
      <ButtonContent variant={variant} size={size} arrow={arrow}>
        {children}
      </ButtonContent>
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  arrow,
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & StyleProps) {
  return (
    <Link className={buttonClasses({ variant, size, arrow, className })} {...props}>
      <ButtonContent variant={variant} size={size} arrow={arrow}>
        {children}
      </ButtonContent>
    </Link>
  );
}
