import { Link } from "react-router-dom";
import { ProductGrid } from "../components/product/ProductGrid";
import { ButtonAnchor, ButtonLink } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { categories, featuredSlugs, products } from "../data/products";
import { site } from "../data/site";
import { formatNumber } from "../utils/formatPrice";
import { whatsappLink } from "../utils/whatsapp";

const steps = [
  { title: "انتخاب محصول", text: "محصولات را ببینید و قیمت روزانه یا چهار روزه هر کدام را مقایسه کنید." },
  { title: "ثبت درخواست", text: "درخواست را در واتس‌اپ بفرستید؛ موجودی را بررسی و پیش‌فاکتور ارسال می‌کنیم." },
  { title: "تحویل و جمع‌آوری", text: "در روز چیدمان در غرفه تحویل می‌دهیم و پس از پایان رویداد جمع‌آوری می‌کنیم." },
];

const featured = products.filter((product) => featuredSlugs.includes(product.slug)).slice(0, 3);

export function Home() {
  return (
    <>
      <Section className="!pb-section-sm">
        <Container className="flex flex-col items-center py-section-sm text-center">
          <h1 className="max-w-3xl text-h1 font-extrabold tracking-tight text-navy-900 sm:text-display">
            اجاره مبلمان و تجهیزات برای غرفه نمایشگاهی
          </h1>
          <p className="mt-5 max-w-prose text-lead text-muted">
            کانتر، صندلی، مبلمان، تلویزیون و پاراوان برای نمایشگاه، شوروم و اتاق جلسه؛ با اجاره روزانه
            یا بسته چهار روزه و تحویل در محل.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink to="/products" variant="primary">
              مشاهده محصولات
            </ButtonLink>
            <ButtonAnchor
              href={whatsappLink(`سلام ${site.name}، برای اجاره مبلمان غرفه راهنمایی می‌خواهم.`)}
              target="_blank"
              rel="noreferrer"
              variant="outline"
            >
              مشاوره رایگان در واتس‌اپ
            </ButtonAnchor>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle title="محصولات پرطرفدار" subtitle="رایج‌ترین انتخاب‌ها برای چیدمان غرفه" />
          <ProductGrid products={featured} />
          <div className="mt-10 text-center">
            <ButtonLink to="/products" variant="outline">
              همه محصولات
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section solid>
        <Container>
          <SectionTitle title="دسته‌بندی‌ها" subtitle="محصول مورد نیازتان را سریع‌تر پیدا کنید" />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => {
              const count = products.filter((product) => product.category === category).length;
              return (
                <li key={category}>
                  <Link to={`/products?category=${encodeURIComponent(category)}`} className="group block h-full">
                    <Card className="flex h-full flex-col gap-1 p-5 transition-colors group-hover:border-navy-900">
                      <span className="font-bold text-navy-900">{category}</span>
                      <span className="text-small text-muted">{formatNumber(count)} محصول</span>
                    </Card>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle title="اجاره در سه مرحله" subtitle="بدون دردسر، از انتخاب تا جمع‌آوری" />
          <ol className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Card className="h-full p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 font-bold text-gold-600">
                    {formatNumber(index + 1)}
                  </span>
                  <h3 className="mt-4 text-h3 font-bold text-navy-900">{step.title}</h3>
                  <p className="mt-2 text-muted">{step.text}</p>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section solid>
        <Container className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-h2 font-extrabold text-navy-900 sm:text-h1">درباره {site.name}</h2>
            <p className="mt-4 text-lead text-muted">
              {site.name} مبلمان و تجهیزات موردنیاز غرفه‌های نمایشگاهی و شرکت‌ها را اجاره می‌دهد. همه
              محصولات در انبار خودمان نگهداری و پیش از هر تحویل تمیز و بازبینی می‌شوند تا غرفه شما از
              روز اول مرتب و آماده باشد.
            </p>
            <ButtonLink to="/about" variant="outline" className="mt-6">
              بیشتر درباره ما
            </ButtonLink>
          </div>
          <img
            src="https://placehold.co/800x600/14213D/C9A227?text=Novin+Saz"
            alt={`نمای غرفه چیده شده با مبلمان ${site.name}`}
            loading="lazy"
            width={800}
            height={600}
            className="w-full rounded-lg border border-line bg-navy-50"
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col items-center rounded-lg bg-navy-900 px-6 py-section-sm text-center">
            <h2 className="text-h2 font-extrabold text-paper">برای رویداد بعدی‌تان آماده‌اید؟</h2>
            <p className="mt-3 max-w-prose text-navy-100">
              فهرست اقلام موردنیاز و تاریخ نمایشگاه را بفرستید؛ همان روز پیش‌فاکتور دریافت می‌کنید.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink to="/contact" variant="accent">
                تماس با ما
              </ButtonLink>
              <ButtonAnchor href={site.phoneLink} variant="outline">
                تماس تلفنی: {site.phone}
              </ButtonAnchor>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
