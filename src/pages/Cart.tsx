import { AnimatePresence } from "motion/react";
import { CartLineItem } from "../components/cart/CartLineItem";
import { JalaliDatePicker } from "../components/cart/JalaliDatePicker";
import { AnimatedNumber } from "../components/ui/AnimatedNumber";
import { ButtonAnchor, ButtonLink } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { GlassPanel } from "../components/ui/GlassPanel";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { useCart } from "../hooks/useCart";
import { usePageMeta } from "../hooks/usePageMeta";
import { buildCartMessage } from "../utils/cartMessage";
import { formatNumber, formatPrice } from "../utils/formatPrice";
import { whatsappLink } from "../utils/whatsapp";

export function Cart() {
  usePageMeta("سبد اجاره");
  const cart = useCart();

  if (cart.lines.length === 0) {
    return (
      <Section>
        <Container className="flex flex-col items-center text-center">
          <SectionTitle
            as="h1"
            title="سبد اجاره"
            subtitle={
              cart.exhibitionName
                ? `تاریخ «${cart.exhibitionName}» ثبت شد؛ حالا محصولات یا یک پکیج آماده را انتخاب کنید.`
                : "هنوز محصولی به سبد اضافه نکرده‌اید."
            }
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/products">مشاهده محصولات</ButtonLink>
            <ButtonLink to="/packages" variant="outline">
              پکیج‌های آماده
            </ButtonLink>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <SectionTitle as="h1" title="سبد اجاره" subtitle="تعداد و تاریخ را مشخص کنید؛ ارزان‌ترین ترکیب قیمت خودکار حساب می‌شود." />

        <div className="grid items-start gap-6 lg:grid-cols-3">
          <ul className="space-y-3 lg:col-span-2">
            <AnimatePresence initial={false}>
              {cart.lines.map((line) => (
                <CartLineItem key={line.key} line={line} />
              ))}
            </AnimatePresence>
          </ul>

          <GlassPanel variant="strong" className="space-y-5 p-5 lg:sticky lg:top-24">
            {cart.exhibitionName && (
              <div className="flex items-center justify-between gap-2 rounded bg-accent-50 px-3 py-2 text-small">
                <span>
                  برای <strong className="text-navy-900">{cart.exhibitionName}</strong>
                </span>
                <button type="button" onClick={cart.clearExhibition} className="text-muted hover:text-navy-900" aria-label="حذف نمایشگاه">
                  ×
                </button>
              </div>
            )}

            <JalaliDatePicker startDate={cart.startDate} endDate={cart.endDate} onChange={cart.setDates} />
            <p className="text-small text-muted">
              {cart.hasDates
                ? `مدت اجاره: ${formatNumber(cart.days)} روز`
                : `تا انتخاب تاریخ، قیمت‌ها برای ${formatNumber(cart.days)} روز محاسبه شده است.`}
            </p>

            <dl className="space-y-2 border-t border-white/70 pt-4">
              <div className="flex justify-between text-small">
                <dt className="text-muted">قیمت با نرخ روزانه</dt>
                <dd>{formatPrice(cart.lines.reduce((sum, line) => sum + line.rental.dailyOnlyPrice, 0))}</dd>
              </div>
              {cart.saving > 0 && (
                <div className="flex justify-between text-small text-success-700">
                  <dt>صرفه‌جویی (بسته ۴روزه و تخفیف پکیج)</dt>
                  <dd>{formatPrice(cart.saving)}</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between">
                <dt className="font-bold text-navy-900">جمع کل</dt>
                <dd className="text-h2 font-extrabold text-navy-900">
                  <AnimatedNumber value={cart.total} /> <span className="text-small font-medium">تومان</span>
                </dd>
              </div>
            </dl>

            <div className="grid gap-2">
              <ButtonAnchor href={whatsappLink(buildCartMessage(cart))} target="_blank" rel="noreferrer" variant="accent">
                ارسال درخواست در واتس‌اپ
              </ButtonAnchor>
              <ButtonLink to="/quote" variant="outline">
                مشاهده پیش‌فاکتور
              </ButtonLink>
              <button type="button" onClick={cart.clear} className="py-2 text-small text-muted hover:text-navy-900">
                خالی کردن سبد
              </button>
            </div>
          </GlassPanel>
        </div>
      </Container>
    </Section>
  );
}
