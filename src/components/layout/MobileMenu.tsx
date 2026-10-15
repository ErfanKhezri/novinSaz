import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { site } from "../../data/site";
import { whatsappLink } from "../../utils/whatsapp";
import { ButtonAnchor } from "../ui/Button";
import { navLinks } from "./navLinks";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="منو">
      <div className="absolute inset-0 bg-navy-900/40" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-72 max-w-[85%] animate-fade-up flex-col gap-8 bg-paper p-6">
        <div className="flex items-center justify-between">
          <span className="text-h3 font-extrabold text-navy-900">{site.name}</span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded border border-line"
            aria-label="بستن منو"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-navy-900" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav aria-label="منوی موبایل">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block border-b border-line py-4 text-lead font-medium ${
                      isActive ? "text-navy-900" : "text-muted"
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
          className="mt-auto"
        >
          مشاوره در واتس‌اپ
        </ButtonAnchor>
      </div>
    </div>
  );
}
