import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../../hooks/useCart";
import { formatNumber } from "../../utils/formatPrice";

export function CartButton() {
  const { count, openDrawer } = useCart();

  return (
    <button
      type="button"
      onClick={openDrawer}
      className="relative flex h-10 w-10 items-center justify-center rounded border border-white/50 bg-white/40 transition hover:bg-white/80"
      aria-label={`سبد اجاره، ${formatNumber(count)} قلم`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-navy-900" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 7h12l-1 13H7L6 7Z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 15 } }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -left-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-caption font-bold text-paper"
          >
            {formatNumber(count)}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
