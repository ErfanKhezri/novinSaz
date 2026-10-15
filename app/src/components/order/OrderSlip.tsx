import { Link } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";
import { formatDays, formatNumber, formatToman } from "../../lib/format";
import { MAX_DAYS, MIN_DAYS } from "../../lib/pricing";
import { ProductArt } from "../product";
import { ButtonLink, Price, Stepper } from "../ui";

/** The rental order slip: every line, the shared duration and the total. */
export function OrderSlip() {
  const order = useOrder();

  if (order.lines.length === 0) {
    return (
      <div className="edge-zigzag flex flex-col items-start gap-6 bg-paper p-8 text-ink sm:p-12">
        <p className="text-lead">برگه سفارش شما هنوز خالی است.</p>
        <p className="max-w-[44ch]">
          از صفحه هر کالا تعداد و مدت را انتخاب کنید و «افزودن به برگه سفارش» را بزنید. قیمت کل
          اینجا جمع می‌شود.
        </p>
        <ButtonLink to="/products">دیدن کالاها</ButtonLink>
      </div>
    );
  }

  return (
    <div className="edge-zigzag flex flex-col gap-8 bg-paper p-6 text-ink sm:p-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Stepper
          label="مدت اجاره برای همه کالاها"
          unit="روز"
          value={order.days}
          min={MIN_DAYS}
          max={MAX_DAYS}
          onChange={order.setDays}
        />
        <button type="button" onClick={order.clear} className="link py-2 text-small text-muted">
          پاک کردن برگه
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {order.lines.map(({ product, quantity, quote }) => (
          <li key={product.slug} className="grid grid-cols-[4.5rem_1fr] items-center gap-4 bg-surface p-3 sm:grid-cols-[5.5rem_1fr_auto_auto] sm:gap-6">
            <Link to={`/products/${product.slug}`} className="bg-paper p-2" tabIndex={-1} aria-hidden="true">
              <ProductArt art={product.art} title="" />
            </Link>
            <div className="flex flex-col gap-1">
              <Link to={`/products/${product.slug}`} className="link font-bold">
                {product.name}
              </Link>
              <p className="text-small text-muted">
                {formatNumber(quote.packages)} بسته چهار روزه
                {quote.singleDays > 0 && ` + ${formatDays(quote.singleDays)}`}
              </p>
            </div>
            <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1">
              <Stepper
                label={`تعداد ${product.name}`}
                tone="paper"
                value={quantity}
                min={0}
                max={product.stock}
                onChange={(next) => order.setQuantity(product.slug, next)}
                className="[&>span]:sr-only"
              />
              <button
                type="button"
                onClick={() => order.remove(product.slug)}
                className="link py-2 text-small text-muted sm:hidden"
              >
                حذف
              </button>
            </div>
            <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:flex-col sm:items-end">
              <Price value={quote.total} className="font-bold" />
              <button
                type="button"
                onClick={() => order.remove(product.slug)}
                className="link hidden py-1 text-small text-muted sm:block"
              >
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex min-h-16 flex-wrap items-center justify-between gap-4 bg-ink px-5 py-3 text-paper">
        <span className="font-bold">
          جمع {formatNumber(order.itemCount)} کالا برای {formatDays(order.days)}
        </span>
        <span className="num text-lead font-extrabold">{formatToman(order.total)}</span>
      </div>
      {order.saving > 0 && (
        <p className="-mt-4 text-small text-muted">
          با بسته‌های چهار روزه {formatToman(order.saving)} کمتر از نرخ روزانه پرداخت می‌کنید.
          حمل و چیدمان در سالن‌های نمایشگاه بین‌المللی تهران رایگان است.
        </p>
      )}
    </div>
  );
}
