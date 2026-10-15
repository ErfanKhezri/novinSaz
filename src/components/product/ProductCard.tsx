import { motion } from "motion/react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { formatPrice } from "../../utils/formatPrice";
import { cardHover, glassSheen } from "../../utils/motion";
import { Badge } from "../ui/Badge";
import { GlassPanel } from "../ui/GlassPanel";

type ProductCardProps = { product: Product };

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.slug}`} className="block h-full rounded-lg">
      <GlassPanel
        variant="strong"
        className="relative flex h-full flex-col overflow-hidden p-2"
        variants={cardHover}
        initial="rest"
        animate="rest"
        whileHover="hover"
      >
        <motion.span
          className="pointer-events-none absolute -inset-x-1/4 top-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent"
          variants={glassSheen}
          aria-hidden="true"
        />
        <div className="relative aspect-[4/3] overflow-hidden rounded bg-navy-50">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={800}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative flex flex-1 flex-col gap-3 p-4">
          <Badge>{product.category}</Badge>
          <h3 className="text-h3 font-bold text-navy-900">{product.name}</h3>
          <div className="mt-auto flex items-baseline justify-between gap-2 border-t border-white/70 pt-3">
            <span className="text-small text-muted">اجاره روزانه</span>
            <span className="text-body font-bold text-navy-900">{formatPrice(product.pricePerDay)}</span>
          </div>
        </div>
      </GlassPanel>
    </Link>
  );
}
