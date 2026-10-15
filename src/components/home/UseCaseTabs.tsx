import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { useCases } from "../../data/home";
import { products } from "../../data/products";
import { formatPrice } from "../../utils/formatPrice";
import { spring } from "../../utils/motion";
import { GlassPanel } from "../ui/GlassPanel";

export function UseCaseTabs() {
  const [activeId, setActiveId] = useState(useCases[0].id);
  const active = useCases.find((useCase) => useCase.id === activeId) ?? useCases[0];
  const suggested = products.filter((product) => active.slugs.includes(product.slug));

  return (
    <div>
      <div role="tablist" aria-label="نوع رویداد" className="mx-auto mb-8 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-white/70 bg-white/60 p-1 backdrop-blur">
        {useCases.map((useCase) => (
          <button
            key={useCase.id}
            type="button"
            role="tab"
            aria-selected={useCase.id === activeId}
            onClick={() => setActiveId(useCase.id)}
            className={`relative shrink-0 rounded-full px-4 py-2 text-small font-bold transition-colors sm:px-6 ${
              useCase.id === activeId ? "text-paper" : "text-navy-900 hover:text-navy-700"
            }`}
          >
            {useCase.id === activeId && (
              <motion.span layoutId="use-case-pill" className="absolute inset-0 rounded-full bg-navy-900" transition={spring} />
            )}
            <span className="relative">{useCase.title}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          role="tabpanel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
          className="grid items-start gap-6 lg:grid-cols-3"
        >
          <div className="lg:pt-4">
            <h3 className="text-h2 font-extrabold text-navy-900">{active.title}</h3>
            <p className="mt-3 text-lead text-muted">{active.text}</p>
          </div>
          <ul className="grid grid-cols-2 gap-3 lg:col-span-2 lg:grid-cols-4">
            {suggested.map((product, index) => (
              <motion.li
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...spring, delay: index * 0.07 }}
              >
                <Link to={`/products/${product.slug}`} className="block h-full">
                  <GlassPanel variant="strong" className="h-full p-2" whileHover={{ y: -4 }}>
                    <img src={product.image} alt="" className="aspect-square w-full rounded bg-navy-50 object-cover" />
                    <p className="mt-2 px-1 font-bold text-navy-900">{product.name}</p>
                    <p className="px-1 pb-1 text-caption text-muted">{formatPrice(product.pricePerDay)} / روز</p>
                  </GlassPanel>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
