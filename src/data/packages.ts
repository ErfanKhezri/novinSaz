export type BoothPackage = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  boothSize: string;
  items: { productId: string; quantity: number }[];
  discountPercent: number;
};

export const packages: BoothPackage[] = [
  {
    id: "p1",
    slug: "basic-9m-booth",
    name: "غرفه ۹ متری پایه",
    description:
      "هر آنچه یک غرفه کوچک برای روز اول لازم دارد: کانتر پذیرش برای معرفی برند، دو صندلی جکدار برای پشت کانتر و پاراوان برای ساختن انبارک پشت غرفه.",
    image: "/images/packages/basic-9m-booth.svg",
    boothSize: "۳ × ۳ متر",
    items: [
      { productId: "2", quantity: 1 },
      { productId: "1", quantity: 2 },
      { productId: "8", quantity: 1 },
    ],
    discountPercent: 10,
  },
  {
    id: "p2",
    slug: "luxury-18m-booth",
    name: "غرفه ۱۸ متری لوکس",
    description:
      "غرفه‌ای با فضای پذیرایی: کانتر و صندلی جکدار برای جلوی غرفه، مبل نیم‌ست و میز عسلی برای گفت‌وگوی آرام با مشتری و تلویزیون برای پخش ویدئوی معرفی.",
    image: "/images/packages/luxury-18m-booth.svg",
    boothSize: "۳ × ۶ متر",
    items: [
      { productId: "2", quantity: 1 },
      { productId: "1", quantity: 2 },
      { productId: "3", quantity: 1 },
      { productId: "5", quantity: 1 },
      { productId: "4", quantity: 1 },
      { productId: "8", quantity: 2 },
    ],
    discountPercent: 15,
  },
  {
    id: "p3",
    slug: "meeting-room-8",
    name: "اتاق جلسه ۸ نفره",
    description:
      "دو میز شیشه‌ای گرد با هشت صندلی ایفلی برای جلسه یا مذاکره همزمان و یک تلویزیون برای ارائه. مناسب اتاق جلسه موقت در دفتر یا سالن همایش.",
    image: "/images/packages/meeting-room-8.svg",
    boothSize: "حدود ۲۰ متر مربع",
    items: [
      { productId: "6", quantity: 2 },
      { productId: "7", quantity: 8 },
      { productId: "4", quantity: 1 },
    ],
    discountPercent: 12,
  },
  {
    id: "p4",
    slug: "reception-and-waiting",
    name: "میز پذیرش و انتظار",
    description:
      "برای لابی شرکت، شوروم یا ورودی همایش: کانتر پذیرش با یک صندلی جکدار، و گوشه انتظار با مبل نیم‌ست و میز عسلی.",
    image: "/images/packages/reception-and-waiting.svg",
    boothSize: "حدود ۱۲ متر مربع",
    items: [
      { productId: "2", quantity: 1 },
      { productId: "1", quantity: 1 },
      { productId: "3", quantity: 1 },
      { productId: "5", quantity: 1 },
    ],
    discountPercent: 10,
  },
];
