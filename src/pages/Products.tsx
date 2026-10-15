import { useSearchParams } from "react-router-dom";
import { CategoryFilter } from "../components/product/CategoryFilter";
import { ProductGrid } from "../components/product/ProductGrid";
import { Container } from "../components/ui/Container";
import { GlassPanel } from "../components/ui/GlassPanel";
import { Input } from "../components/ui/Input";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { categories, products } from "../data/products";
import { formatNumber } from "../utils/formatPrice";

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "همه";
  const query = searchParams.get("q") ?? "";
  const sort = searchParams.get("sort") ?? "";

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== "همه") next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  const visible = products
    .filter((product) => (category === "همه" || product.category === category) && product.name.includes(query.trim()))
    .sort((a, b) => (sort === "cheap" ? a.pricePerDay - b.pricePerDay : sort === "expensive" ? b.pricePerDay - a.pricePerDay : 0));

  return (
    <Section>
      <Container>
        <SectionTitle
          as="h1"
          title="محصولات"
          subtitle="قیمت‌ها برای اجاره روزانه است؛ قیمت بسته چهار روزه را در صفحه هر محصول ببینید."
        />

        <GlassPanel variant="strong" className="z-30 mb-8 flex flex-col gap-4 p-4 lg:sticky lg:top-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Input
                id="search"
                label="جستجو"
                type="search"
                placeholder="نام محصول، مثلاً صندلی"
                value={query}
                onChange={(event) => updateParam("q", event.target.value)}
              />
            </div>
            <label htmlFor="sort" className="flex flex-col gap-2 sm:w-56">
              <span className="text-small font-medium text-navy-900">مرتب‌سازی</span>
              <select
                id="sort"
                value={sort}
                onChange={(event) => updateParam("sort", event.target.value)}
                className="h-12 rounded border border-line bg-paper px-4 text-body text-ink focus:border-navy-900 focus:outline-none"
              >
                <option value="">پیش‌فرض</option>
                <option value="cheap">ارزان‌ترین</option>
                <option value="expensive">گران‌ترین</option>
              </select>
            </label>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <CategoryFilter
              categories={categories}
              active={category}
              onChange={(value) => updateParam("category", value)}
            />
            <p className="text-small text-muted" aria-live="polite">
              {formatNumber(visible.length)} محصول
            </p>
          </div>
        </GlassPanel>

        {visible.length > 0 ? (
          <ProductGrid products={visible} />
        ) : (
          <p className="rounded-lg border border-line bg-paper py-16 text-center text-muted">
            محصولی با این مشخصات پیدا نشد.
          </p>
        )}
      </Container>
    </Section>
  );
}
