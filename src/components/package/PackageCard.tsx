import { Link } from "react-router-dom";
import type { BoothPackage } from "../../data/packages";
import { formatNumber, formatPrice } from "../../utils/formatPrice";
import { packageItems, packagePrice } from "../../utils/packagePrice";
import { Badge } from "../ui/Badge";
import { GlassPanel } from "../ui/GlassPanel";
import { AddPackageButton } from "./AddPackageButton";

type PackageCardProps = { pack: BoothPackage };

export function PackageCard({ pack }: PackageCardProps) {
  const price = packagePrice(pack);
  const items = packageItems(pack);

  return (
    <GlassPanel variant="strong" whileHover={{ y: -6 }} className="flex h-full flex-col overflow-hidden p-2">
      <Link to={`/packages/${pack.slug}`} className="relative block overflow-hidden rounded">
        <img src={pack.image} alt={pack.name} loading="lazy" width={1200} height={800} className="aspect-[3/2] w-full bg-navy-50 object-cover" />
        <span className="absolute right-2 top-2 rounded-full bg-gold-500 px-3 py-0.5 text-caption font-bold text-navy-900">
          {formatNumber(pack.discountPercent)}٪ تخفیف
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/packages/${pack.slug}`} className="text-h3 font-extrabold text-navy-900 hover:text-gold-600">
            {pack.name}
          </Link>
          <Badge>{pack.boothSize}</Badge>
        </div>
        <p className="text-small text-muted">
          {items.map((item) => `${formatNumber(item.quantity)} ${item.product.name}`).join("، ")}
        </p>
        <div className="mt-auto border-t border-white/70 pt-3">
          <p className="text-caption text-muted">برای ۴ روز نمایشگاه</p>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-h3 font-extrabold text-navy-900">{formatPrice(price.final)}</span>
            <span className="text-small text-muted line-through">{formatNumber(price.normal)}</span>
          </div>
          <p className="text-caption text-success-700">صرفه‌جویی {formatPrice(price.saving)}</p>
        </div>
        <AddPackageButton packageId={pack.id} variant="primary" className="min-h-10 text-small" />
      </div>
    </GlassPanel>
  );
}
