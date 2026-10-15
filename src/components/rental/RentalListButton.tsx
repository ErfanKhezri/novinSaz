import { AnimatePresence, motion } from "motion/react";
import { useRentalList } from "../../hooks/useRentalList";
import { formatNumber } from "../../utils/formatPrice";

export function RentalListButton() {
  const { count, open } = useRentalList();

  return (
    <button
      type="button"
      onClick={open}
      className="relative flex h-10 w-10 items-center justify-center rounded border border-white/50 bg-white/40 transition hover:bg-white/80"
      aria-label={`لیست اجاره، ${formatNumber(count)} قلم`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-navy-900" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5h11M9 12h11M9 19h11M4 5h.01M4 12h.01M4 19h.01" />
      </svg>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 15 } }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -left-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1 text-caption font-bold text-navy-900"
          >
            {formatNumber(count)}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
