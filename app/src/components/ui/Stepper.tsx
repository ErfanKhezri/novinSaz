import { formatNumber } from "../../lib/format";
import { cn } from "../../lib/cn";

interface StepperProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  /** Words after the number, e.g. "روز" or "عدد". */
  unit?: string;
  tone?: "surface" | "paper";
  className?: string;
}

/** A thumb-sized number control: minus, the value, plus. */
export function Stepper({
  label,
  value,
  min,
  max,
  onChange,
  unit,
  tone = "surface",
  className,
}: StepperProps) {
  const fill = tone === "surface" ? "bg-surface" : "bg-paper";
  const key = "grid size-12 place-items-center text-lead font-bold transition-colors hover:bg-ink hover:text-paper active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-small text-muted">{label}</span>
      <div className={cn("flex w-fit items-center", fill)} role="group" aria-label={label}>
        <button
          type="button"
          className={key}
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
          aria-label={`افزایش ${label}`}
        >
          +
        </button>
        <output className="num min-w-20 text-center font-bold" aria-live="polite">
          {formatNumber(value)}
          {unit && <span className="ms-1 font-normal">{unit}</span>}
        </output>
        <button
          type="button"
          className={key}
          onClick={() => onChange(value - 1)}
          disabled={value <= min}
          aria-label={`کاهش ${label}`}
        >
          −
        </button>
      </div>
    </div>
  );
}
