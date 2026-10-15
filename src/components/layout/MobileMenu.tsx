import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NavLink } from "react-router-dom";
import { overlayFade, slideInFromRight } from "../../utils/motion";
import { ButtonLink } from "../ui/Button";
import { GlassPanel } from "../ui/GlassPanel";
import { Logo } from "../ui/Logo";
import { navLinks } from "./navLinks";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="منو">
          <motion.div
            className="absolute inset-0 bg-navy-900/30"
            variants={overlayFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <GlassPanel
            variant="strong"
            className="absolute inset-y-3 right-3 flex w-72 max-w-[85%] flex-col gap-8 p-6"
            variants={slideInFromRight}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded border border-white/60 bg-white/50"
                aria-label="بستن منو"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-navy-900" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav aria-label="منوی موبایل" className="-mx-1 flex-1 overflow-y-auto px-1">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `block border-b border-white/60 py-3 text-lead font-medium ${
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

            <ButtonLink to="/quote" onClick={onClose} variant="accent" className="mt-auto">
              پیش‌فاکتور
            </ButtonLink>
          </GlassPanel>
        </div>
      )}
    </AnimatePresence>
  );
}
