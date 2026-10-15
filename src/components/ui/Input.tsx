import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & { label: string };

export function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="text-small font-medium text-navy-900">{label}</span>
      <input
        id={id}
        className={`h-12 rounded border border-line bg-paper px-4 text-body text-ink placeholder:text-muted transition focus:border-navy-900 focus:outline-none ${className}`}
        {...props}
      />
    </label>
  );
}
