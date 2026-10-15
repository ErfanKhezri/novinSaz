import type { Product } from "../types/product";

/** Cheapest cost: as many four-day packages as fit, leftover days at the daily rate (or one more package if cheaper). */
export function rentalCost(product: Product, days: number, quantity = 1) {
  const packages = Math.floor(days / 4);
  const leftover = days % 4;
  const leftoverCost = Math.min(leftover * product.pricePerDay, leftover > 0 ? product.pricePer4Days : 0);
  return (packages * product.pricePer4Days + leftoverCost) * quantity;
}

export function fourDaySaving(product: Product) {
  return product.pricePerDay * 4 - product.pricePer4Days;
}
