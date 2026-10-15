import { useEffect, useState, type ReactNode } from "react";
import { CompareContext, MAX_COMPARE } from "../hooks/useCompare";
import { readStorage, writeStorage } from "../utils/storage";

const STORAGE_KEY = "novinsaz-compare";

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => readStorage(STORAGE_KEY, []));

  useEffect(() => writeStorage(STORAGE_KEY, ids), [ids]);

  const remove = (productId: string) => setIds((current) => current.filter((id) => id !== productId));

  const value = {
    ids,
    isFull: ids.length >= MAX_COMPARE,
    isCompared: (productId: string) => ids.includes(productId),
    toggle: (productId: string) =>
      setIds((current) => {
        if (current.includes(productId)) return current.filter((id) => id !== productId);
        return current.length >= MAX_COMPARE ? current : [...current, productId];
      }),
    remove,
    clear: () => setIds([]),
  };

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}
