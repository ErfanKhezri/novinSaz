import { OrderSlip } from "../components/order";
import { ContactCoupon } from "../components/sections";
import { Container } from "../components/ui";
import { useOrder } from "../hooks/useOrder";
import { usePageTitle } from "../hooks/usePageTitle";

export function OrderPage() {
  usePageTitle("برگه سفارش");
  const { itemCount } = useOrder();

  return (
    <>
      <section className="bg-field pt-10 pb-section text-field-ink sm:pt-16">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-4" data-reveal>
            <h1 className="text-head font-extrabold tracking-tight">برگه سفارش</h1>
            <p className="max-w-[34ch] text-lead">
              تعداد و مدت را تنظیم کنید؛ ارزان‌ترین ترکیب روزانه و چهار روزه خودکار حساب می‌شود.
            </p>
          </div>
          <div className="lg:col-span-8">
            <OrderSlip />
          </div>
        </Container>
      </section>
      {itemCount > 0 && (
        <ContactCoupon
          title="برگه را بفرستید"
          sentence="این برگه با نام و شماره شما در واتس‌اپ باز می‌شود. موجودی را همان روز تأیید می‌کنیم و پیش‌فاکتور می‌فرستیم."
        />
      )}
    </>
  );
}
