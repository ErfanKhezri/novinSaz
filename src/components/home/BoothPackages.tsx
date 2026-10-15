import { useState } from "react";
import { motion } from "motion/react";
import { boothPackages } from "../../data/home";
import { products } from "../../data/products";
import { useCart } from "../../hooks/useCart";
import { formatNumber, formatPrice } from "../../utils/formatPrice";
import { staggeredFadeUp } from "../../utils/motion";
import { rentalPrice } from "../../utils/rentalPrice";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { GlassPanel } from "../ui/GlassPanel";

function packagePrice(items: { slug: string; quantity: number }[], days: number) {
  return items.reduce((sum, item) => {
    const product = products.find((p) => p.slug === item.slug)!;
    return sum + rentalPrice(product, days, item.quantity).price;
  }, 0);
}

export function BoothPackages() {
  const { addItem, openDrawer } = useCart();
  const [addedName, setAddedName] = useState("");

  const addPackage = (name: string, items: { slug: string; quantity: number }[]) => {
    items.forEach((item) => addItem(products.find((p) => p.slug === item.slug)!.id, item.quantity));
    setAddedName(name);
    setTimeout(openDrawer, 350);
  };

  return (
    <ul className="grid gap-5 lg:grid-cols-3">
      {boothPackages.map((pack, index) => (
        <motion.li
          key={pack.name}
          custom={index}
          variants={staggeredFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <GlassPanel
            variant="strong"
            whileHover={{ y: -8 }}
            className={`flex h-full flex-col gap-5 p-6 ${pack.highlighted ? "ring-2 ring-gold-500" : ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-h3 font-extrabold text-navy-900">{pack.name}</h3>
                <p className="text-small text-muted">{pack.size}</p>
              </div>
              {pack.highlighted && <Badge tone="gold">محبوب‌ترین</Badge>}
            </div>

            <ul className="flex-1 space-y-2">
              {pack.items.map((item) => (
                <li key={item.slug} className="flex items-center gap-2 text-body">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-50 text-caption text-success-700" aria-hidden="true">
                    ✓
                  </span>
                  {formatNumber(item.quantity)} عدد {products.find((p) => p.slug === item.slug)!.name}
                </li>
              ))}
            </ul>

            <div className="border-t border-white/70 pt-4">
              <p className="text-small text-muted">برای ۴ روز نمایشگاه</p>
              <p className="text-h2 font-extrabold text-navy-900">{formatPrice(packagePrice(pack.items, 4))}</p>
              <p className="text-caption text-muted">روزانه {formatPrice(packagePrice(pack.items, 1))}</p>
            </div>

            <Button variant={pack.highlighted ? "accent" : "primary"} onClick={() => addPackage(pack.name, pack.items)}>
              {addedName === pack.name ? "به لیست اضافه شد" : "افزودن کل بسته به لیست"}
            </Button>
          </GlassPanel>
        </motion.li>
      ))}
    </ul>
  );
}
