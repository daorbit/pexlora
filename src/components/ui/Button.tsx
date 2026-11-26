import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Spinner } from "@/components/ui/Spinner";

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

const sizes: Record<Size, string> = {
  sm: "h-8 rounded-xl px-3.5 text-[13px]",
  md: "h-10 rounded-xl px-4.5 text-sm",
  lg: "h-11 rounded-xl px-5 text-[15px]",
  xl: "h-12 rounded-xl px-6 text-[15px]",
  "2xl": "h-14 rounded-xl px-6 text-base",
};

const arrowSizes: Record<Size, string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4",
  xl: "size-[18px]",
  "2xl": "size-5",
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
  return cn(base, variants[variant], sizing, arrow && !textOnly && "group/button", className);
}

export function ButtonContent({
  children,
  size = "md",
  arrow,
  loading,
}: StyleProps & { children?: ReactNode; loading?: boolean }) {
  if (!arrow && !loading) return children;
  return (
    <>
      {loading && <Spinner className={arrowSizes[size]} />}
      {children}
      {arrow && (
        <ArrowRight
          className={cn("shrink-0 transition-transform group-hover/button:translate-x-0.5", arrowSizes[size])}
          strokeWidth={2.4}
          aria-hidden
        />
      )}
    </>
  );
}

export function Button({
  variant,
  size,
  arrow,
  loading,
  disabled,
  className,
  type = "button",
  children,
  ...props
}: ComponentProps<"button"> & StyleProps & { loading?: boolean }) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, arrow, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      <ButtonContent variant={variant} size={size} arrow={arrow} loading={loading}>
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
