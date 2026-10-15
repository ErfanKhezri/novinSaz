import { useEffect, useState, type ReactNode } from "react";
import { FavoritesContext } from "../hooks/useFavorites";
import { readStorage, writeStorage } from "../utils/storage";

const STORAGE_KEY = "novinsaz-favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => readStorage(STORAGE_KEY, []));

  useEffect(() => writeStorage(STORAGE_KEY, ids), [ids]);

  const value = {
    ids,
    isFavorite: (productId: string) => ids.includes(productId),
    toggle: (productId: string) =>
      setIds((current) => (current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId])),
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
