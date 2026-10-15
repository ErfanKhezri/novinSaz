import { useState, type FormEvent } from "react";
import { useOrder } from "../../hooks/useOrder";
import { formatNumber } from "../../lib/format";
import { buildOrderMessage, mailtoLink, whatsappLink, type ContactDetails } from "../../lib/orderMessage";
import { Field } from "../ui";

const notch = "absolute size-8 rounded-full bg-paper";

const emptyDetails: ContactDetails = { name: "", phone: "", event: "", note: "" };

interface ContactCouponProps {
  title?: string;
  sentence?: string;
}

/**
 * The form is a coupon to cut out. Sending opens WhatsApp (or email) with the
 * visitor's details and their order slip already written.
 */
export function ContactCoupon({
  title = "درخواست را بفرستید",
  sentence = "پیام شما با فهرست برگه سفارش در واتس‌اپ باز می‌شود؛ فقط دکمه ارسال را بزنید.",
}: ContactCouponProps) {
  const order = useOrder();
  const [details, setDetails] = useState(emptyDetails);

  const update = (key: keyof ContactDetails) => (event: { target: { value: string } }) =>
    setDetails((current) => ({ ...current, [key]: event.target.value }));

  const message = () => buildOrderMessage(details, order.lines, order.days, order.total);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(whatsappLink(message()), "_blank", "noopener");
  };

  return (
    <section aria-labelledby="coupon-title" className="px-3 pt-12 pb-section sm:px-gutter">
      <div className="mx-auto grid max-w-[1200px] overflow-hidden bg-accent text-accent-ink md:grid-cols-[42fr_58fr]" data-reveal>
        <div className="flex flex-col justify-between gap-6 p-8 sm:p-12">
          <h2 id="coupon-title" className="text-head leading-tight font-extrabold tracking-tight">
            {title}
          </h2>
          <p className="max-w-[34ch]">
            {sentence}
            {order.itemCount > 0 && (
              <> برگه شما: {formatNumber(order.itemCount)} کالا برای {formatNumber(order.days)} روز.</>
            )}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="dots-y relative flex flex-col gap-2.5 border-accent-ink/40 p-8 max-md:border-s-0 max-md:border-t-[5px] max-md:border-dotted sm:p-12"
        >
          {/* The two notches at the ends of the perforation, cut in the page's ground colour. */}
          <span aria-hidden="true" className={`${notch} -top-[18px] -right-4 md:-top-4 md:-right-[18px]`} />
          <span aria-hidden="true" className={`${notch} -top-[18px] -left-4 md:top-auto md:-bottom-4 md:left-auto md:-right-[18px]`} />
          <Field tone="on-accent" label="نام و نام شرکت" name="name" placeholder="نام و نام شرکت" autoComplete="organization" required value={details.name} onChange={update("name")} />
          <Field tone="on-accent" label="شماره تماس" name="phone" type="tel" placeholder="شماره تماس" autoComplete="tel" dir="auto" required value={details.phone} onChange={update("phone")} />
          <Field tone="on-accent" label="نام نمایشگاه و شماره سالن" name="event" placeholder="نام نمایشگاه و شماره سالن" value={details.event} onChange={update("event")} />
          <Field tone="on-accent" multiline rows={2} label="توضیحات" name="note" placeholder="توضیحات (اختیاری)" value={details.note} onChange={(event) => setDetails((current) => ({ ...current, note: event.target.value }))} />
          <button
            type="submit"
            className="mt-1 min-h-14 bg-ink font-bold text-paper transition-[background-color,transform] hover:bg-paper hover:text-ink active:scale-[0.98]"
          >
            ارسال در واتس‌اپ
          </button>
          <a
            href={mailtoLink(message())}
            className="link self-start py-2 text-small font-bold"
          >
            یا با ایمیل بفرستید
          </a>
        </form>
      </div>
    </section>
  );
}
