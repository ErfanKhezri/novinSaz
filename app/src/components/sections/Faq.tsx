import { stagger } from "../../lib/stagger";
import { faqs, photos, site } from "../../data/site";
import { ButtonLink, Photo } from "../ui";
import { Link } from "react-router-dom";

/** Questions beside a tall photograph, with the practical facts first. */
export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="overflow-hidden">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-gutter py-section lg:grid-cols-12">
        <div className="relative order-first mb-10 lg:order-last lg:col-span-6 lg:col-start-7 lg:mb-0" data-reveal>
          <Photo
            src={photos.bench.src}
            alt={photos.bench.alt}
            width={1200}
            height={1500}
            className="aspect-[4/5] lg:aspect-[3/4]"
          />
          <Photo
            src={photos.atrium.src}
            alt={photos.atrium.alt}
            width={1200}
            height={1200}
            className="absolute -bottom-10 left-4 aspect-square w-[38%] lg:-left-10 lg:w-1/3"
          />
        </div>

        <div className="flex flex-col gap-10 lg:col-span-5">
          <div className="flex flex-col gap-5" data-reveal>
            <h2 id="faq-title" className="text-head font-extrabold tracking-tight">
              پیش از سفارش
            </h2>
            <ul className="flex flex-col gap-1 text-lead">
              <li>{site.address}</li>
              <li>{site.hours}</li>
              <li>{site.hoursDuringFair}</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group"
                data-reveal
                style={stagger(index)}
              >
                <summary className="flex min-h-11 items-center justify-between gap-4 py-3 text-lead font-medium hover:text-accent">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="size-3 shrink-0 -rotate-45 border-b-2 border-s-2 border-current transition-transform duration-300 group-open:rotate-[135deg]"
                  />
                </summary>
                <p className="max-w-[52ch] pb-5 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center" data-reveal>
            <ButtonLink to="/contact" variant="accent">
              تماس با ما
            </ButtonLink>
            <Link to="/order" className="link py-2 font-bold">
              پر کردن برگه سفارش
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
