import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { steps } from "../../data/home";
import { formatNumber } from "../../utils/formatPrice";
import { staggeredFadeUp } from "../../utils/motion";
import { Card } from "../ui/Card";

/** Steps joined by a line that draws itself as the section scrolls into view. */
export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <ol ref={ref} className="relative grid gap-5 md:grid-cols-4">
      <span className="absolute inset-x-[12%] top-11 hidden h-0.5 bg-navy-100 md:block" aria-hidden="true" />
      <motion.span
        className="absolute inset-x-[12%] top-11 hidden h-0.5 origin-right bg-gold-500 md:block"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      {steps.map((step, index) => (
        <motion.li
          key={step.title}
          custom={index}
          variants={staggeredFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative"
        >
          <Card className="h-full p-6 text-center">
            <motion.span
              className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 text-h3 font-bold text-gold-500"
              whileInView={{ scale: [0.6, 1.15, 1] }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
            >
              {formatNumber(index + 1)}
            </motion.span>
            <h3 className="mt-4 text-h3 font-bold text-navy-900">{step.title}</h3>
            <p className="mt-2 text-muted">{step.text}</p>
          </Card>
        </motion.li>
      ))}
    </ol>
  );
}
