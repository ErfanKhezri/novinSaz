import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
  /** "wide" runs to the page margins; "text" holds a reading column. */
  width?: "wide" | "text";
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({
  as,
  width = "wide",
  className,
  ...props
}: ContainerProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-gutter",
        width === "wide" ? "max-w-[1440px]" : "max-w-[44rem]",
        className,
      )}
      {...props}
    />
  );
}
