import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../data/types";
import { useOrder } from "../../hooks/useOrder";
import { formatDays, formatNumber, formatToman } from "../../lib/format";
import { MAX_DAYS, MIN_DAYS, quoteRental } from "../../lib/pricing";
import { Button, Stepper } from "../ui";

/**
 * The live thing: choose how many and for how long, read the real total,
 * and put it on the order slip.
 */
export function RentalCalculator({ product }: { product: Product }) {
  const order = useOrder();
  const [quantity, setQuantity] = useState(Math.max(1, order.quantityOf(product.slug)));
  const quote = quoteRental(product.price, order.days, quantity);
  const inOrder = order.quantityOf(product.slug);

  const breakdown = [
    quote.packages > 0 && `${formatNumber(quote.packages)} بسته چهار روزه`,
    quote.singleDays > 0 && `${formatDays(quote.singleDays)} روزانه`,
  ]
    .filter(Boolean)
    .join(" + ");

  return (
    <section aria-labelledby="calc-title" className="flex flex-col gap-6 bg-paper p-6 sm:p-8">
      <h2 id="calc-title" className="text-lead font-bold">
        قیمت اجاره شما
      </h2>

      <div className="flex flex-wrap gap-6">
        <Stepper
          label="تعداد"
          unit="عدد"
          value={quantity}
          min={1}
          max={product.stock}
          onChange={setQuantity}
        />
        <Stepper
          label="مدت اجاره"
          unit="روز"
          value={order.days}
          min={MIN_DAYS}
          max={MAX_DAYS}
          onChange={order.setDays}
        />
      </div>

      <div className="flex flex-col gap-1" aria-live="polite">
        <p className="num text-head font-extrabold leading-none tracking-tight">
          {formatNumber(quote.total)}
          <span className="ms-2 text-lead font-medium">تومان</span>
        </p>
        <p className="text-small text-muted">
          {formatNumber(quantity)} عدد، {breakdown}
          {quote.saving > 0 && <> · {formatToman(quote.saving)} کمتر از نرخ روزانه</>}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="accent"
          size="lg"
          className="sm:flex-1"
          onClick={() => order.setQuantity(product.slug, quantity)}
        >
          {inOrder ? "به‌روزرسانی برگه سفارش" : "افزودن به برگه سفارش"}
        </Button>
        {inOrder > 0 && (
          <Link to="/order" className="link self-center py-3 font-bold text-accent">
            دیدن برگه سفارش ({formatNumber(order.itemCount)})
          </Link>
        )}
      </div>
      <p className="text-small text-muted">موجودی انبار: {formatNumber(product.stock)} عدد</p>
    </section>
  );
}
