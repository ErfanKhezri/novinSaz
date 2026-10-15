import type { RentalPrice } from "../../data/types";
import { formatNumber } from "../../lib/format";
import { cn } from "../../lib/cn";

interface PricePairProps {
  price: RentalPrice;
  className?: string;
}

/** The two rates side by side, the way a rate card prints them. */
export function PricePair({ price, className }: PricePairProps) {
  const freeDay = price.day * 4 - price.fourDays;

  return (
    <dl className={cn("grid grid-cols-2 gap-2", className)}>
      <div className="flex flex-col gap-1 bg-surface p-5">
        <dt className="text-small text-muted">اجاره یک روز</dt>
        <dd className="num text-lead font-bold">
          {formatNumber(price.day)} <span className="text-small font-normal">تومان</span>
        </dd>
      </div>
      <div className="flex flex-col gap-1 bg-ink p-5 text-paper">
        <dt className="text-small">بسته چهار روزه</dt>
        <dd className="num text-lead font-bold">
          {formatNumber(price.fourDays)} <span className="text-small font-normal">تومان</span>
        </dd>
      </div>
      {freeDay > 0 && (
        <p className="col-span-2 text-small text-muted">
          بسته چهار روزه {formatNumber(freeDay)} تومان ارزان‌تر از چهار روز جداگانه است.
        </p>
      )}
    </dl>
  );
}
