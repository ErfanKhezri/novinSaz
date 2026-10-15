import { ButtonLink } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { site } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";

const services = [
  { title: "تجهیز غرفه نمایشگاهی", text: "کانتر، صندلی، مبلمان، میز و پاراوان برای غرفه‌های هر اندازه." },
  { title: "شوروم و اتاق جلسه", text: "مبلمان موقت برای شوروم، اتاق جلسه و دفتر در زمان نوسازی یا رویداد." },
  { title: "همایش و سمینار", text: "صندلی تاشو و تجهیزات صوتی‌تصویری برای سالن همایش و کارگاه آموزشی." },
  { title: "حمل، چیدمان و جمع‌آوری", text: "تحویل در محل، چیدمان در غرفه و جمع‌آوری پس از پایان رویداد." },
];

const reasons = [
  { title: "قیمت شفاف", text: "قیمت روزانه و چهار روزه هر محصول از قبل مشخص است؛ بدون هزینه پنهان." },
  { title: "کیفیت بازبینی‌شده", text: "هر محصول پیش از تحویل تمیز و بررسی می‌شود." },
  { title: "تحویل به‌موقع", text: "اقلام پیش از شروع چیدمان در غرفه شما آماده است." },
  { title: "پاسخگویی سریع", text: "در روزهای نمایشگاه هم برای جایگزینی و پشتیبانی در دسترسیم." },
];

export function About() {
  usePageMeta("درباره ما");
  return (
    <>
      <Section>
        <Container className="text-center">
          <h1 className="text-h1 font-extrabold text-navy-900 sm:text-display">درباره {site.name}</h1>
          <p className="mx-auto mt-5 max-w-prose text-lead text-muted">
            {site.name} مبلمان و تجهیزات موردنیاز غرفه‌های نمایشگاهی و شرکت‌ها را به‌صورت روزانه و چهار
            روزه اجاره می‌دهد. هدف ما این است که برگزارکنندگان و مدیران اداری، بدون خرید و نگهداری
            وسایل، فضایی مرتب و حرفه‌ای برای معرفی کسب‌وکارشان داشته باشند.
          </p>
        </Container>
      </Section>

      <Section solid>
        <Container>
          <SectionTitle title="خدمات ما" />
          <ul className="grid gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.title}>
                <Card className="h-full p-6">
                  <h3 className="text-h3 font-bold text-navy-900">{service.title}</h3>
                  <p className="mt-2 text-muted">{service.text}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle title="چرا نوین ساز؟" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => (
              <li key={reason.title}>
                <Card className="h-full p-6">
                  <span className="block h-1 w-10 rounded-full bg-accent-500" aria-hidden="true" />
                  <h3 className="mt-4 text-h3 font-bold text-navy-900">{reason.title}</h3>
                  <p className="mt-2 text-muted">{reason.text}</p>
                </Card>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <ButtonLink to="/contact" variant="primary">
              تماس با ما
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
