import { Link } from "react-router-dom";
import { site } from "../../data/site";
import { Container } from "../ui/Container";
import { navLinks } from "./navLinks";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-100">
      <Container className="grid gap-10 py-section-sm sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <p className="flex items-center gap-2 text-h3 font-extrabold text-paper">
            <span className="h-6 w-6 rounded-sm bg-accent-200" aria-hidden="true" />
            {site.name}
          </p>
          <p className="text-small">
            اجاره روزانه و چهار روزه مبلمان و تجهیزات برای غرفه‌های نمایشگاهی، شوروم و اتاق جلسه.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-body font-bold text-paper">دسترسی سریع</h2>
          <ul className="flex flex-col gap-2 text-small">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-paper">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-body font-bold text-paper">تماس</h2>
          <ul className="flex flex-col gap-2 text-small">
            <li>
              <a href={site.phoneLink} className="transition-colors hover:text-paper">
                تلفن: {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-paper"
              >
                واتس‌اپ: {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={`https://instagram.com/${site.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-paper"
              >
                اینستاگرام: {site.instagram}@
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-body font-bold text-paper">نشانی و ساعت کاری</h2>
          <p className="text-small">{site.address}</p>
          <p className="mt-2 text-small">{site.hours}</p>
        </div>
      </Container>

      <div className="border-t border-navy-700">
        <Container className="py-5 text-center text-caption">
          تمامی حقوق برای {site.name} محفوظ است.
        </Container>
      </div>
    </footer>
  );
}
