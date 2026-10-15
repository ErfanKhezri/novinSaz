import type { Product } from "../types/product";

export const categories = ["صندلی", "میز", "مبلمان", "تجهیزات صوتی‌تصویری", "پاراوان"];

const image = (label: string) => `https://placehold.co/800x600/EEF1F7/14213D?text=${label}`;

export const products: Product[] = [
  {
    id: "1",
    slug: "bar-stool",
    name: "صندلی جکدار",
    category: "صندلی",
    description:
      "صندلی بلند با جک گازی و پایه کروم، مناسب پشت کانتر پذیرش و میزهای بار. ارتفاع نشیمن قابل تنظیم است و رویه چرم مصنوعی آن پس از هر اجاره تمیز و بازبینی می‌شود.",
    specs: [
      { label: "ارتفاع نشیمن", value: "۶۰ تا ۸۰ سانتی‌متر" },
      { label: "جنس رویه", value: "چرم مصنوعی" },
      { label: "پایه", value: "کروم با زیرپایی" },
      { label: "رنگ", value: "مشکی، سفید" },
    ],
    pricePerDay: 180000,
    pricePer4Days: 540000,
    image: image("Bar+Stool"),
    widthCm: 45,
    depthCm: 45,
  },
  {
    id: "2",
    slug: "counter",
    name: "کانتر",
    category: "میز",
    description:
      "پیشخوان پذیرش جلوی غرفه با سطح جلویی آماده برای نصب لوگو و استیکر. پشت کانتر قفسه و کشوی قفل‌دار برای بروشور و وسایل شخصی دارد.",
    specs: [
      { label: "ابعاد", value: "۱۲۰ × ۵۰ × ۱۰۵ سانتی‌متر" },
      { label: "جنس", value: "ام‌دی‌اف با روکش سفید" },
      { label: "فضای داخلی", value: "قفسه و کشوی قفل‌دار" },
      { label: "سطح لوگو", value: "۱۱۰ × ۶۵ سانتی‌متر" },
    ],
    pricePerDay: 650000,
    pricePer4Days: 1950000,
    image: image("Counter"),
    widthCm: 120,
    depthCm: 50,
    model: "/models/counter.glb",
  },
  {
    id: "3",
    slug: "half-set-sofa",
    name: "مبل نیم‌ست",
    category: "مبلمان",
    description:
      "یک مبل دونفره و دو مبل تک‌نفره برای گوشه پذیرایی غرفه یا اتاق جلسه. فضایی آرام برای گفت‌وگو با مشتری می‌سازد و با میز عسلی ترکیب خوبی دارد.",
    specs: [
      { label: "اجزا", value: "۱ دونفره و ۲ تک‌نفره" },
      { label: "ابعاد دونفره", value: "۱۴۰ × ۷۵ × ۷۸ سانتی‌متر" },
      { label: "رویه", value: "چرم مصنوعی" },
      { label: "رنگ", value: "مشکی، کرم، طوسی" },
    ],
    pricePerDay: 900000,
    pricePer4Days: 2700000,
    image: image("Sofa+Set"),
    widthCm: 220,
    depthCm: 160,
  },
  {
    id: "4",
    slug: "tv-55",
    name: "تلویزیون ۵۵ اینچ",
    category: "تجهیزات صوتی‌تصویری",
    description:
      "تلویزیون ۵۵ اینچ با پایه ایستاده برای پخش ویدئوی معرفی شرکت و اسلایدهای محصول. فایل خود را با فلش اجرا کنید یا لپ‌تاپ را با کابل اچ‌دی‌ام‌آی وصل کنید.",
    specs: [
      { label: "اندازه", value: "۵۵ اینچ، فول اچ‌دی" },
      { label: "پایه", value: "ایستاده، ارتفاع ۱۵۰ سانتی‌متر" },
      { label: "ورودی‌ها", value: "اچ‌دی‌ام‌آی و یو‌اس‌بی" },
      { label: "همراه", value: "کنترل و کابل برق" },
    ],
    pricePerDay: 1200000,
    pricePer4Days: 3600000,
    image: image("TV+55"),
    widthCm: 125,
    depthCm: 50,
    model: "/models/tv.glb",
  },
  {
    id: "5",
    slug: "side-table",
    name: "میز عسلی",
    category: "میز",
    description:
      "میز کوچک کنار مبل برای فنجان، کاتالوگ و کارت ویزیت. رویه طرح چوب و پایه فلزی مشکی دارد و در غرفه‌های کوچک به‌راحتی جا می‌شود.",
    specs: [
      { label: "ابعاد", value: "۵۰ × ۵۰ × ۵۵ سانتی‌متر" },
      { label: "رویه", value: "ام‌دی‌اف طرح چوب" },
      { label: "پایه", value: "فلز مشکی" },
    ],
    pricePerDay: 150000,
    pricePer4Days: 450000,
    image: image("Side+Table"),
    widthCm: 50,
    depthCm: 50,
  },
  {
    id: "6",
    slug: "round-glass-table",
    name: "میز شیشه‌ای گرد",
    category: "میز",
    description:
      "میز گرد با شیشه سکوریت و پایه کروم برای مذاکره چهار نفره. سبک و روشن است و جای زیادی از غرفه نمی‌گیرد؛ همراه صندلی ایفلی پیشنهاد می‌شود.",
    specs: [
      { label: "قطر", value: "۸۰ سانتی‌متر" },
      { label: "ارتفاع", value: "۷۵ سانتی‌متر" },
      { label: "شیشه", value: "سکوریت ۱۰ میلی‌متر" },
      { label: "پایه", value: "کروم" },
    ],
    pricePerDay: 250000,
    pricePer4Days: 750000,
    image: image("Glass+Table"),
    widthCm: 80,
    depthCm: 80,
  },
  {
    id: "7",
    slug: "eames-chair",
    name: "صندلی ایفلی",
    category: "صندلی",
    description:
      "صندلی با نشیمن پلاستیک فشرده و پایه چوب راش، مناسب میز مذاکره و فضای انتظار. سبک است و جابه‌جایی آن در غرفه آسان است.",
    specs: [
      { label: "ابعاد", value: "۴۶ × ۵۵ × ۸۲ سانتی‌متر" },
      { label: "جنس نشیمن", value: "پلاستیک فشرده" },
      { label: "پایه", value: "چوب راش و اتصال فلزی" },
      { label: "رنگ", value: "سفید، مشکی، طوسی" },
    ],
    pricePerDay: 120000,
    pricePer4Days: 360000,
    image: image("Eames+Chair"),
    widthCm: 46,
    depthCm: 55,
  },
  {
    id: "8",
    slug: "partition",
    name: "پاراوان",
    category: "پاراوان",
    description:
      "جداکننده سه‌لت با قاب فلزی و پارچه کرپ برای ساختن انبارک پشت غرفه یا جدا کردن فضای جلسه. به هر زاویه‌ای باز می‌شود و سریع نصب می‌شود.",
    specs: [
      { label: "ابعاد باز", value: "۱۵۰ × ۱۸۰ سانتی‌متر" },
      { label: "تعداد لت", value: "۳ لت" },
      { label: "جنس", value: "قاب فلزی و پارچه کرپ" },
      { label: "رنگ", value: "سفید، طوسی" },
    ],
    pricePerDay: 220000,
    pricePer4Days: 660000,
    image: image("Partition"),
    widthCm: 150,
    depthCm: 40,
  },
  {
    id: "9",
    slug: "folding-chair",
    name: "صندلی تاشو",
    category: "صندلی",
    description:
      "صندلی فلزی تاشو با نشیمن تشک‌دار برای سمینار، کارگاه آموزشی و سالن همایش. اقتصادی‌ترین انتخاب برای تعداد بالا است و در کمترین فضا جمع می‌شود.",
    specs: [
      { label: "ابعاد باز", value: "۴۴ × ۴۸ × ۸۰ سانتی‌متر" },
      { label: "بدنه", value: "فلز با رنگ کوره‌ای" },
      { label: "نشیمن", value: "تشک‌دار با رویه پارچه" },
    ],
    pricePerDay: 60000,
    pricePer4Days: 180000,
    image: image("Folding+Chair"),
    widthCm: 44,
    depthCm: 48,
  },
];

export const featuredSlugs = ["counter", "half-set-sofa", "bar-stool", "tv-55"];
