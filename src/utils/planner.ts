import type { Product } from "../types/product";

/** One grid cell on the booth floor. */
export const CELL_CM = 50;
/** Items snap to this step when dropped or moved. */
export const SNAP_CM = 10;

export const boothPresets = [
  { label: "۳ × ۳", widthM: 3, depthM: 3 },
  { label: "۳ × ۶", widthM: 6, depthM: 3 },
  { label: "۶ × ۶", widthM: 6, depthM: 6 },
];

export type PlacedItem = {
  uid: string;
  productId: string;
  /** Top-left corner in cm, measured from the booth's top-left corner. */
  x: number;
  y: number;
  rotated: boolean;
};

export type BoothLayout = {
  widthM: number;
  depthM: number;
  items: PlacedItem[];
};

export function footprint(product: Product, rotated: boolean) {
  return rotated
    ? { width: product.depthCm, depth: product.widthCm }
    : { width: product.widthCm, depth: product.depthCm };
}

const snap = (value: number) => Math.round(value / SNAP_CM) * SNAP_CM;

/** Snaps the item to the grid step and keeps it fully inside the booth. */
export function placeInside(item: PlacedItem, product: Product, layout: Pick<BoothLayout, "widthM" | "depthM">): PlacedItem {
  const { width, depth } = footprint(product, item.rotated);
  const maxX = Math.max(0, layout.widthM * 100 - width);
  const maxY = Math.max(0, layout.depthM * 100 - depth);
  return {
    ...item,
    x: Math.min(maxX, Math.max(0, snap(item.x))),
    y: Math.min(maxY, Math.max(0, snap(item.y))),
  };
}
