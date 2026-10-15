import { motion, type HTMLMotionProps } from "motion/react";
import { fadeUp, revealOnce } from "../../utils/motion";

type SectionProps = HTMLMotionProps<"section"> & { solid?: boolean };

export function Section({ solid = false, className = "", ...props }: SectionProps) {
  return (
    <motion.section
      variants={fadeUp}
      {...revealOnce}
      className={`py-section-sm sm:py-section ${solid ? "bg-paper" : ""} ${className}`}
      {...props}
    />
  );
}
