import { useDraggable } from "@dnd-kit/core";
import type { Product } from "../../types/product";
import { footprint, type PlacedItem } from "../../utils/planner";

type PlacedItemViewProps = {
  item: PlacedItem;
  product: Product;
  scale: number;
  selected: boolean;
  onSelect: () => void;
  onRotate: () => void;
  onRemove: () => void;
};

export function PlacedItemView({ item, product, scale, selected, onSelect, onRotate, onRemove }: PlacedItemViewProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: `placed:${item.uid}` });
  const { width, depth } = footprint(product, item.rotated);

  return (
    <div
      className="absolute"
      style={{
        left: item.x * scale,
        top: item.y * scale,
        width: width * scale,
        height: depth * scale,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        zIndex: isDragging || selected ? 20 : 10,
      }}
    >
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onClick={onSelect}
        aria-label={product.name}
        className={`flex h-full w-full cursor-grab touch-none items-center justify-center overflow-hidden rounded-sm border-2 text-center text-[10px] font-bold leading-tight active:cursor-grabbing sm:text-caption ${
          selected ? "border-accent-500 bg-accent-500 text-paper" : "border-navy-900 bg-navy-900/85 text-paper"
        } ${isDragging ? "opacity-80 shadow-glass-strong" : ""}`}
        dir="rtl"
      >
        <span className="px-0.5">{product.name}</span>
      </div>

      {selected && !isDragging && (
        <div className="absolute -top-11 left-1/2 flex -translate-x-1/2 gap-1 rounded border border-white/60 bg-white/90 p-1 shadow-glass backdrop-blur">
          <button
            type="button"
            onClick={onRotate}
            className="flex h-8 w-8 items-center justify-center rounded text-navy-900 hover:bg-navy-50"
            aria-label="چرخش ۹۰ درجه"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="flex h-8 w-8 items-center justify-center rounded text-navy-900 hover:bg-navy-50"
            aria-label="حذف از غرفه"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M5 7h14M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
