import { stagger } from "../../lib/stagger";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import { photos } from "../../data/site";
import { products } from "../../data/products";
import { formatNumber } from "../../lib/format";
import { Container, Photo } from "../ui";

/** One giant word over filled bars: every category opens in place to its prices. */
export function CatalogueList() {
  return (
    <section aria-labelledby="catalogue-title" className="py-section">
      <Container className="grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6 xl:col-span-5 [container-type:inline-size]">
          <h2
            id="catalogue-title"
            className="mb-5 text-[42cqw] leading-[0.95] font-extrabold tracking-tight"
            data-reveal
          >
            کالاها
          </h2>

          <div className="flex flex-col gap-1.5">
            {categories.map((category, index) => {
              const items = products.filter((product) => product.category === category.id);
              return (
                <details
                  key={category.id}
                  open={index === 0}
                  className="group bg-surface"
                  data-reveal
                  style={stagger(index)}
                >
                  <summary className="flex min-h-14 items-center justify-between gap-4 px-5 text-body font-bold transition-colors hover:bg-surface-2">
                    {category.name}
                    <span
                      aria-hidden="true"
                      className="text-lead transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="flex flex-col gap-3.5 px-5 pt-1 pb-6">
                    <p className="text-small text-muted">{category.summary}</p>
                    {items.map((product) => (
                      <Link
                        key={product.slug}
                        to={`/products/${product.slug}`}
                        className="flex items-baseline justify-between gap-4 hover:text-accent"
                      >
                        <span className="link">{product.name}</span>
                        <span className="num">
                          {formatNumber(product.price.day)}
                          <span className="ms-1 text-small text-muted">/ روز</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </details>
              );
            })}
          </div>

          <Link to="/products" className="link mt-6 inline-block py-2 font-bold text-accent" data-reveal>
            همه کالاها با عکس و مشخصات
          </Link>
        </div>

        <figure className="lg:sticky lg:top-8 lg:col-span-6 lg:col-start-7 xl:col-span-6 xl:col-start-7" data-reveal>
          <Photo
            src={photos.roof.src}
            alt={photos.roof.alt}
            width={1200}
            height={1600}
            className="aspect-[3/4]"
          />
          <figcaption className="mt-3 text-small text-muted">
            سالن‌های نمایشگاه چهار روز زنده‌اند. ما همان چهار روز را اجاره می‌دهیم.
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
