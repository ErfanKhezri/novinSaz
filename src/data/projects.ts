export type Project = {
  id: string;
  title: string;
  exhibitionName: string;
  year: string;
  images: string[];
  items: { productId: string; quantity: number }[];
};

const image = (label: string, width: number, height: number) =>
  `https://placehold.co/${width}x${height}/DCE2EE/14213D?text=${label}`;

/** Sample projects; replace with real booth photos and item lists. */
export const projects: Project[] = [
  {
    id: "pr1",
    title: "غرفه پذیرایی شرکت ساختمانی",
    exhibitionName: "نمایشگاه صنعت ساختمان",
    year: "۱۴۰۴",
    images: [image("Lounge+Booth", 1200, 800), image("Lounge+Detail", 800, 1000), image("Lounge+Counter", 1200, 900)],
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
    images: [image("Meeting+Booth", 800, 1000), image("Meeting+Table", 1200, 800)],
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
    images: [image("Conference+Hall", 1200, 700), image("Conference+Stage", 1200, 900)],
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
    images: [image("Startup+Booth", 800, 1100), image("Startup+Screen", 1200, 800)],
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
    images: [image("Showroom", 1200, 800), image("Showroom+Corner", 800, 1000), image("Showroom+Sofa", 1200, 900)],
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
    images: [image("Reception", 1200, 900), image("Waiting+Area", 800, 1000)],
    items: [
      { productId: "2", quantity: 2 },
      { productId: "1", quantity: 2 },
      { productId: "7", quantity: 6 },
    ],
  },
];
