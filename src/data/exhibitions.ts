export type Exhibition = {
  id: string;
  name: string;
  venue: string;
  city: string;
  /** Jalali "YYYY/MM/DD" */
  startDate: string;
  endDate: string;
  category: string;
  image: string;
};

const image = (label: string) => `https://placehold.co/1200x700/24365C/FFFFFF?text=${label}`;

/** Sample schedule; replace with the official calendar before launch. */
export const exhibitions: Exhibition[] = [
  {
    id: "e1",
    name: "نمایشگاه صنعت ساختمان",
    venue: "نمایشگاه بین‌المللی تهران",
    city: "تهران",
    startDate: "1405/06/10",
    endDate: "1405/06/13",
    category: "ساختمان",
    image: image("Building+Expo"),
  },
  {
    id: "e2",
    name: "نمایشگاه مبلمان و دکوراسیون اداری",
    venue: "نمایشگاه بین‌المللی تهران",
    city: "تهران",
    startDate: "1405/08/05",
    endDate: "1405/08/08",
    category: "مبلمان",
    image: image("Office+Furniture"),
  },
  {
    id: "e3",
    name: "نمایشگاه صنایع غذایی",
    venue: "نمایشگاه بین‌المللی مشهد",
    city: "مشهد",
    startDate: "1405/08/20",
    endDate: "1405/08/23",
    category: "غذایی",
    image: image("Food+Expo"),
  },
  {
    id: "e4",
    name: "نمایشگاه فناوری اطلاعات و ارتباطات",
    venue: "شهر آفتاب",
    city: "تهران",
    startDate: "1405/09/12",
    endDate: "1405/09/15",
    category: "فناوری",
    image: image("Tech+Expo"),
  },
  {
    id: "e5",
    name: "نمایشگاه گردشگری و صنایع وابسته",
    venue: "نمایشگاه بین‌المللی اصفهان",
    city: "اصفهان",
    startDate: "1405/10/02",
    endDate: "1405/10/05",
    category: "گردشگری",
    image: image("Tourism+Expo"),
  },
  {
    id: "e6",
    name: "نمایشگاه تجهیزات پزشکی",
    venue: "نمایشگاه بین‌المللی شیراز",
    city: "شیراز",
    startDate: "1405/10/20",
    endDate: "1405/10/23",
    category: "پزشکی",
    image: image("Medical+Expo"),
  },
  {
    id: "e7",
    name: "نمایشگاه کتاب استان",
    venue: "نمایشگاه بین‌المللی اصفهان",
    city: "اصفهان",
    startDate: "1405/11/14",
    endDate: "1405/11/18",
    category: "فرهنگی",
    image: image("Book+Fair"),
  },
];
