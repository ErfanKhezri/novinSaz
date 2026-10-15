import { useSearchParams } from "react-router-dom";
import { categories, categoryById } from "../data/categories";
import { products } from "../data/products";
import type { CategoryId } from "../data/types";
import { ProductPlate } from "../components/product";
import { Container } from "../components/ui";
import { cn } from "../lib/cn";
import { formatNumber } from "../lib/format";
import { usePageTitle } from "../hooks/usePageTitle";

export function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("category") as CategoryId | null;
  const active = requested && categoryById[requested] ? requested : null;
  const visible = active ? products.filter((product) => product.category === active) : products;
  usePageTitle(active ? categoryById[active].name : "کالاها");

  const select = (id: CategoryId | null) => setParams(id ? { category: id } : {}, { replace: true });
  const tab = (isActive: boolean) =>
    cn(
      "min-h-11 px-4 font-medium transition-colors",
      isActive ? "bg-ink text-paper" : "bg-surface hover:bg-surface-2",
    );

  return (
    <Container className="pt-10 pb-section sm:pt-16">
      <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
        <h1 className="text-display font-extrabold tracking-tight lg:col-span-7" data-reveal>
          کالاها
        </h1>
        <p className="max-w-[40ch] text-lead lg:col-span-5" data-reveal>
          {formatNumber(products.length)} کالا برای غرفه و اتاق جلسه. روی هر کالا بزنید تا مشخصات،
          قیمت روزانه و چهار روزه و قیمت سفارش خودتان را ببینید.
        </p>
      </div>

      <div role="group" aria-label="دسته‌بندی" className="mb-12 flex flex-wrap gap-2" data-reveal>
        <button type="button" aria-pressed={!active} className={tab(!active)} onClick={() => select(null)}>
          همه
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            aria-pressed={active === category.id}
            className={tab(active === category.id)}
            onClick={() => select(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {active && <p className="-mt-6 mb-12 text-muted">{categoryById[active].summary}</p>}

      <div key={active ?? "all"} className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product, index) => (
          <ProductPlate key={product.slug} product={product} index={index} />
        ))}
      </div>
    </Container>
  );
}
