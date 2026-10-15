import { boothPresets } from "../../utils/planner";
import { formatNumber } from "../../utils/formatPrice";

type BoothSizePickerProps = {
  widthM: number;
  depthM: number;
  onChange: (widthM: number, depthM: number) => void;
};

const toMeters = (value: string) => Math.min(20, Math.max(1, Number(value) || 1));

export function BoothSizePicker({ widthM, depthM, onChange }: BoothSizePickerProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="mb-2 text-small font-bold text-navy-900">اندازه غرفه (متر)</legend>
      <div className="flex flex-wrap gap-2">
        {boothPresets.map((preset) => {
          const active = preset.widthM === widthM && preset.depthM === depthM;
          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => onChange(preset.widthM, preset.depthM)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-small font-bold transition-colors ${
                active ? "border-navy-900 bg-navy-900 text-paper" : "border-line bg-paper text-navy-900 hover:border-navy-900"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col gap-1 text-caption text-muted">
          عرض (جبهه غرفه)
          <input
            type="number"
            min={1}
            max={20}
            step={0.5}
            value={widthM}
            onChange={(event) => onChange(toMeters(event.target.value), depthM)}
            className="h-10 rounded border border-line bg-paper px-3 text-body text-ink focus:border-navy-900 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-caption text-muted">
          عمق
          <input
            type="number"
            min={1}
            max={20}
            step={0.5}
            value={depthM}
            onChange={(event) => onChange(widthM, toMeters(event.target.value))}
            className="h-10 rounded border border-line bg-paper px-3 text-body text-ink focus:border-navy-900 focus:outline-none"
          />
        </label>
      </div>
      <p className="text-caption text-muted">
        مساحت: {formatNumber(widthM * depthM)} متر مربع · هر خانه شبکه ۵۰ سانتی‌متر
      </p>
    </fieldset>
  );
}
