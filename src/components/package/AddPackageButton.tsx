import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { Button } from "../ui/Button";

type AddPackageButtonProps = {
  packageId: string;
  variant?: "primary" | "accent" | "outline";
  className?: string;
};

export function AddPackageButton({ packageId, variant = "accent", className = "" }: AddPackageButtonProps) {
  const { addPackage, openDrawer } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addPackage(packageId);
    setAdded(true);
    setTimeout(openDrawer, 350);
  };

  return (
    <Button variant={variant} onClick={handleClick} className={className}>
      {added ? "پکیج به سبد اضافه شد" : "افزودن کل پکیج به سبد"}
    </Button>
  );
}
