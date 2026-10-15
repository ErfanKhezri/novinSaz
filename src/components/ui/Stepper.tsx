import { formatNumber } from "../../utils/formatPrice";

type StepperProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  unit?: string;
  onChange: (value: number) => void;
};

export function Stepper({ label, value, min = 0, max = 99, unit = "", onChange }: StepperProps) {
  const button =
    "flex h-10 w-10 items-center justify-center rounded text-h3 font-bold text-navy-900 transition hover:bg-navy-900 hover:text-paper active:scale-90 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-navy-900";

  return (
    <div className="flex items-center rounded border border-white/70 bg-white/70" role="group" aria-label={label}>
      <button type="button" className={button} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`افزایش ${label}`}>
        +
      </button>
      <span className="min-w-16 text-center font-bold tabular-nums text-navy-900" aria-live="polite">
        {formatNumber(value)} {unit}
      </span>
      <button type="button" className={button} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`کاهش ${label}`}>
        −
      </button>
    </div>
  );
}
