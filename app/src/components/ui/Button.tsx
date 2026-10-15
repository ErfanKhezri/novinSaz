import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "../../lib/cn";

type Variant = "accent" | "ink" | "paper" | "quiet";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  accent: "bg-accent text-accent-ink hover:bg-accent-strong",
  ink: "bg-ink text-paper hover:bg-accent",
  paper: "bg-paper text-ink hover:bg-surface-2",
  quiet: "bg-surface text-ink hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-5 text-body",
  lg: "min-h-14 px-7 text-lead",
};

/** One button shape for the whole site: square corners, one flat fill. */
function buttonClasses(variant: Variant = "accent", size: Size = "md", className?: string) {
  return cn(
    "inline-flex select-none items-center justify-center gap-3 font-bold",
    "transition-[transform,background-color,color] duration-200 ease-out active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: CommonProps & LinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}

export function ButtonAnchor({
  variant,
  size,
  className,
  ...props
}: CommonProps & ComponentPropsWithoutRef<"a">) {
  return <a className={buttonClasses(variant, size, className)} {...props} />;
}
