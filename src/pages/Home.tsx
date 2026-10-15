import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { CategoryIcon } from "../components/home/CategoryIcon";
import { ExhibitionCard } from "../components/exhibition/ExhibitionCard";
import { Faq } from "../components/home/Faq";
import { Hero } from "../components/home/Hero";
import { HowItWorks } from "../components/home/HowItWorks";
import { ProductMarquee } from "../components/home/ProductMarquee";
import { UseCaseTabs } from "../components/home/UseCaseTabs";
import { PackageCard } from "../components/package/PackageCard";
import { ProductGrid } from "../components/product/ProductGrid";
import { ButtonAnchor, ButtonLink } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { packages } from "../data/packages";
import { categories, featuredSlugs, products } from "../data/products";
import { site } from "../data/site";
import { upcomingExhibitions } from "../utils/exhibitions";
import { formatNumber } from "../utils/formatPrice";
import { staggeredFadeUp } from "../utils/motion";
import { whatsappLink } from "../utils/whatsapp";

const featured = products.filter((product) => featuredSlugs.includes(product.slug)).slice(0, 3);

const promises = [
  { title: "قیمت شفاف", text: "قیمت روزانه و چهار روزه هر محصول از قبل روی سایت است." },
  { title: "محصولات بازبینی‌شده", text: "هر محصول پیش از تحویل تمیز و بررسی می‌شود." },
  { title: "تحویل به‌موقع", text: "اقلام پیش از شروع چیدمان در غرفه شما آماده است." },
  { title: "پشتیبانی در رویداد", text: "در روزهای نمایشگاه برای جایگزینی در دسترسیم." },
];

export function Home() {
  return (
    <>
      <Hero />
      <ProductMarquee />

      <Section>
        <Container>
          <SectionTitle title="محصولات پرطرفدار" subtitle="رایج‌ترین انتخاب‌ها برای چیدمان غرفه" />
          <ProductGrid products={featured} />
          <div className="mt-10 text-center">
            <ButtonLink to="/products" variant="outline">
              همه {formatNumber(products.length)} محصول
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle title="نمایشگاه‌های پیش رو" subtitle="غرفه‌تان را از همین حالا برای تاریخ نمایشگاه رزرو کنید" />
          <ul className="grid gap-5 md:grid-cols-3">
            {upcomingExhibitions()
              .slice(0, 3)
              .map((exhibition, index) => (
                <motion.li
                  key={exhibition.id}
                  custom={index}
                  variants={staggeredFadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                >
                  <ExhibitionCard exhibition={exhibition} compact />
                </motion.li>
              ))}
          </ul>
          <div className="mt-10 text-center">
            <ButtonLink to="/exhibitions" variant="outline">
              تقویم کامل نمایشگاه‌ها
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section solid>
        <Container>
          <SectionTitle title="برای چه رویدادی آماده می‌شوید؟" subtitle="نوع رویداد را انتخاب کنید تا محصولات پیشنهادی را ببینید" />
          <UseCaseTabs />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle title="پکیج‌های آماده غرفه" subtitle="چند محصول که معمولاً با هم اجاره می‌شوند؛ یکجا و با تخفیف" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {packages.slice(0, 3).map((pack, index) => (
              <motion.li
                key={pack.id}
                custom={index}
                variants={staggeredFadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <PackageCard pack={pack} />
              </motion.li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <ButtonLink to="/packages" variant="outline">
              همه پکیج‌ها
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section solid>
        <Container>
          <SectionTitle title="دسته‌بندی‌ها" subtitle="محصول مورد نیازتان را سریع‌تر پیدا کنید" />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category, index) => {
              const count = products.filter((product) => product.category === category).length;
              return (
                <motion.li
                  key={category}
                  custom={index}
                  variants={staggeredFadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/products?category=${encodeURIComponent(category)}`}
                    className="group flex h-full flex-col items-center gap-3 rounded-lg border border-line bg-canvas p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-navy-900 hover:bg-navy-900"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper text-navy-900 transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-accent-500 group-hover:text-paper">
                      <CategoryIcon category={category} />
                    </span>
                    <span className="font-bold text-navy-900 transition-colors group-hover:text-paper">{category}</span>
                    <span className="text-small text-muted transition-colors group-hover:text-navy-100">{formatNumber(count)} محصول</span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle title="اجاره در چهار مرحله" subtitle="بدون دردسر، از انتخاب تا جمع‌آوری" />
          <HowItWorks />
        </Container>
      </Section>

      <Section solid>
        <Container className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-h2 font-extrabold text-navy-900 sm:text-h1">چرا {site.name}؟</h2>
            <p className="mt-4 text-lead text-muted">
              {site.name} مبلمان و تجهیزات موردنیاز غرفه‌های نمایشگاهی و شرکت‌ها را اجاره می‌دهد تا بدون
              خرید و نگهداری وسایل، فضایی مرتب و حرفه‌ای داشته باشید.
            </p>
            <ButtonLink to="/about" variant="outline" className="mt-6">
              بیشتر درباره ما
            </ButtonLink>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {promises.map((promise, index) => (
              <motion.li
                key={promise.title}
                custom={index}
                variants={staggeredFadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-lg border border-line bg-canvas p-5"
              >
                <span className="block h-1 w-10 rounded-full bg-accent-500" aria-hidden="true" />
                <h3 className="mt-3 font-bold text-navy-900">{promise.title}</h3>
                <p className="mt-1 text-small text-muted">{promise.text}</p>
              </motion.li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle title="سؤالات پرتکرار" />
          <Faq />
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <div className="relative flex flex-col items-center overflow-hidden rounded-lg bg-navy-900 px-6 py-section-sm text-center">
            <motion.span
              className="absolute -inset-y-10 w-24 rotate-12 bg-white/10 blur-xl"
              animate={{ x: ["-60vw", "60vw"] }}
              transition={{ duration: 5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
              aria-hidden="true"
            />
            <h2 className="relative text-h2 font-extrabold text-paper sm:text-h1">برای رویداد بعدی‌تان آماده‌اید؟</h2>
            <p className="relative mt-3 max-w-prose text-navy-100">
              فهرست اقلام موردنیاز و تاریخ نمایشگاه را بفرستید؛ همان روز پیش‌فاکتور دریافت می‌کنید.
            </p>
            <div className="relative mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonAnchor
                href={whatsappLink(`سلام ${site.name}، برای رویداد پیش رو مبلمان می‌خواهم.`)}
                target="_blank"
                rel="noreferrer"
                variant="accent"
              >
                درخواست پیش‌فاکتور
              </ButtonAnchor>
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
