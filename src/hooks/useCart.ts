import { createContext, useContext } from "react";
import type { Product } from "../types/product";
import type { RentalPrice } from "../utils/rentalPrice";

export type CartItem = {
  productId: string;
  quantity: number;
  /** Set when the item was added as part of a ready-made package. */
  packageId?: string;
};

export type CartLine = CartItem & {
  key: string;
  product: Product;
  rental: RentalPrice;
  discountPercent: number;
  total: number;
};

export type CartValue = {
  items: CartItem[];
  lines: CartLine[];
  startDate: string | null;
  endDate: string | null;
  exhibitionName: string | null;
  days: number;
  hasDates: boolean;
  count: number;
  total: number;
  saving: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (productId: string, quantity?: number, packageId?: string) => void;
  addPackage: (packageId: string) => void;
  setQuantity: (productId: string, quantity: number, packageId?: string) => void;
  removeItem: (productId: string, packageId?: string) => void;
  setDates: (startDate: string | null, endDate: string | null) => void;
  setExhibition: (name: string, startDate: string, endDate: string) => void;
  clearExhibition: () => void;
  clear: () => void;
};

export const CartContext = createContext<CartValue | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
