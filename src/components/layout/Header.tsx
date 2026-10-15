import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Link, NavLink } from "react-router-dom";
import { site } from "../../data/site";
import { whatsappLink } from "../../utils/whatsapp";
import { ButtonAnchor } from "../ui/Button";
import { Container } from "../ui/Container";
import { GlassPanel } from "../ui/GlassPanel";
import { MobileMenu } from "./MobileMenu";
import { navLinks } from "./navLinks";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 16));

  return (
    <>
      <header className="sticky top-0 z-40 px-3 pt-3">
        <GlassPanel
          variant={scrolled ? "strong" : "light"}
          className={`mx-auto max-w-content ${scrolled ? "md:backdrop-blur-2xl" : ""}`}
        >
          <Container className="flex h-14 items-center justify-between gap-6 sm:px-5">
            <Link to="/" className="flex items-center gap-2 text-h3 font-extrabold text-navy-900">
              <span className="h-6 w-6 rounded-sm bg-gold-500" aria-hidden="true" />
              {site.name}
            </Link>

            <nav className="hidden md:block" aria-label="منوی اصلی">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      className={({ isActive }) =>
                        `text-body font-medium transition-colors hover:text-navy-900 ${
                          isActive ? "font-bold text-navy-900" : "text-navy-700"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <ButtonAnchor
              href={whatsappLink(`سلام ${site.name}، برای اجاره مبلمان سؤال دارم.`)}
              target="_blank"
              rel="noreferrer"
              variant="accent"
              className="hidden min-h-10 px-5 md:inline-flex"
            >
              مشاوره در واتس‌اپ
            </ButtonAnchor>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded border border-white/50 bg-white/40 md:hidden"
              aria-label="باز کردن منو"
              aria-expanded={menuOpen}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-navy-900" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </Container>
        </GlassPanel>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
