import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import { navLinks, photos, site } from "../../data/site";

const tile = "flex flex-col justify-between gap-6 p-5 sm:p-6";

/** The back of the slip: the last two rows of a board of filled tiles. */
export function Footer() {
  const credits = Object.values(photos)
    .map((photo) => photo.credit)
    .join("، ");

  return (
    <footer className="mt-section p-2 sm:p-3">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-12">
        <div className={`${tile} order-3 bg-surface md:order-none md:col-span-4 md:min-h-56`}>
          <p className="text-lead">
            {site.name}؛ مبلمان غرفه برای چهار روز نمایشگاه، تحویل و جمع‌آوری در محل.
          </p>
          <p className="text-small text-muted">
            عکس‌های فضا از Unsplash: {credits}. تصاویر کالاها طراحی شده‌اند.
          </p>
        </div>

        <nav aria-label="پاورقی" className={`${tile} order-4 bg-surface md:order-none md:col-span-3`}>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="link">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/order" className="link">
                برگه سفارش
              </Link>
            </li>
          </ul>
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-small text-muted">
            {categories.map((category) => (
              <li key={category.id}>
                <Link to={`/products?category=${category.id}`} className="link">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`${tile} order-5 col-span-2 bg-surface md:order-none md:col-span-2`}>
          <p className="font-bold">{site.city}</p>
          <p className="text-small">{site.hours}</p>
        </div>

        <div className={`${tile} order-6 col-span-2 bg-surface md:order-none md:col-span-3`}>
          <p className="text-small text-muted">تلفن و ایمیل</p>
          <div className="flex flex-col gap-1 text-lead">
            <a href={site.phoneHref} className="link num" dir="ltr">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="link" dir="ltr">
              {site.email}
            </a>
          </div>
        </div>

        <div className="order-1 col-span-2 grid min-h-40 place-items-center bg-field p-6 text-field-ink md:order-none md:col-span-8 md:min-h-80">
          <p className="text-display font-extrabold leading-none tracking-tight" aria-hidden="true">
            {site.name}
          </p>
        </div>

        <Link
          to="/order"
          className="group order-2 col-span-2 flex min-h-40 flex-col justify-between bg-accent p-6 text-accent-ink transition-colors hover:bg-accent-strong md:order-none md:col-span-4 md:min-h-80"
        >
          <span className="text-head font-bold leading-tight">سفارش اجاره</span>
          <svg
            viewBox="0 0 48 48"
            className="size-12 self-end transition-transform duration-300 ease-out group-hover:-translate-x-2"
            aria-hidden="true"
          >
            <path d="M40 24H8M20 12 8 24l12 12" fill="none" stroke="currentColor" strokeWidth="4" />
          </svg>
        </Link>
      </div>
    </footer>
  );
}
