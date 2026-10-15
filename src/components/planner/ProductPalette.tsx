import { useDraggable } from "@dnd-kit/core";
import { products } from "../../data/products";
import type { Product } from "../../types/product";
import { formatNumber } from "../../utils/formatPrice";

type PaletteItemProps = { product: Product; onAdd: (productId: string) => void };

function PaletteItem({ product, onAdd }: PaletteItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `new:${product.id}` });

  return (
    <li className="w-48 shrink-0 lg:w-auto">
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={`flex cursor-grab items-center gap-2 rounded border border-line bg-paper p-2 transition active:cursor-grabbing ${
          isDragging ? "opacity-40" : "hover:border-navy-900"
        }`}
      >
        <img src={product.image} alt="" className="h-10 w-10 shrink-0 rounded bg-navy-50 object-cover" draggable={false} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-small font-bold text-navy-900">{product.name}</p>
          <p className="text-caption text-muted">
            {formatNumber(product.widthCm)}×{formatNumber(product.depthCm)} سانت
          </p>
        </div>
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => onAdd(product.id)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-navy-900 text-paper transition hover:bg-navy-700"
          aria-label={`افزودن ${product.name} به غرفه`}
        >
          +
        </button>
      </div>
    </li>
  );
}

type ProductPaletteProps = { onAdd: (productId: string) => void };

/** Products to drag onto the booth; the + button places one without dragging. */
export function ProductPalette({ onAdd }: ProductPaletteProps) {
  return (
    <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
      {products.map((product) => (
        <PaletteItem key={product.id} product={product} onAdd={onAdd} />
      ))}
    </ul>
  );
}
