import DatePicker, { type DateObject } from "react-multi-date-picker";
import { persian, persian_fa, toJalaliString, todayJalali } from "../../utils/jalali";

type JalaliDatePickerProps = {
  startDate: string | null;
  endDate: string | null;
  onChange: (startDate: string | null, endDate: string | null) => void;
};

/** Jalali range picker: the first tap sets the start date, the second the end date. */
export function JalaliDatePicker({ startDate, endDate, onChange }: JalaliDatePickerProps) {
  const value = [startDate, endDate].filter((date): date is string => Boolean(date));

  const handleChange = (dates: DateObject[] | null) => {
    const [start, end] = dates ?? [];
    onChange(start ? toJalaliString(start) : null, end ? toJalaliString(end) : null);
  };

  return (
    <label className="flex flex-col gap-2">
      <span className="text-small font-medium text-navy-900">تاریخ شروع و پایان اجاره</span>
      <DatePicker
        range
        rangeHover
        value={value}
        format="YYYY/MM/DD"
        onChange={handleChange}
        calendar={persian}
        locale={persian_fa}
        minDate={todayJalali()}
        calendarPosition="bottom-right"
        placeholder="انتخاب تاریخ"
        dateSeparator=" تا "
        containerClassName="w-full"
        inputClass="h-12 w-full rounded border border-line bg-paper px-4 text-body text-ink focus:border-navy-900 focus:outline-none"
      />
    </label>
  );
}
