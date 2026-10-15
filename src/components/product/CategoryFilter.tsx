import { motion } from "motion/react";
import { spring } from "../../utils/motion";

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
            className={`relative shrink-0 rounded-full border px-4 py-2 text-small font-medium transition-colors ${
              isActive ? "border-navy-900 text-paper" : "border-white/70 bg-white/50 text-navy-900 hover:bg-white/80"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="active-category"
                className="absolute inset-0 rounded-full bg-navy-900"
                transition={spring}
                aria-hidden="true"
              />
            )}
            <span className="relative">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
