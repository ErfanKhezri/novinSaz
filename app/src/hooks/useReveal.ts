import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Staggered entrances for every element marked `data-reveal`.
 * The `motion` class (which hides elements before they enter) is only added
 * here, so without script, or with reduced motion, all content stays visible.
 */
export function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("motion");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [pathname]);
}
