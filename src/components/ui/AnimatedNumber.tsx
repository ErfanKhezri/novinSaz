import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { formatNumber } from "../../utils/formatPrice";

type AnimatedNumberProps = {
  value: number;
  suffix?: string;
  className?: string;
};

/** Counts up from the previous value to the new one, in Persian digits. */
export function AnimatedNumber({ value, suffix = "", className = "" }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const previous = useRef(0);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(previous.current, value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = formatNumber(Math.round(latest)) + suffix;
      },
    });
    previous.current = value;
    return () => controls.stop();
  }, [value, inView, suffix]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {formatNumber(0) + suffix}
    </span>
  );
}
