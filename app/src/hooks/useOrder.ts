import { createContext, useContext } from "react";
import type { Product } from "../data/types";
import type { RentalQuote } from "../lib/pricing";

export interface OrderLine {
  product: Product;
  quantity: number;
  quote: RentalQuote;
}

export interface OrderContextValue {
  days: number;
  lines: OrderLine[];
  itemCount: number;
  total: number;
  saving: number;
  setDays: (days: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  add: (slug: string, quantity?: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  quantityOf: (slug: string) => number;
}

export const OrderContext = createContext<OrderContextValue | null>(null);

/** The visitor's rental order slip, shared by every page. */
export function useOrder(): OrderContextValue {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used inside <OrderProvider>");
  return context;
}
