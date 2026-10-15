import { lazy, Suspense, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CompareToggle } from "../components/product/CompareToggle";
import { FavoriteButton } from "../components/product/FavoriteButton";
import { PriceTable } from "../components/product/PriceTable";
import { RentalCalculator } from "../components/product/RentalCalculator";
import { AddToCartButton } from "../components/cart/AddToCartButton";
import { ProductGrid } from "../components/product/ProductGrid";
import { Badge } from "../components/ui/Badge";
import { ButtonAnchor } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { products } from "../data/products";
import { site } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";
import { whatsappLink } from "../utils/whatsapp";
import { NotFound } from "./NotFound";

const ModelViewer = lazy(() => import("../components/product/ModelViewer").then((module) => ({ default: module.ModelViewer })));

export function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const [view, setView] = useState<"photo" | "3d">("photo");
  usePageMeta(product?.name ?? "محصول پیدا نشد", product?.description);

  if (!product) return <NotFound />;

  const related = [
    ...products.filter((item) => item.category === product.category && item.id !== product.id),
    ...products.filter((item) => item.category !== product.category),
  ].slice(0, 3);

  const message = `سلام ${site.name}، درخواست اجاره «${product.name}» را دارم. لطفاً موجودی و شرایط را اعلام کنید.`;

  return (
    <>
      <Section className="sm:!py-section-sm">
        <Container>
          <nav aria-label="مسیر" className="mb-6 text-small text-muted">
            <Link to="/products" className="hover:text-navy-900">
              محصولات
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{product.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-3">
              {product.model && (
                <div role="tablist" aria-label="نمای محصول" className="flex gap-2">
                  {(["photo", "3d"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={view === tab}
                      onClick={() => setView(tab)}
                      className={`rounded-full border px-4 py-2 text-small font-bold transition-colors ${
                        view === tab ? "border-navy-900 bg-navy-900 text-paper" : "border-line bg-paper text-navy-900 hover:border-navy-900"
                      }`}
                    >
                      {tab === "photo" ? "تصویر" : "نمای سه‌بعدی"}
                    </button>
                  ))}
                </div>
              )}
              {view === "3d" && product.model ? (
                <Suspense
                  fallback={<div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-line bg-navy-50 text-muted">در حال بارگذاری مدل سه‌بعدی…</div>}
                >
                  <ModelViewer src={product.model} alt={`مدل سه‌بعدی ${product.name}`} poster={product.image} />
                </Suspense>
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  width={800}
                  height={600}
                  className="w-full rounded-lg border border-line bg-navy-50"
                />
              )}
              {product.model && view === "3d" && (
                <p className="text-caption text-muted">با انگشت یا ماوس بچرخانید؛ روی موبایل با دکمه AR محصول را در فضای خود ببینید.</p>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-start gap-3">
                <div className="flex w-full items-center justify-between gap-3">
                  <Badge>{product.category}</Badge>
                  <div className="flex items-center gap-3">
                    <CompareToggle productId={product.id} productName={product.name} />
                    <FavoriteButton productId={product.id} productName={product.name} />
                  </div>
                </div>
                <h1 className="text-h1 font-extrabold text-navy-900">{product.name}</h1>
                <p className="text-lead text-muted">{product.description}</p>
              </div>

              <PriceTable pricePerDay={product.pricePerDay} pricePer4Days={product.pricePer4Days} />

              <div className="grid gap-3 sm:grid-cols-2">
                <AddToCartButton productId={product.id} variant="primary" />
                <ButtonAnchor href={whatsappLink(message)} target="_blank" rel="noreferrer" variant="accent">
                  ثبت درخواست اجاره
                </ButtonAnchor>
              </div>

              <RentalCalculator product={product} />

              <div>
                <h2 className="mb-3 text-h3 font-bold text-navy-900">مشخصات</h2>
                <dl className="divide-y divide-line rounded-lg border border-line bg-paper">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between gap-4 px-4 py-3">
                      <dt className="text-muted">{spec.label}</dt>
                      <dd className="text-end font-medium">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle title="محصولات مرتبط" />
          <ProductGrid products={related} />
        </Container>
      </Section>
    </>
  );
}
