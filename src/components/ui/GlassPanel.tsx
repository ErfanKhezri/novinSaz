import { motion, type HTMLMotionProps } from "motion/react";

type Variant = "light" | "strong";

const variants: Record<Variant, string> = {
  light: "border-white/30 bg-white/15 shadow-glass dark:bg-white/5",
  strong: "border-white/50 bg-white/60 shadow-glass-strong dark:bg-white/10",
};

type GlassPanelProps = HTMLMotionProps<"div"> & { variant?: Variant };

export function GlassPanel({ variant = "light", className = "", ...props }: GlassPanelProps) {
  return (
    <motion.div
      className={`rounded-lg border backdrop-blur-md backdrop-saturate-150 transition-[background-color,box-shadow,border-color] duration-300 md:backdrop-blur-xl ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
