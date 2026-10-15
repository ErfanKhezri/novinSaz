import { useNavigate } from "react-router-dom";
import type { Exhibition } from "../../data/exhibitions";
import { useCart } from "../../hooks/useCart";
import { countdownLabel } from "../../utils/exhibitions";
import { formatNumber } from "../../utils/formatPrice";
import { daysBetween, formatJalali } from "../../utils/jalali";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { GlassPanel } from "../ui/GlassPanel";

type ExhibitionCardProps = { exhibition: Exhibition; compact?: boolean };

export function ExhibitionCard({ exhibition, compact = false }: ExhibitionCardProps) {
  const { setExhibition, count } = useCart();
  const navigate = useNavigate();

  const equipBooth = () => {
    setExhibition(exhibition.name, exhibition.startDate, exhibition.endDate);
    navigate(count > 0 ? "/cart" : "/packages");
  };

  return (
    <GlassPanel variant="strong" whileHover={{ y: -4 }} className="flex h-full flex-col overflow-hidden p-2">
      {!compact && (
        <div className="relative overflow-hidden rounded">
          <img src={exhibition.image} alt="" loading="lazy" width={1200} height={700} className="aspect-[12/7] w-full bg-navy-50 object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-navy-900 px-3 py-0.5 text-caption font-bold text-gold-500">
            {countdownLabel(exhibition.startDate)}
          </span>
          <Badge>{exhibition.category}</Badge>
        </div>
        <h3 className="text-h3 font-extrabold text-navy-900">{exhibition.name}</h3>
        <dl className="space-y-1 text-small">
          <div className="flex gap-2">
            <dt className="text-muted">محل:</dt>
            <dd>
              {exhibition.venue}، {exhibition.city}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted">تاریخ:</dt>
            <dd>
              {formatJalali(exhibition.startDate, "D MMMM")} تا {formatJalali(exhibition.endDate)} (
              {formatNumber(daysBetween(exhibition.startDate, exhibition.endDate))} روز)
            </dd>
          </div>
        </dl>
        <Button variant={compact ? "outline" : "primary"} onClick={equipBooth} className="mt-auto min-h-10 text-small">
          تجهیز غرفه برای این نمایشگاه
        </Button>
      </div>
    </GlassPanel>
  );
}
