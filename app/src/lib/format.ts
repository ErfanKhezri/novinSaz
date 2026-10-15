const numberFormat = new Intl.NumberFormat("fa-IR");

/** 1250000 → "۱٬۲۵۰٬۰۰۰" */
export function formatNumber(value: number): string {
  return numberFormat.format(value);
}

/** 1250000 → "۱٬۲۵۰٬۰۰۰ تومان" */
export function formatToman(value: number): string {
  return `${formatNumber(value)} تومان`;
}

/** 4 → "۴ روز" */
export function formatDays(days: number): string {
  return `${formatNumber(days)} روز`;
}
