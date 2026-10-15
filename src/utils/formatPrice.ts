const formatter = new Intl.NumberFormat("fa-IR");

export function formatNumber(value: number) {
  return formatter.format(value);
}

export function formatPrice(value: number) {
  return `${formatter.format(value)} تومان`;
}
