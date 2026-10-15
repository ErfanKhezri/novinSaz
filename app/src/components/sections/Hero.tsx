import { Link } from "react-router-dom";
import { photos, site } from "../../data/site";
import { ButtonLink } from "../ui";

/**
 * Card over a dim room: the order slip itself, pinned over a dark hall,
 * shrinking toward its corner as the page scrolls on.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative h-[140svh] bg-field">
      <div className="sticky top-0 grid h-svh place-items-center overflow-hidden px-4 py-6">
        <img
          src={photos.hall.src}
          alt=""
          width={2400}
          height={1500}
          fetchPriority="high"
          className="drift absolute inset-0 size-full object-cover brightness-[0.55]"
        />

        <div className="slip-pin edge-zigzag relative flex min-h-[70svh] w-full max-w-3xl flex-col justify-between gap-8 bg-paper p-6 sm:min-h-[62svh] sm:p-10">
          <h1
            id="hero-title"
            className="flex flex-wrap items-baseline justify-between gap-x-6 text-[clamp(3rem,11vw,7.5rem)] leading-none font-extrabold tracking-tight"
          >
            <span>نوین</span>
            <span>ساز</span>
          </h1>

          <div className="grid gap-8 sm:grid-cols-2">
            <ul className="flex flex-col gap-1 text-lead font-bold">
              <li>اجاره مبلمان غرفه</li>
              <li>روزانه یا چهار روزه</li>
              <li>{site.city}، تحویل در سالن</li>
            </ul>
            <p className="max-w-[30ch] text-body">
              کانتر، صندلی جکدار، مبل نیم‌ست، تلویزیون و پاراوان؛ صبح روز چیدمان در غرفه
              شماست و شب آخر جمعش می‌کنیم.
            </p>
          </div>

          <div className="flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-small text-muted">برگه سفارش اجاره · {site.city}</p>
            <ButtonLink to="/products" size="lg">
              دیدن کالاها و قیمت‌ها
            </ButtonLink>
            <Link to="/contact" className="link self-center py-2 font-bold text-accent">
              تماس با ما
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
