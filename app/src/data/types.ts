export type CategoryId =
  | "seating"
  | "sofas"
  | "tables"
  | "counters"
  | "display"
  | "partitions";

export interface Category {
  id: CategoryId;
  name: string;
  /** One line shown under the category name in the catalogue. */
  summary: string;
}

/** Rental prices in toman. */
export interface RentalPrice {
  /** Price for a single day. */
  day: number;
  /** Price for the four-day package (a typical exhibition run). */
  fourDays: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

/** Keys of the flat drawings in components/product/ProductArt. */
export type ArtId =
  | "bar-stool"
  | "eames-chair"
  | "folding-chair"
  | "counter"
  | "half-set-sofa"
  | "tv"
  | "side-table"
  | "round-glass-table"
  | "bar-table"
  | "partition"
  | "brochure-stand"
  | "showcase";

export interface Product {
  slug: string;
  name: string;
  category: CategoryId;
  art: ArtId;
  /** One sentence for lists and cards. */
  tagline: string;
  /** Full description paragraphs on the product page. */
  description: string[];
  specs: ProductSpec[];
  price: RentalPrice;
  /** Units available in the warehouse. */
  stock: number;
  /** Colour or finish options, if any. */
  options?: string[];
  featured?: boolean;
}

export interface BoothPackage {
  name: string;
  size: string;
  contents: string[];
  price: RentalPrice;
}

export interface FaqItem {
  question: string;
  answer: string;
}
