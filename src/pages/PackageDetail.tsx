import { Link, useParams } from "react-router-dom";
import { AddPackageButton } from "../components/package/AddPackageButton";
import { PackageCard } from "../components/package/PackageCard";
import { Badge } from "../components/ui/Badge";
import { Container } from "../components/ui/Container";
import { GlassPanel } from "../components/ui/GlassPanel";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { packages } from "../data/packages";
import { usePageMeta } from "../hooks/usePageMeta";
import { formatNumber, formatPrice } from "../utils/formatPrice";
import { packageItems, packagePrice } from "../utils/packagePrice";
import { rentalPrice } from "../utils/rentalPrice";
import { NotFound } from "./NotFound";

export function PackageDetail() {
  const { slug } = useParams();
  const pack = packages.find((item) => item.slug === slug);
  usePageMeta(pack?.name ?? "پکیج پیدا نشد", pack?.description);

  if (!pack) return <NotFound />;

  const price = packagePrice(pack);
  const dailyPrice = packagePrice(pack, 1);
  const others = packages.filter((item) => item.id !== pack.id).slice(0, 3);

  return (
    <>
      <Section className="sm:!py-section-sm">
        <Container>
          <nav aria-label="مسیر" className="mb-6 text-small text-muted">
            <Link to="/packages" className="hover:text-navy-900">
              پکیج‌ها
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{pack.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="relative">
              <img src={pack.image} alt={pack.name} width={1200} height={800} className="w-full rounded-lg border border-line bg-navy-50" />
              <span className="absolute right-3 top-3 rounded-full bg-accent-500 px-4 py-1 font-bold text-paper">
                {formatNumber(pack.discountPercent)}٪ تخفیف پکیج
              </span>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-start gap-3">
                <Badge>{pack.boothSize}</Badge>
                <h1 className="text-h1 font-extrabold text-navy-900">{pack.name}</h1>
                <p className="text-lead text-muted">{pack.description}</p>
              </div>

              <GlassPanel variant="strong" className="overflow-hidden">
                <h2 className="border-b border-white/70 px-5 py-3 font-bold text-navy-900">اقلام این پکیج</h2>
                <ul className="divide-y divide-white/70">
                  {packageItems(pack).map((item) => (
                    <li key={item.productId} className="flex items-center gap-3 px-5 py-3">
                      <img src={item.product.image} alt="" className="h-12 w-12 rounded bg-navy-50 object-cover" />
                      <Link to={`/products/${item.product.slug}`} className="flex-1 font-medium text-navy-900 hover:text-accent-600">
                        {item.product.name}
                      </Link>
                      <span className="text-small text-muted">× {formatNumber(item.quantity)}</span>
                      <span className="w-28 text-end text-small">
                        {formatPrice(rentalPrice(item.product, 4, item.quantity).price)}
                      </span>
                    </li>
                  ))}
                </ul>
              </GlassPanel>

              <GlassPanel variant="strong" className="space-y-2 p-5">
                <p className="text-small text-muted">قیمت برای ۴ روز نمایشگاه</p>
                <div className="flex justify-between">
                  <span>اجاره تکی محصولات</span>
                  <span className="text-muted line-through">{formatPrice(price.normal)}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-navy-900">قیمت پکیج</span>
                  <span className="text-h2 font-extrabold text-navy-900">{formatPrice(price.final)}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge tone="success">صرفه‌جویی {formatPrice(price.saving)}</Badge>
                  <span className="text-caption text-muted">اجاره یک‌روزه: {formatPrice(dailyPrice.final)}</span>
                </div>
              </GlassPanel>

              <AddPackageButton packageId={pack.id} />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle title="پکیج‌های دیگر" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <li key={item.id}>
                <PackageCard pack={item} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
