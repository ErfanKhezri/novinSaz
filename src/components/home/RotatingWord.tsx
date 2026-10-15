import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type RotatingWordProps = { words: string[]; interval?: number };

export function RotatingWord({ words, interval = 2400 }: RotatingWordProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((current) => (current + 1) % words.length), interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          className="col-start-1 row-start-1 text-accent-600"
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
