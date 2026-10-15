import { stagger } from "../../lib/stagger";
import { Link } from "react-router-dom";
import type { Product } from "../../data/types";
import { formatNumber } from "../../lib/format";
import { cn } from "../../lib/cn";
import { ProductArt } from "./ProductArt";

interface ProductPlateProps {
  product: Product;
  index?: number;
  /** The plate fill; use "paper" when the plate sits on a surface-coloured section. */
  tone?: "surface" | "paper";
}

/** A catalogue plate: the drawing on a filled square, the name and its day rate. */
export function ProductPlate({ product, index = 0, tone = "surface" }: ProductPlateProps) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex flex-col gap-4"
      data-reveal
      style={stagger(index % 4)}
    >
      <div
        className={cn(
          "p-6 transition-colors duration-300 sm:p-10",
          tone === "surface" ? "bg-surface group-hover:bg-surface-2" : "bg-paper group-hover:bg-surface-2",
        )}
      >
        <ProductArt
          art={product.art}
          title={product.name}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lead font-bold group-hover:text-accent">{product.name}</h3>
        <p className="num shrink-0 text-body">
          {formatNumber(product.price.day)}
          <span className="ms-1 text-small text-muted">تومان / روز</span>
        </p>
      </div>
      <p className="-mt-2">{product.tagline}</p>
    </Link>
  );
}
