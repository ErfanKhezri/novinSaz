import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

type FieldProps = {
  label: string;
  /** Keep the label for screen readers only; the placeholder shows it. */
  hideLabel?: boolean;
  multiline?: boolean;
  tone?: "surface" | "on-accent";
} & ComponentPropsWithoutRef<"input"> &
  Pick<ComponentPropsWithoutRef<"textarea">, "rows">;

/** A filled input block. Form fields are the one place lines would be allowed; we use fills. */
export function Field({
  label,
  hideLabel = true,
  multiline = false,
  tone = "surface",
  className,
  id,
  rows = 3,
  ...props
}: FieldProps) {
  const fieldId = id ?? props.name;
  const classes = cn(
    "w-full px-4 text-body outline-none transition-colors",
    tone === "surface"
      ? "bg-surface text-ink placeholder:text-muted focus:bg-surface-2"
      : "bg-accent-strong text-accent-ink placeholder:text-accent-ink/80 focus:bg-ink",
    multiline ? "min-h-28 py-3" : "h-13",
    className,
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className={hideLabel ? "sr-only" : "text-small text-muted"}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={fieldId}
          rows={rows}
          className={classes}
          {...(props as ComponentPropsWithoutRef<"textarea">)}
        />
      ) : (
        <input id={fieldId} className={classes} {...props} />
      )}
    </div>
  );
}
