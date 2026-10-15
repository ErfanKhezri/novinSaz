import { formatNumber } from "../../lib/format";
import { cn } from "../../lib/cn";

interface PriceProps {
  value: number;
  /** Shown after the number, e.g. "تومان" or "تومان / روز". */
  unit?: string;
  className?: string;
}

/** A price with tabular figures and a quieter unit. */
export function Price({ value, unit = "تومان", className }: PriceProps) {
  return (
    <span className={cn("num whitespace-nowrap", className)}>
      {formatNumber(value)}
      {unit && <span className="ms-1.5 text-small font-normal text-muted">{unit}</span>}
    </span>
  );
}
