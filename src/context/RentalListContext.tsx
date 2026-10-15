import { useEffect, useState, type ReactNode } from "react";
import { products } from "../data/products";
import { RentalListContext, type RentalListValue } from "../hooks/useRentalList";
import { rentalCost } from "../utils/pricing";

const STORAGE_KEY = "novinsaz-rental-list";

type StoredList = { days: number; items: Record<string, number> };

function readStored(): StoredList {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "");
    return { days: stored.days ?? 4, items: stored.items ?? {} };
  } catch {
    return { days: 4, items: {} };
  }
}

export function RentalListProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<StoredList>(readStored);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }, [list]);

  const setQuantity = (slug: string, quantity: number) =>
    setList((current) => {
      const items = { ...current.items };
      if (quantity > 0) items[slug] = quantity;
      else delete items[slug];
      return { ...current, items };
    });

  const lines = products
    .filter((product) => list.items[product.slug])
    .map((product) => {
      const quantity = list.items[product.slug];
      return { product, quantity, cost: rentalCost(product, list.days, quantity) };
    });

  const value: RentalListValue = {
    days: list.days,
    lines,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: lines.reduce((sum, line) => sum + line.cost, 0),
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    setDays: (days) => setList((current) => ({ ...current, days: Math.min(30, Math.max(1, days)) })),
    add: (slug, quantity = 1) => setQuantity(slug, (list.items[slug] ?? 0) + quantity),
    setQuantity,
    clear: () => setList((current) => ({ ...current, items: {} })),
  };

  return <RentalListContext.Provider value={value}>{children}</RentalListContext.Provider>;
}
