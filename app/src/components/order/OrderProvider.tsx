import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { productBySlug } from "../../data/products";
import { OrderContext, type OrderContextValue, type OrderLine } from "../../hooks/useOrder";
import { clampDays, quoteRental, PACKAGE_DAYS } from "../../lib/pricing";

const STORAGE_KEY = "novinsaz.order.v1";

interface OrderState {
  days: number;
  /** slug → quantity */
  lines: Record<string, number>;
}

const emptyOrder: OrderState = { days: PACKAGE_DAYS, lines: {} };

function readStoredOrder(): OrderState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyOrder;
    const parsed = JSON.parse(raw) as Partial<OrderState>;
    const lines: Record<string, number> = {};
    for (const [slug, quantity] of Object.entries(parsed.lines ?? {})) {
      if (productBySlug[slug] && Number.isFinite(quantity) && quantity > 0) {
        lines[slug] = Math.floor(quantity);
      }
    }
    return { days: clampDays(Number(parsed.days) || PACKAGE_DAYS), lines };
  } catch {
    return emptyOrder;
  }
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OrderState>(readStoredOrder);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage may be unavailable (private mode); the order still works for this visit.
    }
  }, [state]);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setState((current) => {
      const lines = { ...current.lines };
      const stock = productBySlug[slug]?.stock ?? 0;
      const next = Math.min(stock, Math.floor(quantity));
      if (next > 0) lines[slug] = next;
      else delete lines[slug];
      return { ...current, lines };
    });
  }, []);

  const add = useCallback((slug: string, quantity = 1) => {
    setState((current) => {
      const stock = productBySlug[slug]?.stock ?? 0;
      const next = Math.min(stock, (current.lines[slug] ?? 0) + quantity);
      return { ...current, lines: { ...current.lines, [slug]: next } };
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setState((current) => {
      const lines = { ...current.lines };
      delete lines[slug];
      return { ...current, lines };
    });
  }, []);

  const setDays = useCallback((days: number) => {
    setState((current) => ({ ...current, days: clampDays(days) }));
  }, []);

  const clear = useCallback(() => setState((current) => ({ ...current, lines: {} })), []);

  const value = useMemo<OrderContextValue>(() => {
    const lines: OrderLine[] = Object.entries(state.lines).map(([slug, quantity]) => {
      const product = productBySlug[slug];
      return { product, quantity, quote: quoteRental(product.price, state.days, quantity) };
    });
    return {
      days: state.days,
      lines,
      itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
      total: lines.reduce((sum, line) => sum + line.quote.total, 0),
      saving: lines.reduce((sum, line) => sum + line.quote.saving, 0),
      setDays,
      setQuantity,
      add,
      remove,
      clear,
      quantityOf: (slug) => state.lines[slug] ?? 0,
    };
  }, [state, setDays, setQuantity, add, remove, clear]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
