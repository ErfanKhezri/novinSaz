import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { site } from "../../data/site";
import { useRentalList } from "../../hooks/useRentalList";
import { formatNumber, formatPrice } from "../../utils/formatPrice";
import { overlayFade, spring } from "../../utils/motion";
import { whatsappLink } from "../../utils/whatsapp";
import { AnimatedNumber } from "../ui/AnimatedNumber";
import { ButtonAnchor } from "../ui/Button";
import { GlassPanel } from "../ui/GlassPanel";
import { Stepper } from "../ui/Stepper";

export function RentalListDrawer() {
  const { isOpen, close, lines, days, setDays, setQuantity, total, clear } = useRentalList();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const message = [
    `سلام ${site.name}، درخواست اجاره برای ${formatNumber(days)} روز:`,
    ...lines.map((line) => `- ${formatNumber(line.quantity)} عدد ${line.product.name}`),
    `جمع تخمینی: ${formatPrice(total)}`,
  ].join("\n");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="لیست اجاره">
          <motion.div
            className="absolute inset-0 bg-navy-900/30"
            variants={overlayFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={close}
          />
          <GlassPanel
            variant="strong"
            className="absolute inset-y-3 left-3 flex w-[26rem] max-w-[calc(100%-1.5rem)] flex-col"
            initial={{ x: "-110%" }}
            animate={{ x: 0, transition: spring }}
            exit={{ x: "-110%", transition: { duration: 0.2 } }}
          >
            <div className="flex items-center justify-between border-b border-white/70 p-5">
              <h2 className="text-h3 font-extrabold text-navy-900">لیست اجاره شما</h2>
              <button
                type="button"
                onClick={close}
                className="flex h-10 w-10 items-center justify-center rounded border border-white/60 bg-white/50"
                aria-label="بستن لیست"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-navy-900" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="text-lead text-navy-900">لیست شما خالی است.</p>
                <p className="text-muted">محصولات را ببینید و با دکمه «افزودن به لیست اجاره» انتخاب کنید.</p>
                <Link to="/products" onClick={close} className="font-bold text-navy-900 underline underline-offset-8">
                  مشاهده محصولات
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between gap-4 border-b border-white/70 p-5">
                  <span className="font-medium text-navy-900">مدت اجاره</span>
                  <Stepper label="روز" unit="روز" value={days} min={1} max={30} onChange={setDays} />
                </div>

                <ul className="flex-1 space-y-3 overflow-y-auto p-5">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.product.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-3 rounded-lg border border-white/70 bg-white/60 p-3"
                      >
                        <img src={line.product.image} alt="" className="h-16 w-16 rounded bg-navy-50 object-cover" />
                        <div className="flex flex-1 flex-col gap-2">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-navy-900">{line.product.name}</span>
                            <span className="text-small font-bold text-navy-900">{formatPrice(line.cost)}</span>
                          </div>
                          <Stepper
                            label={`تعداد ${line.product.name}`}
                            value={line.quantity}
                            onChange={(value) => setQuantity(line.product.slug, value)}
                          />
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="space-y-4 border-t border-white/70 p-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted">جمع تخمینی برای {formatNumber(days)} روز</span>
                    <span className="text-h3 font-extrabold text-navy-900">
                      <AnimatedNumber value={total} /> <span className="text-small font-medium">تومان</span>
                    </span>
                  </div>
                  <p className="text-caption text-muted">
                    ارزان‌ترین ترکیب اجاره روزانه و بسته چهار روزه به‌صورت خودکار محاسبه شده است.
                  </p>
                  <ButtonAnchor href={whatsappLink(message)} target="_blank" rel="noreferrer" variant="accent" className="w-full">
                    ارسال لیست در واتس‌اپ
                  </ButtonAnchor>
                  <button type="button" onClick={clear} className="w-full text-small text-muted hover:text-navy-900">
                    پاک کردن لیست
                  </button>
                </div>
              </>
            )}
          </GlassPanel>
        </div>
      )}
    </AnimatePresence>
  );
}
