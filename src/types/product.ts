export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  specs: { label: string; value: string }[];
  pricePerDay: number;
  pricePer4Days: number;
  image: string;
  /** Footprint seen from above, used by the booth planner. */
  widthCm: number;
  depthCm: number;
};
