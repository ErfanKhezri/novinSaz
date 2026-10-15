import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { formatPrice } from "../../utils/formatPrice";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

type ProductCardProps = { product: Product };

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-soft">
        <div className="aspect-[4/3] overflow-hidden bg-navy-50">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={800}
            height={600}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <Badge>{product.category}</Badge>
          <h3 className="text-h3 font-bold text-navy-900">{product.name}</h3>
          <div className="mt-auto flex items-baseline justify-between gap-2 border-t border-line pt-3">
            <span className="text-small text-muted">اجاره روزانه</span>
            <span className="text-body font-bold text-navy-900">{formatPrice(product.pricePerDay)}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
