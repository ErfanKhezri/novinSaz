import type { Category } from "./types";

export const categories: Category[] = [
  {
    id: "seating",
    name: "صندلی",
    summary: "جکدار، ایفلی و تاشو؛ برای پیشخوان، میز مذاکره و سالن همایش",
  },
  {
    id: "sofas",
    name: "مبلمان",
    summary: "مبل نیم‌ست برای گوشه پذیرایی غرفه و اتاق جلسه",
  },
  {
    id: "tables",
    name: "میز",
    summary: "میز عسلی، میز شیشه‌ای گرد و میز بار ایستاده",
  },
  {
    id: "counters",
    name: "کانتر و ویترین",
    summary: "پیشخوان پذیرش با جای لوگو و ویترین شیشه‌ای نمایش محصول",
  },
  {
    id: "display",
    name: "نمایشگر",
    summary: "تلویزیون با پایه و استند بروشور",
  },
  {
    id: "partitions",
    name: "پاراوان",
    summary: "جداکننده برای انبارک پشت غرفه و فضای جلسه",
  },
];

export const categoryById = Object.fromEntries(
  categories.map((category) => [category.id, category]),
) as Record<Category["id"], Category>;
