import { Faq, HowItWorks, Letter } from "../components/sections";
import { Container, Photo } from "../components/ui";
import { photos, site } from "../data/site";
import { usePageTitle } from "../hooks/usePageTitle";

export function AboutPage() {
  usePageTitle("درباره ما");

  return (
    <>
      <Container className="grid items-end gap-10 pt-10 pb-section sm:pt-16 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-6" data-reveal>
          <h1 className="text-display font-extrabold tracking-tight">{site.name}</h1>
          <p className="max-w-[36ch] text-lead">
            مبلمان غرفه برای چهار روز نمایشگاه. ما می‌آوریم، می‌چینیم و شب آخر جمع می‌کنیم.
          </p>
        </div>
        <Photo
          src={photos.chairs.src}
          alt={photos.chairs.alt}
          width={1200}
          height={1200}
          priority
          className="aspect-square lg:col-span-6"
        />
      </Container>
      <Letter />
      <HowItWorks />
      <Faq />
    </>
  );
}
