import { MAX_COMPARE, useCompare } from "../../hooks/useCompare";
import { formatNumber } from "../../utils/formatPrice";

type CompareToggleProps = { productId: string; productName: string };

export function CompareToggle({ productId, productName }: CompareToggleProps) {
  const { isCompared, isFull, toggle } = useCompare();
  const checked = isCompared(productId);
  const disabled = !checked && isFull;

  return (
    <label
      className={`inline-flex min-h-10 cursor-pointer items-center gap-2 text-small ${disabled ? "cursor-not-allowed text-muted" : "text-navy-900"}`}
      title={disabled ? `حداکثر ${formatNumber(MAX_COMPARE)} محصول قابل مقایسه است` : undefined}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={() => toggle(productId)}
        aria-label={`مقایسه ${productName}`}
        className="h-4 w-4 accent-navy-900"
      />
      مقایسه
    </label>
  );
}
