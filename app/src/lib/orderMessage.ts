import type { OrderLine } from "../hooks/useOrder";
import { site } from "../data/site";
import { formatDays, formatNumber, formatToman } from "./format";

export interface ContactDetails {
  name: string;
  phone: string;
  event: string;
  note: string;
}

/** The order and the visitor's details as a plain-text message. */
export function buildOrderMessage(
  details: ContactDetails,
  lines: OrderLine[],
  days: number,
  total: number,
): string {
  const parts = [`سلام ${site.name}،`];

  if (lines.length > 0) {
    parts.push(`درخواست اجاره برای ${formatDays(days)}:`);
    for (const line of lines) {
      parts.push(`- ${formatNumber(line.quantity)} × ${line.product.name}`);
    }
    parts.push(`جمع تخمینی: ${formatToman(total)}`);
  }

  if (details.event) parts.push(`نمایشگاه / محل: ${details.event}`);
  if (details.note) parts.push(details.note);
  parts.push(`نام: ${details.name}`, `تلفن: ${details.phone}`);

  return parts.join("\n");
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(message: string): string {
  const subject = encodeURIComponent(`درخواست اجاره - ${site.name}`);
  return `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(message)}`;
}
