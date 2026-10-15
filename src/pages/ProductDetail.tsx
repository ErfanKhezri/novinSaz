import { Link, useParams } from "react-router-dom";
import { PriceTable } from "../components/product/PriceTable";
import { ProductGrid } from "../components/product/ProductGrid";
import { Badge } from "../components/ui/Badge";
import { ButtonAnchor } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { products } from "../data/products";
import { site } from "../data/site";
import { whatsappLink } from "../utils/whatsapp";
import { NotFound } from "./NotFound";

export function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);

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
            <img
              src={product.image}
              alt={product.name}
              width={800}
              height={600}
              className="w-full rounded-lg border border-line bg-navy-50"
            />

            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-start gap-3">
                <Badge>{product.category}</Badge>
                <h1 className="text-h1 font-extrabold text-navy-900">{product.name}</h1>
                <p className="text-lead text-muted">{product.description}</p>
              </div>

              <PriceTable pricePerDay={product.pricePerDay} pricePer4Days={product.pricePer4Days} />

              <ButtonAnchor href={whatsappLink(message)} target="_blank" rel="noreferrer" variant="accent">
                ثبت درخواست اجاره
              </ButtonAnchor>

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
