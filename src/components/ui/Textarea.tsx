import type { ComponentProps } from "react";

type TextareaProps = ComponentProps<"textarea"> & { label: string };

export function Textarea({ label, id, className = "", ...props }: TextareaProps) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="text-small font-medium text-navy-900">{label}</span>
      <textarea
        id={id}
        rows={4}
        className={`rounded border border-line bg-paper px-4 py-3 text-body text-ink placeholder:text-muted transition focus:border-navy-900 focus:outline-none ${className}`}
        {...props}
      />
    </label>
  );
}
