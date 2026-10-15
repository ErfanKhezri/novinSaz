import { createContext, useContext } from "react";

export const MAX_COMPARE = 3;

export type CompareValue = {
  ids: string[];
  isFull: boolean;
  isCompared: (productId: string) => boolean;
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const CompareContext = createContext<CompareValue | null>(null);

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used inside CompareProvider");
  return context;
}
