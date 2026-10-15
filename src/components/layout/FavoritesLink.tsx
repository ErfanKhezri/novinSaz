import { Link } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import { formatNumber } from "../../utils/formatPrice";

export function FavoritesLink() {
  const { ids } = useFavorites();

  return (
    <Link
      to="/favorites"
      className="relative flex h-10 w-10 items-center justify-center rounded border border-white/50 bg-white/40 transition hover:bg-white/80"
      aria-label={`علاقه‌مندی‌ها، ${formatNumber(ids.length)} محصول`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-navy-900" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
      </svg>
      {ids.length > 0 && (
        <span className="absolute -left-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-caption font-bold text-paper">
          {formatNumber(ids.length)}
        </span>
      )}
    </Link>
  );
}
