import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faqs } from "../../data/home";
import { spring } from "../../utils/motion";

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ul className="mx-auto max-w-prose divide-y divide-line rounded-lg border border-line bg-paper">
      {faqs.map((faq, index) => {
        const isOpen = index === openIndex;
        return (
          <li key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start font-bold text-navy-900 transition-colors hover:text-accent-600"
            >
              {faq.question}
              <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={spring} className="text-h2 leading-none text-accent-600" aria-hidden="true">
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-muted">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
