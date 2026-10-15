import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useRentalList } from "../../hooks/useRentalList";
import { Button } from "../ui/Button";

type AddToListButtonProps = {
  slug: string;
  quantity?: number;
  variant?: "primary" | "accent" | "outline";
  className?: string;
};

export function AddToListButton({ slug, quantity = 1, variant = "primary", className = "" }: AddToListButtonProps) {
  const { add } = useRentalList();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    add(slug, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Button variant={variant} onClick={handleClick} className={`overflow-hidden ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={added ? "added" : "add"}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {added ? "به لیست اضافه شد" : "افزودن به لیست اجاره"}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
