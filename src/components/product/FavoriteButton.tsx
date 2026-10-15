import { motion } from "motion/react";
import { useFavorites } from "../../hooks/useFavorites";

type FavoriteButtonProps = { productId: string; productName: string; className?: string };

export function FavoriteButton({ productId, productName, className = "" }: FavoriteButtonProps) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(productId);

  return (
    <motion.button
      type="button"
      onClick={() => toggle(productId)}
      whileTap={{ scale: 0.8 }}
      aria-pressed={active}
      aria-label={active ? `حذف ${productName} از علاقه‌مندی‌ها` : `افزودن ${productName} به علاقه‌مندی‌ها`}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/80 shadow-glass backdrop-blur transition-colors hover:bg-paper ${className}`}
    >
      <motion.svg
        key={String(active)}
        initial={{ scale: active ? 0.5 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 12 }}
        viewBox="0 0 24 24"
        className={`h-5 w-5 ${active ? "fill-accent-500 text-accent-500" : "fill-transparent text-navy-900"}`}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
      </motion.svg>
    </motion.button>
  );
}
