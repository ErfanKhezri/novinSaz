import { ButtonAnchor, ButtonLink, Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { site } from "../data/site";
import { useCart } from "../hooks/useCart";
import { usePageMeta } from "../hooks/usePageMeta";
import { buildCartMessage } from "../utils/cartMessage";
import { formatNumber, formatPrice } from "../utils/formatPrice";
import { formatJalali, todayJalali } from "../utils/jalali";
import { breakdownLabel } from "../utils/rentalPrice";
import { whatsappLink } from "../utils/whatsapp";

export function Quote() {
  usePageMeta("پیش‌فاکتور");
  const cart = useCart();
  const today = todayJalali();
  const quoteNumber = `${formatJalali(today, "YYYYMMDD")}-${formatNumber(cart.count)}`;
  const dailyTotal = cart.lines.reduce((sum, line) => sum + line.rental.dailyOnlyPrice, 0);

  if (cart.lines.length === 0) {
    return (
      <Container className="flex flex-col items-center gap-6 py-section text-center">
        <h1 className="text-h1 font-extrabold text-navy-900">پیش‌فاکتور</h1>
        <p className="text-muted">برای صدور پیش‌فاکتور ابتدا محصولات را به سبد اجاره اضافه کنید.</p>
        <ButtonLink to="/products">مشاهده محصولات</ButtonLink>
      </Container>
    );
  }

  return (
    <Container className="py-section-sm print:max-w-none print:p-0">
      <div className="mb-6 flex flex-wrap justify-center gap-3 print:hidden">
        <Button variant="accent" onClick={() => window.print()}>
          دانلود پیش‌فاکتور (PDF)
        </Button>
        <ButtonAnchor href={whatsappLink(buildCartMessage(cart))} target="_blank" rel="noreferrer" variant="primary">
          ارسال در واتس‌اپ
        </ButtonAnchor>
        <ButtonLink to="/cart" variant="outline">
          ویرایش سبد
        </ButtonLink>
      </div>
      <p className="mb-6 text-center text-caption text-muted print:hidden">
        در پنجره چاپ، مقصد را «ذخیره به صورت PDF» انتخاب کنید.
      </p>

      <article className="mx-auto max-w-4xl rounded-lg border border-line bg-paper p-6 sm:p-10 print:max-w-none print:rounded-none print:border-0 print:p-0">
        <header className="flex flex-wrap items-start justify-between gap-6 border-b-2 border-navy-900 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded bg-navy-900" aria-hidden="true">
              <span className="h-5 w-5 rounded-sm bg-accent-200" />
            </span>
            <div>
              <p className="text-h2 font-extrabold text-navy-900">{site.name}</p>
              <p className="text-small text-muted">اجاره مبلمان و تجهیزات نمایشگاهی</p>
            </div>
          </div>
          <div className="text-small">
            <h1 className="text-h3 font-extrabold text-navy-900">پیش‌فاکتور اجاره</h1>
            <p>شماره: {quoteNumber}</p>
            <p>تاریخ صدور: {formatJalali(today)}</p>
          </div>
        </header>

        <section className="grid gap-2 border-b border-line py-5 text-small sm:grid-cols-3">
          {cart.exhibitionName && (
            <p>
              <span className="text-muted">نمایشگاه: </span>
              <strong>{cart.exhibitionName}</strong>
            </p>
          )}
          <p>
            <span className="text-muted">تاریخ اجاره: </span>
            <strong>
              {cart.hasDates ? `${formatJalali(cart.startDate!)} تا ${formatJalali(cart.endDate!)}` : "اعلام نشده"}
            </strong>
          </p>
          <p>
            <span className="text-muted">مدت: </span>
            <strong>{formatNumber(cart.days)} روز</strong>
          </p>
        </section>

        <div className="overflow-x-auto py-5">
          <table className="w-full min-w-[36rem] text-small">
            <thead>
              <tr className="bg-navy-50 text-navy-900">
                <th className="px-3 py-2 text-start">ردیف</th>
                <th className="px-3 py-2 text-start">شرح کالا</th>
                <th className="px-3 py-2 text-center">تعداد</th>
                <th className="px-3 py-2 text-start">محاسبه</th>
                <th className="px-3 py-2 text-end">نرخ روزانه</th>
                <th className="px-3 py-2 text-end">مبلغ (تومان)</th>
              </tr>
            </thead>
            <tbody>
              {cart.lines.map((line, index) => (
                <tr key={line.key} className="border-b border-line">
                  <td className="px-3 py-2">{formatNumber(index + 1)}</td>
                  <td className="px-3 py-2 font-medium">
                    {line.product.name}
                    {line.discountPercent > 0 && (
                      <span className="block text-caption text-muted">تخفیف پکیج {formatNumber(line.discountPercent)}٪</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-center">{formatNumber(line.quantity)}</td>
                  <td className="px-3 py-2">{breakdownLabel(line.rental)}</td>
                  <td className="px-3 py-2 text-end">{formatNumber(line.product.pricePerDay)}</td>
                  <td className="px-3 py-2 text-end font-bold">{formatNumber(line.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <dl className="ms-auto max-w-sm space-y-2 text-small">
          <div className="flex justify-between">
            <dt className="text-muted">جمع با نرخ روزانه</dt>
            <dd>{formatPrice(dailyTotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">صرفه‌جویی</dt>
            <dd>{formatPrice(cart.saving)}</dd>
          </div>
          <div className="flex justify-between border-t-2 border-navy-900 pt-2 text-body">
            <dt className="font-bold">مبلغ قابل پرداخت</dt>
            <dd className="font-extrabold text-navy-900">{formatPrice(cart.total)}</dd>
          </div>
        </dl>

        <footer className="mt-8 space-y-1 border-t border-line pt-5 text-caption text-muted">
          <p>این پیش‌فاکتور تا ۷ روز معتبر است و قطعی شدن آن منوط به تأیید موجودی است.</p>
          <p>هزینه حمل و چیدمان پس از تعیین محل رویداد اعلام می‌شود.</p>
          <p className="pt-2 text-ink">
            تلفن: {site.phone} · واتس‌اپ: {site.whatsappDisplay} · اینستاگرام: {site.instagram}@ · {site.address}
          </p>
        </footer>
      </article>
    </Container>
  );
}
