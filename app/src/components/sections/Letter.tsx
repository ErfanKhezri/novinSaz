import { site } from "../../data/site";
import { ButtonAnchor } from "../ui";

/** A letter on a scalloped sheet, with a tear-off strip that carries the phone number. */
export function Letter() {
  return (
    <section aria-label="درباره نوین ساز" className="bg-surface px-3 py-section sm:px-gutter">
      <div className="mx-auto max-w-[40rem]" data-reveal>
        <div className="edge-scallop bg-paper px-6 pt-10 pb-14 sm:px-14 sm:pt-14">
          <div className="mb-7 grid size-11 place-items-center rounded-full bg-ink text-lead font-extrabold text-paper" aria-hidden="true">
            ن
          </div>
          <div className="flex flex-col gap-5">
            <p>
              غرفه‌دار روز چیدمان وقت ندارد. کانتر باید ساعت هفت صبح سر جایش باشد، صندلی‌ها
              هم‌رنگ باشند و تلویزیون روشن شود. ما برای همین چند ساعت کار می‌کنیم.
            </p>
            <p>
              {site.name} مبلمان و تجهیزات غرفه را روزانه و چهار روزه اجاره می‌دهد: از یک صندلی
              تاشو تا چیدمان کامل یک غرفه پذیرایی. همه کالاها در انبار خودمان نگهداری، تمیز و
              بعد از هر اجاره بازبینی می‌شوند.
            </p>
            <p>
              <mark className="bg-surface-2 px-1 text-ink">قیمتی که اینجا می‌بینید همان قیمت فاکتور است</mark>؛
              حمل و چیدمان در سالن‌های نمایشگاه بین‌المللی تهران در آن حساب شده.
            </p>
            <p>
              برگه سفارش را پر کنید یا تماس بگیرید. موجودی را همان روز تأیید می‌کنیم.
            </p>
          </div>
          <p className="mt-10 text-lead font-bold">تیم {site.name}</p>
          <p className="text-small text-muted">{site.tagline}</p>
        </div>

        <div className="mt-3 flex flex-col items-stretch gap-3 bg-paper p-5 sm:flex-row sm:items-center sm:justify-between">
          <a href={site.phoneHref} className="link num text-lead font-bold" dir="ltr">
            {site.phone}
          </a>
          <ButtonAnchor href={`https://wa.me/${site.whatsapp}`} variant="ink" target="_blank" rel="noreferrer">
            پیام در واتس‌اپ
          </ButtonAnchor>
        </div>
      </div>
    </section>
  );
}
