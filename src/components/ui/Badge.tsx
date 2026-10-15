import type { ReactNode } from "react";

type Tone = "gold" | "navy" | "success";

const tones: Record<Tone, string> = {
  gold: "bg-gold-50 text-gold-600",
  navy: "bg-navy-50 text-navy-700",
  success: "bg-success-50 text-success-700",
};

type BadgeProps = { tone?: Tone; children: ReactNode };

export function Badge({ tone = "navy", children }: BadgeProps) {
  return (
    <span className={`inline-flex w-fit items-center rounded-full px-3 py-0.5 text-caption font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
