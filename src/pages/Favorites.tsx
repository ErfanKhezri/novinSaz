import { ProductGrid } from "../components/product/ProductGrid";
import { ButtonLink } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { products } from "../data/products";
import { useFavorites } from "../hooks/useFavorites";
import { usePageMeta } from "../hooks/usePageMeta";

export function Favorites() {
  usePageMeta("علاقه‌مندی‌ها");
  const { ids } = useFavorites();
  const favorites = products.filter((product) => ids.includes(product.id));

  return (
    <Section>
      <Container>
        <SectionTitle
          as="h1"
          title="علاقه‌مندی‌ها"
          subtitle={favorites.length ? "محصولاتی که نشان کرده‌اید." : "هنوز محصولی را با علامت قلب نشان نکرده‌اید."}
        />
        {favorites.length > 0 ? (
          <ProductGrid products={favorites} />
        ) : (
          <div className="text-center">
            <ButtonLink to="/products">مشاهده محصولات</ButtonLink>
          </div>
        )}
      </Container>
    </Section>
  );
}
