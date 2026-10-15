import { useState } from "react";
import type { Product } from "../../types/product";
import { formatNumber, formatPrice } from "../../utils/formatPrice";
import { breakdownLabel, rentalPrice } from "../../utils/rentalPrice";
import { AddToCartButton } from "../cart/AddToCartButton";
import { AnimatedNumber } from "../ui/AnimatedNumber";
import { GlassPanel } from "../ui/GlassPanel";
import { Stepper } from "../ui/Stepper";

type RentalCalculatorProps = { product: Product };

export function RentalCalculator({ product }: RentalCalculatorProps) {
  const [quantity, setQuantity] = useState(1);
  const [days, setDays] = useState(4);
  const rental = rentalPrice(product, days, quantity);
  const total = rental.price;
  const dailyOnly = rental.dailyOnlyPrice;

  return (
    <GlassPanel variant="strong" className="space-y-5 p-5">
      <h2 className="text-h3 font-bold text-navy-900">محاسبه قیمت اجاره</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-small text-muted">تعداد</span>
          <Stepper label="تعداد" unit="عدد" value={quantity} min={1} onChange={setQuantity} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-small text-muted">مدت اجاره</span>
          <Stepper label="روز" unit="روز" value={days} min={1} max={30} onChange={setDays} />
        </label>
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg bg-navy-900 p-4 text-paper">
        <span>
          {formatNumber(quantity)} عدد برای {formatNumber(days)} روز
          <span className="block text-caption text-navy-100">{breakdownLabel(rental)}</span>
        </span>
        <span className="text-h2 font-extrabold">
          <AnimatedNumber value={total} /> <span className="text-small font-medium">تومان</span>
        </span>
      </div>
      {dailyOnly > total && (
        <p className="text-small text-success-700">
          با بسته‌های چهار روزه {formatPrice(dailyOnly - total)} کمتر از نرخ روزانه می‌پردازید.
        </p>
      )}
      <AddToCartButton productId={product.id} quantity={quantity} variant="primary" className="w-full" />
    </GlassPanel>
  );
}
