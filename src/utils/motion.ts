import type { Transition, Variants } from "motion/react";

export const spring: Transition = { type: "spring", stiffness: 260, damping: 28, mass: 0.8 };

export const softSpring: Transition = { type: "spring", stiffness: 110, damping: 20, mass: 0.9 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: softSpring },
};

export const staggeredFadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...softSpring, delay: index * 0.06 },
  }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.15 } },
};

export const revealOnce = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-80px" },
} as const;

export const pageFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: "easeIn" } },
};

export const cardHover: Variants = {
  rest: { y: 0, scale: 1, transition: spring },
  hover: { y: -6, scale: 1.02, transition: spring },
};

export const glassSheen: Variants = {
  rest: { x: "-20%", opacity: 0.35, transition: spring },
  hover: { x: "20%", opacity: 0.8, transition: spring },
};

export const slideInFromRight: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: spring },
  exit: { x: "100%", transition: { duration: 0.2, ease: "easeIn" } },
};

export const overlayFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
