import { exhibitions } from "../data/exhibitions";
import { daysUntil, parseJalali } from "./jalali";
import { formatNumber } from "./formatPrice";

/** Exhibitions that have not ended yet, soonest first. */
export function upcomingExhibitions() {
  return exhibitions
    .filter((exhibition) => daysUntil(exhibition.endDate) >= 0)
    .sort((a, b) => parseJalali(a.startDate).toUnix() - parseJalali(b.startDate).toUnix());
}

/** "۱۲ روز مانده" / "امروز آغاز می‌شود" / "در حال برگزاری" */
export function countdownLabel(startDate: string) {
  const days = daysUntil(startDate);
  if (days > 0) return `${formatNumber(days)} روز مانده`;
  if (days === 0) return "امروز آغاز می‌شود";
  return "در حال برگزاری";
}
