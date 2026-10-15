import { createContext, useContext } from "react";
import type { Product } from "../types/product";

export type RentalLine = { product: Product; quantity: number; cost: number };

export type RentalListValue = {
  days: number;
  lines: RentalLine[];
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setDays: (days: number) => void;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
};

export const RentalListContext = createContext<RentalListValue | null>(null);

export function useRentalList() {
  const context = useContext(RentalListContext);
  if (!context) throw new Error("useRentalList must be used inside RentalListProvider");
  return context;
}
