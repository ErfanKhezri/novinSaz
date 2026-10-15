import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import { formatPrice } from "../../utils/formatPrice";

/** An endless ticker of products and their daily price; the list is doubled so the loop is seamless. */
export function ProductMarquee() {
  const items = [...products, ...products];

  return (
    <div className="relative overflow-hidden border-y border-white/60 bg-white/40 py-4 backdrop-blur-md" dir="ltr">
      <motion.ul
        className="flex w-max gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {items.map((product, index) => (
          <li key={`${product.id}-${index}`} dir="rtl" className="flex items-center gap-3 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-accent-500" aria-hidden="true" />
            <Link to={`/products/${product.slug}`} className="font-bold text-navy-900 hover:text-accent-600">
              {product.name}
            </Link>
            <span className="text-small text-muted">از {formatPrice(product.pricePerDay)} / روز</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
