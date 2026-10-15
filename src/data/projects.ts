export type Project = {
  id: string;
  title: string;
  exhibitionName: string;
  year: string;
  images: string[];
  items: { productId: string; quantity: number }[];
};

const images = (id: string, count: number) =>
  Array.from({ length: count }, (_, index) => `/images/projects/${id}-${index + 1}.svg`);

/** Sample projects; replace with real booth photos and item lists. */
export const projects: Project[] = [
  {
    id: "pr1",
    title: "غرفه پذیرایی شرکت ساختمانی",
    exhibitionName: "نمایشگاه صنعت ساختمان",
    year: "۱۴۰۴",
    images: images("pr1", 3),
    items: [
      { productId: "2", quantity: 1 },
      { productId: "1", quantity: 2 },
      { productId: "3", quantity: 1 },
      { productId: "5", quantity: 1 },
    ],
  },
  {
    id: "pr2",
    title: "غرفه مذاکره برند لوازم خانگی",
    exhibitionName: "نمایشگاه لوازم خانگی",
    year: "۱۴۰۴",
    images: images("pr2", 2),
    items: [
      { productId: "6", quantity: 2 },
      { productId: "7", quantity: 8 },
      { productId: "4", quantity: 1 },
    ],
  },
  {
    id: "pr3",
    title: "سالن همایش ۱۲۰ نفره",
    exhibitionName: "همایش سالانه بیمه",
    year: "۱۴۰۴",
    images: images("pr3", 2),
    items: [
      { productId: "9", quantity: 120 },
      { productId: "4", quantity: 2 },
      { productId: "2", quantity: 1 },
    ],
  },
  {
    id: "pr4",
    title: "غرفه ۹ متری استارتاپ",
    exhibitionName: "نمایشگاه فناوری اطلاعات",
    year: "۱۴۰۵",
    images: images("pr4", 2),
    items: [
      { productId: "2", quantity: 1 },
      { productId: "1", quantity: 2 },
      { productId: "4", quantity: 1 },
      { productId: "8", quantity: 1 },
    ],
  },
  {
    id: "pr5",
    title: "شوروم موقت مبلمان اداری",
    exhibitionName: "رونمایی محصول در شوروم",
    year: "۱۴۰۵",
    images: images("pr5", 3),
    items: [
      { productId: "3", quantity: 2 },
      { productId: "5", quantity: 2 },
      { productId: "8", quantity: 3 },
    ],
  },
  {
    id: "pr6",
    title: "میز پذیرش و انتظار کنگره پزشکی",
    exhibitionName: "کنگره پزشکی",
    year: "۱۴۰۵",
    images: images("pr6", 2),
    items: [
      { productId: "2", quantity: 2 },
      { productId: "1", quantity: 2 },
      { productId: "7", quantity: 6 },
    ],
  },
];
