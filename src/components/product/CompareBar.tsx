import { AnimatePresence, motion } from "motion/react";
import { useLocation } from "react-router-dom";
import { products } from "../../data/products";
import { MAX_COMPARE, useCompare } from "../../hooks/useCompare";
import { formatNumber } from "../../utils/formatPrice";
import { spring } from "../../utils/motion";
import { ButtonLink } from "../ui/Button";
import { GlassPanel } from "../ui/GlassPanel";

/** Floating bar at the bottom while products are picked for comparison. */
export function CompareBar() {
  const { ids, remove, clear } = useCompare();
  const { pathname } = useLocation();
  const selected = products.filter((product) => ids.includes(product.id));
  const visible = selected.length > 0 && pathname !== "/compare";

  return (
    <AnimatePresence>
      {visible && (
        <GlassPanel
          variant="strong"
          className="fixed inset-x-2 bottom-2 z-40 mx-auto flex max-w-3xl flex-wrap items-center gap-3 p-3 sm:inset-x-4 print:hidden"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: spring }}
          exit={{ y: 120, opacity: 0 }}
        >
          <ul className="flex flex-1 gap-2">
            <AnimatePresence initial={false}>
              {selected.map((product) => (
                <motion.li key={product.id} layout initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} className="relative">
                  <img src={product.image} alt={product.name} title={product.name} className="h-12 w-12 rounded border border-white/70 bg-navy-50 object-cover" />
                  <button
                    type="button"
                    onClick={() => remove(product.id)}
                    className="absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-caption text-paper"
                    aria-label={`حذف ${product.name} از مقایسه`}
                  >
                    ×
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <span className="text-small text-muted">
            {formatNumber(selected.length)} از {formatNumber(MAX_COMPARE)}
          </span>
          <button type="button" onClick={clear} className="px-2 py-2 text-small text-muted hover:text-navy-900">
            پاک کردن
          </button>
          <ButtonLink to="/compare" className="min-h-10 px-4 text-small">
            مقایسه
          </ButtonLink>
        </GlassPanel>
      )}
    </AnimatePresence>
  );
}
