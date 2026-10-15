import type { RentalPrice } from "../data/types";

export const PACKAGE_DAYS = 4;
export const MIN_DAYS = 1;
export const MAX_DAYS = 30;

export interface RentalQuote {
  days: number;
  quantity: number;
  /** Number of four-day packages used. */
  packages: number;
  /** Days charged at the daily rate. */
  singleDays: number;
  /** True when the leftover days are cheaper as one more package. */
  roundedUp: boolean;
  total: number;
  /** What the same rental would cost at the daily rate only. */
  dailyOnlyTotal: number;
  saving: number;
}

/**
 * Cheapest price for renting `quantity` units for `days` days:
 * as many four-day packages as fit, and the leftover days at the daily
 * rate, unless one more package is cheaper than those leftover days.
 */
export function quoteRental(
  price: RentalPrice,
  days: number,
  quantity = 1,
): RentalQuote {
  const packages = Math.floor(days / PACKAGE_DAYS);
  const rest = days % PACKAGE_DAYS;
  const roundedUp = rest > 0 && price.fourDays < rest * price.day;

  const unitTotal =
    packages * price.fourDays + (roundedUp ? price.fourDays : rest * price.day);
  const total = unitTotal * quantity;
  const dailyOnlyTotal = price.day * days * quantity;

  return {
    days,
    quantity,
    packages: roundedUp ? packages + 1 : packages,
    singleDays: roundedUp ? 0 : rest,
    roundedUp,
    total,
    dailyOnlyTotal,
    saving: dailyOnlyTotal - total,
  };
}

export function clampDays(days: number): number {
  return Math.min(MAX_DAYS, Math.max(MIN_DAYS, Math.round(days)));
}
