import { stagger } from "../../lib/stagger";
import { useState } from "react";
import { Link } from "react-router-dom";
import { productBySlug } from "../../data/products";
import { useOrder } from "../../hooks/useOrder";
import { formatNumber, formatToman } from "../../lib/format";
import { cn } from "../../lib/cn";
import { ProductArt, SpecList } from "../product";

const tabs = [
  { id: "day", label: "روزانه" },
  { id: "four", label: "چهار روزه" },
  { id: "specs", label: "مشخصات" },
] as const;

type TabId = (typeof tabs)[number]["id"];

/** Square plate, spare text: the half-set sofa, the piece that turns a booth into a lounge. */
export function Showcase({ slug = "half-set-sofa" }: { slug?: string }) {
  const product = productBySlug[slug];
  const [tab, setTab] = useState<TabId>("four");
  const order = useOrder();
  const added = order.quantityOf(slug) > 0;

  return (
    <section aria-labelledby="showcase-title" className="bg-surface">
      <div className="mx-auto grid max-w-[1440px] md:min-h-[88svh] md:grid-cols-2">
        <div className="grid place-items-center p-4 sm:p-10" data-reveal>
          <div className="aspect-square w-full max-w-[640px] bg-paper p-8 sm:p-14">
            <ProductArt art={product.art} title={product.name} />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-10 px-gutter pt-4 pb-10 md:py-16">
          <div role="tablist" aria-label="اطلاعات کالا" className="flex gap-6" data-reveal>
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                onClick={() => setTab(item.id)}
                className={cn(
                  "py-2 text-lead transition-colors",
                  tab === item.id ? "font-bold text-ink" : "text-muted hover:text-ink",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-8" role="tabpanel" data-reveal style={stagger(1)}>
            <h2 id="showcase-title" className="text-head font-extrabold tracking-tight">
              {product.name}
            </h2>
            {tab === "specs" ? (
              <SpecList specs={product.specs} options={product.options} />
            ) : (
              <div className="flex max-w-[38ch] flex-col gap-4">
                <p className="num text-head leading-none font-bold">
                  {formatNumber(tab === "day" ? product.price.day : product.price.fourDays)}
                  <span className="ms-2 text-lead font-medium">تومان</span>
                </p>
                <p>
                  {tab === "day"
                    ? "برای یک روز جلسه یا رونمایی. هر روز بیشتر به همین نرخ حساب می‌شود."
                    : `برای چهار روز نمایشگاه؛ ${formatToman(product.price.day * 4 - product.price.fourDays)} کمتر از چهار روز جداگانه.`}
                </p>
                <p className="text-muted">{product.description[1]}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2" data-reveal style={stagger(2)}>
            <button
              type="button"
              onClick={() => order.add(slug)}
              className="flex min-h-18 items-center justify-center bg-ink px-4 font-bold text-paper transition-[background-color,transform] hover:bg-accent active:scale-[0.98]"
            >
              {added ? `در برگه سفارش (${formatNumber(order.quantityOf(slug))})` : "افزودن به برگه سفارش"}
            </button>
            <Link
              to={`/products/${slug}`}
              className="flex min-h-18 items-center justify-center bg-surface-2 px-4 font-bold transition-[background-color,transform] hover:bg-paper active:scale-[0.98]"
            >
              جزئیات و محاسبه قیمت
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
