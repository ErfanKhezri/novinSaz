import { stagger } from "../../lib/stagger";
import { boothPackages, photos } from "../../data/site";
import { formatNumber } from "../../lib/format";
import { Container, Photo } from "../ui";

/** Ready-made booth packages, priced the way a good menu prices its dishes. */
export function PackageMenu() {
  return (
    <section aria-labelledby="packages-title" className="py-section">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-3" data-reveal>
          <h2 id="packages-title" className="text-head font-extrabold tracking-tight lg:text-[2.5rem] lg:leading-tight">
            بسته‌های آماده
          </h2>
          <Photo
            src={photos.crowd.src}
            alt={photos.crowd.alt}
            width={1200}
            height={1500}
            className="aspect-[4/5] w-3/5 lg:w-full"
          />
        </div>

        <div className="lg:col-span-8 lg:col-start-5">
          <p className="mb-10 max-w-[44ch] text-lead" data-reveal>
            چند کالا که معمولاً با هم اجاره می‌شوند، یک‌جا و ارزان‌تر. قیمت‌ها برای چهار روز است؛
            نرخ روزانه زیر هر بسته آمده.
          </p>
          <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
            {boothPackages.map((item, index) => (
              <article
                key={item.name}
                className="flex flex-col gap-2"
                data-reveal
                style={stagger(index)}
              >
                <div className="flex items-baseline justify-between gap-4 text-lead">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="num font-bold">{formatNumber(item.price.fourDays)}</p>
                </div>
                <p className="text-small text-muted">
                  {item.size} · روزانه <span className="num">{formatNumber(item.price.day)}</span> تومان
                </p>
                <p className="max-w-[36ch]">{item.contents.join("، ")}</p>
              </article>
            ))}
          </div>
          <p className="mt-12 text-small text-muted">همه قیمت‌ها به تومان است.</p>
        </div>
      </Container>
    </section>
  );
}
