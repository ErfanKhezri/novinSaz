import type { ReactNode } from "react";

type Tone = "accent" | "navy" | "success";

const tones: Record<Tone, string> = {
  accent: "bg-accent-50 text-accent-600",
  navy: "bg-navy-50 text-navy-700",
  success: "bg-success-50 text-success-700",
};

type BadgeProps = { tone?: Tone; children: ReactNode };

export function Badge({ tone = "navy", children }: BadgeProps) {
  return (
    <span className={`inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full px-3 py-0.5 text-caption font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
