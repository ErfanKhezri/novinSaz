import { createContext, useContext } from "react";

export type FavoritesValue = {
  ids: string[];
  isFavorite: (productId: string) => boolean;
  toggle: (productId: string) => void;
};

export const FavoritesContext = createContext<FavoritesValue | null>(null);

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
}
