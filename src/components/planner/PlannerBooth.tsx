import { useDroppable } from "@dnd-kit/core";
import { products } from "../../data/products";
import { formatNumber } from "../../utils/formatPrice";
import { CELL_CM, type BoothLayout } from "../../utils/planner";
import { PlacedItemView } from "./PlacedItemView";

type PlannerBoothProps = {
  layout: BoothLayout;
  scale: number;
  selectedUid: string | null;
  onSelect: (uid: string | null) => void;
  onRotate: (uid: string) => void;
  onRemove: (uid: string) => void;
};

/** Top-down booth floor; positions are laid out left-to-right in cm × scale. */
export function PlannerBooth({ layout, scale, selectedUid, onSelect, onRotate, onRemove }: PlannerBoothProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "booth" });
  const cell = CELL_CM * scale;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-caption font-bold text-navy-900">جبهه غرفه (راهرو) · {formatNumber(layout.widthM)} متر</span>
      <div className="flex items-center gap-2">
        <div
          ref={setNodeRef}
          dir="ltr"
          onClick={(event) => event.target === event.currentTarget && onSelect(null)}
          className={`planner-grid relative box-content rounded-sm border-2 transition-colors ${isOver ? "border-accent-500" : "border-navy-900"}`}
          style={{
            width: layout.widthM * 100 * scale,
            height: layout.depthM * 100 * scale,
            backgroundSize: `${cell}px ${cell}px`,
          }}
        >
          {layout.items.map((item) => (
            <PlacedItemView
              key={item.uid}
              item={item}
              product={products.find((p) => p.id === item.productId)!}
              scale={scale}
              selected={item.uid === selectedUid}
              onSelect={() => onSelect(item.uid)}
              onRotate={() => onRotate(item.uid)}
              onRemove={() => onRemove(item.uid)}
            />
          ))}
          {layout.items.length === 0 && (
            <p className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 text-center text-small text-muted" dir="rtl">
              محصولات را به اینجا بکشید یا دکمه + را بزنید
            </p>
          )}
        </div>
        <span className="text-caption font-bold text-navy-900 [writing-mode:vertical-rl]">عمق · {formatNumber(layout.depthM)} متر</span>
      </div>
    </div>
  );
}
