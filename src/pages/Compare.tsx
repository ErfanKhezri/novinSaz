import { Link } from "react-router-dom";
import { AddToCartButton } from "../components/cart/AddToCartButton";
import { ButtonLink } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { GlassPanel } from "../components/ui/GlassPanel";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { products } from "../data/products";
import { useCompare } from "../hooks/useCompare";
import { usePageMeta } from "../hooks/usePageMeta";
import type { Product } from "../types/product";
import { formatNumber, formatPrice } from "../utils/formatPrice";
import { fourDaySaving } from "../utils/rentalPrice";

type Row = { label: string; value: (product: Product) => string };

const fixedRows: Row[] = [
  { label: "دسته‌بندی", value: (product) => product.category },
  { label: "اجاره یک روز", value: (product) => formatPrice(product.pricePerDay) },
  { label: "بسته چهار روزه", value: (product) => formatPrice(product.pricePer4Days) },
  { label: "صرفه‌جویی بسته", value: (product) => formatPrice(fourDaySaving(product)) },
  { label: "ابعاد (عرض × عمق)", value: (product) => `${formatNumber(product.widthCm)} × ${formatNumber(product.depthCm)} سانتی‌متر` },
];

export function Compare() {
  usePageMeta("مقایسه محصولات");
  const { ids, remove } = useCompare();
  const selected = products.filter((product) => ids.includes(product.id));
  const specLabels = [...new Set(selected.flatMap((product) => product.specs.map((spec) => spec.label)))];
  const rows: Row[] = [
    ...fixedRows,
    ...specLabels.map((label) => ({
      label,
      value: (product: Product) => product.specs.find((spec) => spec.label === label)?.value ?? "—",
    })),
  ];

  return (
    <Section>
      <Container>
        <SectionTitle
          as="h1"
          title="مقایسه محصولات"
          subtitle={selected.length ? "قیمت، ابعاد و مشخصات را کنار هم ببینید." : "برای مقایسه، تیک «مقایسه» را روی کارت محصولات بزنید (حداکثر ۳ محصول)."}
        />

        {selected.length === 0 ? (
          <div className="text-center">
            <ButtonLink to="/products">انتخاب محصول</ButtonLink>
          </div>
        ) : (
          <GlassPanel variant="strong" className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-small">
              <thead>
                <tr>
                  <th scope="col" className="sticky right-0 z-10 w-36 bg-paper/90 p-3 text-start font-medium text-muted">
                    محصول
                  </th>
                  {selected.map((product) => (
                    <th key={product.id} scope="col" className="p-3 align-top">
                      <div className="flex flex-col items-center gap-2">
                        <img src={product.image} alt="" className="aspect-[4/3] w-full max-w-48 rounded bg-navy-50 object-cover" />
                        <Link to={`/products/${product.slug}`} className="text-body font-bold text-navy-900 hover:text-accent-600">
                          {product.name}
                        </Link>
                        <button type="button" onClick={() => remove(product.id)} className="text-caption font-normal text-muted hover:text-navy-900">
                          حذف از مقایسه
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-t border-white/70">
                    <th scope="row" className="sticky right-0 z-10 bg-paper/90 p-3 text-start font-medium text-muted">
                      {row.label}
                    </th>
                    {selected.map((product) => (
                      <td key={product.id} className="p-3 text-center">
                        {row.value(product)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-white/70">
                  <th scope="row" className="sticky right-0 z-10 bg-paper/90 p-3" />
                  {selected.map((product) => (
                    <td key={product.id} className="p-3">
                      <AddToCartButton productId={product.id} className="min-h-10 w-full px-3 text-small" />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </GlassPanel>
        )}
      </Container>
    </Section>
  );
}
