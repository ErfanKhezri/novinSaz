import { useEffect, useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type PointerSensorOptions,
} from "@dnd-kit/core";
import { BoothSizePicker } from "../components/planner/BoothSizePicker";
import { PlannerBooth } from "../components/planner/PlannerBooth";
import { PlannerSummary } from "../components/planner/PlannerSummary";
import { ProductPalette } from "../components/planner/ProductPalette";
import { Container } from "../components/ui/Container";
import { GlassPanel } from "../components/ui/GlassPanel";
import { SectionTitle } from "../components/ui/SectionTitle";
import { products } from "../data/products";
import { usePageMeta } from "../hooks/usePageMeta";
import { footprint, placeInside, type BoothLayout, type PlacedItem } from "../utils/planner";
import { readStorage, writeStorage } from "../utils/storage";

const STORAGE_KEY = "novinsaz-planner";
const emptyLayout: BoothLayout = { widthM: 3, depthM: 3, items: [] };

/** Mouse and pen drag immediately; fingers go to the TouchSensor, which waits for a short press so lists still scroll. */
class MousePointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: "onPointerDown" as const,
      handler: ({ nativeEvent }: { nativeEvent: PointerEvent }, { onActivation }: PointerSensorOptions) => {
        if (nativeEvent.pointerType === "touch" || !nativeEvent.isPrimary || nativeEvent.button !== 0) return false;
        onActivation?.({ event: nativeEvent });
        return true;
      },
    },
  ];
}

const productById = (id: string) => products.find((product) => product.id === id)!;

export function Planner() {
  usePageMeta("طراح غرفه", "اندازه غرفه را وارد کنید، مبلمان را روی نقشه بچینید و برآورد اجاره را ببینید.");
  const [layout, setLayout] = useState<BoothLayout>(() => readStorage(STORAGE_KEY, emptyLayout));
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const [draggingProductId, setDraggingProductId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const areaRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(MousePointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 8 } }),
  );

  useEffect(() => writeStorage(STORAGE_KEY, layout), [layout]);

  // Pixels per cm: fit the booth to the available width and at most 65% of the screen height.
  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const measure = () => {
      // Leave room for the area padding and the depth label beside the booth.
      const width = area.clientWidth - 80;
      setScale(Math.min(width / (layout.widthM * 100), (window.innerHeight * 0.65) / (layout.depthM * 100)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(area);
    return () => observer.disconnect();
  }, [layout.widthM, layout.depthM]);

  const updateItem = (uid: string, change: (item: PlacedItem) => PlacedItem) =>
    setLayout((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.uid === uid ? placeInside(change(item), productById(item.productId), current) : item,
      ),
    }));

  const addItem = (productId: string, x?: number, y?: number) => {
    const product = productById(productId);
    setLayout((current) => {
      const { width, depth } = footprint(product, false);
      const item: PlacedItem = {
        uid: `${productId}-${Date.now()}`,
        productId,
        x: x ?? (current.widthM * 100 - width) / 2,
        y: y ?? (current.depthM * 100 - depth) / 2,
        rotated: false,
      };
      const placed = placeInside(item, product, current);
      setSelectedUid(placed.uid);
      return { ...current, items: [...current.items, placed] };
    });
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    const [kind, id] = String(active.id).split(":");
    if (kind === "new") setDraggingProductId(id);
    else setSelectedUid(id);
  };

  const handleDragEnd = ({ active, over, delta }: DragEndEvent) => {
    setDraggingProductId(null);
    const [kind, id] = String(active.id).split(":");

    if (kind === "placed") {
      updateItem(id, (item) => ({ ...item, x: item.x + delta.x / scale, y: item.y + delta.y / scale }));
      return;
    }

    const dropped = active.rect.current.translated;
    if (over?.id !== "booth" || !dropped) return;
    const { width, depth } = footprint(productById(id), false);
    const centerX = (dropped.left + dropped.width / 2 - over.rect.left) / scale;
    const centerY = (dropped.top + dropped.height / 2 - over.rect.top) / scale;
    addItem(id, centerX - width / 2, centerY - depth / 2);
  };

  const setBoothSize = (widthM: number, depthM: number) =>
    setLayout((current) => ({
      widthM,
      depthM,
      items: current.items.map((item) => placeInside(item, productById(item.productId), { widthM, depthM })),
    }));

  const draggingProduct = draggingProductId ? productById(draggingProductId) : null;

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={() => setDraggingProductId(null)}>
      <Container className="pb-48 pt-10 lg:pb-section">
        <SectionTitle
          as="h1"
          title="طراح غرفه"
          subtitle="اندازه غرفه را انتخاب کنید و محصولات را روی نقشه بچینید. روی هر محصول بزنید تا بچرخانید یا حذف کنید."
        />

        <div className="grid items-start gap-6 lg:grid-cols-[18rem_1fr]">
          <div className="space-y-4">
            <GlassPanel variant="strong" className="p-4">
              <BoothSizePicker widthM={layout.widthM} depthM={layout.depthM} onChange={setBoothSize} />
            </GlassPanel>
            <GlassPanel
              variant="strong"
              className="fixed inset-x-2 bottom-2 z-30 p-3 lg:static lg:max-h-[60vh] lg:overflow-y-auto lg:p-4"
            >
              <h2 className="mb-2 text-small font-bold text-navy-900">محصولات (بکشید یا + بزنید)</h2>
              <ProductPalette onAdd={(productId) => addItem(productId)} />
            </GlassPanel>
          </div>

          <div className="min-w-0 space-y-6">
            <div ref={areaRef} className="flex justify-center overflow-hidden rounded-lg border border-line bg-paper px-4 pb-6 pt-14">
              <PlannerBooth
                layout={layout}
                scale={scale}
                selectedUid={selectedUid}
                onSelect={setSelectedUid}
                onRotate={(uid) => updateItem(uid, (item) => ({ ...item, rotated: !item.rotated }))}
                onRemove={(uid) => setLayout((current) => ({ ...current, items: current.items.filter((item) => item.uid !== uid) }))}
              />
            </div>
            <PlannerSummary items={layout.items} onClear={() => setLayout((current) => ({ ...current, items: [] }))} />
          </div>
        </div>
      </Container>

      <DragOverlay dropAnimation={null}>
        {draggingProduct && (
          <div
            className="flex items-center justify-center rounded-sm border-2 border-accent-500 bg-accent-500/80 text-center text-caption font-bold text-paper"
            style={{ width: draggingProduct.widthCm * scale, height: draggingProduct.depthCm * scale }}
          >
            {draggingProduct.name}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
