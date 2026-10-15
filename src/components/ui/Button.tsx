import type { ComponentProps } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "accent" | "outline";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded px-6 text-body font-bold transition duration-200 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-navy-900 text-paper hover:bg-navy-700",
  accent: "bg-accent-500 text-paper hover:bg-accent-600",
  outline: "border border-line bg-paper text-navy-900 hover:border-navy-900",
};

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

type ButtonAnchorProps = ComponentProps<"a"> & { variant?: Variant };

export function ButtonAnchor({ variant = "primary", className = "", ...props }: ButtonAnchorProps) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
