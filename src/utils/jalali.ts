import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import persian_fa from "react-date-object/locales/persian_fa";

/** Jalali dates are stored as "YYYY/MM/DD" strings with Latin digits, e.g. "1405/08/10". */
export const JALALI_FORMAT = "YYYY/MM/DD";

const DAY_SECONDS = 24 * 60 * 60;

export function parseJalali(date: string) {
  return new DateObject({ date, format: JALALI_FORMAT, calendar: persian });
}

export function todayJalali() {
  return new DateObject({ calendar: persian, locale: persian_en }).format(JALALI_FORMAT);
}

/** Picker dates come with Persian digits; store them with Latin digits so they parse back reliably. */
export function toJalaliString(date: DateObject) {
  return new DateObject(date).convert(persian, persian_en).format(JALALI_FORMAT);
}

/** "۱۰ آبان ۱۴۰۵" */
export function formatJalali(date: string, pattern = "D MMMM YYYY") {
  return parseJalali(date).set({ locale: persian_fa }).format(pattern);
}

/** Days from start to end, both included: 10 to 13 Aban is 4 days. */
export function daysBetween(start: string, end: string) {
  return Math.round((parseJalali(end).toUnix() - parseJalali(start).toUnix()) / DAY_SECONDS) + 1;
}

/** Days from today until the date (0 = today, negative = past). */
export function daysUntil(date: string) {
  return Math.round((parseJalali(date).toUnix() - parseJalali(todayJalali()).toUnix()) / DAY_SECONDS);
}

export { persian, persian_fa };
