import { products } from "../../data/products";
import { useCart } from "../../hooks/useCart";
import { formatNumber, formatPrice } from "../../utils/formatPrice";
import type { PlacedItem } from "../../utils/planner";
import { rentalPrice } from "../../utils/rentalPrice";
import { Button } from "../ui/Button";
import { GlassPanel } from "../ui/GlassPanel";

type PlannerSummaryProps = {
  items: PlacedItem[];
  onClear: () => void;
};

export function PlannerSummary({ items, onClear }: PlannerSummaryProps) {
  const { addItem, openDrawer, days } = useCart();

  const counts = products
    .map((product) => ({ product, quantity: items.filter((item) => item.productId === product.id).length }))
    .filter((line) => line.quantity > 0);
  const total = counts.reduce((sum, line) => sum + rentalPrice(line.product, days, line.quantity).price, 0);

  const addAllToCart = () => {
    counts.forEach((line) => addItem(line.product.id, line.quantity));
    openDrawer();
  };

  return (
    <GlassPanel variant="strong" className="space-y-4 p-5">
      <h2 className="text-h3 font-bold text-navy-900">اقلام چیده‌شده</h2>
      {counts.length === 0 ? (
        <p className="text-small text-muted">هنوز محصولی در غرفه نچیده‌اید.</p>
      ) : (
        <ul className="divide-y divide-white/70 text-small">
          {counts.map((line) => (
            <li key={line.product.id} className="flex justify-between gap-2 py-2">
              <span>
                {line.product.name} × {formatNumber(line.quantity)}
              </span>
              <span className="font-bold">{formatPrice(rentalPrice(line.product, days, line.quantity).price)}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-baseline justify-between border-t border-white/70 pt-3">
        <span className="text-muted">برآورد برای {formatNumber(days)} روز</span>
        <span className="text-h3 font-extrabold text-navy-900">{formatPrice(total)}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={addAllToCart} disabled={counts.length === 0} className="px-3">
          افزودن به سبد اجاره
        </Button>
        <Button variant="outline" onClick={onClear} disabled={items.length === 0} className="px-3">
          پاک کردن
        </Button>
      </div>
    </GlassPanel>
  );
}
