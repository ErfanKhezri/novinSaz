import { useEffect, useState, type ReactNode } from "react";
import { packages } from "../data/packages";
import { products } from "../data/products";
import { CartContext, type CartItem, type CartLine, type CartValue } from "../hooks/useCart";
import { daysBetween } from "../utils/jalali";
import { rentalPrice } from "../utils/rentalPrice";
import { readStorage, writeStorage } from "../utils/storage";

const STORAGE_KEY = "novinsaz-cart";

/** Rental length used for prices until the visitor picks dates: a typical four-day exhibition. */
const DEFAULT_DAYS = 4;

type CartState = {
  items: CartItem[];
  startDate: string | null;
  endDate: string | null;
  exhibitionName: string | null;
};

const emptyCart: CartState = { items: [], startDate: null, endDate: null, exhibitionName: null };

const sameLine = (item: CartItem, productId: string, packageId?: string) =>
  item.productId === productId && item.packageId === packageId;

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>(() => ({ ...emptyCart, ...readStorage(STORAGE_KEY, emptyCart) }));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => writeStorage(STORAGE_KEY, cart), [cart]);

  const hasDates = Boolean(cart.startDate && cart.endDate);
  const days = hasDates ? daysBetween(cart.startDate!, cart.endDate!) : DEFAULT_DAYS;

  const lines: CartLine[] = cart.items.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return [];
    const rental = rentalPrice(product, days, item.quantity);
    const discountPercent = packages.find((pack) => pack.id === item.packageId)?.discountPercent ?? 0;
    return [
      {
        ...item,
        key: `${item.productId}-${item.packageId ?? ""}`,
        product,
        rental,
        discountPercent,
        total: Math.round(rental.price * (1 - discountPercent / 100)),
      },
    ];
  });

  const addItem = (productId: string, quantity = 1, packageId?: string) =>
    setCart((current) => {
      const existing = current.items.find((item) => sameLine(item, productId, packageId));
      const items = existing
        ? current.items.map((item) => (item === existing ? { ...item, quantity: item.quantity + quantity } : item))
        : [...current.items, { productId, quantity, packageId }];
      return { ...current, items };
    });

  const setQuantity = (productId: string, quantity: number, packageId?: string) =>
    setCart((current) => ({
      ...current,
      items:
        quantity > 0
          ? current.items.map((item) => (sameLine(item, productId, packageId) ? { ...item, quantity } : item))
          : current.items.filter((item) => !sameLine(item, productId, packageId)),
    }));

  const value: CartValue = {
    items: cart.items,
    lines,
    startDate: cart.startDate,
    endDate: cart.endDate,
    exhibitionName: cart.exhibitionName,
    days,
    hasDates,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: lines.reduce((sum, line) => sum + line.total, 0),
    saving: lines.reduce((sum, line) => sum + line.rental.dailyOnlyPrice - line.total, 0),
    isDrawerOpen,
    openDrawer: () => setIsDrawerOpen(true),
    closeDrawer: () => setIsDrawerOpen(false),
    addItem,
    addPackage: (packageId) =>
      packages
        .find((pack) => pack.id === packageId)
        ?.items.forEach((item) => addItem(item.productId, item.quantity, packageId)),
    setQuantity,
    removeItem: (productId, packageId) => setQuantity(productId, 0, packageId),
    setDates: (startDate, endDate) => setCart((current) => ({ ...current, startDate, endDate })),
    setExhibition: (exhibitionName, startDate, endDate) =>
      setCart((current) => ({ ...current, exhibitionName, startDate, endDate })),
    clearExhibition: () => setCart((current) => ({ ...current, exhibitionName: null })),
    clear: () => setCart(emptyCart),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
