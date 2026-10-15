import { motion } from "motion/react";
import { Link } from "react-router-dom";
import type { CartLine } from "../../hooks/useCart";
import { useCart } from "../../hooks/useCart";
import { formatNumber, formatPrice } from "../../utils/formatPrice";
import { breakdownLabel } from "../../utils/rentalPrice";
import { Badge } from "../ui/Badge";
import { Stepper } from "../ui/Stepper";

type CartLineItemProps = { line: CartLine; compact?: boolean };

export function CartLineItem({ line, compact = false }: CartLineItemProps) {
  const { setQuantity, removeItem } = useCart();

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="flex gap-3 rounded-lg border border-white/70 bg-white/70 p-3"
    >
      <Link to={`/products/${line.product.slug}`} className="shrink-0">
        <img
          src={line.product.image}
          alt=""
          className={`${compact ? "h-16 w-16" : "h-20 w-20 sm:h-24 sm:w-24"} rounded bg-navy-50 object-cover`}
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <Link to={`/products/${line.product.slug}`} className="font-bold text-navy-900 hover:text-accent-600">
              {line.product.name}
            </Link>
            <span className="text-caption text-muted">{breakdownLabel(line.rental)}</span>
            {line.discountPercent > 0 && <Badge tone="accent">تخفیف پکیج {formatNumber(line.discountPercent)}٪</Badge>}
          </div>
          <div className="text-end">
            <span className="block text-small font-bold text-navy-900">{formatPrice(line.total)}</span>
            {line.rental.dailyOnlyPrice > line.total && (
              <span className="text-caption text-muted line-through">{formatPrice(line.rental.dailyOnlyPrice)}</span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Stepper
            label={`تعداد ${line.product.name}`}
            value={line.quantity}
            min={1}
            onChange={(value) => setQuantity(line.productId, value, line.packageId)}
          />
          <button
            type="button"
            onClick={() => removeItem(line.productId, line.packageId)}
            className="px-2 py-2 text-small text-muted transition-colors hover:text-navy-900"
          >
            حذف
          </button>
        </div>
      </div>
    </motion.li>
  );
}
