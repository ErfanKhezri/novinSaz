import { formatPrice } from "../../utils/formatPrice";
import { Badge } from "../ui/Badge";

type PriceTableProps = {
  pricePerDay: number;
  pricePer4Days: number;
};

export function PriceTable({ pricePerDay, pricePer4Days }: PriceTableProps) {
  const saving = pricePerDay * 4 - pricePer4Days;

  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <table className="w-full text-start">
        <thead className="bg-canvas text-small text-muted">
          <tr>
            <th scope="col" className="px-4 py-3 text-start font-medium">مدت اجاره</th>
            <th scope="col" className="px-4 py-3 text-end font-medium">قیمت</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-line">
            <th scope="row" className="px-4 py-4 text-start font-medium">یک روز</th>
            <td className="px-4 py-4 text-end font-bold text-navy-900">{formatPrice(pricePerDay)}</td>
          </tr>
          <tr className="border-t border-line bg-gold-50">
            <th scope="row" className="px-4 py-4 text-start font-medium">
              <span className="flex flex-wrap items-center gap-2">
                بسته چهار روزه
                <Badge tone="gold">پیشنهاد ویژه</Badge>
              </span>
            </th>
            <td className="px-4 py-4 text-end font-bold text-navy-900">{formatPrice(pricePer4Days)}</td>
          </tr>
        </tbody>
      </table>
      <p className="flex items-center justify-between gap-2 border-t border-line bg-success-50 px-4 py-3 text-small text-success-700">
        <span>صرفه‌جویی بسته چهار روزه نسبت به چهار روز جداگانه</span>
        <span className="font-bold">{formatPrice(saving)}</span>
      </p>
    </div>
  );
}
