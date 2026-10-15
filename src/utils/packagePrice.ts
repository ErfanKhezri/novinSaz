import type { BoothPackage } from "../data/packages";
import { products } from "../data/products";
import { rentalPrice } from "./rentalPrice";

/** Normal price of all package items for the given days, and the price after the package discount. */
export function packagePrice(pack: BoothPackage, days = 4) {
  const normal = pack.items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId)!;
    return sum + rentalPrice(product, days, item.quantity).price;
  }, 0);
  const final = Math.round(normal * (1 - pack.discountPercent / 100));
  return { normal, final, saving: normal - final };
}

export function packageItems(pack: BoothPackage) {
  return pack.items.map((item) => ({ ...item, product: products.find((p) => p.id === item.productId)! }));
}
