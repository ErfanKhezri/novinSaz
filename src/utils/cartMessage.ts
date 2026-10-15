import type { CartValue } from "../hooks/useCart";
import { site } from "../data/site";
import { formatNumber, formatPrice } from "./formatPrice";
import { formatJalali } from "./jalali";
import { breakdownLabel } from "./rentalPrice";

/** A clean Persian WhatsApp message with items, quantities, dates and total. */
export function buildCartMessage(cart: CartValue) {
  const lines = [`سلام ${site.name}،`, "درخواست اجاره دارم:", ""];

  if (cart.exhibitionName) lines.push(`نمایشگاه: ${cart.exhibitionName}`);
  if (cart.hasDates) {
    lines.push(
      `از ${formatJalali(cart.startDate!)} تا ${formatJalali(cart.endDate!)} (${formatNumber(cart.days)} روز)`,
    );
  } else {
    lines.push(`مدت تقریبی: ${formatNumber(cart.days)} روز (تاریخ دقیق را اعلام می‌کنم)`);
  }
  lines.push("");

  cart.lines.forEach((line, index) => {
    lines.push(`${formatNumber(index + 1)}. ${line.product.name} × ${formatNumber(line.quantity)}`);
    lines.push(`   ${breakdownLabel(line.rental)} — ${formatPrice(line.total)}`);
  });

  lines.push("", `جمع کل: ${formatPrice(cart.total)}`);
  if (cart.saving > 0) lines.push(`صرفه‌جویی: ${formatPrice(cart.saving)}`);
  lines.push("", "لطفاً موجودی و پیش‌فاکتور نهایی را اعلام کنید.");

  return lines.join("\n");
}
