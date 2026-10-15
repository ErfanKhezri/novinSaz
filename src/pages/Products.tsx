import { useSearchParams } from "react-router-dom";
import { CategoryFilter } from "../components/product/CategoryFilter";
import { ProductGrid } from "../components/product/ProductGrid";
import { Container } from "../components/ui/Container";
import { GlassPanel } from "../components/ui/GlassPanel";
import { Input } from "../components/ui/Input";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { categories, products } from "../data/products";

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "همه";
  const query = searchParams.get("q") ?? "";

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== "همه") next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  const visible = products.filter(
    (product) =>
      (category === "همه" || product.category === category) && product.name.includes(query.trim()),
  );

  return (
    <Section>
      <Container>
        <SectionTitle
          as="h1"
          title="محصولات"
          subtitle="قیمت‌ها برای اجاره روزانه است؛ قیمت بسته چهار روزه را در صفحه هر محصول ببینید."
        />

        <GlassPanel
          variant="strong"
          className="z-30 mb-8 flex flex-col gap-4 p-4 lg:sticky lg:top-20 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="lg:w-80">
            <Input
              id="search"
              label="جستجو"
              type="search"
              placeholder="نام محصول، مثلاً صندلی"
              value={query}
              onChange={(event) => updateParam("q", event.target.value)}
            />
          </div>
          <CategoryFilter
            categories={categories}
            active={category}
            onChange={(value) => updateParam("category", value)}
          />
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
