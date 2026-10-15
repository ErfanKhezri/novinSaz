import type { Product } from "../types/product";
import { formatNumber } from "./formatPrice";

export type RentalPrice = {
  /** Four-day packages charged. */
  packages: number;
  /** Leftover days charged at the daily rate. */
  extraDays: number;
  /** Price for all units before any package discount. */
  price: number;
  /** What the same rental would cost at the daily rate only. */
  dailyOnlyPrice: number;
};

/**
 * fullPackages = floor(N / 4), rest = N % 4
 * price = fullPackages * pricePer4Days + min(rest * pricePerDay, pricePer4Days)
 */
export function rentalPrice(product: Product, days: number, quantity = 1): RentalPrice {
  const fullPackages = Math.floor(days / 4);
  const rest = days % 4;
  const restAsPackage = rest > 0 && rest * product.pricePerDay >= product.pricePer4Days;
  const unitPrice =
    fullPackages * product.pricePer4Days + Math.min(rest * product.pricePerDay, product.pricePer4Days);

  return {
    packages: fullPackages + (restAsPackage ? 1 : 0),
    extraDays: restAsPackage ? 0 : rest,
    price: unitPrice * quantity,
    dailyOnlyPrice: product.pricePerDay * days * quantity,
  };
}

/** "۱ بسته ۴روزه + ۲ روز" */
export function breakdownLabel({ packages, extraDays }: RentalPrice) {
  const parts = [];
  if (packages > 0) parts.push(`${formatNumber(packages)} بسته ۴روزه`);
  if (extraDays > 0) parts.push(`${formatNumber(extraDays)} روز`);
  return parts.join(" + ");
}

export function fourDaySaving(product: Product) {
  return product.pricePerDay * 4 - product.pricePer4Days;
}
