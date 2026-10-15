import { ContactCoupon } from "../components/sections";
import { ButtonAnchor, Container } from "../components/ui";
import { site } from "../data/site";
import { usePageTitle } from "../hooks/usePageTitle";
import { stagger } from "../lib/stagger";

const channels = [
  { label: "تلفن دفتر", value: site.phone, href: site.phoneHref, ltr: true },
  { label: "موبایل و واتس‌اپ", value: site.mobile, href: `https://wa.me/${site.whatsapp}`, ltr: true },
  { label: "ایمیل", value: site.email, href: `mailto:${site.email}`, ltr: true },
  { label: "نشانی", value: site.address },
  { label: "ساعت کاری", value: site.hours },
  { label: "روزهای نمایشگاه", value: site.hoursDuringFair },
];

export function ContactPage() {
  usePageTitle("تماس با ما");

  return (
    <>
      <Container className="pt-10 sm:pt-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="text-display font-extrabold tracking-tight lg:col-span-7" data-reveal>
            تماس
          </h1>
          <div className="flex flex-col gap-6 lg:col-span-5" data-reveal>
            <p className="max-w-[38ch] text-lead">
              موجودی کالاها را همان روز تأیید می‌کنیم. سریع‌ترین راه، واتس‌اپ است.
            </p>
            <ButtonAnchor href={site.phoneHref} size="lg" className="self-start">
              تماس تلفنی
            </ButtonAnchor>
          </div>
        </div>

        <dl className="mt-16 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel, index) => (
            <div key={channel.label} className="flex min-h-36 flex-col justify-between gap-4 bg-surface p-6" data-reveal style={stagger(index % 3)}>
              <dt className="text-small text-muted">{channel.label}</dt>
              <dd className="text-lead font-bold">
                {channel.href ? (
                  <a href={channel.href} className="link num" dir={channel.ltr ? "ltr" : undefined}>
                    {channel.value}
                  </a>
                ) : (
                  channel.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <ContactCoupon />
    </>
  );
}
