import type { Product } from "../../types/product";
import { ProductCard } from "./ProductCard";

type ProductGridProps = { products: Product[] };

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <li key={product.id} className="animate-fade-up" style={{ animationDelay: `${index * 60}ms` }}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
