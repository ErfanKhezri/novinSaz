import type { BoothPackage, FaqItem } from "./types";

/*
 * Business details. Phone numbers, address and email are placeholders
 * until the business provides the real ones.
 */
export const site = {
  name: "نوین ساز",
  tagline: "اجاره مبلمان غرفه نمایشگاه",
  city: "تهران",
  address: "تهران، بزرگراه چمران، نزدیک نمایشگاه بین‌المللی",
  phone: "۰۲۱-۰۰۰۰۰۰۰۰",
  phoneHref: "tel:+982100000000",
  mobile: "۰۹۱۲-۰۰۰-۰۰۰۰",
  /** International format without "+" for wa.me links. */
  whatsapp: "989120000000",
  email: "info@novinsaz.ir",
  hours: "شنبه تا پنج‌شنبه، ۸ صبح تا ۸ شب",
  hoursDuringFair: "در روزهای نمایشگاه، از ۷ صبح تا پایان برچیدن غرفه",
};

export const navLinks = [
  { to: "/products", label: "کالاها" },
  { to: "/about", label: "درباره ما" },
  { to: "/contact", label: "تماس" },
] as const;

/** The rental, as it happens: printed on the itinerary slip. */
export const rentalSteps: { when: string; rows: { what: string; time: string }[] }[] = [
  {
    when: "یک هفته پیش از نمایشگاه",
    rows: [
      { what: "انتخاب کالا و ثبت برگه سفارش", time: "۱۰ دقیقه" },
      { what: "تأیید موجودی و پیش‌فاکتور", time: "همان روز" },
    ],
  },
  {
    when: "روز چیدمان",
    rows: [
      { what: "تحویل در سالن و چیدمان در غرفه", time: "صبح زود" },
      { what: "نصب لوگو روی کانتر", time: "۱ ساعت" },
    ],
  },
  {
    when: "روزهای نمایشگاه",
    rows: [
      { what: "پشتیبانی تلفنی و جایگزینی کالا", time: "همه روزه" },
    ],
  },
  {
    when: "روز برچیدن",
    rows: [{ what: "جمع‌آوری از غرفه", time: "بعد از ساعت پایانی" }],
  },
];

export const boothPackages: BoothPackage[] = [
  {
    name: "غرفه کوچک",
    size: "۹ متر مربع",
    contents: ["۱ کانتر پذیرش", "۲ صندلی جکدار", "۱ پاراوان", "۱ استند بروشور"],
    price: { day: 1_300_000, fourDays: 3_900_000 },
  },
  {
    name: "غرفه مذاکره",
    size: "۱۸ متر مربع",
    contents: [
      "۱ کانتر پذیرش",
      "۲ صندلی جکدار",
      "۱ میز شیشه‌ای گرد",
      "۴ صندلی ایفلی",
      "۱ پاراوان",
    ],
    price: { day: 2_100_000, fourDays: 6_300_000 },
  },
  {
    name: "غرفه پذیرایی",
    size: "۲۴ متر مربع",
    contents: [
      "۱ کانتر پذیرش",
      "۱ مبل نیم‌ست",
      "۱ میز عسلی",
      "۱ تلویزیون ۵۵ اینچ",
      "۱ پاراوان",
    ],
    price: { day: 3_600_000, fourDays: 10_800_000 },
  },
  {
    name: "اتاق همایش",
    size: "۵۰ صندلی",
    contents: ["۵۰ صندلی تاشو", "۱ تلویزیون ۵۵ اینچ", "۱ میز بار ایستاده"],
    price: { day: 4_200_000, fourDays: 12_600_000 },
  },
];

export const faqs: FaqItem[] = [
  {
    question: "اجاره چهار روزه چه فرقی با روزانه دارد؟",
    answer:
      "بیشتر نمایشگاه‌های تهران چهار روز برگزار می‌شوند. بسته چهار روزه به قیمت سه روز حساب می‌شود؛ یعنی روز چهارم رایگان است. برای مدت‌های دیگر، ترکیب ارزان‌تر به‌طور خودکار در برگه سفارش محاسبه می‌شود.",
  },
  {
    question: "هزینه حمل و چیدمان جداست؟",
    answer:
      "برای سالن‌های نمایشگاه بین‌المللی تهران، تحویل، چیدمان و جمع‌آوری در قیمت اجاره است. برای نمایشگاه‌ها و دفترهای دیگر شهر، هزینه حمل پیش از تأیید سفارش اعلام می‌شود.",
  },
  {
    question: "چقدر زودتر باید سفارش بدهم؟",
    answer:
      "یک هفته پیش از نمایشگاه بهترین زمان است. در فصل نمایشگاه‌ها کانتر و مبل نیم‌ست زود تمام می‌شوند؛ هرچه زودتر برگه سفارش را بفرستید، انتخاب بیشتری دارید.",
  },
  {
    question: "ودیعه یا ضمانت لازم است؟",
    answer:
      "برای شرکت‌ها، معرفی‌نامه کافی است. برای اشخاص، یک چک ضمانت هنگام تحویل گرفته و هنگام جمع‌آوری برگردانده می‌شود.",
  },
  {
    question: "اگر کالایی در غرفه آسیب ببیند چه می‌شود؟",
    answer:
      "خط و لک‌های عادی استفاده به عهده ماست. شکستگی شیشه یا پارگی رویه بر اساس هزینه تعمیر محاسبه می‌شود و پیش از تحویل در قرارداد نوشته شده است.",
  },
  {
    question: "برای دفتر یا اتاق جلسه هم اجاره می‌دهید؟",
    answer:
      "بله. برای رویدادهای شرکتی، همایش و اتاق نمایش محصول هم همین کالاها با همین قیمت‌ها اجاره داده می‌شوند.",
  },
];

/*
 * Atmosphere photographs (Unsplash licence, served by picsum.photos).
 * They show the world around the business, never the rented goods themselves,
 * and are meant to be replaced by the business's own photographs of booths.
 */
export const photos = {
  hall: {
    src: "https://picsum.photos/id/1033/2400/1500",
    alt: "سالن تاریک با پله‌برقی‌ها و دیوارهای شیشه‌ای",
    credit: "Erez Attias",
  },
  roof: {
    src: "https://picsum.photos/id/618/1200/1600",
    alt: "سقف شیشه‌ای و فلزی یک سالن بزرگ",
    credit: "Mika Ruusunen",
  },
  chairs: {
    src: "https://picsum.photos/id/625/1200/1200",
    alt: "میز چوبی و صندلی‌های سفید کنار پنجره‌های بزرگ",
    credit: "Breather",
  },
  crowd: {
    src: "https://picsum.photos/id/192/1200/1500",
    alt: "آدم‌ها پشت میزها جلوی پنجره‌های روشن",
    credit: "Adam Przewoski",
  },
  atrium: {
    src: "https://picsum.photos/id/949/1200/1200",
    alt: "آتریوم سفید با گنبد شیشه‌ای از نمای پایین",
    credit: "Drew Patrick Miller",
  },
  bench: {
    src: "https://picsum.photos/id/834/1200/1500",
    alt: "سه قاب روی دیوار روشن بالای یک نیمکت تیره",
    credit: "The Anchor",
  },
} as const;
