import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { buildCartMessage } from "../../utils/cartMessage";
import { formatNumber, formatPrice } from "../../utils/formatPrice";
import { formatJalali } from "../../utils/jalali";
import { overlayFade, spring } from "../../utils/motion";
import { whatsappLink } from "../../utils/whatsapp";
import { AnimatedNumber } from "../ui/AnimatedNumber";
import { ButtonAnchor, ButtonLink } from "../ui/Button";
import { GlassPanel } from "../ui/GlassPanel";
import { CartLineItem } from "./CartLineItem";

export function CartDrawer() {
  const cart = useCart();
  const { isDrawerOpen, closeDrawer, lines } = cart;

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
  }, [isDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 print:hidden" role="dialog" aria-modal="true" aria-label="سبد اجاره">
          <motion.div
            className="absolute inset-0 bg-navy-900/30"
            variants={overlayFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeDrawer}
          />
          <GlassPanel
            variant="strong"
            className="absolute inset-y-3 left-3 flex w-[26rem] max-w-[calc(100%-1.5rem)] flex-col"
            initial={{ x: "-110%" }}
            animate={{ x: 0, transition: spring }}
            exit={{ x: "-110%", transition: { duration: 0.2 } }}
          >
            <div className="flex items-center justify-between border-b border-white/70 p-5">
              <h2 className="text-h3 font-extrabold text-navy-900">سبد اجاره</h2>
              <button
                type="button"
                onClick={closeDrawer}
                className="flex h-10 w-10 items-center justify-center rounded border border-white/60 bg-white/50"
                aria-label="بستن سبد"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-navy-900" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="text-lead text-navy-900">سبد اجاره شما خالی است.</p>
                <p className="text-muted">محصول یا پکیج آماده را به سبد اضافه کنید.</p>
                <div className="flex gap-4">
                  <Link to="/products" onClick={closeDrawer} className="font-bold text-navy-900 underline underline-offset-8">
                    محصولات
                  </Link>
                  <Link to="/packages" onClick={closeDrawer} className="font-bold text-navy-900 underline underline-offset-8">
                    پکیج‌ها
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <p className="border-b border-white/70 px-5 py-3 text-small text-navy-900">
                  {cart.exhibitionName && <span className="block font-bold">{cart.exhibitionName}</span>}
                  {cart.hasDates
                    ? `${formatJalali(cart.startDate!)} تا ${formatJalali(cart.endDate!)} · ${formatNumber(cart.days)} روز`
                    : `قیمت‌ها برای ${formatNumber(cart.days)} روز؛ تاریخ را در صفحه سبد انتخاب کنید.`}
                </p>

                <ul className="flex-1 space-y-3 overflow-y-auto p-5">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <CartLineItem key={line.key} line={line} compact />
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="space-y-3 border-t border-white/70 p-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted">جمع کل</span>
                    <span className="text-h3 font-extrabold text-navy-900">
                      <AnimatedNumber value={cart.total} /> <span className="text-small font-medium">تومان</span>
                    </span>
                  </div>
                  {cart.saving > 0 && (
                    <p className="text-small text-success-700">صرفه‌جویی شما: {formatPrice(cart.saving)}</p>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    <ButtonLink to="/cart" onClick={closeDrawer} variant="primary" className="px-3">
                      ادامه و تاریخ
                    </ButtonLink>
                    <ButtonAnchor
                      href={whatsappLink(buildCartMessage(cart))}
                      target="_blank"
                      rel="noreferrer"
                      variant="accent"
                      className="px-3"
                    >
                      واتس‌اپ
                    </ButtonAnchor>
                  </div>
                </div>
              </>
            )}
          </GlassPanel>
        </div>
      )}
    </AnimatePresence>
  );
}
