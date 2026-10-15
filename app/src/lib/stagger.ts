import type { CSSProperties } from "react";

/** Entrance order within a section; each step delays the reveal by 80ms. */
export function stagger(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
}
