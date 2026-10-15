import { Link, useParams } from "react-router-dom";
import { categoryById } from "../data/categories";
import { productBySlug, products } from "../data/products";
import { PricePair, ProductArt, ProductPlate, RentalCalculator, SpecList } from "../components/product";
import { Container } from "../components/ui";
import { usePageTitle } from "../hooks/usePageTitle";
import { NotFoundPage } from "./NotFoundPage";

export function ProductPage() {
  const { slug = "" } = useParams();
  const product = productBySlug[slug];
  usePageTitle(product?.name ?? "پیدا نشد");

  if (!product) return <NotFoundPage />;

  const category = categoryById[product.category];
  const related = [
    ...products.filter((item) => item.category === product.category && item.slug !== slug),
    ...products.filter((item) => item.featured && item.category !== product.category),
  ].slice(0, 3);

  return (
    <>
      <Container className="pt-6 pb-section">
        <nav aria-label="مسیر" className="mb-8 text-small text-muted">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link to="/products" className="link">کالاها</Link> /
            </li>
            <li>
              <Link to={`/products?category=${category.id}`} className="link">{category.name}</Link> /
            </li>
            <li aria-current="page" className="text-ink">{product.name}</li>
          </ol>
        </nav>

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="bg-surface p-8 sm:p-16 lg:sticky lg:top-6 lg:col-span-6" data-reveal>
            <ProductArt art={product.art} title={product.name} />
          </div>

          <div className="flex flex-col gap-10 lg:col-span-6">
            <div className="flex flex-col gap-4" data-reveal>
              <h1 className="text-head font-extrabold tracking-tight">{product.name}</h1>
              <p className="text-lead">{product.tagline}</p>
            </div>

            <PricePair price={product.price} />

            <div className="bg-surface p-2">
              <RentalCalculator product={product} />
            </div>

            <section aria-labelledby="about-title" className="flex flex-col gap-4">
              <h2 id="about-title" className="text-lead font-bold">درباره این کالا</h2>
              {product.description.map((paragraph) => (
                <p key={paragraph} className="max-w-[60ch]">{paragraph}</p>
              ))}
            </section>

            <section aria-labelledby="specs-title" className="flex flex-col gap-2">
              <h2 id="specs-title" className="text-lead font-bold">مشخصات</h2>
              <SpecList specs={product.specs} options={product.options} />
            </section>
          </div>
        </div>
      </Container>

      <section aria-labelledby="related-title" className="bg-surface py-section">
        <Container>
          <h2 id="related-title" className="mb-12 text-head font-extrabold tracking-tight" data-reveal>
            کنارش اجاره کنید
          </h2>
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <ProductPlate key={item.slug} product={item} index={index} tone="paper" />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
