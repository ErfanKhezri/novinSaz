type CategoryFilterProps = {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
};

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  const options = ["همه", ...categories];

  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="دسته‌بندی">
      {options.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={`shrink-0 rounded-full border px-4 py-2 text-small font-medium transition-colors ${
              isActive
                ? "border-navy-900 bg-navy-900 text-paper"
                : "border-line bg-paper text-ink hover:border-navy-900"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
