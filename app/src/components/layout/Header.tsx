import { Link, NavLink } from "react-router-dom";
import { navLinks, site } from "../../data/site";
import { useOrder } from "../../hooks/useOrder";
import { formatNumber } from "../../lib/format";
import { cn } from "../../lib/cn";
import { ButtonLink } from "../ui";

/** A plain bar: wordmark, three links, one action (the order slip). */
export function Header() {
  const { itemCount } = useOrder();

  return (
    <header className="bg-paper">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-gutter py-4">
        <Link to="/" className="text-lead font-extrabold tracking-tight">
          {site.name}
        </Link>

        <nav aria-label="اصلی" className="order-3 w-full sm:order-none sm:w-auto">
          <ul className="flex gap-6 sm:gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn("link inline-block py-2 font-medium", isActive && "text-accent")
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink to="/order" variant={itemCount ? "accent" : "ink"}>
          برگه سفارش
          {itemCount > 0 && <span className="num">{formatNumber(itemCount)}</span>}
        </ButtonLink>
      </div>
    </header>
  );
}
