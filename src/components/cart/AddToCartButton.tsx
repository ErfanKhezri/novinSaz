import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { Button } from "../ui/Button";

type AddToCartButtonProps = {
  productId: string;
  quantity?: number;
  variant?: "primary" | "accent" | "outline";
  className?: string;
};

export function AddToCartButton({ productId, quantity = 1, variant = "primary", className = "" }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(productId, quantity);
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
          {added ? "به سبد اضافه شد" : "افزودن به سبد اجاره"}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
