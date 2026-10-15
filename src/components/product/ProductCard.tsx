import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { formatPrice } from "../../utils/formatPrice";
import { glassSheen } from "../../utils/motion";
import { fourDaySaving } from "../../utils/rentalPrice";
import { AddToCartButton } from "../cart/AddToCartButton";
import { Badge } from "../ui/Badge";
import { GlassPanel } from "../ui/GlassPanel";

type ProductCardProps = { product: Product };

export function ProductCard({ product }: ProductCardProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div className="h-full [perspective:1000px]" onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
      <GlassPanel
        variant="strong"
        className="relative flex h-full flex-col overflow-hidden p-2"
        style={{ rotateX, rotateY }}
        initial="rest"
        animate="rest"
        whileHover="hover"
        variants={{ rest: { y: 0, scale: 1 }, hover: { y: -6, scale: 1.02 } }}
      >
        <motion.span
          className="pointer-events-none absolute -inset-x-1/4 top-0 z-10 h-1/2 bg-gradient-to-b from-white/70 to-transparent"
          variants={glassSheen}
          aria-hidden="true"
        />
        <Link to={`/products/${product.slug}`} className="flex flex-1 flex-col rounded">
          <div className="relative aspect-[4/3] overflow-hidden rounded bg-navy-50">
            <motion.img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={800}
              height={600}
              className="h-full w-full object-cover"
              variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
              transition={{ duration: 0.5 }}
            />
            <span className="absolute right-2 top-2 rounded-full bg-gold-500 px-3 py-0.5 text-caption font-bold text-navy-900">
              {formatPrice(fourDaySaving(product))} تخفیف ۴ روزه
            </span>
          </div>
          <div className="relative flex flex-1 flex-col gap-3 p-4 pb-3">
            <Badge>{product.category}</Badge>
            <h3 className="text-h3 font-bold text-navy-900">{product.name}</h3>
            <div className="mt-auto flex items-baseline justify-between gap-2 border-t border-white/70 pt-3">
              <span className="text-small text-muted">اجاره روزانه</span>
              <span className="text-body font-bold text-navy-900">{formatPrice(product.pricePerDay)}</span>
            </div>
          </div>
        </Link>
        <div className="relative px-2 pb-2">
          <AddToCartButton productId={product.id} variant="outline" className="min-h-10 w-full text-small" />
        </div>
      </GlassPanel>
    </div>
  );
}
