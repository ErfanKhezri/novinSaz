import { AnimatePresence, motion } from "motion/react";
import type { Product } from "../../types/product";
import { staggeredFadeUp } from "../../utils/motion";
import { ProductCard } from "./ProductCard";

type ProductGridProps = { products: Product[] };

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <motion.li
            key={product.id}
            layout
            custom={index}
            variants={staggeredFadeUp}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, margin: "-40px" }}
          >
            <ProductCard product={product} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
