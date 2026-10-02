import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "whatsapp" | "dark" | "sun" | "outline" | "outlineLight" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  whatsapp: "bg-wa text-white hover:bg-wa-dark",
  dark: "bg-ink text-white hover:bg-ink-soft",
  sun: "bg-sun text-ink hover:bg-[#e6a400]",
  outlineLight: "border border-white/45 text-white hover:bg-white/10",
  outline: "border border-line-strong bg-paper text-ink hover:border-ink",
  ghost: "text-ink hover:bg-sand",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-[0.9375rem]",
  lg: "h-12 px-5 text-base",
};

type StyleProps = {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  className?: string;
};

export function buttonClass({
  variant = "primary",
  size = "md",
  full = false,
  className = "",
}: StyleProps = {}): string {
  return [base, variants[variant], sizes[size], full ? "w-full" : "", className]
    .filter(Boolean)
    .join(" ");
}

type ButtonProps = StyleProps & Omit<ComponentProps<"button">, "className">;

export function Button({ variant, size, full, className, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonClass({ variant, size, full, className })} {...props} />
  );
}

type ButtonLinkProps = StyleProps & {
  href: string;
  children: ReactNode;
  /** Links externos (WhatsApp, Maps, Instagram) abrem em nova aba. */
  external?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

export function ButtonLink({
  href,
  external = false,
  variant,
  size,
  full,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = buttonClass({ variant, size, full, className });

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
