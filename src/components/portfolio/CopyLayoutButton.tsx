import { useState } from "react";
import type { Project } from "../../data/projects";
import { useCart } from "../../hooks/useCart";
import { Button } from "../ui/Button";

type CopyLayoutButtonProps = { project: Project; className?: string };

/** Adds every item used in the project to the cart. */
export function CopyLayoutButton({ project, className = "" }: CopyLayoutButtonProps) {
  const { addItem, openDrawer } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    project.items.forEach((item) => addItem(item.productId, item.quantity));
    setAdded(true);
    setTimeout(openDrawer, 350);
  };

  return (
    <Button variant="accent" onClick={handleClick} className={className}>
      {added ? "به سبد اضافه شد" : "همین چیدمان رو می‌خوام"}
    </Button>
  );
}
